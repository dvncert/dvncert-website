/**
 * DVN Cert - Eğitimler (merkezi veri)
 *
 * Tüm eğitim detay sayfaları (/egitimler/[slug]) ve /egitimler hub sayfası bu
 * listeden beslenir (hizmetler gibi lib'den; DB senkronu gerekmez).
 *
 * KURAL: Tüm eğitimler GENEL KATILIMA AÇIKTIR. Kurum bazlı / firmaya özel grup
 * eğitimi YAPILMAZ. İçerikte bu çerçeve korunmalıdır.
 *
 * Belge çerçevesi: Katılımcılara "DVN Cert katılım belgesi" verilir; IRCA /
 * Exemplar Global gibi akreditasyon/onay iddiası YAPILMAZ.
 *
 * giris alanı: paragraflar boş satır (\n\n) ile ayrılır; satır içi link için
 * markdown `[metin](/yol)` kullanılır (IcerikMetin render eder).
 */

export type EgitimSSS = { soru: string; cevap: string };

export type Egitim = {
  slug: string;
  /** Gruplama: "ISO 9001" | "ISO 14001" | "ISO 45001" | "ISO 50001" | "ISO 19011" | "Entegre YS" */
  standart: string;
  /** "Temel" | "İç Tetkikçi" | "Baş Denetçi" | "Tetkik" | "Entegre" */
  seviye: string;
  baslik: string;
  /** Standart kodu, ör. "ISO 9001:2015" */
  kod?: string;
  ikon: string;
  sure: string;
  yontem: string;
  onKosul: string;
  katilimBelgesi: string;
  kimlerKatilabilir: string;
  seoTitle: string;
  seoAciklama: string;
  kisaAciklama: string;
  giris: string;
  kazanimlar: string[];
  konular: string[];
  sss: EgitimSSS[];
  /** İlgili belgelendirme hizmeti slug'ı (iç linkleme) */
  ilgiliHizmet?: string;
  /** İlgili eğitim slug'ları */
  ilgiliEgitimler?: string[];
  /** İlgili blog slug'ları */
  ilgiliBloglar?: string[];
};

// ---- Ortak metinler (genel katılım / belge çerçevesi) ----
const YONTEM = "Çevrim içi (canlı online) veya yüz yüze sınıf ortamında, genel katılıma açık olarak düzenlenir.";
const BELGE = "Eğitimi tamamlayan katılımcılara DVN Cert katılım belgesi verilir.";
const ON_KOSUL_YOK = "Ön koşul bulunmamaktadır; konuya ilgi duyan herkes katılabilir.";
const ON_KOSUL_IC = "İlgili standardın temel düzeyde bilinmesi önerilir (zorunlu değildir).";
const ON_KOSUL_BAS = "İlgili standardın ve yönetim sistemi tetkikinin temel düzeyde bilinmesi önerilir.";

// ---- Konu omurgaları (standart konuları + seviye konuları) ----
function konuTemel(std: string[]): string[] {
  return [
    "Standardın amacı, kapsamı ve sağladığı faydalar",
    "Annex SL ortak üst yapı (HLS) ve madde yapısı",
    "Terimler ve tanımlar",
    ...std,
    "PUKÖ (Planla-Uygula-Kontrol Et-Önlem Al) döngüsü ve sürekli iyileştirme",
    "Dokümante edilmiş bilgi ve belgelendirmeye hazırlık",
  ];
}
function konuIc(std: string[]): string[] {
  return [
    ...std,
    "Tetkik prensipleri ve ISO 19011 yaklaşımı",
    "Tetkik programı, planı ve kontrol listelerinin hazırlanması",
    "Saha tetkik teknikleri: görüşme, gözlem ve objektif kanıt toplama",
    "Uygunsuzlukların tespiti, sınıflandırılması ve yazılması",
    "İç tetkik raporlama ve düzeltici faaliyet takibi",
  ];
}
function konuBas(std: string[]): string[] {
  return [
    ...std,
    "Tetkik sürecinin başlatılmasından takibine kadar tüm döngü",
    "Tetkik ekibi liderliği ve baş tetkikçinin sorumlulukları",
    "Açılış ve kapanış toplantılarının yönetimi",
    "Belgelendirme (3. taraf) tetkik süreci ve aşamaları (Aşama 1 / Aşama 2)",
    "Uygunsuzluk sınıflandırma, tetkikçi yetkinliği ve tarafsızlık",
  ];
}

// Standart bazlı konu kümeleri
const K9001 = [
  "Müşteri odağı, liderlik ve kalite politikası",
  "Süreç yaklaşımı ve kalite hedefleri",
  "Risk ve fırsatların ele alınması",
  "Operasyon, tasarım ve tedarik (dış kaynak) kontrolü",
  "Performans değerlendirme ve sürekli iyileştirme",
];
const K14001 = [
  "Çevre boyutlarının ve etkilerinin belirlenmesi",
  "Uygunluk yükümlülükleri (yasal ve diğer gereklilikler)",
  "Yaşam döngüsü perspektifi",
  "Acil duruma hazırlık ve müdahale",
  "Çevre performansının izlenmesi ve değerlendirilmesi",
];
const K45001 = [
  "Tehlike tanımlama ve risk değerlendirme",
  "Çalışanların katılımı ve danışma",
  "Yasal ve diğer İSG gereklilikleri",
  "Olay araştırma, düzeltici faaliyet ve sürekli iyileştirme",
  "İSG performansının izlenmesi ve ölçülmesi",
];
const K50001 = [
  "Enerji gözden geçirme (enerji etüdü)",
  "Enerji performans göstergeleri (EnPI) ve enerji baz çizgisi (EnB)",
  "Enerji verimliliği fırsatlarının belirlenmesi",
  "Enerji amaçları, hedefleri ve eylem planları",
  "Enerji performansının izlenmesi, ölçülmesi ve doğrulanması",
];

// ---- SSS üretici (kurs adına göre kişiselleştirir; ek olarak her kursa özgü 1 soru inline eklenir) ----
function sssOrtak(ad: string, sure: string, onKosul: string): EgitimSSS[] {
  return [
    { soru: `${ad} kaç gün sürüyor?`, cevap: `${ad} ${sure} olarak planlanır. Program çevrim içi veya yüz yüze, genel katılıma açık biçimde yürütülür.` },
    { soru: `${ad} online olarak alınabilir mi?`, cevap: `Evet. ${ad} çevrim içi (canlı online) ya da yüz yüze sınıf ortamında düzenlenir; her iki seçenek de genel katılıma açıktır.` },
    { soru: "Eğitime kimler katılabilir?", cevap: `Eğitimlerimiz genel katılıma açıktır; ilgilenen herkes bireysel olarak kayıt olabilir. ${onKosul}` },
    { soru: "Eğitim sonunda belge veriliyor mu?", cevap: BELGE },
  ];
}

export const egitimler: Egitim[] = [
  // ===================== ISO 9001 =====================
  {
    slug: "iso-9001-temel-egitimi",
    standart: "ISO 9001",
    seviye: "Temel",
    baslik: "ISO 9001 Temel Eğitimi",
    kod: "ISO 9001:2015",
    ikon: "kalite",
    sure: "1 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_YOK,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Kalite yönetim sistemini öğrenmek, kurmak veya sürdürmek isteyen herkes; kalite ekibi adayları ve standartla ilk kez tanışacak katılımcılar.",
    seoTitle: "ISO 9001 Temel Eğitimi (Bilinçlendirme) | Genel Katılım",
    seoAciklama: "ISO 9001:2015 Kalite Yönetim Sistemi temel/bilinçlendirme eğitimi. Standardın gereklilikleri, terimleri ve uygulaması; çevrim içi veya yüz yüze, genel katılıma açık.",
    kisaAciklama: "ISO 9001:2015 Kalite Yönetim Sistemi'nin gerekliliklerini ve uygulama mantığını baştan sona kavratan temel eğitim.",
    giris:
      "ISO 9001 Temel Eğitimi, dünyanın en yaygın yönetim sistemi standardı olan ISO 9001:2015'in gerekliliklerini ve uygulama mantığını baştan sona kavramanızı sağlar. Standardın terminolojisi, madde yapısı ve kalite yönetimi ilkeleri uygulama örnekleriyle ele alınır.\n\n" +
      "Genel katılıma açık bu program; kalite yönetim sistemini öğrenmek, kurmak veya sürdürmek isteyen herkes için uygundur ve [ISO 9001 belgelendirme](/hizmetler/iso-9001) sürecine sağlam bir temel oluşturur. Bir sonraki adım için [ISO 9001 İç Tetkikçi Eğitimi](/egitimler/iso-9001-ic-tetkikci-egitimi) ile devam edebilirsiniz.",
    kazanimlar: [
      "ISO 9001:2015'in amacını, kapsamını ve faydalarını açıklayabilme",
      "Madde bazlı gereklilikleri ve kalite yönetimi kavramlarını anlama",
      "Süreç yaklaşımı, risk temelli düşünme ve PUKÖ döngüsünü yorumlayabilme",
      "Standardın kuruluştaki uygulamasını değerlendirebilme",
      "Belgelendirme sürecine hazırlık için sağlam bir temel oluşturma",
    ],
    konular: konuTemel(K9001),
    sss: [
      ...sssOrtak("ISO 9001 Temel Eğitimi", "1 gün", ON_KOSUL_YOK),
      { soru: "ISO 9001 Temel Eğitimi ile İç Tetkikçi Eğitimi arasındaki fark nedir?", cevap: "Temel eğitim standardın gerekliliklerini öğretir; İç Tetkikçi Eğitimi ise bu gereklilikleri tetkik etmeyi (denetlemeyi) öğretir. Tetkik yapacaksanız temel eğitimin ardından İç Tetkikçi Eğitimi önerilir." },
    ],
    ilgiliHizmet: "iso-9001",
    ilgiliEgitimler: ["iso-9001-ic-tetkikci-egitimi", "iso-9001-bas-denetci-egitimi", "entegre-yonetim-sistemi-egitimi"],
    ilgiliBloglar: ["entegre-yonetim-sistemi-nedir"],
  },
  {
    slug: "iso-9001-ic-tetkikci-egitimi",
    standart: "ISO 9001",
    seviye: "İç Tetkikçi",
    baslik: "ISO 9001 İç Tetkikçi Eğitimi",
    kod: "ISO 9001:2015",
    ikon: "kalite",
    sure: "2 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_IC,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Kuruluşunda iç tetkik (iç denetim) yapacak veya yapan kişiler, kalite yönetim sistemi sorumluları ve süreç sahipleri.",
    seoTitle: "ISO 9001 İç Tetkikçi (İç Denetçi) Eğitimi | Genel Katılım",
    seoAciklama: "ISO 9001:2015 iç tetkikçi (iç denetçi) eğitimi. ISO 19011'e göre iç tetkik planlama, yürütme, uygunsuzluk yazma ve raporlama; çevrim içi veya yüz yüze, genel katılıma açık.",
    kisaAciklama: "ISO 19011 esaslı; ISO 9001 kalite yönetim sisteminde iç tetkik planlama, yürütme ve raporlama becerisi kazandıran eğitim.",
    giris:
      "ISO 9001 İç Tetkikçi Eğitimi, kalite yönetim sisteminizin iç tetkiklerini ISO 19011 rehberliğinde planlayıp yürütecek yetkinliği kazandırır. Tetkik sorularının hazırlanmasından uygunsuzlukların yazılmasına kadar tüm iç tetkik süreci uygulamalı olarak işlenir.\n\n" +
      "Genel katılıma açık bu program, [ISO 9001 belgelendirme](/hizmetler/iso-9001) öncesi zorunlu olan iç tetkik gerekliliğini karşılamanıza yardımcı olur. Belgelendirme tetkikine hazırlık için [belgelendirme denetimine hazırlık](/blog/belgelendirme-denetimine-hazirlik) yazımızı da inceleyebilirsiniz.",
    kazanimlar: [
      "ISO 19011'e göre iç tetkik programı ve planı hazırlama",
      "ISO 9001 gerekliliklerine göre tetkik sorusu ve kontrol listesi oluşturma",
      "Objektif kanıt toplama ve uygunsuzluk tespit etme",
      "Uygunsuzlukları doğru sınıflandırıp etkili biçimde yazabilme",
      "İç tetkik raporu hazırlama ve düzeltici faaliyetleri takip etme",
    ],
    konular: konuIc(["ISO 9001 gerekliliklerinin tetkik bakışıyla gözden geçirilmesi", "Süreç yaklaşımının tetkikte uygulanması"]),
    sss: [
      ...sssOrtak("ISO 9001 İç Tetkikçi Eğitimi", "2 gün", ON_KOSUL_IC),
      { soru: "İç tetkikçi olmak için ISO 9001 Temel Eğitimi şart mı?", cevap: "Zorunlu değildir ancak önerilir. Standardın gerekliliklerine hâkim katılımcılar tetkik tekniklerine daha hızlı odaklanır. Temel bilgisi olmayanlar için önce ISO 9001 Temel Eğitimi tavsiye edilir." },
    ],
    ilgiliHizmet: "iso-9001",
    ilgiliEgitimler: ["iso-9001-temel-egitimi", "iso-9001-bas-denetci-egitimi", "iso-19011-tetkik-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik"],
  },
  {
    slug: "iso-9001-bas-denetci-egitimi",
    standart: "ISO 9001",
    seviye: "Baş Denetçi",
    baslik: "ISO 9001 Baş Denetçi Eğitimi",
    kod: "ISO 9001:2015",
    ikon: "kalite",
    sure: "5 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_BAS,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Denetçi/baş denetçi olmayı hedefleyen profesyoneller, yönetim sistemi danışmanları ve deneyimli kalite uzmanları.",
    seoTitle: "ISO 9001 Baş Denetçi Eğitimi (Lead Auditor) | Genel Katılım",
    seoAciklama: "ISO 9001:2015 baş denetçi (lead auditor) eğitimi. Tetkik ekibi yönetimi, tüm tetkik döngüsü ve belgelendirme süreci; çevrim içi veya yüz yüze, genel katılıma açık.",
    kisaAciklama: "ISO 9001 kalite yönetim sisteminde tetkik ekibi yönetme ve tetkikin tüm döngüsünü yürütme yetkinliği kazandıran ileri düzey eğitim.",
    giris:
      "ISO 9001 Baş Denetçi Eğitimi, kalite yönetim sistemi tetkiklerini bir ekip lideri olarak baştan sona yönetecek ileri düzey yetkinliği kazandırır. Tetkikin başlatılmasından raporlama ve takibine kadar tüm döngü, belgelendirme (3. taraf) tetkik süreci perspektifiyle uygulamalı işlenir.\n\n" +
      "Genel katılıma açık bu program; [ISO 9001 belgelendirme](/hizmetler/iso-9001) süreçlerini derinlemesine anlamak ve denetçilik kariyeri hedeflemek isteyenler içindir. Tetkik metodolojisi için [ISO 19011 Tetkik Eğitimi](/egitimler/iso-19011-tetkik-egitimi) tamamlayıcı niteliktedir.",
    kazanimlar: [
      "Tetkik ekibini yönetme ve baş tetkikçi rolünü üstlenme",
      "ISO 9001 tetkikinin tüm döngüsünü planlama ve yürütme",
      "Açılış ve kapanış toplantılarını etkin biçimde yönetme",
      "Uygunsuzlukları sınıflandırma ve düzeltici faaliyetleri değerlendirme",
      "Belgelendirme tetkik süreçlerini ve tetkikçi tarafsızlığını kavrama",
    ],
    konular: konuBas(["ISO 9001 gerekliliklerinin ileri düzeyde tetkik edilmesi", "Tetkik kanıtı ve bulgu değerlendirmede karar verme"]),
    sss: [
      ...sssOrtak("ISO 9001 Baş Denetçi Eğitimi", "5 gün", ON_KOSUL_BAS),
      { soru: "Baş Denetçi Eğitimi ile İç Tetkikçi Eğitimi arasındaki fark nedir?", cevap: "İç Tetkikçi Eğitimi kuruluş içi tetkiklere odaklanır. Baş Denetçi Eğitimi ise tetkik ekibi liderliği, belgelendirme (3. taraf) tetkik süreci ve daha kapsamlı bir tetkik metodolojisi içerir; süresi de daha uzundur." },
    ],
    ilgiliHizmet: "iso-9001",
    ilgiliEgitimler: ["iso-9001-ic-tetkikci-egitimi", "iso-19011-tetkik-egitimi", "iso-9001-temel-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik", "iso-belgesi-gecerlilik-ve-yenileme"],
  },

  // ===================== ISO 14001 =====================
  {
    slug: "iso-14001-temel-egitimi",
    standart: "ISO 14001",
    seviye: "Temel",
    baslik: "ISO 14001 Temel Eğitimi",
    kod: "ISO 14001:2015",
    ikon: "cevre",
    sure: "1 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_YOK,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Çevre yönetim sistemini öğrenmek, kurmak veya sürdürmek isteyen herkes; çevre ve sürdürülebilirlik ekibi adayları.",
    seoTitle: "ISO 14001 Temel Eğitimi (Bilinçlendirme) | Genel Katılım",
    seoAciklama: "ISO 14001:2015 Çevre Yönetim Sistemi temel/bilinçlendirme eğitimi. Çevre boyutları, uygunluk yükümlülükleri ve uygulama; çevrim içi veya yüz yüze, genel katılıma açık.",
    kisaAciklama: "ISO 14001:2015 Çevre Yönetim Sistemi'nin gerekliliklerini ve çevre yönetimi yaklaşımını kavratan temel eğitim.",
    giris:
      "ISO 14001 Temel Eğitimi, çevre yönetim sisteminin gerekliliklerini, çevre boyutları ve etkileri ile yaşam döngüsü perspektifini uygulama örnekleriyle kavramanızı sağlar. Standardın madde yapısı ve uygunluk yükümlülükleri ayrıntılı ele alınır.\n\n" +
      "Genel katılıma açık bu program; [ISO 14001 belgelendirme](/hizmetler/iso-14001) sürecine temel hazırlık sağlar. Tetkik yetkinliği için [ISO 14001 İç Tetkikçi Eğitimi](/egitimler/iso-14001-ic-tetkikci-egitimi) ile devam edebilirsiniz.",
    kazanimlar: [
      "ISO 14001:2015'in amacını, kapsamını ve faydalarını açıklayabilme",
      "Çevre boyutları ve etkilerini belirleyebilme",
      "Uygunluk yükümlülüklerini ve yaşam döngüsü perspektifini anlama",
      "Standardın kuruluştaki uygulamasını değerlendirebilme",
      "Belgelendirme sürecine hazırlık için temel oluşturma",
    ],
    konular: konuTemel(K14001),
    sss: [
      ...sssOrtak("ISO 14001 Temel Eğitimi", "1 gün", ON_KOSUL_YOK),
      { soru: "ISO 14001 eğitimi ISO 9001 ile birlikte alınabilir mi?", cevap: "Evet. Birden fazla standardı tek sistemde yönetmek isteyenler için Entegre Yönetim Sistemi Eğitimi de uygundur; ISO 9001 ve ISO 45001 ile ortak yapıyı birlikte ele alır." },
    ],
    ilgiliHizmet: "iso-14001",
    ilgiliEgitimler: ["iso-14001-ic-tetkikci-egitimi", "iso-14001-bas-denetci-egitimi", "entegre-yonetim-sistemi-egitimi"],
    ilgiliBloglar: ["entegre-yonetim-sistemi-nedir"],
  },
  {
    slug: "iso-14001-ic-tetkikci-egitimi",
    standart: "ISO 14001",
    seviye: "İç Tetkikçi",
    baslik: "ISO 14001 İç Tetkikçi Eğitimi",
    kod: "ISO 14001:2015",
    ikon: "cevre",
    sure: "2 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_IC,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Çevre yönetim sisteminde iç tetkik yapacak/yapan kişiler ve çevre yönetim sistemi sorumluları.",
    seoTitle: "ISO 14001 İç Tetkikçi (İç Denetçi) Eğitimi | Genel Katılım",
    seoAciklama: "ISO 14001:2015 iç tetkikçi (iç denetçi) eğitimi. ISO 19011'e göre çevre yönetim sistemi iç tetkiki planlama, yürütme ve raporlama; genel katılıma açık.",
    kisaAciklama: "ISO 19011 esaslı; ISO 14001 çevre yönetim sisteminde iç tetkik yürütme becerisi kazandıran eğitim.",
    giris:
      "ISO 14001 İç Tetkikçi Eğitimi, çevre yönetim sisteminizin iç tetkiklerini ISO 19011 rehberliğinde planlayıp yürütecek yetkinliği kazandırır. Çevre boyutları, uygunluk yükümlülükleri ve performans göstergeleri tetkik bakışıyla ele alınır.\n\n" +
      "Genel katılıma açık bu program, [ISO 14001 belgelendirme](/hizmetler/iso-14001) öncesi gerekli iç tetkik şartını karşılamanıza yardımcı olur.",
    kazanimlar: [
      "ISO 19011'e göre çevre yönetim sistemi iç tetkik planı hazırlama",
      "ISO 14001 gerekliliklerine göre tetkik sorusu ve kontrol listesi oluşturma",
      "Çevre boyutları ve uygunluk yükümlülüklerini tetkik etme",
      "Uygunsuzlukları sınıflandırıp etkili biçimde yazabilme",
      "İç tetkik raporu hazırlama ve düzeltici faaliyetleri takip etme",
    ],
    konular: konuIc(["ISO 14001 gerekliliklerinin tetkik bakışıyla gözden geçirilmesi", "Çevre boyutları ve uygunluk yükümlülüklerinin tetkiki"]),
    sss: [
      ...sssOrtak("ISO 14001 İç Tetkikçi Eğitimi", "2 gün", ON_KOSUL_IC),
      { soru: "Çevre mevzuatı bilgisi gerekli mi?", cevap: "Temel düzeyde uygunluk yükümlülükleri kavramı eğitimde ele alınır. Derinlemesine mevzuat uzmanlığı şart değildir; tetkik, uygunluğun nasıl değerlendirileceğine odaklanır." },
    ],
    ilgiliHizmet: "iso-14001",
    ilgiliEgitimler: ["iso-14001-temel-egitimi", "iso-14001-bas-denetci-egitimi", "iso-19011-tetkik-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik"],
  },
  {
    slug: "iso-14001-bas-denetci-egitimi",
    standart: "ISO 14001",
    seviye: "Baş Denetçi",
    baslik: "ISO 14001 Baş Denetçi Eğitimi",
    kod: "ISO 14001:2015",
    ikon: "cevre",
    sure: "5 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_BAS,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Çevre alanında denetçi/baş denetçi olmayı hedefleyenler, danışmanlar ve deneyimli çevre yönetimi uzmanları.",
    seoTitle: "ISO 14001 Baş Denetçi Eğitimi (Lead Auditor) | Genel Katılım",
    seoAciklama: "ISO 14001:2015 baş denetçi (lead auditor) eğitimi. Tetkik ekibi yönetimi, tüm tetkik döngüsü ve belgelendirme süreci; genel katılıma açık.",
    kisaAciklama: "ISO 14001 çevre yönetim sisteminde tetkik ekibi yönetme ve tetkikin tüm döngüsünü yürütme yetkinliği kazandıran ileri düzey eğitim.",
    giris:
      "ISO 14001 Baş Denetçi Eğitimi, çevre yönetim sistemi tetkiklerini bir ekip lideri olarak baştan sona yönetecek ileri düzey yetkinliği kazandırır. Tüm tetkik döngüsü, belgelendirme (3. taraf) tetkik süreci perspektifiyle uygulamalı işlenir.\n\n" +
      "Genel katılıma açık bu program; [ISO 14001 belgelendirme](/hizmetler/iso-14001) süreçlerini derinlemesine anlamak ve çevre denetçiliği kariyeri hedeflemek isteyenler içindir.",
    kazanimlar: [
      "Tetkik ekibini yönetme ve baş tetkikçi rolünü üstlenme",
      "ISO 14001 tetkikinin tüm döngüsünü planlama ve yürütme",
      "Açılış ve kapanış toplantılarını etkin biçimde yönetme",
      "Uygunsuzlukları sınıflandırma ve düzeltici faaliyetleri değerlendirme",
      "Belgelendirme tetkik süreçlerini ve tetkikçi tarafsızlığını kavrama",
    ],
    konular: konuBas(["ISO 14001 gerekliliklerinin ileri düzeyde tetkik edilmesi", "Çevre performansı ve uygunluk değerlendirmede karar verme"]),
    sss: [
      ...sssOrtak("ISO 14001 Baş Denetçi Eğitimi", "5 gün", ON_KOSUL_BAS),
      { soru: "ISO 9001 baş denetçisiysem ISO 14001 için tekrar mı eğitim almalıyım?", cevap: "Tetkik metodolojisi ortak olsa da her standardın gereklilikleri farklıdır. ISO 14001'in çevre boyutları ve uygunluk yükümlülükleri gibi konularına özgü yetkinlik için standarda özel eğitim önerilir." },
    ],
    ilgiliHizmet: "iso-14001",
    ilgiliEgitimler: ["iso-14001-ic-tetkikci-egitimi", "iso-19011-tetkik-egitimi", "iso-14001-temel-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik"],
  },

  // ===================== ISO 45001 =====================
  {
    slug: "iso-45001-temel-egitimi",
    standart: "ISO 45001",
    seviye: "Temel",
    baslik: "ISO 45001 Temel Eğitimi",
    kod: "ISO 45001:2018",
    ikon: "isg",
    sure: "1 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_YOK,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "İş sağlığı ve güvenliği yönetim sistemini öğrenmek isteyen herkes; İSG ekibi adayları ve ilgili profesyoneller.",
    seoTitle: "ISO 45001 Temel Eğitimi (Bilinçlendirme) | Genel Katılım",
    seoAciklama: "ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi temel eğitimi. Tehlike tanımlama, risk değerlendirme ve uygulama; çevrim içi veya yüz yüze, genel katılıma açık.",
    kisaAciklama: "ISO 45001:2018 İSG Yönetim Sistemi'nin gerekliliklerini ve risk temelli İSG yaklaşımını kavratan temel eğitim.",
    giris:
      "ISO 45001 Temel Eğitimi, iş sağlığı ve güvenliği yönetim sisteminin gerekliliklerini; tehlike tanımlama, risk değerlendirme ve çalışan katılımı kavramlarıyla birlikte kavramanızı sağlar. Standardın madde yapısı ve yasal gereklilikler uygulama örnekleriyle ele alınır.\n\n" +
      "Genel katılıma açık bu program; [ISO 45001 belgelendirme](/hizmetler/iso-45001) sürecine temel hazırlık sağlar. Tetkik yetkinliği için [ISO 45001 İç Tetkikçi Eğitimi](/egitimler/iso-45001-ic-tetkikci-egitimi) ile devam edebilirsiniz.",
    kazanimlar: [
      "ISO 45001:2018'in amacını, kapsamını ve faydalarını açıklayabilme",
      "Tehlike tanımlama ve risk değerlendirme mantığını anlama",
      "Çalışan katılımı ve yasal gereklilikler kavramlarını yorumlayabilme",
      "Standardın kuruluştaki uygulamasını değerlendirebilme",
      "Belgelendirme sürecine hazırlık için temel oluşturma",
    ],
    konular: konuTemel(K45001),
    sss: [
      ...sssOrtak("ISO 45001 Temel Eğitimi", "1 gün", ON_KOSUL_YOK),
      { soru: "ISO 45001 eğitimi İSG uzmanlığı yerine geçer mi?", cevap: "Hayır. Bu eğitim ISO 45001 yönetim sistemi standardını öğretir; yasal İSG uzmanlık belgesinin (İSG profesyoneli) yerine geçmez. İkisi birbirini tamamlar." },
    ],
    ilgiliHizmet: "iso-45001",
    ilgiliEgitimler: ["iso-45001-ic-tetkikci-egitimi", "iso-45001-bas-denetci-egitimi", "entegre-yonetim-sistemi-egitimi"],
    ilgiliBloglar: ["entegre-yonetim-sistemi-nedir"],
  },
  {
    slug: "iso-45001-ic-tetkikci-egitimi",
    standart: "ISO 45001",
    seviye: "İç Tetkikçi",
    baslik: "ISO 45001 İç Tetkikçi Eğitimi",
    kod: "ISO 45001:2018",
    ikon: "isg",
    sure: "2 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_IC,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "İSG yönetim sisteminde iç tetkik yapacak/yapan kişiler, İSG sorumluları ve uzmanları.",
    seoTitle: "ISO 45001 İç Tetkikçi (İç Denetçi) Eğitimi | Genel Katılım",
    seoAciklama: "ISO 45001:2018 iç tetkikçi (iç denetçi) eğitimi. ISO 19011'e göre İSG yönetim sistemi iç tetkiki planlama, yürütme ve raporlama; genel katılıma açık.",
    kisaAciklama: "ISO 19011 esaslı; ISO 45001 İSG yönetim sisteminde iç tetkik yürütme becerisi kazandıran eğitim.",
    giris:
      "ISO 45001 İç Tetkikçi Eğitimi, İSG yönetim sisteminizin iç tetkiklerini ISO 19011 rehberliğinde planlayıp yürütecek yetkinliği kazandırır. Tehlike, risk ve yasal gereklilikler tetkik bakışıyla uygulamalı ele alınır.\n\n" +
      "Genel katılıma açık bu program, [ISO 45001 belgelendirme](/hizmetler/iso-45001) öncesi gerekli iç tetkik şartını karşılamanıza yardımcı olur.",
    kazanimlar: [
      "ISO 19011'e göre İSG iç tetkik planı hazırlama",
      "ISO 45001 gerekliliklerine göre tetkik sorusu ve kontrol listesi oluşturma",
      "Tehlike, risk ve yasal uygunluğu tetkik etme",
      "Uygunsuzlukları sınıflandırıp etkili biçimde yazabilme",
      "İç tetkik raporu hazırlama ve düzeltici faaliyetleri takip etme",
    ],
    konular: konuIc(["ISO 45001 gerekliliklerinin tetkik bakışıyla gözden geçirilmesi", "Tehlike, risk ve çalışan katılımının tetkiki"]),
    sss: [
      ...sssOrtak("ISO 45001 İç Tetkikçi Eğitimi", "2 gün", ON_KOSUL_IC),
      { soru: "İç tetkik ile saha İSG denetimi aynı şey mi?", cevap: "Hayır. İç tetkik, yönetim sisteminin ISO 45001 gerekliliklerine uygunluğunu değerlendirir; saha İSG denetimi ise operasyonel güvenlik koşullarına odaklanır. Bu eğitim yönetim sistemi iç tetkikini öğretir." },
    ],
    ilgiliHizmet: "iso-45001",
    ilgiliEgitimler: ["iso-45001-temel-egitimi", "iso-45001-bas-denetci-egitimi", "iso-19011-tetkik-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik"],
  },
  {
    slug: "iso-45001-bas-denetci-egitimi",
    standart: "ISO 45001",
    seviye: "Baş Denetçi",
    baslik: "ISO 45001 Baş Denetçi Eğitimi",
    kod: "ISO 45001:2018",
    ikon: "isg",
    sure: "5 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_BAS,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "İSG alanında denetçi/baş denetçi olmayı hedefleyenler, danışmanlar ve deneyimli İSG uzmanları.",
    seoTitle: "ISO 45001 Baş Denetçi Eğitimi (Lead Auditor) | Genel Katılım",
    seoAciklama: "ISO 45001:2018 baş denetçi (lead auditor) eğitimi. Tetkik ekibi yönetimi, tüm tetkik döngüsü ve belgelendirme süreci; genel katılıma açık.",
    kisaAciklama: "ISO 45001 İSG yönetim sisteminde tetkik ekibi yönetme ve tetkikin tüm döngüsünü yürütme yetkinliği kazandıran ileri düzey eğitim.",
    giris:
      "ISO 45001 Baş Denetçi Eğitimi, İSG yönetim sistemi tetkiklerini bir ekip lideri olarak baştan sona yönetecek ileri düzey yetkinliği kazandırır. Tüm tetkik döngüsü, belgelendirme (3. taraf) tetkik süreci perspektifiyle uygulamalı işlenir.\n\n" +
      "Genel katılıma açık bu program; [ISO 45001 belgelendirme](/hizmetler/iso-45001) süreçlerini derinlemesine anlamak ve İSG denetçiliği kariyeri hedeflemek isteyenler içindir.",
    kazanimlar: [
      "Tetkik ekibini yönetme ve baş tetkikçi rolünü üstlenme",
      "ISO 45001 tetkikinin tüm döngüsünü planlama ve yürütme",
      "Açılış ve kapanış toplantılarını etkin biçimde yönetme",
      "Uygunsuzlukları sınıflandırma ve düzeltici faaliyetleri değerlendirme",
      "Belgelendirme tetkik süreçlerini ve tetkikçi tarafsızlığını kavrama",
    ],
    konular: konuBas(["ISO 45001 gerekliliklerinin ileri düzeyde tetkik edilmesi", "İSG performansı ve olay yönetiminin değerlendirilmesi"]),
    sss: [
      ...sssOrtak("ISO 45001 Baş Denetçi Eğitimi", "5 gün", ON_KOSUL_BAS),
      { soru: "Eğitim hangi sektörler için geçerli?", cevap: "ISO 45001 sektörden bağımsız bir standarttır; eğitim tetkik metodolojisini tüm sektörlere uygulanabilir biçimde öğretir. Katılımcılar kendi sektörlerinden örneklerle çalışabilir." },
    ],
    ilgiliHizmet: "iso-45001",
    ilgiliEgitimler: ["iso-45001-ic-tetkikci-egitimi", "iso-19011-tetkik-egitimi", "iso-45001-temel-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik"],
  },

  // ===================== ISO 50001 =====================
  {
    slug: "iso-50001-temel-egitimi",
    standart: "ISO 50001",
    seviye: "Temel",
    baslik: "ISO 50001 Temel Eğitimi",
    kod: "ISO 50001:2018",
    ikon: "enerji",
    sure: "1 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_YOK,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Enerji yönetim sistemini öğrenmek isteyen herkes; enerji yöneticileri, enerji verimliliği ve sürdürülebilirlik ile ilgilenen profesyoneller.",
    seoTitle: "ISO 50001 Temel Eğitimi (Bilinçlendirme) | Genel Katılım",
    seoAciklama: "ISO 50001:2018 Enerji Yönetim Sistemi temel eğitimi. Enerji gözden geçirme, EnPI ve enerji verimliliği; çevrim içi veya yüz yüze, genel katılıma açık.",
    kisaAciklama: "ISO 50001:2018 Enerji Yönetim Sistemi'nin gerekliliklerini ve enerji performansı yaklaşımını kavratan temel eğitim.",
    giris:
      "ISO 50001 Temel Eğitimi, enerji yönetim sisteminin gerekliliklerini; enerji gözden geçirme (etüt), enerji performans göstergeleri (EnPI) ve enerji baz çizgisi (EnB) kavramlarıyla birlikte kavramanızı sağlar. Standardın madde yapısı uygulama örnekleriyle işlenir.\n\n" +
      "Genel katılıma açık bu program; [ISO 50001 belgelendirme](/hizmetler/iso-50001) sürecine temel hazırlık sağlar. Tetkik yetkinliği için [ISO 50001 İç Tetkikçi Eğitimi](/egitimler/iso-50001-ic-tetkikci-egitimi) ile devam edebilirsiniz.",
    kazanimlar: [
      "ISO 50001:2018'in amacını, kapsamını ve faydalarını açıklayabilme",
      "Enerji gözden geçirme ve EnPI/EnB kavramlarını anlama",
      "Enerji verimliliği fırsatlarını tanıyabilme",
      "Standardın kuruluştaki uygulamasını değerlendirebilme",
      "Belgelendirme sürecine hazırlık için temel oluşturma",
    ],
    konular: konuTemel(K50001),
    sss: [
      ...sssOrtak("ISO 50001 Temel Eğitimi", "1 gün", ON_KOSUL_YOK),
      { soru: "ISO 50001 enerji verimliliği yasal yükümlülükleriyle ilişkili mi?", cevap: "ISO 50001, enerji performansını sistemli biçimde yönetmenin uluslararası çerçevesidir ve enerji verimliliği çalışmalarını destekler. Eğitim, standardın gerekliliklerine odaklanır; ulusal mevzuat ayrıca değerlendirilmelidir." },
    ],
    ilgiliHizmet: "iso-50001",
    ilgiliEgitimler: ["iso-50001-ic-tetkikci-egitimi", "iso-50001-bas-denetci-egitimi", "entegre-yonetim-sistemi-egitimi"],
    ilgiliBloglar: ["entegre-yonetim-sistemi-nedir"],
  },
  {
    slug: "iso-50001-ic-tetkikci-egitimi",
    standart: "ISO 50001",
    seviye: "İç Tetkikçi",
    baslik: "ISO 50001 İç Tetkikçi Eğitimi",
    kod: "ISO 50001:2018",
    ikon: "enerji",
    sure: "2 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_IC,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Enerji yönetim sisteminde iç tetkik yapacak/yapan kişiler ve enerji yöneticileri.",
    seoTitle: "ISO 50001 İç Tetkikçi (İç Denetçi) Eğitimi | Genel Katılım",
    seoAciklama: "ISO 50001:2018 iç tetkikçi (iç denetçi) eğitimi. ISO 19011'e göre enerji yönetim sistemi iç tetkiki planlama, yürütme ve raporlama; genel katılıma açık.",
    kisaAciklama: "ISO 19011 esaslı; ISO 50001 enerji yönetim sisteminde iç tetkik yürütme becerisi kazandıran eğitim.",
    giris:
      "ISO 50001 İç Tetkikçi Eğitimi, enerji yönetim sisteminizin iç tetkiklerini ISO 19011 rehberliğinde planlayıp yürütecek yetkinliği kazandırır. Enerji gözden geçirme, EnPI ve enerji performansı tetkik bakışıyla uygulamalı ele alınır.\n\n" +
      "Genel katılıma açık bu program, [ISO 50001 belgelendirme](/hizmetler/iso-50001) öncesi gerekli iç tetkik şartını karşılamanıza yardımcı olur.",
    kazanimlar: [
      "ISO 19011'e göre enerji yönetim sistemi iç tetkik planı hazırlama",
      "ISO 50001 gerekliliklerine göre tetkik sorusu ve kontrol listesi oluşturma",
      "Enerji performansı ve EnPI'leri tetkik etme",
      "Uygunsuzlukları sınıflandırıp etkili biçimde yazabilme",
      "İç tetkik raporu hazırlama ve düzeltici faaliyetleri takip etme",
    ],
    konular: konuIc(["ISO 50001 gerekliliklerinin tetkik bakışıyla gözden geçirilmesi", "Enerji performansı ve EnPI'lerin tetkiki"]),
    sss: [
      ...sssOrtak("ISO 50001 İç Tetkikçi Eğitimi", "2 gün", ON_KOSUL_IC),
      { soru: "Enerji performansının tetkiki diğer standartlardan farklı mı?", cevap: "Evet, ISO 50001'in ayırt edici yönü enerji performansının sürekli iyileştirilmesini kanıtlarla değerlendirmesidir. Eğitim, EnPI ve baz çizgisi üzerinden performans iyileşmesini nasıl tetkik edeceğinizi öğretir." },
    ],
    ilgiliHizmet: "iso-50001",
    ilgiliEgitimler: ["iso-50001-temel-egitimi", "iso-50001-bas-denetci-egitimi", "iso-19011-tetkik-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik"],
  },
  {
    slug: "iso-50001-bas-denetci-egitimi",
    standart: "ISO 50001",
    seviye: "Baş Denetçi",
    baslik: "ISO 50001 Baş Denetçi Eğitimi",
    kod: "ISO 50001:2018",
    ikon: "enerji",
    sure: "5 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_BAS,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Enerji alanında denetçi/baş denetçi olmayı hedefleyenler, danışmanlar ve deneyimli enerji yönetimi uzmanları.",
    seoTitle: "ISO 50001 Baş Denetçi Eğitimi (Lead Auditor) | Genel Katılım",
    seoAciklama: "ISO 50001:2018 baş denetçi (lead auditor) eğitimi. Tetkik ekibi yönetimi, tüm tetkik döngüsü ve belgelendirme süreci; genel katılıma açık.",
    kisaAciklama: "ISO 50001 enerji yönetim sisteminde tetkik ekibi yönetme ve tetkikin tüm döngüsünü yürütme yetkinliği kazandıran ileri düzey eğitim.",
    giris:
      "ISO 50001 Baş Denetçi Eğitimi, enerji yönetim sistemi tetkiklerini bir ekip lideri olarak baştan sona yönetecek ileri düzey yetkinliği kazandırır. Tüm tetkik döngüsü, belgelendirme (3. taraf) tetkik süreci perspektifiyle uygulamalı işlenir.\n\n" +
      "Genel katılıma açık bu program; [ISO 50001 belgelendirme](/hizmetler/iso-50001) süreçlerini derinlemesine anlamak ve enerji denetçiliği kariyeri hedeflemek isteyenler içindir.",
    kazanimlar: [
      "Tetkik ekibini yönetme ve baş tetkikçi rolünü üstlenme",
      "ISO 50001 tetkikinin tüm döngüsünü planlama ve yürütme",
      "Enerji performansının iyileştirildiğini kanıtlarla değerlendirme",
      "Uygunsuzlukları sınıflandırma ve düzeltici faaliyetleri değerlendirme",
      "Belgelendirme tetkik süreçlerini ve tetkikçi tarafsızlığını kavrama",
    ],
    konular: konuBas(["ISO 50001 gerekliliklerinin ileri düzeyde tetkik edilmesi", "Enerji performansı doğrulama ve EnPI değerlendirmede karar verme"]),
    sss: [
      ...sssOrtak("ISO 50001 Baş Denetçi Eğitimi", "5 gün", ON_KOSUL_BAS),
      { soru: "ISO 50001 baş denetçi eğitimi teknik enerji bilgisi gerektirir mi?", cevap: "Temel düzeyde enerji kavramları eğitimde ele alınır. İleri teknik enerji mühendisliği bilgisi şart olmamakla birlikte, enerji performansı konularına aşinalık katılımcıya avantaj sağlar." },
    ],
    ilgiliHizmet: "iso-50001",
    ilgiliEgitimler: ["iso-50001-ic-tetkikci-egitimi", "iso-19011-tetkik-egitimi", "iso-50001-temel-egitimi"],
    ilgiliBloglar: ["belgelendirme-denetimine-hazirlik", "iso-belgesi-gecerlilik-ve-yenileme"],
  },

  // ===================== ISO 19011 =====================
  {
    slug: "iso-19011-tetkik-egitimi",
    standart: "ISO 19011",
    seviye: "Tetkik",
    baslik: "ISO 19011 Yönetim Sistemleri Tetkik Eğitimi",
    kod: "ISO 19011:2018",
    ikon: "denetim",
    sure: "2 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_IC,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Her tür yönetim sistemi tetkiki yapacak iç tetkikçiler, tetkik programı yöneticileri ve denetim metodolojisini öğrenmek isteyenler.",
    seoTitle: "ISO 19011 Tetkik Eğitimi (Yönetim Sistemleri Denetimi) | Genel Katılım",
    seoAciklama: "ISO 19011:2018 yönetim sistemleri tetkik eğitimi. Tetkik prensipleri, tetkik programı yönetimi, tetkik faaliyetleri ve tetkikçi yetkinliği; genel katılıma açık.",
    kisaAciklama: "Yönetim sistemi türünden bağımsız; ISO 19011:2018 tetkik prensipleri, programı ve metodolojisini kazandıran eğitim.",
    giris:
      "ISO 19011 Tetkik Eğitimi, herhangi bir yönetim sistemi standardının tetkikinde geçerli olan ortak tetkik prensiplerini, tetkik programı yönetimini ve tetkik faaliyetlerini kazandırır. ISO 9001, 14001, 45001 ve 50001 dâhil tüm yönetim sistemlerinin tetkikinde uygulanabilir.\n\n" +
      "Genel katılıma açık bu program; iç tetkikçi ve baş denetçi eğitimlerinin metodolojik temelini oluşturur. Tetkikin uygulamada nasıl işlediğine dair [2. taraf denetimi nedir](/blog/2-taraf-denetimi-nedir) yazımız da tamamlayıcıdır.",
    kazanimlar: [
      "ISO 19011 tetkik prensiplerini açıklayabilme",
      "Tetkik programı oluşturma ve yönetme",
      "Tetkik faaliyetlerini (başlatma, hazırlık, saha, raporlama) planlama",
      "Objektif kanıt toplama ve bulgu oluşturma",
      "Tetkikçi yetkinliğini ve davranışlarını değerlendirme",
    ],
    konular: [
      "ISO 19011:2018'in amacı ve kapsamı",
      "Tetkik prensipleri (bütünlük, adil sunum, mesleki özen, gizlilik, bağımsızlık, kanıta dayalılık, risk temelli yaklaşım)",
      "Tetkik programının yönetimi",
      "Tetkik faaliyetlerinin yürütülmesi: başlatma, hazırlık, saha tetkiki, raporlama, takip",
      "Tetkik bulgularının ve uygunsuzlukların oluşturulması",
      "Tetkikçi yetkinliği ve yetkinliğin değerlendirilmesi",
      "Uzaktan (online) tetkik teknikleri",
    ],
    sss: [
      ...sssOrtak("ISO 19011 Tetkik Eğitimi", "2 gün", ON_KOSUL_IC),
      { soru: "ISO 19011 bir belgelendirme standardı mıdır?", cevap: "Hayır. ISO 19011 belgelendirilebilir bir standart değil, yönetim sistemleri tetkiki için bir kılavuzdur. Tetkik prensiplerini ve metodolojisini tanımlar; bu eğitim de o metodolojiyi öğretir." },
      { soru: "Bu eğitim hangi standartların tetkikinde işime yarar?", cevap: "Tüm yönetim sistemi standartlarında (ISO 9001, 14001, 45001, 50001 ve diğerleri). ISO 19011 ortak tetkik metodolojisini verdiği için standarda özel iç tetkikçi/baş denetçi eğitimlerinin temelidir." },
    ],
    ilgiliHizmet: "sistem-belgelendirme",
    ilgiliEgitimler: ["iso-9001-ic-tetkikci-egitimi", "iso-9001-bas-denetci-egitimi", "entegre-yonetim-sistemi-egitimi"],
    ilgiliBloglar: ["2-taraf-denetimi-nedir", "belgelendirme-denetimine-hazirlik"],
  },

  // ===================== Entegre YS =====================
  {
    slug: "entegre-yonetim-sistemi-egitimi",
    standart: "Entegre YS",
    seviye: "Entegre",
    baslik: "Entegre Yönetim Sistemi (ISO 9001-14001-45001) Eğitimi",
    ikon: "sistem",
    sure: "2 gün",
    yontem: YONTEM,
    onKosul: ON_KOSUL_IC,
    katilimBelgesi: BELGE,
    kimlerKatilabilir: "Birden fazla ISO standardını tek sistemde yöneten/yönetmek isteyen yönetim sistemi sorumluları, kalite-çevre-İSG ekipleri.",
    seoTitle: "Entegre Yönetim Sistemi Eğitimi (ISO 9001-14001-45001) | Genel Katılım",
    seoAciklama: "Entegre Yönetim Sistemi eğitimi: ISO 9001, 14001 ve 45001'i ortak yapıda (Annex SL) birleştirme, entegre tetkik ve yönetim; çevrim içi veya yüz yüze, genel katılıma açık.",
    kisaAciklama: "ISO 9001, 14001 ve 45001'i tek bir entegre yönetim sistemi çatısında birleştirme ve yönetme yaklaşımını kazandıran eğitim.",
    giris:
      "Entegre Yönetim Sistemi Eğitimi; ISO 9001 (kalite), ISO 14001 (çevre) ve ISO 45001 (İSG) standartlarını Annex SL ortak üst yapısı sayesinde tek bir yönetim sistemi çatısında nasıl birleştireceğinizi öğretir. Ortak ve standarda özgü gereklilikler karşılaştırmalı olarak ele alınır.\n\n" +
      "Genel katılıma açık bu program, tek denetimle birden çok standardı belgelendirmenin avantajlarını anlatır; ayrıntı için [entegre yönetim sistemi nedir](/blog/entegre-yonetim-sistemi-nedir) yazımıza ve [sistem belgelendirme](/hizmetler/sistem-belgelendirme) hizmetimize bakabilirsiniz.",
    kazanimlar: [
      "Annex SL ortak üst yapısını (HLS) ve standartların örtüşen maddelerini kavrama",
      "ISO 9001, 14001 ve 45001'in ortak ve farklı gerekliliklerini karşılaştırma",
      "Entegre bir yönetim sistemi kurma ve sürdürme yaklaşımını anlama",
      "Tek bir entegre tetkikle birden çok standardı değerlendirme",
      "Entegre belgelendirmenin zaman ve maliyet avantajlarını yorumlama",
    ],
    konular: [
      "Annex SL / yüksek seviye yapı (HLS) ve ortak terimler",
      "ISO 9001, 14001 ve 45001 maddelerinin karşılaştırmalı haritası",
      "Ortak süreçler: liderlik, risk ve fırsatlar, dokümante bilgi, iç tetkik",
      "Standarda özgü gereklilikler ve farkların yönetimi",
      "Entegre yönetim sisteminin kurulması ve sürdürülmesi",
      "Entegre tetkik planlaması ve yürütülmesi",
      "Entegre belgelendirme süreci ve avantajları",
    ],
    sss: [
      ...sssOrtak("Entegre Yönetim Sistemi Eğitimi", "2 gün", ON_KOSUL_IC),
      { soru: "Entegre eğitim için her üç standardı da bilmek gerekir mi?", cevap: "Standartların temel düzeyde bilinmesi faydalıdır ancak zorunlu değildir. Eğitim ortak yapıyı temel alır; tek tek standartlara derinlemesine hâkim olmayanlar için ilgili temel eğitimler de önerilir." },
      { soru: "ISO 50001 de entegrasyona dâhil edilebilir mi?", cevap: "Evet. Enerji yoğun kuruluşlar ISO 50001 enerji yönetim sistemini de aynı çatıya ekleyebilir. Eğitim, en yaygın 9001-14001-45001 üçlüsüne odaklanır; ek standartların entegrasyon mantığı da aktarılır." },
    ],
    ilgiliHizmet: "sistem-belgelendirme",
    ilgiliEgitimler: ["iso-9001-temel-egitimi", "iso-14001-temel-egitimi", "iso-45001-temel-egitimi"],
    ilgiliBloglar: ["entegre-yonetim-sistemi-nedir"],
  },
];

// ---- Yardımcılar ----
export function egitimGetir(slug: string): Egitim | undefined {
  return egitimler.find((e) => e.slug === slug);
}

/** Hub için: standart sırasına göre gruplanmış eğitimler. */
const STANDART_SIRASI = ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001", "ISO 19011", "Entegre YS"];

export function egitimGruplari(): { standart: string; egitimler: Egitim[] }[] {
  return STANDART_SIRASI.map((std) => ({
    standart: std,
    egitimler: egitimler.filter((e) => e.standart === std),
  })).filter((g) => g.egitimler.length > 0);
}
