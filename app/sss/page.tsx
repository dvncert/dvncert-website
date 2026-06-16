import type { Metadata } from "next";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { db, dbHazir } from "@/lib/db";
import { sssSorulari } from "@/lib/db/schema";
import { faqSchema, breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import { sssSorular as varsayilanSorular } from "@/lib/sss";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/sss",
    title: "Sıkça Sorulan Sorular",
    description:
      "DVN Cert belgelendirme hizmetleri hakkında sıkça sorulan sorular: belgelendirme süreci, süresi, ISO belgesinin faydaları ve belgelendirme sonrası yükümlülükler.",
  });
}

async function sssGetir() {
  if (!dbHazir) return varsayilanSorular;
  try {
    const rows = await db
      .select({ soru: sssSorulari.soru, cevap: sssSorulari.cevap })
      .from(sssSorulari)
      .where(eq(sssSorulari.yayinda, true))
      .orderBy(asc(sssSorulari.sira), asc(sssSorulari.id));
    return rows.length > 0 ? rows : varsayilanSorular;
  } catch {
    return varsayilanSorular;
  }
}

export default async function SSSSayfasi() {
  const sorular = await sssGetir();
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

      <KapakGorsel src="/gorseller/sayfalar/sss.webp" alt="DVN Cert sıkça sorulan sorular" etiket="Belgelendirme hakkında merak edilenler" oncelik />

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
