import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Sayfa başlığının altında yer alan tam genişlik kapak görseli.
 *
 * - `src` verilirse gerçek görsel next/image ile gösterilir (blog, duyuru,
 *   etkinlik, hizmet vb.) + modern gradyan kaplama.
 * - `src` verilmezse fotoğraf yerine HER SAYFAYA ÖZEL, otomatik farklılaşan
 *   modern bir kapak üretilir: sayfa etiketine göre değişen marka gradyanı,
 *   glow orb'lar, tech grid ve temalı dev ikon. Böylece foto dosyası
 *   gerekmeden her iç sayfa birbirinden farklı ve modern görünür.
 *
 * Marka renkleri (lacivert / altın / turuncu) korunur.
 */

// Deterministik basit hash — aynı etiket her zaman aynı temayı verir.
function hashle(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// Foto olmayan kapaklar için marka içi tema varyantları (lacivert tabanlı,
// altın/turuncu vurgulu — açı ve ton değişerek sayfalar farklılaşır).
const temalar = [
  { bg: "linear-gradient(135deg, #011A70 0%, #022398 58%, #0227AB 100%)", o1: "altin", o2: "turuncu" },
  { bg: "linear-gradient(120deg, #04114d 0%, #022398 62%, #0b2a8f 100%)", o1: "turuncu", o2: "altin" },
  { bg: "linear-gradient(150deg, #011240 0%, #0227AB 70%, #022398 100%)", o1: "altin", o2: "lacivert" },
  { bg: "linear-gradient(135deg, #022e6e 0%, #022398 55%, #011A70 100%)", o1: "turuncu", o2: "altin" },
  { bg: "linear-gradient(130deg, #0a0f3d 0%, #022398 60%, #0227AB 100%)", o1: "altin", o2: "turuncu" },
  { bg: "linear-gradient(140deg, #011A70 0%, #013089 50%, #0227AB 100%)", o1: "turuncu", o2: "lacivert" },
];

const ikonlar: Record<string, ReactNode> = {
  sistem: (
    <>
      <path d="M12 2l8 4v6c0 5.5-3.5 10-8 12-4.5-2-8-6.5-8-12V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  egitim: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </>
  ),
  denetim: (
    <>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  dokuman: (
    <>
      <path d="M14 3v5h5" />
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5z" />
      <path d="M8 13h8M8 17h6" />
    </>
  ),
  arama: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  odul: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </>
  ),
  kure: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.6-4-9s1.5-6.5 4-9z" />
    </>
  ),
  iletisim: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

// Etikete göre ikon seçimi — ikon adı verilmişse onu, yoksa çeşitlilik için
// hash ile bir ikon kullan.
const ikonSira = ["odul", "kure", "dokuman", "arama", "sistem", "denetim", "iletisim", "egitim"];

export default function KapakGorsel(props: {
  /** /gorseller/...webp — boşsa sayfaya özel modern kapak üretilir */
  src?: string;
  /** SEO ve erişilebilirlik için zorunlu açıklama */
  alt: string;
  /** Temalı ikon seçimi: sistem | egitim | denetim | dokuman | arama | odul | kure | iletisim */
  ikon?: string;
  /** Kapakta gösterilecek başlık metni */
  etiket?: string;
  /** Ekranın üst kısmındaysa (LCP) preload için true ver */
  oncelik?: boolean;
  /** İstenirse tema sabitlenir (0-5); verilmezse etiketten türetilir */
  varyant?: number;
}) {
  const { src, alt, ikon, etiket, oncelik = false, varyant } = props;

  const temaIndex =
    typeof varyant === "number" ? varyant % temalar.length : hashle(etiket || alt) % temalar.length;
  const tema = temalar[temaIndex];

  const ikonAdi = ikon && ikonlar[ikon] ? ikon : ikonSira[hashle(alt) % ikonSira.length];

  return (
    <section className="dvn-kapak">
      <div className="dvn-kapak-ic">
        <div className="dvn-kapak-govde" style={src ? undefined : { background: tema.bg }}>
          {src ? (
            <>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1344px) 100vw, 1280px"
                preload={oncelik}
                className="dvn-kapak-img"
              />
              <div className="dvn-kapak-overlay" />
            </>
          ) : (
            <>
              <div className="dvn-grid-desen dvn-kapak-grid" aria-hidden />
              <span className={`dvn-glow-orb dvn-glow-orb--${tema.o1} dvn-kapak-orb1`} aria-hidden />
              <span className={`dvn-glow-orb dvn-glow-orb--${tema.o2} dvn-kapak-orb2`} aria-hidden />
              <svg
                className="dvn-kapak-ikon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {ikonlar[ikonAdi]}
              </svg>
            </>
          )}

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

      <style>{`
        .dvn-kapak-grid { opacity: 0.6; }
        .dvn-kapak-orb1 {
          top: -130px;
          right: -60px;
          width: 360px;
          height: 360px;
          opacity: 0.5;
        }
        .dvn-kapak-orb2 {
          bottom: -150px;
          left: 10%;
          width: 320px;
          height: 320px;
          opacity: 0.4;
          animation-delay: -7s;
        }
        .dvn-kapak-ikon {
          position: absolute;
          top: 50%;
          right: clamp(20px, 6vw, 90px);
          transform: translateY(-50%);
          width: clamp(150px, 22vw, 260px);
          height: clamp(150px, 22vw, 260px);
          color: rgba(255, 255, 255, 0.14);
          pointer-events: none;
        }
        @media (max-width: 760px) {
          .dvn-kapak-ikon {
            top: 18px;
            right: 14px;
            transform: none;
            width: 96px;
            height: 96px;
            opacity: 0.85;
          }
        }
      `}</style>
    </section>
  );
}
