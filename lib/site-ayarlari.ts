import { unstable_cache } from "next/cache";
import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteAyarlari } from "@/lib/db/schema";
import { siteConfig } from "@/lib/site-config";

/**
 * Admin panelden yönetilen "site_ayarlari" tablosu için yardımcılar.
 * Sosyal medya URL'leri DB'den okunur; tablo boşsa siteConfig.sosyal
 * fallback değerleri kullanılır. unstable_cache ile önbelleklidir;
 * admin kaydedince revalidateTag("site-ayarlari") ile anında temizlenir.
 */

export type SosyalKayit = {
  linkedin: string;
  instagram: string;
  twitter: string;
  facebook: string;
};

export const SOSYAL_AYAR_ANAHTARLARI = [
  "sosyal.linkedin",
  "sosyal.instagram",
  "sosyal.twitter",
  "sosyal.facebook",
] as const;

async function _sosyalGetir(): Promise<SosyalKayit> {
  try {
    const satirlar = await db
      .select({ anahtar: siteAyarlari.anahtar, deger: siteAyarlari.deger })
      .from(siteAyarlari)
      .where(inArray(siteAyarlari.anahtar, SOSYAL_AYAR_ANAHTARLARI as unknown as string[]));
    const harita = new Map(satirlar.map((r) => [r.anahtar, r.deger]));
    return {
      linkedin: harita.get("sosyal.linkedin") || siteConfig.sosyal.linkedin || "",
      instagram: harita.get("sosyal.instagram") || siteConfig.sosyal.instagram || "",
      twitter: harita.get("sosyal.twitter") || siteConfig.sosyal.twitter || "",
      facebook: harita.get("sosyal.facebook") || siteConfig.sosyal.facebook || "",
    };
  } catch {
    return {
      linkedin: siteConfig.sosyal.linkedin || "",
      instagram: siteConfig.sosyal.instagram || "",
      twitter: siteConfig.sosyal.twitter || "",
      facebook: siteConfig.sosyal.facebook || "",
    };
  }
}

/** Sosyal medya URL'lerini önbellekli olarak getirir (10 dk + tag invalidation). */
export const sosyalGetir = unstable_cache(_sosyalGetir, ["sosyal-ayarlari-v1"], {
  revalidate: 600,
  tags: ["site-ayarlari"],
});
