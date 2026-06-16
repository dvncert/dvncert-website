import Link from "next/link";
import { yaklasanEtkinlikleriGetir, etkinlikTarihBicim } from "@/lib/etkinlikler";

export default async function EgitimEtkinlikleri() {
  const etkinlikler = await yaklasanEtkinlikleriGetir(3);
  if (etkinlikler.length === 0) return null;

  return (
    <section style={{ background: "white", padding: "60px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
              YAKLAŞAN ETKİNLİKLER
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Eğitim, seminer ve webinarlar
            </h2>
          </div>

          <Link
            href="/etkinlikler"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--dvn-turuncu)",
            }}
          >
            Tüm etkinlikler
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div
          className="dvn-etkinlik-grid"
          style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(etkinlikler.length, 3)}, 1fr)`, gap: 20 }}
        >
          {etkinlikler.map((e) => (
            <Link
              key={e.slug}
              href={`/etkinlikler/${e.slug}`}
              className="dvn-etkinlik-kart"
              style={{
                background: "var(--dvn-gri-50)",
                borderRadius: 14,
                padding: "26px 24px",
                border: "0.5px solid var(--dvn-gri-300)",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--dvn-turuncu)",
                    background: "var(--dvn-turuncu-soluk)",
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                >
                  {e.kategori}
                </span>
                {e.ucretli ? (
                  <span style={{ fontSize: 11, color: "var(--dvn-gri-500)" }}>Ücretli</span>
                ) : (
                  <span style={{ fontSize: 11, color: "#15803d", fontWeight: 500 }}>Ücretsiz</span>
                )}
              </div>

              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
                {e.baslik}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: "var(--dvn-gri-700)", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  {etkinlikTarihBicim(e.baslangic, { saatGoster: true })}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                  {e.yer}
                </div>
              </div>

              <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: "0 0 18px", flexGrow: 1 }}>
                {e.ozet}
              </p>

              <span style={{ fontSize: 13, color: "var(--dvn-turuncu)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
                Detaylar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dvn-etkinlik-kart {
          position: relative;
          overflow: hidden;
        }
        .dvn-etkinlik-kart::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--dvn-gradient-altin);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .dvn-etkinlik-kart:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 38px rgba(2,35,152,0.14) !important;
          border-color: rgba(212,169,63,0.4) !important;
          background: #fff !important;
        }
        .dvn-etkinlik-kart:hover::before { transform: scaleX(1); }
        @media (max-width: 900px) {
          .dvn-etkinlik-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
