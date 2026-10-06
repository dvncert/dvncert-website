/**
 * DVN Cert - Tedarikçi/şube denetimi SEO geçişi (tek seferlik, DB).
 *
 * NEDEN: Blog gövdeleri prod'da DB'den okunur ve sync-content yalnızca-ekleme
 * yapar; lib/blog.ts'teki değişiklikler mevcut satırlara yansımaz. Bu script:
 *  - "2-taraf-denetimi-nedir" yazısını "tedarikci-denetimi-nedir" slug'ına
 *    taşır ve içeriğini lib'teki yeni sürümle değiştirir,
 *  - diğer tüm yazılarda eski hizmet/blog linklerini ve anchor metinlerini
 *    hedefli metin değişimiyle günceller (admin düzenlemeleri korunur),
 *  - ilgiliHizmetler içindeki "2-taraf-denetimleri" slug'ını yeniler,
 *  - yeni yazıları ("sube-denetimi-kontrol-listesi", "vda-6-3-nedir") ekler
 *    (varsa dokunmaz).
 *
 * Varsayılan KURU ÇALIŞMA: yalnızca neyin değişeceğini listeler.
 * Uygulamak için: `npx tsx scripts/denetim-seo-gecisi.ts --uygula`
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const ESKI_SLUG = "2-taraf-denetimi-nedir";
const YENI_SLUG = "tedarikci-denetimi-nedir";
const YENI_YAZILAR = ["sube-denetimi-kontrol-listesi", "vda-6-3-nedir"];

const degisimler: [string, string][] = [
  ["/hizmetler/2-taraf-denetimleri", "/hizmetler/tedarikci-denetimi"],
  ["/blog/2-taraf-denetimi-nedir", "/blog/tedarikci-denetimi-nedir"],
  ["[tedarikçi denetimi (2. taraf denetimi) hizmetimizi]", "[tedarikçi denetimi hizmetimizi]"],
  ["[tedarikçi denetimi (2. taraf denetimi) hizmetimizden]", "[tedarikçi denetimi hizmetimizden]"],
  ["[tedarikçi denetimi (2. taraf denetimi)]", "[tedarikçi denetimi]"],
  ["[2. taraf denetimi nedir](", "[tedarikçi denetimi nedir]("],
  ["## İç tetkik ile 2. taraf denetiminin ilişkisi", "## İç tetkik ile tedarikçi denetiminin ilişkisi"],
  [
    "İç tetkikte kazanılan yetkinlik, tedarikçilerin denetlendiği 2. taraf (tedarikçi) denetimlerinde de temel oluşturur.",
    "İç tetkikte kazanılan yetkinlik, tedarikçi denetimlerinde de temel oluşturur.",
  ],
  ["## Gıda tedarik zincirinde 2. taraf denetiminin rolü", "## Gıda tedarik zincirinde tedarikçi denetiminin rolü"],
  ["## Otomotiv tedarik zincirinde 2. taraf denetiminin rolü", "## Otomotiv tedarik zincirinde tedarikçi denetiminin rolü"],
  ["## Riskleri yönetmede 2. taraf denetiminin rolü", "## Riskleri yönetmede tedarikçi denetiminin rolü"],
  [
    "ve 2. taraf (tedarikçi) denetiminin riskleri yönetmedeki rolünü",
    "ve tedarikçi denetiminin riskleri yönetmedeki rolünü",
  ],
  [
    "şubelerinizi değerlendirdiği bir 2. taraf denetim hizmetidir",
    "şubelerinizi değerlendirdiği bir denetim hizmetidir",
  ],
  [
    "risk temelli olarak değerlendirir ve tedarikçi denetimlerinde yaygın bir referanstır.\n\n",
    "risk temelli olarak değerlendirir ve tedarikçi denetimlerinde yaygın bir referanstır. Süreç elemanları, puanlama sistemi ve IATF 16949 ile farkı için [VDA 6.3 nedir](/blog/vda-6-3-nedir) yazımıza bakabilirsiniz.\n\n",
  ],
  [
    "DVN Cert, bu standartlarda belgelendirme, ikinci taraf denetim ve eğitim süreçlerini",
    "DVN Cert, bu standartlarda belgelendirme, tedarikçi ve şube denetimi ile eğitim süreçlerini",
  ],
];

function uygula(metin: string): string {
  return degisimler.reduce((m, [eski, yeni]) => m.split(eski).join(yeni), metin);
}

async function main() {
  const yaz = process.argv.includes("--uygula");
  const { db } = await import("../lib/db");
  const { blogYazilari: blogTbl } = await import("../lib/db/schema");
  const { blogYazilari } = await import("../lib/blog");
  const { eq } = await import("drizzle-orm");

  const satirlar = await db.select().from(blogTbl);
  const slugSet = new Set(satirlar.map((r) => r.slug));

  for (const r of satirlar) {
    if (r.slug === ESKI_SLUG) {
      const lib = blogYazilari.find((b) => b.slug === YENI_SLUG)!;
      if (slugSet.has(YENI_SLUG)) {
        console.log(`! ${YENI_SLUG} zaten var; ${ESKI_SLUG} taşınmadı (elle kontrol edin).`);
        continue;
      }
      console.log(`~ ${ESKI_SLUG} -> ${YENI_SLUG} (başlık, özet, içerik yenilenir)`);
      if (yaz) {
        await db
          .update(blogTbl)
          .set({
            slug: YENI_SLUG,
            baslik: lib.baslik,
            ozet: lib.ozet,
            icerik: lib.icerik,
            ilgiliHizmetler: lib.ilgiliHizmetler ?? [],
          })
          .where(eq(blogTbl.id, r.id));
      }
      continue;
    }

    const icerik = uygula(r.icerik);
    const ozet = uygula(r.ozet);
    const ilgili = (r.ilgiliHizmetler ?? []).map((s) => (s === "2-taraf-denetimleri" ? "tedarikci-denetimi" : s));
    const degisti =
      icerik !== r.icerik || ozet !== r.ozet || JSON.stringify(ilgili) !== JSON.stringify(r.ilgiliHizmetler ?? []);
    if (!degisti) continue;
    console.log(`~ ${r.slug}`);
    if (yaz) {
      await db.update(blogTbl).set({ icerik, ozet, ilgiliHizmetler: ilgili }).where(eq(blogTbl.id, r.id));
    }
  }

  for (const slug of YENI_YAZILAR) {
    if (slugSet.has(slug)) continue;
    const b = blogYazilari.find((x) => x.slug === slug)!;
    console.log(`+ ${slug}`);
    if (yaz) {
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
  }

  console.log(yaz ? "Uygulandı." : "Kuru çalışma — yazmak için --uygula ekleyin.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
