"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { tarihiBicimle } from "@/lib/duyurular";

/** Liste için gereken hafif duyuru projeksiyonu (icerik taşınmaz). */
export type DuyuruOzet = {
  slug: string;
  baslik: string;
  tarih: string;
  kategori: string;
  ozet: string;
  gorsel?: string;
  gorselAlt?: string;
};

function OneCikanKart({ d }: { d: DuyuruOzet }) {
  return (
    <Link
      href={`/duyurular/${d.slug}`}
      className="dvn-one-cikan"
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 0,
        background: "var(--dvn-gradient-lacivert)",
        borderRadius: 18,
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        marginBottom: 40,
        boxShadow: "0 12px 40px rgba(2,35,152,0.16)",
      }}
    >
      <div style={{ padding: "40px 38px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--dvn-lacivert)", background: "var(--dvn-altin-acik)", padding: "4px 12px", borderRadius: 999 }}>
            {d.kategori}
          </span>
          <span style={{ fontSize: 12.5, color: "#9aa5b1" }}>{tarihiBicimle(d.tarih)}</span>
        </div>
        <h2 style={{ color: "white", fontSize: 24, fontWeight: 500, margin: "0 0 14px", lineHeight: 1.35 }}>{d.baslik}</h2>
        <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.7, margin: "0 0 22px" }}>{d.ozet}</p>
        <span style={{ fontSize: 13.5, color: "var(--dvn-turuncu-acik)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6 }}>
          Devamını oku
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="dvn-one-cikan-gorsel" style={{ position: "relative", background: "var(--dvn-gradient-hero)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 240, overflow: "hidden" }}>
        {d.gorsel ? (
          <Image src={d.gorsel} alt={d.gorselAlt || d.baslik} fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        ) : (
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.7 }}>
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" stroke="var(--dvn-altin-acik)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="var(--dvn-turuncu-acik)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </Link>
  );
}

function GridKart({ d }: { d: DuyuruOzet }) {
  return (
    <Link
      href={`/duyurular/${d.slug}`}
      className="dvn-duyuru-kart"
      style={{
        background: "white",
        borderRadius: 14,
        padding: "26px 24px",
        boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
        border: "0.5px solid var(--dvn-gri-300)",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: "var(--dvn-altin)", background: "var(--dvn-altin-soluk)", padding: "4px 10px", borderRadius: 999 }}>
          {d.kategori}
        </span>
        <span style={{ fontSize: 12, color: "var(--dvn-gri-500)" }}>{tarihiBicimle(d.tarih)}</span>
      </div>
      <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 500, margin: "0 0 10px", lineHeight: 1.4 }}>{d.baslik}</h3>
      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: "0 0 18px", flexGrow: 1 }}>{d.ozet}</p>
      <span style={{ fontSize: 13, color: "var(--dvn-turuncu)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
        Devamını oku
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

export default function DuyuruListe({ duyurular }: { duyurular: DuyuruOzet[] }) {
  const kategoriler = ["Tümü", ...Array.from(new Set(duyurular.map((d) => d.kategori)))];
  const [aktif, setAktif] = useState("Tümü");

  const tumuModu = aktif === "Tümü";
  const secili = tumuModu ? duyurular : duyurular.filter((d) => d.kategori === aktif);

  return (
    <div>
      {/* Kategori filtreleri */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
        {kategoriler.map((k) => {
          const sec = k === aktif;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setAktif(k)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: 999,
                cursor: "pointer",
                background: sec ? "var(--dvn-lacivert)" : "white",
                color: sec ? "white" : "var(--dvn-lacivert)",
                border: sec ? "0.5px solid var(--dvn-lacivert)" : "0.5px solid var(--dvn-gri-300)",
                transition: "all 0.2s ease",
              }}
            >
              {k}
            </button>
          );
        })}
      </div>

      {secili.length === 0 ? (
        <p style={{ color: "var(--dvn-gri-500)", fontSize: 14 }}>Bu kategoride duyuru bulunmuyor.</p>
      ) : tumuModu ? (
        <>
          <OneCikanKart d={secili[0]} />
          {secili.length > 1 && (
            <div className="dvn-duyuru-liste-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {secili.slice(1).map((d) => (
                <GridKart key={d.slug} d={d} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="dvn-duyuru-liste-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {secili.map((d) => (
            <GridKart key={d.slug} d={d} />
          ))}
        </div>
      )}

      <style>{`
        .dvn-duyuru-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(2,35,152,0.12) !important; }
        @media (max-width: 860px) {
          .dvn-one-cikan { grid-template-columns: 1fr !important; }
          .dvn-one-cikan-gorsel { order: -1; min-height: 180px !important; }
        }
        @media (max-width: 900px) {
          .dvn-duyuru-liste-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
