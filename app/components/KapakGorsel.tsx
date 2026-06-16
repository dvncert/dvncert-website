import Image from "next/image";

/**
 * Sayfa başlığının altında yer alan tam genişlik kapak görseli.
 *
 * - `src` verilirse next/image ile gösterilir: otomatik WebP/AVIF dönüşümü,
 *   responsive srcset, sabit oran (CLS yok). LCP görseli için `oncelik` ver.
 * - `src` verilmezse marka renkli, zarif bir yer tutucu gösterilir (dosya
 *   gerektirmez). Gerçek görsel /public/gorseller/...webp olarak eklenip
 *   `src` girilince otomatik gerçek görsele döner.
 *
 * Görseller WebP formatında /public/gorseller/ altında tutulmalıdır.
 */
export default function KapakGorsel(props: {
  /** /gorseller/...webp — boşsa yer tutucu gösterilir */
  src?: string;
  /** SEO ve erişilebilirlik için zorunlu açıklama */
  alt: string;
  /** Eski çağrılarla uyumluluk için tutulur; yer tutucuda ikon gösterilmez. */
  ikon?: string;
  /** Yer tutucuda gösterilecek metin */
  etiket?: string;
  /** Ekranın üst kısmındaysa (LCP) preload için true ver */
  oncelik?: boolean;
}) {
  const { src, alt, etiket, oncelik = false } = props;
  const gorsel = src || "/gorseller/dvn-cert-kurumsal-kapak.webp";

  return (
    <section className="dvn-kapak">
      <div className="dvn-kapak-ic">
        <div className="dvn-kapak-govde">
          <Image
            src={gorsel}
            alt={alt}
            fill
            sizes="(max-width: 1344px) 100vw, 1280px"
            preload={oncelik}
            className="dvn-kapak-img"
          />
          <div className="dvn-kapak-overlay" />
          <div className="dvn-kapak-metin">
            <span className="dvn-kapak-marka">DVN CERT</span>
            {etiket && <p>{etiket}</p>}
          </div>
          <div className="dvn-kapak-veri" aria-hidden="true">
            <span>Tarafsız değerlendirme</span>
            <span>İzlenebilir kayıt</span>
            <span>Online doğrulama</span>
          </div>
        </div>
      </div>
    </section>
  );
}
