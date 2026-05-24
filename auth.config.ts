import type { NextAuthConfig } from "next-auth";

/**
 * Edge-güvenli temel yapılandırma (DB/bcrypt İÇERMEZ) — middleware bunu kullanır.
 * DB sorgulu Credentials sağlayıcısı auth.ts'te (Node) tanımlıdır.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/giris",
  },
  callbacks: {
    authorized({ auth, request }) {
      const girisYapildi = Boolean(auth?.user);
      const { pathname } = request.nextUrl;
      const adminBolgesi = pathname.startsWith("/admin");
      const girisSayfasi = pathname === "/admin/giris";
      // Giriş sayfası hariç tüm /admin alanı koruma altında
      if (adminBolgesi && !girisSayfasi) return girisYapildi;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
