import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import { tarihiBicimle } from "@/lib/duyurular";
import { bloglariGetir, blogDetay } from "@/lib/icerik";
import { hizmetGetir } from "@/lib/hizmetler";
import { siteConfig } from "@/lib/site-config";
import { blogPostingSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const liste = await bloglariGetir();
  return liste.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const yazi = await blogDetay(slug);
  if (!yazi) return { title: "Yazı bulunamadı" };

  return {
    title: yazi.baslik,
    description: yazi.ozet,
    alternates: { canonical: `${siteConfig.url}/blog/${yazi.slug}` },
    openGraph: {
      type: "article",
      title: yazi.baslik,
      description: yazi.ozet,
      url: `${siteConfig.url}/blog/${yazi.slug}`,
      publishedTime: yazi.tarih,
    },
  };
}

const P = { fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: "0 0 20px" } as const;

/** icerik metnini bloklara ayırıp H2/H3/liste/paragraf olarak render eder. */
function icerikBloklari(icerik: string) {
  return icerik.split("\n\n").map((blok, i) => {
    if (blok.startsWith("## ")) {
      return (
        <h2 key={i} style={{ color: "var(--dvn-lacivert)", fontSize: 20, fontWeight: 600, margin: "32px 0 14px", lineHeight: 1.35 }}>
          {blok.slice(3)}
        </h2>
      );
    }
    if (blok.startsWith("### ")) {
      return (
        <h3 key={i} style={{ color: "var(--dvn-lacivert)", fontSize: 17, fontWeight: 600, margin: "24px 0 10px", lineHeight: 1.35 }}>
          {blok.slice(4)}
        </h3>
      );
    }
    const satirlar = blok.split("\n");
    if (satirlar.length > 0 && satirlar.every((s) => s.startsWith("- "))) {
      return (
        <ul key={i} style={{ listStyle: "none", margin: "0 0 20px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {satirlar.map((s, j) => (
            <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", background: "var(--dvn-altin)", marginTop: 9 }} />
              <span style={{ fontSize: 15, color: "var(--dvn-gri-700)", lineHeight: 1.7 }}>{s.slice(2)}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} style={P}>
        {blok}
      </p>
    );
  });
}

export default async function BlogDetaySayfasi({ params }: Params) {
  const { slug } = await params;
  const yazi = await blogDetay(slug);
  if (!yazi) notFound();

  const ilgiliHizmetler = (yazi.ilgiliHizmetler ?? [])
    .map((s) => hizmetGetir(s))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          blogPostingSchema({
            baslik: yazi.baslik,
            aciklama: yazi.ozet,
            yayinTarihi: yazi.tarih,
            url: `/blog/${yazi.slug}`,
            yazar: yazi.yazar,
            gorselUrl: yazi.gorsel ? `${siteConfig.url}${yazi.gorsel}` : undefined,
          })
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Blog", url: "/blog" },
            { ad: yazi.baslik, url: `/blog/${yazi.slug}` },
          ])
        )}
      />

      <SayfaBaslik
        etiket={yazi.kategori}
        baslik={yazi.baslik}
        kirintilar={[{ etiket: "Blog", href: "/blog" }, { etiket: yazi.baslik }]}
      />

      <KapakGorsel src={yazi.gorsel} alt={yazi.gorselAlt || yazi.baslik} etiket={yazi.kategori} oncelik />

      <article style={{ background: "white", padding: "50px 32px 70px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Tarih */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--dvn-gri-500)", fontSize: 13, marginBottom: 28, paddingBottom: 22, borderBottom: "0.5px solid var(--dvn-gri-300)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            {tarihiBicimle(yazi.tarih)}
          </div>

          {/* Gövde */}
          {icerikBloklari(yazi.icerik)}

          {/* İlgili hizmetler */}
          {ilgiliHizmetler.length > 0 && (
            <div style={{ marginTop: 36, paddingTop: 24, borderTop: "0.5px solid var(--dvn-gri-300)" }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 14px" }}>İlgili Hizmetler</h2>
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
              href="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "var(--dvn-turuncu)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tüm yazılara dön
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
