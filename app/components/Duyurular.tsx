import Link from "next/link";
import { duyurular, tarihiBicimle } from "@/lib/duyurular";

export default function Duyurular() {
  const sonDuyurular = duyurular.slice(0, 3);

  return (
    <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Başlık satırı */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                color: "var(--dvn-turuncu)",
                fontWeight: 500,
                letterSpacing: "1.5px",
                margin: "0 0 8px",
              }}
            >
              DUYURULAR
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Güncel haberler ve gelişmeler
            </h2>
          </div>

          <Link
            href="/duyurular"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--dvn-turuncu)",
            }}
          >
            Tümünü gör
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Duyuru kartları */}
        <div
          className="dvn-duyuru-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {sonDuyurular.map((d) => (
            <Link
              key={d.slug}
              href={`/duyurular/${d.slug}`}
              className="dvn-duyuru-kart"
              style={{
                background: "white",
                borderRadius: 14,
                padding: "26px 24px",
                boxShadow: "0 4px 16px rgba(46,26,107,0.06)",
                border: "0.5px solid var(--dvn-gri-300)",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s ease",
              }}
            >
              {/* Üst: kategori + tarih */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--dvn-altin)",
                    background: "var(--dvn-altin-soluk)",
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                >
                  {d.kategori}
                </span>
                <span style={{ fontSize: 12, color: "var(--dvn-gri-500)" }}>{tarihiBicimle(d.tarih)}</span>
              </div>

              <h3
                style={{
                  color: "var(--dvn-lacivert)",
                  fontSize: 16,
                  fontWeight: 500,
                  margin: "0 0 10px",
                  lineHeight: 1.4,
                }}
              >
                {d.baslik}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--dvn-gri-500)",
                  lineHeight: 1.6,
                  margin: "0 0 18px",
                  flexGrow: 1,
                }}
              >
                {d.ozet}
              </p>

              <span
                style={{
                  fontSize: 13,
                  color: "var(--dvn-turuncu)",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Devamını oku
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dvn-duyuru-kart:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(46,26,107,0.12) !important;
        }
        @media (max-width: 900px) {
          .dvn-duyuru-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
