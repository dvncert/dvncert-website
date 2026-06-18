/**
 * DVN Cert - İçerik senkronu (lib/blog.ts + lib/duyurular.ts -> DB),
 * yalnızca-ekleme, build-güvenli.
 *
 * NEDEN: Public blog ve duyurular prod'da DB'den beslenir (dbHazir=true).
 * lib'e eklenen yeni yazı/duyuruların canlıda görünmesi için DB'ye de
 * eklenmesi gerekir.
 * Bu script production build'inde (Vercel) prebuild olarak otomatik çalışır ve
 * DB'de olmayan blogları ekler — böylece "main'e push" deploy akışı, içeriği de
 * canlıya taşır.
 *
 * GÜVENLİK:
 *  - Yalnızca VERCEL_ENV=production veya `--force` ile çalışır; yerel/preview
 *    build'lerde atlanır (prod DB'ye istenmeyen yazımı önler).
 *  - onConflictDoNothing(slug): mevcut yazılara ve diğer tablolara DOKUNULMAZ.
 *  - Hata olursa build'i BOZMAZ (her durumda exit 0).
 *
 * Elle çalıştırma (gerekirse): `npx tsx scripts/sync-content.ts --force`
 */

import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const force = process.argv.includes("--force");
  const prod = process.env.VERCEL_ENV === "production";
  if (!force && !prod) {
    console.log("[sync-content] Atlandı (VERCEL_ENV!=production ve --force yok).");
    return;
  }
  if (!process.env.POSTGRES_URL) {
    console.log("[sync-content] Atlandı (POSTGRES_URL tanımlı değil).");
    return;
  }

  // Dinamik importlar: dotenv config()'ten SONRA -> POSTGRES_URL hazır
  const { db } = await import("../lib/db");
  const { blogYazilari: blogTbl, duyurular: duyuruTbl } = await import("../lib/db/schema");
  const { blogYazilari } = await import("../lib/blog");
  const { duyurular: duyuruStatik } = await import("../lib/duyurular");

  const mevcut = await db.select({ slug: blogTbl.slug }).from(blogTbl);
  const mevcutSet = new Set(mevcut.map((r) => r.slug));
  const eklenecek = blogYazilari.filter((b) => !mevcutSet.has(b.slug));
  console.log(
    `[sync-content] DB blog: ${mevcut.length} | lib: ${blogYazilari.length} | eklenecek: ${eklenecek.length}`,
  );

  for (const b of blogYazilari) {
    await db
      .insert(blogTbl)
      .values({
        slug: b.slug,
        baslik: b.baslik,
        ozet: b.ozet,
        tarih: b.tarih,
        kategori: b.kategori,
        yazar: b.yazar ?? null,
        gorsel: b.gorsel ?? null,
        gorselAlt: b.gorselAlt ?? null,
        icerik: b.icerik,
        ilgiliHizmetler: b.ilgiliHizmetler ?? [],
      })
      .onConflictDoNothing({ target: blogTbl.slug });
  }

  for (const b of eklenecek) console.log(`[sync-content]  + blog ${b.slug} (${b.tarih})`);

  // Duyurular (yalnızca-ekleme). Mevcut kayıtlara DOKUNULMAZ (onConflictDoNothing).
  const mevcutD = await db.select({ slug: duyuruTbl.slug }).from(duyuruTbl);
  const mevcutDSet = new Set(mevcutD.map((r) => r.slug));
  const eklenecekD = duyuruStatik.filter((d) => !mevcutDSet.has(d.slug));
  console.log(
    `[sync-content] DB duyuru: ${mevcutD.length} | lib: ${duyuruStatik.length} | eklenecek: ${eklenecekD.length}`,
  );
  for (const d of duyuruStatik) {
    await db
      .insert(duyuruTbl)
      .values({
        slug: d.slug,
        baslik: d.baslik,
        tarih: d.tarih,
        kategori: d.kategori,
        ozet: d.ozet,
        icerik: d.icerik,
        gorsel: d.gorsel ?? null,
        gorselAlt: d.gorselAlt ?? null,
        ilgiliHizmetler: d.ilgiliHizmetler ?? [],
      })
      .onConflictDoNothing({ target: duyuruTbl.slug });
  }
  for (const d of eklenecekD) console.log(`[sync-content]  + duyuru ${d.slug} (${d.tarih})`);

  console.log("[sync-content] Tamam.");
}

main()
  .catch((e) => {
    // Build'i bozmamak için hatayı yut, yalnızca logla.
    console.error("[sync-content] Hata (build bozulmadı):", e);
  })
  .finally(() => process.exit(0));
