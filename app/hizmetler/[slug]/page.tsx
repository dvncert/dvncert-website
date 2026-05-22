import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import HizmetIkon from "../../components/HizmetIkon";
import { hizmetler, hizmetGetir } from "@/lib/hizmetler";
import { siteConfig } from "@/lib/site-config";
import { serviceSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

// Bu ISO standartlarının kendi statik sayfaları var (app/hizmetler/<slug>/page.tsx).
const statikIsoSayfalari = ["iso-9001", "iso-14001", "iso-45001", "iso-50001"];

export function generateStaticParams() {
  return hizmetler
    .filter((h) => !statikIsoSayfalari.includes(h.slug))
    .map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const hizmet = hizmetGetir(slug);
  if (!hizmet) return { title: "Hizmet bulunamadı" };

  return {
    title: hizmet.baslik,
    description: hizmet.kisaAciklama,
    alternates: { canonical: `${siteConfig.url}/hizmetler/${hizmet.slug}` },
  };
}

export default async function HizmetDetaySayfasi({ params }: Params) {
  const { slug } = await params;
  const hizmet = hizmetGetir(slug);
  if (!hizmet) notFound();

  const girisParagraflar = hizmet.giris.split("\n\n");
  const altStandartlar = (hizmet.altStandartlar ?? [])
    .map((s) => hizmetGetir(s))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          serviceSchema({
            ad: hizmet.baslik,
            aciklama: hizmet.kisaAciklama,
            url: `/hizmetler/${hizmet.slug}`,
            hizmetTipi: hizmet.kategori,
          })
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Hizmetler", url: "/hizmetler" },
            { ad: hizmet.baslik, url: `/hizmetler/${hizmet.slug}` },
          ])
        )}
      />

      <SayfaBaslik
        etiket={hizmet.kod ?? hizmet.kategori}
        baslik={hizmet.baslik}
        aciklama={hizmet.kisaAciklama}
        kirintilar={[{ etiket: "Hizmetler", href: "/hizmetler" }, { etiket: hizmet.baslik }]}
      />

      <KapakGorsel
        src={hizmet.gorsel}
        alt={`${hizmet.baslik} - DVN Cert belgelendirme`}
        ikon={hizmet.ikon}
        etiket={hizmet.baslik}
        oncelik
      />

      {/* Giriş */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {girisParagraflar.map((p, i) => (
            <p key={i} style={{ fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Faydalar */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              KAZANIMLAR
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              {hizmet.baslik} ile elde edecekleriniz
            </h2>
          </div>

          <div
            className="dvn-fayda-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}
          >
            {hizmet.faydalar.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  background: "white",
                  borderRadius: 12,
                  padding: "18px 20px",
                  border: "0.5px solid var(--dvn-gri-300)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "var(--dvn-altin-soluk)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="var(--dvn-altin)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.55 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alt standartlar (sistem belgelendirme) */}
      {altStandartlar.length > 0 && (
        <section style={{ background: "white", padding: "60px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                KAPSAMDAKİ STANDARTLAR
              </p>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                Belgelendirme yaptığımız yönetim sistemleri
              </h2>
            </div>

            <div className="dvn-std-kart-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {altStandartlar.map((std) => (
                <Link
                  key={std.slug}
                  href={`/hizmetler/${std.slug}`}
                  className="dvn-std-kart"
                  style={{
                    display: "flex",
                    gap: 16,
                    background: "var(--dvn-gri-50)",
                    borderRadius: 14,
                    padding: "24px 24px",
                    border: "0.5px solid var(--dvn-gri-300)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 50,
                      height: 50,
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
                    <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3 }}>
                      {std.baslik}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: 0 }}>{std.kisaAciklama}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Süreç */}
      {hizmet.surec && hizmet.surec.length > 0 && (
        <section style={{ background: altStandartlar.length > 0 ? "var(--dvn-gri-50)" : "white", padding: "60px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                SÜREÇ
              </p>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                Nasıl ilerliyoruz?
              </h2>
            </div>

            <div className="dvn-surec-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${hizmet.surec.length}, 1fr)`, gap: 18 }}>
              {hizmet.surec.map((adim, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: "26px 22px",
                    border: "0.5px solid var(--dvn-gri-300)",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "var(--dvn-gradient-turuncu)",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 16,
                      boxShadow: "0 6px 16px rgba(245,130,32,0.3)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 15.5, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.3 }}>
                    {adim.baslik}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.65, margin: 0 }}>{adim.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "white", padding: "0 32px 70px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "var(--dvn-gradient-lacivert)",
            borderRadius: 18,
            padding: "40px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <h2 style={{ color: "white", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
              {hizmet.baslik} için teklif alın
            </h2>
            <p style={{ color: "#9aa5b1", fontSize: 13.5, margin: 0 }}>
              Online başvuru sistemimizle dakikalar içinde başvurunuzu oluşturabilirsiniz.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="https://dbys.dvncert.com/basvuru"
              target="_blank"
              style={{
                background: "var(--dvn-gradient-turuncu)",
                color: "white",
                padding: "13px 24px",
                borderRadius: "var(--dvn-radius-md)",
                fontWeight: 500,
                fontSize: 14,
                boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              Başvuru Yap →
            </Link>
            <Link
              href="/iletisim"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "13px 24px",
                borderRadius: "var(--dvn-radius-md)",
                fontWeight: 500,
                fontSize: 14,
                whiteSpace: "nowrap",
              }}
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .dvn-std-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(46,26,107,0.1) !important; }
        @media (max-width: 820px) {
          .dvn-fayda-grid { grid-template-columns: 1fr !important; }
          .dvn-std-kart-grid { grid-template-columns: 1fr !important; }
          .dvn-surec-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .dvn-surec-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
