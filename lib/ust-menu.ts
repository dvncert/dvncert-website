/**
 * Üst navigasyon şeridine admin panelinden eklenen ek menü öğeleri.
 * Aktif olanları sıraya göre döndürür. Hata olursa boş dizi.
 */

import { unstable_cache } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db, dbHazir } from "./db";
import { ekstraMenuOgeleri } from "./db/schema";

export type EkstraMenuOgesi = {
  id: number;
  baslik: string;
  href: string;
  yeniSekme: boolean;
};

async function _getir(): Promise<EkstraMenuOgesi[]> {
  if (!dbHazir) return [];
  try {
    const rows = await db
      .select({
        id: ekstraMenuOgeleri.id,
        baslik: ekstraMenuOgeleri.baslik,
        href: ekstraMenuOgeleri.href,
        yeniSekme: ekstraMenuOgeleri.yeniSekme,
      })
      .from(ekstraMenuOgeleri)
      .where(eq(ekstraMenuOgeleri.aktif, true))
      .orderBy(asc(ekstraMenuOgeleri.sira), asc(ekstraMenuOgeleri.id));
    return rows;
  } catch (e) {
    console.error("ekstra menü öğeleri DB hatası:", e);
    return [];
  }
}

/** 10 dakika önbellekli; admin kaydedince updateTag("ust-menu") ile temizlenir. */
export const ekstraMenuOgeleriGetir = unstable_cache(_getir, ["ust-menu-v1"], {
  revalidate: 600,
  tags: ["ust-menu"],
});
