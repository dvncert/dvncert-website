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

/**
 * Kategori giriş metinleri: arama motorlarına sayfanın konusunu anlatır ve
 * yalnızca kart listesinden oluşan ince içeriği zenginleştirir. İlk cümle
 * meta açıklama olarak da kullanılır. Tanımsız kategoride genel metin gösterilir.
 */
const kategoriGirisleri: Record<string, { aciklama: string; giris: string }> = {
  denetim: {
    aciklama:
      "Tedarikçi, fason üretici ve şube denetimleri üzerine rehberler: denetim nasıl planlanır, hangi sorular sorulur, rapor nasıl hazırlanır?",
    giris:
      "Bu kategoride tedarikçi (ikinci taraf) denetimi, fason üretici ve alt yüklenici denetimi ile zincir işletmelerde şube ve mağaza denetimi üzerine pratik rehberler yer alır. Denetim planlamasından soru listelerine, kontrol listelerinden rapor yapısına kadar sahada işinize yarayacak bilgileri; gıda, tekstil ve otomotiv gibi sektörlere özgü kriterlerle birlikte bulabilirsiniz.",
  },
  "yonetim-sistemleri": {
    aciklama:
      "ISO 9001, ISO 14001, ISO 45001 ve ISO 50001 yönetim sistemleri üzerine yazılar: standartların kapsamı, farkları ve belgelerin anlamı.",
    giris:
      "ISO 9001 kalite, ISO 14001 çevre, ISO 45001 iş sağlığı ve güvenliği ile ISO 50001 enerji yönetim sistemleri hakkındaki yazılar bu kategoride toplanır. Standartların hangi kuruluşlara uygun olduğu, birbirlerinden farkları, entegre yönetim sistemi yaklaşımı ve belgenin neyi gösterdiği gibi sorulara yanıt bulabilirsiniz.",
  },
  "belgelendirme-sureci": {
    aciklama:
      "ISO belgelendirme sürecinin adımları: Aşama 1 ve Aşama 2 denetimi, belgelendirme kararı, gözetim tetkiki, kapsam ve belge yenileme.",
    giris:
      "Belgelendirme sürecinin her adımını bu kategorideki yazılarda ele alıyoruz: kapsamın nasıl belirlendiği, Aşama 1 ve Aşama 2 denetimine hazırlık, bağımsız belgelendirme kararının nasıl verildiği, yıllık gözetim tetkikleri, çok sahalı kuruluşlarda örnekleme ve belgenin üç yıllık geçerlilik döngüsü.",
  },
  egitim: {
    aciklama:
      "İç tetkikçi, baş denetçi ve temel ISO eğitimleri üzerine yazılar: eğitimler kimler içindir, içerikleri nelerdir, nasıl seçilir?",
    giris:
      "Yönetim sistemi eğitimleri hakkındaki yazılar bu kategoridedir. İç denetçi (iç tetkikçi) eğitiminin kimler için gerekli olduğunu, temel, iç tetkikçi ve baş denetçi eğitimleri arasındaki farkları ve kuruluşunuz için doğru eğitimi nasıl seçebileceğinizi anlatıyoruz. Güncel eğitim takvimi için eğitimler sayfamıza göz atabilirsiniz.",
  },
};

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
    description:
      kategoriGirisleri[slug]?.aciklama ??
      `DVN Cert Bilgi Merkezi — "${ad}" kategorisindeki yazılar. ISO yönetim sistemleri, belgelendirme ve denetim üzerine bilgilendirici içerikler.`,
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
  const giris = kategoriGirisleri[slug];

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
            aciklama: giris?.aciklama ?? `"${ad}" kategorisindeki blog yazıları.`,
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
          {giris && (
            <p style={{ maxWidth: 860, fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: "0 0 32px" }}>
              {giris.giris}
            </p>
          )}
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
