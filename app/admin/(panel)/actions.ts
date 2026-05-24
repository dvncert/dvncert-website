"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  duyurular,
  blogYazilari,
  yorumlar,
  referanslar,
  formGonderileri,
} from "@/lib/db/schema";

// ---- FormData yardımcıları ----
function s(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}
function arr(fd: FormData, k: string): string[] {
  return s(fd, k)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}
function bool(fd: FormData, k: string): boolean {
  const v = fd.get(k);
  return v === "on" || v === "true";
}
function num(fd: FormData, k: string): number | null {
  const v = s(fd, k);
  return v === "" ? null : Number(v);
}

function yenile(...yollar: string[]) {
  for (const y of yollar) revalidatePath(y);
}

// ============ DUYURULAR ============
export async function duyuruKaydet(fd: FormData) {
  const id = s(fd, "id");
  const veri = {
    slug: s(fd, "slug"),
    baslik: s(fd, "baslik"),
    tarih: s(fd, "tarih"),
    kategori: s(fd, "kategori"),
    ozet: s(fd, "ozet"),
    icerik: s(fd, "icerik"),
    gorsel: s(fd, "gorsel") || null,
    ilgiliHizmetler: arr(fd, "ilgiliHizmetler"),
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) await db.update(duyurular).set(veri).where(eq(duyurular.id, Number(id)));
  else await db.insert(duyurular).values(veri);
  yenile("/duyurular", "/", "/admin/duyurular");
  redirect("/admin/duyurular");
}
export async function duyuruSil(fd: FormData) {
  await db.delete(duyurular).where(eq(duyurular.id, Number(s(fd, "id"))));
  yenile("/duyurular", "/", "/admin/duyurular");
}

// ============ BLOG ============
export async function blogKaydet(fd: FormData) {
  const id = s(fd, "id");
  const veri = {
    slug: s(fd, "slug"),
    baslik: s(fd, "baslik"),
    ozet: s(fd, "ozet"),
    tarih: s(fd, "tarih"),
    kategori: s(fd, "kategori"),
    yazar: s(fd, "yazar") || null,
    gorsel: s(fd, "gorsel") || null,
    icerik: s(fd, "icerik"),
    ilgiliHizmetler: arr(fd, "ilgiliHizmetler"),
    yayinda: bool(fd, "yayinda"),
    guncellenme: new Date(),
  };
  if (id) await db.update(blogYazilari).set(veri).where(eq(blogYazilari.id, Number(id)));
  else await db.insert(blogYazilari).values(veri);
  yenile("/blog", "/admin/blog");
  redirect("/admin/blog");
}
export async function blogSil(fd: FormData) {
  await db.delete(blogYazilari).where(eq(blogYazilari.id, Number(s(fd, "id"))));
  yenile("/blog", "/admin/blog");
}

// ============ YORUMLAR ============
export async function yorumKaydet(fd: FormData) {
  const id = s(fd, "id");
  const veri = {
    isim: s(fd, "isim"),
    kurum: s(fd, "kurum") || null,
    yorum: s(fd, "yorum"),
    puan: num(fd, "puan"),
    tarih: s(fd, "tarih") || null,
    yayinda: bool(fd, "yayinda"),
    sira: num(fd, "sira") ?? 0,
  };
  if (id) await db.update(yorumlar).set(veri).where(eq(yorumlar.id, Number(id)));
  else await db.insert(yorumlar).values(veri);
  yenile("/", "/admin/yorumlar");
  redirect("/admin/yorumlar");
}
export async function yorumSil(fd: FormData) {
  await db.delete(yorumlar).where(eq(yorumlar.id, Number(s(fd, "id"))));
  yenile("/", "/admin/yorumlar");
}

// ============ REFERANSLAR ============
export async function referansKaydet(fd: FormData) {
  const id = s(fd, "id");
  const veri = {
    ad: s(fd, "ad"),
    logo: s(fd, "logo"),
    url: s(fd, "url") || null,
    yayinda: bool(fd, "yayinda"),
    sira: num(fd, "sira") ?? 0,
  };
  if (id) await db.update(referanslar).set(veri).where(eq(referanslar.id, Number(id)));
  else await db.insert(referanslar).values(veri);
  yenile("/", "/admin/referanslar");
  redirect("/admin/referanslar");
}
export async function referansSil(fd: FormData) {
  await db.delete(referanslar).where(eq(referanslar.id, Number(s(fd, "id"))));
  yenile("/", "/admin/referanslar");
}

// ============ FORM GÖNDERİLERİ ============
export async function gonderiDurum(fd: FormData) {
  await db
    .update(formGonderileri)
    .set({ durum: s(fd, "durum") })
    .where(eq(formGonderileri.id, Number(s(fd, "id"))));
  yenile("/admin/gonderiler");
}
export async function gonderiSil(fd: FormData) {
  await db.delete(formGonderileri).where(eq(formGonderileri.id, Number(s(fd, "id"))));
  yenile("/admin/gonderiler");
}
