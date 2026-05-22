"use client";

import Link from "next/link";

const hizmetler = [
  {
    baslik: "Sistem Belgelendirme",
    aciklama: "ISO 9001, 14001, 45001 ve 50001 yönetim sistemleri belgelendirmesi ile kuruluşların uluslararası standartlara uyumunu değerlendiriyoruz.",
    link: "/hizmetler/sistem-belgelendirme",
    renk: "turkuaz",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke="#2dafb8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.84 0 3.55.55 4.98 1.5" stroke="#5dd4dc" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M22 4l-10 10-3-3" stroke="#ff8556" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "2. Taraf Denetimleri",
    aciklama: "Tedarikçi değerlendirmeleri ve müşteri odaklı denetimlerle işletmelerin süreçlerinin güvenilirliğini ve sürdürülebilirliğini sağlıyoruz.",
    link: "/hizmetler/2-taraf-denetimleri",
    renk: "turuncu",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#5dd4dc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="#ff8556" strokeWidth="1.8" />
        <path d="M9 14l2 2 4-4" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "Eğitim Hizmetleri",
    aciklama: "Yönetim sistemleri, iç denetçi ve uygulama eğitimleri ile kuruluşların yetkinliklerini geliştiriyor, sürekli iyileştirme kültürünü destekliyoruz.",
    link: "/egitimler",
    renk: "turkuaz",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="#5dd4dc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#ff8556" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Hizmetler() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, var(--dvn-gri-50) 0%, var(--dvn-gri-200) 100%)",
        padding: "60px 32px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p
            style={{
              fontSize: 11,
              color: "var(--dvn-turuncu)",
              fontWeight: 500,
              letterSpacing: "1.5px",
              margin: "0 0 8px",
            }}
          >
            HİZMETLERİMİZ
          </p>
          <h2
            style={{
              color: "var(--dvn-lacivert)",
              fontSize: 26,
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Kuruluşunuza değer katan profesyonel çözümler
          </h2>
        </div>

        <div
          className="dvn-hizmet-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {hizmetler.map((h, i) => (
            <Link
              key={i}
              href={h.link}
              className="dvn-hizmet-kart"
              style={{
                background: "white",
                borderRadius: 14,
                padding: "30px 26px",
                boxShadow: "0 4px 16px rgba(15,25,34,0.06)",
                position: "relative",
                overflow: "hidden",
                display: "block",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s ease",
                borderTop: h.renk === "turkuaz" ? "3px solid #2dafb8" : "3px solid #ff6b35",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 100,
                  height: 100,
                  background: h.renk === "turkuaz" ? "rgba(45,175,184,0.08)" : "rgba(255,107,53,0.08)",
                  borderRadius: "50%",
                }}
              />

              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--dvn-gradient-lacivert)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                  boxShadow: "0 6px 16px rgba(15,25,34,0.15)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {h.icon}
              </div>

              <h3
                style={{
                  color: "var(--dvn-lacivert)",
                  fontSize: 17,
                  margin: "0 0 10px",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {h.baslik}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--dvn-gri-500)",
                  lineHeight: 1.6,
                  margin: "0 0 16px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {h.aciklama}
              </p>

              <span
                style={{
                  fontSize: 13,
                  color: h.renk === "turkuaz" ? "var(--dvn-turkuaz)" : "var(--dvn-turuncu)",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Detayları gör
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dvn-hizmet-kart:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(15,25,34,0.12) !important;
        }
        @media (max-width: 900px) {
          .dvn-hizmet-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}