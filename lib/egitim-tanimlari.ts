/**
 * DVN Cert - Varsayılan eğitim tanımları ve arama normalizasyonu
 *
 * Liste scripts/egitim-tanimlari-seed.ts ile egitim_tanimlari tablosuna
 * yüklenir; sonrasında panelden (Eğitim Sertifikaları → Eğitim Tanımları)
 * yönetilir. Adlar sertifikaya aynen basılır; şablonda altında "Eğitimini"
 * yazdığı için sonlarına "Eğitimi" eklenmez.
 */

const YONETIM_SISTEMLERI = [
  "ISO 9001:2015 Kalite Yönetim Sistemi",
  "ISO 14001:2015 Çevre Yönetim Sistemi",
  "ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi",
  "ISO 50001:2018 Enerji Yönetim Sistemi",
  "ISO/IEC 27001:2022 Bilgi Güvenliği Yönetim Sistemi",
  "ISO 22000:2018 Gıda Güvenliği Yönetim Sistemi",
  "ISO 10002:2018 Müşteri Memnuniyeti Yönetim Sistemi",
  "ISO 13485:2016 Tıbbi Cihazlar Kalite Yönetim Sistemi",
  "ISO 9001, ISO 14001, ISO 45001 Entegre Yönetim Sistemi",
];

export const VARSAYILAN_EGITIM_TANIMLARI: string[] = [
  ...YONETIM_SISTEMLERI.flatMap((ys) => [`${ys} Temel`, `${ys} İç Denetçi`]),
  "ISO 19011:2018 Yönetim Sistemleri Tetkikçi",
  "IATF 16949:2016 Otomotiv Kalite Yönetim Sistemi Temel",
  // Otomotiv çekirdek araçları (Core Tools) — ayrı ayrı
  "APQP - İleri Ürün Kalite Planlaması",
  "PPAP - Üretim Parçası Onay Prosesi",
  "FMEA - Hata Türleri ve Etkileri Analizi (AIAG & VDA)",
  "SPC - İstatistiksel Proses Kontrol",
  "MSA - Ölçüm Sistemleri Analizi",
  "8D Problem Çözme Tekniği",
  "Ürün Denetimi (VDA 6.5)",
  "Proses Denetimi (VDA 6.3)",
];

/**
 * Arama için metni sadeleştirir: Türkçe karakterler ASCII'ye, harf/rakam
 * geçişleri boşlukla ayrılır ("iso9001" → "iso 9001"), noktalama atılır.
 */
export function aramaNormalize(metin: string): string {
  return metin
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/([a-z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Adda geçmeyen ama aranabilecek kısaltmalar (ada göre eklenir). */
const ANAHTAR_KELIMELER: [RegExp, string][] = [
  [/\b(APQP|PPAP|FMEA|SPC|MSA)\b/, "core tools cekirdek araclar otomotiv"],
  [/\b(8D|VDA)\b/, "otomotiv"],
  [/\b9001\b/, "kys kalite"],
  [/\b14001\b/, "cys cevre"],
  [/\b45001\b/, "isg isgys is guvenligi"],
  [/\b50001\b/, "eys enerji"],
  [/\b27001\b/, "bgys bilgi guvenligi"],
  [/\b22000\b/, "ggys gida"],
  [/\b19011\b/, "tetkik denetci bas denetci"],
  [/Entegre/, "entegre ims"],
];

/** Bir tanımın aranabilir kelimeleri (ad + kısaltmalar). */
export function aramaKelimeleri(ad: string): string[] {
  const ek = ANAHTAR_KELIMELER.filter(([r]) => r.test(ad)).map(([, k]) => k);
  return aramaNormalize([ad, ...ek].join(" ")).split(" ");
}

/** Sorgudaki her kelime, tanımın kelimelerinden birinin başıyla eşleşmeli. */
export function tanimEslesir(kelimeler: string[], sorgu: string): boolean {
  const q = aramaNormalize(sorgu);
  if (!q) return true;
  return q.split(" ").every((k) => kelimeler.some((w) => w.startsWith(k)));
}
