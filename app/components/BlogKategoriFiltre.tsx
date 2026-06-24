import Link from "next/link";
import type { BlogKategori } from "@/lib/icerik";

/**
 * Blog kategori filtre çubuğu — pill bağlantıları. "Tümü" /blog'a, her kategori
 * /blog/kategori/[slug]'a gider. aktifSlug verilirse o pill vurgulanır
 * ("tumu" → /blog aktif).
 */
export default function BlogKategoriFiltre({
  kategoriler,
  aktifSlug = "tumu",
}: {
  kategoriler: BlogKategori[];
  aktifSlug?: string;
}) {
  if (kategoriler.length === 0) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32, justifyContent: "center" }}>
      <Pill href="/blog" etiket="Tümü" aktif={aktifSlug === "tumu"} />
      {kategoriler.map((k) => (
        <Pill key={k.slug} href={`/blog/kategori/${k.slug}`} etiket={`${k.ad} (${k.adet})`} aktif={aktifSlug === k.slug} />
      ))}
    </div>
  );
}

function Pill({ href, etiket, aktif }: { href: string; etiket: string; aktif: boolean }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 13,
        fontWeight: 500,
        padding: "8px 16px",
        borderRadius: 999,
        textDecoration: "none",
        border: "0.5px solid var(--dvn-gri-300)",
        background: aktif ? "var(--dvn-gradient-turuncu)" : "white",
        color: aktif ? "white" : "var(--dvn-lacivert)",
        boxShadow: aktif ? "0 6px 16px rgba(245,130,32,0.25)" : "none",
      }}
    >
      {etiket}
    </Link>
  );
}
