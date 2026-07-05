/**
 * DVN Cert - Veritabanı şeması (Drizzle ORM / Postgres)
 *
 * Admin panelinden yönetilecek içerik ve form gönderileri. Mevcut lib/*.ts
 * içeriğiyle alan adları uyumludur; seed scripti bu içeriği DB'ye taşır.
 */

import { pgTable, serial, text, integer, boolean, timestamp, jsonb, varchar, customType, primaryKey } from "drizzle-orm/pg-core";

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

/**
 * Admin giriş denemeleri — brute-force koruması (auth.ts). Her başarısız
 * deneme kaydedilir; IP başına belirli sürede eşik aşılırsa giriş geçici
 * kilitlenir. Erişim auth.ts'te try/catch ile korunur: bu tablo prod'da
 * henüz yoksa (db:push yapılmadıysa) giriş normal çalışmaya devam eder.
 */
export const girisDenemeleri = pgTable("giris_denemeleri", {
  id: serial("id").primaryKey(),
  ip: varchar("ip", { length: 45 }),
  email: varchar("email", { length: 255 }),
  basarili: boolean("basarili").default(false).notNull(),
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

/**
 * Site ayarları — admin panelden yönetilen anahtar/değer çiftleri.
 * Örn: "sosyal.linkedin", "sosyal.instagram". Footer ve blog "Bizi Takip Et"
 * köşesi bu tablodan okur; siteConfig.sosyal fallback olarak kalır.
 */
export const siteAyarlari = pgTable("site_ayarlari", {
  anahtar: varchar("anahtar", { length: 100 }).primaryKey(),
  deger: text("deger").notNull().default(""),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Eğitim ve etkinlikler — admin panelden yönetilir, ana sayfada yaklaşan
 * etkinlikler bölümünde gösterilir, /etkinlikler altında detay sayfaları olur.
 */
export const egitimEtkinlikleri = pgTable("egitim_etkinlikleri", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  baslik: text("baslik").notNull(),
  kategori: varchar("kategori", { length: 60 }).notNull(), // eğitim / seminer / konferans / webinar
  /** Başlangıç tarihi/saati (timestamptz). */
  baslangic: timestamp("baslangic", { withTimezone: true }).notNull(),
  /** Bitiş tarihi/saati — tek günlük etkinlikse boş. */
  bitis: timestamp("bitis", { withTimezone: true }),
  /** Yer açıklaması, örn. "İstanbul / Online" veya "Pendik Ofis". */
  yer: varchar("yer", { length: 200 }).notNull(),
  ozet: text("ozet").notNull(),
  icerik: text("icerik").notNull(),
  /** Manuel görsel yolu. */
  gorsel: text("gorsel"),
  /** Yüklenen kapak görseli (WebP). */
  gorselVeri: bytea("gorsel_veri"),
  gorselAlt: text("gorsel_alt"),
  /** Kayıt / başvuru bağlantısı (opsiyonel). */
  kayitUrl: text("kayit_url"),
  ucretli: boolean("ucretli").default(false).notNull(),
  /** SEO — boş bırakılırsa başlık/özet kullanılır. */
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  noIndex: boolean("no_index").default(false).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Ekip üyeleri — /ekibimiz sayfasında listelenir.
 */
export const ekipUyeleri = pgTable("ekip_uyeleri", {
  id: serial("id").primaryKey(),
  ad: varchar("ad", { length: 200 }).notNull(),
  unvan: varchar("unvan", { length: 200 }).notNull(),
  uzmanlik: text("uzmanlik"),
  /** Profil fotoğrafı (yüklenince WebP'e çevrilir). */
  fotoVeri: bytea("foto_veri"),
  fotoAlt: text("foto_alt"),
  sira: integer("sira").default(0).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Akreditasyon belgeleri — sertifika taramaları/PDF'leri.
 * /akreditasyonlarimiz sayfasında gösterilir.
 */
export const akreditasyonBelgeleri = pgTable("akreditasyon_belgeleri", {
  id: serial("id").primaryKey(),
  ad: varchar("ad", { length: 255 }).notNull(),
  aciklama: text("aciklama"),
  kapsam: text("kapsam"),
  /** PDF veya görsel (binary). */
  belgeVeri: bytea("belge_veri"),
  /** Dosya MIME türü (örn. application/pdf, image/webp). */
  belgeMime: varchar("belge_mime", { length: 80 }),
  /** YYYY-MM-DD geçerlilik tarihi (opsiyonel). */
  gecerlilikTarihi: varchar("gecerlilik_tarihi", { length: 10 }),
  sira: integer("sira").default(0).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Logo dosyaları — /logolarimiz sayfasında indirilebilir kart olarak gösterilir.
 */
export const logoDosyalari = pgTable("logo_dosyalari", {
  id: serial("id").primaryKey(),
  ad: varchar("ad", { length: 200 }).notNull(),
  aciklama: text("aciklama"),
  /** 'acik' / 'koyu' — önizleme zemin rengi. */
  zeminTipi: varchar("zemin_tipi", { length: 20 }).default("acik").notNull(),
  /** Dosya içeriği (binary, indirilebilir). */
  dosyaVeri: bytea("dosya_veri"),
  /** Dosya MIME türü. */
  dosyaMime: varchar("dosya_mime", { length: 80 }),
  /** Önerilen indirme dosya adı (örn. dvncert-logo-yatay.png). */
  dosyaAdi: varchar("dosya_adi", { length: 200 }),
  sira: integer("sira").default(0).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Dokümanlar — politika, talimat, prosedür, form vb.
 */
export const dokumanlar = pgTable("dokumanlar", {
  id: serial("id").primaryKey(),
  kod: varchar("kod", { length: 50 }).notNull(),
  baslik: text("baslik").notNull(),
  aciklama: text("aciklama"),
  /** Politika / Talimat / Prosedür / Form vb. */
  kategori: varchar("kategori", { length: 60 }).notNull(),
  /** Görüntü için badge etiketi: PDF / DOCX / XLSX. */
  tip: varchar("tip", { length: 10 }).notNull(),
  dosyaVeri: bytea("dosya_veri"),
  dosyaMime: varchar("dosya_mime", { length: 80 }),
  dosyaAdi: varchar("dosya_adi", { length: 200 }),
  sira: integer("sira").default(0).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Admin panelinden oluşturulan özel sayfalar.
 * Her sayfanın bir şablonu (sablon) var; içerik (veri) JSON olarak saklanır;
 * şablona göre dinamik /[slug] rotasında render edilir.
 */
export const ozelSayfalar = pgTable("ozel_sayfalar", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  baslik: text("baslik").notNull(),
  /** Şablon kimliği: 'metin' | 'faq' | 'kart-listesi' | ... */
  sablon: varchar("sablon", { length: 40 }).notNull(),
  /** Üst etiket (örn. "KURUMSAL") — opsiyonel. */
  ustEtiket: varchar("ust_etiket", { length: 80 }),
  /** Sayfa başlığı altında görünen açıklama (opsiyonel). */
  aciklama: text("aciklama"),
  /** Şablona göre değişen veri alanları (anahtar → değer). */
  veri: jsonb("veri").$type<Record<string, string>>().default({}).notNull(),
  /** SEO override. */
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  noIndex: boolean("no_index").default(false).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Sayfa içerik blokları — statik sayfaların metinleri admin'den düzenlenebilir.
 * Her sayfanın hangi anahtarlara sahip olduğu kodda (lib/sayfa-icerigi.ts) tanımlı;
 * burada sadece (yol, anahtar) → değer eşlemesi tutulur. Boş kayıt = varsayılan kullanılır.
 */
export const sayfaBloklari = pgTable(
  "sayfa_bloklari",
  {
    yol: varchar("yol", { length: 200 }).notNull(),
    anahtar: varchar("anahtar", { length: 100 }).notNull(),
    deger: text("deger").notNull().default(""),
    guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.yol, t.anahtar] }) }),
);

/**
 * Sıkça sorulan sorular — /sss sayfasında listelenir.
 */
export const sssSorulari = pgTable("sss_sorulari", {
  id: serial("id").primaryKey(),
  soru: text("soru").notNull(),
  cevap: text("cevap").notNull(),
  sira: integer("sira").default(0).notNull(),
  yayinda: boolean("yayinda").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Statik sayfaların SEO override'ı. Yol (URL path) primary key.
 * Boş bırakılan alanlar için sayfanın varsayılan metadata'sı kullanılır.
 */
export const sayfaSeo = pgTable("sayfa_seo", {
  yol: varchar("yol", { length: 200 }).primaryKey(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  noIndex: boolean("no_index").default(false).notNull(),
  /** OG/Twitter görseli (WebP, opsiyonel). */
  ogImageVeri: bytea("og_image_veri"),
  /** Sayfa içi kapak görseli (WebP, opsiyonel) — /api/gorsel/sayfa-kapak/{yol}. */
  kapakVeri: bytea("kapak_veri"),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Üst navigasyon şeridine admin panelinden eklenen ek öğeler.
 * Mevcut hardcoded menülere (Neden DVN Cert / Hizmetler / İletişim) dokunmaz;
 * bunlar nav'ın sağına/sonuna eklenir.
 */
export const ekstraMenuOgeleri = pgTable("ekstra_menu_ogeleri", {
  id: serial("id").primaryKey(),
  baslik: varchar("baslik", { length: 100 }).notNull(),
  href: text("href").notNull(),
  /** Yeni sekmede aç (dış bağlantılar için). */
  yeniSekme: boolean("yeni_sekme").default(false).notNull(),
  sira: integer("sira").default(0).notNull(),
  aktif: boolean("aktif").default(true).notNull(),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Site geneli pop-up (modal) — admin panelinden tek kayıt olarak yönetilir.
 * Aktifse tüm public sayfalarda ziyaretçiye gösterilir. Görsel WebP olarak
 * saklanır ve /api/gorsel/popup/{id} ile sunulur.
 */
export const popup = pgTable("popup", {
  id: serial("id").primaryKey(),
  aktif: boolean("aktif").default(false).notNull(),
  baslik: text("baslik"),
  metin: text("metin"),
  /** Buton metni (boşsa buton gösterilmez). */
  butonYazi: varchar("buton_yazi", { length: 120 }),
  /** Buton/görsel bağlantısı. */
  butonUrl: text("buton_url"),
  /** Yüklenip WebP'e çevrilen görsel (varsa /api/gorsel/popup/{id}). */
  gorselVeri: bytea("gorsel_veri"),
  gorselAlt: text("gorsel_alt"),
  guncellenme: timestamp("guncellenme", { withTimezone: true }).defaultNow().notNull(),
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
  /** Kariyer başvurusunda yüklenen CV/dosya (PDF/DOCX/XLSX). */
  dosyaVeri: bytea("dosya_veri"),
  dosyaMime: varchar("dosya_mime", { length: 100 }),
  dosyaAdi: varchar("dosya_adi", { length: 255 }),
  durum: varchar("durum", { length: 30 }).default("yeni").notNull(), // yeni | okundu | cozuldu
  /** Rate-limit + spam izleme için. */
  ip: varchar("ip", { length: 45 }),
  userAgent: text("user_agent"),
  olusturulma: timestamp("olusturulma", { withTimezone: true }).defaultNow().notNull(),
});
