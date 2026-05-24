"use server";

import { db } from "@/lib/db";
import { formGonderileri } from "@/lib/db/schema";

export type FormGonderiPayload = {
  tip: "iletisim" | "sikayet" | "kariyer";
  ad?: string;
  email?: string;
  telefon?: string;
  konu?: string;
  mesaj?: string;
  ekVeri?: Record<string, unknown>;
};

/**
 * Form gönderisini veritabanına yazar (admin panelinde gelen kutusunda görünür).
 * Hata olursa { ok: false } döner; form bileşeni kullanıcıya yedek iletişim sunar.
 */
export async function formGonderAction(payload: FormGonderiPayload): Promise<{ ok: boolean }> {
  try {
    await db.insert(formGonderileri).values({
      tip: payload.tip,
      ad: payload.ad?.trim() || null,
      email: payload.email?.trim() || null,
      telefon: payload.telefon?.trim() || null,
      konu: payload.konu?.trim() || null,
      mesaj: payload.mesaj?.trim() || null,
      ekVeri: payload.ekVeri ?? null,
    });
    return { ok: true };
  } catch (e) {
    console.error("formGonderAction DB hatası:", e);
    return { ok: false };
  }
}
