import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Robots.txt - Arama motorlarına yönlendirme.
 * Erişim: https://dvncert.com/robots.txt
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Tüm arama motorları için
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/_next/*",
          "/teklif-onay/*",
          "/musteri-onay/*",
          "/private/*",
          "*.json",
        ],
      },
      // GPT/AI tarayıcıları (isteğe bağlı - şu an izin veriyoruz)
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}