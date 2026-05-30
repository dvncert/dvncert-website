/**
 * DVN Cert - ORG.01 Organizasyon Şeması (paylaşılan veri)
 *
 * /ekibimiz public sayfasındaki görsel şema ve /admin/ekip pozisyon seçici
 * bu dosyadan beslenir. Pozisyon listesi değişirse SADECE burası değişir.
 */

export type Pozisyon = { ad: string; altlar?: Pozisyon[] };

export const ORG_USTYONETIM = "Genel Müdür";

export const ORG_KOMITELER: Pozisyon[] = [
  { ad: "Tarafsızlık Komitesi" },
  { ad: "İtiraz ve Şikayet Komitesi" },
  { ad: "Belgelendirme Komitesi" },
  { ad: "Yönetim Temsilcisi" },
];

export const ORG_BIRIMLER: Pozisyon[] = [
  { ad: "İnsan Kaynakları Sorumlusu" },
  {
    ad: "Sistem Belgelendirme Müdürü",
    altlar: [
      {
        ad: "Planlama Sorumlusu",
        altlar: [{ ad: "Denetçiler / Teknik Uzmanlar" }],
      },
    ],
  },
  { ad: "Müşteri İlişkileri Sorumlusu" },
  { ad: "Muhasebe Müdürü" },
];

/** Pozisyon ağacını yukarıdan aşağıya düz bir diziye çevirir. */
function duzlestir(pozisyonlar: Pozisyon[]): string[] {
  const sonuc: string[] = [];
  for (const p of pozisyonlar) {
    sonuc.push(p.ad);
    if (p.altlar) sonuc.push(...duzlestir(p.altlar));
  }
  return sonuc;
}

/** Tüm pozisyonların hiyerarşik sıraya göre düz listesi (admin seçicisi için). */
export const ORG_POZISYONLARI: string[] = [
  ORG_USTYONETIM,
  ...ORG_KOMITELER.map((k) => k.ad),
  ...duzlestir(ORG_BIRIMLER),
];

/** Birimler dalını (Sistem Bel. dahil alt zincir) optgroup için düz listele. */
export const ORG_BIRIM_POZISYONLARI: string[] = duzlestir(ORG_BIRIMLER);
