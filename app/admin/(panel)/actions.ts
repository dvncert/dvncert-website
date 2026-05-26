"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import sharp from "sharp";
import { db } from "@/lib/db";
import {
  duyurular,
  blogYazilari,
  yorumlar,
  referanslar,
  formGonderileri,
  siteAyarlari,
  egitimEtkinlikleri,
  ekstraMenuOgeleri,
} from "@/lib/db/schema";

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
  await db.delete(duyurular).where(eq(duyurular.id, Number(s(fd, "id"))));
  yenile("/duyurular", "/", "/admin/duyurular");
}

// ============ BLOG ============
export async function blogKaydet(fd: FormData) {
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
  await db.delete(blogYazilari).where(eq(blogYazilari.id, Number(s(fd, "id"))));
  yenile("/blog", "/admin/blog");
}

// ============ YORUMLAR ============
export async function yorumKaydet(fd: FormData) {
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
  await db.delete(yorumlar).where(eq(yorumlar.id, Number(s(fd, "id"))));
  yenile("/", "/admin/yorumlar");
}

// ============ REFERANSLAR ============
export async function referansKaydet(fd: FormData) {
  const id = s(fd, "id");

  // Yüklenen logo dosyasını WebP'e çevir (varsa)
  const logoVeri = await gorselWebp(fd.get("logoDosya"), 400, 200, 90);

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
  await db.delete(referanslar).where(eq(referanslar.id, Number(s(fd, "id"))));
  yenile("/", "/admin/referanslar");
}

// ============ FORM GÖNDERİLERİ ============
export async function gonderiDurum(fd: FormData) {
  await db
    .update(formGonderileri)
    .set({ durum: s(fd, "durum") })
    .where(eq(formGonderileri.id, Number(s(fd, "id"))));
  yenile("/admin/gonderiler");
}
export async function gonderiSil(fd: FormData) {
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
  await db.delete(egitimEtkinlikleri).where(eq(egitimEtkinlikleri.id, Number(s(fd, "id"))));
  yenile("/etkinlikler", "/", "/admin/etkinlikler");
}

// ============ ÜST MENÜ EK ÖĞELERİ ============
export async function menuOgesiKaydet(fd: FormData) {
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
  await db.delete(ekstraMenuOgeleri).where(eq(ekstraMenuOgeleri.id, Number(s(fd, "id"))));
  updateTag("ust-menu");
  yenile("/", "/admin/menu");
}

// ============ SİTE AYARLARI (sosyal medya vb.) ============
export async function siteAyarlariKaydet(fd: FormData) {
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
