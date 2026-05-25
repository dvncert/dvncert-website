"use client";

import { useEffect, useState } from "react";

/**
 * Sayfa aşağı kaydırılınca görünen "yukarı çık" butonu.
 * Sol altta konumlanır (sağ alttaki WhatsApp butonuyla çakışmaz).
 */
export default function ScrollToTop() {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    const kontrol = () => setGorunur(window.scrollY > 500);
    kontrol();
    window.addEventListener("scroll", kontrol, { passive: true });
    return () => window.removeEventListener("scroll", kontrol);
  }, []);

  if (!gorunur) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Sayfanın başına dön"
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 9980,
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "var(--dvn-lacivert)",
        color: "#ffffff",
        border: "0.5px solid rgba(255,255,255,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 8px 22px rgba(2,35,152,0.35)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
