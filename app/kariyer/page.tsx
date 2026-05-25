import type { Metadata } from "next";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import KariyerFormu from "../components/KariyerFormu";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Kariyer",
  description:
    "DVN Cert ekibine katılın. Denetçi ve teknik uzman başvuruları ile planlama, belgelendirme ve yönetim alanlarındaki idari pozisyonlar için açık başvuru.",
  alternates: { canonical: `${siteConfig.url}/kariyer` },
};

const denetciLink = siteConfig.kariyer.denetciBasvuruUrl;

const nedenler = [
  {
    baslik: "Uzmanlaşma",
    aciklama: "ISO yönetim sistemleri ve denetim alanında derinleşin, sektörün en güncel uygulamalarıyla çalışın.",
    icon: <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    baslik: "Sürekli Gelişim",
    aciklama: "Düzenli eğitim ve yeterlilik programlarıyla yetkinliklerinizi sürekli geliştirin.",
    icon: <path d="M21 12a9 9 0 11-2.64-6.36M21 4v5h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    baslik: "Bağımsız Kültür",
    aciklama: "Tarafsızlık ve dürüstlüğün esas olduğu, etik değerlere bağlı bir çalışma ortamı.",
    icon: <path d="M12 3v18M3 7l9-4 9 4M5 7v6c0 2 1.5 3 3.5 3S12 15 12 13M12 13c0 2 1.5 3 3.5 3S19 15 19 13V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

const denetciAranan = [
  "İlgili mühendislik veya teknik alanlarda sektör deneyimi",
  "ISO 9001, 14001, 45001 veya 50001 standartlarına hâkimiyet",
  "Baş denetçi / denetçi eğitimi tercih sebebidir",
  "Denetimler için seyahat edebilme esnekliği",
];

export default function KariyerSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Kariyer", url: "/kariyer" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="KARİYER"
        baslik="DVN Cert'te Kariyer"
        aciklama="Bağımsız ve tarafsız belgelendirmenin bir parçası olun; uzman ekibimizi birlikte büyütelim."
        kirintilar={[{ etiket: "Kariyer" }]}
      />

      <KapakGorsel alt="DVN Cert kariyer fırsatları" ikon="denetim" etiket="Ekibimize katılın" oncelik />

      {/* Neden DVN Cert */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              NEDEN DVN CERT?
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Kariyerinizi güçlü temeller üzerine kurun
            </h2>
          </div>

          <div className="dvn-neden-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {nedenler.map((n) => (
              <div key={n.baslik} style={{ background: "var(--dvn-gri-50)", borderRadius: 14, padding: "28px 24px", border: "0.5px solid var(--dvn-gri-300)" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: "var(--dvn-gradient-lacivert)",
                    color: "var(--dvn-altin-acik)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                    boxShadow: "0 6px 16px rgba(2,35,152,0.15)",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">{n.icon}</svg>
                </div>
                <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 500, margin: "0 0 10px", lineHeight: 1.3 }}>{n.baslik}</h3>
                <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: 0 }}>{n.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İki başvuru yolu */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              BAŞVURU
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Size uygun başvuru yolunu seçin
            </h2>
          </div>

          <div className="dvn-basvuru-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }}>
            {/* Denetçi & Teknik Uzman (DBYS) */}
            <div
              style={{
                background: "var(--dvn-gradient-lacivert)",
                borderRadius: 18,
                padding: "34px 32px",
                color: "white",
                boxShadow: "0 12px 40px rgba(2,35,152,0.18)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: 11, color: "var(--dvn-altin-acik)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                DENETİM KADROSU
              </p>
              <h3 style={{ color: "white", fontSize: 20, fontWeight: 500, margin: "0 0 12px", lineHeight: 1.3 }}>
                Denetçi ve Teknik Uzman
              </h3>
              <p style={{ fontSize: 13.5, color: "#9aa5b1", lineHeight: 1.7, margin: "0 0 18px" }}>
                Saha denetimlerinde ve teknik değerlendirmelerde görev alacak denetçi ve teknik uzmanları
                aramaktayız. Başvurular online sistemimiz (DBYS) üzerinden alınır.
              </p>

              <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "grid", gap: 10 }}>
                {denetciAranan.map((m, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M5 12l5 5L20 7" stroke="var(--dvn-altin-acik)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {m}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "auto" }}>
                {denetciLink ? (
                  <a
                    href={denetciLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={ctaStili}
                  >
                    DBYS Üzerinden Başvur →
                  </a>
                ) : (
                  <>
                    <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Denetçi / Teknik Uzman Başvurusu")}`} style={ctaStili}>
                      CV Gönder →
                    </a>
                    <p style={{ fontSize: 11.5, color: "#9aa5b1", margin: "12px 0 0" }}>
                      Online başvuru sistemimiz (DBYS) çok yakında devreye girecek.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* İdari & Ofis pozisyonları */}
            <div
              style={{
                background: "white",
                borderRadius: 18,
                padding: "34px 32px",
                border: "0.5px solid var(--dvn-gri-300)",
                boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                İDARİ VE OFİS
              </p>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 20, fontWeight: 500, margin: "0 0 12px", lineHeight: 1.3 }}>
                İdari ve Ofis Pozisyonları
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: "0 0 18px" }}>
                Belgelendirme süreçlerinin işleyişinde görev alacak takım arkadaşları arıyoruz. Aşağıdaki
                pozisyonlar için başvuru formunu doldurabilirsiniz.
              </p>

              <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "grid", gap: 10 }}>
                {siteConfig.kariyer.idariPozisyonlar.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.5 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M5 12l5 5L20 7" stroke="var(--dvn-altin)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>

              <a href="#basvuru-formu" style={{ ...ctaStili, marginTop: "auto", background: "var(--dvn-gradient-turuncu)" }}>
                Başvuru Formuna Git →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* İdari başvuru formu */}
      <section id="basvuru-formu" style={{ background: "white", padding: "60px 32px 70px", scrollMarginTop: 120 }}>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            background: "white",
            border: "0.5px solid var(--dvn-gri-300)",
            borderRadius: 16,
            padding: "34px 32px",
            boxShadow: "0 8px 32px rgba(2,35,152,0.06)",
          }}
        >
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
            BAŞVURU FORMU
          </p>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 500, margin: "0 0 6px", lineHeight: 1.3 }}>
            İdari pozisyon başvurusu
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Denetçi ve teknik uzman başvuruları için lütfen yukarıdaki denetim kadrosu bölümünü kullanın.
          </p>
          <KariyerFormu />
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .dvn-neden-grid { grid-template-columns: 1fr !important; }
          .dvn-basvuru-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

const ctaStili: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  background: "var(--dvn-gradient-turuncu)",
  color: "white",
  padding: "12px 24px",
  borderRadius: "var(--dvn-radius-md)",
  fontWeight: 500,
  fontSize: 13.5,
  boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
  textAlign: "center",
};
