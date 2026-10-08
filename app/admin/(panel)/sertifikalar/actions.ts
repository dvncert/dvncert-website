"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { egitimSertifikaGruplari, egitimSertifikalari } from "@/lib/db/schema";
import { sertifikaNoUret } from "@/lib/sertifika";

function s(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}

/** Bkz. ../actions.ts yetkiKontrol — koruma her action'ın gövdesinde olmalı. */
async function yetkiKontrol() {
  const oturum = await auth();
  if (!oturum?.user) throw new Error("Yetkisiz erişim");
}

const TARIH = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Katılımcı listesini ayrıştırır: her satır bir kişi. Excel'den yapıştırılan
 * "Ad<TAB>Soyad" satırları tek isme birleştirilir, fazla boşluk temizlenir.
 */
function katilimcilariAyristir(metin: string): string[] {
  return metin
    .split(/\r?\n/)
    .map((x) => x.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/** Her katılımcıya benzersiz numaralı sertifika ekler (çakışmada yeni numara dener). */
async function sertifikaEkle(grupId: number, adlar: string[]) {
  for (const katilimciAdi of adlar) {
    for (let deneme = 0; ; deneme++) {
      try {
        await db.insert(egitimSertifikalari).values({ grupId, katilimciAdi, sertifikaNo: sertifikaNoUret() });
        break;
      } catch (e) {
        const benzersizlikIhlali = (e as { code?: string; cause?: { code?: string } }).code === "23505" ||
          (e as { cause?: { code?: string } }).cause?.code === "23505";
        if (!benzersizlikIhlali || deneme >= 5) throw e;
      }
    }
  }
}

export async function sertifikaGrubuKaydet(fd: FormData) {
  await yetkiKontrol();
  const id = s(fd, "id");
  const baslangicTarihi = s(fd, "baslangicTarihi");
  const bitisTarihi = s(fd, "bitisTarihi") || null;
  if (!TARIH.test(baslangicTarihi)) throw new Error("Eğitim başlangıç tarihi zorunludur.");
  if (bitisTarihi && (!TARIH.test(bitisTarihi) || bitisTarihi < baslangicTarihi)) {
    throw new Error("Bitiş tarihi başlangıç tarihinden önce olamaz.");
  }
  const temel = {
    egitimAdi: s(fd, "egitimAdi"),
    egitmen: s(fd, "egitmen"),
    baslangicTarihi,
    bitisTarihi: bitisTarihi === baslangicTarihi ? null : bitisTarihi,
    guncellenme: new Date(),
  };
  if (!temel.egitimAdi || !temel.egitmen) throw new Error("Eğitim adı ve eğitmen zorunludur.");

  let grupId: number;
  if (id) {
    grupId = Number(id);
    await db.update(egitimSertifikaGruplari).set(temel).where(eq(egitimSertifikaGruplari.id, grupId));
  } else {
    grupId = (await db.insert(egitimSertifikaGruplari).values(temel).returning({ id: egitimSertifikaGruplari.id }))[0].id;
  }

  await sertifikaEkle(grupId, katilimcilariAyristir(s(fd, "katilimcilar")));

  revalidatePath("/admin/sertifikalar");
  redirect(`/admin/sertifikalar/form?id=${grupId}&ok=1`);
}

export async function sertifikaGrubuSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(egitimSertifikaGruplari).where(eq(egitimSertifikaGruplari.id, Number(s(fd, "id"))));
  revalidatePath("/admin/sertifikalar");
}

export async function katilimciAdiGuncelle(fd: FormData) {
  await yetkiKontrol();
  const ad = s(fd, "katilimciAdi").replace(/\s+/g, " ");
  if (!ad) return;
  await db.update(egitimSertifikalari).set({ katilimciAdi: ad }).where(eq(egitimSertifikalari.id, Number(s(fd, "id"))));
  revalidatePath("/admin/sertifikalar/form");
}

export async function sertifikaIptalDegistir(fd: FormData) {
  await yetkiKontrol();
  await db
    .update(egitimSertifikalari)
    .set({ iptal: s(fd, "iptal") === "1" })
    .where(eq(egitimSertifikalari.id, Number(s(fd, "id"))));
  revalidatePath("/admin/sertifikalar/form");
}

export async function sertifikaSil(fd: FormData) {
  await yetkiKontrol();
  await db.delete(egitimSertifikalari).where(eq(egitimSertifikalari.id, Number(s(fd, "id"))));
  revalidatePath("/admin/sertifikalar/form");
}
