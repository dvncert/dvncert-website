/**
 * DVN Cert - Veritabanı şeması (Drizzle ORM / Postgres)
 *
 * Admin panelinden yönetilecek içerik ve form gönderileri. Mevcut lib/*.ts
 * içeriğiyle alan adları uyumludur; seed scripti bu içeriği DB'ye taşır.
 */

import { pgTable, serial, text, integer, boolean, timestamp, jsonb, varchar, customType } from "drizzle-orm/pg-core";

/** Postgres bytea (ikili veri) — yüklenen logo görselleri webp olarak burada saklanır. */
const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const adminKullanicilar = pgTable("admin_kullanicilar", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  sifreHash: text("sifre_hash").notNull(),
  ad: varchar("ad", { length: 120 }),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
});

export const duyurular = pgTable("duyurular", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  baslik: text("baslik").notNull(),
  tarih: varchar("tarih", { length: 10 }).notNull(), // YYYY-MM-DD
  kategori: varchar("kategori", { length: 80 }).notNull(),
  ozet: text("ozet").notNull(),
  icerik: text("icerik").notNull(),
  /** Manuel görsel yolu (opsiyonel). Yükleme yapılırsa gorselVeri kullanılır. */
  gorsel: text("gorsel"),
  /** Yüklenip WebP'e çevrilen kapak görseli (varsa /api/gorsel/duyuru/{id}). */
  gorselVeri: bytea("gorsel_veri"),
  /** Görsel alt metni (SEO / erişilebilirlik). */
  gorselAlt: text("gorsel_alt"),
  ilgiliHizmetler: jsonb("ilgili_hizmetler").$type<string[]>().default([]).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

export const blogYazilari = pgTable("blog_yazilari", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  baslik: text("baslik").notNull(),
  ozet: text("ozet").notNull(),
  tarih: varchar("tarih", { length: 10 }).notNull(),
  kategori: varchar("kategori", { length: 80 }).notNull(),
  yazar: varchar("yazar", { length: 120 }),
  /** Manuel görsel yolu (opsiyonel). Yükleme yapılırsa gorselVeri kullanılır. */
  gorsel: text("gorsel"),
  /** Yüklenip WebP'e çevrilen kapak görseli (varsa /api/gorsel/blog/{id}). */
  gorselVeri: bytea("gorsel_veri"),
  /** Görsel alt metni (SEO / erişilebilirlik). */
  gorselAlt: text("gorsel_alt"),
  icerik: text("icerik").notNull(),
  ilgiliHizmetler: jsonb("ilgili_hizmetler").$type<string[]>().default([]).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

export const yorumlar = pgTable("yorumlar", {
  id: serial("id").primaryKey(),
  isim: varchar("isim", { length: 255 }).notNull(),
  kurum: varchar("kurum", { length: 255 }),
  yorum: text("yorum").notNull(),
  puan: integer("puan"), // 1-5, opsiyonel
  tarih: varchar("tarih", { length: 10 }),
  yayinda: boolean("yayinda").default(true).notNull(),
  sira: integer("sira").default(0).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
});

export const referanslar = pgTable("referanslar", {
  id: serial("id").primaryKey(),
  ad: varchar("ad", { length: 255 }).notNull(),
  /** Manuel logo yolu (opsiyonel). Yükleme yapılırsa logoVeri kullanılır. */
  logo: text("logo"),
  /** Yüklenip webp'e çevrilen logo görseli (varsa /api/referans-logo/{id} ile sunulur). */
  logoVeri: bytea("logo_veri"),
  url: text("url"),
  yayinda: boolean("yayinda").default(true).notNull(),
  sira: integer("sira").default(0).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
});

export const formGonderileri = pgTable("form_gonderileri", {
  id: serial("id").primaryKey(),
  tip: varchar("tip", { length: 40 }).notNull(), // iletisim | sikayet | kariyer
  ad: varchar("ad", { length: 255 }),
  email: varchar("email", { length: 255 }),
  telefon: varchar("telefon", { length: 60 }),
  konu: text("konu"),
  mesaj: text("mesaj"),
  ekVeri: jsonb("ek_veri").$type<Record<string, unknown>>(),
  durum: varchar("durum", { length: 30 }).default("yeni").notNull(), // yeni | okundu | cozuldu
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
});
