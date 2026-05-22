import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { organizationSchema, websiteSchema, schemaScript } from "@/lib/seo-schemas";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.adUzun,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.adUzun} - TÜRKAK Akreditasyonu ile ISO Belgelendirme`,
    description: siteConfig.aciklamaKisa,
    images: [`${siteConfig.url}/og-image.png`],
  },

  // Diğer önemli alanlar
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "tr-TR": siteConfig.url,
      "en-US": `${siteConfig.url}/en`,
    },
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
        <meta name="theme-color" content="#0f1922" />
        <meta name="format-detection" content="telephone=no" />

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
      <body style={{ background: "#fafbfc", color: "#0f1922" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}