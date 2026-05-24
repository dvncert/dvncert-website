import { siteConfig } from "@/lib/site-config";
import { yorumlariGetir } from "@/lib/icerik";
import { schemaScript } from "@/lib/seo-schemas";

/**
 * Ana sayfa "Müşteri Yorumları" bölümü.
 *
 * Veri lib/yorumlar.ts'ten gelir. Liste boşken bölüm RENDER EDİLMEZ ve hiçbir
 * şema üretilmez (sahte yorum yok). Puanı olan yorumlar AggregateRating'e dahil
 * edilir. Review/AggregateRating, Organization (@id) üzerine eklenir.
 *
 * Not: Google, kuruluşun kendi sitesinde topladığı "kendi kendine" yorumlar için
 * zengin sonuç (yıldız) göstermeyebilir; şema yine de geçerli ve standarda uygundur.
 */
export default async function MusteriYorumlari() {
  const musteriYorumlari = await yorumlariGetir();
  if (musteriYorumlari.length === 0) return null;

  const puanli = musteriYorumlari.filter((y) => typeof y.puan === "number");
  const ortalama =
    puanli.length > 0
      ? Number((puanli.reduce((t, y) => t + (y.puan as number), 0) / puanli.length).toFixed(1))
      : null;

  const yorumLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    ...(ortalama !== null
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: ortalama,
            reviewCount: puanli.length,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    review: musteriYorumlari.map((y) => ({
      "@type": "Review",
      author: { "@type": "Person", name: y.isim },
      reviewBody: y.yorum,
      ...(typeof y.puan === "number"
        ? { reviewRating: { "@type": "Rating", ratingValue: y.puan, bestRating: 5, worstRating: 1 } }
        : {}),
      ...(y.tarih ? { datePublished: y.tarih } : {}),
    })),
  };

  return (
    <section style={{ background: "white", padding: "60px 32px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(yorumLd)} />

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="dvn-bolum-etiket">MÜŞTERİ YORUMLARI</span>
          <h2 className="dvn-bolum-baslik" style={{ fontSize: 25 }}>
            Bizimle çalışanlar ne diyor?
          </h2>
          {ortalama !== null && (
            <p style={{ margin: "10px 0 0", color: "var(--dvn-gri-500)", fontSize: 13.5 }}>
              Ortalama puan{" "}
              <strong style={{ color: "var(--dvn-lacivert)" }}>{ortalama.toFixed(1)}</strong> / 5
              {" · "}
              {puanli.length} değerlendirme
            </p>
          )}
        </div>

        <div
          className="dvn-yorum-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {musteriYorumlari.map((y, i) => (
            <div
              key={i}
              style={{
                background: "var(--dvn-gri-50)",
                borderRadius: 14,
                padding: "26px 26px",
                border: "0.5px solid var(--dvn-gri-300)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Tırnak işareti */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--dvn-altin)" style={{ opacity: 0.85 }} aria-hidden="true">
                <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c.2 0 .4 0 .6-.04C7.5 16.7 6 18 4 18.4c-.3.06-.5.34-.46.65.05.3.32.52.62.48C7.9 19 11 16 11 11.5V10.5C11 8 9 6 7.5 6zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c.2 0 .4 0 .6-.04C16.5 16.7 15 18 13 18.4c-.3.06-.5.34-.46.65.05.3.32.52.62.48C16.9 19 20 16 20 11.5V10.5C20 8 18 6 16.5 6z" />
              </svg>

              {typeof y.puan === "number" && (
                <div style={{ display: "flex", gap: 3 }} aria-label={`${y.puan}/5 puan`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg key={n} width="16" height="16" viewBox="0 0 24 24" fill={n <= (y.puan as number) ? "var(--dvn-altin)" : "var(--dvn-gri-300)"} aria-hidden="true">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.169L12 18.896l-7.335 3.868 1.401-8.169L.132 9.21l8.2-1.192z" />
                    </svg>
                  ))}
                </div>
              )}

              <p style={{ fontSize: 14.5, color: "var(--dvn-gri-700)", lineHeight: 1.75, margin: 0, flex: 1 }}>
                {y.yorum}
              </p>

              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-lacivert)", margin: 0 }}>{y.isim}</p>
                {y.kurum && (
                  <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "2px 0 0" }}>{y.kurum}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .dvn-yorum-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .dvn-yorum-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
