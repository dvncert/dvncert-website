import "server-only";
import crypto from "node:crypto";

/**
 * Yüklenen CV / kişisel-veri dosyalarının uygulama seviyesinde şifrelenmesi
 * (KVKK). AES-256-GCM.
 *
 * Anahtar: CV_SIFRE_ANAHTARI ortam değişkeni (64 hex karakter = 32 bayt).
 *   openssl rand -hex 32   ile üretilebilir; Vercel env'e eklenir.
 *
 * GERİYE DÖNÜK UYUMLU:
 *  - Anahtar tanımlı DEĞİLSE sifrele()/coz() düz metni aynen döndürür —
 *    yani anahtar eklenene kadar davranış bugünküyle birebir aynıdır.
 *  - coz() yalnızca MAGIC önekiyle başlayan (bu modülce şifrelenmiş) veriyi
 *    çözer; eski düz kayıtlar olduğu gibi döner. Yeni anahtar eklendikten
 *    sonra bile önceden yüklenmiş CV'ler okunabilir kalır.
 */

// Şifreli blob öneki (8 bayt) — düz dosyalardan (PDF %PDF, PNG, WebP RIFF…) ayırır.
const MAGIC = Buffer.from("DVNENC1\0", "binary");
const IV_UZUNLUK = 12;
const TAG_UZUNLUK = 16;

function anahtar(): Buffer | null {
  const h = process.env.CV_SIFRE_ANAHTARI;
  if (!h || !/^[0-9a-fA-F]{64}$/.test(h)) return null;
  return Buffer.from(h, "hex");
}

/** Buffer'ı şifreler. Anahtar yoksa girdiyi aynen döndürür (no-op). */
export function sifrele(veri: Buffer): Buffer {
  const key = anahtar();
  if (!key) return veri;
  const iv = crypto.randomBytes(IV_UZUNLUK);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(veri), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([MAGIC, iv, tag, ct]);
}

/**
 * Buffer'ı çözer. Veri MAGIC önekiyle başlamıyorsa (eski düz kayıt) veya
 * anahtar yoksa girdiyi aynen döndürür — hiçbir durumda veri bozulmaz.
 */
export function coz(veri: Buffer): Buffer {
  if (veri.length < MAGIC.length + IV_UZUNLUK + TAG_UZUNLUK) return veri;
  if (!veri.subarray(0, MAGIC.length).equals(MAGIC)) return veri;
  const key = anahtar();
  if (!key) return veri; // anahtar yok ama veri şifreli — çözemeyiz, bozmadan dön
  const iv = veri.subarray(MAGIC.length, MAGIC.length + IV_UZUNLUK);
  const tag = veri.subarray(MAGIC.length + IV_UZUNLUK, MAGIC.length + IV_UZUNLUK + TAG_UZUNLUK);
  const ct = veri.subarray(MAGIC.length + IV_UZUNLUK + TAG_UZUNLUK);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ct), decipher.final()]);
}
