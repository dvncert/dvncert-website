import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import HizmetIkon from "../components/HizmetIkon";
import { courseSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import { sayfaIcerigiGetir, alanDegeri } from "@/lib/sayfa-icerigi";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";
import { egitimGruplari } from "@/lib/egitimler";

const YOL = "/egitimler";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: YOL,
    title: "ISO Eğitimleri (Temel, İç Tetkikçi, Baş Denetçi)",
    description:
      "DVN Cert ISO eğitimleri: ISO 9001, 14001, 45001, 50001 ve ISO 19011 temel, iç tetkikçi ve baş denetçi eğitimleri. Çevrim içi veya yüz yüze, genel katılıma açık.",
  });
}

export default async function EgitimlerSayfasi() {
  const icerik = await sayfaIcerigiGetir(YOL);
  const al = (anahtar: string) => alanDegeri(icerik, YOL, anahtar);
  const gruplar = egitimGruplari();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Eğitimler", url: "/egitimler" },
          ]),
        )}
      />
      {gruplar.flatMap((g) => g.egitimler).map((e) => (
        <script
          key={e.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(
            courseSchema({
              ad: e.baslik,
              aciklama: e.kisaAciklama,
              url: `/egitimler/${e.slug}`,
              sure: e.sure,
              yontemler: ["online", "onsite"],
            }),
          )}
        />
      ))}

      <SayfaBaslik
        etiket="HİZMETLERİMİZ"
        baslik="Eğitimler"
        aciklama="Uluslararası belgelendirme deneyimimizden edindiğimiz bilgi birikimini, genel katılıma açık profesyonel eğitim programlarımızla paylaşıyoruz."
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

      {/* Eğitim grupları */}
      <section style={{ background: "white", padding: "0 32px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 44 }}>
          {gruplar.map((grup) => (
            <div key={grup.standart}>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 600, margin: "0 0 16px", paddingBottom: 10, borderBottom: "0.5px solid var(--dvn-gri-300)" }}>
                {grup.standart} Eğitimleri
              </h3>
              <div className="dvn-egitim-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {grup.egitimler.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/egitimler/${e.slug}`}
                    className="dvn-egitim-kart"
                    style={{ display: "flex", flexDirection: "column", gap: 12, background: "var(--dvn-gri-50)", borderRadius: 14, padding: "22px 22px", border: "0.5px solid var(--dvn-gri-300)", textDecoration: "none", color: "inherit", transition: "all 0.3s ease" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 11, background: "var(--dvn-gradient-lacivert)", color: "var(--dvn-altin-acik)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(2,35,152,0.15)" }}>
                        <HizmetIkon ad={e.ikon} size={23} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--dvn-turuncu)", letterSpacing: "0.5px" }}>{e.sure} · {e.seviye}</span>
                    </div>
                    <div>
                      <h4 style={{ color: "var(--dvn-lacivert)", fontSize: 15, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.35 }}>{e.baslik}</h4>
                      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: 0 }}>{e.kisaAciklama}</p>
                    </div>
                    <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 500, color: "var(--dvn-turuncu)" }}>
                      İncele
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — genel katılıma açık (kurum bazlı eğitim yapılmaz) */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "0 32px 70px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", background: "var(--dvn-gradient-lacivert)", borderRadius: 18, padding: "40px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <h2 style={{ color: "white", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Eğitim tarihlerini öğrenin</h2>
            <p style={{ color: "#9aa5b1", fontSize: 13.5, margin: 0 }}>Genel katılıma açık eğitim programlarımızın takvimi ve kayıt için bizimle iletişime geçin.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/etkinlikler" style={{ background: "var(--dvn-gradient-turuncu)", color: "white", padding: "13px 24px", borderRadius: "var(--dvn-radius-md)", fontWeight: 500, fontSize: 14, boxShadow: "0 8px 20px rgba(245,130,32,0.3)", whiteSpace: "nowrap" }}>
              Eğitim Takvimi →
            </Link>
            <Link href="/iletisim" style={{ background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.2)", color: "white", padding: "13px 24px", borderRadius: "var(--dvn-radius-md)", fontWeight: 500, fontSize: 14, whiteSpace: "nowrap" }}>
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .dvn-egitim-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(2,35,152,0.1) !important; }
        @media (max-width: 900px) {
          .dvn-egitim-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .dvn-egitim-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
