import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import HizmetIkon from "../components/HizmetIkon";
import { hizmetGetir, hizmetler } from "@/lib/hizmetler";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "DVN Cert; ISO 9001, 14001, 45001, 50001 sistem belgelendirmesi, 2. taraf denetimleri ve yönetim sistemi eğitimleri sunar. Tüm belgelendirme hizmetlerimizi keşfedin.",
  alternates: { canonical: `${siteConfig.url}/hizmetler` },
};

// Üst seviye hizmet kartları (Eğitimler ayrı bir sayfadır, manuel eklenir)
const anaHizmetler = [
  { ...hizmetGetir("sistem-belgelendirme")!, href: "/hizmetler/sistem-belgelendirme" },
  { ...hizmetGetir("2-taraf-denetimleri")!, href: "/hizmetler/2-taraf-denetimleri" },
  {
    slug: "egitimler",
    baslik: "Eğitimler",
    kisaAciklama:
      "ISO yönetim sistemleri eğitim programlarımızla kurumların yönetim sistemi bilgi seviyesini artırıyoruz.",
    ikon: "egitim",
    href: "/egitimler",
  },
];

const isoStandartlari = hizmetler.filter((h) => h.kod);

export default function HizmetlerSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Hizmetler", url: "/hizmetler" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="HİZMETLERİMİZ"
        baslik="Belgelendirme Hizmetlerimiz"
        aciklama="Yönetim sistemleri belgelendirmesinden 2. taraf denetimlerine ve eğitimlere kadar kuruluşunuza değer katan profesyonel çözümler."
        kirintilar={[{ etiket: "Hizmetler" }]}
      />

      <KapakGorsel src="/gorseller/sayfalar/hizmetler.webp" alt="DVN Cert belgelendirme hizmetleri" ikon="sistem" etiket="Belgelendirme Hizmetlerimiz" oncelik />

      {/* Ana hizmetler */}
      <section className="dvn-reveal" style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="dvn-anahizmet-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {anaHizmetler.map((h) => (
              <Link
                key={h.slug}
                href={h.href}
                className="dvn-hub-kart"
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "32px 28px",
                  boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                  border: "0.5px solid var(--dvn-gri-300)",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  className="dvn-hub-ikon"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 14,
                    background: "var(--dvn-gradient-lacivert)",
                    color: "var(--dvn-altin-acik)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: "0 8px 20px rgba(2,35,152,0.15)",
                  }}
                >
                  <HizmetIkon ad={h.ikon} size={30} />
                </div>
                <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.3 }}>
                  {h.baslik}
                </h2>
                <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: "0 0 16px" }}>{h.kisaAciklama}</p>
                <span style={{ fontSize: 13, color: "var(--dvn-turuncu)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  Detayları gör
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ISO standartları */}
      <section className="dvn-reveal" style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              SİSTEM BELGELENDİRME
            </p>
            <h2 className="dvn-gradyan-metin--koyu" style={{ fontSize: 28, fontWeight: 600, margin: 0, lineHeight: 1.3, display: "inline-block" }}>
              Belgelendirme yaptığımız ISO standartları
            </h2>
          </div>

          <div className="dvn-iso-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {isoStandartlari.map((std) => (
              <Link
                key={std.slug}
                href={`/hizmetler/${std.slug}`}
                className="dvn-hub-kart"
                style={{
                  display: "flex",
                  gap: 18,
                  background: "white",
                  borderRadius: 14,
                  padding: "26px 26px",
                  boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                  border: "0.5px solid var(--dvn-gri-300)",
                  borderLeft: "3px solid var(--dvn-altin)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  className="dvn-hub-ikon"
                  style={{
                    flexShrink: 0,
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: "var(--dvn-altin-soluk)",
                    color: "var(--dvn-altin)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HizmetIkon ad={std.ikon} size={26} />
                </div>
                <div>
                  <p style={{ fontSize: 11.5, color: "var(--dvn-turuncu)", fontWeight: 600, margin: "0 0 2px", letterSpacing: "0.3px" }}>
                    {std.kod}
                  </p>
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 }}>
                    {std.baslik}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: 0 }}>{std.kisaAciklama}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .dvn-hub-kart {
          position: relative;
          overflow: hidden;
        }
        .dvn-hub-kart::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--dvn-gradient-turuncu);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .dvn-hub-kart:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(2,35,152,0.14) !important;
          border-color: rgba(212,169,63,0.45) !important;
        }
        .dvn-hub-kart:hover::before { transform: scaleX(1); }
        .dvn-hub-ikon { transition: transform 0.32s ease, background 0.32s ease; }
        .dvn-hub-kart:hover .dvn-hub-ikon { transform: scale(1.08) rotate(-3deg); }
        @media (max-width: 900px) {
          .dvn-anahizmet-grid { grid-template-columns: 1fr !important; }
          .dvn-iso-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
