import { egitimOgGorseli, OG_BOYUT, OG_CONTENT_TYPE } from "@/lib/og-sablon";

/**
 * Eğitim detayına özel dinamik OG görseli (başlık + standart gömülü).
 * Tüm /egitimler/[slug] rotalarını kapsar.
 */

export const alt = "DVN Cert eğitim";
export const size = OG_BOYUT;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return egitimOgGorseli(slug);
}
