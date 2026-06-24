import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { hizmetler } from "@/lib/hizmetler";
import { egitimler } from "@/lib/egitimler";
import { duyurular } from "@/lib/duyurular";
import { blogYazilari } from "@/lib/blog";
import { etkinlikleriGetir } from "@/lib/etkinlikler";
import { ozelSayfaSluglari } from "@/lib/ozel-sayfa";

/**
 * Otomatik sitemap üretimi.
 * Google bu dosyayı tarayarak tüm sayfaları indeksler.
 * Erişim: https://dvncert.com/sitemap.xml
 *
 * Sabit sayfalar elle; hizmet ve duyuru detayları lib verisinden otomatik
 * üretilir — yeni hizmet/duyuru eklendiğinde sitemap kendiliğinden güncellenir.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteGuncelleme = new Date("2026-06-15");
  const yasalGuncelleme = new Date("2026-01-01");
  const url = siteConfig.url;

  // ===== SABİT SAYFALAR =====
  const sabitSayfalar: MetadataRoute.Sitemap = [
    { url: `${url}`, lastModified: siteGuncelleme, changeFrequency: "weekly", priority: 1.0 },

    // Kurumsal
    { url: `${url}/hakkimizda`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.9 },
    { url: `${url}/ekibimiz`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/akreditasyonlarimiz`, lastModified: siteGuncelleme, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/politika-ve-beyanlar`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.6 },
    { url: `${url}/logolarimiz`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.5 },

    // Hizmetler hub (detaylar aşağıda otomatik)
    { url: `${url}/hizmetler`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.95 },
    { url: `${url}/belgelendirme-sureci`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.85 },
    { url: `${url}/sertifika-sorgula`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/itiraz-ve-sikayet`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.5 },

    // Eğitim & kariyer
    { url: `${url}/egitimler`, lastModified: siteGuncelleme, changeFrequency: "weekly", priority: 0.85 },
    { url: `${url}/etkinlikler`, lastModified: siteGuncelleme, changeFrequency: "weekly", priority: 0.7 },
    { url: `${url}/kariyer`, lastModified: siteGuncelleme, changeFrequency: "weekly", priority: 0.75 },

    // İletişim
    { url: `${url}/iletisim`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.8 },
    { url: `${url}/sikayet-ve-gorusler`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.5 },

    // Bilgi sayfaları (duyuru detayları aşağıda otomatik)
    { url: `${url}/duyurular`, lastModified: siteGuncelleme, changeFrequency: "weekly", priority: 0.75 },
    { url: `${url}/blog`, lastModified: siteGuncelleme, changeFrequency: "weekly", priority: 0.7 },
    { url: `${url}/dokumanlar`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.6 },
    { url: `${url}/sss`, lastModified: siteGuncelleme, changeFrequency: "monthly", priority: 0.65 },

    // Yasal
    { url: `${url}/kvkk`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/gizlilik`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/cerez-politikasi`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ===== HİZMET DETAY SAYFALARI (otomatik) =====
  const hizmetSayfalari: MetadataRoute.Sitemap = hizmetler.map((h) => ({
    url: `${url}/hizmetler/${h.slug}`,
    lastModified: siteGuncelleme,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // ===== EĞİTİM DETAY SAYFALARI (otomatik) =====
  const egitimSayfalari: MetadataRoute.Sitemap = egitimler.map((e) => ({
    url: `${url}/egitimler/${e.slug}`,
    lastModified: siteGuncelleme,
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

  // ===== ETKİNLİK DETAYLARI (DB; noIndex hariç) =====
  const etkinlikler = await etkinlikleriGetir();
  const etkinlikSayfalari: MetadataRoute.Sitemap = etkinlikler
    .filter((e) => !e.noIndex)
    .map((e) => ({
      url: `${url}/etkinlikler/${e.slug}`,
      lastModified: e.baslangic,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  // ===== ADMIN'DEN OLUŞTURULAN ÖZEL SAYFALAR (DB) =====
  const ozelSayfalar = await ozelSayfaSluglari();
  const ozelSayfaSayfalari: MetadataRoute.Sitemap = ozelSayfalar.map((slug) => ({
    url: `${url}/${slug}`,
    lastModified: siteGuncelleme,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...sabitSayfalar,
    ...hizmetSayfalari,
    ...egitimSayfalari,
    ...duyuruSayfalari,
    ...blogSayfalari,
    ...etkinlikSayfalari,
    ...ozelSayfaSayfalari,
  ];
}
