import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { akreditasyonBelgeleri, logoDosyalari, dokumanlar } from "@/lib/db/schema";

/**
 * Veritabanında saklanan binary dosyaları (PDF / DOCX / XLSX / görsel vb.) sunar.
 * /api/dosya/{tur}/{id}  — tur: akreditasyon | logo | dokuman
 *
 * Görseller için /api/gorsel rotası kullanılır (WebP'e çevrilmiş kapaklar).
 * Bu rota orijinal binary'yi olduğu gibi indirilebilir biçimde döner.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ tur: string; id: string }> }) {
  const { tur, id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n)) return new Response("Geçersiz id", { status: 400 });

  let satir: { v: Buffer | null; mime: string | null; ad?: string | null } | undefined;
  if (tur === "akreditasyon") {
    satir = (
      await db
        .select({ v: akreditasyonBelgeleri.belgeVeri, mime: akreditasyonBelgeleri.belgeMime })
        .from(akreditasyonBelgeleri)
        .where(eq(akreditasyonBelgeleri.id, n))
        .limit(1)
    )[0];
  } else if (tur === "logo") {
    satir = (
      await db
        .select({ v: logoDosyalari.dosyaVeri, mime: logoDosyalari.dosyaMime, ad: logoDosyalari.dosyaAdi })
        .from(logoDosyalari)
        .where(eq(logoDosyalari.id, n))
        .limit(1)
    )[0];
  } else if (tur === "dokuman") {
    satir = (
      await db
        .select({ v: dokumanlar.dosyaVeri, mime: dokumanlar.dosyaMime, ad: dokumanlar.dosyaAdi })
        .from(dokumanlar)
        .where(eq(dokumanlar.id, n))
        .limit(1)
    )[0];
  } else {
    return new Response("Geçersiz tür", { status: 400 });
  }

  if (!satir?.v) return new Response("Bulunamadı", { status: 404 });

  const mime = satir.mime || "application/octet-stream";
  const inline = mime.startsWith("image/") || mime === "application/pdf";
  const headers: Record<string, string> = {
    "Content-Type": mime,
    "Cache-Control": "public, max-age=3600, must-revalidate",
  };
  if (satir.ad) {
    const disp = inline ? "inline" : "attachment";
    // RFC 5987: ASCII fallback + UTF-8 filename
    const guvenli = satir.ad.replace(/[^\x20-\x7e]/g, "_");
    headers["Content-Disposition"] = `${disp}; filename="${guvenli}"; filename*=UTF-8''${encodeURIComponent(satir.ad)}`;
  }

  return new Response(new Uint8Array(satir.v), { headers });
}
