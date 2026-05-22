"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

interface AkordeonProps {
  baslik: string;
  id: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Erişilebilir, animasyonlu akordeon (collapsible) bölümü.
 *
 * SEO: İçerik DOM'da HER ZAMAN bulunur. Gizleme `display: none` ile değil,
 * `max-height: 0 + overflow: hidden` ile yapılır; böylece arama motorları
 * kapalı bölümlerin içeriğini de indeksleyebilir.
 *
 * - Yumuşak aç/kapa animasyonu (içerik yüksekliği ölçülerek; uzun içerik kırpılmaz)
 * - + / − ikonu (kapalı +, açık −)
 * - `defaultOpen` ile başlangıç durumu
 * - `id` ile URL hash desteği (#faydalar) — ilk yükleme ve hashchange'de açılır + scroll
 * - Başlık gerçek bir <button> (Tab + Enter/Space ile erişilebilir), 56px tıklama alanı
 */
export default function Akordeon({ baslik, id, defaultOpen = false, children }: AkordeonProps) {
  const [acik, setAcik] = useState(defaultOpen);
  const [hover, setHover] = useState(false);
  const [maxH, setMaxH] = useState<string>(defaultOpen ? "none" : "0px");
  const icerikRef = useRef<HTMLDivElement>(null);
  const ilkRender = useRef(true);

  const panelId = `${id}-panel`;
  const basligId = `${id}-baslik`;

  // max-height animasyonu — içeriğin gerçek yüksekliği ölçülür.
  useEffect(() => {
    const el = icerikRef.current;
    if (!el) return;

    // İlk render'da animasyon yok (açılışta titreme olmasın).
    if (ilkRender.current) {
      ilkRender.current = false;
      return;
    }

    let iptal = false;
    if (acik) {
      // 0 -> içerik yüksekliği (animasyon) -> none (içerik sonradan büyüyebilsin)
      setMaxH(el.scrollHeight + "px");
      const t = setTimeout(() => {
        if (!iptal) setMaxH("none");
      }, 380);
      return () => {
        iptal = true;
        clearTimeout(t);
      };
    } else {
      // none -> içerik yüksekliği -> 0 (kapanış animasyonu)
      setMaxH(el.scrollHeight + "px");
      const r = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!iptal) setMaxH("0px");
        });
      });
      return () => {
        iptal = true;
        cancelAnimationFrame(r);
      };
    }
  }, [acik]);

  // URL hash desteği: ilk yükleme + hashchange (hızlı bağlantılar).
  useEffect(() => {
    function hashKontrol() {
      const hash = window.location.hash.replace("#", "");
      if (hash === id) {
        setAcik(true);
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    }
    hashKontrol();
    window.addEventListener("hashchange", hashKontrol);
    return () => window.removeEventListener("hashchange", hashKontrol);
  }, [id]);

  const ikonRenk = acik ? "#D4A93F" : "var(--dvn-turuncu)";

  return (
    <div
      id={id}
      style={{
        marginBottom: 12,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(46,26,107,0.06)",
        scrollMarginTop: 96,
      }}
    >
      <h2 style={{ margin: 0 }}>
        <button
          type="button"
          id={basligId}
          aria-expanded={acik}
          aria-controls={panelId}
          onClick={() => setAcik((v) => !v)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%",
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            textAlign: "left",
            padding: "16px 22px",
            cursor: "pointer",
            border: "none",
            borderLeft: `4px solid ${acik ? "#D4A93F" : "var(--dvn-turuncu)"}`,
            background: acik
              ? "var(--dvn-lacivert)"
              : hover
                ? "var(--dvn-turuncu-soluk)"
                : "white",
            color: acik ? "white" : "var(--dvn-lacivert)",
            fontFamily: "inherit",
            transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
          }}
        >
          <span style={{ fontSize: 17.5, fontWeight: 600, lineHeight: 1.35 }}>{baslik}</span>

          {/* + / − ikonu */}
          <span
            aria-hidden="true"
            style={{
              position: "relative",
              flexShrink: 0,
              width: 28,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ position: "absolute", width: 16, height: 2.5, borderRadius: 2, background: ikonRenk }} />
            <span
              style={{
                position: "absolute",
                width: 16,
                height: 2.5,
                borderRadius: 2,
                background: ikonRenk,
                transform: acik ? "rotate(0deg)" : "rotate(90deg)",
                transition: "transform 0.28s ease",
              }}
            />
          </span>
        </button>
      </h2>

      <div
        id={panelId}
        ref={icerikRef}
        role="region"
        aria-labelledby={basligId}
        style={{
          maxHeight: maxH,
          overflow: "hidden",
          transition: "max-height 0.38s ease",
          background: "#fafbfc",
        }}
      >
        <div style={{ padding: 28 }}>{children}</div>
      </div>
    </div>
  );
}
