import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import { tarihiBicimle } from "@/lib/duyurular";
import { duyurulariGetir, duyuruDetay } from "@/lib/icerik";
import { hizmetGetir } from "@/lib/hizmetler";
import { siteConfig } from "@/lib/site-config";
import { newsArticleSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

// Bilinen duyuru sayfalarını derleme anında üret; yenileri istek anında (ISR)
export async function generateStaticParams() {
  const liste = await duyurulariGetir();
  return liste.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const duyuru = await duyuruDetay(slug);
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
  const duyuru = await duyuruDetay(slug);
  if (!duyuru) notFound();

  const paragraflar = duyuru.icerik.split("\n\n");
  const ilgiliHizmetler = (duyuru.ilgiliHizmetler ?? [])
    .map((s) => hizmetGetir(s))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

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

          {/* İlgili hizmetler */}
          {ilgiliHizmetler.length > 0 && (
            <div style={{ marginTop: 36, paddingTop: 24, borderTop: "0.5px solid var(--dvn-gri-300)" }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 14px" }}>
                İlgili Hizmetler
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {ilgiliHizmetler.map((h) => (
                  <Link
                    key={h.slug}
                    href={`/hizmetler/${h.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: "var(--dvn-lacivert)",
                      background: "var(--dvn-altin-soluk)",
                      border: "0.5px solid var(--dvn-gri-300)",
                      borderRadius: 999,
                      padding: "8px 16px",
                      textDecoration: "none",
                    }}
                  >
                    {h.baslik}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="var(--dvn-turuncu)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
