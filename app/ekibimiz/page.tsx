import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Ekibimiz",
  description:
    "DVN Cert'in alanında deneyimli baş denetçi, teknik uzman ve değerlendirme ekibi. Yetkin kadromuzla bağımsız ve tarafsız belgelendirme hizmeti sunuyoruz.",
  alternates: { canonical: `${siteConfig.url}/ekibimiz` },
};

// NOT: Aşağıdaki ekip bilgileri ÖRNEK / yer tutucudur.
// Gerçek ekip üyeleri ve görselleriyle güncellenecektir.
const ekip = [
  { ad: "Genel Müdür", rol: "Üst Yönetim", uzmanlik: "Kurumsal yönetim ve strateji" },
  { ad: "Belgelendirme Müdürü", rol: "Karar Mercii", uzmanlik: "Belgelendirme kararı ve gözetim" },
  { ad: "Baş Denetçi", rol: "ISO 9001 / 14001", uzmanlik: "Kalite ve çevre yönetim sistemleri" },
  { ad: "Baş Denetçi", rol: "ISO 45001", uzmanlik: "İş sağlığı ve güvenliği" },
  { ad: "Teknik Uzman", rol: "ISO 50001", uzmanlik: "Enerji yönetim sistemleri" },
  { ad: "Tarafsızlık Komitesi", rol: "Gözetim", uzmanlik: "Bağımsızlık ve tarafsızlığın güvencesi" },
];

function basHarfler(metin: string) {
  return metin
    .split(" ")
    .map((k) => k[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function EkibimizSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Ekibimiz", url: "/ekibimiz" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="KURUMSAL"
        baslik="Ekibimiz"
        aciklama="Belgelendirme süreçlerimizin güvenilirliği, alanında uzman ve bağımsız çalışan kadromuzdan gelir."
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Ekibimiz" }]}
      />

      <KapakGorsel alt="DVN Cert uzman denetçi ve değerlendirme ekibi" ikon="denetim" etiket="Uzman ve bağımsız denetçi kadromuz" oncelik />

      {/* Giriş */}
      <section style={{ background: "white", padding: "60px 32px 36px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 10px" }}>
            UZMAN KADRO
          </p>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: "0 0 16px", lineHeight: 1.3 }}>
            Yetkinlik, deneyim ve tarafsızlık
          </h2>
          <p style={{ fontSize: 15, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>
            Denetçi ve teknik uzmanlarımız, ilgili standartların gerekliliklerine hakim; düzenli eğitim ve
            yeterlilik değerlendirmeleriyle yetkinlikleri sürekli izlenen profesyonellerden oluşur. Karar
            süreçlerimiz, tarafsızlığı güvence altına alan bir yapı içinde yürütülür.
          </p>
        </div>
      </section>

      {/* Ekip kartları */}
      <section style={{ background: "white", padding: "0 32px 60px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="dvn-ekip-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {ekip.map((kisi, i) => (
              <div
                key={i}
                style={{
                  background: "var(--dvn-gri-50)",
                  borderRadius: 14,
                  padding: "28px 24px",
                  border: "0.5px solid var(--dvn-gri-300)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 76,
                    height: 76,
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    background: "var(--dvn-gradient-lacivert)",
                    color: "var(--dvn-altin-acik)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 600,
                    boxShadow: "0 6px 16px rgba(46,26,107,0.15)",
                  }}
                >
                  {basHarfler(kisi.ad)}
                </div>
                <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 500, margin: "0 0 4px" }}>
                  {kisi.ad}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--dvn-altin)",
                    fontWeight: 500,
                    background: "var(--dvn-altin-soluk)",
                    display: "inline-block",
                    padding: "3px 12px",
                    borderRadius: 999,
                    margin: "0 0 12px",
                  }}
                >
                  {kisi.rol}
                </p>
                <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: 0 }}>{kisi.uzmanlik}</p>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: "var(--dvn-gri-500)", margin: "28px 0 0", fontStyle: "italic" }}>
            Kadro bilgileri yakında üye bazında detaylandırılacaktır.
          </p>
        </div>
      </section>

      {/* Kariyer CTA */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "50px 32px 70px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>
            Ekibimize katılmak ister misiniz?
          </h2>
          <p style={{ fontSize: 14, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: "0 0 22px" }}>
            Denetçi ve uzman kadromuzu güçlendirecek profesyonellerle tanışmak isteriz.
          </p>
          <Link
            href="/kariyer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--dvn-gradient-turuncu)",
              color: "white",
              padding: "12px 26px",
              borderRadius: "var(--dvn-radius-md)",
              fontWeight: 500,
              fontSize: 14,
              boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
            }}
          >
            Kariyer fırsatları →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .dvn-ekip-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .dvn-ekip-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
