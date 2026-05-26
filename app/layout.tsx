import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { organizationSchema, websiteSchema, schemaScript } from "@/lib/seo-schemas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ekstraMenuOgeleriGetir } from "@/lib/ust-menu";
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";
import SosyalSabitButon from "./components/SosyalSabitButon";
import ScrollToTop from "./components/ScrollToTop";
import ChromeGate from "./components/ChromeGate";

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

  // Google Search Console doğrulaması.
  // En kolay yöntem: GA ölçüm etiketi sitede yüklü olduğundan, Search Console'da
  // "Google Analytics" doğrulama yöntemiyle koda dokunmadan onaylayabilirsiniz.
  // "HTML etiketi" yöntemini seçerseniz, Google'ın verdiği içerik kodunu
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ortam değişkenine koyun (build sırasında okunur).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },

  // Kategori (Google için)
  category: "Certification Services",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // GA4 ölçüm ID'si gizli değildir (istemcide görünür); ortam değişkeni yoksa
  // varsayılan gömülüdür ki canlıda her zaman yüklensin.
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-3VJDV7WQBG";
  const ekstraOgeler = await ekstraMenuOgeleriGetir();

  return (
    <html lang="tr" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#022398" />
        <meta name="format-detection" content="telephone=no" />

        {/* 1) Google Consent Mode v2 — varsayılan onay: denied. Parse anında,
            gtag config'ten ÖNCE çalışır. Onayı CookieConsent banner'ı
            window.dvnCerezGuncelle ile günceller. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});try{if(localStorage.getItem('dvn-cerez-onay')==='kabul'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}window.dvnCerezGuncelle=function(k){try{localStorage.setItem('dvn-cerez-onay',k?'kabul':'red');}catch(e){}gtag('consent','update',{analytics_storage:k?'granted':'denied'});};",
          }}
        />

        {/* 2) GA4 (Google etiketi) — resmî snippet, doğrudan <head>'de.
            <head> yerleşimi Search Console'un "Google Analytics" doğrulama
            yöntemi için gereklidir; consent default'tan SONRA config çalışır. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script
          dangerouslySetInnerHTML={{ __html: `gtag('js', new Date());gtag('config', '${gaId}');` }}
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
      <body style={{ background: "#fafbfc", color: "#022398" }}>
        <ChromeGate>
          <a href="#ana-icerik" className="dvn-skip-link">
            İçeriğe geç
          </a>
        </ChromeGate>
        <ChromeGate>
          <Header ekstraOgeler={ekstraOgeler} />
        </ChromeGate>
        <div id="ana-icerik" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </div>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        <ChromeGate>
          <WhatsAppButton />
          <SosyalSabitButon />
          <ScrollToTop />
          <CookieConsent />
        </ChromeGate>
      </body>
    </html>
  );
}