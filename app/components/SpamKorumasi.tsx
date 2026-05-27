"use client";

import { useEffect, useState } from "react";

/**
 * Form spam koruması — formun içine bir kez yerleştirilir.
 * İki gizli alan ekler:
 *  - 'website' (honeypot) — botlar doldurur, ekrandan/erişilebilirlikten gizli
 *  - '_ts' — formun ekrana geliş zamanı; server <2 saniye gönderimi reddeder
 *
 * Kullanım:
 *   <SpamKorumasi />
 * Sonra form gönderirken FormData'dan _honeypot ve _ts alanlarını oku.
 */
export default function SpamKorumasi() {
  const [ts, setTs] = useState<number>(0);
  useEffect(() => {
    setTs(Date.now());
  }, []);

  return (
    <>
      {/* Honeypot: bot dolduracak; insan ekranda görmez */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
        }}
      >
        <label>
          Web siteniz (boş bırakın)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="_ts" value={ts || ""} />
    </>
  );
}
