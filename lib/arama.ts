/**
 * DVN Cert - Site içi arama indeksi
 *
 * Mevcut içerikten (hizmetler, duyurular, SSS) + statik sayfalardan derlenen
 * basit, istemci tarafı arama indeksi. /arama sayfası bu indeksi kullanır.
 * Yeni hizmet/duyuru/soru eklendiğinde indeks otomatik güncellenir.
 */

import { hizmetler } from "./hizmetler";
import { duyurular } from "./duyurular";
import { sssSorular } from "./sss";

export type AramaTipi = "Hizmet" | "Duyuru" | "S.S.S." | "Sayfa";

export type AramaSonucu = {
  baslik: string;
  ozet: string;
  url: string;
  tip: AramaTipi;
};

const statikSayfalar: AramaSonucu[] = [
  { baslik: "Hizmetlerimiz", ozet: "Belgelendirme ve denetim hizmetlerimiz.", url: "/hizmetler", tip: "Sayfa" },
  { baslik: "Hakkımızda", ozet: "DVN Cert hakkında kurumsal bilgi.", url: "/hakkimizda", tip: "Sayfa" },
  { baslik: "Ekibimiz", ozet: "Denetçi ve uzman kadromuz.", url: "/ekibimiz", tip: "Sayfa" },
  { baslik: "Akreditasyonlarımız", ozet: "TÜRKAK akreditasyon kapsamımız.", url: "/akreditasyonlarimiz", tip: "Sayfa" },
  { baslik: "Politika ve Beyanlar", ozet: "Tarafsızlık, gizlilik ve kalite politikalarımız.", url: "/politika-ve-beyanlar", tip: "Sayfa" },
  { baslik: "Logolarımız", ozet: "DVN Cert ve akreditasyon logoları kullanımı.", url: "/logolarimiz", tip: "Sayfa" },
  { baslik: "Eğitimler", ozet: "ISO yönetim sistemleri eğitimleri.", url: "/egitimler", tip: "Sayfa" },
  { baslik: "Kariyer", ozet: "DVN Cert'te kariyer ve açık pozisyonlar.", url: "/kariyer", tip: "Sayfa" },
  { baslik: "Dökümanlar", ozet: "Politika, talimat, prosedür ve formlar.", url: "/dokumanlar", tip: "Sayfa" },
  { baslik: "İletişim", ozet: "Bize ulaşın; adres ve iletişim bilgileri.", url: "/iletisim", tip: "Sayfa" },
  { baslik: "Şikayet ve Görüşler", ozet: "Şikayet, itiraz ve öneri bildirimi.", url: "/sikayet-ve-gorusler", tip: "Sayfa" },
  { baslik: "Sıkça Sorulan Sorular", ozet: "Belgelendirme hakkında merak edilenler.", url: "/sss", tip: "Sayfa" },
  { baslik: "Duyurular", ozet: "DVN Cert güncel duyuru ve haberleri.", url: "/duyurular", tip: "Sayfa" },
];

export const aramaIndeksi: AramaSonucu[] = [
  ...statikSayfalar,
  ...hizmetler.map((h) => ({
    baslik: h.baslik,
    ozet: h.kisaAciklama,
    url: `/hizmetler/${h.slug}`,
    tip: "Hizmet" as const,
  })),
  ...duyurular.map((d) => ({
    baslik: d.baslik,
    ozet: d.ozet,
    url: `/duyurular/${d.slug}`,
    tip: "Duyuru" as const,
  })),
  ...sssSorular.map((s) => ({
    baslik: s.soru,
    ozet: s.cevap.length > 160 ? s.cevap.slice(0, 160) + "…" : s.cevap,
    url: "/sss",
    tip: "S.S.S." as const,
  })),
];

/** Türkçe duyarlı, çok kelimeli (AND) arama. 2 karakterden kısa sorguda boş döner. */
export function ara(sorgu: string): AramaSonucu[] {
  const q = sorgu.trim().toLocaleLowerCase("tr");
  if (q.length < 2) return [];
  const kelimeler = q.split(/\s+/);
  return aramaIndeksi.filter((item) => {
    const metin = `${item.baslik} ${item.ozet} ${item.tip}`.toLocaleLowerCase("tr");
    return kelimeler.every((k) => metin.includes(k));
  });
}
