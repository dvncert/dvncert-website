"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slaytlar = [
  {
    rozet: "TÜRKAK akreditasyon kapsamında belgelendirme",
    rozetRenk: "turkuaz",
    baslik: "TÜRKAK akreditasyonu ile",
    baslikVurgu: "güvence",
    baslikSon: "altında belgelendirme",
    aciklama: "DVN Cert, akreditasyon kapsamındaki yönetim sistemi belgelendirme faaliyetlerini bağımsızlık, tarafsızlık ve yetkinlik esaslarına uygun olarak yürütür.",
    buton1: { yazi: "Akreditasyon kapsamımız", link: "/akreditasyonlarimiz", renk: "turuncu" },
    buton2: { yazi: "Hizmetlerimiz", link: "/hizmetler" },
    gorselTip: "akreditasyon",
  },
  {
    rozet: "Şeffaf ve doğrulanabilir belgelendirme",
    rozetRenk: "turuncu",
    baslik: "Belgelerinizi",
    baslikVurgu: "online",
    baslikSon: "olarak sorgulayın",
    aciklama: "DVN Cert tarafından düzenlenen belgeler, belge numarası üzerinden dijital olarak doğrulanabilir; müşterileriniz ve paydaşlarınız belge geçerliliğini hızlıca kontrol edebilir.",
    buton1: { yazi: "Belge sorgula", link: "/sertifika-sorgula", renk: "turkuaz" },
    buton2: { yazi: "Nasıl çalışır?", link: "/hakkimizda" },
    gorselTip: "sorgulama",
  },
  {
    rozet: "Tedarik zinciri yönetimi",
    rozetRenk: "turkuaz",
    baslik: "Tedarikçi ve",
    baslikVurgu: "2. taraf",
    baslikSon: "denetimlerinde uzman yaklaşım",
    aciklama: "Tedarik zincirinizde kalite, çevre, iş sağlığı ve güvenliği, enerji yönetimi ve sektörel uygunluk kriterlerini objektif denetimlerle değerlendiriyoruz.",
    buton1: { yazi: "2. taraf denetimleri", link: "/hizmetler/2-taraf-denetimleri", renk: "turuncu" },
    buton2: { yazi: "Teklif al", link: "https://dbys.dvncert.com/basvuru" },
    gorselTip: "denetim",
  },
];

// Slayt 1 - Akreditasyon Mockup (sertifika kartı + kalkan)
function AkreditasyonMockup() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 320" fill="none" style={{ maxWidth: 380 }}>
      {/* Arkaplan glow */}
      <circle cx="180" cy="160" r="140" fill="url(#glow1)" opacity="0.4" />
      <defs>
        <radialGradient id="glow1">
          <stop offset="0%" stopColor="#2dafb8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2dafb8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
      </defs>

      {/* Arka sertifika kartı */}
      <g transform="translate(60, 50) rotate(-6 130 90)">
        <rect width="240" height="160" rx="12" fill="rgba(45,175,184,0.08)" stroke="rgba(45,175,184,0.25)" strokeWidth="1" />
      </g>

      {/* Orta sertifika kartı */}
      <g transform="translate(70, 70)">
        <rect width="240" height="180" rx="14" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

        {/* Başlık şeridi */}
        <rect x="20" y="20" width="80" height="6" rx="3" fill="#ff6b35" />
        <text x="20" y="50" fill="#ffffff" fontFamily="Calibri" fontSize="13" fontWeight="500">CERTIFICATE</text>
        <text x="20" y="68" fill="#5dd4dc" fontFamily="Calibri" fontSize="10" letterSpacing="1">ISO 9001 : 2015</text>

        {/* Satırlar */}
        <rect x="20" y="85" width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
        <rect x="20" y="95" width="120" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
        <rect x="20" y="105" width="140" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />

        {/* Mühür - akreditasyon işareti */}
        <g transform="translate(170, 120)">
          <circle cx="0" cy="0" r="28" stroke="#ff6b35" strokeWidth="2" fill="rgba(255,107,53,0.12)" />
          <circle cx="0" cy="0" r="22" stroke="#ff6b35" strokeWidth="1" fill="none" />
          <path d="M-8 0 L-2 6 L8 -6" stroke="#ff8556" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="0" y="-32" textAnchor="middle" fill="#ff8556" fontFamily="Calibri" fontSize="7" fontWeight="500" letterSpacing="0.5">TÜRKAK</text>
        </g>

        {/* QR kod */}
        <g transform="translate(20, 130)">
          <rect width="30" height="30" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="3" y="3" width="6" height="6" fill="#ffffff" opacity="0.7" />
          <rect x="21" y="3" width="6" height="6" fill="#ffffff" opacity="0.7" />
          <rect x="3" y="21" width="6" height="6" fill="#ffffff" opacity="0.7" />
          <rect x="12" y="12" width="6" height="6" fill="#ffffff" opacity="0.7" />
        </g>
      </g>

      {/* Üstte kalkan dekoratif */}
      <g transform="translate(280, 30)">
        <path d="M0 0 L20 -8 L40 0 L40 20 Q40 35 20 42 Q0 35 0 20 Z" fill="rgba(45,175,184,0.2)" stroke="#5dd4dc" strokeWidth="1.5" />
        <path d="M12 18 L18 24 L28 12" stroke="#5dd4dc" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// Slayt 2 - Sorgulama Mockup (laptop ekranı + form)
function SorgulamaMockup() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 320" fill="none" style={{ maxWidth: 380 }}>
      <defs>
        <radialGradient id="glow2">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
      </defs>

      <circle cx="180" cy="160" r="140" fill="url(#glow2)" opacity="0.5" />

      {/* Laptop alt taban */}
      <ellipse cx="180" cy="270" rx="160" ry="6" fill="rgba(0,0,0,0.3)" />
      <path d="M40 265 L320 265 L300 275 L60 275 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" />

      {/* Ekran */}
      <rect x="60" y="60" width="240" height="160" rx="6" fill="rgba(15,25,34,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <rect x="60" y="60" width="240" height="18" rx="6" fill="rgba(255,255,255,0.08)" />
      <circle cx="72" cy="69" r="2.5" fill="#ff6b35" />
      <circle cx="80" cy="69" r="2.5" fill="#5dd4dc" opacity="0.6" />
      <circle cx="88" cy="69" r="2.5" fill="rgba(255,255,255,0.3)" />

      {/* İçerik */}
      <text x="76" y="100" fill="#5dd4dc" fontFamily="Calibri" fontSize="9" letterSpacing="1">BELGE SORGULAMA</text>
      <text x="76" y="120" fill="#ffffff" fontFamily="Calibri" fontSize="14" fontWeight="500">Sertifika numaranızı girin</text>

      {/* Input */}
      <rect x="76" y="135" width="160" height="22" rx="4" fill="rgba(255,255,255,0.95)" />
      <text x="84" y="150" fill="#0f1922" fontFamily="Calibri" fontSize="10">DVN-2026-00284</text>

      {/* Sorgula butonu */}
      <rect x="240" y="135" width="48" height="22" rx="4" fill="#ff6b35" />
      <text x="264" y="150" textAnchor="middle" fill="#ffffff" fontFamily="Calibri" fontSize="9" fontWeight="500">Sorgula</text>

      {/* Sonuç - başarılı */}
      <rect x="76" y="170" width="212" height="38" rx="6" fill="rgba(45,175,184,0.18)" stroke="rgba(45,175,184,0.4)" strokeWidth="1" />
      <circle cx="92" cy="189" r="9" fill="#2dafb8" />
      <path d="M88 189 L91 192 L97 186" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="108" y="186" fill="#ffffff" fontFamily="Calibri" fontSize="10" fontWeight="500">Belge geçerlidir</text>
      <text x="108" y="198" fill="#94a3b8" fontFamily="Calibri" fontSize="8">ISO 9001:2015 - Geçerlilik: 12.04.2027</text>

      {/* Mobil cihaz - sağ üstte */}
      <g transform="translate(280, 30)">
        <rect width="36" height="56" rx="6" fill="rgba(45,175,184,0.15)" stroke="rgba(45,175,184,0.4)" strokeWidth="1" />
        <rect x="3" y="6" width="30" height="38" rx="2" fill="rgba(15,25,34,0.6)" />
        <circle cx="18" cy="50" r="2" fill="rgba(255,255,255,0.4)" />
        {/* Ekranda check */}
        <circle cx="18" cy="25" r="6" fill="#ff6b35" />
        <path d="M15 25 L17 27 L21 23" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Slayt 3 - Denetim Mockup (tablet + checklist + fabrika silueti)
function DenetimMockup() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 320" fill="none" style={{ maxWidth: 380 }}>
      <defs>
        <radialGradient id="glow3">
          <stop offset="0%" stopColor="#2dafb8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2dafb8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="180" cy="160" r="140" fill="url(#glow3)" opacity="0.4" />

      {/* Arka fabrika silueti */}
      <g opacity="0.25">
        <rect x="40" y="180" width="40" height="80" fill="#5dd4dc" />
        <rect x="80" y="160" width="50" height="100" fill="#5dd4dc" />
        <rect x="130" y="190" width="35" height="70" fill="#5dd4dc" />
        <polygon points="80,160 105,140 130,160" fill="#5dd4dc" />
        <rect x="50" y="130" width="6" height="55" fill="#5dd4dc" />
        <rect x="92" y="115" width="6" height="50" fill="#5dd4dc" />
      </g>

      {/* Tablet */}
      <g transform="translate(140, 50)">
        <rect width="180" height="220" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <rect x="10" y="14" width="160" height="190" rx="6" fill="rgba(15,25,34,0.6)" />

        {/* Başlık */}
        <text x="20" y="36" fill="#5dd4dc" fontFamily="Calibri" fontSize="9" letterSpacing="1">DENETİM KONTROLÜ</text>
        <text x="20" y="54" fill="#ffffff" fontFamily="Calibri" fontSize="13" fontWeight="500">Tedarikçi denetimi</text>

        {/* Progress */}
        <rect x="20" y="64" width="140" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="20" y="64" width="95" height="4" rx="2" fill="#ff6b35" />
        <text x="20" y="78" fill="#94a3b8" fontFamily="Calibri" fontSize="8">12 / 18 madde tamamlandı</text>

        {/* Checklist maddeleri */}
        <g transform="translate(20, 88)">
          <circle cx="6" cy="6" r="6" fill="#2dafb8" />
          <path d="M3 6 L5 8 L9 4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text x="20" y="9" fill="#ffffff" fontFamily="Calibri" fontSize="10">Kalite politikası</text>
        </g>
        <g transform="translate(20, 108)">
          <circle cx="6" cy="6" r="6" fill="#2dafb8" />
          <path d="M3 6 L5 8 L9 4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text x="20" y="9" fill="#ffffff" fontFamily="Calibri" fontSize="10">İSG prosedürleri</text>
        </g>
        <g transform="translate(20, 128)">
          <circle cx="6" cy="6" r="6" fill="#2dafb8" />
          <path d="M3 6 L5 8 L9 4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text x="20" y="9" fill="#ffffff" fontFamily="Calibri" fontSize="10">Çevre kontrolleri</text>
        </g>
        <g transform="translate(20, 148)">
          <circle cx="6" cy="6" r="6" fill="rgba(255,255,255,0.15)" stroke="#ff6b35" strokeWidth="1.5" />
          <text x="20" y="9" fill="#ffffff" fontFamily="Calibri" fontSize="10">Tedarikçi kayıtları</text>
        </g>
        <g transform="translate(20, 168)">
          <circle cx="6" cy="6" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <text x="20" y="9" fill="#94a3b8" fontFamily="Calibri" fontSize="10">Risk analizi</text>
        </g>

        {/* Buton */}
        <rect x="20" y="184" width="140" height="14" rx="3" fill="#ff6b35" opacity="0.9" />
        <text x="90" y="194" textAnchor="middle" fill="white" fontFamily="Calibri" fontSize="8" fontWeight="500">Raporu Tamamla</text>
      </g>

      {/* Sol üstte rozet */}
      <g transform="translate(40, 50)">
        <circle cx="20" cy="20" r="18" fill="rgba(255,107,53,0.18)" stroke="#ff6b35" strokeWidth="1.5" />
        <text x="20" y="17" textAnchor="middle" fill="#ff8556" fontFamily="Calibri" fontSize="7" fontWeight="500">2.TARAF</text>
        <text x="20" y="27" textAnchor="middle" fill="#ff8556" fontFamily="Calibri" fontSize="7" fontWeight="500">DENETİM</text>
      </g>
    </svg>
  );
}

export default function HeroSlider() {
  const [aktif, setAktif] = useState(0);
  const [duraklat, setDuraklat] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!duraklat) {
        setAktif((onceki) => (onceki + 1) % slaytlar.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [duraklat]);

  const slayt = slaytlar[aktif];

  return (
    <>
      <section
        onMouseEnter={() => setDuraklat(true)}
        onMouseLeave={() => setDuraklat(false)}
        style={{
          background: "var(--dvn-gradient-hero)",
          padding: "56px 32px 80px",
          position: "relative",
          overflow: "hidden",
          minHeight: 420,
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, border: "1px solid rgba(45,175,184,0.12)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: 20, right: 50, width: 220, height: 220, border: "1px solid rgba(255,107,53,0.10)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div
            key={aktif}
            className="dvn-slayt dvn-fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: slayt.rozetRenk === "turkuaz" ? "rgba(45,175,184,0.15)" : "rgba(255,107,53,0.15)",
                  color: slayt.rozetRenk === "turkuaz" ? "var(--dvn-turkuaz-acik)" : "var(--dvn-turuncu-acik)",
                  padding: "6px 16px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  marginBottom: 16,
                  border: slayt.rozetRenk === "turkuaz" ? "0.5px solid rgba(45,175,184,0.3)" : "0.5px solid rgba(255,107,53,0.3)",
                }}
              >
                {slayt.rozet}
              </div>
              <h1 style={{ color: "white", fontSize: 38, fontWeight: 500, lineHeight: 1.2, margin: "0 0 16px" }}>
                {slayt.baslik}{" "}
                <span style={{ color: slayt.rozetRenk === "turkuaz" ? "var(--dvn-turuncu-acik)" : "var(--dvn-turkuaz-acik)" }}>
                  {slayt.baslikVurgu}
                </span>{" "}
                {slayt.baslikSon}
              </h1>
              <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.65, margin: "0 0 24px", maxWidth: 600 }}>
                {slayt.aciklama}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link
                  href={slayt.buton1.link}
                  target={slayt.buton1.link.startsWith("http") ? "_blank" : undefined}
                  style={{
                    background: slayt.buton1.renk === "turuncu" ? "var(--dvn-gradient-turuncu)" : "var(--dvn-gradient-turkuaz)",
                    color: "white",
                    padding: "13px 24px",
                    borderRadius: 8,
                    fontWeight: 500,
                    fontSize: 13,
                    boxShadow: slayt.buton1.renk === "turuncu" ? "0 8px 20px rgba(255,107,53,0.3)" : "0 8px 20px rgba(45,175,184,0.3)",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {slayt.buton1.yazi} →
                </Link>
                <Link
                  href={slayt.buton2.link}
                  target={slayt.buton2.link.startsWith("http") ? "_blank" : undefined}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "0.5px solid rgba(255,255,255,0.2)",
                    color: "white",
                    padding: "13px 24px",
                    borderRadius: 8,
                    fontWeight: 500,
                    fontSize: 13,
                    transition: "all 0.2s ease",
                  }}
                >
                  {slayt.buton2.yazi}
                </Link>
              </div>
            </div>

            <div className="dvn-slayt-gorsel" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {slayt.gorselTip === "akreditasyon" && <AkreditasyonMockup />}
              {slayt.gorselTip === "sorgulama" && <SorgulamaMockup />}
              {slayt.gorselTip === "denetim" && <DenetimMockup />}
            </div>
          </div>
        </div>

        {/* Dot göstergeleri */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
          {slaytlar.map((_, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              aria-label={`Slayt ${i + 1}`}
              style={{
                width: aktif === i ? 32 : 10,
                height: 10,
                borderRadius: aktif === i ? 5 : "50%",
                background: aktif === i ? "var(--dvn-turuncu)" : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 0.3s",
                border: "none",
              }}
            />
          ))}
        </div>

        <svg
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 60, display: "block" }}
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d="M0,30 C300,55 600,5 900,25 C1050,35 1150,40 1200,35 L1200,60 L0,60 Z" fill="var(--dvn-gri-50)" />
        </svg>

        <style>{`
          .dvn-fade-up {
            animation: dvnFadeUp 0.7s ease-out;
          }
          @keyframes dvnFadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (max-width: 900px) {
            .dvn-slayt {
              grid-template-columns: 1fr !important;
              text-align: center;
            }
            .dvn-slayt-gorsel {
              order: -1;
              max-width: 280px;
              margin: 0 auto;
            }
            .dvn-slayt h1 {
              font-size: 26px !important;
            }
          }
        `}</style>
      </section>

      {/* Sabit Slogan Şeridi */}
      <div
        style={{
          background: "var(--dvn-gri-50)",
          padding: "20px 32px",
          textAlign: "center",
          borderBottom: "0.5px solid var(--dvn-gri-300)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--dvn-turkuaz)" strokeWidth="1.8" />
              <path d="M8 12l3 3 5-6" stroke="var(--dvn-turuncu)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ color: "var(--dvn-lacivert)", fontSize: 14, fontWeight: 500, letterSpacing: 0.3 }}>
              Bağımsız, tarafsız ve doğrulanabilir belgelendirme yaklaşımı
            </span>
          </div>
        </div>
      </div>
    </>
  );
}