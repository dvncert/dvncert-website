import type { Metadata } from "next";
import SayfaBaslik from "../components/SayfaBaslik";
import DuyuruListe from "../components/DuyuruListe";
import { duyurular } from "@/lib/duyurular";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Duyurular",
  description:
    "DVN Cert'ten güncel duyurular, akreditasyon gelişmeleri, eğitim takvimi ve sektörel haberler. Belgelendirme dünyasındaki son gelişmeleri takip edin.",
  alternates: { canonical: `${siteConfig.url}/duyurular` },
};

export default function DuyurularSayfasi() {
  // Liste bileşenine yalnızca gerekli alanları geçir (icerik taşınmaz).
  const liste = duyurular.map(({ slug, baslik, tarih, kategori, ozet, gorsel }) => ({
    slug,
    baslik,
    tarih,
    kategori,
    ozet,
    gorsel,
  }));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Duyurular", url: "/duyurular" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="GÜNCEL"
        baslik="Duyurular"
        aciklama="Akreditasyon gelişmeleri, eğitim takvimi ve sektörel haberlerle ilgili en güncel duyurularımız."
        kirintilar={[{ etiket: "Duyurular" }]}
      />

      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <DuyuruListe duyurular={liste} />
        </div>
      </section>
    </main>
  );
}
