/**
 * DVN Cert - JSON-LD Schema Markup
 * Google ve diğer arama motorlarının siteyi doğru anlaması için yapılandırılmış veri.
 * Schema.org standardına uygun.
 */

import { siteConfig } from "./site-config";

/**
 * 1. Organization Schema (Tüm sayfalarda)
 * Google'a "biz bu kuruluşuz" der.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.adUzun,
    alternateName: siteConfig.ad,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}/logo.png`,
    description: siteConfig.aciklamaUzun,
    email: siteConfig.email,
    telephone: siteConfig.telefon,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.adres.sokak} ${siteConfig.adres.bina}`,
      addressLocality: siteConfig.adres.ilce,
      addressRegion: siteConfig.adres.il,
      postalCode: siteConfig.adres.posta,
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.telefon,
      contactType: "customer service",
      email: siteConfig.email,
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    },
    sameAs: [
      siteConfig.sosyal.linkedin,
      siteConfig.sosyal.twitter,
      siteConfig.sosyal.facebook,
      siteConfig.sosyal.instagram,
    ].filter(Boolean),
    knowsAbout: [
      "ISO 9001 Quality Management System Certification",
      "ISO 14001 Environmental Management System Certification",
      "ISO 45001 Occupational Health and Safety Certification",
      "ISO 50001 Energy Management System Certification",
      "Second Party Audits",
      "Internal Auditor Training",
    ],
    // TÜRKAK akreditasyonu — Google'a "akredite belgelendirme kuruluşu" sinyali.
    ...(siteConfig.akreditasyon.akredite
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Accreditation",
            name: `${siteConfig.akreditasyon.kurulus} Akreditasyonu (${siteConfig.akreditasyon.standart})`,
            identifier: siteConfig.akreditasyon.no,
            recognizedBy: {
              "@type": "Organization",
              name: "Türk Akreditasyon Kurumu (TÜRKAK)",
              url: "https://www.turkak.org.tr",
            },
            validFrom: tarihIso(siteConfig.akreditasyon.tarih),
            validUntil: tarihIso(siteConfig.akreditasyon.gecerlilik),
          },
        }
      : {}),
  };
}

/** "GG.AA.YYYY" → "YYYY-AA-GG" (schema.org tarih biçimi). Geçersizse undefined. */
function tarihIso(t?: string): string | undefined {
  if (!t) return undefined;
  const m = t.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : undefined;
}

/**
 * 2. LocalBusiness Schema (İletişim ve ana sayfada)
 * Google'a fiziksel konumumuzu, çalışma saatlerimizi söyler.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.adUzun,
    image: `${siteConfig.url}/logo.png`,
    url: siteConfig.url,
    telephone: siteConfig.telefon,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.adres.sokak} ${siteConfig.adres.bina}`,
      addressLocality: siteConfig.adres.ilce,
      addressRegion: siteConfig.adres.il,
      postalCode: siteConfig.adres.posta,
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.konum.enlem,
      longitude: siteConfig.konum.boylam,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: siteConfig.calismaSaatleri.haftaIciAcilis,
        closes: siteConfig.calismaSaatleri.haftaIciKapanis,
      },
    ],
  };
}

/**
 * 3. WebSite Schema (Ana sayfada)
 * Site arama kutusu için Google'a bilgi verir.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.adUzun,
    description: siteConfig.aciklamaKisa,
    inLanguage: siteConfig.dil,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/arama?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * 4. Service Schema (Hizmet sayfalarında)
 * Her hizmet için ayrı kullanılacak.
 */
export function serviceSchema(params: {
  ad: string;
  aciklama: string;
  url: string;
  hizmetTipi?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.ad,
    description: params.aciklama,
    url: `${siteConfig.url}${params.url}`,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    serviceType: params.hizmetTipi || "Certification Service",
  };
}

/**
 * 5. BreadcrumbList Schema (İç sayfalarda)
 * Google'a sayfa hiyerarşisini gösterir.
 */
export function breadcrumbSchema(items: { ad: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.ad,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * 6. FAQPage Schema (SSS sayfasında veya hizmet sayfalarında)
 */
export function faqSchema(sorular: { soru: string; cevap: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sorular.map((s) => ({
      "@type": "Question",
      name: s.soru,
      acceptedAnswer: {
        "@type": "Answer",
        text: s.cevap,
      },
    })),
  };
}

/**
 * 7. Course Schema (Eğitim sayfalarında)
 */
export function courseSchema(params: {
  ad: string;
  aciklama: string;
  url: string;
  sure?: string;
  /** Sunum biçimleri: "online" ve/veya "onsite" — Course rich result için hasCourseInstance üretir. */
  yontemler?: ("online" | "onsite")[];
  /** Kursu temsil eden görsel URL'i (verilmezse kurum logosu kullanılır). */
  gorselUrl?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: params.ad,
    description: params.aciklama,
    url: `${siteConfig.url}${params.url}`,
    image: params.gorselUrl || `${siteConfig.url}/logo.png`,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.adUzun,
      url: siteConfig.url,
    },
    timeRequired: params.sure,
  };
  if (params.yontemler && params.yontemler.length > 0) {
    schema.hasCourseInstance = params.yontemler.map((m) => ({
      "@type": "CourseInstance",
      courseMode: m,
      courseWorkload: params.sure,
    }));
  }
  return schema;
}

/**
 * 8. NewsArticle Schema (Duyuru ve haberler için)
 */
export function newsArticleSchema(params: {
  baslik: string;
  aciklama: string;
  yayınTarihi: string;
  guncellenmeTarihi?: string;
  url: string;
  yazar?: string;
  gorselUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: params.baslik,
    description: params.aciklama,
    datePublished: params.yayınTarihi,
    dateModified: params.guncellenmeTarihi || params.yayınTarihi,
    url: `${siteConfig.url}${params.url}`,
    image: params.gorselUrl || `${siteConfig.url}/logo.png`,
    author: {
      "@type": "Organization",
      name: params.yazar || siteConfig.adUzun,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

/**
 * 9. BlogPosting Schema (Blog / Bilgi Merkezi yazıları için)
 */
export function blogPostingSchema(params: {
  baslik: string;
  aciklama: string;
  yayinTarihi: string;
  guncellenmeTarihi?: string;
  url: string;
  yazar?: string;
  gorselUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.baslik,
    description: params.aciklama,
    datePublished: params.yayinTarihi,
    dateModified: params.guncellenmeTarihi || params.yayinTarihi,
    url: `${siteConfig.url}${params.url}`,
    image: params.gorselUrl || `${siteConfig.url}/logo.png`,
    author: {
      "@type": "Organization",
      name: params.yazar || siteConfig.adUzun,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${params.url}`,
    },
  };
}

/**
 * 10. AboutPage Schema (/hakkimizda için)
 */
export function aboutPageSchema(params: { baslik: string; aciklama: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteConfig.url}${params.url}#aboutpage`,
    name: params.baslik,
    description: params.aciklama,
    url: `${siteConfig.url}${params.url}`,
    inLanguage: siteConfig.dil,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };
}

/**
 * 11. ContactPage Schema (/iletisim için)
 */
export function contactPageSchema(params: { url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}${params.url}#contactpage`,
    name: `İletişim · ${siteConfig.adUzun}`,
    url: `${siteConfig.url}${params.url}`,
    inLanguage: siteConfig.dil,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: { "@id": `${siteConfig.url}/#organization` },
  };
}

/**
 * 12. ItemList Schema (ekip listesi, doküman listesi vb. için)
 */
export function itemListSchema(params: {
  url: string;
  ad: string;
  ogeler: { ad: string; aciklama?: string; url?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: params.ad,
    url: `${siteConfig.url}${params.url}`,
    numberOfItems: params.ogeler.length,
    itemListElement: params.ogeler.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: o.ad,
      description: o.aciklama,
      url: o.url ? `${siteConfig.url}${o.url}` : undefined,
    })),
  };
}

/**
 * 13. CollectionPage Schema (liste tarzı sayfalar — /duyurular, /blog, /dokumanlar)
 */
export function collectionPageSchema(params: { baslik: string; aciklama: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}${params.url}#collectionpage`,
    name: params.baslik,
    description: params.aciklama,
    url: `${siteConfig.url}${params.url}`,
    inLanguage: siteConfig.dil,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}

/**
 * Schema'yı HTML'e yerleştirmek için yardımcı.
 * Bu fonksiyonu sayfa içinde kullanırız.
 */
export function schemaScript(schema: object) {
  // JSON.stringify < > & karakterlerini kaçmaz; şema verisi admin girdisinden
  // (blog başlığı, ekip, özel sayfa) beslendiği için </script> ile depolanmış
  // XSS'i önlemek üzere Unicode kaçışı uygulanır.
  return {
    __html: JSON.stringify(schema)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026"),
  };
}