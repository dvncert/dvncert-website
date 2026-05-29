import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/giris");

  return (
    <div style={{ minHeight: "100vh", background: "var(--dvn-gri-50)" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--dvn-lacivert)",
          color: "white",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/admin"
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
          aria-label="DVN Cert Yönetim Paneli — Panele dön"
        >
          <span style={{ display: "flex", background: "#fff", borderRadius: 8, padding: "6px 10px" }}>
            <Image src="/logo.webp" alt="DVN Cert" width={120} height={66} priority style={{ height: 30, width: "auto", display: "block" }} />
          </span>
          <span style={{ color: "white", fontSize: 14.5, fontWeight: 600 }}>Yönetim Paneli</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/"
            target="_blank"
            className="dvn-admin-ust-link"
            style={{ color: "#cbd5e1", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Siteyi Gör
          </Link>
          <span style={{ fontSize: 12.5, color: "#9aa5b1", display: "none" }} className="dvn-admin-email">
            {session.user.email}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/giris" });
            }}
          >
            <button
              type="submit"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Çıkış
            </button>
          </form>
        </div>
      </header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 24px 60px", minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", marginBottom: 18 }}>
          Giriş: {session.user.email}
        </div>
        {children}
      </main>

      <style>{`
        .dvn-admin-ust-link:hover { color: #fff !important; }
        @media (min-width: 720px) { .dvn-admin-email { display: inline !important; } }
      `}</style>
    </div>
  );
}
