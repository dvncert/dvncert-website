"use client";

import { useEffect, useState } from "react";
import type { PopupVeri } from "@/lib/popup";

/**
 * Site geneli açılır pencere (modal). Admin panelinden yönetilir (bkz. /admin/popup).
 *
 * Gösterim kuralı: ziyaretçi pop-up'ı kapattığında, o sürümün damgası (guncellenmeMs)
 * localStorage'a yazılır; aynı sürüm bir daha gösterilmez. Admin pop-up'ı her
 * güncellediğinde damga değişir ve pop-up herkese tekrar gösterilir.
 */
const ANAHTAR = "dvn-popup-kapatildi";

export default function PopupModal({ popup }: { popup: PopupVeri }) {
  const [gorunur, setGorunur] = useState(false);

  const kapat = () => {
    try {
      localStorage.setItem(ANAHTAR, String(popup.guncellenmeMs));
    } catch {
      /* yoksay */
    }
    setGorunur(false);
  };

  useEffect(() => {
    let zamanlayici: ReturnType<typeof setTimeout> | undefined;
    try {
      if (localStorage.getItem(ANAHTAR) !== String(popup.guncellenmeMs)) {
        zamanlayici = setTimeout(() => setGorunur(true), 1200);
      }
    } catch {
      /* localStorage erişilemezse pop-up gösterilmez */
    }
    return () => {
      if (zamanlayici) clearTimeout(zamanlayici);
    };
  }, [popup.guncellenmeMs]);

  useEffect(() => {
    if (!gorunur) return;
    const oncekiOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escDinle = (e: KeyboardEvent) => {
      if (e.key === "Escape") kapat();
    };
    window.addEventListener("keydown", escDinle);
    return () => {
      document.body.style.overflow = oncekiOverflow;
      window.removeEventListener("keydown", escDinle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gorunur]);

  if (!gorunur) return null;

  const gorselSrc = popup.gorselVar ? `/api/gorsel/popup/${popup.id}?v=${popup.guncellenmeMs}` : null;
  const url = popup.butonUrl?.trim() || "";
  const haricî = /^https?:\/\//.test(url);
  const linkProps = url
    ? { href: url, ...(haricî ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : null;

  const gorsel = gorselSrc ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={gorselSrc}
      alt={popup.gorselAlt ?? ""}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  ) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={popup.baslik ?? "Duyuru"}
      onClick={kapat}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(2,18,64,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          maxHeight: "calc(100dvh - 32px)",
          overflowY: "auto",
          background: "white",
          borderRadius: 16,
          boxShadow: "0 24px 70px rgba(2,35,152,0.35)",
        }}
      >
        <button
          type="button"
          onClick={kapat}
          aria-label="Kapat"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "none",
            background: "rgba(2,18,64,0.45)",
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

        {gorsel &&
          (linkProps ? (
            <a {...linkProps} onClick={kapat} style={{ display: "block", borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: "hidden" }}>
              {gorsel}
            </a>
          ) : (
            <div style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: "hidden" }}>{gorsel}</div>
          ))}

        {(popup.baslik || popup.metin || (popup.butonYazi && url)) && (
          <div style={{ padding: "24px 26px 28px" }}>
            {popup.baslik && (
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 20, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.3 }}>
                {popup.baslik}
              </h2>
            )}
            {popup.metin && (
              <p style={{ color: "var(--dvn-gri-700)", fontSize: 14.5, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                {popup.metin}
              </p>
            )}
            {popup.butonYazi && url && linkProps && (
              <a
                {...linkProps}
                onClick={kapat}
                style={{
                  display: "inline-block",
                  marginTop: 18,
                  background: "var(--dvn-gradient-turuncu)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "var(--dvn-radius-md)",
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                  boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
                }}
              >
                {popup.butonYazi}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
