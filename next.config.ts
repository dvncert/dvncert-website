import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Görsel optimizasyonu: modern formatlar (AVIF/WebP) öncelikli sun.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Temel güvenlik başlıkları (CSP eklenmedi: inline stil/script ve GA'yı
  // bozma riski yüksek; HSTS includeSubDomains'siz tutuldu).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
