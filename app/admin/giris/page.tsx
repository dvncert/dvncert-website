import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: "Admin Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminGirisSayfasi({
  searchParams,
}: {
  searchParams: Promise<{ hata?: string }>;
}) {
  const { hata } = await searchParams;

  async function girisYap(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect("/admin/giris?hata=1");
      }
      throw error; // başarı yönlendirmesi (NEXT_REDIRECT) dahil diğer hatalar
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--dvn-gradient-lacivert)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "white",
          borderRadius: 16,
          padding: "36px 32px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <Image src="/logo.webp" alt="DVN Cert" width={180} height={99} priority style={{ height: 56, width: "auto" }} />
        </div>

        <h1 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 600, margin: "0 0 4px", textAlign: "center" }}>
          DVN Cert Yönetim
        </h1>
        <p style={{ color: "var(--dvn-gri-500)", fontSize: 13.5, margin: "0 0 24px", textAlign: "center" }}>
          Devam etmek için giriş yapın.
        </p>

        {hata && (
          <div
            style={{
              background: "var(--dvn-turuncu-soluk)",
              border: "0.5px solid var(--dvn-turuncu)",
              color: "var(--dvn-turuncu)",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 18,
            }}
          >
            E-posta veya şifre hatalı.
          </div>
        )}

        <form action={girisYap} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--dvn-lacivert)" }}>E-posta</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              style={{
                padding: "11px 14px",
                fontSize: 14,
                fontFamily: "inherit",
                border: "1px solid var(--dvn-gri-300)",
                borderRadius: 8,
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--dvn-lacivert)" }}>Şifre</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              style={{
                padding: "11px 14px",
                fontSize: 14,
                fontFamily: "inherit",
                border: "1px solid var(--dvn-gri-300)",
                borderRadius: 8,
                outline: "none",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: 6,
              background: "var(--dvn-gradient-turuncu)",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
            }}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </main>
  );
}
