import { hizmetOgGorseli, OG_BOYUT, OG_CONTENT_TYPE } from "@/lib/og-sablon";

/**
 * Hizmet detayına özel dinamik OG görseli (başlık + standart/kategori gömülü).
 * Dinamik /hizmetler/[slug] rotasını (2-taraf, şube, sistem-belgelendirme) kapsar;
 * ISO rotalarının kendi opengraph-image dosyaları vardır.
 */

export const alt = "DVN Cert hizmet";
export const size = OG_BOYUT;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return hizmetOgGorseli(slug);
}
