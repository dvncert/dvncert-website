/**
 * Faz 2 entity'lerinin public erişim katmanı.
 * Ekip, akreditasyon belgeleri, logolar, dokümanlar ve sayfa SEO override'ı.
 * DB hata verirse boş dizi/undefined döner; admin'le yönetilen tüm içerik.
 */

import { unstable_cache } from "next/cache";
import { asc, eq, sql } from "drizzle-orm";
import { db, dbHazir } from "./db";
import {
  ekipUyeleri,
  akreditasyonBelgeleri,
  logoDosyalari,
  dokumanlar,
  sayfaSeo,
} from "./db/schema";

// ---------- Ekip ----------
export type EkipUyesi = {
  id: number;
  ad: string;
  unvan: string;
  uzmanlik?: string;
  foto?: string;
  fotoAlt?: string;
};

export async function ekipUyeleriniGetir(): Promise<EkipUyesi[]> {
  if (!dbHazir) return [];
  try {
    const rows = await db
      .select({
        id: ekipUyeleri.id,
        ad: ekipUyeleri.ad,
        unvan: ekipUyeleri.unvan,
        uzmanlik: ekipUyeleri.uzmanlik,
        fotoAlt: ekipUyeleri.fotoAlt,
        fotoVar: sql<boolean>`${ekipUyeleri.fotoVeri} is not null`,
        guncellenme: ekipUyeleri.guncellenme,
      })
      .from(ekipUyeleri)
      .where(eq(ekipUyeleri.yayinda, true))
      .orderBy(asc(ekipUyeleri.sira), asc(ekipUyeleri.id));
    return rows.map((r) => ({
      id: r.id,
      ad: r.ad,
      unvan: r.unvan,
      uzmanlik: r.uzmanlik ?? undefined,
      foto: r.fotoVar ? `/api/gorsel/ekip/${r.id}?v=${new Date(r.guncellenme).getTime()}` : undefined,
      fotoAlt: r.fotoAlt ?? undefined,
    }));
  } catch (e) {
    console.error("ekipUyeleriniGetir DB hatası:", e);
    return [];
  }
}

// ---------- Akreditasyon belgeleri ----------
export type AkreditasyonBelgesi = {
  id: number;
  ad: string;
  aciklama?: string;
  kapsam?: string;
  belge?: string;
  belgeMime?: string;
  gecerlilikTarihi?: string;
};

export async function akreditasyonBelgeleriniGetir(): Promise<AkreditasyonBelgesi[]> {
  if (!dbHazir) return [];
  try {
    const rows = await db
      .select({
        id: akreditasyonBelgeleri.id,
        ad: akreditasyonBelgeleri.ad,
        aciklama: akreditasyonBelgeleri.aciklama,
        kapsam: akreditasyonBelgeleri.kapsam,
        belgeMime: akreditasyonBelgeleri.belgeMime,
        gecerlilikTarihi: akreditasyonBelgeleri.gecerlilikTarihi,
        belgeVar: sql<boolean>`${akreditasyonBelgeleri.belgeVeri} is not null`,
      })
      .from(akreditasyonBelgeleri)
      .where(eq(akreditasyonBelgeleri.yayinda, true))
      .orderBy(asc(akreditasyonBelgeleri.sira), asc(akreditasyonBelgeleri.id));
    return rows.map((r) => ({
      id: r.id,
      ad: r.ad,
      aciklama: r.aciklama ?? undefined,
      kapsam: r.kapsam ?? undefined,
      belge: r.belgeVar ? `/api/dosya/akreditasyon/${r.id}` : undefined,
      belgeMime: r.belgeMime ?? undefined,
      gecerlilikTarihi: r.gecerlilikTarihi ?? undefined,
    }));
  } catch (e) {
    console.error("akreditasyonBelgeleriniGetir DB hatası:", e);
    return [];
  }
}

// ---------- Logo dosyaları ----------
export type LogoDosyasi = {
  id: number;
  ad: string;
  aciklama?: string;
  zeminTipi: string;
  dosya?: string;
  dosyaMime?: string;
  dosyaAdi?: string;
};

export async function logoDosyalariniGetir(): Promise<LogoDosyasi[]> {
  if (!dbHazir) return [];
  try {
    const rows = await db
      .select({
        id: logoDosyalari.id,
        ad: logoDosyalari.ad,
        aciklama: logoDosyalari.aciklama,
        zeminTipi: logoDosyalari.zeminTipi,
        dosyaMime: logoDosyalari.dosyaMime,
        dosyaAdi: logoDosyalari.dosyaAdi,
        dosyaVar: sql<boolean>`${logoDosyalari.dosyaVeri} is not null`,
      })
      .from(logoDosyalari)
      .where(eq(logoDosyalari.yayinda, true))
      .orderBy(asc(logoDosyalari.sira), asc(logoDosyalari.id));
    return rows.map((r) => ({
      id: r.id,
      ad: r.ad,
      aciklama: r.aciklama ?? undefined,
      zeminTipi: r.zeminTipi,
      dosya: r.dosyaVar ? `/api/dosya/logo/${r.id}` : undefined,
      dosyaMime: r.dosyaMime ?? undefined,
      dosyaAdi: r.dosyaAdi ?? undefined,
    }));
  } catch (e) {
    console.error("logoDosyalariniGetir DB hatası:", e);
    return [];
  }
}

// ---------- Dokümanlar ----------
export type DokumanKaydi = {
  id: number;
  kod: string;
  baslik: string;
  aciklama?: string;
  kategori: string;
  tip: string;
  dosya?: string;
  dosyaAdi?: string;
};

export async function dokumanlariGetir(): Promise<DokumanKaydi[]> {
  if (!dbHazir) return [];
  try {
    const rows = await db
      .select({
        id: dokumanlar.id,
        kod: dokumanlar.kod,
        baslik: dokumanlar.baslik,
        aciklama: dokumanlar.aciklama,
        kategori: dokumanlar.kategori,
        tip: dokumanlar.tip,
        dosyaAdi: dokumanlar.dosyaAdi,
        dosyaVar: sql<boolean>`${dokumanlar.dosyaVeri} is not null`,
      })
      .from(dokumanlar)
      .where(eq(dokumanlar.yayinda, true))
      .orderBy(asc(dokumanlar.sira), asc(dokumanlar.id));
    return rows.map((r) => ({
      id: r.id,
      kod: r.kod,
      baslik: r.baslik,
      aciklama: r.aciklama ?? undefined,
      kategori: r.kategori,
      tip: r.tip,
      dosya: r.dosyaVar ? `/api/dosya/dokuman/${r.id}` : undefined,
      dosyaAdi: r.dosyaAdi ?? undefined,
    }));
  } catch (e) {
    console.error("dokumanlariGetir DB hatası:", e);
    return [];
  }
}

// ---------- Sayfa SEO override ----------
export type SayfaSeoKayit = {
  seoTitle?: string;
  seoDescription?: string;
  noIndex: boolean;
  ogImage?: string;
};

async function _sayfaSeoGetir(yol: string): Promise<SayfaSeoKayit | undefined> {
  if (!dbHazir) return undefined;
  try {
    const r = (
      await db
        .select({
          yol: sayfaSeo.yol,
          seoTitle: sayfaSeo.seoTitle,
          seoDescription: sayfaSeo.seoDescription,
          noIndex: sayfaSeo.noIndex,
          ogVar: sql<boolean>`${sayfaSeo.ogImageVeri} is not null`,
          guncellenme: sayfaSeo.guncellenme,
        })
        .from(sayfaSeo)
        .where(eq(sayfaSeo.yol, yol))
        .limit(1)
    )[0];
    if (!r) return undefined;
    return {
      seoTitle: r.seoTitle ?? undefined,
      seoDescription: r.seoDescription ?? undefined,
      noIndex: r.noIndex,
      ogImage: r.ogVar ? `/api/gorsel/sayfa-seo/${encodeURIComponent(yol)}?v=${new Date(r.guncellenme).getTime()}` : undefined,
    };
  } catch (e) {
    console.error("sayfaSeoGetir DB hatası:", e);
    return undefined;
  }
}

/**
 * Bir sayfanın SEO override'ını çek. 30 dk önbellekli (admin kaydedince
 * updateTag('sayfa-seo') ile temizleniyor).
 */
export const sayfaSeoGetir = unstable_cache(_sayfaSeoGetir, ["sayfa-seo-v1"], {
  revalidate: 1800,
  tags: ["sayfa-seo"],
});
