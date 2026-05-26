/**
 * Eğitim ve etkinlikler — public erişim katmanı.
 * DB'den yayındaki etkinlikleri okur; hata olursa boş dizi döner
 * (statik fallback yok — etkinlikler tamamen admin tarafından yönetilir).
 */

import { and, asc, desc, eq, gte, sql } from "drizzle-orm";
import { db, dbHazir } from "./db";
import { egitimEtkinlikleri as tbl } from "./db/schema";

export type Etkinlik = {
  id: number;
  slug: string;
  baslik: string;
  kategori: string;
  baslangic: Date;
  bitis: Date | null;
  yer: string;
  ozet: string;
  icerik: string;
  gorsel?: string;
  gorselAlt?: string;
  kayitUrl?: string;
  ucretli: boolean;
  seoTitle?: string;
  seoDescription?: string;
  noIndex: boolean;
};

const secim = {
  id: tbl.id,
  slug: tbl.slug,
  baslik: tbl.baslik,
  kategori: tbl.kategori,
  baslangic: tbl.baslangic,
  bitis: tbl.bitis,
  yer: tbl.yer,
  ozet: tbl.ozet,
  icerik: tbl.icerik,
  gorsel: tbl.gorsel,
  gorselAlt: tbl.gorselAlt,
  kayitUrl: tbl.kayitUrl,
  ucretli: tbl.ucretli,
  seoTitle: tbl.seoTitle,
  seoDescription: tbl.seoDescription,
  noIndex: tbl.noIndex,
  gorselVar: sql<boolean>`${tbl.gorselVeri} is not null`,
} as const;

type HamSatir = Awaited<ReturnType<typeof temelSorgu>>[number];

function temelSorgu() {
  return db.select(secim).from(tbl);
}

function bicim(r: HamSatir): Etkinlik {
  return {
    id: r.id,
    slug: r.slug,
    baslik: r.baslik,
    kategori: r.kategori,
    baslangic: r.baslangic,
    bitis: r.bitis,
    yer: r.yer,
    ozet: r.ozet,
    icerik: r.icerik,
    gorsel: r.gorselVar ? `/api/gorsel/etkinlik/${r.id}` : r.gorsel ?? undefined,
    gorselAlt: r.gorselAlt ?? undefined,
    kayitUrl: r.kayitUrl ?? undefined,
    ucretli: r.ucretli,
    seoTitle: r.seoTitle ?? undefined,
    seoDescription: r.seoDescription ?? undefined,
    noIndex: r.noIndex,
  };
}

/** Tüm yayındaki etkinlikler — yeni başlangıç tarihi önce. */
export async function etkinlikleriGetir(): Promise<Etkinlik[]> {
  if (!dbHazir) return [];
  try {
    const rows = await temelSorgu()
      .where(eq(tbl.yayinda, true))
      .orderBy(desc(tbl.baslangic));
    return rows.map(bicim);
  } catch (e) {
    console.error("etkinlikleriGetir DB hatası:", e);
    return [];
  }
}

/** Yaklaşan etkinlikler (başlangıç tarihi şu andan ileride), en yakın önce. */
export async function yaklasanEtkinlikleriGetir(limit = 3): Promise<Etkinlik[]> {
  if (!dbHazir) return [];
  try {
    const rows = await temelSorgu()
      .where(and(eq(tbl.yayinda, true), gte(tbl.baslangic, new Date())))
      .orderBy(asc(tbl.baslangic))
      .limit(limit);
    return rows.map(bicim);
  } catch (e) {
    console.error("yaklasanEtkinlikleriGetir DB hatası:", e);
    return [];
  }
}

export async function etkinlikDetay(slug: string): Promise<Etkinlik | undefined> {
  if (!dbHazir) return undefined;
  try {
    const rows = await temelSorgu()
      .where(and(eq(tbl.slug, slug), eq(tbl.yayinda, true)))
      .limit(1);
    return rows[0] ? bicim(rows[0]) : undefined;
  } catch (e) {
    console.error("etkinlikDetay DB hatası:", e);
    return undefined;
  }
}

/** Etkinlik başlangıç tarihini Türkçe biçimle. */
export function etkinlikTarihBicim(d: Date, opts: { saatGoster?: boolean } = {}): string {
  return new Date(d).toLocaleString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(opts.saatGoster ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}
