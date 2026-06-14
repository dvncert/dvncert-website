"use client";

import { useState } from "react";
import { formGonderAction } from "../actions/form-gonder";

/**
 * Footer bülten (e-bülten) abonelik formu. Abonelik talebi admin panelindeki
 * "Form Gönderileri" gelen kutusuna (tip: bulten) düşer.
 */
export default function BultenFormu() {
  const [gonderildi, setGonderildi] = useState(false);
  const [gonderiliyor, setGonderiliyor] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") ?? "") !== "") return; // honeypot
    setGonderiliyor(true);
    const sonuc = await formGonderAction({
      tip: "bulten",
      email: String(data.get("email") ?? ""),
      konu: "Bülten aboneliği",
      _honeypot: String(data.get("website") ?? ""),
      _ts: Number(data.get("_ts") ?? 0),
    });
    setGonderiliyor(false);
    if (sonuc.ok) {
      setGonderildi(true);
      form.reset();
    }
  }

  if (gonderildi) {
    return (
      <p style={{ fontSize: 11.5, color: "var(--dvn-altin-acik)", margin: "8px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Aboneliğiniz alındı. Teşekkürler!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginTop: 10, maxWidth: 320 }}>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
      <input type="hidden" name="_ts" value="0" />
      <input
        name="email"
        type="email"
        required
        placeholder="E-posta adresiniz"
        style={{
          flex: 1,
          fontFamily: "inherit",
          fontSize: 12.5,
          color: "white",
          background: "rgba(255,255,255,0.08)",
          border: "0.5px solid rgba(255,255,255,0.2)",
          borderRadius: 8,
          padding: "9px 12px",
          minWidth: 0,
        }}
      />
      <button
        type="submit"
        disabled={gonderiliyor}
        style={{
          flexShrink: 0,
          background: "var(--dvn-gradient-turuncu)",
          color: "white",
          border: "none",
          padding: "9px 14px",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 12.5,
          cursor: gonderiliyor ? "default" : "pointer",
          opacity: gonderiliyor ? 0.7 : 1,
        }}
      >
        {gonderiliyor ? "..." : "Abone Ol"}
      </button>
    </form>
  );
}
