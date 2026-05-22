import { ImageResponse } from "next/og";

// Görsel meta verisi
export const alt =
  "DVN Cert Belgelendirme - Bağımsız, tarafsız ve doğrulanabilir belgelendirme yaklaşımı";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Görsel üretimi (Next.js yerleşik ImageResponse / Satori)
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #2E1A6B 0%, #1F0F4D 100%)",
          color: "#ffffff",
          fontFamily:
            "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* Sol üst altın yıldız */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="#D4A93F"
          style={{ position: "absolute", top: 64, left: 72 }}
        >
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.169L12 18.896l-7.335 3.868 1.401-8.169L.132 9.21l8.2-1.192z" />
        </svg>

        {/* Orta içerik */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: 2 }}>
            DVN CERT
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: 8,
              color: "#F58220",
              marginTop: 14,
            }}
          >
            BELGELENDİRME
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.92)",
              marginTop: 28,
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Bağımsız, tarafsız ve doğrulanabilir belgelendirme yaklaşımı
          </div>
        </div>

        {/* Sol alt: standartlar */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: 72,
            fontSize: 22,
            color: "#ffffff",
            opacity: 0.7,
          }}
        >
          ISO 9001 • 14001 • 45001 • 50001
        </div>

        {/* Sağ alt: alan adı */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 72,
            fontSize: 24,
            color: "#D4A93F",
            opacity: 0.7,
          }}
        >
          dvncert.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
