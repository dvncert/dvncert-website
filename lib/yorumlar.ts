/**
 * DVN Cert - Müşteri yorumları (merkezi veri)
 *
 * Ana sayfadaki "Müşteri Yorumları" bölümü ve Review/AggregateRating JSON-LD
 * bu listeden beslenir.
 *
 * ŞU AN BOŞ: Liste boşken bölüm hiç görünmez ve hiçbir şema üretilmez
 * (uydurma/sahte yorum yok). Gerçek yorumlar eklendiğinde bölüm ve şema
 * otomatik olarak görünür.
 *
 * GO-LIVE: Yorumlar admin paneli/DBYS API'sinden girilecek. O aşamada bu
 * statik liste, API'den çekilen veriyle değiştirilecek (formlardaki DBYS
 * entegrasyonu deseniyle aynı). Şimdilik buraya elle de eklenebilir.
 *
 * Örnek bir kayıt:
 *   {
 *     isim: "Ad Soyad",
 *     kurum: "Örnek Sanayi A.Ş.",   // opsiyonel
 *     yorum: "Belgelendirme süreci şeffaf ve profesyoneldi.",
 *     puan: 5,                       // opsiyonel, 1-5
 *     tarih: "2026-03-15",          // opsiyonel, ISO (YYYY-MM-DD)
 *   }
 */

export type MusteriYorumu = {
  /** Yorumu yapan kişinin adı */
  isim: string;
  /** Kişinin kurumu/firması (opsiyonel) */
  kurum?: string;
  /** Yorum metni */
  yorum: string;
  /** 1-5 arası puan (opsiyonel; verilirse yıldız ve AggregateRating'e dahil olur) */
  puan?: number;
  /** Yayın tarihi, ISO "YYYY-MM-DD" (opsiyonel) */
  tarih?: string;
};

export const musteriYorumlari: MusteriYorumu[] = [];
