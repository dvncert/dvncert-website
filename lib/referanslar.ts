/**
 * DVN Cert - Referans / müşteri logoları (merkezi veri)
 *
 * Ana sayfadaki "Referanslarımız" logo şeridi bu listeden beslenir.
 *
 * ŞU AN BOŞ: Liste boşken bölüm hiç görünmez (uydurma/sahte logo yok).
 * Gerçek logolar eklenince bölüm otomatik görünür.
 *
 * GO-LIVE: Logolar admin paneli/DBYS üzerinden girilecek. O aşamada bu statik
 * liste API'den çekilen veriyle değiştirilecek. Şimdilik buraya elle de
 * eklenebilir: logo dosyalarını public/gorseller/referanslar/ altına koy ve
 * yolu logo alanına yaz.
 *
 * Örnek:
 *   { ad: "Örnek Sanayi A.Ş.", logo: "/gorseller/referanslar/ornek.webp", url: "https://ornek.com" }
 */

export type Referans = {
  /** Firma adı — logo alt metni ve erişilebilirlik için */
  ad: string;
  /** Logo yolu (public altında), ör. "/gorseller/referanslar/ornek.webp" */
  logo: string;
  /** Firma web sitesi (opsiyonel) — verilirse logo tıklanabilir olur */
  url?: string;
};

export const referanslar: Referans[] = [];
