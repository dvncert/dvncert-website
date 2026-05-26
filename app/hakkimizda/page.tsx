import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import { sayfaIcerigiGetir, alanDegeri } from "@/lib/sayfa-icerigi";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";

const YOL = "/hakkimizda";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: YOL,
    title: "Hakkımızda",
    description:
      "DVN Cert; bağımsız ve tarafsız bir uygunluk değerlendirme kuruluşudur. Misyonumuz, vizyonumuz ve değerlerimizle TÜRKAK akreditasyonu altında güvenilir belgelendirme sunuyoruz.",
  });
}

// 6 değer için SVG ikonları sabit (içerik düzenlenebilir ama görsel kimlik korunur)
const degerIkonlari = [
  <path key="d1" d="M12 3v18M3 7l9-4 9 4M5 7v6c0 2 1.5 3 3.5 3S12 15 12 13M12 13c0 2 1.5 3 3.5 3S19 15 19 13V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="d2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="d3" d="M22 10v6M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="d4" d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="d5" d="M21 12a9 9 0 11-2.64-6.36M21 4v5h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="d6" d="M9 12l2 2 4-4M12 2L4 6v6c0 5.5 3.5 10 8 12 4.5-2 8-6.5 8-12V6l-8-4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
];

export default async function HakkimizdaSayfasi() {
  const icerik = await sayfaIcerigiGetir(YOL);
  const al = (anahtar: string) => alanDegeri(icerik, YOL, anahtar);

  const degerler = [1, 2, 3, 4, 5, 6].map((i) => ({
    baslik: al(`deger-${i}-baslik`),
    aciklama: al(`deger-${i}-metin`),
    icon: degerIkonlari[i - 1],
  }));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Hakkımızda", url: "/hakkimizda" },
          ]),
        )}
      />

      <SayfaBaslik
        etiket="KURUMSAL"
        baslik="Hakkımızda"
        aciklama={siteConfig.slogan}
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Hakkımızda" }]}
      />

      <KapakGorsel alt="DVN Cert - bağımsız belgelendirme kuruluşu" etiket="Bağımsız ve tarafsız belgelendirme kuruluşu" oncelik />

      {/* Giriş */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 10px" }}>
            {al("giris-etiket")}
          </p>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: "0 0 18px", lineHeight: 1.3 }}>
            {al("giris-baslik")}
          </h2>
          <p style={{ fontSize: 15, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>
            {al("giris-metin")}
          </p>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div
          className="dvn-mv-grid"
          style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {[
            { etiket: "MİSYONUMUZ", metin: al("misyon") },
            { etiket: "VİZYONUMUZ", metin: al("vizyon") },
          ].map((mv) => (
            <div
              key={mv.etiket}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "32px 30px",
                boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                border: "0.5px solid var(--dvn-gri-300)",
                borderTop: "3px solid var(--dvn-altin)",
              }}
            >
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 12px" }}>
                {mv.etiket}
              </p>
              <p style={{ fontSize: 14.5, color: "var(--dvn-gri-700)", lineHeight: 1.8, margin: 0 }}>{mv.metin}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Değerlerimiz */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              DEĞERLERİMİZ
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              {al("degerler-baslik")}
            </h2>
          </div>

          <div className="dvn-deger-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {degerler.map((d, i) => (
              <div
                key={i}
                style={{
                  background: "var(--dvn-gri-50)",
                  borderRadius: 14,
                  padding: "28px 24px",
                  border: "0.5px solid var(--dvn-gri-300)",
                }}
              >
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
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    {d.icon}
                  </svg>
                </div>
                <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 500, margin: "0 0 10px", lineHeight: 1.3 }}>
                  {d.baslik}
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: 0 }}>{d.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "0 32px 70px" }}>
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
              {al("cta-baslik")}
            </h2>
            <p style={{ color: "#9aa5b1", fontSize: 13.5, margin: 0 }}>
              {al("cta-metin")}
            </p>
          </div>
          <Link
            href="/iletisim"
            style={{
              background: "var(--dvn-gradient-turuncu)",
              color: "white",
              padding: "13px 26px",
              borderRadius: "var(--dvn-radius-md)",
              fontWeight: 500,
              fontSize: 14,
              boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            Bize Ulaşın →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .dvn-mv-grid { grid-template-columns: 1fr !important; }
          .dvn-deger-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .dvn-deger-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
