"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HizmetIkon from "./HizmetIkon";

// "Neden DVN Cert" açılır menü öğeleri - tek kaynak (masaüstü + mobil)
const kurumsalMenu = [
  {
    baslik: "Hakkımızda",
    href: "/hakkimizda",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 7h.01M9 11h.01M9 15h.01M13 7h.01M13 11h.01M13 15h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    baslik: "Ekibimiz",
    href: "/ekibimiz",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "Akreditasyonlarımız",
    href: "/akreditasyonlarimiz",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l8 4v6c0 5.5-3.5 10-8 12-4.5-2-8-6.5-8-12V6l8-4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "Politika ve Beyanlar",
    href: "/politika-ve-beyanlar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "Logolarımız",
    href: "/logolarimiz",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="8.5" cy="8.5" r="1.6" stroke="currentColor" strokeWidth="1.7" />
        <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "S.S.S.",
    href: "/sss",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9.1 9a3 3 0 015.82 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    baslik: "Dökümanlar",
    href: "/dokumanlar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// "Hizmetler" açılır menü - Sistem Belgelendirme altında 4 ISO standardı gruplu
const hizmetlerMenu: {
  baslik: string;
  href: string;
  ikon: string;
  alt: { baslik: string; href: string }[];
}[] = [
  {
    baslik: "Sistem Belgelendirme",
    href: "/hizmetler/sistem-belgelendirme",
    ikon: "sistem",
    alt: [
      { baslik: "ISO 9001 Kalite Yönetim Sistemi", href: "/hizmetler/iso-9001" },
      { baslik: "ISO 14001 Çevre Yönetim Sistemi", href: "/hizmetler/iso-14001" },
      { baslik: "ISO 45001 İSG Yönetim Sistemi", href: "/hizmetler/iso-45001" },
      { baslik: "ISO 50001 Enerji Yönetim Sistemi", href: "/hizmetler/iso-50001" },
    ],
  },
  { baslik: "2. Taraf Denetimleri", href: "/hizmetler/2-taraf-denetimleri", ikon: "denetim", alt: [] },
  { baslik: "Eğitimler", href: "/egitimler", ikon: "egitim", alt: [] },
];

// "İletişim" açılır menü öğeleri (Başvuru Talebi dış DBYS sistemine gider)
const iletisimMenu: { baslik: string; href: string; dis?: boolean; icon: React.ReactNode }[] = [
  {
    baslik: "Bize Ulaşın",
    href: "/iletisim",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "Şikayet ve Görüşler",
    href: "/sikayet-ve-gorusler",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    baslik: "Başvuru Talebi",
    href: "https://dbys.dvncert.com/basvuru",
    dis: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Header() {
  const [mobilMenuAcik, setMobilMenuAcik] = useState(false);
  const [kurumsalAcikMobil, setKurumsalAcikMobil] = useState(false);
  const [hizmetlerAcikMobil, setHizmetlerAcikMobil] = useState(false);
  const [iletisimAcikMobil, setIletisimAcikMobil] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "white" }}>
      {/* Üst bilgi şeridi - tam genişlik zemin, içerik 1280 ortalı */}
      <div style={{ background: "var(--dvn-lacivert)", padding: "8px 32px", fontSize: 12, color: "#9aa5b1" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <a href="mailto:info@dvncert.com" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="var(--dvn-turuncu)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              info@dvncert.com
            </a>
            <a href="tel:+905300448037" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" stroke="var(--dvn-turuncu)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +90 530 044 80 37
            </a>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {/* Arama */}
            <Link
              href="/arama"
              aria-label="Sitede ara"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#ffffff",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#ffffff" strokeWidth="2.2" />
                <path d="M21 21l-3.5-3.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Müşteri Girişi */}
            <Link
              href="/musteri-giris"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#ffffff",
                padding: "5px 14px",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 12.5,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" stroke="#ffffff" strokeWidth="2.2" />
              </svg>
              Müşteri Girişi
            </Link>

            {/* Denetçi Girişi */}
            <Link
              href="https://dbys.dvncert.com"
              target="_blank"
              style={{
                background: "var(--dvn-turuncu)",
                color: "#ffffff",
                padding: "5px 14px",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 12.5,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(245,130,32,0.4)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Denetçi Girişi
            </Link>

            {/* Dil seçimi */}
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: 4 }}>
              <span style={{ cursor: "pointer" }}>TR</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span style={{ cursor: "pointer", opacity: 0.6 }}>EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ana navigasyon - tam genişlik zemin, içerik 1280 ortalı (slider ile hizalı) */}
      <div style={{ background: "white", padding: "14px 32px", borderBottom: "0.5px solid var(--dvn-gri-300)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <Image
              src="/logo.webp"
              alt="DVN Cert Belgelendirme - Bağımsız uygunluk değerlendirme kuruluşu"
              width={96}
              height={64}
              style={{ height: 64, width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop Menü */}
          <nav
            className="dvn-desktop-menu"
            style={{
              display: "flex",
              gap: 26,
              fontSize: 14,
              color: "var(--dvn-gri-700)",
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            <Link href="/">Ana Sayfa</Link>

            {/* Neden DVN Cert - açılır menü */}
            <div className="dvn-dd" style={{ position: "relative" }}>
              <Link
                href="/hakkimizda"
                className="dvn-dd-tetik"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}
              >
                Neden DVN Cert
                <svg className="dvn-dd-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <div className="dvn-dd-menu" style={{ position: "absolute", top: "100%", left: 0, paddingTop: 14, zIndex: 200 }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: 8,
                    minWidth: 256,
                    boxShadow: "0 16px 40px rgba(46,26,107,0.16)",
                    border: "0.5px solid var(--dvn-gri-300)",
                  }}
                >
                  {kurumsalMenu.map((item) => (
                    <Link key={item.href} href={item.href} className="dvn-dd-oge">
                      <span className="dvn-dd-ikon">{item.icon}</span>
                      <span>{item.baslik}</span>
                      <svg className="dvn-dd-ok" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Hizmetler - açılır menü (Sistem Belgelendirme altında ISO standartları) */}
            <div className="dvn-dd" style={{ position: "relative" }}>
              <Link
                href="/hizmetler"
                className="dvn-dd-tetik"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}
              >
                Hizmetler
                <svg className="dvn-dd-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <div className="dvn-dd-menu" style={{ position: "absolute", top: "100%", left: 0, paddingTop: 14, zIndex: 200 }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: 8,
                    minWidth: 300,
                    boxShadow: "0 16px 40px rgba(46,26,107,0.16)",
                    border: "0.5px solid var(--dvn-gri-300)",
                  }}
                >
                  {hizmetlerMenu.map((item) => (
                    <div key={item.href}>
                      <Link href={item.href} className="dvn-dd-oge">
                        <span className="dvn-dd-ikon">
                          <HizmetIkon ad={item.ikon} size={18} />
                        </span>
                        <span>{item.baslik}</span>
                        <svg className="dvn-dd-ok" width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>

                      {item.alt.length > 0 && (
                        <div className="dvn-dd-altgrup">
                          {item.alt.map((a) => (
                            <Link key={a.href} href={a.href} className="dvn-dd-alt">
                              {a.baslik}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/kariyer">Kariyer</Link>
            <Link href="/duyurular">Duyurular</Link>

            {/* İletişim - açılır menü */}
            <div className="dvn-dd" style={{ position: "relative" }}>
              <Link
                href="/iletisim"
                className="dvn-dd-tetik"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}
              >
                İletişim
                <svg className="dvn-dd-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <div className="dvn-dd-menu" style={{ position: "absolute", top: "100%", right: 0, paddingTop: 14, zIndex: 200 }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: 8,
                    minWidth: 250,
                    boxShadow: "0 16px 40px rgba(46,26,107,0.16)",
                    border: "0.5px solid var(--dvn-gri-300)",
                  }}
                >
                  {iletisimMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      {...(item.dis ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="dvn-dd-oge"
                    >
                      <span className="dvn-dd-ikon">{item.icon}</span>
                      <span>{item.baslik}</span>
                      <svg className="dvn-dd-ok" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="https://dbys.dvncert.com/basvuru"
              target="_blank"
              style={{
                background: "var(--dvn-turuncu)",
                color: "white",
                padding: "9px 18px",
                borderRadius: "var(--dvn-radius-md)",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(245,130,32, 0.25)",
              }}
            >
              Başvuru Yap
            </Link>
          </nav>

          {/* Mobil Hamburger */}
          <button
            className="dvn-mobil-toggle"
            onClick={() => setMobilMenuAcik(!mobilMenuAcik)}
            aria-label="Menüyü aç/kapat"
            style={{
              display: "none",
              background: "var(--dvn-lacivert)",
              color: "white",
              padding: 10,
              borderRadius: "var(--dvn-radius-md)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {mobilMenuAcik ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {mobilMenuAcik && (
        <nav
          style={{
            background: "white",
            padding: "16px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 15,
            color: "var(--dvn-gri-700)",
            fontWeight: 500,
            borderBottom: "0.5px solid var(--dvn-gri-300)",
          }}
        >
          <Link href="/" onClick={() => setMobilMenuAcik(false)}>Ana Sayfa</Link>

          {/* Neden DVN Cert - mobil genişleyen alt menü */}
          <div>
            <button
              onClick={() => setKurumsalAcikMobil(!kurumsalAcikMobil)}
              aria-expanded={kurumsalAcikMobil}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--dvn-gri-700)",
                fontSize: 15,
                fontWeight: 500,
                padding: 0,
              }}
            >
              Neden DVN Cert
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: kurumsalAcikMobil ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {kurumsalAcikMobil && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 14,
                  paddingLeft: 14,
                  borderLeft: "2px solid var(--dvn-gri-300)",
                }}
              >
                {kurumsalMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobilMenuAcik(false)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--dvn-gri-500)" }}
                  >
                    <span style={{ color: "var(--dvn-altin)", display: "inline-flex" }}>{item.icon}</span>
                    {item.baslik}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hizmetler - mobil genişleyen alt menü */}
          <div>
            <button
              onClick={() => setHizmetlerAcikMobil(!hizmetlerAcikMobil)}
              aria-expanded={hizmetlerAcikMobil}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--dvn-gri-700)",
                fontSize: 15,
                fontWeight: 500,
                padding: 0,
              }}
            >
              Hizmetler
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: hizmetlerAcikMobil ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {hizmetlerAcikMobil && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 14,
                  paddingLeft: 14,
                  borderLeft: "2px solid var(--dvn-gri-300)",
                }}
              >
                {hizmetlerMenu.map((item) => (
                  <div key={item.href} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Link
                      href={item.href}
                      onClick={() => setMobilMenuAcik(false)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--dvn-gri-500)" }}
                    >
                      <span style={{ color: "var(--dvn-altin)", display: "inline-flex" }}>
                        <HizmetIkon ad={item.ikon} size={18} />
                      </span>
                      {item.baslik}
                    </Link>
                    {item.alt.map((a) => (
                      <Link
                        key={a.href}
                        href={a.href}
                        onClick={() => setMobilMenuAcik(false)}
                        style={{ fontSize: 13, color: "var(--dvn-gri-500)", paddingLeft: 28 }}
                      >
                        {a.baslik}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/kariyer" onClick={() => setMobilMenuAcik(false)}>Kariyer</Link>
          <Link href="/duyurular" onClick={() => setMobilMenuAcik(false)}>Duyurular</Link>

          {/* İletişim - mobil genişleyen alt menü */}
          <div>
            <button
              onClick={() => setIletisimAcikMobil(!iletisimAcikMobil)}
              aria-expanded={iletisimAcikMobil}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "var(--dvn-gri-700)",
                fontSize: 15,
                fontWeight: 500,
                padding: 0,
              }}
            >
              İletişim
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: iletisimAcikMobil ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {iletisimAcikMobil && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 14,
                  paddingLeft: 14,
                  borderLeft: "2px solid var(--dvn-gri-300)",
                }}
              >
                {iletisimMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    {...(item.dis ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setMobilMenuAcik(false)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--dvn-gri-500)" }}
                  >
                    <span style={{ color: "var(--dvn-altin)", display: "inline-flex" }}>{item.icon}</span>
                    {item.baslik}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="https://dbys.dvncert.com/basvuru"
            target="_blank"
            onClick={() => setMobilMenuAcik(false)}
            style={{
              background: "var(--dvn-turuncu)",
              color: "white",
              padding: "10px 18px",
              borderRadius: "var(--dvn-radius-md)",
              textAlign: "center",
            }}
          >
            Başvuru Yap
          </Link>
        </nav>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .dvn-desktop-menu {
            display: none !important;
          }
          .dvn-mobil-toggle {
            display: block !important;
          }
        }

        /* Açılır menü (dropdown) - sade liste, yumuşak slide-down */
        .dvn-dd-menu {
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s;
          pointer-events: none;
        }
        .dvn-dd:hover .dvn-dd-menu,
        .dvn-dd:focus-within .dvn-dd-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }
        .dvn-dd:hover .dvn-dd-tetik {
          color: var(--dvn-turuncu);
        }
        .dvn-dd-chevron {
          transition: transform 0.22s ease;
        }
        .dvn-dd:hover .dvn-dd-chevron {
          transform: rotate(180deg);
        }

        .dvn-dd-oge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--dvn-gri-700);
          transition: background 0.18s ease, color 0.18s ease;
        }
        .dvn-dd-oge:hover {
          background: var(--dvn-gri-100);
          color: var(--dvn-lacivert);
        }
        .dvn-dd-ikon {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: var(--dvn-altin-soluk);
          color: var(--dvn-altin);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .dvn-dd-oge:hover .dvn-dd-ikon {
          background: var(--dvn-gradient-altin);
          color: white;
        }
        .dvn-dd-ok {
          margin-left: auto;
          color: var(--dvn-gri-300);
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.18s ease, transform 0.18s ease, color 0.18s ease;
        }
        .dvn-dd-oge:hover .dvn-dd-ok {
          opacity: 1;
          transform: translateX(0);
          color: var(--dvn-turuncu);
        }

        /* Açılır menü içindeki alt liste (ör. ISO standartları) */
        .dvn-dd-altgrup {
          display: flex;
          flex-direction: column;
          margin: 2px 0 6px 46px;
          padding-left: 12px;
          border-left: 1.5px solid var(--dvn-gri-300);
        }
        .dvn-dd-alt {
          padding: 7px 10px;
          border-radius: 7px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--dvn-gri-500);
          transition: background 0.18s ease, color 0.18s ease;
        }
        .dvn-dd-alt:hover {
          background: var(--dvn-gri-100);
          color: var(--dvn-turuncu);
        }
      `}</style>
    </header>
  );
}
