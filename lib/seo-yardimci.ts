import type { Metadata } from "next";
import { sayfaSeoGetir } from "./faz2-icerik";
import { siteConfig } from "./site-config";

type Varsayilan = {
  yol: string;
  title: string;
  description?: string;
};

/**
 * Sayfa için Next.js Metadata üretir. Admin panelinden `sayfa_seo` tablosunda
 * override edilmişse onları kullanır, yoksa parametre olarak verilen varsayılanları
 * koyar. OG görseli admin'den yüklendiyse otomatik ekler, robots'a noIndex uygular.
 */
export async function sayfaMetadataUret({ yol, title, description }: Varsayilan): Promise<Metadata> {
  const override = await sayfaSeoGetir(yol);
  const sonTitle = override?.seoTitle || title;
  const sonDesc = override?.seoDescription || description;
  const canonical = `${siteConfig.url}${yol}`;
  const ogImageUrl = override?.ogImage ? `${siteConfig.url}${override.ogImage}` : undefined;

  const m: Metadata = {
    title: sonTitle,
    description: sonDesc,
    alternates: { canonical },
    robots: override?.noIndex ? { index: false, follow: false } : undefined,
  };
  if (ogImageUrl) {
    m.openGraph = {
      title: sonTitle,
      description: sonDesc,
      url: canonical,
      images: [{ url: ogImageUrl }],
    };
    m.twitter = {
      card: "summary_large_image",
      title: sonTitle,
      description: sonDesc,
      images: [ogImageUrl],
    };
  }
  return m;
}
