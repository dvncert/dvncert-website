import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import HizmetIkon from "../components/HizmetIkon";
import { courseSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import { sayfaIcerigiGetir, alanDegeri, egitimIkonu } from "@/lib/sayfa-icerigi";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";

const YOL = "/egitimler";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: YOL,
    title: "Eğitimler",
    description:
      "DVN Cert ISO yönetim sistemleri eğitim programları: ISO 9001, ISO 14001, ISO 45001 ve ISO 50001 eğitimleri. Çevrim içi veya yüz yüze, genel katılıma açık.",
  });
}

function egitimKartlariCozumle(metin: string): { baslik: string; icerik: string; ikon: string }[] {
  if (!metin.trim()) return [];
  return metin
    .split(/\n\s*\n/)
    .filter((b) => b.trim())
    .map((b) => {
      const satirlar = b.split("\n");
      const baslik = (satirlar[0] ?? "").replace(/^##\s*/, "").trim();
      const icerik = satirlar.slice(1).join("\n").trim();
      return { baslik, icerik, ikon: egitimIkonu(baslik) };
    });
}

export default async function EgitimlerSayfasi() {
  const icerik = await sayfaIcerigiGetir(YOL);
  const al = (anahtar: string) => alanDegeri(icerik, YOL, anahtar);
  const egitimler = egitimKartlariCozumle(al("egitim-kartlari"));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Hizmetler", url: "/hizmetler" },
            { ad: "Eğitimler", url: "/egitimler" },
          ]),
        )}
      />
      {egitimler.map((e) => (
        <script
          key={e.baslik}
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(
            courseSchema({ ad: e.baslik, aciklama: e.icerik, url: "/egitimler" }),
          )}
        />
      ))}

      <SayfaBaslik
        etiket="HİZMETLERİMİZ"
        baslik="Eğitimler"
        aciklama="Uluslararası belgelendirme deneyimimizden edindiğimiz bilgi birikimini profesyonel eğitim programlarımızla paylaşıyoruz."
        kirintilar={[{ etiket: "Hizmetler", href: "/hizmetler" }, { etiket: "Eğitimler" }]}
      />

      <KapakGorsel alt="DVN Cert ISO yönetim sistemleri eğitimleri" ikon="egitim" etiket="ISO Yönetim Sistemleri Eğitimleri" oncelik />

      {/* Giriş */}
      <section style={{ background: "white", padding: "60px 32px 36px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 10px" }}>
            {al("giris-etiket")}
          </p>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: "0 0 16px", lineHeight: 1.3 }}>
            {al("giris-baslik")}
          </h2>
          <p style={{ fontSize: 15, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>
            {al("giris-metin")}
          </p>
        </div>
      </section>

      {/* Eğitim kartları */}
      <section style={{ background: "white", padding: "0 32px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="dvn-egitim-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {egitimler.map((e) => (
              <div
                key={e.baslik}
                style={{
                  display: "flex",
                  gap: 18,
                  background: "var(--dvn-gri-50)",
                  borderRadius: 14,
                  padding: "26px 24px",
                  border: "0.5px solid var(--dvn-gri-300)",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 54,
                    height: 54,
                    borderRadius: 12,
                    background: "var(--dvn-gradient-lacivert)",
                    color: "var(--dvn-altin-acik)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 16px rgba(2,35,152,0.15)",
                  }}
                >
                  <HizmetIkon ad={e.ikon} size={27} />
                </div>
                <div>
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.35 }}>
                    {e.baslik}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.65, margin: 0 }}>{e.icerik}</p>
                </div>
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
            <h2 style={{ color: "white", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>{al("cta-baslik")}</h2>
            <p style={{ color: "#9aa5b1", fontSize: 13.5, margin: 0 }}>{al("cta-metin")}</p>
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
        @media (max-width: 760px) {
          .dvn-egitim-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
