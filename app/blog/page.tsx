import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import { bloglariGetir } from "@/lib/icerik";
import { tarihiBicimle } from "@/lib/duyurular";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, collectionPageSchema, schemaScript } from "@/lib/seo-schemas";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog ve Bilgi Merkezi",
  description:
    "ISO yönetim sistemleri, belgelendirme süreci ve denetim hazırlığı hakkında bilgilendirici yazılar. DVN Cert Bilgi Merkezi.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default async function BlogSayfasi() {
  const blogYazilari = await bloglariGetir();
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Blog", url: "/blog" },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          collectionPageSchema({
            baslik: "Blog ve Bilgi Merkezi",
            aciklama: "ISO yönetim sistemleri, belgelendirme süreci ve denetime hazırlık hakkında bilgilendirici yazılar.",
            url: "/blog",
          })
        )}
      />

      <SayfaBaslik
        etiket="BİLGİ MERKEZİ"
        baslik="Blog"
        aciklama="ISO yönetim sistemleri, belgelendirme süreci ve denetime hazırlık hakkında bilgilendirici yazılar."
        kirintilar={[{ etiket: "Blog" }]}
      />

      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {blogYazilari.length === 0 ? (
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 15, textAlign: "center" }}>
              Bilgi merkezimiz çok yakında yayında olacak.
            </p>
          ) : (
            <div
              className="dvn-blog-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
            >
              {blogYazilari.map((y) => (
                <Link
                  key={y.slug}
                  href={`/blog/${y.slug}`}
                  className="dvn-blog-kart"
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: "26px 24px",
                    boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                    border: "0.5px solid var(--dvn-gri-300)",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "var(--dvn-altin)", background: "var(--dvn-altin-soluk)", padding: "4px 10px", borderRadius: 999 }}>
                      {y.kategori}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--dvn-gri-500)" }}>{tarihiBicimle(y.tarih)}</span>
                  </div>
                  <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
                    {y.baslik}
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: "0 0 18px", flexGrow: 1 }}>
                    {y.ozet}
                  </p>
                  <span style={{ fontSize: 13, color: "var(--dvn-turuncu)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    Yazıyı oku
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .dvn-blog-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(2,35,152,0.12) !important; }
        @media (max-width: 900px) { .dvn-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
