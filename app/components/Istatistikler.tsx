"use client";

import { useEffect, useRef, useState } from "react";

const istatistikler = [
  {
    sayi: 500,
    sembol: "+",
    aciklama: "Belgelendirilen kuruluş",
    renk: "turkuaz",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    sayi: 10,
    sembol: "+ yıl",
    aciklama: "Sektör tecrübesi",
    renk: "turuncu",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    sayi: 4,
    sembol: " standart",
    aciklama: "Akreditasyon kapsamı",
    renk: "turkuaz",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4M12 2L4 6v6c0 5.5 3.5 10 8 12 4.5-2 8-6.5 8-12V6l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    sayi: 25,
    sembol: "+",
    aciklama: "Uzman denetçi",
    renk: "turuncu",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function SayacKart({
  hedefSayi,
  sembol,
  aciklama,
  renk,
  icon,
  baslat,
}: {
  hedefSayi: number;
  sembol: string;
  aciklama: string;
  renk: string;
  icon: React.ReactNode;
  baslat: boolean;
}) {
  const [mevcutSayi, setMevcutSayi] = useState(0);

  useEffect(() => {
    if (!baslat) return;

    const sure = 2000;
    const adimSayisi = 60;
    const adimSure = sure / adimSayisi;
    const adimDeger = hedefSayi / adimSayisi;
    let aktifAdim = 0;

    const timer = setInterval(() => {
      aktifAdim++;
      const yeniDeger = Math.min(Math.round(adimDeger * aktifAdim), hedefSayi);
      setMevcutSayi(yeniDeger);

      if (aktifAdim >= adimSayisi) {
        setMevcutSayi(hedefSayi);
        clearInterval(timer);
      }
    }, adimSure);

    return () => clearInterval(timer);
  }, [baslat, hedefSayi]);

  const turkuazMi = renk === "turkuaz";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 12px" }}>
      <div
        style={{
          width: 52,
          height: 52,
          background: turkuazMi
            ? "linear-gradient(135deg, rgba(45,175,184,0.15), rgba(45,175,184,0.05))"
            : "linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,107,53,0.05))",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: turkuazMi ? "var(--dvn-turkuaz)" : "var(--dvn-turuncu)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 26, fontWeight: 500, color: "var(--dvn-lacivert)", margin: 0, lineHeight: 1 }}>
          {mevcutSayi}
          <span style={{ color: turkuazMi ? "var(--dvn-turkuaz)" : "var(--dvn-turuncu)" }}>{sembol}</span>
        </p>
        <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "4px 0 0", fontWeight: 500 }}>
          {aciklama}
        </p>
      </div>
    </div>
  );
}

export default function Istatistikler() {
  const [gorundu, setGorundu] = useState(false);
  const bolumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGorundu(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (bolumRef.current) {
      observer.observe(bolumRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={bolumRef} style={{ background: "var(--dvn-gri-50)", padding: "40px 32px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          background: "white",
          borderRadius: 16,
          padding: "26px 28px",
          boxShadow: "0 8px 32px rgba(15,25,34,0.06)",
          border: "0.5px solid var(--dvn-gri-300)",
        }}
      >
        <div
          className="dvn-istatistik-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
        >
          {istatistikler.map((stat, i) => (
            <SayacKart
              key={i}
              hedefSayi={stat.sayi}
              sembol={stat.sembol}
              aciklama={stat.aciklama}
              renk={stat.renk}
              icon={stat.icon}
              baslat={gorundu}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dvn-istatistik-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .dvn-istatistik-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}