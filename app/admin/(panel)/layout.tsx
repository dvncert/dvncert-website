import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

const nav = [
  { ad: "Panel", href: "/admin" },
  { ad: "Duyurular", href: "/admin/duyurular" },
  { ad: "Blog", href: "/admin/blog" },
  { ad: "Etkinlikler", href: "/admin/etkinlikler" },
  { ad: "Ekibimiz", href: "/admin/ekip" },
  { ad: "Akreditasyonlar", href: "/admin/akreditasyonlar" },
  { ad: "Logolar", href: "/admin/logolar" },
  { ad: "Dokümanlar", href: "/admin/dokumanlar" },
  { ad: "Yorumlar", href: "/admin/yorumlar" },
  { ad: "Referanslar", href: "/admin/referanslar" },
  { ad: "Form Gönderileri", href: "/admin/gonderiler" },
  { ad: "Üst Menü", href: "/admin/menu" },
  { ad: "Sayfa SEO", href: "/admin/sayfa-seo" },
  { ad: "Site Ayarları", href: "/admin/site-ayarlari" },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/giris");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--dvn-gri-50)" }}>
      <aside
        style={{
          width: 220,
          background: "var(--dvn-lacivert)",
          color: "white",
          padding: "24px 16px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link
          href="/admin"
          style={{ display: "block", background: "#fff", borderRadius: 10, padding: "12px 16px", marginBottom: 22 }}
          aria-label="DVN Cert Yönetim Paneli"
        >
          <Image
            src="/logo.webp"
            alt="DVN Cert"
            width={150}
            height={83}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Link>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="dvn-admin-nav"
              style={{ color: "#cbd5e1", padding: "9px 12px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}
            >
              {n.ad}
            </Link>
          ))}
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/giris" });
          }}
          style={{ marginTop: "auto", paddingTop: 24 }}
        >
          <button
            type="submit"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.08)",
              border: "0.5px solid rgba(255,255,255,0.2)",
              color: "white",
              padding: "9px 12px",
              borderRadius: 8,
              fontSize: 13.5,
              cursor: "pointer",
            }}
          >
            Çıkış
          </button>
        </form>
      </aside>

      <main style={{ flex: 1, padding: "28px 32px", minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", marginBottom: 18 }}>
          Giriş: {session.user.email}
        </div>
        {children}
      </main>

      <style>{`.dvn-admin-nav:hover { background: rgba(255,255,255,0.10); color: #fff !important; }`}</style>
    </div>
  );
}
