import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import { etkinlikleriGetir, etkinlikDetay, etkinlikTarihBicim } from "@/lib/etkinlikler";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const liste = await etkinlikleriGetir();
  return liste.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const e = await etkinlikDetay(slug);
  if (!e) return { title: "Etkinlik bulunamadı" };

  return {
    title: e.seoTitle || e.baslik,
    description: e.seoDescription || e.ozet,
    alternates: { canonical: `${siteConfig.url}/etkinlikler/${e.slug}` },
    robots: e.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: e.seoTitle || e.baslik,
      description: e.seoDescription || e.ozet,
      url: `${siteConfig.url}/etkinlikler/${e.slug}`,
      images: e.gorsel ? [{ url: `${siteConfig.url}${e.gorsel}` }] : undefined,
    },
  };
}

export default async function EtkinlikDetaySayfasi({ params }: Params) {
  const { slug } = await params;
  const e = await etkinlikDetay(slug);
  if (!e) notFound();

  const paragraflar = e.icerik.split("\n\n");
  const gelecek = e.baslangic > new Date();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Etkinlikler", url: "/etkinlikler" },
            { ad: e.baslik, url: `/etkinlikler/${e.slug}` },
          ]),
        )}
      />

      <SayfaBaslik
        etiket={e.kategori}
        baslik={e.baslik}
        kirintilar={[{ etiket: "Etkinlikler", href: "/etkinlikler" }, { etiket: e.baslik }]}
      />

      <KapakGorsel src={e.gorsel} alt={e.gorselAlt || e.baslik} etiket={e.kategori} oncelik />

      <article style={{ background: "white", padding: "50px 32px 70px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Etkinlik bilgi kutusu */}
          <div
            style={{
              background: "var(--dvn-gri-50)",
              border: "0.5px solid var(--dvn-gri-300)",
              borderRadius: 12,
              padding: "18px 22px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 32,
            }}
          >
            <div>
              <p style={{ fontSize: 11, color: "var(--dvn-gri-500)", margin: "0 0 4px", letterSpacing: 0.5 }}>BAŞLANGIÇ</p>
              <p style={{ fontSize: 14, color: "var(--dvn-lacivert)", fontWeight: 500, margin: 0 }}>
                {etkinlikTarihBicim(e.baslangic, { saatGoster: true })}
              </p>
            </div>
            {e.bitis && (
              <div>
                <p style={{ fontSize: 11, color: "var(--dvn-gri-500)", margin: "0 0 4px", letterSpacing: 0.5 }}>BİTİŞ</p>
                <p style={{ fontSize: 14, color: "var(--dvn-lacivert)", fontWeight: 500, margin: 0 }}>
                  {etkinlikTarihBicim(e.bitis, { saatGoster: true })}
                </p>
              </div>
            )}
            <div>
              <p style={{ fontSize: 11, color: "var(--dvn-gri-500)", margin: "0 0 4px", letterSpacing: 0.5 }}>YER</p>
              <p style={{ fontSize: 14, color: "var(--dvn-lacivert)", fontWeight: 500, margin: 0 }}>{e.yer}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--dvn-gri-500)", margin: "0 0 4px", letterSpacing: 0.5 }}>KATILIM</p>
              <p style={{ fontSize: 14, color: e.ucretli ? "var(--dvn-lacivert)" : "#15803d", fontWeight: 500, margin: 0 }}>
                {e.ucretli ? "Ücretli" : "Ücretsiz"}
              </p>
            </div>
          </div>

          {/* Kayıt butonu */}
          {gelecek && e.kayitUrl && (
            <div style={{ marginBottom: 32 }}>
              <a
                href={e.kayitUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--dvn-gradient-turuncu)",
                  color: "white",
                  padding: "12px 26px",
                  borderRadius: 8,
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                  boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
                }}
              >
                Kayıt / Başvuru →
              </a>
            </div>
          )}

          {/* İçerik */}
          {paragraflar.map((p, i) => (
            <p key={i} style={{ fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: "0 0 20px" }}>
              {p}
            </p>
          ))}

          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "0.5px solid var(--dvn-gri-300)" }}>
            <Link
              href="/etkinlikler"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "var(--dvn-turuncu)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tüm etkinliklere dön
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
