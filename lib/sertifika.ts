/**
 * DVN Cert - Sertifika doğrulama yardımcıları
 *
 * Eğitim sertifikası numarası üretimi/normalizasyonu, tarih biçimi, QR kodu
 * ve public doğrulama sorgusu. ISO belgeleri eklendiğinde sorgu burada
 * genişletilir.
 */

import { randomInt } from "node:crypto";
import { eq } from "drizzle-orm";
import QRCode from "qrcode";
import { db } from "@/lib/db";
import { egitimSertifikalari, egitimSertifikaGruplari } from "@/lib/db/schema";
import { siteConfig } from "@/lib/site-config";

/** Karışabilecek karakterler (0/O, 1/I/L) çıkarıldı — okunup elle yazılması kolay olsun. */
const HARFLER = "ABCDEFGHJKMNPQRSTUVWXYZ";
const RAKAMLAR = "23456789";
const ALFABE = HARFLER + RAKAMLAR;

/** 8 haneli, en az bir harf ve bir rakam içeren sertifika numarası (örn. K7M3QX9A). */
export function sertifikaNoUret(): string {
  for (;;) {
    const no = Array.from({ length: 8 }, () => ALFABE[randomInt(ALFABE.length)]).join("");
    if (/[A-Z]/.test(no) && /[0-9]/.test(no)) return no;
  }
}

/** Kullanıcı girdisini sorgu biçimine çevirir: boşluk/tire temizlenir, büyük harf yapılır. */
export function sertifikaNoNormalize(girdi: string): string {
  return girdi
    .toLocaleUpperCase("tr-TR")
    .replace(/İ/g, "I")
    .replace(/[^A-Z0-9]/g, "");
}

export function sertifikaNoGecerliMi(no: string): boolean {
  return /^[A-Z0-9]{8}$/.test(no);
}

export function dogrulamaUrl(no: string): string {
  return `${siteConfig.url}/sertifika-sorgula/${no}`;
}

/** Doğrulama sayfasına giden QR kodu (SVG metni). */
export function qrSvg(no: string): Promise<string> {
  return QRCode.toString(dogrulamaUrl(no), {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: "#0b1f4d", light: "#0000" },
  });
}

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

/**
 * Eğitim tarihini sertifikadaki biçime çevirir:
 * tek gün → "15.10.2026", aralık → "15-16.10.2026" / "30.09-01.10.2026" / "30.12.2026-02.01.2027".
 */
export function egitimTarihiYaz(baslangic: string, bitis?: string | null): string {
  const [y1, m1, d1] = baslangic.split("-");
  if (!bitis || bitis === baslangic) return `${d1}.${m1}.${y1}`;
  const [y2, m2, d2] = bitis.split("-");
  if (y1 !== y2) return `${d1}.${m1}.${y1}-${d2}.${m2}.${y2}`;
  if (m1 !== m2) return `${d1}.${m1}-${d2}.${m2}.${y1}`;
  return `${d1}-${d2}.${m1}.${y1}`;
}

/** Uzun biçim (doğrulama sayfası için): "15 Ekim 2026" / "15-16 Ekim 2026". */
export function egitimTarihiUzun(baslangic: string, bitis?: string | null): string {
  const p = (t: string) => {
    const [y, m, d] = t.split("-").map(Number);
    return { y, m: AYLAR[m - 1], d };
  };
  const a = p(baslangic);
  if (!bitis || bitis === baslangic) return `${a.d} ${a.m} ${a.y}`;
  const b = p(bitis);
  if (a.y !== b.y) return `${a.d} ${a.m} ${a.y} - ${b.d} ${b.m} ${b.y}`;
  if (a.m !== b.m) return `${a.d} ${a.m} - ${b.d} ${b.m} ${a.y}`;
  return `${a.d}-${b.d} ${a.m} ${a.y}`;
}

export type SertifikaSorguSonucu = {
  tur: "egitim";
  sertifikaNo: string;
  katilimciAdi: string;
  egitimAdi: string;
  egitimTarihi: string;
  egitmen: string;
  iptal: boolean;
};

/** Public doğrulama sorgusu. Bulunamazsa null döner. */
export async function sertifikaSorgula(no: string): Promise<SertifikaSorguSonucu | null> {
  if (!sertifikaNoGecerliMi(no)) return null;
  const r = (
    await db
      .select({
        sertifikaNo: egitimSertifikalari.sertifikaNo,
        katilimciAdi: egitimSertifikalari.katilimciAdi,
        iptal: egitimSertifikalari.iptal,
        egitimAdi: egitimSertifikaGruplari.egitimAdi,
        baslangicTarihi: egitimSertifikaGruplari.baslangicTarihi,
        bitisTarihi: egitimSertifikaGruplari.bitisTarihi,
        egitmen: egitimSertifikaGruplari.egitmen,
      })
      .from(egitimSertifikalari)
      .innerJoin(egitimSertifikaGruplari, eq(egitimSertifikalari.grupId, egitimSertifikaGruplari.id))
      .where(eq(egitimSertifikalari.sertifikaNo, no))
      .limit(1)
  )[0];
  if (!r) return null;
  return {
    tur: "egitim",
    sertifikaNo: r.sertifikaNo,
    katilimciAdi: r.katilimciAdi,
    egitimAdi: r.egitimAdi,
    egitimTarihi: egitimTarihiUzun(r.baslangicTarihi, r.bitisTarihi),
    egitmen: r.egitmen,
    iptal: r.iptal,
  };
}
