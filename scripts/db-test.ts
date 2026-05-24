/**
 * DVN Cert - Veri katmanı doğrulama testi (PGlite, in-process Postgres)
 *
 * Gerçek bir Postgres motoruna (PGlite) karşı: migration SQL'i uygular, örnek
 * insert/select çalıştırır, bcrypt doğrular. Uygulama tarafından import EDİLMEZ;
 * yalnızca geliştirme doğrulaması içindir. Çalıştırma: `npx tsx scripts/db-test.ts`
 */

import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as schema from "../lib/db/schema";

async function main() {
  const client = new PGlite(); // bellek içi
  const migration = readFileSync("./drizzle/0000_true_switch.sql", "utf8");
  await client.exec(migration);

  const db = drizzle(client, { schema });

  // Admin
  const sifreHash = bcrypt.hashSync("test1234", 10);
  await db.insert(schema.adminKullanicilar).values({ email: "test@dvncert.com", sifreHash, ad: "Test" });

  // Duyuru (jsonb dizi + default'lar)
  await db.insert(schema.duyurular).values({
    slug: "test-duyuru",
    baslik: "Test Duyuru",
    tarih: "2026-05-24",
    kategori: "Duyuru",
    ozet: "ozet",
    icerik: "icerik",
    ilgiliHizmetler: ["iso-9001", "iso-14001"],
  });

  // Form gönderisi
  await db.insert(schema.formGonderileri).values({
    tip: "iletisim",
    ad: "Ahmet",
    email: "a@b.com",
    mesaj: "Merhaba",
  });

  // Oku + doğrula
  const admin = (await db.select().from(schema.adminKullanicilar).where(eq(schema.adminKullanicilar.email, "test@dvncert.com")))[0];
  const duyuru = (await db.select().from(schema.duyurular).where(eq(schema.duyurular.slug, "test-duyuru")))[0];
  const form = (await db.select().from(schema.formGonderileri))[0];

  const sifreDogru = bcrypt.compareSync("test1234", admin.sifreHash);

  console.log("admin:", admin.email, "| sifre dogrulama:", sifreDogru);
  console.log("duyuru:", duyuru.baslik, "| ilgiliHizmetler:", JSON.stringify(duyuru.ilgiliHizmetler), "| yayinda(default):", duyuru.yayinda);
  console.log("form:", form.tip, form.ad, "| durum(default):", form.durum);

  if (!sifreDogru || duyuru.ilgiliHizmetler.length !== 2 || duyuru.yayinda !== true || form.durum !== "yeni") {
    throw new Error("Beklenen degerler tutmadi");
  }
  console.log("DB-TEST OK ✅");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("DB-TEST FAIL:", e);
    process.exit(1);
  });
