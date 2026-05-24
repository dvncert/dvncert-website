import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

export default async function AdminPanel() {
  const session = await auth();
  if (!session?.user) redirect("/admin/giris");

  return (
    <main style={{ minHeight: "100vh", background: "var(--dvn-gri-50)", padding: "40px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          <div>
            <h1 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 600, margin: 0 }}>Yönetim Paneli</h1>
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 13, margin: "4px 0 0" }}>{session.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/giris" });
            }}
          >
            <button
              type="submit"
              style={{
                background: "white",
                border: "0.5px solid var(--dvn-gri-300)",
                color: "var(--dvn-lacivert)",
                padding: "9px 18px",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 13.5,
                cursor: "pointer",
              }}
            >
              Çıkış
            </button>
          </form>
        </div>

        <p style={{ color: "var(--dvn-gri-700)", fontSize: 14 }}>
          İçerik yönetimi modülleri (duyurular, blog, yorumlar, referanslar, form gönderileri) bir sonraki
          aşamada bu panele eklenecek.
        </p>
      </div>
    </main>
  );
}
