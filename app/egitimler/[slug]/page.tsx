import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import KapakGorsel from "../../components/KapakGorsel";
import HizmetIkon from "../../components/HizmetIkon";
import IcerikMetin from "../../components/IcerikMetin";
import { egitimler, egitimGetir } from "@/lib/egitimler";
import { hizmetGetir } from "@/lib/hizmetler";
import { blogGetir } from "@/lib/blog";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";
import { courseSchema, breadcrumbSchema, faqSchema, schemaScript } from "@/lib/seo-schemas";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return egitimler.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const egitim = egitimGetir(slug);
  if (!egitim) return { title: "Eğitim bulunamadı" };

  return sayfaMetadataUret({
    yol: `/egitimler/${egitim.slug}`,
    title: egitim.seoTitle ?? egitim.baslik,
    description: egitim.seoAciklama ?? egitim.kisaAciklama,
  });
}

export default async function EgitimDetaySayfasi({ params }: Params) {
  const { slug } = await params;
  const egitim = egitimGetir(slug);
  if (!egitim) notFound();

  const ilgiliEgitimler = (egitim.ilgiliEgitimler ?? [])
    .map((s) => egitimGetir(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const ilgiliHizmet = egitim.ilgiliHizmet ? hizmetGetir(egitim.ilgiliHizmet) : undefined;
  const ilgiliBloglar = (egitim.ilgiliBloglar ?? [])
    .map((s) => blogGetir(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const kunye = [
    { etiket: "Süre", deger: egitim.sure },
    { etiket: "Yöntem", deger: "Online / Yüz yüze" },
    { etiket: "Katılım", deger: "Genel katılıma açık" },
    { etiket: "Belge", deger: "Katılım belgesi" },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          courseSchema({
            ad: egitim.baslik,
            aciklama: egitim.kisaAciklama,
            url: `/egitimler/${egitim.slug}`,
            sure: egitim.sure,
            yontemler: ["online", "onsite"],
          })
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Eğitimler", url: "/egitimler" },
            { ad: egitim.baslik, url: `/egitimler/${egitim.slug}` },
          ])
        )}
      />
      {egitim.sss.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(faqSchema(egitim.sss))}
        />
      )}

      <SayfaBaslik
        etiket={egitim.kod ?? egitim.standart}
        baslik={egitim.baslik}
        aciklama={egitim.kisaAciklama}
        kirintilar={[{ etiket: "Eğitimler", href: "/egitimler" }, { etiket: egitim.baslik }]}
      />

      <KapakGorsel alt={`${egitim.baslik} - DVN Cert eğitim programı`} ikon={egitim.ikon} etiket={egitim.baslik} oncelik />

      {/* Künye */}
      <section style={{ background: "white", padding: "40px 32px 0" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            className="dvn-kunye-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
          >
            {kunye.map((k) => (
              <div
                key={k.etiket}
                style={{ background: "var(--dvn-gri-50)", borderRadius: 12, padding: "16px 18px", border: "0.5px solid var(--dvn-gri-300)" }}
              >
                <p style={{ fontSize: 10.5, color: "var(--dvn-turuncu)", fontWeight: 600, letterSpacing: "1px", margin: "0 0 6px", textTransform: "uppercase" }}>
                  {k.etiket}
                </p>
                <p style={{ fontSize: 14, color: "var(--dvn-lacivert)", fontWeight: 600, margin: 0, lineHeight: 1.35 }}>{k.deger}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tanıtım */}
      <section style={{ background: "white", padding: "36px 32px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <IcerikMetin metin={egitim.giris} paragrafStil={{ margin: "0 0 18px" }} />
        </div>
      </section>

      {/* Kazanımlar */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              KAZANIMLAR
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Eğitim sonunda neler yapabileceksiniz?
            </h2>
          </div>
          <div className="dvn-fayda-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {egitim.kazanimlar.map((k, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "white", borderRadius: 12, padding: "18px 20px", border: "0.5px solid var(--dvn-gri-300)" }}
              >
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--dvn-altin-soluk)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="var(--dvn-altin)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.55 }}>{k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eğitim içeriği (konular) */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              EĞİTİM İÇERİĞİ
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              İşlenen konular
            </h2>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {egitim.konular.map((k, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", background: "var(--dvn-altin)", marginTop: 9 }} />
                <span style={{ fontSize: 15, color: "var(--dvn-gri-700)", lineHeight: 1.7 }}>{k}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 32, background: "var(--dvn-gri-50)", borderRadius: 12, padding: "20px 22px", border: "0.5px solid var(--dvn-gri-300)" }}>
            <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>Kimler katılabilir?</h3>
            <p style={{ fontSize: 14, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: "0 0 10px" }}>{egitim.kimlerKatilabilir}</p>
            <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--dvn-lacivert)" }}>Ön koşul:</strong> {egitim.onKosul}
            </p>
          </div>
        </div>
      </section>

      {/* İlgili eğitimler */}
      {ilgiliEgitimler.length > 0 && (
        <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                İLGİLİ EĞİTİMLER
              </p>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                Eğitim yolculuğunuza devam edin
              </h2>
            </div>
            <div className="dvn-std-kart-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {ilgiliEgitimler.map((e) => (
                <Link
                  key={e.slug}
                  href={`/egitimler/${e.slug}`}
                  className="dvn-std-kart"
                  style={{ display: "flex", gap: 14, background: "white", borderRadius: 14, padding: "20px 22px", border: "0.5px solid var(--dvn-gri-300)", textDecoration: "none", color: "inherit", transition: "all 0.3s ease" }}
                >
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 11, background: "var(--dvn-altin-soluk)", color: "var(--dvn-altin)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <HizmetIkon ad={e.ikon} size={22} />
                  </div>
                  <div>
                    <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 14.5, fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3 }}>{e.baslik}</h3>
                    <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", lineHeight: 1.5, margin: 0 }}>{e.sure} · {e.seviye}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SSS */}
      {egitim.sss.length > 0 && (
        <section style={{ background: "white", padding: "60px 32px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
                SIKÇA SORULAN SORULAR
              </p>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                {egitim.baslik} hakkında merak edilenler
              </h2>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {egitim.sss.map((s, i) => (
                <details key={i} className="dvn-sss" style={{ background: "var(--dvn-gri-50)", borderRadius: 12, border: "0.5px solid var(--dvn-gri-300)", overflow: "hidden" }}>
                  <summary className="dvn-sss-baslik" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 22px", cursor: "pointer", fontSize: 15.5, fontWeight: 500, color: "var(--dvn-lacivert)", listStyle: "none" }}>
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
            </div>
          </div>
        </section>
      )}

      {/* İlgili hizmet + bloglar */}
      {(ilgiliHizmet || ilgiliBloglar.length > 0) && (
        <section style={{ background: "var(--dvn-gri-50)", padding: "50px 32px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 10 }}>
            {ilgiliHizmet && (
              <Link
                href={`/hizmetler/${ilgiliHizmet.slug}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "var(--dvn-lacivert)", background: "white", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 999, padding: "8px 16px", textDecoration: "none" }}
              >
                {ilgiliHizmet.baslik} →
              </Link>
            )}
            {ilgiliBloglar.map((b) => (
              <Link
                key={b.slug}
                href={`/blog/${b.slug}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "var(--dvn-lacivert)", background: "white", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 999, padding: "8px 16px", textDecoration: "none" }}
              >
                {b.baslik} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "0 32px 70px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", background: "var(--dvn-gradient-lacivert)", borderRadius: 18, padding: "40px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <h2 style={{ color: "white", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>{egitim.baslik} tarihlerini öğrenin</h2>
            <p style={{ color: "#9aa5b1", fontSize: 13.5, margin: 0 }}>Genel katılıma açık eğitim tarihlerimiz ve kayıt için bizimle iletişime geçin.</p>
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
        .dvn-std-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(2,35,152,0.1) !important; }
        .dvn-sss-baslik::-webkit-details-marker { display: none; }
        .dvn-sss[open] .dvn-sss-ok { transform: rotate(180deg); }
        .dvn-sss-ok { transition: transform 0.22s ease; }
        .dvn-sss[open] { border-color: var(--dvn-altin) !important; }
        .dvn-sss-baslik:hover { color: var(--dvn-turuncu) !important; }
        @media (max-width: 820px) {
          .dvn-fayda-grid { grid-template-columns: 1fr !important; }
          .dvn-std-kart-grid { grid-template-columns: 1fr !important; }
          .dvn-kunye-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
