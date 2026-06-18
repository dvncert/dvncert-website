import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import { akreditasyonBelgeleriniGetir } from "@/lib/faz2-icerik";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/akreditasyonlarimiz",
    title: "Akreditasyon Durumu",
    description:
      "DVN Cert, TÜRKAK tarafından TS EN ISO/IEC 17021-1:2015 kapsamında akredite edilmiştir (Akreditasyon No: AB-0209-YS). ISO 9001, 14001, 45001 ve 50001 akreditasyon kapsamı ve sertifikamız.",
  });
}

// Kapsamdaki her standardın açıklaması (kapsam listesi site-config'ten gelir)
const standartAciklamalari: Record<string, { ad: string; aciklama: string }> = {
  "ISO 9001:2015": {
    ad: "Kalite Yönetim Sistemi",
    aciklama:
      "Müşteri memnuniyetini ve süreç verimliliğini esas alan, kuruluşun kalite yönetim altyapısını uluslararası düzeyde belgeleyen standart.",
  },
  "ISO 14001:2015": {
    ad: "Çevre Yönetim Sistemi",
    aciklama:
      "Çevresel etkilerin sistematik biçimde yönetilmesini ve yasal yükümlülüklere uyumu güvence altına alan çevre yönetim standardı.",
  },
  "ISO 45001:2018": {
    ad: "İş Sağlığı ve Güvenliği Yönetim Sistemi",
    aciklama:
      "Çalışan sağlığı ve güvenliğini korumaya yönelik riskleri azaltan, güvenli çalışma ortamını belgeleyen yönetim sistemi standardı.",
  },
  "ISO 50001:2018": {
    ad: "Enerji Yönetim Sistemi",
    aciklama:
      "Enerji performansının sürekli iyileştirilmesini, enerji verimliliği ve maliyet kontrolünü hedefleyen yönetim sistemi standardı.",
  },
};

export default async function AkreditasyonlarimizSayfasi() {
  const { akreditasyon } = siteConfig;
  const belgeler = await akreditasyonBelgeleriniGetir();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Akreditasyon Durumu", url: "/akreditasyonlarimiz" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="KURUMSAL"
        baslik="Akreditasyonumuz"
        aciklama={`DVN Cert, ${akreditasyon.kurulus} tarafından ${akreditasyon.standart} kapsamında akredite edilmiştir (Akreditasyon No: ${akreditasyon.no}).`}
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Akreditasyonumuz" }]}
      />

      <KapakGorsel src="/gorseller/sayfalar/akreditasyon.webp" alt={`${akreditasyon.kurulus} akreditasyon sertifikası — DVN Cert`} etiket={`${akreditasyon.kurulus} akreditasyonu · ${akreditasyon.no}`} oncelik />

      {/* Akreditasyon nedir + bilgi kartı */}
      <section className="dvn-reveal" style={{ background: "white", padding: "60px 32px" }}>
        <div
          className="dvn-akr-ust"
          style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center" }}
        >
          <div>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 10px" }}>
              AKREDİTE BELGELENDİRME KURULUŞU
            </p>
            <h2 className="dvn-gradyan-metin--koyu" style={{ fontSize: 28, fontWeight: 600, margin: "0 0 16px", lineHeight: 1.3, display: "inline-block" }}>
              {akreditasyon.kurulus} tarafından akredite edildik
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: "0 0 14px" }}>
              DVN Cert, {akreditasyon.kurulus} tarafından <strong style={{ color: "var(--dvn-lacivert)" }}>{akreditasyon.standart}</strong> standardına göre,
              ISO 9001, ISO 14001, ISO 45001 ve ISO 50001 yönetim sistemleri kapsamında akredite edilmiştir.
            </p>
            <p style={{ fontSize: 14.5, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: "0 0 22px" }}>
              {akreditasyon.not} Akreditasyonun resmi durumunu{" "}
              <a href="https://asist.turkak.org.tr/tr/accreditation/accreditationagencysearch" target="_blank" rel="noopener noreferrer" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>TÜRKAK akredite kuruluş sorgulama</a>{" "}
              üzerinden de teyit edebilirsiniz.
            </p>
            <a href={akreditasyon.belgeUrl} target="_blank" rel="noopener noreferrer" className="dvn-btn-primary" style={{ padding: "13px 24px", fontSize: 14 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Akreditasyon Sertifikasını İndir (PDF)
            </a>
          </div>

          {/* Bilgi kartı */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "var(--dvn-gradient-lacivert)",
              borderRadius: 16,
              padding: "32px 28px",
              color: "white",
              boxShadow: "0 16px 46px rgba(2,35,152,0.24), 0 0 0 1px rgba(212,169,63,0.16)",
            }}
          >
            <div className="dvn-grid-desen" aria-hidden style={{ opacity: 0.5 }} />
            <span className="dvn-glow-orb dvn-glow-orb--altin" aria-hidden style={{ top: -100, right: -60, width: 220, height: 220, opacity: 0.4 }} />
            <div style={{ display: "grid", gap: 16, position: "relative", zIndex: 1 }}>
              <div>
                <p style={{ fontSize: 11, color: "#9aa5b1", margin: "0 0 4px", letterSpacing: "0.5px" }}>AKREDİTASYON KURUMU</p>
                <p style={{ fontSize: 18, fontWeight: 600, color: "var(--dvn-altin-acik)", margin: 0 }}>{akreditasyon.kurulus}</p>
              </div>
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }} />
              <div>
                <p style={{ fontSize: 11, color: "#9aa5b1", margin: "0 0 4px", letterSpacing: "0.5px" }}>AKREDİTASYON NO</p>
                <p style={{ fontSize: 18, fontWeight: 600, color: "white", margin: 0, letterSpacing: "0.5px" }}>{akreditasyon.no}</p>
              </div>
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }} />
              <div>
                <p style={{ fontSize: 11, color: "#9aa5b1", margin: "0 0 4px", letterSpacing: "0.5px" }}>STANDART</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "white", margin: 0 }}>{akreditasyon.standart}</p>
              </div>
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }} />
              <div>
                <p style={{ fontSize: 11, color: "#9aa5b1", margin: "0 0 4px", letterSpacing: "0.5px" }}>GEÇERLİLİK</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "white", margin: 0 }}>{akreditasyon.tarih} – {akreditasyon.gecerlilik}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kapsamdaki standartlar */}
      <section className="dvn-reveal" style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              AKREDİTASYON KAPSAMI
            </p>
            <h2 className="dvn-gradyan-metin--koyu" style={{ fontSize: 28, fontWeight: 600, margin: 0, lineHeight: 1.3, display: "inline-block" }}>
              Akredite olduğumuz standartlar
            </h2>
          </div>

          <div
            className="dvn-std-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
          >
            {akreditasyon.hedefKapsam.map((std) => {
              const bilgi = standartAciklamalari[std];
              return (
                <div
                  key={std}
                  className="dvn-std-kart"
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: "26px 26px",
                    boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                    border: "0.5px solid var(--dvn-gri-300)",
                    borderLeft: "3px solid var(--dvn-altin)",
                    display: "flex",
                    gap: 18,
                  }}
                >
                  <div
                    className="dvn-std-ikon"
                    style={{
                      flexShrink: 0,
                      width: 54,
                      height: 54,
                      borderRadius: 12,
                      background: "var(--dvn-altin-soluk)",
                      color: "var(--dvn-altin)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4M12 2L4 6v6c0 5.5 3.5 10 8 12 4.5-2 8-6.5 8-12V6l-8-4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 17, fontWeight: 600, margin: "0 0 2px" }}>{std}</h3>
                    <p style={{ fontSize: 12.5, color: "var(--dvn-turuncu)", fontWeight: 500, margin: "0 0 10px" }}>
                      {bilgi?.ad ?? "Yönetim Sistemi"}
                    </p>
                    <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: 0 }}>
                      {bilgi?.aciklama ?? ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Akreditasyon belgeleri (admin'den yüklenenler) */}
      {belgeler.length > 0 && (
        <section style={{ background: "white", padding: "0 32px 60px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 26 }}>
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                BELGELERİMİZ
              </p>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 24, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                Akreditasyon ve uygunluk belgeleri
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {belgeler.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: "var(--dvn-gri-50)",
                    border: "0.5px solid var(--dvn-gri-300)",
                    borderRadius: 14,
                    padding: "20px 22px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>{b.ad}</h3>
                  {b.kapsam && <p style={{ fontSize: 12.5, color: "var(--dvn-turuncu)", fontWeight: 500, margin: "0 0 8px" }}>{b.kapsam}</p>}
                  {b.aciklama && <p style={{ fontSize: 13, color: "var(--dvn-gri-700)", lineHeight: 1.6, margin: "0 0 12px" }}>{b.aciklama}</p>}
                  {b.gecerlilikTarihi && (
                    <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "0 0 14px" }}>
                      Geçerlilik: {b.gecerlilikTarihi}
                    </p>
                  )}
                  {b.belge && (
                    <a
                      href={b.belge}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginTop: "auto",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--dvn-turuncu)",
                        textDecoration: "none",
                      }}
                    >
                      {b.belgeMime === "application/pdf" ? "PDF'i görüntüle" : "Belgeyi görüntüle"}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sertifika doğrulama yönlendirmesi */}
      <section className="dvn-reveal" style={{ background: "var(--dvn-gri-50)", padding: "0 32px 70px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "white",
            borderRadius: 16,
            padding: "32px 34px",
            border: "0.5px solid var(--dvn-gri-300)",
            boxShadow: "var(--dvn-shadow-md)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 19, fontWeight: 600, margin: "0 0 6px" }}>
              Bir sertifikanın geçerliliğini doğrulayın
            </h2>
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 13.5, margin: 0 }}>
              DVN Cert tarafından düzenlenmiş bir belgenin güncel durumunu çevrim içi sorgulayabilirsiniz.
            </p>
          </div>
          <Link href="https://tbds.turkak.org.tr" target="_blank" rel="noopener noreferrer" className="dvn-btn-primary" style={{ padding: "12px 24px", fontSize: 13.5, whiteSpace: "nowrap" }}>
            Sertifika Sorgula →
          </Link>
        </div>
      </section>

      <style>{`
        .dvn-std-kart {
          position: relative;
          transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
        }
        .dvn-std-kart:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 40px rgba(2,35,152,0.13) !important;
          border-left-color: var(--dvn-turuncu) !important;
        }
        .dvn-std-ikon { transition: transform 0.32s ease, background 0.32s ease, color 0.32s ease; }
        .dvn-std-kart:hover .dvn-std-ikon {
          background: var(--dvn-gradient-altin) !important;
          color: #fff !important;
          transform: scale(1.08) rotate(-3deg);
        }
        @media (max-width: 820px) {
          .dvn-akr-ust { grid-template-columns: 1fr !important; }
          .dvn-std-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
