import Link from "next/link";
import { sssSorular } from "@/lib/sss";

/**
 * Ana sayfa "Sıkça Sorulan Sorular" özeti.
 * İlk birkaç soruyu gösterir; tam liste ve FAQPage şeması /sss sayfasındadır
 * (şema mükerrer olmasın diye burada tekrar eklenmez).
 */
export default function AnaSayfaSSS() {
  const ozet = sssSorular.slice(0, 4);

  return (
    <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="dvn-bolum-etiket">SIKÇA SORULAN SORULAR</span>
          <h2 className="dvn-bolum-baslik" style={{ fontSize: 25 }}>
            Aklınızdaki sorular
          </h2>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {ozet.map((s, i) => (
            <details key={i} className="dvn-sss">
              <summary className="dvn-sss-baslik">
                <span className="dvn-sss-no" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span className="dvn-sss-soru">{s.soru}</span>
                <svg className="dvn-sss-ok" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 9l6 6 6-6" stroke="var(--dvn-turuncu)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="dvn-sss-cevap">
                <p>{s.cevap}</p>
              </div>
            </details>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link
            href="/sss"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              border: "0.5px solid var(--dvn-gri-300)",
              color: "var(--dvn-lacivert)",
              padding: "12px 24px",
              borderRadius: "var(--dvn-radius-md)",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Tüm soruları gör →
          </Link>
        </div>
      </div>

      <style>{`
        .dvn-sss {
          position: relative;
          background: #fff;
          border-radius: 14px;
          border: 1px solid var(--dvn-gri-300);
          overflow: hidden;
          box-shadow: var(--dvn-shadow-sm);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .dvn-sss::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: var(--dvn-gradient-turuncu);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s ease;
        }
        .dvn-sss[open] { border-color: rgba(212, 169, 63, 0.5); box-shadow: var(--dvn-shadow-md); }
        .dvn-sss[open]::before { transform: scaleY(1); }
        .dvn-sss-baslik {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 19px 22px;
          cursor: pointer;
          list-style: none;
          color: var(--dvn-lacivert);
        }
        .dvn-sss-baslik::-webkit-details-marker { display: none; }
        .dvn-sss-no {
          flex-shrink: 0;
          font-size: 14px;
          font-weight: 800;
          background: var(--dvn-gradient-altin);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .dvn-sss-soru {
          flex: 1;
          font-size: 15.5px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .dvn-sss-baslik:hover .dvn-sss-soru { color: var(--dvn-turuncu); }
        .dvn-sss-ok { flex-shrink: 0; transition: transform 0.25s ease; }
        .dvn-sss[open] .dvn-sss-ok { transform: rotate(180deg); }
        .dvn-sss-cevap { padding: 0 22px 22px 50px; }
        .dvn-sss-cevap p { font-size: 14px; color: var(--dvn-gri-500); line-height: 1.8; margin: 0; }
        @media (max-width: 600px) {
          .dvn-sss-cevap { padding-left: 22px; }
        }
      `}</style>
    </section>
  );
}
