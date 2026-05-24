/**
 * DVN Cert - Veritabanı seed scripti
 *
 * Çalıştırma: `npm run db:seed` (önce `.env.local` içinde POSTGRES_URL,
 * ADMIN_EMAIL, ADMIN_PASSWORD tanımlı olmalı; şema `npm run db:push` ile kurulmalı).
 *
 * Yaptığı:
 *  - İlk admin kullanıcısını ekler (şifre bcrypt ile hash'lenir)
 *  - Mevcut lib/*.ts içeriğini (duyuru, blog, yorum, referans) DB'ye taşır
 * Tekrar çalıştırılabilir (idempotent): slug çakışmaları atlanır.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import {
  adminKullanicilar,
  duyurular as duyurularTbl,
  blogYazilari as blogTbl,
  yorumlar as yorumlarTbl,
  referanslar as referanslarTbl,
} from "../lib/db/schema";
import { duyurular } from "../lib/duyurular";
import { blogYazilari } from "../lib/blog";
import { musteriYorumlari } from "../lib/yorumlar";
import { referanslar } from "../lib/referanslar";

async function main() {
  // 1) İlk admin
  const email = process.env.ADMIN_EMAIL;
  const sifre = process.env.ADMIN_PASSWORD;
  if (email && sifre) {
    const sifreHash = bcrypt.hashSync(sifre, 10);
    await db
      .insert(adminKullanicilar)
      .values({ email, sifreHash, ad: "Yönetici" })
      .onConflictDoNothing({ target: adminKullanicilar.email });
    console.log("✓ Admin eklendi/zaten var:", email);
  } else {
    console.warn("! ADMIN_EMAIL / ADMIN_PASSWORD tanımlı değil; admin atlandı.");
  }

  // 2) Duyurular
  for (const d of duyurular) {
    await db
      .insert(duyurularTbl)
      .values({
        slug: d.slug,
        baslik: d.baslik,
        tarih: d.tarih,
        kategori: d.kategori,
        ozet: d.ozet,
        icerik: d.icerik,
        gorsel: d.gorsel ?? null,
        ilgiliHizmetler: d.ilgiliHizmetler ?? [],
      })
      .onConflictDoNothing({ target: duyurularTbl.slug });
  }
  console.log("✓ Duyurular taşındı:", duyurular.length);

  // 3) Blog
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
        icerik: b.icerik,
        ilgiliHizmetler: b.ilgiliHizmetler ?? [],
      })
      .onConflictDoNothing({ target: blogTbl.slug });
  }
  console.log("✓ Blog yazıları taşındı:", blogYazilari.length);

  // 4) Yorumlar (şu an boş olabilir)
  for (const y of musteriYorumlari) {
    await db.insert(yorumlarTbl).values({
      isim: y.isim,
      kurum: y.kurum ?? null,
      yorum: y.yorum,
      puan: y.puan ?? null,
      tarih: y.tarih ?? null,
    });
  }
  console.log("✓ Yorumlar taşındı:", musteriYorumlari.length);

  // 5) Referanslar (şu an boş olabilir)
  for (let i = 0; i < referanslar.length; i++) {
    const r = referanslar[i];
    await db.insert(referanslarTbl).values({ ad: r.ad, logo: r.logo, url: r.url ?? null, sira: i });
  }
  console.log("✓ Referanslar taşındı:", referanslar.length);

  console.log("Seed tamamlandı.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Seed hatası:", e);
    process.exit(1);
  });
