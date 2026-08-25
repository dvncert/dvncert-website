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
  /** Kapak görseli yolu veya /api/gorsel/duyuru/{id}. Boşsa yer tutucu gösterilir. */
  gorsel?: string;
  /** Kapak görseli alt metni (SEO / erişilebilirlik). */
  gorselAlt?: string;
  /** İlgili hizmet slug'ları (opsiyonel) — detay sayfasında "İlgili Hizmetler" linkleri gösterilir */
  ilgiliHizmetler?: string[];
};

export const duyurular: Duyuru[] = [
  {
    slug: "akreditasyon-durumuna-iliskin-bilgilendirme",
    baslik: "Akreditasyon Durumuna İlişkin Bilgilendirme",
    tarih: "2026-08-25",
    kategori: "Duyuru",
    ozet:
      "TÜRKAK'ın 21.08.2026 tarihli kararı doğrultusunda DVN CERT'in AB-0209-YS dosya numaralı akreditasyonu geri çekilmiştir. Aynı tarih itibarıyla TÜRKAK markasının kullanımı ve akreditasyona yönelik atıflar durdurulmuştur.",
    icerik:
      "Değerli Müşterilerimiz,\n\n" +
      "Türk Akreditasyon Kurumu (TÜRKAK) tarafından alınan 21.08.2026 tarihli karar doğrultusunda, DVN CERT Belgelendirme Hizmetleri Ltd. Şti.'nin AB-0209-YS dosya numaralı akreditasyonu geri çekilmiştir.\n\n" +
      "Bu kapsamda, 21.08.2026 tarihi itibarıyla TÜRKAK markasının kullanımı ve TÜRKAK akreditasyonuna yönelik atıflar durdurulmuştur.\n\n" +
      "Mevcut belgelendirme süreçleri ve müşterilerimize ilişkin gerekli değerlendirmeler yürütülmekte olup, ihtiyaç olması halinde ilgili müşterilerimizle doğrudan iletişime geçilecektir.\n\n" +
      "Sürece ilişkin güncel bilgilendirmeler resmi iletişim kanallarımız üzerinden paylaşılacaktır.\n\n" +
      "DVN CERT Belgelendirme Hizmetleri Ltd. Şti.\n\n" +
      "25.08.2026",
  },
  {
    slug: "iso-14001-2026-yayimlandi",
    baslik: "ISO 14001:2026 Yayımlandı — Geçiş Süreci Başladı",
    tarih: "2026-07-31",
    kategori: "Standart Güncellemesi",
    ozet:
      "Çevre yönetim sistemi standardının yeni sürümü ISO 14001:2026, 15 Nisan 2026 tarihinde yayımlandı ve ISO 14001:2015'in yerini aldı. Geçiş süresi üç yıl olarak belirlendi; mevcut belgeli kuruluşların bu süre içinde geçiş tetkikini tamamlaması gerekiyor.",
    icerik:
      "Uluslararası Standardizasyon Örgütü (ISO), çevre yönetim sistemi standardının yeni sürümü olan **ISO 14001:2026**'yı **15 Nisan 2026** tarihinde yayımlamıştır. Yeni sürüm, 2015'ten bu yana yürürlükte olan ISO 14001:2015'in yerini almakta ve 2024 yılında yayımlanan iklim değişikliği tadilini de bünyesine dahil etmektedir.\n\n" +
      "**Geçiş süresi:** Yayım tarihinden itibaren **üç yıllık** bir geçiş süresi öngörülmüştür. Bu takvime göre ISO 14001:2015'e göre düzenlenmiş sertifikalar, geçiş süresinin sona ereceği **Nisan 2029** sonrasında geçerliliğini yitirecektir. Ayrıca geçiş sürecinin son 18 ayında ISO 14001:2015'e göre yeni ilk belgelendirme yapılmaması beklenmektedir; bu kapsamda 2015 sürümüne göre yeni belge düzenlenmesinin **2027 sonbaharında** sona ermesi öngörülmektedir.\n\n" +
      "Geçiş takviminin bağlayıcı kaynağı, ISO tarafından yayımlanan standart metni ve ilgili uluslararası geçiş dokümanlarıdır. Takvime ilişkin kesinleşen ayrıntıları bu sayfadan duyurmaya devam edeceğiz.\n\n" +
      "**Neler değişti?** Yeni sürüm; kuruluş bağlamında iklim değişikliğinin yanı sıra biyoçeşitlilik, kirlilik ve doğal kaynak erişilebilirliği gibi çevresel koşulların da değerlendirilmesini, çevresel risk ve fırsatların ayrı bir madde altında ele alınmasını, değişikliklerin planlı biçimde yönetilmesini, yaşam döngüsü bakış açısının değer zinciri boyunca güçlendirilmesini ve operasyonel kontrolün dışarıdan sağlanan proses, ürün ve hizmetleri kapsayacak biçimde genişletilmesini getirmektedir. Ayrıntılı karşılaştırma için [ISO 14001:2026 nedir, ne değişti ve geçiş süreci nasıl işler](/blog/iso-14001-2026-degisiklikler-ve-gecis) yazımızı inceleyebilirsiniz.\n\n" +
      "**Belgeli kuruluşlarımız için:** Geçiş tetkikleri, planlı gözetim veya yeniden belgelendirme tetkikleriyle birlikte ya da ayrı bir tetkik olarak gerçekleştirilebilir. Kuruluşumuz, belgelendirme kapsamının yeni sürümü içerecek biçimde güncellenmesinin ardından geçiş tetkiki planlamasına başlayacak ve belgeli kuruluşlarımızı ayrıca bilgilendirecektir.\n\n" +
      "Geçişe hazırlık, eğitim ihtiyacı veya belgelendirme başvurusu hakkındaki sorularınız için [ISO 14001 belgelendirme hizmetimizi](/hizmetler/iso-14001) inceleyebilir ya da [bizimle iletişime geçebilirsiniz](/iletisim).",
    ilgiliHizmetler: ["iso-14001", "sistem-belgelendirme"],
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
