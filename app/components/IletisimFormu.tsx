"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/**
 * İletişim formu. Backend bağlanana kadar mesajı kullanıcının e-posta
 * istemcisinde mailto ile ön doldurur (info@dvncert.com'a). İleride bir
 * API/e-posta servisine bağlanabilir (onSubmit içindeki gönderim değişir).
 */
export default function IletisimFormu() {
  const [gonderildi, setGonderildi] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const ad = String(data.get("ad") ?? "");
    const email = String(data.get("email") ?? "");
    const telefon = String(data.get("telefon") ?? "");
    const konu = String(data.get("konu") ?? "");
    const mesaj = String(data.get("mesaj") ?? "");

    const govde =
      `Ad Soyad: ${ad}\n` +
      `E-posta: ${email}\n` +
      `Telefon: ${telefon}\n` +
      `\n${mesaj}`;

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      konu || "İletişim Formu"
    )}&body=${encodeURIComponent(govde)}`;

    window.location.href = mailto;
    setGonderildi(true);
  }

  return (
    <form onSubmit={handleSubmit} className="dvn-iletisim-form" style={{ display: "grid", gap: 16 }}>
      <div className="dvn-form-satir" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label style={alanStili}>
          <span style={etiketStili}>Ad Soyad *</span>
          <input name="ad" type="text" required placeholder="Adınız Soyadınız" style={inputStili} />
        </label>
        <label style={alanStili}>
          <span style={etiketStili}>E-posta *</span>
          <input name="email" type="email" required placeholder="ornek@firma.com" style={inputStili} />
        </label>
      </div>

      <div className="dvn-form-satir" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label style={alanStili}>
          <span style={etiketStili}>Telefon</span>
          <input name="telefon" type="tel" placeholder="+90 5xx xxx xx xx" style={inputStili} />
        </label>
        <label style={alanStili}>
          <span style={etiketStili}>Konu *</span>
          <input name="konu" type="text" required placeholder="Mesajınızın konusu" style={inputStili} />
        </label>
      </div>

      <label style={alanStili}>
        <span style={etiketStili}>Mesajınız *</span>
        <textarea name="mesaj" required rows={5} placeholder="Bize iletmek istediğiniz mesaj..." style={{ ...inputStili, resize: "vertical", minHeight: 120 }} />
      </label>

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: "var(--dvn-gri-500)", lineHeight: 1.5 }}>
        <input name="kvkk" type="checkbox" required style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--dvn-turuncu)", flexShrink: 0 }} />
        <span>
          <Link href="/kvkk" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>KVKK Aydınlatma Metni</Link>’ni
          okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
        </span>
      </label>

      <button
        type="submit"
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
          boxShadow: "0 8px 20px rgba(255,107,53,0.3)",
        }}
      >
        Mesajı Gönder
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {gonderildi && (
        <p style={{ fontSize: 13, color: "var(--dvn-turkuaz)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="var(--dvn-turkuaz)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          E-posta uygulamanız açıldı. Mesajınızı oradan gönderebilirsiniz.
        </p>
      )}

      <style>{`
        .dvn-iletisim-form input:focus,
        .dvn-iletisim-form textarea:focus {
          outline: none;
          border-color: var(--dvn-turkuaz) !important;
          box-shadow: 0 0 0 3px var(--dvn-turkuaz-soluk);
        }
        .dvn-iletisim-form input::placeholder,
        .dvn-iletisim-form textarea::placeholder {
          color: var(--dvn-gri-300);
        }
        @media (max-width: 560px) {
          .dvn-iletisim-form .dvn-form-satir { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

const alanStili: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };

const etiketStili: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 500,
  color: "var(--dvn-gri-700)",
};

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
