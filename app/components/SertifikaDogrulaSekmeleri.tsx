"use client";

import { useState } from "react";
import Link from "next/link";
import SertifikaNoFormu from "./SertifikaNoFormu";

type Sekme = "egitim" | "sistem";

/**
 * Ana sayfa doğrulama modülü: Eğitim sertifikası (numara/QR ile anında) ve
 * Sistem sertifikası (ISO belgeleri — doğrulama talebi formu) seçenekleri.
 */
export default function SertifikaDogrulaSekmeleri() {
  const [sekme, setSekme] = useState<Sekme>("egitim");

  return (
    <div className="dvn-dsek">
      <div className="dvn-dsek-baslar" role="tablist" aria-label="Sertifika türü">
        <button type="button" role="tab" aria-selected={sekme === "egitim"} onClick={() => setSekme("egitim")} className="dvn-dsek-bas">
          Eğitim Sertifikası<span className="dvn-dsek-ek"> Doğrula</span>
        </button>
        <button type="button" role="tab" aria-selected={sekme === "sistem"} onClick={() => setSekme("sistem")} className="dvn-dsek-bas">
          Sistem Sertifikası<span className="dvn-dsek-ek"> Doğrula</span>
        </button>
      </div>

      <div role="tabpanel" className="dvn-dsek-panel">
        {sekme === "egitim" ? (
          <>
            <p className="dvn-dsek-not">Sertifika üzerindeki 8 haneli numarayı girin veya QR kodu okutun.</p>
            <SertifikaNoFormu koyu />
          </>
        ) : (
          <>
            <p className="dvn-dsek-not">ISO yönetim sistemi belgeleri için doğrulama talebi oluşturun; belge durumu size e-posta ile bildirilir.</p>
            <Link href="/sertifika-sorgula#dogrulama-talebi" className="dvn-dsek-buton">
              Doğrulama Talebi Oluştur →
            </Link>
          </>
        )}
      </div>

      <style>{`
        .dvn-dsek { width: 100%; }
        .dvn-dsek-baslar {
          display: flex; gap: 4px; padding: 4px; margin-bottom: 14px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16); border-radius: 12px;
        }
        .dvn-dsek-bas {
          flex: 1; font-family: inherit; font-size: 13px; font-weight: 500; line-height: 1.3;
          color: #cbd5e1; background: transparent; border: none; border-radius: 9px;
          padding: 10px 12px; cursor: pointer; transition: background .18s ease, color .18s ease;
        }
        .dvn-dsek-bas:hover { color: #fff; }
        .dvn-dsek-bas[aria-selected="true"] { background: #fff; color: var(--dvn-lacivert); box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
        .dvn-dsek-panel { min-height: 104px; }
        @media (max-width: 480px) {
          .dvn-dsek-ek { display: none; }
          .dvn-dsek-bas { padding: 10px 6px; }
        }
        .dvn-dsek-not { margin: 0 0 12px; font-size: 13px; line-height: 1.6; color: #cbd5e1; }
        .dvn-dsek-buton {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--dvn-gradient-turuncu); color: #fff; text-decoration: none;
          padding: 13px 26px; border-radius: var(--dvn-radius-md);
          font-weight: 500; font-size: 14.5px; box-shadow: 0 8px 20px rgba(245,130,32,0.3);
        }
      `}</style>
    </div>
  );
}
