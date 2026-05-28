/**
 * Site geneli pop-up (modal) veri katmanı.
 *
 * Admin panelinden tek kayıt olarak yönetilir; aktifse public sayfalarda
 * PopupModal bileşeni tarafından gösterilir. Görsel binary'si önbelleğe
 * taşınmasın diye yalnızca "görsel var mı" bilgisi okunur; görselin kendisi
 * /api/gorsel/popup/{id} üzerinden sunulur.
 */

import { unstable_cache } from "next/cache";
import { sql, asc } from "drizzle-orm";
import { db, dbHazir } from "@/lib/db";
import { popup } from "@/lib/db/schema";

export type PopupVeri = {
  id: number;
  aktif: boolean;
  baslik: string | null;
  metin: string | null;
  butonYazi: string | null;
  butonUrl: string | null;
  gorselVar: boolean;
  gorselAlt: string | null;
  /** Cache-buster: admin kaydedince değişir; görsel URL'i ve localStorage anahtarı için kullanılır. */
  guncellenmeMs: number;
};

async function _popupGetir(): Promise<PopupVeri | null> {
  if (!dbHazir) return null;
  try {
    const row = (
      await db
        .select({
          id: popup.id,
          aktif: popup.aktif,
          baslik: popup.baslik,
          metin: popup.metin,
          butonYazi: popup.butonYazi,
          butonUrl: popup.butonUrl,
          gorselVar: sql<boolean>`(${popup.gorselVeri} is not null)`,
          gorselAlt: popup.gorselAlt,
          guncellenme: popup.guncellenme,
        })
        .from(popup)
        .orderBy(asc(popup.id))
        .limit(1)
    )[0];
    if (!row) return null;
    return {
      id: row.id,
      aktif: row.aktif,
      baslik: row.baslik,
      metin: row.metin,
      butonYazi: row.butonYazi,
      butonUrl: row.butonUrl,
      gorselVar: Boolean(row.gorselVar),
      gorselAlt: row.gorselAlt,
      guncellenmeMs: new Date(row.guncellenme).getTime(),
    };
  } catch {
    return null;
  }
}

/** Aktif pop-up kaydını önbellekli getirir (10 dk + 'popup' tag invalidation). */
export const popupGetir = unstable_cache(_popupGetir, ["popup-v1"], {
  revalidate: 600,
  tags: ["popup"],
});
