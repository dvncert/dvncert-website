"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import sharp from "sharp";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import {
  duyurular,
  blogYazilari,
  yorumlar,
  referanslar,
  formGonderileri,
  siteAyarlari,
  egitimEtkinlikleri,
  ekstraMenuOgeleri,
  ekipUyeleri,
  akreditasyonBelgeleri,
  logoDosyalari,
  dokumanlar,
  sayfaSeo,
  sayfaBloklari,
  sssSorulari,
  ozelSayfalar,
  popup,
} from "@/lib/db/schema";
import { SAYFA_ICERIK } from "@/lib/sayfa-icerigi";
import { sablonBul } from "@/lib/sablonlar";

// ---- FormData yardımcıları ----
function s(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}
function arr(fd: FormData, k: string): string[] {
  return s(fd, k)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}
function bool(fd: FormData, k: string): boolean {
  const v = fd.get(k);
  return v === "on" || v === "true";
}
function num(fd: FormData, k: string): number | null {
  const v = s(fd, k);
  return v === "" ? null : Number(v);
}

/**
 * Her admin server action ic in oturum dogrulamasi. Server action lar path e
 * degil Next-Action ID sine gore cozulur ve proxy matcher inin (/admin/*)
 * disindaki yollara da dogrudan POST edilebilir; bu yuzden koruma proxy ye
 * degil, her action in govdesine konur.
 */
async function yetkiKontrol() {
  const oturum = await auth();
  if (!oturum?.user) throw new Error("Yetkisiz eris im");
}

function yenile(...yollar: string[]) {
  for (const y of yollar) revalidatePath(y);
}

/**
 * Yüklenen görseli WebP'e çevirir ve verilen kutuya sığacak şekilde
 * boyutlandırır (oranı korunur, büyütmez). Dosya yoksa undefined döner.
 */
async function gorselWebp(
  deger: FormDataEntryValue | null,
  genislik: number,
  yukseklik: number,
  kalite = 82,
): Promise<Buffer | undefined> {
  if (!(deger instanceof File) || deger.size === 0) return undefined;
  const giris = Buffer.from(await deger.arrayBuffer());
  return sharp(giris)
    .resize(genislik, yukseklik, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: kalite })
    .toBuffer();
}

// ============ DUYURULAR ============
export async function duyuruKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const gorselVeri = await gorselWebp(fd.get("gorselDosya"), 1600, 900);
  const temel = {
    slug: s(fd, "slug"),
    baslik: s(fd, "baslik"),
    tarih: s(fd, "tarih"),
    kategori: s(fd, "kategori"),
    ozet: s(fd, "ozet"),
    icerik: s(fd, "icerik"),
    gorselAlt: s(fd, "gorselAlt") || null,
    ilgiliHizmetler: arr(fd, "ilgiliHizmetler"),
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) {
    await db
      .update(duyurular)
      .set(gorselVeri ? { ...temel, gorselVeri } : temel)
      .where(eq(duyurular.id, Number(id)));
  } else {
    await db.insert(duyurular).values({ ...temel, gorselVeri: gorselVeri ?? null });
  }
  yenile("/duyurular", "/", "/admin/duyurular");
  redirect("/admin/duyurular");
}
export async function duyuruSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(duyurular).where(eq(duyurular.id, Number(s(fd, "id"))));
  yenile("/duyurular", "/", "/admin/duyurular");
}

// ============ BLOG ============
export async function blogKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const gorselVeri = await gorselWebp(fd.get("gorselDosya"), 1600, 900);
  const temel = {
    slug: s(fd, "slug"),
    baslik: s(fd, "baslik"),
    ozet: s(fd, "ozet"),
    tarih: s(fd, "tarih"),
    kategori: s(fd, "kategori"),
    yazar: s(fd, "yazar") || null,
    gorselAlt: s(fd, "gorselAlt") || null,
    icerik: s(fd, "icerik"),
    ilgiliHizmetler: arr(fd, "ilgiliHizmetler"),
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) {
    await db
      .update(blogYazilari)
      .set(gorselVeri ? { ...temel, gorselVeri } : temel)
      .where(eq(blogYazilari.id, Number(id)));
  } else {
    await db.insert(blogYazilari).values({ ...temel, gorselVeri: gorselVeri ?? null });
  }
  yenile("/blog", "/admin/blog");
  redirect("/admin/blog");
}
export async function blogSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(blogYazilari).where(eq(blogYazilari.id, Number(s(fd, "id"))));
  yenile("/blog", "/admin/blog");
}

// ============ YORUMLAR ============
export async function yorumKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const veri = {
    isim: s(fd, "isim"),
    kurum: s(fd, "kurum") || null,
    yorum: s(fd, "yorum"),
    puan: num(fd, "puan"),
    tarih: s(fd, "tarih") || null,
    yayinda: bool(fd, "yayinda"),
    sira: num(fd, "sira") ?? 0,
  };
  if (id) await db.update(yorumlar).set(veri).where(eq(yorumlar.id, Number(id)));
  else await db.insert(yorumlar).values(veri);
  yenile("/", "/admin/yorumlar");
  redirect("/admin/yorumlar");
}
export async function yorumSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(yorumlar).where(eq(yorumlar.id, Number(s(fd, "id"))));
  yenile("/", "/admin/yorumlar");
}

// ============ REFERANSLAR ============
export async function referansKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");

  // Yüklenen logo dosyasını WebP'e çevir (varsa). Logo şeritte 150×56 gösterilir;
  // retina (2x) için ~300px yeterli — kaynağı küçük tutar, next/image ayrıca
  // gösterim boyutuna küçültüp sıkıştırır.
  const logoVeri = await gorselWebp(fd.get("logoDosya"), 320, 120, 82);

  const temel = {
    ad: s(fd, "ad"),
    logo: s(fd, "logo") || null,
    url: s(fd, "url") || null,
    yayinda: bool(fd, "yayinda"),
    sira: num(fd, "sira") ?? 0,
  };

  if (id) {
    // Düzenlemede yeni dosya yoksa mevcut logo korunur
    await db
      .update(referanslar)
      .set(logoVeri ? { ...temel, logoVeri } : temel)
      .where(eq(referanslar.id, Number(id)));
  } else {
    await db.insert(referanslar).values({ ...temel, logoVeri: logoVeri ?? null });
  }
  yenile("/", "/admin/referanslar");
  redirect("/admin/referanslar");
}
export async function referansSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(referanslar).where(eq(referanslar.id, Number(s(fd, "id"))));
  yenile("/", "/admin/referanslar");
}

// ============ FORM GÖNDERİLERİ ============
export async function gonderiDurum(fd: FormData) {
  await yetkiKontrol();
  await db
    .update(formGonderileri)
    .set({ durum: s(fd, "durum") })
    .where(eq(formGonderileri.id, Number(s(fd, "id"))));
  yenile("/admin/gonderiler");
}
export async function gonderiSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(formGonderileri).where(eq(formGonderileri.id, Number(s(fd, "id"))));
  yenile("/admin/gonderiler");
}

// ============ EĞİTİM ETKİNLİKLERİ ============
function tarihParse(deger: string): Date | null {
  if (!deger) return null;
  const d = new Date(deger);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function etkinlikKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const gorselVeri = await gorselWebp(fd.get("gorselDosya"), 1600, 900);
  const baslangic = tarihParse(s(fd, "baslangic"));
  if (!baslangic) throw new Error("Başlangıç tarihi/saati zorunludur (örn. 2026-06-15T19:00).");
  const bitis = tarihParse(s(fd, "bitis"));

  const temel = {
    slug: s(fd, "slug"),
    baslik: s(fd, "baslik"),
    kategori: s(fd, "kategori"),
    baslangic,
    bitis,
    yer: s(fd, "yer"),
    ozet: s(fd, "ozet"),
    icerik: s(fd, "icerik"),
    gorselAlt: s(fd, "gorselAlt") || null,
    kayitUrl: s(fd, "kayitUrl") || null,
    ucretli: bool(fd, "ucretli"),
    seoTitle: s(fd, "seoTitle") || null,
    seoDescription: s(fd, "seoDescription") || null,
    noIndex: bool(fd, "noIndex"),
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) {
    await db
      .update(egitimEtkinlikleri)
      .set(gorselVeri ? { ...temel, gorselVeri } : temel)
      .where(eq(egitimEtkinlikleri.id, Number(id)));
  } else {
    await db.insert(egitimEtkinlikleri).values({ ...temel, gorselVeri: gorselVeri ?? null });
  }
  yenile("/etkinlikler", "/", "/admin/etkinlikler");
  redirect("/admin/etkinlikler");
}
export async function etkinlikSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(egitimEtkinlikleri).where(eq(egitimEtkinlikleri.id, Number(s(fd, "id"))));
  yenile("/etkinlikler", "/", "/admin/etkinlikler");
}

// ============ ÜST MENÜ EK ÖĞELERİ ============
export async function menuOgesiKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const veri = {
    baslik: s(fd, "baslik"),
    href: s(fd, "href"),
    yeniSekme: bool(fd, "yeniSekme"),
    sira: num(fd, "sira") ?? 0,
    aktif: bool(fd, "aktif"),
    guncellenme: new Date(),
  };
  if (id) await db.update(ekstraMenuOgeleri).set(veri).where(eq(ekstraMenuOgeleri.id, Number(id)));
  else await db.insert(ekstraMenuOgeleri).values(veri);
  updateTag("ust-menu");
  yenile("/", "/admin/menu");
  redirect("/admin/menu");
}
export async function menuOgesiSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(ekstraMenuOgeleri).where(eq(ekstraMenuOgeleri.id, Number(s(fd, "id"))));
  updateTag("ust-menu");
  yenile("/", "/admin/menu");
}

// ============ EKİP ÜYELERİ ============
export async function ekipKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const fotoVeri = await gorselWebp(fd.get("fotoDosya"), 600, 600, 88);
  const temel = {
    ad: s(fd, "ad"),
    unvan: s(fd, "unvan"),
    uzmanlik: s(fd, "uzmanlik") || null,
    fotoAlt: s(fd, "fotoAlt") || null,
    sira: num(fd, "sira") ?? 0,
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) {
    await db
      .update(ekipUyeleri)
      .set(fotoVeri ? { ...temel, fotoVeri } : temel)
      .where(eq(ekipUyeleri.id, Number(id)));
  } else {
    await db.insert(ekipUyeleri).values({ ...temel, fotoVeri: fotoVeri ?? null });
  }
  yenile("/ekibimiz", "/admin/ekip");
  redirect("/admin/ekip");
}
export async function ekipSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(ekipUyeleri).where(eq(ekipUyeleri.id, Number(s(fd, "id"))));
  yenile("/ekibimiz", "/admin/ekip");
}

// ============ AKREDİTASYON BELGELERİ ============
/** PDF veya görsel dosyayı bayt dizisi olarak alır; MIME türünü döner. */
async function dosyaOku(deger: FormDataEntryValue | null): Promise<{ veri: Buffer; mime: string; ad: string } | undefined> {
  if (!(deger instanceof File) || deger.size === 0) return undefined;
  const veri = Buffer.from(await deger.arrayBuffer());
  return { veri, mime: deger.type || "application/octet-stream", ad: deger.name };
}

export async function akreditasyonKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const dosya = await dosyaOku(fd.get("belgeDosya"));
  const temel = {
    ad: s(fd, "ad"),
    aciklama: s(fd, "aciklama") || null,
    kapsam: s(fd, "kapsam") || null,
    gecerlilikTarihi: s(fd, "gecerlilikTarihi") || null,
    sira: num(fd, "sira") ?? 0,
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) {
    await db
      .update(akreditasyonBelgeleri)
      .set(dosya ? { ...temel, belgeVeri: dosya.veri, belgeMime: dosya.mime } : temel)
      .where(eq(akreditasyonBelgeleri.id, Number(id)));
  } else {
    await db.insert(akreditasyonBelgeleri).values({
      ...temel,
      belgeVeri: dosya?.veri ?? null,
      belgeMime: dosya?.mime ?? null,
    });
  }
  yenile("/akreditasyonlarimiz", "/admin/akreditasyonlar");
  redirect("/admin/akreditasyonlar");
}
export async function akreditasyonSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(akreditasyonBelgeleri).where(eq(akreditasyonBelgeleri.id, Number(s(fd, "id"))));
  yenile("/akreditasyonlarimiz", "/admin/akreditasyonlar");
}

// ============ LOGO DOSYALARI ============
export async function logoKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const dosya = await dosyaOku(fd.get("logoDosya"));
  const temel = {
    ad: s(fd, "ad"),
    aciklama: s(fd, "aciklama") || null,
    zeminTipi: s(fd, "zeminTipi") || "acik",
    dosyaAdi: dosya?.ad ?? (s(fd, "dosyaAdi") || null),
    sira: num(fd, "sira") ?? 0,
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) {
    await db
      .update(logoDosyalari)
      .set(dosya ? { ...temel, dosyaVeri: dosya.veri, dosyaMime: dosya.mime } : temel)
      .where(eq(logoDosyalari.id, Number(id)));
  } else {
    await db.insert(logoDosyalari).values({
      ...temel,
      dosyaVeri: dosya?.veri ?? null,
      dosyaMime: dosya?.mime ?? null,
    });
  }
  yenile("/logolarimiz", "/admin/logolar");
  redirect("/admin/logolar");
}
export async function logoSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(logoDosyalari).where(eq(logoDosyalari.id, Number(s(fd, "id"))));
  yenile("/logolarimiz", "/admin/logolar");
}

// ============ DOKÜMANLAR ============
const TIP_HARITA: Record<string, string> = {
  "application/pdf": "PDF",
  "application/msword": "DOCX",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "application/vnd.ms-excel": "XLSX",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
};

export async function dokumanKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const dosya = await dosyaOku(fd.get("dokumanDosya"));
  const elTip = s(fd, "tip");
  const otomatikTip = dosya ? TIP_HARITA[dosya.mime] : undefined;
  const temel = {
    kod: s(fd, "kod"),
    baslik: s(fd, "baslik"),
    aciklama: s(fd, "aciklama") || null,
    kategori: s(fd, "kategori"),
    tip: elTip || otomatikTip || "PDF",
    dosyaAdi: dosya?.ad ?? (s(fd, "dosyaAdi") || null),
    sira: num(fd, "sira") ?? 0,
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) {
    await db
      .update(dokumanlar)
      .set(dosya ? { ...temel, dosyaVeri: dosya.veri, dosyaMime: dosya.mime } : temel)
      .where(eq(dokumanlar.id, Number(id)));
  } else {
    await db.insert(dokumanlar).values({
      ...temel,
      dosyaVeri: dosya?.veri ?? null,
      dosyaMime: dosya?.mime ?? null,
    });
  }
  yenile("/dokumanlar", "/admin/dokumanlar");
  redirect("/admin/dokumanlar");
}
export async function dokumanSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(dokumanlar).where(eq(dokumanlar.id, Number(s(fd, "id"))));
  yenile("/dokumanlar", "/admin/dokumanlar");
}

// ============ ÖZEL SAYFALAR ============
/** Statik route'larla çakışmasın diye yasak slug'lar. */
const REZERVE_SLUGLAR = new Set([
  "admin", "api", "arama", "blog", "cerez-politikasi", "dokumanlar",
  "duyurular", "egitimler", "ekibimiz", "etkinlikler", "gizlilik",
  "hakkimizda", "hizmetler", "iletisim", "kariyer", "kvkk",
  "logolarimiz", "musteri-giris", "politika-ve-beyanlar",
  "robots.txt", "sertifika-sorgula", "sikayet-ve-gorusler",
  "sitemap.xml", "sss", "akreditasyonlarimiz",
]);

function slugGecerliMi(slug: string): { ok: boolean; hata?: string } {
  if (!/^[a-z0-9-]+$/.test(slug)) return { ok: false, hata: "Slug yalnızca küçük harf, rakam ve tire içerebilir." };
  if (slug.startsWith("-") || slug.endsWith("-")) return { ok: false, hata: "Slug tire ile başlayamaz veya bitemez." };
  if (REZERVE_SLUGLAR.has(slug)) return { ok: false, hata: `'${slug}' zaten kullanılan bir sistem yolu — başka bir slug seçin.` };
  return { ok: true };
}

export async function ozelSayfaKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const sablon = s(fd, "sablon");
  if (!sablonBul(sablon)) throw new Error(`Geçersiz şablon: ${sablon}`);

  const slug = s(fd, "slug");
  const dogrulama = slugGecerliMi(slug);
  if (!dogrulama.ok) throw new Error(dogrulama.hata);

  // Şablon alanlarını topla
  const tanim = sablonBul(sablon)!;
  const veri: Record<string, string> = {};
  for (const alan of tanim.alanlar) {
    veri[alan.anahtar] = s(fd, alan.anahtar);
  }

  const temel = {
    slug,
    baslik: s(fd, "baslik"),
    sablon,
    ustEtiket: s(fd, "ustEtiket") || null,
    aciklama: s(fd, "aciklama") || null,
    veri,
    seoTitle: s(fd, "seoTitle") || null,
    seoDescription: s(fd, "seoDescription") || null,
    noIndex: bool(fd, "noIndex"),
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };

  if (id) {
    await db.update(ozelSayfalar).set(temel).where(eq(ozelSayfalar.id, Number(id)));
  } else {
    await db.insert(ozelSayfalar).values(temel);
  }
  yenile(`/${slug}`, "/admin/sayfalar");
  redirect("/admin/sayfalar");
}

export async function ozelSayfaSil(fd: FormData) {
  await yetkiKontrol();
  // Önce slug'ı al (rota cache temizleme için)
  const id = Number(s(fd, "id"));
  const mevcut = (await db.select({ slug: ozelSayfalar.slug }).from(ozelSayfalar).where(eq(ozelSayfalar.id, id)).limit(1))[0];
  await db.delete(ozelSayfalar).where(eq(ozelSayfalar.id, id));
  if (mevcut) yenile(`/${mevcut.slug}`);
  yenile("/admin/sayfalar");
}

// ============ SAYFA İÇERİK BLOKLARI ============
export async function sayfaIcerikKaydet(fd: FormData) {
  await yetkiKontrol();
  const yol = s(fd, "yol");
  const tanim = SAYFA_ICERIK[yol];
  if (!tanim) throw new Error(`Bu yol için içerik tanımı yok: ${yol}`);

  // Her alanı sırayla upsert et; boş gönderilenler de DB'de boş kalır
  // (boşluk alanDegeri() içinde varsayılana fallback'i tetikler).
  for (const alan of tanim.alanlar) {
    const deger = s(fd, alan.anahtar);
    await db
      .insert(sayfaBloklari)
      .values({ yol, anahtar: alan.anahtar, deger, guncellenme: new Date() })
      .onConflictDoUpdate({
        target: [sayfaBloklari.yol, sayfaBloklari.anahtar],
        set: { deger, guncellenme: new Date() },
      });
  }
  updateTag("sayfa-icerik");
  revalidatePath(yol);
  redirect(`/admin/icerik?yol=${encodeURIComponent(yol)}&ok=1`);
}

export async function sayfaIcerikSifirla(fd: FormData) {
  await yetkiKontrol();
  const yol = s(fd, "yol");
  const anahtar = s(fd, "anahtar");
  await db
    .delete(sayfaBloklari)
    .where(and(eq(sayfaBloklari.yol, yol), eq(sayfaBloklari.anahtar, anahtar)));
  updateTag("sayfa-icerik");
  revalidatePath(yol);
  redirect(`/admin/icerik?yol=${encodeURIComponent(yol)}`);
}

/** Sayfa kapak görseli yükle (WebP'e çevrilir, sayfaSeo.kapakVeri'ye yazılır). */
export async function sayfaKapakKaydet(fd: FormData) {
  await yetkiKontrol();
  const yol = s(fd, "yol");
  if (!yol) throw new Error("Sayfa yolu zorunludur.");
  // Kapak ~1280×380 gösterilir; retina için 2x'e kadar saklarız (oran korunur).
  const kapak = await gorselWebp(fd.get("kapakDosya"), 2560, 760, 84);
  if (!kapak) {
    // Dosya seçilmemiş / boş gelmiş — yanıltıcı "kaydedildi" göstermeyelim.
    redirect(`/admin/icerik?yol=${encodeURIComponent(yol)}&kapakhata=bos`);
  }
  await db
    .insert(sayfaSeo)
    .values({ yol, kapakVeri: kapak, guncellenme: new Date() })
    .onConflictDoUpdate({ target: sayfaSeo.yol, set: { kapakVeri: kapak, guncellenme: new Date() } });
  updateTag("sayfa-kapak");
  revalidatePath(yol);
  redirect(`/admin/icerik?yol=${encodeURIComponent(yol)}&kapakok=1`);
}

/** Sayfa kapak görselini kaldır. */
export async function sayfaKapakSil(fd: FormData) {
  await yetkiKontrol();
  const yol = s(fd, "yol");
  await db.update(sayfaSeo).set({ kapakVeri: null, guncellenme: new Date() }).where(eq(sayfaSeo.yol, yol));
  updateTag("sayfa-kapak");
  revalidatePath(yol);
  redirect(`/admin/icerik?yol=${encodeURIComponent(yol)}`);
}

// ============ SSS SORULARI ============
export async function sssKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const veri = {
    soru: s(fd, "soru"),
    cevap: s(fd, "cevap"),
    sira: num(fd, "sira") ?? 0,
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) await db.update(sssSorulari).set(veri).where(eq(sssSorulari.id, Number(id)));
  else await db.insert(sssSorulari).values(veri);
  yenile("/sss", "/admin/sss");
  redirect("/admin/sss");
}
export async function sssSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(sssSorulari).where(eq(sssSorulari.id, Number(s(fd, "id"))));
  yenile("/sss", "/admin/sss");
}

// ============ SAYFA SEO OVERRIDE ============
export async function sayfaSeoKaydet(fd: FormData) {
  await yetkiKontrol();
  const yol = s(fd, "yol");
  if (!yol) throw new Error("Sayfa yolu zorunludur.");
  const ogVeri = await gorselWebp(fd.get("ogImageDosya"), 1200, 630, 86);

  const temel = {
    seoTitle: s(fd, "seoTitle") || null,
    seoDescription: s(fd, "seoDescription") || null,
    noIndex: bool(fd, "noIndex"),
    guncellenme: new Date(),
  };
  await db
    .insert(sayfaSeo)
    .values({ yol, ...temel, ogImageVeri: ogVeri ?? null })
    .onConflictDoUpdate({
      target: sayfaSeo.yol,
      set: ogVeri ? { ...temel, ogImageVeri: ogVeri } : temel,
    });

  updateTag("sayfa-seo");
  revalidatePath("/", "layout");
  redirect(`/admin/sayfa-seo?ok=1&yol=${encodeURIComponent(yol)}`);
}

// ============ POP-UP (site geneli modal) ============
export async function popupKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  // Görsel modalda ~440px genişlikte gösterilir; retina için 2x'e kadar saklarız.
  const gorselVeri = await gorselWebp(fd.get("gorselDosya"), 1000, 1000, 86);
  const gorselKaldir = bool(fd, "gorselKaldir");

  const temel = {
    aktif: bool(fd, "aktif"),
    baslik: s(fd, "baslik") || null,
    metin: s(fd, "metin") || null,
    butonYazi: s(fd, "butonYazi") || null,
    butonUrl: s(fd, "butonUrl") || null,
    gorselAlt: s(fd, "gorselAlt") || null,
    guncellenme: new Date(),
  };

  if (id) {
    const set = gorselVeri
      ? { ...temel, gorselVeri }
      : gorselKaldir
        ? { ...temel, gorselVeri: null }
        : temel;
    await db.update(popup).set(set).where(eq(popup.id, Number(id)));
  } else {
    await db.insert(popup).values({ ...temel, gorselVeri: gorselVeri ?? null });
  }

  updateTag("popup");
  revalidatePath("/", "layout");
  redirect("/admin/popup?ok=1");
}

// ============ SİTE AYARLARI (sosyal medya vb.) ============
export async function siteAyarlariKaydet(fd: FormData) {
  await yetkiKontrol();
  const kayitlar: { anahtar: string; deger: string }[] = [
    { anahtar: "sosyal.linkedin", deger: s(fd, "linkedin") },
    { anahtar: "sosyal.instagram", deger: s(fd, "instagram") },
    { anahtar: "sosyal.twitter", deger: s(fd, "twitter") },
    { anahtar: "sosyal.facebook", deger: s(fd, "facebook") },
  ];
  for (const k of kayitlar) {
    await db
      .insert(siteAyarlari)
      .values({ anahtar: k.anahtar, deger: k.deger, guncellenme: new Date() })
      .onConflictDoUpdate({
        target: siteAyarlari.anahtar,
        set: { deger: k.deger, guncellenme: new Date() },
      });
  }
  // Önbelleği temizle: footer ve blog 'Bizi Takip Et' kullanan tüm sayfalar.
  updateTag("site-ayarlari");
  revalidatePath("/", "layout");
  redirect("/admin/site-ayarlari?ok=1");
}
