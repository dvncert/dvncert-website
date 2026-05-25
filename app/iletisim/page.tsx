import type { Metadata } from "next";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import IletisimFormu from "../components/IletisimFormu";
import { siteConfig } from "@/lib/site-config";
import { localBusinessSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "İletişim",
  description: `DVN Cert ile iletişime geçin. ${siteConfig.adresTamMetin} · ${siteConfig.telefonGorunen} · ${siteConfig.email}. Belgelendirme, denetim ve eğitim talepleriniz için bize ulaşın.`,
  alternates: { canonical: `${siteConfig.url}/iletisim` },
};

const telefonHref = `tel:${siteConfig.telefon.replace(/[^\d+]/g, "")}`;
const haritaUrl = `https://www.google.com/maps?q=${siteConfig.konum.enlem},${siteConfig.konum.boylam}&z=16&output=embed`;

const iletisimBilgileri = [
  {
    baslik: "Adres",
    deger: siteConfig.adresTamMetin,
    icon: (
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    baslik: "Telefon",
    deger: siteConfig.telefonGorunen,
    href: telefonHref,
    icon: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    baslik: "E-posta",
    deger: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: (
      <path d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    baslik: "Çalışma Saatleri",
    deger: `Hafta içi ${siteConfig.calismaSaatleri.haftaIciAcilis} – ${siteConfig.calismaSaatleri.haftaIciKapanis} · Hafta sonu ${siteConfig.calismaSaatleri.haftaSonu}`,
    icon: (
      <path d="M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function IletisimSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(localBusinessSchema())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "İletişim", url: "/iletisim" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="İLETİŞİM"
        baslik="Bize Ulaşın"
        aciklama="Belgelendirme, 2. taraf denetimi ve eğitim talepleriniz için ekibimiz size yardımcı olmaktan memnuniyet duyar."
        kirintilar={[{ etiket: "İletişim" }]}
      />

      <KapakGorsel alt="DVN Cert iletişim" ikon="denetim" etiket="Sorularınız için bize yazın" oncelik />

      {/* Bilgi + Form */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div
          className="dvn-iletisim-grid"
          style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 40, alignItems: "start" }}
        >
          {/* Sol: iletişim bilgileri */}
          <div>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              İLETİŞİM BİLGİLERİ
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 23, fontWeight: 500, margin: "0 0 24px", lineHeight: 1.3 }}>
              {siteConfig.adUzun}
            </h2>

            <div style={{ display: "grid", gap: 14 }}>
              {iletisimBilgileri.map((b) => {
                const icerik = (
                  <>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 44,
                        height: 44,
                        borderRadius: 11,
                        background: "var(--dvn-altin-soluk)",
                        color: "var(--dvn-altin)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{b.icon}</svg>
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: 12, color: "var(--dvn-gri-500)", marginBottom: 2 }}>{b.baslik}</span>
                      <span style={{ display: "block", fontSize: 14, color: "var(--dvn-lacivert)", fontWeight: 500, lineHeight: 1.5 }}>{b.deger}</span>
                    </span>
                  </>
                );

                const kartStili: React.CSSProperties = {
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "var(--dvn-gri-50)",
                  border: "0.5px solid var(--dvn-gri-300)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  textDecoration: "none",
                  color: "inherit",
                };

                return b.href ? (
                  <a key={b.baslik} href={b.href} style={kartStili}>
                    {icerik}
                  </a>
                ) : (
                  <div key={b.baslik} style={kartStili}>
                    {icerik}
                  </div>
                );
              })}
            </div>

            {/* Başvuru yönlendirmesi */}
            <div
              style={{
                marginTop: 20,
                background: "var(--dvn-gradient-lacivert)",
                borderRadius: 12,
                padding: "20px 22px",
              }}
            >
              <p style={{ color: "white", fontSize: 14, fontWeight: 500, margin: "0 0 4px" }}>Belgelendirme başvurusu mu yapacaksınız?</p>
              <p style={{ color: "#9aa5b1", fontSize: 12.5, margin: "0 0 14px", lineHeight: 1.6 }}>
                Online başvuru sistemimiz ile dakikalar içinde başvurunuzu oluşturabilirsiniz.
              </p>
              <a
                href={`${siteConfig.dbysUrl}/basvuru`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--dvn-gradient-turuncu)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "var(--dvn-radius-md)",
                  fontWeight: 500,
                  fontSize: 13,
                }}
              >
                Başvuru Yap →
              </a>
            </div>
          </div>

          {/* Sağ: form */}
          <div
            style={{
              background: "white",
              border: "0.5px solid var(--dvn-gri-300)",
              borderRadius: 16,
              padding: "32px 30px",
              boxShadow: "0 8px 32px rgba(2,35,152,0.06)",
            }}
          >
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              MESAJ GÖNDERİN
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 500, margin: "0 0 24px", lineHeight: 1.3 }}>
              Formu doldurun, size dönelim
            </h2>
            <IletisimFormu />
          </div>
        </div>
      </section>

      {/* Harita */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "0 32px 70px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "0.5px solid var(--dvn-gri-300)", boxShadow: "0 8px 32px rgba(2,35,152,0.06)", lineHeight: 0 }}>
            <iframe
              src={haritaUrl}
              title={`${siteConfig.adUzun} konumu`}
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .dvn-iletisim-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
