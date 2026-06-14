import SayfaBaslik from "./SayfaBaslik";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export type YasalBolum = {
  baslik?: string;
  /** Paragraflar; her eleman ayrı bir <p> olur. */
  metin: string[];
};

/**
 * Yasal metin sayfaları (KVKK, Gizlilik, Çerez Politikası) için ortak düzen.
 * Sade, okunabilir tek kolon; başlık + bölümler.
 */
export default function YasalSayfa({
  baslik,
  slug,
  aciklama,
  guncelleme,
  bolumler,
  etiket = "YASAL",
}: {
  baslik: string;
  /** Breadcrumb için, ör. "/kvkk" */
  slug: string;
  aciklama?: string;
  /** Son güncelleme tarihi, ör. "22 Mayıs 2026" */
  guncelleme: string;
  bolumler: YasalBolum[];
  /** Sayfa başlığı üstündeki küçük etiket (varsayılan "YASAL"). */
  etiket?: string;
}) {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: baslik, url: slug },
          ])
        )}
      />

      <SayfaBaslik etiket={etiket} baslik={baslik} aciklama={aciklama} kirintilar={[{ etiket: baslik }]} />

      <section style={{ background: "white", padding: "50px 32px 70px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 32px", paddingBottom: 20, borderBottom: "0.5px solid var(--dvn-gri-300)" }}>
            Son güncelleme: {guncelleme}
          </p>

          {bolumler.map((bolum, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              {bolum.baslik && (
                <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 600, margin: "0 0 12px", lineHeight: 1.35 }}>
                  {bolum.baslik}
                </h2>
              )}
              {bolum.metin.map((p, j) => (
                <p key={j} style={{ fontSize: 14.5, color: "var(--dvn-gri-700)", lineHeight: 1.8, margin: "0 0 12px" }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
