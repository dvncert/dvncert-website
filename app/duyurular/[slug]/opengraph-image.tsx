import { duyuruDetay } from "@/lib/icerik";
import { ogDetayGorseli, OG_BOYUT, OG_CONTENT_TYPE } from "@/lib/og-sablon";

/**
 * Duyuruya özel dinamik OG görseli (başlık + kategori gömülü).
 * Kök opengraph-image.tsx'i bu segment için geçersiz kılar.
 */

export const alt = "DVN Cert duyurusu";
export const size = OG_BOYUT;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const duyuru = await duyuruDetay(slug);
  return ogDetayGorseli({
    etiket: duyuru?.kategori ?? "Duyuru",
    baslik: duyuru?.baslik ?? "DVN Cert Belgelendirme",
  });
}
