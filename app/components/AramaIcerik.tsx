"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ara, type AramaTipi } from "@/lib/arama";

const tipRenkleri: Record<AramaTipi, { bg: string; renk: string }> = {
  Hizmet: { bg: "var(--dvn-altin-soluk)", renk: "var(--dvn-altin)" },
  Duyuru: { bg: "var(--dvn-turuncu-soluk)", renk: "var(--dvn-turuncu)" },
  "S.S.S.": { bg: "var(--dvn-gri-100)", renk: "var(--dvn-lacivert)" },
  Sayfa: { bg: "var(--dvn-gri-100)", renk: "var(--dvn-gri-700)" },
};

export default function AramaIcerik() {
  const sp = useSearchParams();
  const [sorgu, setSorgu] = useState(sp.get("q") ?? "");
  const sonuclar = useMemo(() => ara(sorgu), [sorgu]);
  const yeterli = sorgu.trim().length >= 2;

  return (
    <div>
      {/* Arama kutusu */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", display: "inline-flex" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="var(--dvn-gri-500)" strokeWidth="2" />
            <path d="M21 21l-4-4" stroke="var(--dvn-gri-500)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          autoFocus
          value={sorgu}
          onChange={(e) => setSorgu(e.target.value)}
          placeholder="Hizmet, duyuru veya sayfa ara…"
          aria-label="Sitede ara"
          style={{
            width: "100%",
            padding: "14px 18px 14px 46px",
            fontSize: 15,
            fontFamily: "inherit",
            color: "var(--dvn-lacivert)",
            background: "white",
            border: "1px solid var(--dvn-gri-300)",
            borderRadius: 12,
            outline: "none",
          }}
        />
      </div>

      {/* Durum / sonuç sayısı */}
      {!yeterli ? (
        <p style={{ color: "var(--dvn-gri-500)", fontSize: 14, margin: 0 }}>
          Aramak için en az 2 karakter yazın.
        </p>
      ) : sonuclar.length === 0 ? (
        <p style={{ color: "var(--dvn-gri-500)", fontSize: 14, margin: 0 }}>
          <strong style={{ color: "var(--dvn-lacivert)" }}>&ldquo;{sorgu}&rdquo;</strong> için sonuç bulunamadı.
        </p>
      ) : (
        <>
          <p style={{ color: "var(--dvn-gri-500)", fontSize: 13.5, margin: "0 0 16px" }}>
            {sonuclar.length} sonuç bulundu
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {sonuclar.map((s, i) => {
              const t = tipRenkleri[s.tip];
              return (
                <li key={i}>
                  <Link
                    href={s.url}
                    className="dvn-arama-sonuc"
                    style={{
                      display: "block",
                      background: "white",
                      border: "0.5px solid var(--dvn-gri-300)",
                      borderRadius: 12,
                      padding: "18px 20px",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: t.renk,
                          background: t.bg,
                          padding: "3px 10px",
                          borderRadius: 999,
                        }}
                      >
                        {s.tip}
                      </span>
                      <span style={{ color: "var(--dvn-lacivert)", fontSize: 15.5, fontWeight: 600 }}>{s.baslik}</span>
                    </div>
                    <p style={{ color: "var(--dvn-gri-500)", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{s.ozet}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <style>{`
        .dvn-arama-sonuc:hover { border-color: var(--dvn-altin) !important; box-shadow: 0 8px 22px rgba(46,26,107,0.08); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
