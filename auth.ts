import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { db } from "@/lib/db";
import { adminKullanicilar } from "@/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      authorize: async (creds) => {
        const email = typeof creds?.email === "string" ? creds.email.trim().toLowerCase() : "";
        const password = typeof creds?.password === "string" ? creds.password : "";
        if (!email || !password) return null;

        const rows = await db
          .select()
          .from(adminKullanicilar)
          .where(eq(adminKullanicilar.email, email))
          .limit(1);
        const kullanici = rows[0];
        if (!kullanici) return null;

        const sifreDogru = bcrypt.compareSync(password, kullanici.sifreHash);
        if (!sifreDogru) return null;

        return { id: String(kullanici.id), email: kullanici.email, name: kullanici.ad ?? null };
      },
    }),
  ],
});
