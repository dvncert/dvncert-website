import type { Metadata } from "next";

/** Her sayfa başlığına eklenen marka eki (app/layout.tsx title.template). */
export const MARKA_EKI = " | DVN Cert";

/** Ana sayfa ve kendi başlığı olmayan sayfaların başlığı. */
export const VARSAYILAN_BASLIK = `ISO Belgelendirme, Denetim ve Eğitim${MARKA_EKI}`;

/** Google'ın arama sonucunda kesmeden gösterdiği yaklaşık başlık uzunluğu. */
const BASLIK_SINIRI = 60;

/**
 * Sayfa başlığını marka ekiyle verir; ek ile sınırı aşacaksa eki atlar
 * (anahtar kelimeli kısım kesilmesin — Google site adını zaten ayrıca gösterir).
 */
export function seoBaslik(baslik: string): NonNullable<Metadata["title"]> {
  return baslik.length + MARKA_EKI.length > BASLIK_SINIRI ? { absolute: baslik } : baslik;
}
