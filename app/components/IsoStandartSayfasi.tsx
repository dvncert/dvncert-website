import Link from "next/link";
import SayfaBaslik from "./SayfaBaslik";
import KapakGorsel from "./KapakGorsel";
import Akordeon from "./Akordeon";
import { hizmetGetir } from "@/lib/hizmetler";
import { schemaScript, faqSchema } from "@/lib/seo-schemas";
import { isoTumStandartlar } from "@/lib/iso-icerik";
import { isoIcerikGetirDB } from "@/lib/sayfa-icerigi";

/**
 * ISO yönetim sistemi standartları için ortak sayfa düzeni.
 * İçerik lib/iso-icerik.ts'ten gelir; "Nasıl Alınır?" ve "Geçerlilik"
 * bölümleri standarttan bağımsız aynı yapıda üretilir.
 */

const P = { fontSize: 15.5, color: "var(--dvn-gri-700)", lineHeight: 1.85, margin: "0 0 18px" } as const;
const ilkLink = {
  color: "var(--dvn-turuncu)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  fontWeight: 500,
} as const;

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
        margin: "28px 0 14px",
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
    <div style={{ background: "white", borderRadius: 14, padding: "24px 24px", border: "0.5px solid var(--dvn-gri-300)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <span
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "var(--dvn-gradient-turuncu)",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            boxShadow: "0 6px 16px rgba(245,130,32,0.3)",
          }}
        >
          {numara}
        </span>
        <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 17, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
          <span style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Adım {numara} — </span>
          {baslik}
        </h3>
      </div>
      {children}
    </div>
  );
}

export default async function IsoStandartSayfasi({ slug }: { slug: string }) {
  const veri = await isoIcerikGetirDB(slug);
  const hizmet = hizmetGetir(slug);
  if (!veri || !hizmet) return null;

  const { stdAd, stdKod, sistem, politika } = veri;

  // Standarda göre üretilen, içerikle tutarlı SSS (hem görünür akordeon hem FAQPage şeması)
  const sss = [
    {
      soru: `${stdAd} belgesi nasıl alınır?`,
      cevap: `${stdAd} belgesi, TÜRKAK akreditasyonlu bir belgelendirme kuruluşuna başvuru ile başlar; Aşama 1 (ön tetkik) ve Aşama 2 (belgelendirme tetkiki) denetimlerinin ardından bağımsız bir belgelendirme kararıyla tamamlanır. Olumlu sonuçta ${stdKod} sertifikası düzenlenir.`,
    },
    {
      soru: `${stdAd} belgesi kaç yıl geçerlidir?`,
      cevap: `${stdKod} sertifikasının geçerlilik süresi 3 yıldır. Bu süre boyunca her yıl gözetim tetkiki yapılır; üçüncü yılın sonunda yeniden belgelendirme tetkikiyle belge yenilenir.`,
    },
    {
      soru: `${stdAd} belgelendirme süreci ne kadar sürer?`,
      cevap: `Süre; kuruluşun büyüklüğüne, faaliyet alanına ve ${sistem.nin} olgunluğuna göre değişir. Hazırlık düzeyine bağlı olarak süreç genellikle birkaç hafta ile birkaç ay arasında tamamlanır.`,
    },
    {
      soru: `${stdAd} belgesini hangi kuruluşlar alabilir?`,
      cevap: `${stdAd}, sektör ve ölçek fark etmeksizin ${sistem.i} kurmak isteyen her kuruluşa uygulanabilir. Standardın şartlarını karşılayan KOBİ'ler de büyük kuruluşlar da belge alabilir.`,
    },
    {
      soru: `${stdAd} belgesinin TÜRKAK akreditasyonlu olması neden önemlidir?`,
      cevap: `Belgenin ulusal ve uluslararası geçerlilik taşıması için TÜRKAK tarafından akredite edilmiş bir kuruluştan alınması esastır. Akredite belge; ihale, tedarik zinciri ve ihracat süreçlerinde tanınırlık sağlar.`,
    },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${stdKod} ${veri.sistemAdiBuyuk} Belgelendirmesi`,
    description: `${stdKod} ${sistem.i} belgelendirmesi için başvuru, denetim ve belge durumu süreçleri.`,
    provider: { "@type": "Organization", name: "DVN Cert Belgelendirme", url: "https://dvncert.com" },
    serviceType: "Sistem Belgelendirme",
    areaServed: { "@type": "Country", name: "Türkiye" },
    url: `https://dvncert.com/hizmetler/${slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://dvncert.com" },
      { "@type": "ListItem", position: 2, name: "Hizmetler", item: "https://dvncert.com/hizmetler" },
      { "@type": "ListItem", position: 3, name: hizmet.baslik, item: `https://dvncert.com/hizmetler/${slug}` },
    ],
  };

  const hizliBaglantilar = [
    { etiket: "Nedir?", hash: "nedir" },
    { etiket: veri.bolum2Etiket, hash: "ilkeler" },
    { etiket: "Faydalar", hash: "faydalar" },
    { etiket: "Nasıl Alınır?", hash: "nasil-alinir" },
    { etiket: "Geçerlilik", hash: "gecerlilik" },
    { etiket: "S.S.S.", hash: "sss" },
  ];

  const ilgili = isoTumStandartlar.filter((s) => s.slug !== slug);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(serviceLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(breadcrumbLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(faqSchema(sss))} />

      {/* Header + breadcrumb + hero */}
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

      {/* İçerik girişi + hızlı bağlantılar */}
      <section style={{ background: "white", padding: "48px 32px 10px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ ...P, margin: 0 }}>
            {`${hizmet.baslik} belgelendirmesi hakkında bilmek istediklerinizi aşağıdaki bölümlerden öğrenebilirsiniz. Standardın tanımından belgelendirme sürecine, geçerlilik koşullarından sertifika doğrulamaya kadar tüm konuları detaylı şekilde ele aldık.`}
          </p>

          <nav aria-label="Hızlı bağlantılar" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
            {hizliBaglantilar.map((b) => (
              <a
                key={b.hash}
                href={`#${b.hash}`}
                className="iso-hizli-link"
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "var(--dvn-lacivert)",
                  background: "var(--dvn-turuncu-soluk)",
                  border: "0.5px solid var(--dvn-gri-300)",
                  borderRadius: 999,
                  padding: "8px 16px",
                  transition: "all 0.2s ease",
                }}
              >
                {b.etiket}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Akordeon bölümleri */}
      <section style={{ background: "white", padding: "22px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* 1 — Nedir? (açık başlar) */}
          <Akordeon baslik={`${stdAd} Belgesi Nedir?`} id="nedir" defaultOpen>
            {veri.nedirParagraflar.map((p, i) => (
              <p key={i} style={P}>
                {p}
              </p>
            ))}
            <p style={{ ...P, margin: 0 }}>
              {`Türkiye'de ${stdAd} belgesinin uluslararası geçerliliğe sahip olabilmesi için TÜRKAK (Türk Akreditasyon Kurumu) tarafından `}
              <Link href="/akreditasyonlarimiz" style={ilkLink}>
                akredite
              </Link>
              {` edilmiş bir belgelendirme kuruluşundan alınması esastır.`}
            </p>
          </Akordeon>

          {/* 2 — Temel İlkeler / Unsurlar */}
          <Akordeon baslik={veri.bolum2Baslik} id="ilkeler">
            <p style={P}>{veri.bolum2Giris}</p>
            <div className="iso-ilke-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 8 }}>
              {veri.bolum2Kartlar.map((k, i) => (
                <div key={i} style={{ background: "white", borderRadius: 14, padding: "22px 22px", border: "0.5px solid var(--dvn-gri-300)" }}>
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
                    <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{k.baslik}</h3>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.7, margin: 0 }}>{k.metin}</p>
                </div>
              ))}
            </div>
          </Akordeon>

          {/* 3 — Faydalar */}
          <Akordeon baslik={`${stdKod} Belgesinin Faydaları`} id="faydalar">
            <p style={P}>{veri.faydalarGiris}</p>
            <AltBaslik>Kuruluş İçi Faydalar</AltBaslik>
            <EtiketliListe maddeler={veri.icFaydalar} />
            <AltBaslik>Pazar ve Müşteri Tarafında Faydalar</AltBaslik>
            <EtiketliListe maddeler={veri.pazarFaydalar} />
            <p style={{ ...P, margin: "10px 0 0" }}>{veri.faydalarKapanis}</p>
          </Akordeon>

          {/* 4 — Nasıl Alınır? (ortak süreç) */}
          <Akordeon baslik={`${stdAd} Belgesi Nasıl Alınır? — Belgelendirme Süreci`} id="nasil-alinir">
            <p style={P}>
              {`${stdAd} belgesi almak isteyen kuruluşların, akredite bir belgelendirme kuruluşu tarafından yürütülen yapılandırılmış bir süreçten geçmesi gerekir. Bu süreç, ISO/IEC 17021-1 standardının gereklerine göre planlanır ve uygulanır. Belgelendirme süreci, kuruluşun ${sistem.ni} hazırlayıp uygulamaya almasının ardından başlar.`}
            </p>
            <p style={{ ...P, margin: "0 0 22px" }}>{`${stdAd} belgelendirme süreci aşağıdaki ana adımlardan oluşur.`}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <SurecKart numara={1} baslik="Başvuru ve Sözleşme">
                <p style={P}>
                  Belgelendirme süreci, kuruluşun belgelendirme kuruluşuna resmi başvurusu ile başlar. Başvuru aşamasında
                  kuruluşun faaliyet alanı, çalışan sayısı, operasyonel yapısı ve belgelendirme kapsamı netleştirilir. Bu
                  bilgiler doğrultusunda denetim süresi ve teklif hazırlanır. Karşılıklı mutabakat sağlandığında
                  belgelendirme sözleşmesi imzalanır.
                </p>
                <p style={{ ...P, margin: 0 }}>
                  {`DVN Cert'te bu süreç, `}
                  <Link href="https://dbys.dvncert.com/basvuru" target="_blank" rel="noopener noreferrer" style={ilkLink}>
                    online başvuru sistemi
                  </Link>
                  {` (DBYS) üzerinden dijital olarak yürütülür ve başvuru sahibi her aşamada kendi panelinden süreci takip edebilir.`}
                </p>
              </SurecKart>

              <SurecKart numara={2} baslik="Aşama 1 Tetkiki (Yerinde Ön Tetkik)">
                <p style={P}>
                  {`Aşama 1 tetkiki, kuruluşun yerinde gerçekleştirilen bir denetimdir. Bu aşamada baş tetkikçi ve gerektiğinde tetkik ekibi, kuruluşun ${sistem.i} dokümantasyonunu, organizasyonel yapısını ve süreçlerinin genel işleyişini değerlendirir.`}
                </p>
                <p style={{ ...P, margin: "0 0 12px" }}>Aşama 1 tetkikinin temel amaçları şunlardır:</p>
                <DuzListe
                  maddeler={[
                    `Kuruluşun ${stdKod} standardının şartlarına yönelik hazırlık durumunu değerlendirmek`,
                    `${politika}, hedefler, prosedürler ve kayıtların standardın şartlarını karşılayıp karşılamadığını incelemek`,
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
                  {`Aşama 2 tetkiki, ${sistem.nin} uygulanmasının yerinde ve kapsamlı olarak değerlendirildiği ana belgelendirme denetimidir. Tetkik ekibi, kuruluşun süreçlerini, kayıtlarını, çalışanlarını ve operasyonel performansını standartta belirtilen tüm maddeler kapsamında inceler.`}
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
                  {`Aşama 2 tetkiki ve varsa düzeltici faaliyetlerin değerlendirilmesinin ardından belgelendirme kararı süreci başlar. Bu kararı, tetkik ekibinden bağımsız bir Belgelendirme Komitesi veya yetkili karar mercii verir. Standardın tüm şartlarının karşılandığı sonucuna varılırsa, ${stdKod} sertifikası düzenlenir ve kuruluşa teslim edilir.`}
                </p>
                <p style={{ ...P, margin: 0 }}>
                  Belgelendirme kararının tetkik ekibinden bağımsız bir merci tarafından verilmesi, ISO/IEC 17021-1
                  standardının tarafsızlık şartının bir gereğidir.
                </p>
              </SurecKart>

              <SurecKart numara={5} baslik="Gözetim Tetkikleri (Yıllık)">
                <p style={P}>
                  {`${stdAd} sertifikası, düzenlendikten sonra 3 yıl geçerlidir. Ancak bu süre boyunca ${sistem.nin} standardın gerekliliklerini karşılamaya devam ettiğinin doğrulanması gerekir. Bu amaçla, sertifika süresince yılda bir kez gözetim tetkikleri yapılır.`}
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
          </Akordeon>

          {/* 5 — Geçerlilik (ortak) */}
          <Akordeon baslik={`${stdAd} Belgesinin Geçerlilik Süresi ve Yenileme`} id="gecerlilik">
            <p style={P}>
              {`${stdAd} belgesi süresiz bir sertifika değildir. Belgenin geçerliliği belirli bir süre ile sınırlıdır ve bu süre boyunca kuruluşun ${sistem.ni} standardın gerekliliklerine uygun şekilde sürdürmesi beklenir.`}
            </p>

            <AltBaslik>{`${stdAd} Belgesi Kaç Yıl Geçerlidir?`}</AltBaslik>
            <p style={P}>
              {`${stdKod} sertifikasının geçerlilik süresi 3 yıldır. Bu süre, belgenin düzenlendiği tarihten itibaren başlar ve sertifika üzerinde açıkça belirtilir. Ancak 3 yıllık geçerlilik, kuruluşun belgelendirme süreçlerinden tamamen bağımsız olduğu anlamına gelmez. Belge süresi boyunca sistemin etkinliğini doğrulayan periyodik denetimler gerçekleştirilir.`}
            </p>

            <AltBaslik>Yıllık Gözetim Tetkikleri</AltBaslik>
            <p style={P}>
              {`Sertifikanın 3 yıllık geçerlilik süresi boyunca her yıl bir kez gözetim tetkiki yapılır. Bu tetkikler genellikle sertifikanın düzenlenme tarihinden itibaren 12'şer aylık dönemlerde planlanır.`}
            </p>
            <p style={{ ...P, margin: "0 0 12px" }}>Gözetim tetkikinde aşağıdaki konular değerlendirilir:</p>
            <DuzListe
              maddeler={[
                `${sistem.cumleBasi} standart şartlarına uygunluğunun sürdürülmesi`,
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
              Yeniden belgelendirme tetkiki, ilk belgelendirme tetkikine benzer kapsamda ve derinlikte yürütülür.
              Sistemin son 3 yıl içindeki performansı, sürekli iyileştirme kayıtları, müşteri memnuniyeti verileri ve
              standardın güncel şartlarına uyum bütünsel olarak değerlendirilir.
            </p>
            <p style={P}>
              Yeniden belgelendirme tetkikinin başarıyla tamamlanması halinde yeni bir sertifika düzenlenir ve geçerlilik
              süresi 3 yıl daha uzatılır.
            </p>

            <AltBaslik>Belgenin Askıya Alınması ve İptali</AltBaslik>
            <p style={{ ...P, margin: "0 0 12px" }}>
              {`${stdAd} sertifikası, aşağıdaki durumlarda askıya alınabilir veya iptal edilebilir:`}
            </p>
            <DuzListe
              maddeler={[
                "Gözetim tetkiklerinin zamanında yapılmaması",
                "Tespit edilen uygunsuzlukların belirlenen süre içinde giderilmemesi",
                `${sistem.cumleBasi} sürdürülmemesi`,
                "Sertifikanın amacı dışında veya yanıltıcı şekilde kullanılması",
                "Kuruluşun belgelendirme sözleşmesi şartlarına uymaması",
              ]}
            />
            <p style={P}>
              Askıya alınan sertifika, belirlenen süre içinde gereken faaliyetlerin tamamlanması durumunda yeniden
              geçerli hale getirilebilir. Aksi takdirde sertifika iptal edilir ve kuruluşun bu kararı kabul etmesi
              beklenir.
            </p>

            <AltBaslik>Sertifika Doğrulama</AltBaslik>
            <p style={P}>
              {`${stdAd} sertifikası alan bir kuruluşun belgesinin geçerliliği, sertifika numarası üzerinden online olarak doğrulanabilir. Müşteriler, iş ortakları ve tedarikçiler, kuruluşların sertifika geçerliliğini ilgili belgelendirme kuruluşunun web sitesinden veya TÜRKAK Akreditasyon Belge Doğrulama Sistemi üzerinden teyit edebilir.`}
            </p>
            <p style={{ ...P, margin: 0 }}>
              {`DVN Cert tarafından düzenlenen sertifikalar, `}
              <Link href="/sertifika-sorgula" style={ilkLink}>
                online sertifika sorgulama hizmetimiz
              </Link>
              {` üzerinden anlık olarak doğrulanabilir.`}
            </p>
          </Akordeon>

          {/* 6 — Sıkça Sorulan Sorular (FAQPage şeması ile) */}
          <Akordeon baslik="Sıkça Sorulan Sorular" id="sss">
            {sss.map((s, i) => (
              <div key={i} style={{ marginBottom: i < sss.length - 1 ? 18 : 0 }}>
                <AltBaslik>{s.soru}</AltBaslik>
                <p style={{ ...P, margin: 0 }}>{s.cevap}</p>
              </div>
            ))}
          </Akordeon>
        </div>
      </section>

      {/* İlgili Standartlar */}
      <section style={{ background: "var(--dvn-gradient-lacivert)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 24, fontWeight: 500, margin: "0 0 10px", lineHeight: 1.3 }}>
            İlgili Yönetim Sistemi Standartları
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: 14.5, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 720 }}>
            {`${stdAd} ile birlikte kuruluşunuza entegre edebileceğiniz diğer yönetim sistemi standartları:`}
          </p>

          <div className="iso-ilgili-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {ilgili.map((std) => (
              <Link
                key={std.slug}
                href={`/hizmetler/${std.slug}`}
                className="iso-ilgili-kart"
                style={{
                  display: "block",
                  background: "rgba(255,255,255,0.06)",
                  border: "0.5px solid rgba(255,255,255,0.14)",
                  borderRadius: 14,
                  padding: "24px 24px",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                }}
              >
                <h3 style={{ color: "var(--dvn-altin-acik)", fontSize: 19, fontWeight: 600, margin: "0 0 6px" }}>{std.kod}</h3>
                <p style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.5, margin: 0 }}>{std.ad}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "white", padding: "70px 32px" }}>
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
              {`${hizmet.baslik} için teklif alın`}
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
        .iso-hizli-link:hover { background: var(--dvn-turuncu) !important; color: #fff !important; border-color: var(--dvn-turuncu) !important; }
        .iso-ilgili-kart:hover { transform: translateY(-5px); background: rgba(255,255,255,0.10) !important; box-shadow: 0 16px 36px rgba(0,0,0,0.25) !important; }
        @media (max-width: 820px) {
          .iso-ilke-grid { grid-template-columns: 1fr !important; }
          .iso-ilgili-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
