"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { formGonderAction } from "../actions/form-gonder";
import SpamKorumasi from "./SpamKorumasi";

/**
 * İdari/ofis pozisyonları için kariyer başvuru formu. Gönderim veritabanına
 * yazılır ve admin panelindeki "Form Gönderileri" gelen kutusunda görünür.
 */
export default function KariyerFormu() {
  const [gonderildi, setGonderildi] = useState(false);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState(false);

  async function gonder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const pozisyon = String(data.get("pozisyon") ?? "");
    const cv = String(data.get("cv") ?? "");
    setGonderiliyor(true);
    setHata(false);
    const sonuc = await formGonderAction({
      tip: "kariyer",
      ad: String(data.get("ad") ?? ""),
      email: String(data.get("email") ?? ""),
      telefon: String(data.get("telefon") ?? ""),
      konu: pozisyon,
      mesaj: String(data.get("mesaj") ?? ""),
      ekVeri: { pozisyon, cv },
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
    <form onSubmit={gonder} className="dvn-kariyer-form" style={{ display: "grid", gap: 16, position: "relative" }}>
      <SpamKorumasi />
      <label style={alanStili}>
        <span style={etiketStili}>Başvurulan Pozisyon *</span>
        <select name="pozisyon" required defaultValue="" style={inputStili}>
          <option value="" disabled>
            Pozisyon seçiniz
          </option>
          {siteConfig.kariyer.idariPozisyonlar.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
          <option value="Diğer">Diğer</option>
        </select>
      </label>

      <div className="dvn-form-satir" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label style={alanStili}>
          <span style={etiketStili}>Ad Soyad *</span>
          <input name="ad" type="text" required placeholder="Adınız Soyadınız" style={inputStili} />
        </label>
        <label style={alanStili}>
          <span style={etiketStili}>E-posta *</span>
          <input name="email" type="email" required placeholder="ornek@eposta.com" style={inputStili} />
        </label>
      </div>

      <div className="dvn-form-satir" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label style={alanStili}>
          <span style={etiketStili}>Telefon</span>
          <input name="telefon" type="tel" placeholder="+90 5xx xxx xx xx" style={inputStili} />
        </label>
        <label style={alanStili}>
          <span style={etiketStili}>CV / Profil bağlantısı</span>
          <input name="cv" type="url" placeholder="LinkedIn, Drive vb. bağlantı" style={inputStili} />
        </label>
      </div>

      <label style={alanStili}>
        <span style={etiketStili}>Ön Yazı / Mesaj *</span>
        <textarea name="mesaj" required rows={5} placeholder="Kendinizden ve deneyimlerinizden kısaca bahsedin..." style={{ ...inputStili, resize: "vertical", minHeight: 120 }} />
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
        {gonderiliyor ? "Gönderiliyor..." : "Başvuruyu Gönder"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {gonderildi && (
        <p style={{ fontSize: 13, color: "var(--dvn-altin)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="var(--dvn-altin)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Başvurunuz alındı. Teşekkür ederiz; değerlendirme sonrası dönüş yapılacaktır.
        </p>
      )}
      {hata && (
        <p style={{ fontSize: 13, color: "var(--dvn-turuncu)", margin: 0 }}>
          Gönderilemedi. Lütfen tekrar deneyin veya {siteConfig.email} adresine yazın.
        </p>
      )}

      <style>{`
        .dvn-kariyer-form input:focus,
        .dvn-kariyer-form select:focus,
        .dvn-kariyer-form textarea:focus {
          outline: none;
          border-color: var(--dvn-altin) !important;
          box-shadow: 0 0 0 3px var(--dvn-altin-soluk);
        }
        .dvn-kariyer-form input::placeholder,
        .dvn-kariyer-form textarea::placeholder {
          color: var(--dvn-gri-300);
        }
        @media (max-width: 560px) {
          .dvn-kariyer-form .dvn-form-satir { grid-template-columns: 1fr !important; }
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
