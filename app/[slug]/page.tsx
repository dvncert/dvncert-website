import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SayfaBaslik from "../components/SayfaBaslik";
import { ozelSayfaDetay, ozelSayfaSluglari } from "@/lib/ozel-sayfa";
import { SablonGovde } from "@/lib/sablonlar";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const sluglar = await ozelSayfaSluglari();
  return sluglar.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sayfa = await ozelSayfaDetay(slug);
  if (!sayfa) return { title: "Sayfa bulunamadı" };

  const sonTitle = sayfa.seoTitle || sayfa.baslik;
  const sonDesc = sayfa.seoDescription || sayfa.aciklama;
  return {
    title: sonTitle,
    description: sonDesc,
    alternates: { canonical: `${siteConfig.url}/${sayfa.slug}` },
    robots: sayfa.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: sonTitle,
      description: sonDesc,
      url: `${siteConfig.url}/${sayfa.slug}`,
    },
  };
}

export default async function OzelSayfaGoster({ params }: Params) {
  const { slug } = await params;
  const sayfa = await ozelSayfaDetay(slug);
  if (!sayfa) notFound();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: sayfa.baslik, url: `/${sayfa.slug}` },
          ]),
        )}
      />

      <SayfaBaslik
        etiket={sayfa.ustEtiket}
        baslik={sayfa.baslik}
        aciklama={sayfa.aciklama}
        kirintilar={[{ etiket: sayfa.baslik }]}
      />

      <SablonGovde sablon={sayfa.sablon} veri={sayfa.veri} baslik={sayfa.baslik} />
    </main>
  );
}
