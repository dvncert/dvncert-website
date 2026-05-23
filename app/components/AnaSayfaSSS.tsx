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
            <details
              key={i}
              className="dvn-sss"
              style={{ background: "white", borderRadius: 12, border: "0.5px solid var(--dvn-gri-300)", overflow: "hidden" }}
            >
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
        .dvn-sss-baslik::-webkit-details-marker { display: none; }
        .dvn-sss[open] .dvn-sss-ok { transform: rotate(180deg); }
        .dvn-sss-ok { transition: transform 0.22s ease; }
        .dvn-sss[open] { border-color: var(--dvn-altin) !important; }
        .dvn-sss-baslik:hover { color: var(--dvn-turuncu) !important; }
      `}</style>
    </section>
  );
}
