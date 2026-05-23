import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { organizationSchema, websiteSchema, schemaScript } from "@/lib/seo-schemas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.adUzun} - TÜRKAK Akreditasyonu ile ISO Belgelendirme`,
    template: `%s | ${siteConfig.adUzun}`,
  },
  description: siteConfig.aciklamaKisa,
  keywords: siteConfig.anahtarKelimeler,
  authors: [{ name: siteConfig.adUzun, url: siteConfig.url }],
  creator: siteConfig.adUzun,
  publisher: siteConfig.adUzun,
  applicationName: siteConfig.adUzun,
  generator: "Next.js",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    title: `${siteConfig.adUzun} - TÜRKAK Akreditasyonu ile ISO Belgelendirme`,
    description: siteConfig.aciklamaKisa,
    siteName: siteConfig.adUzun,
    // og:image, kök dizindeki opengraph-image.tsx tarafından otomatik üretilir.
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.adUzun} - TÜRKAK Akreditasyonu ile ISO Belgelendirme`,
    description: siteConfig.aciklamaKisa,
    // twitter:image, kök dizindeki twitter-image.tsx tarafından otomatik üretilir.
  },

  // Diğer önemli alanlar
  // Not: Site şu an yalnızca Türkçe. İngilizce (/en) eklendiğinde
  // alternates.languages buraya geri konacak.
  alternates: {
    canonical: siteConfig.url,
  },

  // Doğrulama (ileride Google Search Console için)
  verification: {
    google: "", // İleride doldurulacak
  },

  // Kategori (Google için)
  category: "Certification Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#2E1A6B" />
        <meta name="format-detection" content="telephone=no" />

        {/* Google Consent Mode v2 — varsayılan onay: denied.
            GA yüklenmeden (afterInteractive) önce, parse anında çalışır.
            Onay CookieConsent banner'ı window.dvnCerezGuncelle ile günceller. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});try{if(localStorage.getItem('dvn-cerez-onay')==='kabul'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}window.dvnCerezGuncelle=function(k){try{localStorage.setItem('dvn-cerez-onay',k?'kabul':'red');}catch(e){}gtag('consent','update',{analytics_storage:k?'granted':'denied'});};",
          }}
        />

        {/* JSON-LD: Organization (Her sayfada) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(organizationSchema())}
        />

        {/* JSON-LD: WebSite (Her sayfada) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(websiteSchema())}
        />
      </head>
      <body style={{ background: "#fafbfc", color: "#2E1A6B" }}>
        <Header />
        {children}
        <Footer />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <CookieConsent />
      </body>
    </html>
  );
}