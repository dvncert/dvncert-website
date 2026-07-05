import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq, and, gte, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { db } from "@/lib/db";
import { adminKullanicilar, girisDenemeleri } from "@/lib/db/schema";

// Brute-force koruması: IP başına 15 dakikada bu kadar başarısız denemeden
// sonra giriş geçici kilitlenir. Tüm DB erişimi try/catch ile korunur —
// giris_denemeleri tablosu prod'da henüz yoksa koruma devre dışı kalır ama
// giriş normal çalışmaya devam eder (kırılmaz).
const GIRIS_LIMIT = 8;
const GIRIS_PENCERE_DK = 15;

/** İstekten istemci IP'sini çıkarır (Vercel/Cloudflare header'ları). */
function girisIp(request: Request | undefined): string | null {
  const h = request?.headers;
  if (!h) return null;
  const f = h.get("x-forwarded-for");
  if (f) return f.split(",")[0]?.trim() ?? null;
  return h.get("x-real-ip") ?? h.get("cf-connecting-ip");
}

/** Son penceredeki başarısız deneme sayısı. Hata olursa 0 (koruma pasif). */
async function basarisizDenemeSayisi(ip: string): Promise<number> {
  const eski = new Date(Date.now() - GIRIS_PENCERE_DK * 60_000);
  try {
    const r = await db
      .select({ c: sql<number>`count(*)` })
      .from(girisDenemeleri)
      .where(and(eq(girisDenemeleri.ip, ip), eq(girisDenemeleri.basarili, false), gte(girisDenemeleri.olusturulma, eski)));
    return Number(r[0]?.c ?? 0);
  } catch {
    return 0;
  }
}

async function girisDenemeKaydet(ip: string | null, email: string, basarili: boolean): Promise<void> {
  try {
    await db.insert(girisDenemeleri).values({ ip, email, basarili });
  } catch {
    // tablo yoksa sessizce geç — giriş akışını bozma
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      authorize: async (creds, request) => {
        const email = typeof creds?.email === "string" ? creds.email.trim().toLowerCase() : "";
        const password = typeof creds?.password === "string" ? creds.password : "";
        if (!email || !password) return null;

        const ip = girisIp(request as Request | undefined);

        // Brute-force kilidi: eşik aşıldıysa şifreyi kontrol etmeden reddet.
        if (ip && (await basarisizDenemeSayisi(ip)) >= GIRIS_LIMIT) {
          return null;
        }

        const rows = await db
          .select()
          .from(adminKullanicilar)
          .where(eq(adminKullanicilar.email, email))
          .limit(1);
        const kullanici = rows[0];
        if (!kullanici) {
          await girisDenemeKaydet(ip, email, false);
          return null;
        }

        const sifreDogru = bcrypt.compareSync(password, kullanici.sifreHash);
        if (!sifreDogru) {
          await girisDenemeKaydet(ip, email, false);
          return null;
        }

        await girisDenemeKaydet(ip, email, true);
        return { id: String(kullanici.id), email: kullanici.email, name: kullanici.ad ?? null };
      },
    }),
  ],
});
