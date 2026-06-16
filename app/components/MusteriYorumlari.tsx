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

  const basHarfler = (isim: string) =>
    isim
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toLocaleUpperCase("tr-TR");

  return (
    <section className="dvn-yorum-bolum">
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaScript(yorumLd)} />

      <span className="dvn-glow-orb dvn-glow-orb--altin dvn-yorum-orb" aria-hidden />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="dvn-bolum-etiket">MÜŞTERİ YORUMLARI</span>
          <h2 className="dvn-bolum-baslik" style={{ fontSize: 28 }}>
            Bizimle çalışanlar ne diyor?
          </h2>
          {ortalama !== null && (
            <div className="dvn-yorum-puan-rozet">
              <div className="dvn-yorum-puan-yildiz" aria-hidden>
                {[1, 2, 3, 4, 5].map((n) => (
                  <svg key={n} width="17" height="17" viewBox="0 0 24 24" fill={n <= Math.round(ortalama) ? "var(--dvn-altin)" : "var(--dvn-gri-300)"}>
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.169L12 18.896l-7.335 3.868 1.401-8.169L.132 9.21l8.2-1.192z" />
                  </svg>
                ))}
              </div>
              <span>
                <strong>{ortalama.toFixed(1)}</strong> / 5 · {puanli.length} değerlendirme
              </span>
            </div>
          )}
        </div>

        <div className="dvn-yorum-grid">
          {musteriYorumlari.map((y, i) => (
            <article key={i} className="dvn-yorum-kart">
              <svg className="dvn-yorum-filigran" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c.2 0 .4 0 .6-.04C7.5 16.7 6 18 4 18.4c-.3.06-.5.34-.46.65.05.3.32.52.62.48C7.9 19 11 16 11 11.5V10.5C11 8 9 6 7.5 6zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c.2 0 .4 0 .6-.04C16.5 16.7 15 18 13 18.4c-.3.06-.5.34-.46.65.05.3.32.52.62.48C16.9 19 20 16 20 11.5V10.5C20 8 18 6 16.5 6z" />
              </svg>

              {typeof y.puan === "number" && (
                <div className="dvn-yorum-yildiz" aria-label={`${y.puan}/5 puan`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg key={n} width="16" height="16" viewBox="0 0 24 24" fill={n <= (y.puan as number) ? "var(--dvn-altin)" : "var(--dvn-gri-300)"} aria-hidden="true">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.169L12 18.896l-7.335 3.868 1.401-8.169L.132 9.21l8.2-1.192z" />
                    </svg>
                  ))}
                </div>
              )}

              <p className="dvn-yorum-metin">{y.yorum}</p>

              <div className="dvn-yorum-kisi">
                <span className="dvn-yorum-avatar" aria-hidden>{basHarfler(y.isim)}</span>
                <div>
                  <p className="dvn-yorum-isim">{y.isim}</p>
                  {y.kurum && <p className="dvn-yorum-kurum">{y.kurum}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .dvn-yorum-bolum {
          position: relative;
          overflow: hidden;
          padding: 70px 32px;
          background: linear-gradient(180deg, #ffffff 0%, var(--dvn-gri-50) 100%);
        }
        .dvn-yorum-orb {
          top: -140px;
          left: 50%;
          transform: translateX(-50%);
          width: 460px;
          height: 460px;
          opacity: 0.3;
        }
        .dvn-yorum-puan-rozet {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          padding: 8px 16px;
          background: #fff;
          border: 1px solid var(--dvn-gri-300);
          border-radius: 999px;
          box-shadow: var(--dvn-shadow-sm);
        }
        .dvn-yorum-puan-yildiz { display: flex; gap: 2px; }
        .dvn-yorum-puan-rozet span { font-size: 13.5px; color: var(--dvn-gri-500); }
        .dvn-yorum-puan-rozet strong { color: var(--dvn-lacivert); font-size: 15px; }

        .dvn-yorum-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .dvn-yorum-kart {
          position: relative;
          overflow: hidden;
          background: #fff;
          border-radius: 18px;
          padding: 30px 28px;
          border: 1px solid var(--dvn-gri-300);
          box-shadow: var(--dvn-shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .dvn-yorum-kart::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--dvn-gradient-altin);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .dvn-yorum-kart:hover {
          transform: translateY(-7px);
          box-shadow: 0 22px 48px rgba(2, 35, 152, 0.14);
          border-color: rgba(212, 169, 63, 0.4);
        }
        .dvn-yorum-kart:hover::before { transform: scaleX(1); }
        .dvn-yorum-filigran {
          position: absolute;
          top: 14px;
          right: 16px;
          width: 64px;
          height: 64px;
          color: var(--dvn-altin);
          opacity: 0.12;
          pointer-events: none;
        }
        .dvn-yorum-yildiz { display: flex; gap: 3px; position: relative; }
        .dvn-yorum-metin {
          font-size: 14.5px;
          color: var(--dvn-gri-700);
          line-height: 1.78;
          margin: 0;
          flex: 1;
          position: relative;
        }
        .dvn-yorum-kisi {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--dvn-gri-200);
        }
        .dvn-yorum-avatar {
          flex: 0 0 auto;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--dvn-gradient-lacivert);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 6px 16px rgba(2, 35, 152, 0.25);
        }
        .dvn-yorum-isim { font-size: 14.5px; font-weight: 600; color: var(--dvn-lacivert); margin: 0; }
        .dvn-yorum-kurum { font-size: 12.5px; color: var(--dvn-gri-500); margin: 2px 0 0; }

        @media (max-width: 900px) { .dvn-yorum-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .dvn-yorum-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
