import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";
import { breadcrumbSchema, faqSchema, schemaScript } from "@/lib/seo-schemas";

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/belgelendirme-sureci",
    title: "ISO Belgesi Nasıl Alınır? Belgelendirme Süreci Adım Adım",
    description:
      "ISO belgelendirme süreci adım adım: başvuru, sözleşme, Aşama 1 ve Aşama 2 denetimi, belgelendirme kararı, belge, gözetim ve yeniden belgelendirme. Nasıl ISO belgesi alınır?",
  });
}

const adimlar = [
  { baslik: "Başvuru ve Teklif", aciklama: "Belgelendirme istenen standart ve kapsam (faaliyet alanı, çalışan sayısı, saha sayısı) belirlenir. Online başvuru sistemimiz üzerinden başvurunuzu oluşturursunuz; size uygun bir teklif sunulur." },
  { baslik: "Sözleşme ve Planlama", aciklama: "Teklifin kabulüyle belgelendirme sözleşmesi imzalanır, denetim ekibi ve denetim takvimi planlanır." },
  { baslik: "Aşama 1 Denetimi (Doküman İncelemesi)", aciklama: "Yönetim sistemi dokümantasyonunuz ve genel hazırlık durumunuz değerlendirilir; Aşama 2 için hazırlık ve planlama yapılır." },
  { baslik: "Aşama 2 Denetimi (Saha Denetimi)", aciklama: "Yönetim sisteminin sahada nasıl uygulandığı kapsamlı olarak değerlendirilir; süreç sahipleriyle görüşülür, kayıtlar incelenir, sistemin etkinliği yerinde gözlemlenir." },
  { baslik: "Belgelendirme Kararı ve Belge", aciklama: "Bağımsız bir karar vericinin değerlendirmesi sonucu olumlu kararla, uluslararası geçerli sertifikanız düzenlenir." },
  { baslik: "Gözetim Denetimleri", aciklama: "Belge geçerliliği boyunca (genellikle 3 yıl) yıllık gözetim denetimleriyle sistemin sürekliliği teyit edilir." },
  { baslik: "Yeniden Belgelendirme", aciklama: "Üç yılın sonunda yeniden belgelendirme denetimiyle belge yenilenir ve 3 yıl daha uzatılır." },
];

const sss = [
  {
    soru: "ISO belgesi almak ne kadar sürer?",
    cevap: "Süre; kuruluşun büyüklüğüne, kapsamına ve yönetim sisteminin hazırlık düzeyine göre değişir. Sözleşmeden belgeye kadar olan süreç genellikle birkaç hafta ile birkaç ay arasındadır. Aşama 1 ve Aşama 2 denetimleri arasında, tespit edilen hususların giderilmesi için makul bir süre tanınır.",
  },
  {
    soru: "Belge alabilmek için ön şart nedir?",
    cevap: "İlgili standardın gerekliliklerine uygun, kurulmuş ve bir süredir işletilen bir yönetim sistemi gerekir. En az bir iç tetkik ve yönetim gözden geçirme toplantısının tamamlanmış olması beklenir. Hazırlık için belgelendirme denetimine hazırlık yazımızı inceleyebilirsiniz.",
  },
  {
    soru: "ISO belgesi kaç yıl geçerlidir?",
    cevap: "ISO 9001, 14001, 45001 ve 50001 sertifikaları 3 yıl geçerlidir. Bu süre boyunca yıllık gözetim denetimleri yapılır; üçüncü yılın sonunda yeniden belgelendirme ile belge yenilenir.",
  },
  {
    soru: "Belgelendirme maliyeti neye göre belirlenir?",
    cevap: "Maliyet; standart, kapsam, çalışan sayısı, saha sayısı ve denetim adam/gün süresine göre belirlenir. Başvurunuz sonrası kuruluşunuza özel bir teklif sunulur.",
  },
  {
    soru: "Birden fazla standardı tek denetimde belgelendirebilir miyim?",
    cevap: "Evet. ISO 9001, 14001 ve 45001 gibi standartlar entegre bir yönetim sistemi olarak tek bir denetimle belgelendirilebilir; bu, zaman ve maliyet tasarrufu sağlar.",
  },
];

export default function BelgelendirmeSureciSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Belgelendirme Süreci", url: "/belgelendirme-sureci" },
          ]),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(faqSchema(sss))} />

      <SayfaBaslik
        etiket="BELGELENDİRME"
        baslik="ISO Belgesi Nasıl Alınır?"
        aciklama="Başvurudan belgeye kadar ISO belgelendirme sürecinin tüm adımları."
        kirintilar={[{ etiket: "Belgelendirme Süreci" }]}
      />

      <KapakGorsel src="/gorseller/sayfalar/belgelendirme-sureci.webp" alt="ISO belgelendirme süreci - DVN Cert" ikon="sistem" etiket="Belgelendirme Süreci" oncelik />

      <section className="dvn-reveal" style={{ background: "white", padding: "56px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: "0 0 16px" }}>
            ISO belgelendirme; yönetim sisteminizin ilgili standardın gerekliliklerini karşıladığının bağımsız ve
            akredite bir belgelendirme kuruluşu tarafından doğrulanmasıdır. Aşağıda, başvurudan belgenin
            düzenlenmesine ve sürdürülmesine kadar sürecin tüm adımlarını bulabilirsiniz.
          </p>
          <p style={{ fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: 0 }}>
            DVN Cert olarak{" "}
            <Link href="/hizmetler/sistem-belgelendirme" style={baglanti}>sistem belgelendirme</Link> kapsamında{" "}
            <Link href="/hizmetler/iso-9001" style={baglanti}>ISO 9001</Link>,{" "}
            <Link href="/hizmetler/iso-14001" style={baglanti}>ISO 14001</Link>,{" "}
            <Link href="/hizmetler/iso-45001" style={baglanti}>ISO 45001</Link> ve{" "}
            <Link href="/hizmetler/iso-50001" style={baglanti}>ISO 50001</Link> belgelendirmesi sunuyoruz.
          </p>
        </div>
      </section>

      {/* Adımlar */}
      <section className="dvn-reveal" style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              ADIM ADIM SÜREÇ
            </p>
            <h2 className="dvn-gradyan-metin--koyu" style={{ fontSize: 27, fontWeight: 600, margin: 0, lineHeight: 1.3, display: "inline-block" }}>
              Başvurudan belgeye 7 adım
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {adimlar.map((a, i) => (
              <div key={i} className="dvn-adim-kart" style={{ display: "flex", gap: 18, background: "white", borderRadius: 14, padding: "22px 24px", border: "0.5px solid var(--dvn-gri-300)" }}>
                <span className="dvn-adim-no" style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: "var(--dvn-gradient-turuncu)", color: "white", fontSize: 16, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(245,130,32,0.3)" }}>
                  {i + 1}
                </span>
                <div>
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 }}>{a.baslik}</h3>
                  <p style={{ fontSize: 14, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: 0 }}>{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="dvn-reveal" style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              SIKÇA SORULAN SORULAR
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Belgelendirme hakkında merak edilenler
            </h2>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {sss.map((s, i) => (
              <details key={i} className="dvn-sss" style={{ background: "var(--dvn-gri-50)", borderRadius: 12, border: "0.5px solid var(--dvn-gri-300)", overflow: "hidden" }}>
                <summary className="dvn-sss-baslik" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 22px", cursor: "pointer", fontSize: 15.5, fontWeight: 500, color: "var(--dvn-lacivert)", listStyle: "none" }}>
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
          </div>

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <Link href="/blog/belgelendirme-denetimine-hazirlik" style={baglantiRozet}>Belgelendirme denetimine hazırlık →</Link>
            <Link href="/dokumanlar" style={baglantiRozet}>Belgelendirme kuralları →</Link>
            <Link href="https://tbds.turkak.org.tr" target="_blank" rel="noopener noreferrer" style={baglantiRozet}>Sertifika sorgula →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dvn-reveal" style={{ background: "white", padding: "0 32px 70px" }}>
        <div style={{ position: "relative", overflow: "hidden", maxWidth: 1100, margin: "0 auto", background: "var(--dvn-gradient-lacivert)", borderRadius: 18, padding: "44px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, boxShadow: "0 18px 50px rgba(2,35,152,0.24), 0 0 0 1px rgba(212,169,63,0.16)" }}>
          <div className="dvn-grid-desen" aria-hidden style={{ opacity: 0.5 }} />
          <span className="dvn-glow-orb dvn-glow-orb--altin" aria-hidden style={{ top: -110, right: "12%", width: 280, height: 280, opacity: 0.4 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "white", fontSize: 23, fontWeight: 600, margin: "0 0 6px" }}>Belgelendirme için teklif alın</h2>
            <p style={{ color: "#cbd5e1", fontSize: 13.5, margin: 0 }}>Online başvuru sistemimizle dakikalar içinde başvurunuzu oluşturun.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <Link href="https://dbys.dvncert.com/basvuru" target="_blank" className="dvn-btn-primary" style={{ padding: "13px 24px", fontSize: 14, whiteSpace: "nowrap" }}>
              Başvuru Yap →
            </Link>
            <Link href="/iletisim" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.28)", color: "white", padding: "13px 24px", borderRadius: "var(--dvn-radius-md)", fontWeight: 500, fontSize: 14, whiteSpace: "nowrap", backdropFilter: "blur(10px)" }}>
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .dvn-adim-kart {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dvn-adim-kart:hover {
          transform: translateX(6px);
          box-shadow: 0 14px 32px rgba(2,35,152,0.12);
          border-color: rgba(212,169,63,0.4);
        }
        .dvn-adim-no { transition: transform 0.3s ease; }
        .dvn-adim-kart:hover .dvn-adim-no { transform: scale(1.12); }
        .dvn-sss-baslik::-webkit-details-marker { display: none; }
        .dvn-sss[open] .dvn-sss-ok { transform: rotate(180deg); }
        .dvn-sss-ok { transition: transform 0.22s ease; }
        .dvn-sss[open] { border-color: var(--dvn-altin) !important; }
        .dvn-sss-baslik:hover { color: var(--dvn-turuncu) !important; }
      `}</style>
    </main>
  );
}

const baglanti: React.CSSProperties = { color: "var(--dvn-turuncu)", textDecoration: "underline", textUnderlineOffset: "2px", fontWeight: 500 };
const baglantiRozet: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13.5,
  fontWeight: 500,
  color: "var(--dvn-lacivert)",
  background: "var(--dvn-altin-soluk)",
  border: "0.5px solid var(--dvn-gri-300)",
  borderRadius: 999,
  padding: "8px 16px",
  textDecoration: "none",
};
