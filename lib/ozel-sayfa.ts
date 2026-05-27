/**
 * Özel sayfa (admin'den şablonla oluşturulan) public erişim katmanı.
 */

import { unstable_cache } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db, dbHazir } from "./db";
import { ozelSayfalar } from "./db/schema";

export type OzelSayfa = {
  id: number;
  slug: string;
  baslik: string;
  sablon: string;
  ustEtiket?: string;
  aciklama?: string;
  veri: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  noIndex: boolean;
};

async function _getir(slug: string): Promise<OzelSayfa | undefined> {
  if (!dbHazir) return undefined;
  try {
    const r = (
      await db
        .select()
        .from(ozelSayfalar)
        .where(and(eq(ozelSayfalar.slug, slug), eq(ozelSayfalar.yayinda, true)))
        .limit(1)
    )[0];
    if (!r) return undefined;
    return {
      id: r.id,
      slug: r.slug,
      baslik: r.baslik,
      sablon: r.sablon,
      ustEtiket: r.ustEtiket ?? undefined,
      aciklama: r.aciklama ?? undefined,
      veri: (r.veri ?? {}) as Record<string, string>,
      seoTitle: r.seoTitle ?? undefined,
      seoDescription: r.seoDescription ?? undefined,
      noIndex: r.noIndex,
    };
  } catch (e) {
    console.error("ozelSayfaDetay DB hatası:", e);
    return undefined;
  }
}

/** 5 dk önbellekli; admin kaydedince revalidatePath ile temizleniyor. */
export const ozelSayfaDetay = unstable_cache(_getir, ["ozel-sayfa-v1"], { revalidate: 300 });

/** Tüm yayındaki özel sayfaların slug'larını döner (sitemap / generateStaticParams için). */
export async function ozelSayfaSluglari(): Promise<string[]> {
  if (!dbHazir) return [];
  try {
    const rows = await db
      .select({ slug: ozelSayfalar.slug })
      .from(ozelSayfalar)
      .where(eq(ozelSayfalar.yayinda, true));
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}
