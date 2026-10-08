import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Robots.txt - Arama motorlarına yönlendirme.
 * Erişim: https://www.dvncert.com/robots.txt
 */

// /_next/* kapatılmaz: Google sayfayı işlerken CSS/JS dosyalarına erişebilmeli.
const KAPALI = ["/admin", "/admin/*", "/api/*", "/teklif-onay/*", "/musteri-onay/*", "/private/*", "*.json"];

/**
 * Yapay zekâ arama/yanıt tarayıcıları — içeriğimizin Google AI Overviews,
 * Gemini, ChatGPT, Perplexity, Claude ve Copilot yanıtlarında kaynak
 * gösterilebilmesi için açıkça izinli. (AI Overviews Googlebot'u kullanır;
 * Google-Extended Gemini içindir.) Adlı bir grup "*" kurallarını devralmadığı
 * için kapalı alanlar her grupta tekrarlanır.
 */
const YZ_TARAYICILARI = [
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: KAPALI },
      { userAgent: YZ_TARAYICILARI, allow: ["/", "/llms.txt"], disallow: KAPALI },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
