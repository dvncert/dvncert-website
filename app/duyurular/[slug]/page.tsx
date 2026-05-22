import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import { duyurular, duyuruGetir, tarihiBicimle } from "@/lib/duyurular";
import { siteConfig } from "@/lib/site-config";
import { newsArticleSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

// Tüm duyuru sayfalarını derleme anında statik üret
export function generateStaticParams() {
  return duyurular.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const duyuru = duyuruGetir(slug);
  if (!duyuru) return { title: "Duyuru bulunamadı" };

  return {
    title: duyuru.baslik,
    description: duyuru.ozet,
    alternates: { canonical: `${siteConfig.url}/duyurular/${duyuru.slug}` },
    openGraph: {
      type: "article",
      title: duyuru.baslik,
      description: duyuru.ozet,
      url: `${siteConfig.url}/duyurular/${duyuru.slug}`,
      publishedTime: duyuru.tarih,
    },
  };
}

export default async function DuyuruDetaySayfasi({ params }: Params) {
  const { slug } = await params;
  const duyuru = duyuruGetir(slug);
  if (!duyuru) notFound();

  const paragraflar = duyuru.icerik.split("\n\n");

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          newsArticleSchema({
            baslik: duyuru.baslik,
            aciklama: duyuru.ozet,
            yayınTarihi: duyuru.tarih,
            url: `/duyurular/${duyuru.slug}`,
            gorselUrl: duyuru.gorsel ? `${siteConfig.url}${duyuru.gorsel}` : undefined,
          })
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Duyurular", url: "/duyurular" },
            { ad: duyuru.baslik, url: `/duyurular/${duyuru.slug}` },
          ])
        )}
      />

      <SayfaBaslik
        etiket={duyuru.kategori}
        baslik={duyuru.baslik}
        kirintilar={[{ etiket: "Duyurular", href: "/duyurular" }, { etiket: duyuru.baslik }]}
      />

      <KapakGorsel src={duyuru.gorsel} alt={duyuru.baslik} etiket={duyuru.kategori} oncelik />

      <article style={{ background: "white", padding: "50px 32px 70px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Tarih */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--dvn-gri-500)", fontSize: 13, marginBottom: 28, paddingBottom: 22, borderBottom: "0.5px solid var(--dvn-gri-300)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            {tarihiBicimle(duyuru.tarih)}
          </div>

          {/* Gövde */}
          {paragraflar.map((p, i) => (
            <p key={i} style={{ fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: "0 0 20px" }}>
              {p}
            </p>
          ))}

          {/* Geri dön */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "0.5px solid var(--dvn-gri-300)" }}>
            <Link
              href="/duyurular"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "var(--dvn-turuncu)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tüm duyurulara dön
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
