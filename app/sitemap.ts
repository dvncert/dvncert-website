import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { hizmetler } from "@/lib/hizmetler";
import { egitimler } from "@/lib/egitimler";
import { duyurular } from "@/lib/duyurular";
import { blogYazilari } from "@/lib/blog";

/**
 * Otomatik sitemap üretimi.
 * Google bu dosyayı tarayarak tüm sayfaları indeksler.
 * Erişim: https://dvncert.com/sitemap.xml
 *
 * Sabit sayfalar elle; hizmet ve duyuru detayları lib verisinden otomatik
 * üretilir — yeni hizmet/duyuru eklendiğinde sitemap kendiliğinden güncellenir.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const bugun = new Date();
  const url = siteConfig.url;

  // ===== SABİT SAYFALAR =====
  const sabitSayfalar: MetadataRoute.Sitemap = [
    { url: `${url}`, lastModified: bugun, changeFrequency: "weekly", priority: 1.0 },

    // Kurumsal
    { url: `${url}/hakkimizda`, lastModified: bugun, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/ekibimiz`, lastModified: bugun, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/akreditasyonlarimiz`, lastModified: bugun, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/politika-ve-beyanlar`, lastModified: bugun, changeFrequency: "yearly", priority: 0.6 },
    { url: `${url}/logolarimiz`, lastModified: bugun, changeFrequency: "yearly", priority: 0.5 },

    // Hizmetler hub (detaylar aşağıda otomatik)
    { url: `${url}/hizmetler`, lastModified: bugun, changeFrequency: "monthly", priority: 0.95 },
    { url: `${url}/belgelendirme-sureci`, lastModified: bugun, changeFrequency: "monthly", priority: 0.85 },
    { url: `${url}/sertifika-sorgula`, lastModified: bugun, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/belgelendirme-kurallari`, lastModified: bugun, changeFrequency: "yearly", priority: 0.5 },
    { url: `${url}/marka-ve-logo-kullanimi`, lastModified: bugun, changeFrequency: "yearly", priority: 0.5 },
    { url: `${url}/itiraz-ve-sikayet`, lastModified: bugun, changeFrequency: "yearly", priority: 0.5 },

    // Eğitim & kariyer
    { url: `${url}/egitimler`, lastModified: bugun, changeFrequency: "weekly", priority: 0.85 },
    { url: `${url}/kariyer`, lastModified: bugun, changeFrequency: "weekly", priority: 0.75 },

    // İletişim
    { url: `${url}/iletisim`, lastModified: bugun, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/sikayet-ve-gorusler`, lastModified: bugun, changeFrequency: "yearly", priority: 0.5 },

    // Bilgi sayfaları (duyuru detayları aşağıda otomatik)
    { url: `${url}/duyurular`, lastModified: bugun, changeFrequency: "weekly", priority: 0.75 },
    { url: `${url}/blog`, lastModified: bugun, changeFrequency: "weekly", priority: 0.7 },
    { url: `${url}/dokumanlar`, lastModified: bugun, changeFrequency: "monthly", priority: 0.6 },
    { url: `${url}/sss`, lastModified: bugun, changeFrequency: "monthly", priority: 0.65 },

    // Yasal
    { url: `${url}/kvkk`, lastModified: bugun, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/gizlilik`, lastModified: bugun, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/cerez-politikasi`, lastModified: bugun, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ===== HİZMET DETAY SAYFALARI (otomatik) =====
  const hizmetSayfalari: MetadataRoute.Sitemap = hizmetler.map((h) => ({
    url: `${url}/hizmetler/${h.slug}`,
    lastModified: bugun,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // ===== EĞİTİM DETAY SAYFALARI (otomatik) =====
  const egitimSayfalari: MetadataRoute.Sitemap = egitimler.map((e) => ({
    url: `${url}/egitimler/${e.slug}`,
    lastModified: bugun,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // ===== DUYURU DETAY SAYFALARI (otomatik) =====
  const duyuruSayfalari: MetadataRoute.Sitemap = duyurular.map((d) => ({
    url: `${url}/duyurular/${d.slug}`,
    lastModified: new Date(d.tarih),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // ===== BLOG YAZILARI (otomatik) =====
  const blogSayfalari: MetadataRoute.Sitemap = blogYazilari.map((y) => ({
    url: `${url}/blog/${y.slug}`,
    lastModified: new Date(y.tarih),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...sabitSayfalar, ...hizmetSayfalari, ...egitimSayfalari, ...duyuruSayfalari, ...blogSayfalari];
}
