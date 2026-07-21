import { blogDetay } from "@/lib/icerik";
import { ogDetayGorseli, OG_BOYUT, OG_CONTENT_TYPE } from "@/lib/og-sablon";

/**
 * Blog yazısına özel dinamik OG görseli (başlık + kategori gömülü).
 * Kök opengraph-image.tsx'i bu segment için geçersiz kılar; paylaşımlarda
 * (LinkedIn/WhatsApp/Facebook) jenerik görsel yerine yazıya özel görsel çıkar.
 */

export const alt = "DVN Cert blog yazısı";
export const size = OG_BOYUT;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yazi = await blogDetay(slug);
  return ogDetayGorseli({
    etiket: yazi?.kategori ?? "Blog",
    baslik: yazi?.baslik ?? "DVN Cert Belgelendirme",
  });
}
