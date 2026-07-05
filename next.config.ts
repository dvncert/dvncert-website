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

  // Kaldırılan yasal sayfalar için kalıcı (301) yönlendirmeler.
  // Marka/logo içeriği /logolarimiz'de; belgelendirme kuralları TL.12
  // talimatı olarak /dokumanlar altında yayımlanıyor.
  async redirects() {
    return [
      { source: "/marka-ve-logo-kullanimi", destination: "/logolarimiz", permanent: true },
      { source: "/belgelendirme-kurallari", destination: "/dokumanlar", permanent: true },
      // Yeniden adlandırılan/kaldırılan eski duyuru URL'leri (GSC 404) — SEO değeri
      // kaybolmasın diye güncel eşdeğer sayfalara 301 yönlendiriliyor.
      { source: "/duyurular/dvncert-akreditasyon", destination: "/duyurular/turkak-akreditasyonumuzu-aldik", permanent: true },
      { source: "/duyurular/iso-50001-akreditasyon-kapsami-genisledi", destination: "/akreditasyonlarimiz", permanent: true },
      // Eski WordPress sitesinden kalan üst düzey hizmet URL'si → yeni /hizmetler yolu.
      { source: "/2-taraf-denetimleri", destination: "/hizmetler/2-taraf-denetimleri", permanent: true },
    ];
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
          // Kısıtlı CSP: yalnızca XSS yükseltme vektörlerini kapatır
          // (base/object/iframe). script/style/img/font kaynaklarına
          // DOKUNMAZ; bu yüzden inline stiller ve GA bozulmaz. Tam
          // (script-src nonce) CSP ileride ayrı iş olarak eklenebilir.
          {
            key: "Content-Security-Policy",
            value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
