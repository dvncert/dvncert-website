import Link from "next/link";
import { hizmeteGoreBloglar } from "@/lib/icerik";
import { tarihiBicimle } from "@/lib/duyurular";

/**
 * Hizmet sayfalarında "İlgili Yazılar" bloğu — hizmet → blog geri linkleme.
 * Bloglar `ilgiliHizmetler` alanı üzerinden bu hizmete bağlanır (bkz.
 * lib/icerik.ts → hizmeteGoreBloglar). İlgili yazı yoksa hiç render edilmez.
 *
 * `arkaplan` ile bulunduğu sayfanın bölüm renk ritmine uyum sağlanır.
 */
export default async function IlgiliYazilar({
  hizmetSlug,
  arkaplan = "white",
  limit = 3,
}: {
  hizmetSlug: string;
  arkaplan?: string;
  limit?: number;
}) {
  const yazilar = await hizmeteGoreBloglar(hizmetSlug, limit);
  if (yazilar.length === 0) return null;

  return (
    <section style={{ background: arkaplan, padding: "60px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
            BİLGİ MERKEZİ
          </p>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
            Bu hizmetle ilgili yazılar
          </h2>
        </div>

        <div
          className="dvn-ilgili-yazi-grid"
          style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(yazilar.length, 3)}, 1fr)`, gap: 18 }}
        >
          {yazilar.map((y) => (
            <Link
              key={y.slug}
              href={`/blog/${y.slug}`}
              className="dvn-ilgili-yazi-kart"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--dvn-gri-50)",
                border: "0.5px solid var(--dvn-gri-300)",
                borderRadius: 14,
                padding: "24px 24px",
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
              }}
            >
              <span style={{ fontSize: 11, color: "var(--dvn-gri-500)", margin: "0 0 10px" }}>
                {y.kategori} · {tarihiBicimle(y.tarih)}
              </span>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.35 }}>
                {y.baslik}
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: "0 0 16px", flexGrow: 1 }}>
                {y.ozet}
              </p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--dvn-turuncu)" }}>
                Yazıyı oku
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dvn-ilgili-yazi-kart:hover {
          transform: translateY(-5px);
          background: #fff;
          border-color: rgba(212,169,63,0.45);
          box-shadow: 0 16px 36px rgba(2,35,152,0.1);
        }
        @media (max-width: 820px) {
          .dvn-ilgili-yazi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
