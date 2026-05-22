import Image from "next/image";
import HizmetIkon from "./HizmetIkon";

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
export default function KapakGorsel({
  src,
  alt,
  ikon,
  etiket,
  oncelik = false,
}: {
  /** /gorseller/...webp — boşsa yer tutucu gösterilir */
  src?: string;
  /** SEO ve erişilebilirlik için zorunlu açıklama */
  alt: string;
  /** Yer tutucuda gösterilecek HizmetIkon anahtarı (yoksa marka amblemi) */
  ikon?: string;
  /** Yer tutucuda gösterilecek metin */
  etiket?: string;
  /** Ekranın üst kısmındaysa (LCP) preload için true ver */
  oncelik?: boolean;
}) {
  return (
    <section style={{ background: "white", padding: "28px 32px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(200px, 30vw, 380px)",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(15,25,34,0.12)",
          }}
        >
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1344px) 100vw, 1280px"
              preload={oncelik}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              role="img"
              aria-label={alt}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--dvn-gradient-lacivert)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                overflow: "hidden",
              }}
            >
              {/* Dekoratif ışıltılar */}
              <div
                style={{
                  position: "absolute",
                  top: "-30%",
                  right: "-10%",
                  width: "45%",
                  height: "120%",
                  background: "radial-gradient(circle, rgba(45,175,184,0.18) 0%, transparent 65%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30%",
                  left: "-5%",
                  width: "40%",
                  height: "110%",
                  background: "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 65%)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 84,
                  height: 84,
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.06)",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--dvn-turkuaz-acik)",
                }}
              >
                {ikon ? (
                  <HizmetIkon ad={ikon} size={42} />
                ) : (
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l8 4v6c0 5.5-3.5 10-8 12-4.5-2-8-6.5-8-12V6l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {etiket && (
                <p style={{ position: "relative", zIndex: 1, color: "#cbd5e1", fontSize: 15, fontWeight: 500, margin: 0, textAlign: "center", padding: "0 24px" }}>
                  {etiket}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
