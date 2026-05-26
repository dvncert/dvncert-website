import type { ReactNode } from "react";
import { sosyalGetir } from "@/lib/site-ayarlari";

/**
 * Sosyal medya ikon şeridi. `siteConfig.sosyal` içinden URL'i dolu olan
 * platformları otomatik gösterir; eksik olanları atlar. Hem koyu (footer)
 * hem açık (blog/iletişim) zeminlerde kullanılabilir.
 */
type Tema = "koyu" | "acik";

interface Props {
  boyut?: number;
  tema?: Tema;
  /** Sağa hizalama, ortalama vb. dışarıdan ayarlanmak istenirse. */
  hizala?: "sol" | "orta" | "sag";
  /** İkonların üstüne küçük bir başlık (ör. "BİZİ TAKİP EDİN"). Hiç URL yoksa o da görünmez. */
  baslik?: string;
}

const ikonStrokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: "55%",
  height: "55%",
  "aria-hidden": true,
};

const ikonlar: Record<string, ReactNode> = {
  linkedin: (
    <svg {...ikonStrokeProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  instagram: (
    <svg {...ikonStrokeProps}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  twitter: (
    <svg {...ikonStrokeProps}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  facebook: (
    <svg {...ikonStrokeProps}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
};

export default async function SosyalIkonlar({ boyut = 38, tema = "koyu", hizala = "sol", baslik }: Props) {
  const sosyal = await sosyalGetir();
  const liste = [
    { tip: "linkedin", url: sosyal.linkedin, etiket: "LinkedIn" },
    { tip: "instagram", url: sosyal.instagram, etiket: "Instagram" },
    { tip: "twitter", url: sosyal.twitter, etiket: "X (Twitter)" },
    { tip: "facebook", url: sosyal.facebook, etiket: "Facebook" },
  ].filter((s) => Boolean(s.url));

  if (liste.length === 0) return null;

  const koyuStil = {
    background: "rgba(255,255,255,0.08)",
    color: "#cbd5e1",
    border: "0.5px solid rgba(255,255,255,0.14)",
  };
  const acikStil = {
    background: "white",
    color: "var(--dvn-lacivert)",
    border: "0.5px solid var(--dvn-gri-300)",
  };
  const stil = tema === "koyu" ? koyuStil : acikStil;
  const justify = hizala === "orta" ? "center" : hizala === "sag" ? "flex-end" : "flex-start";

  const baslikRengi = tema === "koyu" ? "var(--dvn-altin-acik)" : "var(--dvn-gri-500)";

  return (
    <div>
      {baslik && (
        <p style={{ fontSize: 11, color: baslikRengi, fontWeight: 500, margin: "0 0 10px", letterSpacing: 0.4, textAlign: hizala === "orta" ? "center" : hizala === "sag" ? "right" : "left" }}>
          {baslik}
        </p>
      )}
      <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: justify, flexWrap: "wrap" }}>
        {liste.map((s) => (
        <a
          key={s.tip}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.etiket} sayfamız`}
          title={s.etiket}
          className={`dvn-sosyal dvn-sosyal-${tema}`}
          style={{
            ...stil,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: boyut,
            height: boyut,
            borderRadius: 999,
            textDecoration: "none",
            transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
          }}
        >
          {ikonlar[s.tip]}
        </a>
      ))}
        <style>{`
          .dvn-sosyal-koyu:hover { background: var(--dvn-turuncu) !important; color: #fff !important; border-color: var(--dvn-turuncu) !important; transform: translateY(-2px); }
          .dvn-sosyal-acik:hover { background: var(--dvn-lacivert) !important; color: #fff !important; border-color: var(--dvn-lacivert) !important; transform: translateY(-2px); }
        `}</style>
      </div>
    </div>
  );
}
