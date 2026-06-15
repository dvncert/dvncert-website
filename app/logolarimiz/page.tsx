import type { Metadata } from "next";
import Image from "next/image";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import { logoDosyalariniGetir, type LogoDosyasi } from "@/lib/faz2-icerik";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/logolarimiz",
    title: "Logolarımız",
    description:
      "DVN Cert kurumsal logosu ve marka kullanım kuralları (TL.11 talimatı). Logo kullanım koşulları, TÜRKAK akreditasyon markası kuralları, indirilebilir logo dosyaları ve talimatın PDF görünümü.",
  });
}

// TL.11 Rev.02 Marka Logo Kullanım Talimatı esas alınmıştır.
const TALIMAT_PDF = "/dokumanlar/marka-logo-kullanim-talimati.pdf";

const yapilmasiGerekenler = [
  "Logoyu yalnızca belge kapsamı dahilindeki faaliyet alanlarında kullanın.",
  "Logoyu orijinal renklerinde ve oranlarını koruyarak kullanın; oranlar sabit kalmak şartıyla boyut büyütülüp küçültülebilir.",
  "Logonun kullanım şekli için Sistem Belgelendirme Müdürlüğü'nden onay alın.",
  "Yalnızca tarafımızca sağlanan güncel logo dosyalarını, kontrastı yeterli zeminlerde kullanın.",
  "Belgelendirme statüsüne atıfta bulunurken belgelendirme kuruluşunun şartlarına uyun.",
];

const yapilmamasiGerekenler = [
  "Logoyu ürün, ürün ambalajı üzerinde veya ürün uygunluğunu çağrıştıracak şekilde kullanmayın.",
  "DVN Cert'in sorumluluğu olduğu anlamı çıkacak şekilde kullanmayın.",
  "Belge kapsamı dışındaki bölüm, bağlı kuruluş veya iştiraklerde kullanmayın.",
  "Belge ve logoyu üçüncü tarafa devretmeyin.",
  "Yanıltıcı, belirsiz veya kuruluşun itibarına gölge düşürecek biçimde kullanmayın.",
  "Belge süresi dolduğunda, askıya alındığında veya geri çekildiğinde logo kullanımına devam etmeyin.",
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

const turkakMaddeleri = [
  "TÜRKAK Akreditasyon Markası, DVN Cert logosu olmaksızın tek başına kullanılamaz.",
  "Marka kullanımı yalnızca belgenin üzerinde yer alan yetki, kapsam ve kullanım koşullarıyla uyumlu olmalıdır.",
  "Taşıtlar, binalar, bayraklar ile kart ve kartvizitler üzerinde kullanılmaz.",
  "Kullanıldığı yerlerde DVN Cert belgelendirme markasından daha baskın veya geri planda olmamalıdır.",
];

export default async function LogolarimizSayfasi() {
  const logolar = await logoDosyalariniGetir();
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
        aciklama="Kurumsal logomuzun doğru ve tutarlı kullanımı için yönergeler ve indirilebilir dosyalar."
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Logolarımız" }]}
      />

      <KapakGorsel alt="DVN Cert kurumsal logo ve marka kullanımı" etiket="Marka ve logo kullanım kuralları" oncelik />

      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              LOGO DOSYALARI
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              DVN Cert kurumsal logosu
            </h2>
          </div>

          {logolar.length === 0 ? (
            <div className="dvn-logo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <VarsayilanLogoKart zeminKoyu={false} />
              <VarsayilanLogoKart zeminKoyu={true} />
            </div>
          ) : (
            <div className="dvn-logo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {logolar.map((l) => <LogoKart key={l.id} logo={l} />)}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              MARKA KULLANIMI
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Logo kullanım kuralları
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", margin: "12px auto 0", maxWidth: 720, lineHeight: 1.7 }}>
              DVN Cert logosu, tetkiklerden başarılı olarak belge almaya hak kazanan firmalar tarafından,
              aşağıdaki kurallara ve <strong>TL.11 Marka Logo Kullanım Talimatı</strong>&apos;na uygun olarak
              kullanılabilir.
            </p>
          </div>

          {/* Talimat PDF görüntüleme */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <a
              href={TALIMAT_PDF}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "white",
                color: "var(--dvn-lacivert)",
                padding: "12px 22px",
                borderRadius: "var(--dvn-radius-md)",
                fontWeight: 500,
                fontSize: 13.5,
                border: "0.5px solid var(--dvn-gri-300)",
                boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                textDecoration: "none",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="var(--dvn-turuncu)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M9 13h6M9 17h6" stroke="var(--dvn-turuncu)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Marka ve Logo Kullanım Talimatını görüntüle (PDF)
            </a>
          </div>

          <div className="dvn-kural-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", borderTop: "3px solid var(--dvn-altin)" }}>
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

            <div style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", borderTop: "3px solid var(--dvn-turuncu)" }}>
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
            <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 18px" }}>
              DVN Cert logosu nerede kullanılabilir?
            </h3>
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

          <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "28px auto 0", maxWidth: 720, lineHeight: 1.6 }}>
            Belgenin geçerlilik süresi sona erdiğinde, askıya alındığında veya geri çekildiğinde logo kullanımı derhal
            durdurulmalıdır. Belge ve logo üçüncü tarafa devredilemez. Ayrıntılar için yukarıdaki{" "}
            <strong>Marka ve Logo Kullanım Talimatı</strong>&apos;nı (TL.11 Rev.02) inceleyiniz.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .dvn-logo-grid { grid-template-columns: 1fr !important; }
          .dvn-kural-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function LogoKart({ logo }: { logo: LogoDosyasi }) {
  const zeminKoyu = logo.zeminTipi === "koyu";
  const onizlemeUrl = logo.dosya;
  const previewable = onizlemeUrl && (logo.dosyaMime?.startsWith("image/") ?? false);
  return (
    <div style={{ background: "white", borderRadius: 16, padding: 20, border: "0.5px solid var(--dvn-gri-300)", boxShadow: "0 4px 16px rgba(2,35,152,0.06)" }}>
      <div
        style={{
          background: zeminKoyu ? "var(--dvn-gradient-lacivert)" : "var(--dvn-gri-50)",
          borderRadius: 12,
          padding: "40px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          minHeight: 150,
          border: zeminKoyu ? "none" : "0.5px solid var(--dvn-gri-300)",
        }}
      >
        {previewable ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={onizlemeUrl} alt={logo.ad} style={{ maxHeight: 120, maxWidth: "100%", width: "auto", height: "auto" }} />
        ) : (
          <span style={{ fontSize: 13, color: zeminKoyu ? "#cbd5e1" : "var(--dvn-gri-500)" }}>
            {logo.dosyaMime?.split("/")[1]?.toUpperCase() ?? "Dosya"}
          </span>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 2px" }}>{logo.ad}</p>
          {logo.aciklama && <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: 0 }}>{logo.aciklama}</p>}
        </div>
        {logo.dosya && (
          <a
            href={logo.dosya}
            download={logo.dosyaAdi || undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--dvn-gradient-turuncu)",
              color: "white",
              padding: "9px 18px",
              borderRadius: "var(--dvn-radius-md)",
              fontWeight: 500,
              fontSize: 13,
              boxShadow: "0 6px 16px rgba(245,130,32,0.28)",
              textDecoration: "none",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            İndir
          </a>
        )}
      </div>
    </div>
  );
}

function VarsayilanLogoKart({ zeminKoyu }: { zeminKoyu: boolean }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: 20, border: "0.5px solid var(--dvn-gri-300)", boxShadow: "0 4px 16px rgba(2,35,152,0.06)" }}>
      <div
        style={{
          background: zeminKoyu ? "var(--dvn-gradient-lacivert)" : "var(--dvn-gri-50)",
          borderRadius: 12,
          padding: "40px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          minHeight: 150,
          border: zeminKoyu ? "none" : "0.5px solid var(--dvn-gri-300)",
        }}
      >
        <Image
          src={zeminKoyu ? "/logo-beyaz.png" : "/logo.webp"}
          alt="DVN Cert Belgelendirme logosu"
          width={152}
          height={84}
          style={{ height: 84, width: "auto" }}
        />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 2px" }}>
          {zeminKoyu ? "Koyu zemin için" : "Açık zemin için"}
        </p>
        <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: 0, fontStyle: "italic" }}>
          Admin panelinden logo yüklenmedi
        </p>
      </div>
    </div>
  );
}
