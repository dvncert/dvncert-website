"use client";

import { useId, useMemo, useRef, useState } from "react";
import { aramaKelimeleri, aramaNormalize, tanimEslesir } from "@/lib/egitim-tanimlari";
import { adminInput } from "../_ui";

/**
 * Eğitim adı alanı — yazdıkça eğitim tanımlarından öneri getirir.
 * Her kelime bir kelime başıyla eşleşmeli (sıra fark etmez): "9001 iç",
 * "iso9001", "fmea", "core tools", "isg" gibi. Listede olmayan bir ad da serbestçe yazılabilir.
 */
export default function EgitimAdiGirdisi({ tanimlar, varsayilan }: { tanimlar: string[]; varsayilan: string }) {
  const [deger, setDeger] = useState(varsayilan);
  const [acik, setAcik] = useState(false);
  const [secili, setSecili] = useState(0);
  const listeRef = useRef<HTMLUListElement>(null);
  const listeId = useId();

  const dizin = useMemo(() => tanimlar.map((ad) => ({ ad, n: aramaNormalize(ad), kelimeler: aramaKelimeleri(ad) })), [tanimlar]);

  const oneriler = useMemo(() => {
    const q = aramaNormalize(deger);
    if (!q) return dizin.map((d) => d.ad);
    return dizin
      .filter((d) => tanimEslesir(d.kelimeler, q))
      .sort((a, b) => Number(!b.n.startsWith(q)) - Number(!a.n.startsWith(q)))
      .map((d) => d.ad);
  }, [deger, dizin]);

  const goster = acik && oneriler.length > 0 && !(oneriler.length === 1 && oneriler[0] === deger);

  function sec(ad: string) {
    setDeger(ad);
    setAcik(false);
  }

  function tus(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!goster) {
      if (e.key === "ArrowDown") setAcik(true);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const yeni = (secili + (e.key === "ArrowDown" ? 1 : -1) + oneriler.length) % oneriler.length;
      setSecili(yeni);
      listeRef.current?.children[yeni]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (oneriler[secili]) {
        if (e.key === "Enter") e.preventDefault();
        sec(oneriler[secili]);
      }
    } else if (e.key === "Escape") {
      setAcik(false);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        name="egitimAdi"
        required
        value={deger}
        autoComplete="off"
        role="combobox"
        aria-expanded={goster}
        aria-controls={listeId}
        aria-autocomplete="list"
        placeholder="Yazmaya başlayın — örn. ISO 9001, FMEA, 19011"
        onChange={(e) => {
          setDeger(e.target.value);
          setAcik(true);
          setSecili(0);
        }}
        onFocus={() => setAcik(true)}
        onBlur={() => setAcik(false)}
        onKeyDown={tus}
        style={adminInput}
      />
      {goster && (
        <ul
          ref={listeRef}
          id={listeId}
          role="listbox"
          style={{
            position: "absolute",
            zIndex: 20,
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            maxHeight: 280,
            overflowY: "auto",
            margin: 0,
            padding: 4,
            listStyle: "none",
            background: "white",
            border: "1px solid var(--dvn-gri-300)",
            borderRadius: 8,
            boxShadow: "0 12px 28px rgba(2,35,152,0.14)",
          }}
        >
          {oneriler.map((ad, i) => (
            <li
              key={ad}
              role="option"
              aria-selected={i === secili}
              // onMouseDown: input blur'undan önce seçimi yakalar
              onMouseDown={(e) => {
                e.preventDefault();
                sec(ad);
              }}
              onMouseEnter={() => setSecili(i)}
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                fontSize: 13.5,
                color: "var(--dvn-lacivert)",
                cursor: "pointer",
                background: i === secili ? "var(--dvn-altin-soluk)" : "transparent",
              }}
            >
              {ad}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
