import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { siteConfig } from "@/lib/site-config";
import { faqSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "DVN Cert belgelendirme hizmetleri hakkında sıkça sorulan sorular: belgelendirme süreci, süresi, ISO belgesinin faydaları ve belgelendirme sonrası yükümlülükler.",
  alternates: { canonical: `${siteConfig.url}/sss` },
};

const sorular = [
  {
    soru: "DVN Cert hangi yönetim sistemleri için belgelendirme hizmeti sunmaktadır?",
    cevap:
      "DVN Cert olarak, kuruluşların uluslararası standartlara uygunluğunu doğrulamak amacıyla çeşitli yönetim sistemleri için belgelendirme hizmeti sunmaktayız. Başlıca hizmet verdiğimiz standartlar; ISO 9001 (Kalite Yönetimi), ISO 14001 (Çevre Yönetimi), ISO 45001 (İş Sağlığı ve Güvenliği) ve ISO 50001 (Enerji Yönetimi)'dir. Bu standartlar, operasyonel verimliliğinizi ve sürdürülebilirlik hedeflerinizi geliştirmenize yardımcı olur.",
  },
  {
    soru: "Belgelendirme süreci ne kadar sürer ve hangi aşamalardan oluşur?",
    cevap:
      "Belgelendirme süreci; kuruluşunuzun büyüklüğüne, sektörüne ve mevcut yönetim sisteminin olgunluğuna göre değişiklik gösterebilir. Süreç genellikle başvuru, Aşama 1 (doküman incelemesi) ve Aşama 2 (yerinde denetim) denetimlerinden oluşur. Başarılı bir denetim sonrası belgelendirme kararı alınır ve belge düzenlenir. Bu süreç, ilgili standarda ve hazırlık düzeyinize bağlı olarak birkaç hafta ile birkaç ay arasında tamamlanabilir.",
  },
  {
    soru: "ISO belgesine sahip olmak şirketimize ne gibi faydalar sağlar?",
    cevap:
      "ISO belgesi, kuruluşunuzun uluslararası kabul görmüş standartlara uygun çalıştığını kanıtlar. Bu, müşteri güvenini artırır, operasyonel verimliliği yükseltir ve pazarda rekabet avantajı sağlar. Örneğin ISO 50001 belgesi, enerji verimliliğinizi artırarak maliyetlerinizi düşürmenize doğrudan yardımcı olur. Tüm standartlar, süreçlerinizi sistematik hale getirerek riskleri azaltır ve sürekli iyileştirme kültürünün oluşmasına katkı sağlar.",
  },
  {
    soru: "DVN Cert'i diğer belgelendirme kuruluşlarından ayıran özellikler nelerdir?",
    cevap:
      "DVN Cert; tarafsızlık ve yetkinliğe büyük önem veren, ISO/IEC 17021-1 esaslarına ve TÜRKAK akreditasyonuna dayanan bağımsız bir belgelendirme kuruluşudur. Deneyimli denetçi kadromuz ve sektör uzmanlığımızla yalnızca uygunluk tespiti yapmakla kalmaz, yönetim sistemlerinizi daha etkili hale getirecek değerli geri bildirimler sunarız. Amacımız sadece bir belge vermek değil, iş süreçlerinize gerçek bir katma değer sağlamaktır.",
  },
  {
    soru: "Belgelendirme sonrası ne gibi yükümlülüklerimiz olacak?",
    cevap:
      "Belgeyi aldıktan sonra yönetim sisteminizin etkinliğini sürdürmeniz gerekir. Belgenizin geçerliliği süresince (genellikle 3 yıl) tarafımızdan yıllık gözetim denetimleri yapılır. Bu denetimler, sistemin devamlılığını ve standartlara uygunluğunu teyit etmeyi amaçlar. Üçüncü yılın sonunda ise yeniden belgelendirme denetimi yapılarak belgenizin geçerliliği yenilenir.",
  },
];

export default function SSSSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Sıkça Sorulan Sorular", url: "/sss" },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(faqSchema(sorular))}
      />

      <SayfaBaslik
        etiket="NEDEN DVN CERT"
        baslik="Sıkça Sorulan Sorular"
        aciklama="Belgelendirme süreci ve hizmetlerimiz hakkında en çok merak edilenleri sizin için derledik."
        kirintilar={[{ etiket: "Neden DVN Cert" }, { etiket: "S.S.S." }]}
      />

      <KapakGorsel alt="DVN Cert sıkça sorulan sorular" etiket="Belgelendirme hakkında merak edilenler" oncelik />

      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "grid", gap: 14 }}>
          {sorular.map((s, i) => (
            <details key={i} className="dvn-sss" style={{ background: "var(--dvn-gri-50)", borderRadius: 12, border: "0.5px solid var(--dvn-gri-300)", overflow: "hidden" }}>
              <summary
                className="dvn-sss-baslik"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "20px 22px",
                  cursor: "pointer",
                  fontSize: 15.5,
                  fontWeight: 500,
                  color: "var(--dvn-lacivert)",
                  listStyle: "none",
                }}
              >
                {s.soru}
                <svg className="dvn-sss-ok" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M6 9l6 6 6-6" stroke="var(--dvn-turuncu)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div style={{ padding: "0 22px 22px" }}>
                <p style={{ fontSize: 14, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>{s.cevap}</p>
              </div>
            </details>
          ))}

          {/* İletişim yönlendirmesi */}
          <div
            style={{
              marginTop: 16,
              background: "var(--dvn-gradient-lacivert)",
              borderRadius: 14,
              padding: "28px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h2 style={{ color: "white", fontSize: 18, fontWeight: 500, margin: "0 0 4px" }}>Sorunuzu burada bulamadınız mı?</h2>
              <p style={{ color: "#9aa5b1", fontSize: 13.5, margin: 0 }}>Ekibimiz tüm sorularınızı yanıtlamaktan memnuniyet duyar.</p>
            </div>
            <Link
              href="/iletisim"
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
              Bize Ulaşın →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .dvn-sss-baslik::-webkit-details-marker { display: none; }
        .dvn-sss[open] .dvn-sss-ok { transform: rotate(180deg); }
        .dvn-sss-ok { transition: transform 0.22s ease; }
        .dvn-sss[open] { border-color: var(--dvn-altin) !important; }
        .dvn-sss-baslik:hover { color: var(--dvn-turuncu) !important; }
      `}</style>
    </main>
  );
}
