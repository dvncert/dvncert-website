/**
 * DVN Cert - Public içerik erişim katmanı (DB öncelikli, lib fallback)
 *
 * Sunucu bileşenleri bu fonksiyonları çağırır. DB hazırsa (POSTGRES_URL varsa)
 * yayındaki içerik DB'den okunur; herhangi bir hata olursa lib/*.ts statik
 * içeriğine düşülür — böylece DB sorunları canlı siteyi BOZMAZ.
 *
 * Yalnızca sunucuda kullanılır (db import eder).
 */

import { desc, eq } from "drizzle-orm";
import { db, dbHazir } from "./db";
import {
  duyurular as duyurularTbl,
  blogYazilari as blogTbl,
  yorumlar as yorumlarTbl,
  referanslar as referanslarTbl,
} from "./db/schema";

import { duyurular as duyurularStatik, type Duyuru } from "./duyurular";
import { blogYazilari as blogStatik, type BlogYazisi } from "./blog";
import { musteriYorumlari as yorumlarStatik, type MusteriYorumu } from "./yorumlar";
import { referanslar as referanslarStatik, type Referans } from "./referanslar";

// ---------- Duyurular ----------
export async function duyurulariGetir(): Promise<Duyuru[]> {
  if (!dbHazir) return duyurularStatik;
  try {
    const rows = await db
      .select()
      .from(duyurularTbl)
      .where(eq(duyurularTbl.yayinda, true))
      .orderBy(desc(duyurularTbl.tarih));
    return rows.map((r) => ({
      slug: r.slug,
      baslik: r.baslik,
      tarih: r.tarih,
      kategori: r.kategori,
      ozet: r.ozet,
      icerik: r.icerik,
      gorsel: r.gorsel ?? undefined,
      ilgiliHizmetler: r.ilgiliHizmetler ?? [],
    }));
  } catch (e) {
    console.error("duyurulariGetir DB hatası, statik içeriğe düşülüyor:", e);
    return duyurularStatik;
  }
}

export async function duyuruDetay(slug: string): Promise<Duyuru | undefined> {
  return (await duyurulariGetir()).find((d) => d.slug === slug);
}

// ---------- Blog ----------
export async function bloglariGetir(): Promise<BlogYazisi[]> {
  if (!dbHazir) return blogStatik;
  try {
    const rows = await db
      .select()
      .from(blogTbl)
      .where(eq(blogTbl.yayinda, true))
      .orderBy(desc(blogTbl.tarih));
    return rows.map((r) => ({
      slug: r.slug,
      baslik: r.baslik,
      ozet: r.ozet,
      tarih: r.tarih,
      kategori: r.kategori,
      yazar: r.yazar ?? undefined,
      gorsel: r.gorsel ?? undefined,
      icerik: r.icerik,
      ilgiliHizmetler: r.ilgiliHizmetler ?? [],
    }));
  } catch (e) {
    console.error("bloglariGetir DB hatası, statik içeriğe düşülüyor:", e);
    return blogStatik;
  }
}

export async function blogDetay(slug: string): Promise<BlogYazisi | undefined> {
  return (await bloglariGetir()).find((b) => b.slug === slug);
}

// ---------- Müşteri yorumları ----------
export async function yorumlariGetir(): Promise<MusteriYorumu[]> {
  if (!dbHazir) return yorumlarStatik;
  try {
    const rows = await db
      .select()
      .from(yorumlarTbl)
      .where(eq(yorumlarTbl.yayinda, true))
      .orderBy(desc(yorumlarTbl.sira), desc(yorumlarTbl.id));
    return rows.map((r) => ({
      isim: r.isim,
      kurum: r.kurum ?? undefined,
      yorum: r.yorum,
      puan: r.puan ?? undefined,
      tarih: r.tarih ?? undefined,
    }));
  } catch (e) {
    console.error("yorumlariGetir DB hatası, statik içeriğe düşülüyor:", e);
    return yorumlarStatik;
  }
}

// ---------- Referanslar ----------
export async function referanslariGetir(): Promise<Referans[]> {
  if (!dbHazir) return referanslarStatik;
  try {
    const rows = await db
      .select()
      .from(referanslarTbl)
      .where(eq(referanslarTbl.yayinda, true))
      .orderBy(desc(referanslarTbl.sira), desc(referanslarTbl.id));
    return rows.map((r) => ({ ad: r.ad, logo: r.logo, url: r.url ?? undefined }));
  } catch (e) {
    console.error("referanslariGetir DB hatası, statik içeriğe düşülüyor:", e);
    return referanslarStatik;
  }
}
