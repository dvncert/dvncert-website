import type { Metadata } from "next";
import Image from "next/image";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import DokumanGoruntule from "../components/DokumanGoruntule";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/logolarimiz",
    title: "Logolarımız",
    description:
      "DVN Cert belgelendirme markası ile TÜRKAK Akreditasyon Markası'nın birlikte kullanımı, logo kullanım kuralları, TBDS karekodu ve TL.11 Rev.04 Marka/Logo Kullanım Talimatı.",
  });
}

// TL.11 Rev.04 (06.08.2026) Marka/Logo Kullanım Talimatı esas alınmıştır.
// Dosya adı revizyonu içerir: içerik güncellenince URL de değişsin, eski sürüm cache'ten sunulmasın.
const TALIMAT_PDF = "/dokumanlar/marka-logo-kullanim-talimati-rev04.pdf";
const TALIMAT_REV = "TL.11 Rev.04 (06.08.2026)";

const yapilmasiGerekenler = [
  "Logoyu yalnızca belge kapsamı dahilindeki faaliyet alanlarında kullanın.",
  "Logoyu oranlarını koruyarak kullanın; oranlar sabit kalmak şartıyla boyut büyütülüp küçültülebilir. Orijinal renkler tercih edilir, ihtiyaç halinde farklı renkler kullanılabilir.",
  "Logonun kullanım şekli için Sistem Belgelendirme Müdürlüğü'nden onay alın.",
  "Yalnızca tarafımızca sağlanan güncel logo dosyalarını, kontrastı yeterli zeminlerde kullanın.",
  "Belgelendirme statüsüne atıfta bulunurken belgelendirme kuruluşunun şartlarına uyun.",
  "Neyin, hangi belgelendirme kuruluşu tarafından belgelendirildiği belirsizlik taşımayacak biçimde anlaşılmalıdır.",
  "Belge kapsamınız daraltıldığında tüm reklam ve tanıtım malzemelerini buna göre düzeltin.",
];

const yapilmamasiGerekenler = [
  "Logoyu ürün, ürün ambalajı üzerinde veya ürün uygunluğunu çağrıştıracak şekilde kullanmayın.",
  "Yönetim sistemi belgelendirmesine atfı, ürün (hizmet dahil) veya prosesin belgelendirildiğini ima edecek biçimde kullanmayın.",
  "DVN Cert'in sorumluluğu olduğu anlamı çıkacak şekilde kullanmayın.",
  "Belge kapsamı dışındaki bölüm, bağlı kuruluş veya iştiraklerde kullanmayın.",
  "Deney, kalibrasyon ve muayene raporlarında, laboratuvar testlerinde veya bu kapsamdaki sertifikalarda kullanmayın.",
  "Belge ve logoyu üçüncü tarafa devretmeyin.",
  "Yanıltıcı, belirsiz veya kuruluşun itibarına gölge düşürecek biçimde kullanmayın.",
  "Belge süresi dolduğunda, askıya alındığında veya geri çekildiğinde logo kullanımına ve belgelendirmeye atıf yapan reklamlara devam etmeyin.",
];

// DVN Cert logosunun kullanım koşulları matrisi (talimat tablosu).
const kullanimTablosu = {
  sutunlar: ["Ürün üzerinde (*a)", "Taşıma kutuları vb. üzerinde (*b)", "Reklam / broşür vb. üzerinde"],
  satirlar: [
    { etiket: "Açıklama olmaksızın", degerler: ["Kullanılamaz", "Kullanılamaz", "Kullanılabilir (*d)"] },
    { etiket: "Açıklama (*c) ile", degerler: ["Kullanılamaz", "Kullanılabilir (*d)", "Kullanılabilir (*d)"] },
  ],
  notlar: [
    "*a. Ürün; elle tutulur, somut bir ürün veya paket/kutu içindeki tek bir ürün olabilir.",
    "*b. Son kullanıcıya ulaşmadığı düşünülen mukavva vb. malzemeden yapılmış dış ambalaj olabilir.",
    "*c. \"Bu ürün, ISO 9001 standardına göre belgelendirilen bir kuruluşta üretilmiştir.\" gibi açık bir ifade olmalıdır.",
    "*d. Talimatta belirtilen diğer şartlara uymak koşuluyla kullanılabilir.",
  ],
};

const ornekAciklama =
  "Bu ürün; DVN Cert tarafından ISO 9001:2015'e göre belgelendirilmiş kalite yönetim sistemine sahip, ABC Ltd. Şti. tarafından üretilmiştir.";

/**
 * Kullanım matrisinin görsel karşılığı: ürün / taşıma kolisi / reklam malzemesi.
 * Sahneler inline SVG'dir; logo, sahnenin üzerine yüzde koordinatlarla yerleştirilir
 * (böylece kart genişliği değişse de doğru noktada kalır).
 */
const kullanimSahneleri = [
  {
    sahne: "urun" as const,
    baslik: "Ürün ve ürün ambalajı üzerinde",
    durum: "Kullanılamaz",
    olumlu: false,
    not: "Açıklama eklense dahi kullanılamaz; ürünün belgelendirildiği izlenimi doğurur.",
    logo: { sol: "38%", ust: "44%", en: "24%" },
  },
  {
    sahne: "koli" as const,
    baslik: "Taşıma kolisi (dış ambalaj) üzerinde",
    durum: "Açıklama ile kullanılabilir",
    olumlu: true,
    not: "Son kullanıcıya ulaşmayan dış ambalajda, açıklama ifadesiyle birlikte kullanılabilir.",
    logo: { sol: "34%", ust: "40%", en: "22%" },
  },
  {
    sahne: "brosur" as const,
    baslik: "Reklam, broşür ve tanıtım malzemelerinde",
    durum: "Kullanılabilir",
    olumlu: true,
    not: "Belgelendirme statüsüne atıf kurallarına uymak koşuluyla açıklamasız da kullanılabilir.",
    logo: { sol: "20%", ust: "22%", en: "26%" },
  },
];

const turkakMaddeleri = [
  "TÜRKAK Akreditasyon Markası, DVN Cert logosu olmaksızın tek başına kullanılamaz.",
  "Alınan belge akreditasyon kapsamındaysa; kırtasiye, reklam ve tanıtım malzemelerinde kullanılabilir.",
  "Marka kullanımı yalnızca belgenin üzerinde yer alan yetki, kapsam ve kullanım koşullarıyla uyumlu olmalıdır.",
  "Taşıtlar, binalar, bayraklar ile kart ve kartvizitler üzerinde kullanılmaz.",
  "Tanıtım malzemesi kısıtı; ürünlere iliştirilen not, etiket, doküman ve yazılı bildirimlerin yanı sıra paketleme ve promosyon malzemelerini de kapsar.",
  "Kullanıldığı yerlerde DVN Cert belgelendirme markasından daha baskın veya geri planda olmamalıdır.",
];

// TL.11 Rev.04'teki "TÜRKAK logosunun DVN logosu ile birlikte kullanımı (standart bazlı)"
// örnekleri. Markalar talimatın ekindeki görsellerden alınmıştır (TÜRKAK AB-0209-YS).
const birlikteKullanim = [
  { standart: "ISO 9001", ad: "Kalite Yönetim Sistemi", marka: "/gorseller/akreditasyon-markalari/turkak-markasi-iso-9001.png", en: 172, boy: 250 },
  { standart: "ISO 14001", ad: "Çevre Yönetim Sistemi", marka: "/gorseller/akreditasyon-markalari/turkak-markasi-iso-14001.png", en: 167, boy: 243 },
  { standart: "ISO 45001", ad: "İş Sağlığı ve Güvenliği Yönetim Sistemi", marka: "/gorseller/akreditasyon-markalari/turkak-markasi-iso-45001.png", en: 177, boy: 258 },
  { standart: "ISO 50001", ad: "Enerji Yönetim Sistemi", marka: "/gorseller/akreditasyon-markalari/turkak-markasi-iso-50001.png", en: 177, boy: 258 },
];

// TL.11 Rev.04 ile eklenen TÜRKAK Belge Doğrulama Sistemi (TBDS) karekod kuralları.
const tbdsMaddeleri = [
  "TBDS karekodu, düzenlenen sertifika üzerinde TÜRKAK Akreditasyon Markası'nın solunda ve 20 × 20 mm ebadında konumlandırılır.",
  "Karekod, karekod okuyucu uygulamalarla veya tbds.turkak.org.tr adresinden sorgulanabilir.",
  "Sorgulama sonucunda belgenin durumu, müşteri ismi, belgelendirme kuruluşunun adı, ilgili standart, TÜRKAK TBS numarası, belge numarası, yayın ve revizyon bilgileri ile belge adresleri görüntülenir.",
];

export default function LogolarimizSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Logolarımız", url: "/logolarimiz" },
          ]),
        )}
      />

      <SayfaBaslik
        etiket="KURUMSAL"
        baslik="Logolarımız"
        aciklama="Belgelendirme markamızın ve TÜRKAK Akreditasyon Markası'nın doğru ve tutarlı kullanımı için yönergeler."
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Logolarımız" }]}
      />

      <KapakGorsel src="/gorseller/sayfalar/logolarimiz.webp" alt="DVN Cert kurumsal logo ve marka kullanımı" etiket="Marka ve logo kullanım kuralları" oncelik />

      {/* Logoların birlikte kullanımı — sayfanın ilk bölümü (TL.11 Rev.04, standart bazlı örnekler) */}
      <section className="dvn-reveal" style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              MARKA KULLANIMI
            </p>
            <h2 className="dvn-gradyan-metin--koyu" style={{ fontSize: 28, fontWeight: 600, margin: 0, lineHeight: 1.3, display: "inline-block" }}>
              Logolarımızın birlikte kullanımı
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", margin: "12px auto 0", maxWidth: 760, lineHeight: 1.7 }}>
              TÜRKAK Akreditasyon Markası, DVN Cert logosu olmaksızın tek başına kullanılamaz. Marka standart
              bazlıdır; aşağıda her yönetim sistemi standardı için DVN Cert logosu ile birlikte kullanım örneği
              yer alır. Akreditasyon numaramız <strong>AB-0209-YS</strong>&apos;dir.
            </p>
          </div>

          <div className="dvn-birlikte-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
            {birlikteKullanim.map((b) => (
              <div
                key={b.standart}
                className="dvn-kural-kart"
                style={{
                  background: "var(--dvn-gri-50)",
                  borderRadius: 14,
                  border: "0.5px solid var(--dvn-gri-300)",
                  padding: "22px 20px",
                }}
              >
                <div style={{ background: "white", borderRadius: 10, padding: "26px 18px", display: "flex", alignItems: "center", justifyContent: "center", gap: 30, flexWrap: "wrap", marginBottom: 14 }}>
                  <Image
                    src="/logo.webp"
                    alt="DVN Cert belgelendirme markası"
                    width={152}
                    height={84}
                    style={{ height: 60, width: "auto" }}
                  />
                  <Image
                    src={b.marka}
                    alt={`${b.standart} ${b.ad} için TÜRKAK Akreditasyon Markası (AB-0209-YS)`}
                    width={b.en}
                    height={b.boy}
                    style={{ height: 92, width: "auto" }}
                  />
                </div>
                <p style={{ fontSize: 14.5, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 2px" }}>{b.standart}</p>
                <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: 0, lineHeight: 1.5 }}>{b.ad}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "18px auto 0", maxWidth: 760, textAlign: "center", lineHeight: 1.65 }}>
            Akreditasyon markası yalnızca belgenin akreditasyon kapsamındaki standardı için kullanılabilir;
            kullanıldığı yerlerde DVN Cert belgelendirme markasından daha baskın veya geri planda olmamalıdır.
          </p>
        </div>
      </section>

      <section className="dvn-reveal" style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              KURALLAR
            </p>
            <h2 className="dvn-gradyan-metin--koyu" style={{ fontSize: 28, fontWeight: 600, margin: 0, lineHeight: 1.3, display: "inline-block" }}>
              Logo kullanım kuralları
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", margin: "12px auto 0", maxWidth: 720, lineHeight: 1.7 }}>
              DVN Cert logosu, tetkiklerden başarılı olarak belge almaya hak kazanan firmalar tarafından,
              aşağıdaki kurallara ve <strong>TL.11 Marka/Logo Kullanım Talimatı</strong>&apos;na ({TALIMAT_REV}) uygun
              olarak kullanılabilir. Bu kurallar ilk belgelendirmede belge ile birlikte kuruluşa iletilir ve güncel
              hâliyle bu sayfada yayımlanır.
            </p>
          </div>

          {/* Talimat, dokümanlar sayfasındaki gibi site içi korumalı görüntüleyicide açılır:
              canvas'a çizildiği için metin seçilemez/kopyalanamaz, yeni sekmede açılmaz. */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <DokumanGoruntule
              src={TALIMAT_PDF}
              baslik={`Marka / Logo Kullanım Talimatı — ${TALIMAT_REV}`}
              etiket="Marka ve Logo Kullanım Talimatını görüntüle"
              gorunum="cizgili"
            />
          </div>

          <div className="dvn-kural-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div className="dvn-kural-kart" style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", borderTop: "3px solid var(--dvn-altin)" }}>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 18px", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--dvn-altin)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Yapılması gerekenler
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                {yapilmasiGerekenler.map((k, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--dvn-altin)", flexShrink: 0 }}>✓</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div className="dvn-kural-kart" style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", borderTop: "3px solid var(--dvn-turuncu)" }}>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 18px", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 9l-6 6M9 9l6 6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--dvn-turuncu)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Yapılmaması gerekenler
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                {yapilmamasiGerekenler.map((k, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--dvn-turuncu)", flexShrink: 0 }}>✕</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kullanım koşulları tablosu */}
          <div style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", marginTop: 20 }}>
            <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 6px" }}>
              DVN Cert logosu nerede kullanılabilir?
            </h3>
            <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6 }}>
              Logonun kullanılabileceği yerler, kullanım ortamına göre değişir. Aşağıdaki örnekler talimattaki
              kuralların görsel karşılığıdır; ayrıntılı matris için tabloya bakabilirsiniz.
            </p>

            {/* Görsel anlatım: ürün / taşıma kolisi / reklam malzemesi */}
            <div className="dvn-kullanim-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 26 }}>
              {kullanimSahneleri.map((s) => (
                <figure
                  key={s.sahne}
                  style={{
                    margin: 0,
                    background: "var(--dvn-gri-50)",
                    border: "0.5px solid var(--dvn-gri-300)",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", background: "white", borderBottom: "0.5px solid var(--dvn-gri-300)" }}>
                    <KullanimSahnesi tip={s.sahne} olumlu={s.olumlu} />
                    <Image
                      src="/logo.webp"
                      alt=""
                      aria-hidden
                      width={152}
                      height={84}
                      style={{
                        position: "absolute",
                        left: s.logo.sol,
                        top: s.logo.ust,
                        width: s.logo.en,
                        height: "auto",
                        opacity: s.olumlu ? 1 : 0.85,
                      }}
                    />
                  </div>

                  <figcaption style={{ padding: "14px 16px 16px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11.5,
                        fontWeight: 600,
                        letterSpacing: "0.2px",
                        color: s.olumlu ? "#8a6a12" : "var(--dvn-turuncu)",
                        background: s.olumlu ? "var(--dvn-altin-soluk)" : "#fdecea",
                        borderRadius: 999,
                        padding: "5px 11px",
                        marginBottom: 10,
                      }}
                    >
                      {s.olumlu ? "✓" : "✕"} {s.durum}
                    </span>
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 4px", lineHeight: 1.4 }}>
                      {s.baslik}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: 0, lineHeight: 1.55 }}>{s.not}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 520 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--dvn-gri-500)", fontWeight: 600, borderBottom: "1px solid var(--dvn-gri-300)" }}></th>
                    {kullanimTablosu.sutunlar.map((s) => (
                      <th key={s} style={{ textAlign: "left", padding: "10px 12px", color: "var(--dvn-lacivert)", fontWeight: 600, borderBottom: "1px solid var(--dvn-gri-300)" }}>
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kullanimTablosu.satirlar.map((satir) => (
                    <tr key={satir.etiket}>
                      <td style={{ padding: "11px 12px", color: "var(--dvn-lacivert)", fontWeight: 600, borderBottom: "0.5px solid var(--dvn-gri-300)" }}>{satir.etiket}</td>
                      {satir.degerler.map((deger, j) => {
                        const olumlu = deger.startsWith("Kullanılabilir");
                        return (
                          <td key={j} style={{ padding: "11px 12px", color: olumlu ? "var(--dvn-altin)" : "var(--dvn-turuncu)", fontWeight: 500, borderBottom: "0.5px solid var(--dvn-gri-300)" }}>
                            {deger}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "grid", gap: 6 }}>
              {kullanimTablosu.notlar.map((n, i) => (
                <li key={i} style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", lineHeight: 1.5 }}>{n}</li>
              ))}
            </ul>

            <div style={{ background: "var(--dvn-gri-50)", borderRadius: 10, padding: "14px 16px", marginTop: 18, borderLeft: "3px solid var(--dvn-altin)" }}>
              <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "0 0 4px", fontWeight: 600 }}>Örnek açıklama ifadesi</p>
              <p style={{ fontSize: 13, color: "var(--dvn-gri-700)", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>“{ornekAciklama}”</p>
            </div>
          </div>

          {/* TÜRKAK Akreditasyon Markası */}
          <div style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", marginTop: 20 }}>
            <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 8px" }}>
              TÜRKAK Akreditasyon Markası kullanımı
            </h3>
            <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 16px", lineHeight: 1.6 }}>
              Akreditasyon kapsamındaki belgeler için, TÜRKAK&apos;ın R10.06 logo kullanım şartları ile birlikte
              aşağıdaki kurallar geçerlidir.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
              {turkakMaddeleri.map((k, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--dvn-lacivert)", flexShrink: 0 }}>•</span>
                  {k}
                </li>
              ))}
            </ul>
          </div>

          {/* TBDS karekodu */}
          <div style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", marginTop: 20 }}>
            <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 8px" }}>
              TÜRKAK Belge Doğrulama Sistemi (TBDS) karekodu
            </h3>
            <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 16px", lineHeight: 1.6 }}>
              Akreditasyon kapsamında düzenlenen sertifikalarda, belgeye ilişkin bilgilere erişim sağlayan TBDS
              karekodu yer alır.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
              {tbdsMaddeleri.map((k, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--dvn-lacivert)", flexShrink: 0 }}>•</span>
                  {k}
                </li>
              ))}
            </ul>
          </div>

          <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "28px auto 0", maxWidth: 720, lineHeight: 1.6 }}>
            Belgenin geçerlilik süresi sona erdiğinde, askıya alındığında veya geri çekildiğinde logo kullanımı derhal
            durdurulmalıdır. Belge ve logo üçüncü tarafa devredilemez. Talimat şartlarını yerine getirmeyen kuruluşlarda
            belgenin askıya alınması veya sözleşmenin iptali işlemleri uygulanır. Ayrıntılar için yukarıdaki{" "}
            <strong>Marka ve Logo Kullanım Talimatı</strong>&apos;nı ({TALIMAT_REV}) inceleyiniz.
          </p>
        </div>
      </section>

      <style>{`
        .dvn-kural-kart {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dvn-kural-kart:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 40px rgba(2,35,152,0.12) !important;
          border-color: rgba(212,169,63,0.4);
        }
        @media (max-width: 980px) {
          .dvn-kullanim-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 820px) {
          .dvn-kural-grid { grid-template-columns: 1fr !important; }
          .dvn-birlikte-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .dvn-kullanim-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

/**
 * Kullanım örneği sahneleri. Tümü 240×170 viewBox'ta çizilir; logo, sahnenin
 * üzerine ayrı bir katman olarak konumlandırılır (bkz. kullanimSahneleri).
 * Olumsuz sahnede logo alanı çapraz yasak işaretiyle kapatılır.
 */
function KullanimSahnesi({ tip, olumlu }: { tip: "urun" | "koli" | "brosur"; olumlu: boolean }) {
  const cizgi = "#c9d1e2";
  const acikYuzey = "#f6f8fc";
  const koyuYuzey = "#e9edf6";
  const kraft = "#e8d5b5";
  const kraftKoyu = "#d9c09a";

  return (
    <svg viewBox="0 0 240 170" width="100%" height="auto" style={{ display: "block" }} role="img" aria-hidden focusable="false">
      {/* zemin gölgesi */}
      <ellipse cx="120" cy="152" rx="74" ry="7" fill="rgba(2,35,152,0.07)" />

      {tip === "urun" && (
        <>
          {/* ürün kutusu — perspektifli */}
          <path d="M78 44 L96 30 L180 30 L162 44 Z" fill={koyuYuzey} stroke={cizgi} strokeWidth="1.2" />
          <path d="M162 44 L180 30 L180 132 L162 146 Z" fill={koyuYuzey} stroke={cizgi} strokeWidth="1.2" />
          <path d="M78 44 L162 44 L162 146 L78 146 Z" fill="white" stroke={cizgi} strokeWidth="1.2" />
          {/* ürün etiketi satırları */}
          <rect x="90" y="118" width="46" height="5" rx="2.5" fill={acikYuzey} stroke={cizgi} strokeWidth="0.6" />
          <rect x="90" y="129" width="32" height="5" rx="2.5" fill={acikYuzey} stroke={cizgi} strokeWidth="0.6" />
        </>
      )}

      {tip === "koli" && (
        <>
          {/* taşıma kolisi — kraft renkli, bantlı */}
          <path d="M62 52 L86 34 L178 34 L154 52 Z" fill={kraftKoyu} stroke={cizgi} strokeWidth="1.2" />
          <path d="M154 52 L178 34 L178 126 L154 144 Z" fill={kraftKoyu} stroke={cizgi} strokeWidth="1.2" />
          <path d="M62 52 L154 52 L154 144 L62 144 Z" fill={kraft} stroke={cizgi} strokeWidth="1.2" />
          {/* bant */}
          <path d="M104 52 L104 144" stroke="#c2a678" strokeWidth="7" opacity="0.55" />
          {/* açıklama ifadesi satırları */}
          <rect x="72" y="112" width="72" height="4.5" rx="2.25" fill="rgba(255,255,255,0.85)" />
          <rect x="72" y="121" width="58" height="4.5" rx="2.25" fill="rgba(255,255,255,0.85)" />
          <rect x="72" y="130" width="44" height="4.5" rx="2.25" fill="rgba(255,255,255,0.7)" />
        </>
      )}

      {tip === "brosur" && (
        <>
          {/* arka sayfa */}
          <rect x="88" y="26" width="86" height="118" rx="5" fill={koyuYuzey} stroke={cizgi} strokeWidth="1.2" />
          {/* ön broşür */}
          <rect x="64" y="34" width="92" height="112" rx="5" fill="white" stroke={cizgi} strokeWidth="1.2" />
          {/* başlık ve metin satırları */}
          <rect x="76" y="78" width="68" height="6" rx="3" fill={koyuYuzey} />
          <rect x="76" y="92" width="60" height="4.5" rx="2.25" fill={acikYuzey} stroke={cizgi} strokeWidth="0.5" />
          <rect x="76" y="102" width="66" height="4.5" rx="2.25" fill={acikYuzey} stroke={cizgi} strokeWidth="0.5" />
          <rect x="76" y="112" width="52" height="4.5" rx="2.25" fill={acikYuzey} stroke={cizgi} strokeWidth="0.5" />
          <rect x="76" y="126" width="34" height="9" rx="4.5" fill="var(--dvn-altin-soluk)" />
        </>
      )}

      {!olumlu && (
        /* yasak işareti — logonun üzerine denk gelir */
        <g>
          <circle cx="120" cy="86" r="33" fill="rgba(217,48,37,0.08)" stroke="var(--dvn-turuncu)" strokeWidth="3.4" />
          <path d="M97 63 L143 109" stroke="var(--dvn-turuncu)" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
