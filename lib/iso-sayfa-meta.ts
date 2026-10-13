import type { Metadata } from "next";
import { isoIcerikler, isoMeta } from "./iso-icerik";
import { seoBaslik } from "./seo-baslik";
import { sayfaSeoGetir } from "./faz2-icerik";
import { siteConfig } from "./site-config";

/**
 * ISO sayfaları için metadata üreticisi — statik isoMeta()'yı tabanlı alır
 * ve sayfa_seo tablosundaki override değerleriyle birleştirir.
 */
export async function isoSayfaMetadata(slug: string): Promise<Metadata> {
  const tabanli = isoMeta(slug);
  const yol = `/hizmetler/${slug}`;
  const override = await sayfaSeoGetir(yol);
  if (!override) return tabanli;

  const sonTitle = override.seoTitle || isoIcerikler[slug].metaTitle;
  const sonDesc = override.seoDescription || (tabanli.description as string);
  const ogImageUrl = override.ogImage ? `${siteConfig.url}${override.ogImage}` : undefined;

  const m: Metadata = {
    ...tabanli,
    title: seoBaslik(sonTitle),
    description: sonDesc,
    robots: override.noIndex ? { index: false, follow: false } : tabanli.robots,
  };
  if (ogImageUrl) {
    m.openGraph = {
      ...tabanli.openGraph,
      title: sonTitle,
      description: sonDesc,
      images: [{ url: ogImageUrl }],
    };
  }
  return m;
}
