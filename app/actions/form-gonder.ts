"use server";

import { headers } from "next/headers";
import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { formGonderileri } from "@/lib/db/schema";
import { iletisimEpostaGonder, kariyerEpostaGonder } from "@/lib/email";

export type FormGonderiPayload = {
  tip: "iletisim" | "sikayet" | "kariyer" | "sertifika-dogrulama" | "egitim-kayit" | "bulten";
  ad?: string;
  email?: string;
  telefon?: string;
  konu?: string;
  mesaj?: string;
  ekVeri?: Record<string, unknown>;
  /** Spam koruması — botlar dolduran gizli alan. Doluysa sessizce reddedilir. */
  _honeypot?: string;
  /** Spam koruması — formun mount olduğu Date.now() değeri. <2 saniyede gönderim reddedilir. */
  _ts?: number;
};

/** Vercel/Cloudflare ortamlarında istemci IP'sini header'lardan çıkarır. */
async function istemciIp(): Promise<string | null> {
  const h = await headers();
  const f = h.get("x-forwarded-for");
  if (f) return f.split(",")[0]?.trim() ?? null;
  return h.get("x-real-ip") ?? h.get("cf-connecting-ip");
}

/** Son N dakikada bu IP'den kaç gönderi yapıldığını sayar. */
async function ipGonderiSayisi(ip: string, dakika: number): Promise<number> {
  const eski = new Date(Date.now() - dakika * 60_000);
  try {
    const r = await db
      .select({ c: sql<number>`count(*)` })
      .from(formGonderileri)
      .where(and(eq(formGonderileri.ip, ip), gte(formGonderileri.olusturulma, eski)));
    return Number(r[0]?.c ?? 0);
  } catch {
    return 0;
  }
}

const SPAM_OK = { ok: true as const }; // bot'un başarılı sanması için sessizce ok dön

/**
 * Form gönderisini veritabanına yazar (admin panelinde gelen kutusunda görünür).
 * Spam koruması: honeypot, zaman damgası, IP-rate-limit.
 * Hata olursa { ok: false } döner.
 */
export async function formGonderAction(payload: FormGonderiPayload): Promise<{ ok: boolean }> {
  // 1) Honeypot: bot bu alanı doldurur, gerçek kullanıcı boş bırakır.
  if (payload._honeypot && payload._honeypot.trim() !== "") {
    return SPAM_OK;
  }

  // 2) Zaman kontrolü: gerçek kullanıcı en az 2 sn sürer doldurmak.
  if (payload._ts && Number.isFinite(payload._ts)) {
    const gecen = Date.now() - payload._ts;
    if (gecen < 2000) return SPAM_OK; // bot — sessizce yut
    if (gecen > 1000 * 60 * 60 * 6) return { ok: false }; // 6 saatten eski form — yeniden açsın
  }

  // 3) IP rate limit
  const ip = await istemciIp();
  if (ip) {
    const sayi = await ipGonderiSayisi(ip, 10);
    if (sayi >= 5) return { ok: false }; // 10dk'da 5 gönderi limit
  }

  const h = await headers();
  const ua = h.get("user-agent");

  try {
    await db.insert(formGonderileri).values({
      tip: payload.tip,
      ad: payload.ad?.trim() || null,
      email: payload.email?.trim() || null,
      telefon: payload.telefon?.trim() || null,
      konu: payload.konu?.trim() || null,
      mesaj: payload.mesaj?.trim() || null,
      ekVeri: payload.ekVeri ?? null,
      ip: ip ?? null,
      userAgent: ua ?? null,
    });
  } catch (e) {
    console.error("formGonderAction DB hatası:", e);
    return { ok: false };
  }

  // İletişim formu mesajını info@dvncert.com'a e-posta olarak ilet.
  // E-posta başarısız olsa bile gönderi DB'ye yazıldığı için { ok: true } döneriz.
  if (payload.tip === "iletisim") {
    await iletisimEpostaGonder({
      ad: payload.ad,
      email: payload.email,
      telefon: payload.telefon,
      konu: payload.konu,
      mesaj: payload.mesaj,
    });
  }

  return { ok: true };
}

// ============ KARİYER BAŞVURUSU (dosya yüklemeli) ============

const KARIYER_MAKS_BAYT = 4 * 1024 * 1024; // 4MB (Vercel serverless gövde limiti ~4.5MB)
const KARIYER_IZINLI_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);
const KARIYER_IZINLI_UZANTI = new Set(["pdf", "doc", "docx", "xls", "xlsx"]);

function fdStr(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * İdari pozisyon kariyer başvurusu — CV dosyası (PDF/DOCX/XLSX) yüklemeli.
 * Dosya formGonderileri'ye bytea olarak yazılır; admin panelden indirilebilir
 * ve (Resend yapılandırılmışsa) info@dvncert.com'a ek olarak gönderilir.
 * Spam koruması iletişim formuyla aynıdır.
 */
export async function kariyerBasvuruGonderAction(
  formData: FormData,
): Promise<{ ok: boolean; hata?: string }> {
  // 1) Honeypot
  if (fdStr(formData, "website") !== "") return SPAM_OK;

  // 2) Zaman kontrolü
  const ts = Number(formData.get("_ts") ?? 0);
  if (ts && Number.isFinite(ts)) {
    const gecen = Date.now() - ts;
    if (gecen < 2000) return SPAM_OK;
    if (gecen > 1000 * 60 * 60 * 6) return { ok: false, hata: "Form süresi doldu, lütfen sayfayı yenileyip tekrar deneyin." };
  }

  // 3) IP rate limit
  const ip = await istemciIp();
  if (ip) {
    const sayi = await ipGonderiSayisi(ip, 10);
    if (sayi >= 5) return { ok: false, hata: "Çok fazla deneme. Lütfen birkaç dakika sonra tekrar deneyin." };
  }

  // 4) Dosya doğrulama (opsiyonel ama varsa geçerli olmalı)
  let dosya: { veri: Buffer; mime: string; ad: string } | undefined;
  const dosyaEntry = formData.get("cv");
  if (dosyaEntry instanceof File && dosyaEntry.size > 0) {
    if (dosyaEntry.size > KARIYER_MAKS_BAYT) {
      return { ok: false, hata: "Dosya boyutu 4 MB'ı aşamaz." };
    }
    const uzanti = (dosyaEntry.name.split(".").pop() ?? "").toLowerCase();
    const mime = dosyaEntry.type || "";
    if (!KARIYER_IZINLI_MIME.has(mime) && !KARIYER_IZINLI_UZANTI.has(uzanti)) {
      return { ok: false, hata: "Yalnızca PDF, Word (.doc/.docx) veya Excel (.xls/.xlsx) dosyaları yüklenebilir." };
    }
    dosya = {
      veri: Buffer.from(await dosyaEntry.arrayBuffer()),
      mime: mime || "application/octet-stream",
      ad: dosyaEntry.name,
    };
  }

  const pozisyon = fdStr(formData, "pozisyon");
  const ad = fdStr(formData, "ad");
  const email = fdStr(formData, "email");
  const telefon = fdStr(formData, "telefon");
  const mesaj = fdStr(formData, "mesaj");

  const h = await headers();
  const ua = h.get("user-agent");

  try {
    await db.insert(formGonderileri).values({
      tip: "kariyer",
      ad: ad || null,
      email: email || null,
      telefon: telefon || null,
      konu: pozisyon || null,
      mesaj: mesaj || null,
      ekVeri: { pozisyon },
      dosyaVeri: dosya?.veri ?? null,
      dosyaMime: dosya?.mime ?? null,
      dosyaAdi: dosya?.ad ?? null,
      ip: ip ?? null,
      userAgent: ua ?? null,
    });
  } catch (e) {
    console.error("kariyerBasvuruGonderAction DB hatası:", e);
    return { ok: false, hata: "Gönderilemedi. Lütfen tekrar deneyin." };
  }

  // E-posta (Resend yoksa sessizce atlanır).
  await kariyerEpostaGonder(
    { ad, email, telefon, pozisyon, mesaj },
    dosya ? { veri: dosya.veri, ad: dosya.ad } : undefined,
  );

  return { ok: true };
}
