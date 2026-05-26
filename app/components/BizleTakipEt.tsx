import type { ReactNode } from "react";
import { sosyalGetir } from "@/lib/site-ayarlari";

/**
 * Blog ve benzeri sayfaların altına konulan "Bizi sosyal medyada takip edin"
 * köşesi. Resmî LinkedIn/Instagram marka renkleriyle iki büyük kart.
 * `siteConfig.sosyal` içinden URL'i dolu olan platformları gösterir;
 * hiç URL yoksa bölüm tamamen gizlenir.
 */
interface Props {
  baslik?: string;
  aciklama?: string;
}

const linkedInIkon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const instagramIkon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface Hesap {
  tip: string;
  url: string;
  ad: string;
  aciklama: string;
  ikon: ReactNode;
  /** Marka rengi (rozet arka planı). */
  arkaplan: string;
}

export default async function BizleTakipEt({
  baslik = "Bizi sosyal medyada takip edin",
  aciklama = "En güncel duyurular, denetim haberleri ve sektörel içerikler için bizi takip edin.",
}: Props) {
  const sosyal = await sosyalGetir();
  const hepsi: Hesap[] = [
    {
      tip: "linkedin",
      url: sosyal.linkedin,
      ad: "LinkedIn",
      aciklama: "Sektörel içerikler, duyurular ve denetim haberleri",
      ikon: linkedInIkon,
      arkaplan: "#0A66C2", // LinkedIn resmî marka rengi
    },
    {
      tip: "instagram",
      url: sosyal.instagram,
      ad: "Instagram",
      aciklama: "Görseller, kısa içerikler ve gündelik paylaşımlar",
      ikon: instagramIkon,
      arkaplan: "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)", // Instagram resmî gradient
    },
  ];
  const hesaplar = hepsi.filter((h) => Boolean(h.url));
  if (hesaplar.length === 0) return null;

  return (
    <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="dvn-bolum-etiket">SOSYAL MEDYA</span>
          <h2 className="dvn-bolum-baslik" style={{ fontSize: 24 }}>
            {baslik}
          </h2>
          {aciklama && (
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 14, lineHeight: 1.6, margin: "10px auto 0", maxWidth: 580 }}>
              {aciklama}
            </p>
          )}
        </div>

        <div
          className="dvn-takip-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${hesaplar.length}, minmax(0, 1fr))`,
            gap: 20,
          }}
        >
          {hesaplar.map((h) => (
            <a
              key={h.tip}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${h.ad} sayfamız`}
              className="dvn-takip-kart"
              style={{
                background: "white",
                border: "0.5px solid var(--dvn-gri-300)",
                borderRadius: 14,
                padding: "26px 24px",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
              }}
            >
              <div
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  background: h.arkaplan,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {h.ikon}
              </div>
              <div style={{ minWidth: 0, flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: 0 }}>
                    {h.ad}&apos;de bizi takip edin
                  </h3>
                </div>
                <p style={{ color: "var(--dvn-gri-500)", fontSize: 13, lineHeight: 1.5, margin: "4px 0 8px" }}>
                  {h.aciklama}
                </p>
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--dvn-turuncu)",
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Sayfaya git
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <style>{`
          .dvn-takip-kart:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(2,35,152,0.12) !important;
            border-color: var(--dvn-turuncu-acik) !important;
          }
          @media (max-width: 720px) {
            .dvn-takip-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
