import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Akreditasyonlarımız",
  description:
    "DVN Cert, TÜRKAK akreditasyonu kapsamında ISO 9001, ISO 14001, ISO 45001 ve ISO 50001 yönetim sistemleri belgelendirmesi yapar. Akreditasyon kapsamımızın ayrıntıları.",
  alternates: { canonical: `${siteConfig.url}/akreditasyonlarimiz` },
};

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

export default function AkreditasyonlarimizSayfasi() {
  const { akreditasyon } = siteConfig;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Akreditasyonlarımız", url: "/akreditasyonlarimiz" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="KURUMSAL"
        baslik="Akreditasyonlarımız"
        aciklama={`${akreditasyon.kurulus} akreditasyonu, verdiğimiz belgelerin bağımsızlığını, yetkinliğini ve uluslararası geçerliliğini güvence altına alır.`}
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Akreditasyonlarımız" }]}
      />

      <KapakGorsel alt={`${akreditasyon.kurulus} akreditasyonu ile ISO belgelendirme`} ikon="sistem" etiket={`${akreditasyon.kurulus} akreditasyon kapsamımız`} oncelik />

      {/* Akreditasyon nedir + bilgi kartı */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div
          className="dvn-akr-ust"
          style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center" }}
        >
          <div>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 10px" }}>
              AKREDİTASYON NEDİR?
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: "0 0 16px", lineHeight: 1.3 }}>
              Belgelendirmenin güvencesi
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: "0 0 14px" }}>
              Akreditasyon, bir belgelendirme kuruluşunun belirli standartlarda denetim ve belgelendirme yapmaya
              yetkin olduğunun, ulusal akreditasyon kurumu tarafından bağımsız olarak doğrulanmasıdır.
            </p>
            <p style={{ fontSize: 14.5, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>
              {akreditasyon.kurulus} ({akreditasyon.kurulus === "TÜRKAK" ? "Türk Akreditasyon Kurumu" : "Akreditasyon Kurumu"})
              tarafından akredite edilmiş bir kuruluş olarak düzenlediğimiz sertifikalar, uluslararası karşılıklı
              tanıma anlaşmaları kapsamında geçerlidir.
            </p>
          </div>

          {/* Bilgi kartı */}
          <div
            style={{
              background: "var(--dvn-gradient-lacivert)",
              borderRadius: 16,
              padding: "30px 28px",
              color: "white",
              boxShadow: "0 12px 40px rgba(46,26,107,0.18)",
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <p style={{ fontSize: 11, color: "#9aa5b1", margin: "0 0 4px", letterSpacing: "0.5px" }}>AKREDİTASYON KURUMU</p>
                <p style={{ fontSize: 18, fontWeight: 600, color: "var(--dvn-altin-acik)", margin: 0 }}>{akreditasyon.kurulus}</p>
              </div>
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }} />
              <div>
                <p style={{ fontSize: 11, color: "#9aa5b1", margin: "0 0 4px", letterSpacing: "0.5px" }}>AKREDİTASYON NUMARASI</p>
                <p style={{ fontSize: 16, fontWeight: 500, color: "white", margin: 0 }}>{akreditasyon.referansNumarasi}</p>
              </div>
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }} />
              <div>
                <p style={{ fontSize: 11, color: "#9aa5b1", margin: "0 0 4px", letterSpacing: "0.5px" }}>KAPSAM</p>
                <p style={{ fontSize: 16, fontWeight: 500, color: "white", margin: 0 }}>{akreditasyon.kapsam.length} yönetim sistemi standardı</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kapsamdaki standartlar */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              AKREDİTASYON KAPSAMIMIZ
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Belgelendirme yaptığımız standartlar
            </h2>
          </div>

          <div
            className="dvn-std-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
          >
            {akreditasyon.kapsam.map((std) => {
              const bilgi = standartAciklamalari[std];
              return (
                <div
                  key={std}
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: "26px 26px",
                    boxShadow: "0 4px 16px rgba(46,26,107,0.06)",
                    border: "0.5px solid var(--dvn-gri-300)",
                    borderLeft: "3px solid var(--dvn-altin)",
                    display: "flex",
                    gap: 18,
                  }}
                >
                  <div
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

      {/* Sertifika doğrulama yönlendirmesi */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "0 32px 70px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "white",
            borderRadius: 16,
            padding: "32px 34px",
            border: "0.5px solid var(--dvn-gri-300)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 19, fontWeight: 500, margin: "0 0 6px" }}>
              Bir sertifikanın geçerliliğini doğrulayın
            </h2>
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 13.5, margin: 0 }}>
              DVN Cert tarafından düzenlenmiş bir belgenin güncel durumunu çevrim içi sorgulayabilirsiniz.
            </p>
          </div>
          <Link
            href="/sertifika-sorgula"
            style={{
              background: "var(--dvn-gradient-turuncu)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "var(--dvn-radius-md)",
              fontWeight: 500,
              fontSize: 13.5,
              boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            Sertifika Sorgula →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .dvn-akr-ust { grid-template-columns: 1fr !important; }
          .dvn-std-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
