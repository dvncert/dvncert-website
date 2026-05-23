import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı. DVN Cert ana sayfasından veya hizmetlerimizden devam edebilirsiniz.",
  robots: { index: false, follow: true },
};

const hizliLinkler = [
  { etiket: "Ana Sayfa", href: "/" },
  { etiket: "Hizmetlerimiz", href: "/hizmetler" },
  { etiket: "Duyurular", href: "/duyurular" },
  { etiket: "İletişim", href: "/iletisim" },
];

export default function NotFound() {
  return (
    <main>
      <section
        style={{
          background: "var(--dvn-gradient-lacivert)",
          padding: "90px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dekoratif daire */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 280,
            height: 280,
            background: "radial-gradient(circle, rgba(212,169,63,0.16) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={{ fontSize: 84, fontWeight: 700, lineHeight: 1, margin: 0, color: "var(--dvn-altin-acik)" }}>404</p>

          <h1 style={{ color: "white", fontSize: 28, fontWeight: 500, margin: "16px 0 0", lineHeight: 1.3 }}>
            Aradığınız sayfa bulunamadı
          </h1>

          <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.75, margin: "14px auto 0", maxWidth: 560 }}>
            Sayfa taşınmış, adı değişmiş veya henüz yayında olmayabilir. Aşağıdaki bağlantılardan
            sitede gezinmeye devam edebilirsiniz.
          </p>

          {/* Birincil CTA */}
          <div style={{ marginTop: 30 }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--dvn-gradient-turuncu)",
                color: "white",
                padding: "13px 26px",
                borderRadius: "var(--dvn-radius-md)",
                fontWeight: 500,
                fontSize: 14,
                boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
              }}
            >
              Ana Sayfaya Dön →
            </Link>
          </div>

          {/* Hızlı bağlantılar */}
          <nav
            aria-label="Hızlı bağlantılar"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 28 }}
          >
            {hizliLinkler.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "white",
                  background: "rgba(255,255,255,0.08)",
                  border: "0.5px solid rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  padding: "9px 18px",
                }}
              >
                {l.etiket}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
