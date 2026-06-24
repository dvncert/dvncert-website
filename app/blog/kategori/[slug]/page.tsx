import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../../components/SayfaBaslik";
import BlogKartListesi from "../../../components/BlogKartListesi";
import BlogKategoriFiltre from "../../../components/BlogKategoriFiltre";
import { blogKategorileri, kategoriBloglariGetir } from "@/lib/icerik";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, collectionPageSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const kategoriler = await blogKategorileri();
  return kategoriler.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { ad } = await kategoriBloglariGetir(slug);
  if (!ad) return { title: "Kategori bulunamadı" };

  return {
    title: `${ad} Yazıları`,
    description: `DVN Cert Bilgi Merkezi — "${ad}" kategorisindeki yazılar. ISO yönetim sistemleri, belgelendirme ve denetim üzerine bilgilendirici içerikler.`,
    alternates: { canonical: `${siteConfig.url}/blog/kategori/${slug}` },
  };
}

export default async function BlogKategoriSayfasi({ params }: Params) {
  const { slug } = await params;
  const [{ ad, yazilar }, kategoriler] = await Promise.all([
    kategoriBloglariGetir(slug),
    blogKategorileri(),
  ]);
  if (!ad || yazilar.length === 0) notFound();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Blog", url: "/blog" },
            { ad, url: `/blog/kategori/${slug}` },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          collectionPageSchema({
            baslik: `${ad} Yazıları`,
            aciklama: `"${ad}" kategorisindeki blog yazıları.`,
            url: `/blog/kategori/${slug}`,
          })
        )}
      />

      <SayfaBaslik
        etiket="BİLGİ MERKEZİ"
        baslik={ad}
        aciklama={`"${ad}" kategorisindeki yazılar.`}
        kirintilar={[{ etiket: "Blog", href: "/blog" }, { etiket: ad }]}
      />

      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <BlogKategoriFiltre kategoriler={kategoriler} aktifSlug={slug} />
          <BlogKartListesi yazilar={yazilar} />

          <div style={{ marginTop: 36, textAlign: "center" }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "var(--dvn-turuncu)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tüm yazılara dön
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
