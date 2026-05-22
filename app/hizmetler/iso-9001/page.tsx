import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import HizmetIkon from "../../components/HizmetIkon";
import { hizmetGetir } from "@/lib/hizmetler";
import { schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "ISO 9001:2015 Kalite Yönetim Sistemi Belgelendirmesi | DVN Cert",
  description:
    "TÜRKAK akreditasyon kapsamında ISO 9001:2015 belgelendirmesi. Başvuru süreci, faydalar, geçerlilik süresi ve adım adım belgelendirme rehberi.",
  keywords: [
    "ISO 9001 belgesi",
    "ISO 9001:2015",
    "ISO 9001 nasıl alınır",
    "ISO 9001 belgesi nedir",
    "kalite yönetim sistemi belgesi",
    "TÜRKAK ISO 9001",
    "ISO 9001 İstanbul",
    "ISO 9001 belgelendirme kuruluşları",
    "ISO 9001 belgesi geçerlilik süresi",
    "ISO 9001 faydaları",
  ],
  alternates: {
    canonical: "https://dvncert.com/hizmetler/iso-9001",
  },
  openGraph: {
    title: "ISO 9001:2015 Kalite Yönetim Sistemi Belgelendirmesi",
    description:
      "TÜRKAK akreditasyon kapsamında ISO 9001:2015 belgelendirmesi. Başvuru süreci, faydalar ve adım adım rehber.",
    url: "https://dvncert.com/hizmetler/iso-9001",
    type: "article",
  },
};

// JSON-LD: Service
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ISO 9001:2015 Kalite Yönetim Sistemi Belgelendirmesi",
  description:
    "TÜRKAK akreditasyon kapsamında ISO 9001:2015 kalite yönetim sistemi belgelendirmesi.",
  provider: {
    "@type": "Organization",
    name: "DVN Cert Belgelendirme",
    url: "https://dvncert.com",
  },
  serviceType: "Sistem Belgelendirme",
  areaServed: {
    "@type": "Country",
    name: "Türkiye",
  },
  url: "https://dvncert.com/hizmetler/iso-9001",
};

// JSON-LD: BreadcrumbList
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://dvncert.com" },
    { "@type": "ListItem", position: 2, name: "Hizmetler", item: "https://dvncert.com/hizmetler" },
    {
      "@type": "ListItem",
      position: 3,
      name: "ISO 9001 Kalite Yönetim Sistemi",
      item: "https://dvncert.com/hizmetler/iso-9001",
    },
  ],
};

// ---- Ortak stiller ----
const P = {
  fontSize: 15.5,
  color: "var(--dvn-gri-700)",
  lineHeight: 1.85,
  margin: "0 0 18px",
} as const;

const ilkLink = {
  color: "var(--dvn-turuncu)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  fontWeight: 500,
} as const;

// ---- Yardımcı bileşenler ----
function BolumBaslik({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
        {eyebrow}
      </p>
      <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>{children}</h2>
      <div style={{ width: 54, height: 3, borderRadius: 2, background: "var(--dvn-gradient-turuncu)", marginTop: 14 }} />
    </div>
  );
}

function AltBaslik({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "var(--dvn-lacivert)",
        fontSize: 18,
        fontWeight: 600,
        margin: "30px 0 14px",
        lineHeight: 1.35,
      }}
    >
      <span style={{ width: 4, height: 18, borderRadius: 2, background: "var(--dvn-gradient-altin)", flexShrink: 0 }} />
      {children}
    </h3>
  );
}

function DuzListe({ maddeler }: { maddeler: string[] }) {
  return (
    <ul style={{ listStyle: "none", margin: "0 0 18px", padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
      {maddeler.map((m, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", background: "var(--dvn-altin)", marginTop: 9 }} />
          <span style={{ fontSize: 15, color: "var(--dvn-gri-700)", lineHeight: 1.7 }}>{m}</span>
        </li>
      ))}
    </ul>
  );
}

function EtiketliListe({ maddeler }: { maddeler: string[] }) {
  return (
    <ul style={{ listStyle: "none", margin: "0 0 18px", padding: 0, display: "flex", flexDirection: "column", gap: 13 }}>
      {maddeler.map((m, i) => {
        const idx = m.indexOf(": ");
        const etiket = idx > 0 ? m.slice(0, idx) : null;
        const geri = idx > 0 ? m.slice(idx) : m;
        return (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", background: "var(--dvn-altin)", marginTop: 9 }} />
            <span style={{ fontSize: 15, color: "var(--dvn-gri-700)", lineHeight: 1.7 }}>
              {etiket && <strong style={{ color: "var(--dvn-lacivert)", fontWeight: 600 }}>{etiket}</strong>}
              {geri}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function SurecKart({ numara, baslik, children }: { numara: number; baslik: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: "26px 28px", border: "0.5px solid var(--dvn-gri-300)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <span
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "var(--dvn-gradient-turuncu)",
            color: "white",
            fontSize: 17,
            fontWeight: 600,
            boxShadow: "0 6px 16px rgba(245,130,32,0.3)",
          }}
        >
          {numara}
        </span>
        <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
          <span style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Adım {numara} — </span>
          {baslik}
        </h3>
      </div>
      {children}
    </div>
  );
}

// ---- Veri ----
const ilkeler: { baslik: string; metin: string }[] = [
  {
    baslik: "Müşteri Odaklılık",
    metin:
      "Kalite yönetiminin birincil amacı, müşteri şartlarını karşılamak ve müşteri beklentilerini aşmaktır. Müşteri odaklılık ilkesi, kuruluşun mevcut ve gelecekteki müşteri ihtiyaçlarını anlamasını, müşteri beklentilerini operasyonel hedeflere dönüştürmesini ve müşteri memnuniyetini sürekli ölçmesini gerektirir. Bu yaklaşım, sürdürülebilir başarı için temel bir koşuldur.",
  },
  {
    baslik: "Liderlik",
    metin:
      "Üst yönetim, kalite yönetim sisteminin oluşturulmasında, sürdürülmesinde ve iyileştirilmesinde belirleyici bir rol üstlenir. Liderlik ilkesi, yönetimin kalite politikasını belirlemesini, gerekli kaynakları sağlamasını ve tüm çalışanları ortak bir amaca yönlendirmesini ifade eder. ISO 9001:2015 ile birlikte üst yönetimin sürece doğrudan katılımı zorunlu hale gelmiştir.",
  },
  {
    baslik: "Çalışan Katılımı",
    metin:
      "Tüm seviyelerdeki çalışanların yetkinliğine, yetkilendirilmesine ve aktif katılımına dayalı bir kültürün oluşturulması kalite yönetiminin özünde yer alır. Çalışanların kendi süreçlerinin sahibi olduğunu hissetmesi, hata oranlarını düşürür ve iyileştirme fırsatlarının hızla fark edilmesini sağlar. Yetkilendirilmiş çalışan, sahiplenen çalışandır.",
  },
  {
    baslik: "Süreç Yaklaşımı",
    metin:
      "ISO 9001, kuruluşun faaliyetlerini birbiriyle etkileşim halindeki süreçler bütünü olarak ele alır. Her süreç tanımlanır, girdileri ve çıktıları belirlenir, performans göstergeleri ölçülür. Süreç yaklaşımı, sonuçların öngörülebilirliğini artırır ve kaynakların verimli kullanılmasını sağlar. PUKO (Planla-Uygula-Kontrol Et-Önlem Al) döngüsü bu yaklaşımın merkezindedir.",
  },
  {
    baslik: "İyileştirme",
    metin:
      "Başarılı kuruluşların temel özelliği, sürekli iyileştirmeyi kalıcı bir hedef olarak benimsemiş olmalarıdır. ISO 9001:2015, kuruluşların düzeltici faaliyetler, iç tetkikler, yönetim gözden geçirmeleri ve performans analizleri yoluyla sistemini sürekli geliştirmesini beklemektedir. İyileştirme bir defalık bir proje değil, kurumsal bir alışkanlıktır.",
  },
  {
    baslik: "Kanıta Dayalı Karar Verme",
    metin:
      "Etkili kararlar, verilerin ve bilgilerin analizine dayanmalıdır. Bu ilke, kuruluşun varsayımlar yerine ölçülebilir kanıtlarla hareket etmesini öngörür. Performans verilerinin toplanması, analiz edilmesi ve raporlanması, doğru zamanda doğru kararların alınmasını mümkün kılar. Veri olmadan iyileştirme yapılamaz.",
  },
  {
    baslik: "İlişki Yönetimi",
    metin:
      "Bir kuruluşun sürdürülebilir başarısı, sadece kendi performansına değil, tedarikçileri, iş ortakları, müşterileri ve diğer ilgili tarafları kapsayan ilişkilerinin kalitesine de bağlıdır. ISO 9001, kuruluşun bu ilişkileri sistematik bir şekilde yönetmesini, karşılıklı güvene dayalı uzun vadeli bağlar kurmasını teşvik eder. Güçlü tedarik zinciri, güçlü kalite demektir.",
  },
];

const icFaydalar = [
  "Süreç verimliliğinde artış: Tanımlı ve ölçülebilir süreçler, kaynak kullanımını optimize eder; israfın ve gereksiz iş yükünün azalmasını sağlar.",
  "Hata ve uygunsuzluk oranlarında düşüş: Risk bazlı yaklaşım sayesinde potansiyel sorunlar ortaya çıkmadan önce tespit edilir ve önlem alınır.",
  "Çalışan motivasyonunda iyileşme: Açık iş tanımları, yetki ve sorumluluk şemaları ile çalışanlar kendi katkılarını daha net görür.",
  "İç iletişimde güçlenme: Süreçler arası akışın belirgin hale gelmesi, departmanlar arası koordinasyonu artırır.",
  "Maliyet kontrolü: Tekrarlayan hataların azalması, yeniden işleme masraflarının düşmesini ve genel maliyet yapısının iyileşmesini sağlar.",
  "Karar verme kalitesinde yükselme: Veri toplama ve analiz alışkanlığı, yönetimin daha bilinçli kararlar almasına imkan tanır.",
  "Kurumsal hafıza oluşumu: Doküman ve kayıt sistemi, kuruluşun bilgi birikiminin kişilere bağlı kalmasının önüne geçer.",
];

const pazarFaydalar = [
  "Müşteri güveninin artması: Uluslararası kabul görmüş bir standardın gerekliliklerini karşılamak, müşteri nezdinde güvenilirlik anlamına gelir.",
  "İhale ve tedarik zinciri avantajları: Kamu ihalelerinde ve büyük kurumsal müşterilerin tedarikçi seçim süreçlerinde ISO 9001 belgesi çoğu zaman bir ön şart olarak aranır.",
  "Uluslararası pazar erişimi: Akredite bir kuruluştan alınan ISO 9001 belgesi, ihracat süreçlerinde ve yabancı iş ortaklarıyla ilişkilerde kabul gören bir referanstır.",
  "Marka itibarı ve rekabet üstünlüğü: Kalite odaklı yönetim altyapısı, rakipler arasından sıyrılmak için ayırt edici bir özellik haline gelir.",
  "Müşteri memnuniyetinin sürdürülebilir şekilde yükselmesi: Standardın müşteri odaklılık ilkesi, hem mevcut müşterilerin korunmasını hem yeni müşteri kazanımını destekler.",
  "Tedarikçi ve iş ortaklarıyla ilişkilerin güçlenmesi: Yapılandırılmış bir kalite altyapısına sahip kuruluşlar, tedarik zincirinin diğer halkaları tarafından da güvenilir partner olarak değerlendirilir.",
];

const ilgiliStandartlar = ["iso-14001", "iso-45001", "iso-50001"]
  .map((s) => hizmetGetir(s))
  .filter((h): h is NonNullable<typeof h> => Boolean(h));

export default function Iso9001Sayfasi() {
  const hizmet = hizmetGetir("iso-9001")!;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(serviceLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(breadcrumbLd)} />

      {/* Hero / header (mevcut yapı korunuyor) */}
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

      {/* BÖLÜM 1 — ISO 9001 Belgesi Nedir? */}
      <section style={{ background: "white", padding: "62px 32px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <BolumBaslik eyebrow="GENEL BAKIŞ">ISO 9001 Belgesi Nedir?</BolumBaslik>

          <p style={P}>
            ISO 9001, kuruluşların kalite yönetim sistemi kurmasını ve sürdürmesini sağlayan uluslararası bir
            standarttır. Uluslararası Standartlar Örgütü (ISO) tarafından yayımlanan bu standart, dünyada en yaygın
            kullanılan yönetim sistemi standardıdır.
          </p>
          <p style={P}>
            ISO 9001 belgesi, bir kuruluşun ürünlerini ve hizmetlerini tutarlı bir kalitede üretebildiğini, müşteri
            beklentilerini karşılayabildiğini ve süreçlerini sürekli iyileştirebildiğini gösteren resmi bir
            dokümandır. Bu belge, akredite belgelendirme kuruluşları tarafından yapılan denetimler sonucunda
            düzenlenir.
          </p>
          <p style={P}>
            ISO 9001:2015 versiyonu, standardın günümüzde geçerli olan son sürümüdür. Önceki sürümlerden farklı olarak
            risk bazlı düşünme, kuruluşun bağlamını değerlendirme ve liderliğin sürece dahil olması gibi modern
            yaklaşımları ön plana çıkarır. 2015 revizyonu ile birlikte standardın daha esnek ve sektör bağımsız bir
            yapı kazanması hedeflenmiştir.
          </p>
          <p style={P}>
            ISO 9000 ailesi olarak bilinen standartlar grubunun temel üyesi olan ISO 9001, sektör fark etmeksizin her
            ölçekte kuruluşa uygulanabilir. Üretim, hizmet, sağlık, eğitim, inşaat, bilgi teknolojileri, tekstil, gıda,
            lojistik ve daha pek çok sektörden binlerce kuruluş ISO 9001 belgesine sahiptir. KOBİ ölçeğindeki bir aile
            işletmesinden çok uluslu bir holding şirketine kadar, faaliyet alanı veya çalışan sayısı fark etmeksizin
            standart şartlarını karşılayan her organizasyon ISO 9001 belgesi alabilir.
          </p>
          <p style={{ ...P, margin: 0 }}>
            Türkiye&apos;de ISO 9001 belgesinin uluslararası geçerliliğe sahip olabilmesi için TÜRKAK (Türk Akreditasyon
            Kurumu) tarafından{" "}
            <Link href="/akreditasyonlarimiz" style={ilkLink}>
              akredite
            </Link>{" "}
            edilmiş bir belgelendirme kuruluşundan alınması esastır.
          </p>
        </div>
      </section>

      {/* BÖLÜM 2 — Temel İlkeler */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "62px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <BolumBaslik eyebrow="TEMEL İLKELER">ISO 9001 Kalite Yönetim Sisteminin Temel İlkeleri</BolumBaslik>
          <p style={{ ...P, maxWidth: 880 }}>
            ISO 9001:2015 standardı, kuruluşların kalite yönetim sistemini etkin bir şekilde kurması için yedi temel
            ilke üzerine inşa edilmiştir. Bu ilkeler, standardın felsefi temelini oluşturur ve uygulama yapan her
            kuruluşun bu ilkeleri anlaması ile başarıya ulaşması mümkündür.
          </p>

          <div className="iso-ilke-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 28 }}>
            {ilkeler.map((ilke, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 14,
                  padding: "24px 24px",
                  border: "0.5px solid var(--dvn-gri-300)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "var(--dvn-gradient-altin)",
                      color: "var(--dvn-lacivert)",
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                    {ilke.baslik}
                  </h3>
                </div>
                <p style={{ fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.7, margin: 0 }}>{ilke.metin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÖLÜM 3 — Faydalar */}
      <section style={{ background: "white", padding: "62px 32px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <BolumBaslik eyebrow="FAYDALAR">ISO 9001:2015 Belgesinin Faydaları</BolumBaslik>
          <p style={P}>
            ISO 9001 belgesi, kuruluşlara hem iç işleyiş hem de dış pazar ilişkileri açısından çok yönlü katkılar
            sağlar. Standardın gerekliliklerini karşılayan ve sertifikasyon sürecini tamamlayan bir kuruluş, hem
            operasyonel hem de stratejik düzeyde belirgin değişimler yaşar. Aşağıda bu faydaları iki ana başlıkta
            inceliyoruz.
          </p>

          <AltBaslik>Kuruluş İçi Faydalar</AltBaslik>
          <p style={P}>
            ISO 9001 uygulayan kuruluşların çoğu, kalite yönetim sisteminin kurumsal yapıya kattığı disiplinle birlikte
            aşağıdaki kazanımları rapor etmektedir.
          </p>
          <EtiketliListe maddeler={icFaydalar} />

          <AltBaslik>Pazar ve Müşteri Tarafında Faydalar</AltBaslik>
          <p style={P}>
            ISO 9001 belgesi sahibi bir kuruluş, dış paydaşları ve pazar konumu açısından da önemli bir farklılaşma
            elde eder.
          </p>
          <EtiketliListe maddeler={pazarFaydalar} />

          <p style={{ ...P, margin: "10px 0 0" }}>
            ISO 9001 belgesinin sağladığı faydaların düzeyi, kuruluşun standardı ne ölçüde benimsediği ve sistemi günlük
            operasyonlarına ne kadar entegre ettiği ile doğrudan ilişkilidir. Belgenin alınması başlangıç noktasıdır;
            asıl değer, sistemin yaşatılması ve sürekli iyileştirilmesi ile ortaya çıkar.
          </p>
        </div>
      </section>

      {/* BÖLÜM 4 — Belgelendirme Süreci */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "62px 32px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <BolumBaslik eyebrow="BELGELENDİRME SÜRECİ">
            ISO 9001 Belgesi Nasıl Alınır? — Belgelendirme Süreci
          </BolumBaslik>
          <p style={P}>
            ISO 9001 belgesi almak isteyen kuruluşların, akredite bir belgelendirme kuruluşu tarafından yürütülen
            yapılandırılmış bir süreçten geçmesi gerekir. Bu süreç, ISO/IEC 17021-1 standardının gereklerine göre
            planlanır ve uygulanır. Belgelendirme süreci, kuruluşun kalite yönetim sistemini hazırlayıp uygulamaya
            almasının ardından başlar.
          </p>
          <p style={{ ...P, margin: "0 0 28px" }}>ISO 9001 belgelendirme süreci aşağıdaki ana adımlardan oluşur.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SurecKart numara={1} baslik="Başvuru ve Sözleşme">
              <p style={P}>
                Belgelendirme süreci, kuruluşun belgelendirme kuruluşuna resmi başvurusu ile başlar. Başvuru aşamasında
                kuruluşun faaliyet alanı, çalışan sayısı, operasyonel yapısı ve belgelendirme kapsamı netleştirilir. Bu
                bilgiler doğrultusunda denetim süresi ve teklif hazırlanır. Karşılıklı mutabakat sağlandığında
                belgelendirme sözleşmesi imzalanır.
              </p>
              <p style={{ ...P, margin: 0 }}>
                DVN Cert&apos;te bu süreç,{" "}
                <Link href="https://dbys.dvncert.com/basvuru" target="_blank" rel="noopener noreferrer" style={ilkLink}>
                  online başvuru sistemi
                </Link>{" "}
                (DBYS) üzerinden dijital olarak yürütülür ve başvuru sahibi her aşamada kendi panelinden süreci takip
                edebilir.
              </p>
            </SurecKart>

            <SurecKart numara={2} baslik="Aşama 1 Tetkiki (Yerinde Ön Tetkik)">
              <p style={P}>
                Aşama 1 tetkiki, kuruluşun yerinde gerçekleştirilen bir denetimdir. Bu aşamada baş tetkikçi ve
                gerektiğinde tetkik ekibi, kuruluşun kalite yönetim sistemi dokümantasyonunu, organizasyonel yapısını ve
                süreçlerinin genel işleyişini değerlendirir.
              </p>
              <p style={{ ...P, margin: "0 0 12px" }}>Aşama 1 tetkikinin temel amaçları şunlardır:</p>
              <DuzListe
                maddeler={[
                  "Kuruluşun ISO 9001:2015 standardının şartlarına yönelik hazırlık durumunu değerlendirmek",
                  "Kalite politikası, hedefler, prosedürler ve kayıtların standardın şartlarını karşılayıp karşılamadığını incelemek",
                  "Faaliyet alanına özgü riskleri ve kritik süreçleri belirlemek",
                  "Aşama 2 tetkikinin kapsamını, süresini ve planlamasını netleştirmek",
                ]}
              />
              <p style={{ ...P, margin: 0 }}>
                Aşama 1 sonunda kuruluşa bir rapor sunulur. Bu raporda, Aşama 2 öncesinde giderilmesi gereken bulgular
                varsa belirtilir.
              </p>
            </SurecKart>

            <SurecKart numara={3} baslik="Aşama 2 Tetkiki (Belgelendirme Tetkiki)">
              <p style={P}>
                Aşama 2 tetkiki, kalite yönetim sisteminin uygulanmasının yerinde ve kapsamlı olarak değerlendirildiği
                ana belgelendirme denetimidir. Tetkik ekibi, kuruluşun süreçlerini, kayıtlarını, çalışanlarını ve
                operasyonel performansını standartta belirtilen tüm maddeler kapsamında inceler.
              </p>
              <p style={{ ...P, margin: "0 0 12px" }}>Aşama 2 tetkiki süresince:</p>
              <DuzListe
                maddeler={[
                  "Süreç sahipleri ile birebir görüşmeler yapılır",
                  "Saha incelemeleri ve operasyonel gözlemler gerçekleştirilir",
                  "Kayıt ve dokümanların standartla uyumu kontrol edilir",
                  "Yönetim sisteminin etkinliği değerlendirilir",
                  "Tespit edilen uygunsuzluklar (varsa) raporlanır",
                ]}
              />
              <p style={{ ...P, margin: 0 }}>
                Tetkik sonunda kuruluşa bir kapanış toplantısı yapılır ve tetkik raporu sunulur. Uygunsuzluk tespit
                edilen durumlarda, kuruluş düzeltici faaliyetleri planlar ve uygular.
              </p>
            </SurecKart>

            <SurecKart numara={4} baslik="Belgelendirme Kararı ve Sertifika Düzenleme">
              <p style={P}>
                Aşama 2 tetkiki ve varsa düzeltici faaliyetlerin değerlendirilmesinin ardından belgelendirme kararı
                süreci başlar. Bu kararı, tetkik ekibinden bağımsız bir Belgelendirme Komitesi veya yetkili karar
                mercii verir. Standardın tüm şartlarının karşılandığı sonucuna varılırsa, ISO 9001:2015 sertifikası
                düzenlenir ve kuruluşa teslim edilir.
              </p>
              <p style={{ ...P, margin: 0 }}>
                Belgelendirme kararının tetkik ekibinden bağımsız bir merci tarafından verilmesi, ISO/IEC 17021-1
                standardının tarafsızlık şartının bir gereğidir.
              </p>
            </SurecKart>

            <SurecKart numara={5} baslik="Gözetim Tetkikleri (Yıllık)">
              <p style={P}>
                ISO 9001 sertifikası, düzenlendikten sonra 3 yıl geçerlidir. Ancak bu süre boyunca kalite yönetim
                sisteminin standardın gerekliliklerini karşılamaya devam ettiğinin doğrulanması gerekir. Bu amaçla,
                sertifika süresince yılda bir kez gözetim tetkikleri yapılır.
              </p>
              <p style={{ ...P, margin: 0 }}>
                Gözetim tetkikleri, belgelendirme tetkikinden daha dar kapsamlıdır ancak yine yerinde gerçekleştirilir.
                Süreçlerdeki değişiklikler, müşteri şikayetleri, iç tetkikler ve düzeltici faaliyetlerin etkinliği gibi
                konular incelenir. Gözetim tetkikinde ciddi uygunsuzluk tespit edilirse, sertifika askıya alınabilir
                veya iptal edilebilir.
              </p>
            </SurecKart>

            <SurecKart numara={6} baslik="Yeniden Belgelendirme (3 Yılda Bir)">
              <p style={{ ...P, margin: 0 }}>
                Sertifikanın 3 yıllık geçerlilik süresi dolmadan önce, kuruluşun sertifikasını yenilemek istemesi
                durumunda yeniden belgelendirme tetkiki yapılır. Bu tetkik, Aşama 2 tetkikine benzer kapsamda ve
                derinlikte yürütülür. Standardın gerekliliklerinin karşılandığının doğrulanması halinde yeni bir
                sertifika düzenlenir ve sertifika süresi 3 yıl daha uzatılır.
              </p>
            </SurecKart>
          </div>
        </div>
      </section>

      {/* BÖLÜM 5 — Geçerlilik Süresi ve Yenileme */}
      <section style={{ background: "white", padding: "62px 32px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <BolumBaslik eyebrow="GEÇERLİLİK VE YENİLEME">
            ISO 9001 Belgesinin Geçerlilik Süresi ve Yenileme
          </BolumBaslik>
          <p style={P}>
            ISO 9001 belgesi süresiz bir sertifika değildir. Belgenin geçerliliği belirli bir süre ile sınırlıdır ve bu
            süre boyunca kuruluşun kalite yönetim sistemini standardın gerekliliklerine uygun şekilde sürdürmesi
            beklenir. Aşağıda belge süresi ve yenileme süreçleri hakkında bilgi bulabilirsiniz.
          </p>

          <AltBaslik>ISO 9001 Belgesi Kaç Yıl Geçerlidir?</AltBaslik>
          <p style={P}>
            ISO 9001:2015 sertifikasının geçerlilik süresi 3 yıldır. Bu süre, belgenin düzenlendiği tarihten itibaren
            başlar ve sertifika üzerinde açıkça belirtilir. Ancak 3 yıllık geçerlilik, kuruluşun belgelendirme
            süreçlerinden tamamen bağımsız olduğu anlamına gelmez. Belge süresi boyunca sistemin etkinliğini doğrulayan
            periyodik denetimler gerçekleştirilir.
          </p>

          <AltBaslik>Yıllık Gözetim Tetkikleri</AltBaslik>
          <p style={P}>
            Sertifikanın 3 yıllık geçerlilik süresi boyunca her yıl bir kez gözetim tetkiki yapılır. Bu tetkikler
            genellikle sertifikanın düzenlenme tarihinden itibaren 12&apos;şer aylık dönemlerde planlanır.
          </p>
          <p style={{ ...P, margin: "0 0 12px" }}>Gözetim tetkikinde aşağıdaki konular değerlendirilir:</p>
          <DuzListe
            maddeler={[
              "Kalite yönetim sisteminin standart şartlarına uygunluğunun sürdürülmesi",
              "Bir önceki tetkikte tespit edilen uygunsuzlukların düzeltici faaliyetlerinin etkinliği",
              "Süreçlerdeki değişiklikler ve organizasyonel güncellemeler",
              "Müşteri şikayetleri ve memnuniyet ölçümleri",
              "İç tetkikler ve yönetim gözden geçirme kayıtları",
            ]}
          />
          <p style={P}>
            Gözetim tetkikinde ciddi uygunsuzluk tespit edilmesi durumunda sertifika askıya alınabilir veya iptal
            edilebilir. Bu nedenle kuruluşun belge süresi boyunca sistemini canlı ve işler tutması önemlidir.
          </p>

          <AltBaslik>Yeniden Belgelendirme (Sertifika Yenileme)</AltBaslik>
          <p style={P}>
            3 yıllık geçerlilik süresinin dolmasına yakın, kuruluş sertifikasını yenilemek istediğinde yeniden
            belgelendirme tetkiki yapılır. Bu süreç, sertifika süresinin bitmemesi için zamanında planlanmalıdır.
          </p>
          <p style={P}>
            Yeniden belgelendirme tetkiki, ilk belgelendirme tetkikine benzer kapsamda ve derinlikte yürütülür. Sistemin
            son 3 yıl içindeki performansı, sürekli iyileştirme kayıtları, müşteri memnuniyeti verileri ve standardın
            güncel şartlarına uyum bütünsel olarak değerlendirilir.
          </p>
          <p style={P}>
            Yeniden belgelendirme tetkikinin başarıyla tamamlanması halinde yeni bir sertifika düzenlenir ve geçerlilik
            süresi 3 yıl daha uzatılır.
          </p>

          <AltBaslik>Belgenin Askıya Alınması ve İptali</AltBaslik>
          <p style={{ ...P, margin: "0 0 12px" }}>
            ISO 9001 sertifikası, aşağıdaki durumlarda askıya alınabilir veya iptal edilebilir:
          </p>
          <DuzListe
            maddeler={[
              "Gözetim tetkiklerinin zamanında yapılmaması",
              "Tespit edilen uygunsuzlukların belirlenen süre içinde giderilmemesi",
              "Kalite yönetim sisteminin sürdürülmemesi",
              "Sertifikanın amacı dışında veya yanıltıcı şekilde kullanılması",
              "Kuruluşun belgelendirme sözleşmesi şartlarına uymaması",
            ]}
          />
          <p style={P}>
            Askıya alınan sertifika, belirlenen süre içinde gereken faaliyetlerin tamamlanması durumunda yeniden geçerli
            hale getirilebilir. Aksi takdirde sertifika iptal edilir ve kuruluşun bu kararı kabul etmesi beklenir.
          </p>

          <AltBaslik>Sertifika Doğrulama</AltBaslik>
          <p style={P}>
            ISO 9001 sertifikası alan bir kuruluşun belgesinin geçerliliği, sertifika numarası üzerinden online olarak
            doğrulanabilir. Müşteriler, iş ortakları ve tedarikçiler, kuruluşların sertifika geçerliliğini ilgili
            belgelendirme kuruluşunun web sitesinden veya TÜRKAK Akreditasyon Belge Doğrulama Sistemi üzerinden teyit
            edebilir.
          </p>
          <p style={{ ...P, margin: 0 }}>
            DVN Cert tarafından düzenlenen sertifikalar,{" "}
            <Link href="/sertifika-sorgula" style={ilkLink}>
              online sertifika sorgulama hizmetimiz
            </Link>{" "}
            üzerinden anlık olarak doğrulanabilir.
          </p>
        </div>
      </section>

      {/* BÖLÜM 6 — SSS (placeholder) */}
      {/* NOT: Bu placeholder yarın gerçek FAQ içeriği ile değiştirilecek. */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "62px 32px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <BolumBaslik eyebrow="SIKÇA SORULAN SORULAR">Sıkça Sorulan Sorular (SSS)</BolumBaslik>
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: "28px 28px",
              border: "0.5px solid var(--dvn-gri-300)",
            }}
          >
            <p style={{ fontSize: 15, color: "var(--dvn-gri-700)", lineHeight: 1.8, margin: "0 0 16px" }}>
              ISO 9001 belgelendirmesi hakkında sıkça sorulan sorular yakında bu bölüme eklenecektir. Hemen sorularınızı
              yanıtlamak için bizimle iletişime geçebilirsiniz.
            </p>
            <Link href="/iletisim" style={{ ...ilkLink, textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>
              Bize Ulaşın →
            </Link>
          </div>
        </div>
      </section>

      {/* İlgili Standartlar */}
      <section style={{ background: "white", padding: "62px 32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 20, fontWeight: 600, margin: "0 0 22px", lineHeight: 1.3 }}>
            İlgili Yönetim Sistemi Standartları
          </h3>
          <ul
            className="iso-std-grid"
            style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {ilgiliStandartlar.map((std) => (
              <li key={std.slug}>
                <Link
                  href={`/hizmetler/${std.slug}`}
                  className="iso-std-kart"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "var(--dvn-gri-50)",
                    borderRadius: 14,
                    padding: "20px 22px",
                    border: "0.5px solid var(--dvn-gri-300)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: "var(--dvn-altin-soluk)",
                      color: "var(--dvn-altin)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HizmetIkon ad={std.ikon} size={24} />
                  </span>
                  <span style={{ color: "var(--dvn-lacivert)", fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>
                    {std.baslik}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA (mevcut yapı korunuyor) */}
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
        .iso-std-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(46,26,107,0.1) !important; }
        @media (max-width: 860px) {
          .iso-ilke-grid { grid-template-columns: 1fr !important; }
          .iso-std-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
