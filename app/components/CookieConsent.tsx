"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * KVKK çerez onay banner'ı.
 *
 * Google Consent Mode v2 ile çalışır: varsayılan onay durumu app/layout.tsx'teki
 * <head> içi inline script tarafından "denied" olarak ayarlanır (GA yüklenmeden
 * önce). Kullanıcı seçim yapınca window.dvnCerezGuncelle() consent'i günceller ve
 * tercihi localStorage'a yazar. Böylece analitik çerezler yalnızca onayla çalışır.
 */
declare global {
  interface Window {
    dvnCerezGuncelle?: (kabul: boolean) => void;
  }
}

export default function CookieConsent() {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("dvn-cerez-onay")) {
        // SSR güvenli: banner yalnızca mount sonrası, daha önce seçim
        // yapılmamışsa gösterilir (localStorage istemci tarafında okunur).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGorunur(true);
      }
    } catch {
      /* localStorage erişilemezse banner gösterilmez */
    }
  }, []);

  if (!gorunur) return null;

  const sec = (kabul: boolean) => {
    window.dvnCerezGuncelle?.(kabul);
    setGorunur(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihi"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9999,
        maxWidth: 1100,
        margin: "0 auto",
        background: "white",
        border: "0.5px solid var(--dvn-gri-300)",
        borderTop: "3px solid var(--dvn-altin)",
        borderRadius: 14,
        boxShadow: "0 12px 40px rgba(46,26,107,0.18)",
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div style={{ flex: "1 1 380px", minWidth: 0 }}>
        <p style={{ color: "var(--dvn-lacivert)", fontSize: 14.5, fontWeight: 600, margin: "0 0 4px" }}>
          Çerez kullanımı
        </p>
        <p style={{ color: "var(--dvn-gri-700)", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
          Sitemizi geliştirmek ve ziyaret istatistiklerini ölçmek için çerezler kullanıyoruz. Analitik
          çerezler yalnızca onayınızla çalışır. Ayrıntılar için{" "}
          <Link
            href="/cerez-politikasi"
            style={{ color: "var(--dvn-turuncu)", textDecoration: "underline", textUnderlineOffset: "2px", fontWeight: 500 }}
          >
            Çerez Politikası
          </Link>
          .
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => sec(false)}
          style={{
            background: "white",
            border: "0.5px solid var(--dvn-gri-300)",
            color: "var(--dvn-lacivert)",
            padding: "11px 20px",
            borderRadius: "var(--dvn-radius-md)",
            fontWeight: 500,
            fontSize: 13.5,
            cursor: "pointer",
          }}
        >
          Reddet
        </button>
        <button
          type="button"
          onClick={() => sec(true)}
          style={{
            background: "var(--dvn-gradient-turuncu)",
            color: "white",
            border: "none",
            padding: "11px 22px",
            borderRadius: "var(--dvn-radius-md)",
            fontWeight: 500,
            fontSize: 13.5,
            boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
            cursor: "pointer",
          }}
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}
