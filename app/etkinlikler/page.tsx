import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import { etkinlikleriGetir, etkinlikTarihBicim } from "@/lib/etkinlikler";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Eğitimler ve Etkinlikler",
  description:
    "DVN Cert eğitim, seminer, konferans ve webinarları. Yaklaşan etkinlikler, kayıt bilgileri ve geçmiş etkinlik arşivi.",
  alternates: { canonical: `${siteConfig.url}/etkinlikler` },
};

export default async function EtkinliklerSayfasi() {
  const hepsi = await etkinlikleriGetir();
  const simdi = new Date();
  const yaklasan = hepsi.filter((e) => e.baslangic >= simdi).sort((a, b) => a.baslangic.getTime() - b.baslangic.getTime());
  const gecmis = hepsi.filter((e) => e.baslangic < simdi);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Etkinlikler", url: "/etkinlikler" },
          ]),
        )}
      />

      <SayfaBaslik
        etiket="ETKİNLİKLER"
        baslik="Eğitim ve Etkinlikler"
        aciklama="Yaklaşan eğitim, seminer ve webinarlar. Kayıt için detay sayfasına göz atın."
        kirintilar={[{ etiket: "Etkinlikler" }]}
      />

      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {hepsi.length === 0 && (
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 15, textAlign: "center" }}>
              Şu anda planlanmış etkinlik yok. Yakında yeni etkinliklerle burada olacağız.
            </p>
          )}

          {yaklasan.length > 0 && (
            <>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 500, margin: "0 0 22px" }}>
                Yaklaşan etkinlikler
              </h2>
              <Kartlar liste={yaklasan} gecmis={false} />
            </>
          )}

          {gecmis.length > 0 && (
            <>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 500, margin: "48px 0 22px" }}>
                Geçmiş etkinlikler
              </h2>
              <Kartlar liste={gecmis} gecmis />
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function Kartlar({
  liste,
  gecmis,
}: {
  liste: Awaited<ReturnType<typeof etkinlikleriGetir>>;
  gecmis: boolean;
}) {
  return (
    <div className="dvn-etkinlik-listesi" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
      {liste.map((e) => (
        <Link
          key={e.slug}
          href={`/etkinlikler/${e.slug}`}
          className="dvn-etkinlik-li"
          style={{
            background: gecmis ? "var(--dvn-gri-50)" : "white",
            borderRadius: 14,
            padding: "22px 22px",
            border: "0.5px solid var(--dvn-gri-300)",
            boxShadow: gecmis ? "none" : "0 4px 16px rgba(2,35,152,0.06)",
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
            color: "inherit",
            opacity: gecmis ? 0.85 : 1,
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--dvn-turuncu)", background: "var(--dvn-turuncu-soluk)", padding: "3px 9px", borderRadius: 999 }}>
              {e.kategori}
            </span>
            <span style={{ fontSize: 12, color: "var(--dvn-gri-500)" }}>
              {etkinlikTarihBicim(e.baslangic, { saatGoster: !gecmis })}
            </span>
          </div>
          <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.4 }}>
            {e.baslik}
          </h3>
          <p style={{ fontSize: 12.5, color: "var(--dvn-gri-700)", margin: "0 0 12px" }}>📍 {e.yer}</p>
          <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: "0 0 14px", flexGrow: 1 }}>
            {e.ozet}
          </p>
          {!gecmis && (
            <span style={{ fontSize: 13, color: "var(--dvn-turuncu)", fontWeight: 500 }}>Detaylar →</span>
          )}
        </Link>
      ))}
      <style>{`
        .dvn-etkinlik-li:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(2,35,152,0.12) !important; }
        @media (max-width: 760px) { .dvn-etkinlik-listesi { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
