import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Görsel optimizasyonu: modern formatlar (AVIF/WebP) öncelikli sun.
  images: {
    formats: ["image/avif", "image/webp"],
    // next/image yerel yollar için query string'i varsayılan olarak reddeder.
    // DB'den gelen görsellerde ?v=<guncellenmeMs> cache-buster kullanıyoruz —
    // bu yollara query string'e izin ver. Diğer public yollarda query yok.
    localPatterns: [
      { pathname: "/api/gorsel/**" },
      { pathname: "/**", search: "" },
    ],
  },

  // Logo yüklemeleri için server action gövde limiti (varsayılan 1MB).
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
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
