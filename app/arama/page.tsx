import type { Metadata } from "next";
import { Suspense } from "react";
import SayfaBaslik from "../components/SayfaBaslik";
import AramaIcerik from "../components/AramaIcerik";

export const metadata: Metadata = {
  title: "Arama",
  description: "DVN Cert sitesinde hizmet, duyuru ve sayfalar arasında arama yapın.",
  // Arama sonuç sayfaları indekslenmez (ince/yinelenen içerik önlemi).
  robots: { index: false, follow: true },
  alternates: { canonical: "https://dvncert.com/arama" },
};

export default function AramaSayfasi() {
  return (
    <main>
      <SayfaBaslik
        etiket="ARAMA"
        baslik="Sitede Arama"
        aciklama="Hizmetler, duyurular ve sayfalar arasında arama yapın."
        kirintilar={[{ etiket: "Arama" }]}
      />

      <section style={{ background: "var(--dvn-gri-50)", padding: "50px 32px 70px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Suspense fallback={null}>
            <AramaIcerik />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
