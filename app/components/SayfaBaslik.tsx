import Link from "next/link";

export type Kirinti = {
  etiket: string;
  /** Verilirse link, verilmezse düz metin (genelde aktif/son sayfa). */
  href?: string;
};

/**
 * Tüm iç sayfaların üstünde kullanılan ortak başlık banner'ı.
 * Lacivert gradient zemin + breadcrumb + sayfa başlığı + opsiyonel açıklama.
 */
export default function SayfaBaslik({
  etiket,
  baslik,
  aciklama,
  kirintilar = [],
}: {
  /** Üstteki küçük turuncu etiket, ör. "KURUMSAL" */
  etiket?: string;
  baslik: string;
  aciklama?: string;
  kirintilar?: Kirinti[];
}) {
  // "Ana Sayfa" her zaman ilk kırıntıdır
  const tumKirintilar: Kirinti[] = [{ etiket: "Ana Sayfa", href: "/" }, ...kirintilar];

  return (
    <section
      style={{
        background: "var(--dvn-gradient-lacivert)",
        padding: "48px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dvn-grid-desen" aria-hidden style={{ opacity: 0.5 }} />
      <span className="dvn-glow-orb dvn-glow-orb--altin" aria-hidden style={{ top: -130, right: -50, width: 320, height: 320, opacity: 0.4 }} />
      <span className="dvn-glow-orb dvn-glow-orb--turuncu" aria-hidden style={{ bottom: -160, left: "12%", width: 280, height: 280, opacity: 0.28 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 14, fontSize: 12.5 }}>
          {tumKirintilar.map((k, i) => {
            const sonuncu = i === tumKirintilar.length - 1;
            return (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {k.href && !sonuncu ? (
                  <Link href={k.href} className="dvn-kirinti-link" style={{ color: "#9aa5b1" }}>
                    {k.etiket}
                  </Link>
                ) : (
                  <span style={{ color: sonuncu ? "var(--dvn-altin-acik)" : "#9aa5b1" }}>{k.etiket}</span>
                )}
                {!sonuncu && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            );
          })}
        </nav>

        {etiket && (
          <p
            style={{
              fontSize: 11,
              color: "var(--dvn-turuncu-acik)",
              fontWeight: 500,
              letterSpacing: "1.5px",
              margin: "0 0 8px",
            }}
          >
            {etiket}
          </p>
        )}

        <h1 style={{ color: "white", fontSize: 30, fontWeight: 500, margin: 0, lineHeight: 1.25 }}>{baslik}</h1>

        {aciklama && (
          <p style={{ color: "#cbd5e1", fontSize: 14.5, lineHeight: 1.7, margin: "12px 0 0", maxWidth: 760 }}>
            {aciklama}
          </p>
        )}
      </div>

      <style>{`
        .dvn-kirinti-link:hover {
          color: var(--dvn-turuncu-acik) !important;
        }
      `}</style>
    </section>
  );
}
