import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const guclerimiz = [
  "Bağımsız ve tarafsız değerlendirme",
  "Akreditasyon durumu hakkında açık bilgilendirme",
  "Uzman ve deneyimli denetçi kadrosu",
  "Şeffaf, izlenebilir ve hızlı süreç",
];

export default function Hakkimizda() {
  return (
    <section style={{ background: "white", padding: "60px 32px" }}>
      <div
        className="dvn-hakkimizda-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Sol kolon: metin + güçler + CTA */}
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
            KURUMSAL
          </p>
          <h2
            style={{
              color: "var(--dvn-lacivert)",
              fontSize: 26,
              fontWeight: 500,
              margin: "0 0 16px",
              lineHeight: 1.3,
            }}
          >
            Belgelendirme kararlarında açık kriterler ve{" "}
            <span className="dvn-gradyan-metin--koyu">izlenebilir kayıtlar</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--dvn-gri-500)",
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}
          >
            {siteConfig.aciklamaUzun}
          </p>

          <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "grid", gap: 12 }}>
            {guclerimiz.map((g, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "var(--dvn-altin-soluk)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="var(--dvn-altin)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span style={{ fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.5 }}>{g}</span>
              </li>
            ))}
          </ul>

          <Link href="/hakkimizda" className="dvn-btn-primary">
            Daha fazla bilgi
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Sağ kolon: akreditasyon durumu kartı */}
        <div className="dvn-hakkimizda-kart">
          <div className="dvn-grid-desen" aria-hidden style={{ opacity: 0.5 }} />
          <span className="dvn-glow-orb dvn-glow-orb--altin dvn-hakkimizda-orb" aria-hidden />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: 11,
                color: "var(--dvn-altin-acik)",
                fontWeight: 500,
                letterSpacing: "1.5px",
                margin: "0 0 6px",
              }}
            >
              AKREDİTASYON DURUMU
            </p>
            <h3 style={{ color: "white", fontSize: 19, fontWeight: 500, margin: "0 0 4px", lineHeight: 1.3 }}>
              {siteConfig.akreditasyon.kurulus} süreci takip ediliyor
            </h3>
            <p style={{ fontSize: 12.5, color: "#9aa5b1", margin: "0 0 22px", lineHeight: 1.6 }}>
              {siteConfig.akreditasyon.not}
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              {siteConfig.akreditasyon.hedefKapsam.map((standart, i) => (
                <div
                  key={i}
                  data-standart
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(255,255,255,0.06)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "var(--dvn-gradient-altin)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2l8 4v6c0 5.5-3.5 10-8 12-4.5-2-8-6.5-8-12V6l8-4z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: "white" }}>{standart}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dvn-hakkimizda-kart {
          position: relative;
          overflow: hidden;
          background: var(--dvn-gradient-lacivert);
          border-radius: 18px;
          padding: 34px 30px;
          color: #fff;
          box-shadow: 0 18px 50px rgba(2, 35, 152, 0.26), 0 0 0 1px rgba(212, 169, 63, 0.16);
          animation: dvn-float 9s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .dvn-hakkimizda-kart { animation: none; }
        }
        .dvn-hakkimizda-orb {
          top: -120px;
          right: -90px;
          width: 280px;
          height: 280px;
          opacity: 0.5;
        }
        .dvn-hakkimizda-kart [data-standart] {
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .dvn-hakkimizda-kart [data-standart]:hover {
          background: rgba(255, 255, 255, 0.12) !important;
          transform: translateX(4px);
        }
        @media (max-width: 900px) {
          .dvn-hakkimizda-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
