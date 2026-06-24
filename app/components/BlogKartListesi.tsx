import Link from "next/link";
import type { BlogYazisi } from "@/lib/blog";
import { tarihiBicimle } from "@/lib/duyurular";

/**
 * Blog yazısı kart ızgarası — hem /blog listesinde hem /blog/kategori/[slug]
 * sayfasında kullanılır. Kart bir <Link> olduğundan kategori rozeti burada
 * tıklanabilir değildir (iç içe link olmaz); kategori gezinmesi filtre
 * çubuğundan (BlogKategoriFiltre) yapılır.
 */
export default function BlogKartListesi({ yazilar }: { yazilar: BlogYazisi[] }) {
  return (
    <>
      <div className="dvn-blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {yazilar.map((y) => (
          <Link
            key={y.slug}
            href={`/blog/${y.slug}`}
            className="dvn-blog-kart"
            style={{
              background: "white",
              borderRadius: 14,
              padding: "26px 24px",
              boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
              border: "0.5px solid var(--dvn-gri-300)",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: "var(--dvn-altin)", background: "var(--dvn-altin-soluk)", padding: "4px 10px", borderRadius: 999 }}>
                {y.kategori}
              </span>
              <span style={{ fontSize: 12, color: "var(--dvn-gri-500)" }}>{tarihiBicimle(y.tarih)}</span>
            </div>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
              {y.baslik}
            </h2>
            <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", lineHeight: 1.6, margin: "0 0 18px", flexGrow: 1 }}>
              {y.ozet}
            </p>
            <span style={{ fontSize: 13, color: "var(--dvn-turuncu)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
              Yazıyı oku
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        .dvn-blog-kart:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(2,35,152,0.12) !important; }
        @media (max-width: 900px) { .dvn-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
