import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";
import { sayfaIcerigiGetir, alanDegeri } from "@/lib/sayfa-icerigi";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";

const YOL = "/politika-ve-beyanlar";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: YOL,
    title: "Politika ve Beyanlar",
    description:
      "DVN Cert'in tarafsızlık ve bağımsızlık beyanı, kalite politikası, gizlilik ilkeleri ile şikayet ve itirazların değerlendirilmesine ilişkin temel politika ve beyanları.",
  });
}

const politikaIkonlari = [
  <path key="p1" d="M12 3v18M3 7l9-4 9 4M5 7v6c0 2 1.5 3 3.5 3S12 15 12 13M12 13c0 2 1.5 3 3.5 3S19 15 19 13V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="p2" d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="p3" d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="p4" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z M12 7v4M12 14h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="p5" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="p6" d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
];

export default async function PolitikaVeBeyanlarSayfasi() {
  const icerik = await sayfaIcerigiGetir(YOL);
  const al = (anahtar: string) => alanDegeri(icerik, YOL, anahtar);

  const politikalar = [1, 2, 3, 4, 5, 6].map((i) => ({
    baslik: al(`pol-${i}-baslik`),
    metin: al(`pol-${i}-metin`),
    icon: politikaIkonlari[i - 1],
  }));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Politika ve Beyanlar", url: "/politika-ve-beyanlar" },
          ]),
        )}
      />

      <SayfaBaslik
        etiket="KURUMSAL"
        baslik="Politika ve Beyanlar"
        aciklama="Bağımsızlık, tarafsızlık ve gizlilik ilkelerimizi tanımlayan temel politika ve beyanlarımız."
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Politika ve Beyanlar" }]}
      />

      <KapakGorsel src="/gorseller/sayfalar/politika.webp" alt="DVN Cert politika ve beyanları" etiket="Tarafsızlık, gizlilik ve kalite ilkelerimiz" oncelik />

      <section className="dvn-reveal" style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="dvn-pol-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
          >
            {politikalar.map((p, i) => (
              <div
                key={i}
                className="dvn-pol-kart"
                style={{
                  background: "var(--dvn-gri-50)",
                  borderRadius: 14,
                  padding: "28px 26px",
                  border: "0.5px solid var(--dvn-gri-300)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div
                    className="dvn-pol-ikon"
                    style={{
                      flexShrink: 0,
                      width: 46,
                      height: 46,
                      borderRadius: 11,
                      background: "var(--dvn-gradient-lacivert)",
                      color: "var(--dvn-altin-acik)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 16px rgba(2,35,152,0.15)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      {p.icon}
                    </svg>
                  </div>
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                    {p.baslik}
                  </h3>
                </div>
                <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.75, margin: 0 }}>{p.metin}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              background: "var(--dvn-altin-soluk)",
              borderRadius: 12,
              padding: "18px 22px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" stroke="var(--dvn-altin)" strokeWidth="1.8" />
              <path d="M12 16v-4M12 8h.01" stroke="var(--dvn-altin)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: 13, color: "var(--dvn-gri-700)", margin: 0, lineHeight: 1.6 }}>
              Yukarıdaki metinler özet niteliğindedir. Onaylı ve güncel politika dokümanlarının tam metnine{" "}
              <Link href="/dokumanlar" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Dokümanlar</Link>{" "}
              bölümünden ulaşabilir veya{" "}
              <Link href="/iletisim" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>bizimle iletişime</Link>{" "}
              geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .dvn-pol-kart {
          position: relative;
          overflow: hidden;
          transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease, background 0.32s ease;
        }
        .dvn-pol-kart::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--dvn-gradient-turuncu);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .dvn-pol-kart:hover {
          transform: translateY(-5px);
          background: #fff;
          border-color: rgba(212,169,63,0.4);
          box-shadow: 0 18px 40px rgba(2,35,152,0.12);
        }
        .dvn-pol-kart:hover::before { transform: scaleX(1); }
        .dvn-pol-ikon { transition: transform 0.32s ease, background 0.32s ease; }
        .dvn-pol-kart:hover .dvn-pol-ikon { transform: scale(1.08) rotate(-3deg); }
        @media (max-width: 820px) {
          .dvn-pol-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
