import type { Metadata } from "next";
import SayfaBaslik from "../components/SayfaBaslik";
import BlogKartListesi from "../components/BlogKartListesi";
import BlogKategoriFiltre from "../components/BlogKategoriFiltre";
import { bloglariGetir, blogKategorileri } from "@/lib/icerik";
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
  const [blogYazilari, kategoriler] = await Promise.all([bloglariGetir(), blogKategorileri()]);
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
            <>
              <BlogKategoriFiltre kategoriler={kategoriler} aktifSlug="tumu" />
              <BlogKartListesi yazilar={blogYazilari} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
