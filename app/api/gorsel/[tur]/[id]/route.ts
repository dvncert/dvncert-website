import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { duyurular, blogYazilari, referanslar, egitimEtkinlikleri, ekipUyeleri, sayfaSeo, popup } from "@/lib/db/schema";

/**
 * Veritabanında saklanan görselleri (WebP) sunar.
 * /api/gorsel/{tur}/{id}  — tur: referans | duyuru | blog | etkinlik | ekip | popup | sayfa-seo | sayfa-kapak
 *
 * sayfa-seo / sayfa-kapak türleri için {id} yerine URL-encoded yol (örn. %2Fkariyer) gelir.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ tur: string; id: string }> }) {
  const { tur, id } = await params;

  let veri: Buffer | null | undefined;
  if (tur === "sayfa-seo") {
    const yol = decodeURIComponent(id);
    veri = (await db.select({ v: sayfaSeo.ogImageVeri }).from(sayfaSeo).where(eq(sayfaSeo.yol, yol)).limit(1))[0]?.v;
  } else if (tur === "sayfa-kapak") {
    const yol = decodeURIComponent(id);
    veri = (await db.select({ v: sayfaSeo.kapakVeri }).from(sayfaSeo).where(eq(sayfaSeo.yol, yol)).limit(1))[0]?.v;
  } else {
    const n = Number(id);
    if (!Number.isFinite(n)) return new Response("Geçersiz id", { status: 400 });

    if (tur === "referans") {
      veri = (await db.select({ v: referanslar.logoVeri }).from(referanslar).where(eq(referanslar.id, n)).limit(1))[0]?.v;
    } else if (tur === "duyuru") {
      veri = (await db.select({ v: duyurular.gorselVeri }).from(duyurular).where(eq(duyurular.id, n)).limit(1))[0]?.v;
    } else if (tur === "blog") {
      veri = (await db.select({ v: blogYazilari.gorselVeri }).from(blogYazilari).where(eq(blogYazilari.id, n)).limit(1))[0]?.v;
    } else if (tur === "etkinlik") {
      veri = (await db.select({ v: egitimEtkinlikleri.gorselVeri }).from(egitimEtkinlikleri).where(eq(egitimEtkinlikleri.id, n)).limit(1))[0]?.v;
    } else if (tur === "ekip") {
      veri = (await db.select({ v: ekipUyeleri.fotoVeri }).from(ekipUyeleri).where(eq(ekipUyeleri.id, n)).limit(1))[0]?.v;
    } else if (tur === "popup") {
      veri = (await db.select({ v: popup.gorselVeri }).from(popup).where(eq(popup.id, n)).limit(1))[0]?.v;
    } else {
      return new Response("Geçersiz tür", { status: 400 });
    }
  }

  if (!veri) return new Response("Bulunamadı", { status: 404 });

  return new Response(new Uint8Array(veri), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
