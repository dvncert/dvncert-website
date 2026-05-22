import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Otomatik sitemap üretimi.
 * Google bu dosyayı tarayarak tüm sayfaları indeksler.
 * Erişim: https://dvncert.com/sitemap.xml
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const bugun = new Date();
  const url = siteConfig.url;

  return [
    // ===== ANA SAYFA =====
    {
      url: `${url}`,
      lastModified: bugun,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ===== KURUMSAL SAYFALAR =====
    {
      url: `${url}/hakkimizda`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/ekibimiz`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${url}/akreditasyonlarimiz`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/politika-ve-beyanlar`,
      lastModified: bugun,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${url}/logolarimiz`,
      lastModified: bugun,
      changeFrequency: "yearly",
      priority: 0.5,
    },

    // ===== HİZMET SAYFALARI (Yüksek Öncelik) =====
    {
      url: `${url}/hizmetler`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${url}/hizmetler/sistem-belgelendirme`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/hizmetler/iso-9001`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/hizmetler/iso-14001`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/hizmetler/iso-45001`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/hizmetler/iso-50001`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${url}/hizmetler/2-taraf-denetimleri`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    // ===== EĞİTİM =====
    {
      url: `${url}/egitimler`,
      lastModified: bugun,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // ===== KARİYER =====
    {
      url: `${url}/kariyer`,
      lastModified: bugun,
      changeFrequency: "weekly",
      priority: 0.75,
    },

    // ===== İLETİŞİM VE BAŞVURU =====
    {
      url: `${url}/iletisim`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${url}/sertifika-sorgula`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${url}/sikayet-ve-gorusler`,
      lastModified: bugun,
      changeFrequency: "yearly",
      priority: 0.5,
    },

    // ===== BİLGİ SAYFALARI =====
    {
      url: `${url}/duyurular`,
      lastModified: bugun,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${url}/dokumanlar`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${url}/sss`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    // ===== YASAL =====
    {
      url: `${url}/kvkk`,
      lastModified: bugun,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${url}/gizlilik`,
      lastModified: bugun,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${url}/cerez-politikasi`,
      lastModified: bugun,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}