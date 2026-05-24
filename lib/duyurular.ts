/**
 * DVN Cert - Duyurular (merkezi veri)
 *
 * Tüm duyuru içeriği BURADA tutulur. Hem ana sayfadaki "Duyurular" önizleme
 * bölümü, hem /duyurular liste sayfası, hem de /duyurular/[slug] detay sayfası
 * bu listeden beslenir. Liste, en yeni duyuru en üstte olacak şekilde tutulur.
 *
 * İlk kayıt canlı siteden alınan gerçek duyurudur; diğerleri örnek/yer
 * tutucudur ve gerçek içerikle değiştirilecektir.
 */

export type Duyuru = {
  slug: string;
  baslik: string;
  /** ISO formatı: "YYYY-MM-DD" */
  tarih: string;
  kategori: string;
  ozet: string;
  /** Detay sayfası gövdesi. Paragraflar boş satır (\n\n) ile ayrılır. */
  icerik: string;
  /** Kapak görseli yolu, ör. "/gorseller/duyurular/ornek.webp". Boşsa yer tutucu gösterilir. */
  gorsel?: string;
  /** İlgili hizmet slug'ları (opsiyonel) — detay sayfasında "İlgili Hizmetler" linkleri gösterilir */
  ilgiliHizmetler?: string[];
};

export const duyurular: Duyuru[] = [
  {
    slug: "yaniltici-akreditasyon-beyanlari-hakkinda",
    baslik: "Yanıltıcı Akreditasyon Beyanları Hakkında",
    tarih: "2026-01-30",
    kategori: "Duyuru",
    ozet:
      "DVN Cert; akreditasyonu bulunmadığı halde usulsüz logo kullanan firmalara karşı dikkatli olunması gerektiğini hatırlatır ve belgelendirme süreçlerinde dürüstlük ilkesine bağlılığını vurgular.",
    icerik:
      "DVN Cert yönetimi, belgelendirme sektörünün güven ve uluslararası tanınırlık üzerine kurulu olduğunu vurgulayarak, şeffaflık ve etik ilkelere bağlılığını ifade etmektedir.\n\n" +
      "Kuruluşumuz, akreditasyon ekosisteminde yer alan kurumların (IAS, TÜRKAK gibi) itibarını korumak amacıyla; akreditasyonu bulunmadığı halde usulsüz logo kullanımı yapan firmalara karşı dikkatli olunması gerektiğini hatırlatmaktadır.\n\n" +
      "Bu kapsamda, International Accreditation Service (IAS) tarafından yayımlanan yanıltıcı akreditasyon beyanları listesinin sektörel farkındalık amacıyla paylaşıldığı belirtilmektedir. DVN Cert, belgelendirme süreçlerinde dürüstlük ilkesine bağlı kalınacağı ve sektördeki bilgi kirliliğinin önlenmesine katkı sağlanacağı taahhüdünde bulunmaktadır.",
  },
  {
    slug: "iso-50001-akreditasyon-kapsami-genisledi",
    baslik: "ISO 50001 Enerji Yönetim Sistemi akreditasyon kapsamımız genişledi",
    tarih: "2025-12-18",
    kategori: "Akreditasyon",
    ozet:
      "Akreditasyon kapsamımıza ISO 50001:2018 Enerji Yönetim Sistemi belgelendirmesi de eklenmiştir. Artık dört yönetim sisteminde tam kapsamlı hizmet veriyoruz.",
    icerik:
      "Akreditasyon kapsamımıza ISO 50001:2018 Enerji Yönetim Sistemi belgelendirmesi resmi olarak eklenmiştir.\n\n" +
      "Bu gelişmeyle birlikte ISO 9001, ISO 14001, ISO 45001 ve ISO 50001 standartlarının tamamında akredite belgelendirme hizmeti sunabiliyoruz. Enerji verimliliğini önceliklendiren kuruluşlar, enerji performanslarını uluslararası geçerli bir belgeyle ortaya koyabilecekler.",
    ilgiliHizmetler: ["iso-50001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-9001-ic-denetci-egitimi",
    baslik: "ISO 9001 İç Denetçi Eğitimi başvuruları açıldı",
    tarih: "2025-11-26",
    kategori: "Eğitim",
    ozet:
      "Uzman denetçi kadromuz tarafından verilecek ISO 9001 İç Denetçi Eğitimi için kontenjanlar açıldı. Sınırlı kontenjan için erken kayıt önerilir.",
    icerik:
      "Uzman denetçi kadromuz tarafından verilecek ISO 9001 İç Denetçi Eğitimi için kayıtlar başlamıştır.\n\n" +
      "Eğitim; kalite yönetim sistemi gerekliliklerini, denetim planlama ve raporlama tekniklerini ve uygulamalı örnek senaryoları kapsamaktadır. Kontenjan sınırlı olduğundan erken kayıt yaptırmanızı öneririz. Ayrıntılar için Eğitimler sayfamızı ziyaret edebilirsiniz.",
    ilgiliHizmetler: ["iso-9001"],
  },
  {
    slug: "sertifika-dogrulama-sistemi-yenilendi",
    baslik: "Çevrim içi sertifika doğrulama sistemimiz yenilendi",
    tarih: "2025-10-09",
    kategori: "Duyuru",
    ozet:
      "Belgelendirdiğimiz kuruluşların sertifika geçerliliğini anında doğrulayabileceğiniz çevrim içi sorgulama sistemimiz daha hızlı ve şeffaf bir hâle getirildi.",
    icerik:
      "Belgelendirdiğimiz kuruluşların sertifika geçerliliğini anında doğrulayabileceğiniz çevrim içi sorgulama sistemimiz yenilenmiştir.\n\n" +
      "Yeni sistem ile sertifika numarası üzerinden belgenin güncel durumuna (geçerli, askıda veya geri çekilmiş) hızlı ve şeffaf biçimde ulaşılabilmektedir. Doğrulama işlemini Sertifika Sorgula sayfamızdan gerçekleştirebilirsiniz.",
  },
];

/**
 * Tarihi Türkçe okunur biçime çevirir: "2026-01-30" -> "30 Ocak 2026"
 */
export function tarihiBicimle(tarih: string): string {
  return new Date(tarih).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Slug'a göre tek bir duyuru döndürür (yoksa undefined). */
export function duyuruGetir(slug: string): Duyuru | undefined {
  return duyurular.find((d) => d.slug === slug);
}
