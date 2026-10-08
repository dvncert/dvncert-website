"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Sertifika numarası ile anında doğrulama — /sertifika-sorgula/{no} sayfasına
 * yönlendirir (QR kodları da aynı adrese gider). koyu: lacivert zemin üzerinde.
 */
export default function SertifikaNoFormu({ koyu = false, varsayilan = "" }: { koyu?: boolean; varsayilan?: string }) {
  const router = useRouter();
  const [no, setNo] = useState(varsayilan);
  const [hata, setHata] = useState("");
  const [bekliyor, setBekliyor] = useState(false);

  function gonder(e: React.FormEvent) {
    e.preventDefault();
    const temiz = no.toLocaleUpperCase("tr-TR").replace(/İ/g, "I").replace(/[^A-Z0-9]/g, "");
    if (temiz.length !== 8) {
      setHata("Sertifika numarası 8 haneli olmalıdır (harf ve rakam).");
      return;
    }
    setHata("");
    setBekliyor(true);
    router.push(`/sertifika-sorgula/${temiz}`);
  }

  return (
    <form onSubmit={gonder} className={`dvn-sno-form${koyu ? " dvn-sno-form--koyu" : ""}`} noValidate>
      <div className="dvn-sno-satir">
        <input
          value={no}
          onChange={(e) => {
            setNo(e.target.value);
            setHata("");
            setBekliyor(false);
          }}
          name="sertifikaNo"
          aria-label="Sertifika numarası"
          placeholder="Sertifika No (örn. K7M3QX9A)"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={14}
          className="dvn-sno-input"
        />
        <button type="submit" disabled={bekliyor} className="dvn-sno-buton">
          {bekliyor ? "Sorgulanıyor…" : "Doğrula"}
        </button>
      </div>
      {hata && <p className="dvn-sno-hata">{hata}</p>}

      <style>{`
        .dvn-sno-form { width: 100%; }
        .dvn-sno-satir { display: flex; gap: 10px; }
        .dvn-sno-input {
          flex: 1; min-width: 0;
          font-family: inherit; font-size: 16px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--dvn-lacivert); background: white;
          border: 1px solid var(--dvn-gri-300); border-radius: var(--dvn-radius-md);
          padding: 13px 16px;
          transition: border-color .18s ease, box-shadow .18s ease;
        }
        .dvn-sno-input::placeholder { text-transform: none; letter-spacing: 0; color: var(--dvn-gri-500); font-size: 14.5px; }
        .dvn-sno-input:focus { outline: none; border-color: var(--dvn-altin); box-shadow: 0 0 0 3px var(--dvn-altin-soluk); }
        .dvn-sno-buton {
          flex-shrink: 0;
          background: var(--dvn-gradient-turuncu); color: white; border: none;
          padding: 13px 26px; border-radius: var(--dvn-radius-md);
          font-family: inherit; font-weight: 500; font-size: 14.5px; cursor: pointer;
          box-shadow: 0 8px 20px rgba(245,130,32,0.3);
        }
        .dvn-sno-buton:disabled { opacity: .7; cursor: default; }
        .dvn-sno-hata { margin: 8px 0 0; font-size: 13px; color: var(--dvn-turuncu); }
        .dvn-sno-form--koyu .dvn-sno-input { border-color: rgba(255,255,255,0.25); }
        .dvn-sno-form--koyu .dvn-sno-hata { color: #fdba74; }
        @media (max-width: 480px) {
          .dvn-sno-satir { flex-direction: column; }
        }
      `}</style>
    </form>
  );
}
