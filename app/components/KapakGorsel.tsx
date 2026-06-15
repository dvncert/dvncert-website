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
            boxShadow: "0 12px 40px rgba(2,35,152,0.12)",
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
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "min(78%, 720px)",
                  background: "rgba(255,255,255,0.94)",
                  borderRadius: 10,
                  padding: "24px 28px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center", borderBottom: "1px solid var(--dvn-gri-300)", paddingBottom: 14 }}>
                  <span style={{ color: "var(--dvn-turuncu)", fontSize: 12, fontWeight: 700, letterSpacing: 1.1 }}>DVN CERT</span>
                  <span style={{ color: "var(--dvn-gri-500)", fontSize: 12 }}>Süreç dokümanı</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, paddingTop: 18 }}>
                  <div>
                    <div style={{ height: 10, width: "82%", background: "var(--dvn-lacivert)", borderRadius: 4, marginBottom: 12 }} />
                    <div style={{ height: 8, width: "94%", background: "var(--dvn-gri-300)", borderRadius: 4, marginBottom: 8 }} />
                    <div style={{ height: 8, width: "72%", background: "var(--dvn-gri-300)", borderRadius: 4, marginBottom: 18 }} />
                    <div style={{ display: "grid", gap: 8 }}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ width: 18, height: 18, borderRadius: 4, background: "var(--dvn-altin-soluk)", border: "1px solid var(--dvn-altin)" }} />
                          <span style={{ height: 7, flex: 1, background: "var(--dvn-gri-200)", borderRadius: 4 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "var(--dvn-gri-50)", border: "1px solid var(--dvn-gri-300)", borderRadius: 8, padding: 14 }}>
                    <div style={{ color: "var(--dvn-gri-500)", fontSize: 11, marginBottom: 8 }}>Durum</div>
                    <div style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>İzlenebilir kayıt</div>
                    <div style={{ marginTop: 18, height: 6, width: "100%", background: "var(--dvn-altin)", borderRadius: 3 }} />
                  </div>
                </div>
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
