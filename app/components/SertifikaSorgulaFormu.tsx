"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { formGonderAction } from "../actions/form-gonder";
import SpamKorumasi from "./SpamKorumasi";

/**
 * Sertifika doğrulama talebi formu. Online doğrulama sistemi (DBYS) entegrasyonu
 * tamamlanana kadar, doğrulama talepleri admin paneline (Form Gönderileri) düşer
 * ve ekip tarafından yanıtlanır.
 */
export default function SertifikaSorgulaFormu() {
  const [gonderildi, setGonderildi] = useState(false);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const sertifikaNo = String(data.get("sertifikaNo") ?? "");
    const firma = String(data.get("firma") ?? "");
    setGonderiliyor(true);
    setHata(false);
    const sonuc = await formGonderAction({
      tip: "sertifika-dogrulama",
      ad: firma,
      email: String(data.get("email") ?? ""),
      konu: `Sertifika doğrulama: ${sertifikaNo || firma}`,
      mesaj: `Sertifika No: ${sertifikaNo}\nFirma/Kuruluş: ${firma}`,
      ekVeri: { sertifikaNo, firma },
      _honeypot: String(data.get("website") ?? ""),
      _ts: Number(data.get("_ts") ?? 0),
    });
    setGonderiliyor(false);
    if (sonuc.ok) {
      setGonderildi(true);
      form.reset();
    } else {
      setHata(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="dvn-iletisim-form" style={{ display: "grid", gap: 16, position: "relative" }}>
      <SpamKorumasi />
      <label style={alanStili}>
        <span style={etiketStili}>Sertifika Numarası</span>
        <input name="sertifikaNo" type="text" placeholder="Örn. TR-9001-2026-0001" style={inputStili} />
      </label>
      <div className="dvn-form-satir" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label style={alanStili}>
          <span style={etiketStili}>Firma / Kuruluş Adı *</span>
          <input name="firma" type="text" required placeholder="Belge sahibi kuruluş" style={inputStili} />
        </label>
        <label style={alanStili}>
          <span style={etiketStili}>E-posta *</span>
          <input name="email" type="email" required placeholder="size@firma.com" style={inputStili} />
        </label>
      </div>

      <button
        type="submit"
        disabled={gonderiliyor}
        style={{
          justifySelf: "start",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--dvn-gradient-turuncu)",
          color: "white",
          padding: "13px 28px",
          borderRadius: "var(--dvn-radius-md)",
          fontWeight: 500,
          fontSize: 14,
          boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
          opacity: gonderiliyor ? 0.7 : 1,
          cursor: gonderiliyor ? "default" : "pointer",
        }}
      >
        {gonderiliyor ? "Gönderiliyor..." : "Doğrulama Talebi Gönder"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {gonderildi && (
        <p style={{ fontSize: 13, color: "var(--dvn-altin)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="var(--dvn-altin)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Talebiniz alındı. Belge durumu en kısa sürede e-posta ile teyit edilecektir.
        </p>
      )}
      {hata && (
        <p style={{ fontSize: 13, color: "var(--dvn-turuncu)", margin: 0 }}>
          Gönderilemedi. Lütfen tekrar deneyin veya {siteConfig.email} adresine yazın.
        </p>
      )}

      <style>{`
        .dvn-iletisim-form input:focus {
          outline: none;
          border-color: var(--dvn-altin) !important;
          box-shadow: 0 0 0 3px var(--dvn-altin-soluk);
        }
        .dvn-iletisim-form input::placeholder { color: var(--dvn-gri-300); }
        @media (max-width: 560px) {
          .dvn-iletisim-form .dvn-form-satir { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

const alanStili: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const etiketStili: React.CSSProperties = { fontSize: 12.5, fontWeight: 500, color: "var(--dvn-gri-700)" };
const inputStili: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: 14,
  color: "var(--dvn-lacivert)",
  background: "white",
  border: "0.5px solid var(--dvn-gri-300)",
  borderRadius: "var(--dvn-radius-md)",
  padding: "11px 14px",
  width: "100%",
  transition: "border-color 0.18s ease, box-shadow 0.18s ease",
};
