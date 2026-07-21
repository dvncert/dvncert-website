import { ImageResponse } from "next/og";

/**
 * Blog/duyuru gibi detay sayfaları için başlık gömülü dinamik OG görseli.
 * Kök opengraph-image.tsx ile aynı marka dili (lacivert gradyan + altın yıldız);
 * fark, ortada içeriğe özel etiket + başlığın yer alması.
 *
 * Not: Satori'nin varsayılan fontu Türkçe Latin karakterleri kapsar (kök OG
 * görselindeki "BELGELENDİRME"/"Bağımsız" ifadeleriyle kanıtlı).
 */

export const OG_BOYUT = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogDetayGorseli({ etiket, baslik }: { etiket: string; baslik: string }) {
  const uzunluk = baslik.length;
  const baslikBoyut = uzunluk > 90 ? 42 : uzunluk > 60 ? 50 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(180deg, #022398 0%, #011A70 100%)",
          color: "#ffffff",
          fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          padding: "0 80px",
        }}
      >
        {/* Sol üst: marka */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="#D4A93F">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.169L12 18.896l-7.335 3.868 1.401-8.169L.132 9.21l8.2-1.192z" />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 3 }}>DVN CERT</div>
        </div>

        {/* Orta: etiket + başlık */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 4,
              color: "#F58220",
              marginBottom: 22,
              textTransform: "uppercase",
            }}
          >
            {etiket}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: baslikBoyut,
              fontWeight: 700,
              lineHeight: 1.22,
              color: "#ffffff",
            }}
          >
            {baslik}
          </div>
        </div>

        {/* Sol alt: standartlar */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: 80,
            fontSize: 22,
            color: "#ffffff",
            opacity: 0.65,
          }}
        >
          ISO 9001 • 14001 • 45001 • 50001
        </div>

        {/* Sağ alt: alan adı */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 80,
            fontSize: 24,
            color: "#D4A93F",
            opacity: 0.75,
          }}
        >
          dvncert.com
        </div>
      </div>
    ),
    { ...OG_BOYUT }
  );
}
