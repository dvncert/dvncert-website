/**
 * DVN Cert - Blog senkron scripti (yalnızca blog, yalnızca-ekleme)
 *
 * Çalıştırma: `npx tsx scripts/seed-blog.ts` (.env.local içinde POSTGRES_URL gerekli)
 *
 * Public blog sayfaları prod'da DB'den beslenir (dbHazir=true). lib/blog.ts'e
 * eklenen yeni yazıların canlıda görünmesi için DB'ye de eklenmesi gerekir.
 *
 * Güvenli: onConflictDoNothing({ target: slug }) ile yalnızca DB'de olmayan
 * slug'lar eklenir; mevcut yazılara (ve diğer tablolara) DOKUNULMAZ.
 *
 * NOT: env, lib/db'den ÖNCE yüklenmeli; lib/* importları dinamik yapılır.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { db } = await import("../lib/db");
  const { blogYazilari: blogTbl } = await import("../lib/db/schema");
  const { blogYazilari } = await import("../lib/blog");

  // Mevcut slug'ları oku (hedef DB doğrulaması + yeni/atlanan raporu için)
  const mevcut = await db.select({ slug: blogTbl.slug }).from(blogTbl);
  const mevcutSet = new Set(mevcut.map((r) => r.slug));
  console.log(`DB'deki mevcut blog sayısı: ${mevcut.length}`);
  console.log("Mevcut slug'lar:", [...mevcutSet].join(", ") || "(yok)");

  const eklenecek = blogYazilari.filter((b) => !mevcutSet.has(b.slug));
  console.log(`\nlib/blog.ts toplam: ${blogYazilari.length} | eklenecek (yeni): ${eklenecek.length}`);

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

  console.log("\n✓ Eklenen yeni yazılar:");
  for (const b of eklenecek) console.log(`  + ${b.slug}  (${b.tarih})`);

  const sonuc = await db.select({ slug: blogTbl.slug }).from(blogTbl);
  console.log(`\nDB'deki blog sayısı (sonra): ${sonuc.length}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Hata:", e);
    process.exit(1);
  });
