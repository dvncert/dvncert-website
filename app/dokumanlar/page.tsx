import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { dokumanlariGetir } from "@/lib/faz2-icerik";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";
import { breadcrumbSchema, collectionPageSchema, schemaScript } from "@/lib/seo-schemas";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/dokumanlar",
    title: "Dökümanlar",
    description:
      "DVN Cert belgelendirme politikaları, talimatları, prosedürleri ve başvuru formları. İhtiyaç duyduğunuz dokümanlara bu sayfadan ulaşabilirsiniz.",
  });
}

const tipRenkleri: Record<string, { arka: string; metin: string }> = {
  PDF: { arka: "#fdecea", metin: "#d93025" },
  DOCX: { arka: "#e8f0fe", metin: "#1a73e8" },
  XLSX: { arka: "#e6f4ea", metin: "#188038" },
};

export default async function DokumanlarSayfasi() {
  const liste = await dokumanlariGetir();
  // Kategoriye göre grupla, kategori sırası giriş sırasına göre
  const gruplar = new Map<string, typeof liste>();
  for (const d of liste) {
    const mevcut = gruplar.get(d.kategori) ?? [];
    mevcut.push(d);
    gruplar.set(d.kategori, mevcut);
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Dökümanlar", url: "/dokumanlar" },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          collectionPageSchema({
            baslik: "Dökümanlar",
            aciklama: "DVN Cert belgelendirme politikaları, talimatları, prosedürleri ve başvuru formları.",
            url: "/dokumanlar",
          }),
        )}
      />

      <SayfaBaslik
        etiket="NEDEN DVN CERT"
        baslik="Dökümanlar"
        aciklama="Belgelendirme süreçlerimize ilişkin politika, talimat, prosedür ve formlar."
        kirintilar={[{ etiket: "Neden DVN Cert" }, { etiket: "Dökümanlar" }]}
      />

      <KapakGorsel alt="DVN Cert belgelendirme dökümanları" etiket="Politika, prosedür, talimat ve formlar" oncelik />

      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div
            style={{
              background: "var(--dvn-altin-soluk)",
              borderRadius: 12,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 36,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" stroke="var(--dvn-altin)" strokeWidth="1.8" />
              <path d="M12 16v-4M12 8h.01" stroke="var(--dvn-altin)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: 13, color: "var(--dvn-gri-700)", margin: 0, lineHeight: 1.6 }}>
              Doküman dosyaları en güncel revizyonlarıyla yayımlanmaktadır. İhtiyacınız olan bir dokümana
              ulaşamıyorsanız{" "}
              <Link href="/iletisim" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>bizimle iletişime</Link>{" "}
              geçebilirsiniz.
            </p>
          </div>

          {gruplar.size === 0 ? (
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 14, textAlign: "center", fontStyle: "italic" }}>
              Henüz doküman yayımlanmadı.
            </p>
          ) : (
            Array.from(gruplar.entries()).map(([kategori, dokumanlar]) => (
              <div key={kategori} style={{ marginBottom: 36 }}>
                <h2
                  style={{
                    fontSize: 13,
                    color: "var(--dvn-turuncu)",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    margin: "0 0 14px",
                  }}
                >
                  {kategori}
                </h2>

                <div style={{ display: "grid", gap: 10 }}>
                  {dokumanlar.map((d) => {
                    const renk = tipRenkleri[d.tip] ?? { arka: "var(--dvn-gri-100)", metin: "var(--dvn-gri-700)" };
                    return (
                      <div
                        key={d.id}
                        className="dvn-dok-satir"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          background: "var(--dvn-gri-50)",
                          border: "0.5px solid var(--dvn-gri-300)",
                          borderRadius: 12,
                          padding: "16px 18px",
                        }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            width: 48,
                            height: 48,
                            borderRadius: 10,
                            background: renk.arka,
                            color: renk.metin,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10.5,
                            fontWeight: 700,
                            letterSpacing: "0.3px",
                          }}
                        >
                          {d.tip}
                        </span>

                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 14.5, fontWeight: 500, color: "var(--dvn-lacivert)", margin: "0 0 2px", lineHeight: 1.4 }}>
                            {d.baslik}
                          </p>
                          <p style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", margin: 0 }}>{d.kod}</p>
                          {d.aciklama && <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "4px 0 0", lineHeight: 1.5 }}>{d.aciklama}</p>}
                        </div>

                        {d.dosya ? (
                          <a
                            href={d.dosya}
                            download={d.dosyaAdi || undefined}
                            className="dvn-dok-indir"
                            style={{
                              flexShrink: 0,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              background: "var(--dvn-gradient-turuncu)",
                              color: "white",
                              padding: "9px 16px",
                              borderRadius: "var(--dvn-radius-md)",
                              fontWeight: 500,
                              fontSize: 12.5,
                              textDecoration: "none",
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            İndir
                          </a>
                        ) : (
                          <span
                            style={{
                              flexShrink: 0,
                              fontSize: 12,
                              fontWeight: 500,
                              color: "var(--dvn-gri-500)",
                              background: "var(--dvn-gri-200)",
                              border: "0.5px solid var(--dvn-gri-300)",
                              padding: "8px 14px",
                              borderRadius: "var(--dvn-radius-md)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Yakında
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 560px) {
          .dvn-dok-satir { flex-wrap: wrap; }
          .dvn-dok-satir .dvn-dok-indir { width: 100%; justify-content: center; }
        }
      `}</style>
    </main>
  );
}
