"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DokumanCanvas from "./DokumanCanvas";

/**
 * Dokümanı site içi tam ekran görüntüleyicide açar (indirme yok).
 * PDF, sayfa sayfa <canvas>'a çizilir (DokumanCanvas) — metin katmanı yoktur,
 * bu yüzden metin seçilemez/kopyalanamaz ve indir/yazdır araç çubuğu yoktur.
 *
 * Modal, createPortal ile doğrudan document.body'ye render edilir. Aksi halde
 * position:fixed katman, transform uygulayan bir üst öğenin (ör. hover'da
 * translateX yapan doküman satırı) içine hapsolur ve viewport yerine o öğeye
 * göre konumlanır — bu da "açılıp kapanma / titreme" olarak görünürdü.
 *
 * Not: Web'de mutlak indirme/kopyalama engeli yoktur (ekran görüntüsü, DevTools,
 * doğrudan URL). Bu bileşen metin kopyalamayı ve sıradan indirmeyi engeller.
 */
export default function DokumanGoruntule({ src, baslik }: { src: string; baslik: string }) {
  const [acik, setAcik] = useState(false);
  const [monte, setMonte] = useState(false);

  // Portal yalnızca istemcide (document mevcutken) render edilebilir.
  useEffect(() => {
    setMonte(true);
  }, []);

  useEffect(() => {
    if (!acik) return;
    const oncekiOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escDinle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAcik(false);
    };
    window.addEventListener("keydown", escDinle);
    return () => {
      document.body.style.overflow = oncekiOverflow;
      window.removeEventListener("keydown", escDinle);
    };
  }, [acik]);

  const modal = acik ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={baslik}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(2,18,64,0.7)",
            display: "flex",
            flexDirection: "column",
            padding: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "4px 8px 12px",
              color: "white",
              userSelect: "none",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {baslik}
            </span>
            <button
              type="button"
              onClick={() => setAcik(false)}
              aria-label="Kapat"
              style={{
                flexShrink: 0,
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <DokumanCanvas src={src} />
        </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setAcik(true)}
        className="dvn-dok-goruntule"
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "var(--dvn-gradient-turuncu)",
          color: "white",
          padding: "9px 16px",
          borderRadius: "var(--dvn-radius-md)",
          fontWeight: 500,
          fontSize: 12.5,
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
        </svg>
        Görüntüle
      </button>

      {monte && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
