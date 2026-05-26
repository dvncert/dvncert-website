import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { duyurular, blogYazilari, referanslar, egitimEtkinlikleri } from "@/lib/db/schema";

/**
 * Veritabanında saklanan görselleri (WebP) sunar.
 * /api/gorsel/{tur}/{id}  — tur: referans | duyuru | blog | etkinlik
 */
export async function GET(_req: Request, { params }: { params: Promise<{ tur: string; id: string }> }) {
  const { tur, id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n)) return new Response("Geçersiz id", { status: 400 });

  let veri: Buffer | null | undefined;
  if (tur === "referans") {
    veri = (await db.select({ v: referanslar.logoVeri }).from(referanslar).where(eq(referanslar.id, n)).limit(1))[0]?.v;
  } else if (tur === "duyuru") {
    veri = (await db.select({ v: duyurular.gorselVeri }).from(duyurular).where(eq(duyurular.id, n)).limit(1))[0]?.v;
  } else if (tur === "blog") {
    veri = (await db.select({ v: blogYazilari.gorselVeri }).from(blogYazilari).where(eq(blogYazilari.id, n)).limit(1))[0]?.v;
  } else if (tur === "etkinlik") {
    veri = (await db.select({ v: egitimEtkinlikleri.gorselVeri }).from(egitimEtkinlikleri).where(eq(egitimEtkinlikleri.id, n)).limit(1))[0]?.v;
  } else {
    return new Response("Geçersiz tür", { status: 400 });
  }

  if (!veri) return new Response("Bulunamadı", { status: 404 });

  return new Response(new Uint8Array(veri), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
