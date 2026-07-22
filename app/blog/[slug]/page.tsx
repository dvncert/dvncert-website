import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import { metniBaglantiyaCevir } from "../../components/IcerikMetin";
import { tarihiBicimle } from "@/lib/duyurular";
import { bloglariGetir, blogDetay, benzerBloglar, kategoriSlug } from "@/lib/icerik";
import { hizmetGetir } from "@/lib/hizmetler";
import { blogSSSGetir } from "@/lib/blog-sss";
import { siteConfig } from "@/lib/site-config";
import { blogPostingSchema, breadcrumbSchema, faqSchema, schemaScript } from "@/lib/seo-schemas";

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
              <span style={{ fontSize: 15, color: "var(--dvn-gri-700)", lineHeight: 1.7 }}>{metniBaglantiyaCevir(s.slice(2))}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} style={P}>
        {metniBaglantiyaCevir(blok)}
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

  const sss = blogSSSGetir(yazi.slug);
  const benzerler = await benzerBloglar(yazi.slug, 3);

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
      {sss.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(faqSchema(sss))}
        />
      )}

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

          {/* Sıkça Sorulan Sorular (FAQPage şeması ile eşleşir) */}
          {sss.length > 0 && (
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: "0.5px solid var(--dvn-gri-300)" }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 18px", lineHeight: 1.35 }}>
                Sıkça Sorulan Sorular
              </h2>
              <div style={{ display: "grid", gap: 12 }}>
                {sss.map((s, i) => (
                  <details key={i} className="dvn-sss" style={{ background: "var(--dvn-gri-50)", borderRadius: 12, border: "0.5px solid var(--dvn-gri-300)", overflow: "hidden" }}>
                    <summary
                      className="dvn-sss-baslik"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        padding: "18px 20px",
                        cursor: "pointer",
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--dvn-lacivert)",
                        listStyle: "none",
                      }}
                    >
                      {s.soru}
                      <svg className="dvn-sss-ok" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M6 9l6 6 6-6" stroke="var(--dvn-turuncu)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <div style={{ padding: "0 20px 20px" }}>
                      <p style={{ fontSize: 14, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>{s.cevap}</p>
                    </div>
                  </details>
                ))}
              </div>
              <style>{`
                .dvn-sss-baslik::-webkit-details-marker { display: none; }
                .dvn-sss[open] .dvn-sss-ok { transform: rotate(180deg); }
                .dvn-sss-ok { transition: transform 0.22s ease; }
                .dvn-sss[open] { border-color: rgba(212,169,63,0.5) !important; }
                .dvn-sss-baslik:hover { color: var(--dvn-turuncu) !important; }
              `}</style>
            </div>
          )}

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

          {/* Kategori + geri dön */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "0.5px solid var(--dvn-gri-300)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "var(--dvn-turuncu)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tüm yazılara dön
            </Link>
            {yazi.kategori && (
              <Link
                href={`/blog/kategori/${kategoriSlug(yazi.kategori)}`}
                style={{ fontSize: 13, fontWeight: 500, color: "var(--dvn-lacivert)", background: "var(--dvn-altin-soluk)", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 999, padding: "8px 16px", textDecoration: "none" }}
              >
                Kategori: {yazi.kategori} →
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Benzer yazılar (blog → blog iç linkleme) */}
      {benzerler.length > 0 && (
        <section style={{ background: "var(--dvn-gri-50)", padding: "56px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                BENZER YAZILAR
              </p>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 24, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                Okumaya devam edin
              </h2>
            </div>

            <div
              className="dvn-benzer-grid"
              style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(benzerler.length, 3)}, 1fr)`, gap: 18 }}
            >
              {benzerler.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blog/${b.slug}`}
                  className="dvn-benzer-kart"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "white",
                    borderRadius: 14,
                    padding: "22px 22px",
                    border: "0.5px solid var(--dvn-gri-300)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  {b.kategori && (
                    <span style={{ fontSize: 11.5, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "0.5px", marginBottom: 8 }}>
                      {b.kategori.toLocaleUpperCase("tr-TR")}
                    </span>
                  )}
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.35, flexGrow: 1 }}>
                    {b.baslik}
                  </h3>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--dvn-turuncu)" }}>
                    Yazıyı oku
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <style>{`
            .dvn-benzer-kart:hover { transform: translateY(-4px); border-color: rgba(212,169,63,0.45) !important; box-shadow: 0 14px 32px rgba(2,35,152,0.1) !important; }
            @media (max-width: 820px) { .dvn-benzer-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}
    </main>
  );
}
