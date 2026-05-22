/**
 * DVN Cert - ISO yönetim sistemi standartları için sayfa içeriği (merkezi veri)
 *
 * /hizmetler/iso-9001, iso-14001, iso-45001, iso-50001 sayfaları bu içerikten
 * ve ortak <IsoStandartSayfasi /> render bileşeninden beslenir.
 *
 * "Nasıl Alınır?" (süreç) ve "Geçerlilik" bölümleri tüm standartlarda yapısal
 * olarak aynıdır; render bileşeninde aşağıdaki dilbilgisi formlarıyla üretilir.
 */

import type { Metadata } from "next";

export type IsoKart = { baslik: string; metin: string };

/** Türkçe ek/çekim sorunlarını önlemek için elle doğrulanmış formlar. */
export type IsoSistemFormlari = {
  /** yalın: "kalite yönetim sistemi" (ör. "... sistemi dokümantasyonu") */
  i: string;
  /** belirtme: "kalite yönetim sistemini" */
  ni: string;
  /** tamlama: "kalite yönetim sisteminin" */
  nin: string;
  /** cümle başı (büyük harf doğru): "Kalite yönetim sisteminin" */
  cumleBasi: string;
};

export type IsoIcerik = {
  slug: string;
  stdAd: string; // "ISO 14001"
  stdKod: string; // "ISO 14001:2015"
  sistemAdiBuyuk: string; // "Çevre Yönetim Sistemi"
  sistem: IsoSistemFormlari;
  politika: string; // "Çevre politikası"

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;

  // Bölüm 1 — Nedir? (akredite içeren son paragraf render bileşeninde eklenir)
  nedirParagraflar: string[];

  // Bölüm 2 — Temel İlkeler / Unsurlar
  bolum2Baslik: string;
  bolum2Etiket: string; // hızlı bağlantı etiketi
  bolum2Giris: string;
  bolum2Kartlar: IsoKart[];

  // Bölüm 3 — Faydalar
  faydalarGiris: string;
  icFaydalar: string[];
  pazarFaydalar: string[];
  faydalarKapanis: string;
};

/** İlgili Standartlar bölümü için ana liste. */
export const isoTumStandartlar = [
  { slug: "iso-9001", kod: "ISO 9001", ad: "Kalite Yönetim Sistemi" },
  { slug: "iso-14001", kod: "ISO 14001", ad: "Çevre Yönetim Sistemi" },
  { slug: "iso-45001", kod: "ISO 45001", ad: "İş Sağlığı ve Güvenliği Yönetim Sistemi" },
  { slug: "iso-50001", kod: "ISO 50001", ad: "Enerji Yönetim Sistemi" },
];

export const isoIcerikler: Record<string, IsoIcerik> = {
  // ===================================================================
  "iso-9001": {
    slug: "iso-9001",
    stdAd: "ISO 9001",
    stdKod: "ISO 9001:2015",
    sistemAdiBuyuk: "Kalite Yönetim Sistemi",
    sistem: {
      i: "kalite yönetim sistemi",
      ni: "kalite yönetim sistemini",
      nin: "kalite yönetim sisteminin",
      cumleBasi: "Kalite yönetim sisteminin",
    },
    politika: "Kalite politikası",
    metaTitle: "ISO 9001:2015 Kalite Yönetim Sistemi Belgelendirmesi | DVN Cert",
    metaDescription:
      "TÜRKAK akreditasyon kapsamında ISO 9001:2015 belgelendirmesi. Başvuru süreci, faydalar, geçerlilik süresi ve adım adım belgelendirme rehberi.",
    keywords: [
      "ISO 9001 belgesi",
      "ISO 9001:2015",
      "ISO 9001 nasıl alınır",
      "ISO 9001 belgesi nedir",
      "kalite yönetim sistemi belgesi",
      "TÜRKAK ISO 9001",
      "ISO 9001 İstanbul",
      "ISO 9001 belgelendirme",
      "ISO 9001 belgesi geçerlilik süresi",
      "ISO 9001 faydaları",
    ],
    ogTitle: "ISO 9001:2015 Kalite Yönetim Sistemi Belgelendirmesi",
    ogDescription:
      "TÜRKAK akreditasyon kapsamında ISO 9001:2015 belgelendirmesi. Adım adım rehber, faydalar ve sertifika geçerlilik bilgileri.",
    nedirParagraflar: [
      "ISO 9001, kuruluşların kalite yönetim sistemi kurmasını ve sürdürmesini sağlayan uluslararası bir standarttır. Uluslararası Standartlar Örgütü (ISO) tarafından yayımlanan bu standart, dünyada en yaygın kullanılan yönetim sistemi standardıdır.",
      "ISO 9001 belgesi, bir kuruluşun ürünlerini ve hizmetlerini tutarlı bir kalitede üretebildiğini, müşteri beklentilerini karşılayabildiğini ve süreçlerini sürekli iyileştirebildiğini gösteren resmi bir dokümandır. Bu belge, akredite belgelendirme kuruluşları tarafından yapılan denetimler sonucunda düzenlenir.",
      "ISO 9001:2015 versiyonu, standardın günümüzde geçerli olan son sürümüdür. Önceki sürümlerden farklı olarak risk bazlı düşünme, kuruluşun bağlamını değerlendirme ve liderliğin sürece dahil olması gibi modern yaklaşımları ön plana çıkarır. 2015 revizyonu ile birlikte standardın daha esnek ve sektör bağımsız bir yapı kazanması hedeflenmiştir.",
      "ISO 9000 ailesi olarak bilinen standartlar grubunun temel üyesi olan ISO 9001, sektör fark etmeksizin her ölçekte kuruluşa uygulanabilir. Üretim, hizmet, sağlık, eğitim, inşaat, bilgi teknolojileri, tekstil, gıda, lojistik ve daha pek çok sektörden binlerce kuruluş ISO 9001 belgesine sahiptir. KOBİ ölçeğindeki bir aile işletmesinden çok uluslu bir holding şirketine kadar, faaliyet alanı veya çalışan sayısı fark etmeksizin standart şartlarını karşılayan her organizasyon ISO 9001 belgesi alabilir.",
    ],
    bolum2Baslik: "ISO 9001 Kalite Yönetim Sisteminin Temel İlkeleri",
    bolum2Etiket: "İlkeler",
    bolum2Giris:
      "ISO 9001:2015 standardı, kuruluşların kalite yönetim sistemini etkin bir şekilde kurması için yedi temel ilke üzerine inşa edilmiştir. Bu ilkeler, standardın felsefi temelini oluşturur ve uygulama yapan her kuruluşun bu ilkeleri anlaması ile başarıya ulaşması mümkündür.",
    bolum2Kartlar: [
      {
        baslik: "Müşteri Odaklılık",
        metin:
          "Kalite yönetiminin birincil amacı, müşteri şartlarını karşılamak ve müşteri beklentilerini aşmaktır. Müşteri odaklılık ilkesi, kuruluşun mevcut ve gelecekteki müşteri ihtiyaçlarını anlamasını, müşteri beklentilerini operasyonel hedeflere dönüştürmesini ve müşteri memnuniyetini sürekli ölçmesini gerektirir. Bu yaklaşım, sürdürülebilir başarı için temel bir koşuldur.",
      },
      {
        baslik: "Liderlik",
        metin:
          "Üst yönetim, kalite yönetim sisteminin oluşturulmasında, sürdürülmesinde ve iyileştirilmesinde belirleyici bir rol üstlenir. Liderlik ilkesi, yönetimin kalite politikasını belirlemesini, gerekli kaynakları sağlamasını ve tüm çalışanları ortak bir amaca yönlendirmesini ifade eder. ISO 9001:2015 ile birlikte üst yönetimin sürece doğrudan katılımı zorunlu hale gelmiştir.",
      },
      {
        baslik: "Çalışan Katılımı",
        metin:
          "Tüm seviyelerdeki çalışanların yetkinliğine, yetkilendirilmesine ve aktif katılımına dayalı bir kültürün oluşturulması kalite yönetiminin özünde yer alır. Çalışanların kendi süreçlerinin sahibi olduğunu hissetmesi, hata oranlarını düşürür ve iyileştirme fırsatlarının hızla fark edilmesini sağlar. Yetkilendirilmiş çalışan, sahiplenen çalışandır.",
      },
      {
        baslik: "Süreç Yaklaşımı",
        metin:
          "ISO 9001, kuruluşun faaliyetlerini birbiriyle etkileşim halindeki süreçler bütünü olarak ele alır. Her süreç tanımlanır, girdileri ve çıktıları belirlenir, performans göstergeleri ölçülür. Süreç yaklaşımı, sonuçların öngörülebilirliğini artırır ve kaynakların verimli kullanılmasını sağlar. PUKÖ (Planla-Uygula-Kontrol Et-Önlem Al) döngüsü bu yaklaşımın merkezindedir.",
      },
      {
        baslik: "İyileştirme",
        metin:
          "Başarılı kuruluşların temel özelliği, sürekli iyileştirmeyi kalıcı bir hedef olarak benimsemiş olmalarıdır. ISO 9001:2015, kuruluşların düzeltici faaliyetler, iç tetkikler, yönetim gözden geçirmeleri ve performans analizleri yoluyla sistemini sürekli geliştirmesini beklemektedir. İyileştirme bir defalık bir proje değil, kurumsal bir alışkanlıktır.",
      },
      {
        baslik: "Kanıta Dayalı Karar Verme",
        metin:
          "Etkili kararlar, verilerin ve bilgilerin analizine dayanmalıdır. Bu ilke, kuruluşun varsayımlar yerine ölçülebilir kanıtlarla hareket etmesini öngörür. Performans verilerinin toplanması, analiz edilmesi ve raporlanması, doğru zamanda doğru kararların alınmasını mümkün kılar. Veri olmadan iyileştirme yapılamaz.",
      },
      {
        baslik: "İlişki Yönetimi",
        metin:
          "Bir kuruluşun sürdürülebilir başarısı, sadece kendi performansına değil, tedarikçileri, iş ortakları, müşterileri ve diğer ilgili tarafları kapsayan ilişkilerinin kalitesine de bağlıdır. ISO 9001, kuruluşun bu ilişkileri sistematik bir şekilde yönetmesini, karşılıklı güvene dayalı uzun vadeli bağlar kurmasını teşvik eder. Güçlü tedarik zinciri, güçlü kalite demektir.",
      },
    ],
    faydalarGiris:
      "ISO 9001 belgesi, kuruluşlara hem iç işleyiş hem de dış pazar ilişkileri açısından çok yönlü katkılar sağlar. Standardın gerekliliklerini karşılayan ve sertifikasyon sürecini tamamlayan bir kuruluş, hem operasyonel hem de stratejik düzeyde belirgin değişimler yaşar. Aşağıda bu faydaları iki ana başlıkta inceliyoruz.",
    icFaydalar: [
      "Süreç verimliliğinde artış: Tanımlı ve ölçülebilir süreçler, kaynak kullanımını optimize eder; israfın ve gereksiz iş yükünün azalmasını sağlar.",
      "Hata ve uygunsuzluk oranlarında düşüş: Risk bazlı yaklaşım sayesinde potansiyel sorunlar ortaya çıkmadan önce tespit edilir ve önlem alınır.",
      "Çalışan motivasyonunda iyileşme: Açık iş tanımları, yetki ve sorumluluk şemaları ile çalışanlar kendi katkılarını daha net görür.",
      "İç iletişimde güçlenme: Süreçler arası akışın belirgin hale gelmesi, departmanlar arası koordinasyonu artırır.",
      "Maliyet kontrolü: Tekrarlayan hataların azalması, yeniden işleme masraflarının düşmesini ve genel maliyet yapısının iyileşmesini sağlar.",
      "Karar verme kalitesinde yükselme: Veri toplama ve analiz alışkanlığı, yönetimin daha bilinçli kararlar almasına imkan tanır.",
      "Kurumsal hafıza oluşumu: Doküman ve kayıt sistemi, kuruluşun bilgi birikiminin kişilere bağlı kalmasının önüne geçer.",
    ],
    pazarFaydalar: [
      "Müşteri güveninin artması: Uluslararası kabul görmüş bir standardın gerekliliklerini karşılamak, müşteri nezdinde güvenilirlik anlamına gelir.",
      "İhale ve tedarik zinciri avantajları: Kamu ihalelerinde ve büyük kurumsal müşterilerin tedarikçi seçim süreçlerinde ISO 9001 belgesi çoğu zaman bir ön şart olarak aranır.",
      "Uluslararası pazar erişimi: Akredite bir kuruluştan alınan ISO 9001 belgesi, ihracat süreçlerinde ve yabancı iş ortaklarıyla ilişkilerde kabul gören bir referanstır.",
      "Marka itibarı ve rekabet üstünlüğü: Kalite odaklı yönetim altyapısı, rakipler arasından sıyrılmak için ayırt edici bir özellik haline gelir.",
      "Müşteri memnuniyetinin sürdürülebilir şekilde yükselmesi: Standardın müşteri odaklılık ilkesi, hem mevcut müşterilerin korunmasını hem yeni müşteri kazanımını destekler.",
      "Tedarikçi ve iş ortaklarıyla ilişkilerin güçlenmesi: Yapılandırılmış bir kalite altyapısına sahip kuruluşlar, tedarik zincirinin diğer halkaları tarafından da güvenilir partner olarak değerlendirilir.",
    ],
    faydalarKapanis:
      "ISO 9001 belgesinin sağladığı faydaların düzeyi, kuruluşun standardı ne ölçüde benimsediği ve sistemi günlük operasyonlarına ne kadar entegre ettiği ile doğrudan ilişkilidir. Belgenin alınması başlangıç noktasıdır; asıl değer, sistemin yaşatılması ve sürekli iyileştirilmesi ile ortaya çıkar.",
  },

  // ===================================================================
  "iso-14001": {
    slug: "iso-14001",
    stdAd: "ISO 14001",
    stdKod: "ISO 14001:2015",
    sistemAdiBuyuk: "Çevre Yönetim Sistemi",
    sistem: {
      i: "çevre yönetim sistemi",
      ni: "çevre yönetim sistemini",
      nin: "çevre yönetim sisteminin",
      cumleBasi: "Çevre yönetim sisteminin",
    },
    politika: "Çevre politikası",
    metaTitle: "ISO 14001:2015 Çevre Yönetim Sistemi Belgelendirmesi | DVN Cert",
    metaDescription:
      "TÜRKAK akreditasyon kapsamında ISO 14001:2015 çevre yönetim sistemi belgelendirmesi. Başvuru süreci, faydalar, geçerlilik süresi ve adım adım rehber.",
    keywords: [
      "ISO 14001 belgesi",
      "ISO 14001:2015",
      "ISO 14001 nasıl alınır",
      "ISO 14001 belgesi nedir",
      "çevre yönetim sistemi belgesi",
      "TÜRKAK ISO 14001",
      "ISO 14001 İstanbul",
      "ISO 14001 belgelendirme",
      "ISO 14001 belgesi geçerlilik süresi",
      "ISO 14001 faydaları",
    ],
    ogTitle: "ISO 14001:2015 Çevre Yönetim Sistemi Belgelendirmesi",
    ogDescription:
      "TÜRKAK akreditasyon kapsamında ISO 14001:2015 belgelendirmesi. Adım adım rehber, faydalar ve sertifika geçerlilik bilgileri.",
    nedirParagraflar: [
      "ISO 14001, kuruluşların çevresel sorumluluklarını sistematik bir şekilde yönetmesini sağlayan uluslararası çevre yönetim sistemi standardıdır. Uluslararası Standartlar Örgütü (ISO) tarafından yayımlanan standart, faaliyetlerin çevre üzerindeki etkilerini kontrol altına almayı ve çevre performansını sürekli iyileştirmeyi amaçlar.",
      "ISO 14001 belgesi, bir kuruluşun çevresel etkilerini tanımladığını, yasal yükümlülüklerine uyduğunu ve kirliliği önlemeye yönelik bir yönetim sistemi kurduğunu gösteren resmi bir dokümandır. Bu belge, akredite belgelendirme kuruluşları tarafından yapılan denetimler sonucunda düzenlenir.",
      "ISO 14001:2015 versiyonu, standardın günümüzde geçerli olan son sürümüdür. Yüksek seviye yapısı (High Level Structure) sayesinde ISO 9001 gibi diğer yönetim sistemi standartlarıyla kolayca entegre edilebilir. 2015 revizyonu ile yaşam döngüsü bakış açısı, risk temelli düşünme ve liderliğin sürece dahil olması ön plana çıkmıştır.",
      "ISO 14001, sektör fark etmeksizin her ölçekte kuruluşa uygulanabilir. Üretim tesislerinden hizmet işletmelerine, inşaat firmalarından kamu kurumlarına kadar çevresel ayak izini azaltmak isteyen her organizasyon bu standardı uygulayabilir. Enerji, kimya, gıda, tekstil, metal ve lojistik gibi çevresel etkisi yüksek sektörlerde özellikle değerlidir.",
    ],
    bolum2Baslik: "ISO 14001 Çevre Yönetim Sisteminin Temel Unsurları",
    bolum2Etiket: "Unsurlar",
    bolum2Giris:
      "ISO 14001:2015 standardı, kuruluşların çevre yönetim sistemini etkin bir şekilde kurması için birbiriyle ilişkili temel unsurlar üzerine inşa edilmiştir. Bu unsurlar, çevresel performansın sistematik biçimde planlanması, uygulanması ve iyileştirilmesini sağlar.",
    bolum2Kartlar: [
      {
        baslik: "Çevre Politikası",
        metin:
          "Üst yönetim tarafından belirlenen çevre politikası, kuruluşun çevresel taahhütlerinin temelini oluşturur. Kirliliğin önlenmesi, yasal uyum ve sürekli iyileştirme taahhütlerini içerir ve tüm çalışanlara duyurulur.",
      },
      {
        baslik: "Çevre Boyutları ve Etkileri",
        metin:
          "Kuruluş, faaliyetlerinin, ürünlerinin ve hizmetlerinin çevre ile etkileşen yönlerini (çevre boyutları) belirler. Su, enerji, atık, emisyon ve doğal kaynak kullanımı gibi boyutların çevresel etkileri değerlendirilerek önceliklendirilir.",
      },
      {
        baslik: "Uygunluk Yükümlülükleri",
        metin:
          "Çevre ile ilgili yasal mevzuat ve kuruluşun gönüllü olarak uyduğu diğer şartlar tanımlanır. Yükümlülüklere uyum düzenli olarak değerlendirilir ve güncel tutulur.",
      },
      {
        baslik: "Yaşam Döngüsü Bakış Açısı",
        metin:
          "ISO 14001:2015, hammadde temininden ürünün kullanım ömrü sonuna kadar tüm aşamaların çevresel etkisinin dikkate alınmasını ister. Bu yaklaşım, etkilerin kaynağında yönetilmesini sağlar.",
      },
      {
        baslik: "Operasyonel Kontrol",
        metin:
          "Önemli çevre boyutlarının kontrol altında tutulması için operasyonel prosedürler ve kriterler belirlenir. Atık yönetimi, kimyasal depolama ve emisyon kontrolü gibi süreçler tanımlı şekilde yürütülür.",
      },
      {
        baslik: "Acil Duruma Hazırlık ve Müdahale",
        metin:
          "Olası çevresel acil durumlar (kimyasal sızıntı, yangın, sel vb.) önceden belirlenir; müdahale planları oluşturulur ve tatbikatlarla denenir.",
      },
      {
        baslik: "İzleme, Ölçme ve Sürekli İyileştirme",
        metin:
          "Çevre performansı göstergeler aracılığıyla izlenir ve ölçülür. İç tetkikler ve yönetim gözden geçirmeleri ile sistem sürekli iyileştirilir. PUKÖ (Planla-Uygula-Kontrol Et-Önlem Al) döngüsü bu yaklaşımın merkezindedir.",
      },
    ],
    faydalarGiris:
      "ISO 14001 belgesi, kuruluşlara hem çevresel hem de operasyonel ve ticari açıdan çok yönlü katkılar sağlar. Standardı benimseyen ve sertifikasyon sürecini tamamlayan bir kuruluş, çevresel performansını iyileştirirken maliyet ve itibar avantajları da elde eder. Aşağıda bu faydaları iki ana başlıkta inceliyoruz.",
    icFaydalar: [
      "Kaynak verimliliği: Su, enerji ve hammadde kullanımının optimize edilmesi, hem çevresel etkiyi hem de işletme maliyetlerini düşürür.",
      "Atık ve maliyet azaltımı: Atıkların kaynağında azaltılması ve geri kazanımın artması, bertaraf maliyetlerini düşürür.",
      "Yasal uyumun güvence altına alınması: Çevre mevzuatına sistematik uyum, ceza ve yaptırım riskini azaltır.",
      "Çevresel risklerin yönetimi: Olası kirlilik ve acil durumlar önceden belirlenerek önlem alınır.",
      "Süreçlerde verimlilik: Tanımlı operasyonel kontroller, çevresel performansı öngörülebilir kılar.",
      "Çalışan farkındalığı: Çevre bilincinin kurum kültürüne yerleşmesi, sahiplenmeyi artırır.",
      "Kurumsal sürdürülebilirlik: Çevre yönetimi, uzun vadeli sürdürülebilirlik hedeflerine somut katkı sağlar.",
    ],
    pazarFaydalar: [
      "Marka itibarı: Çevreye duyarlı bir kuruluş imajı, müşteri ve toplum nezdinde güven oluşturur.",
      "İhale ve tedarik avantajı: Kamu ihalelerinde ve kurumsal tedarik zincirlerinde ISO 14001 sıklıkla aranan bir şarttır.",
      "Uluslararası pazar erişimi: Akredite bir kuruluştan alınan belge, ihracat ve yabancı iş ortaklıklarında kabul gören bir referanstır.",
      "Yatırımcı ve paydaş güveni: Çevresel, sosyal ve yönetişim (ESG) kriterlerine uyum, paydaş ilişkilerini güçlendirir.",
      "Rekabet üstünlüğü: Çevresel performans, benzer ürün ve hizmetler arasında ayırt edici bir unsurdur.",
      "Tedarik zinciri uyumu: Çevre yönetim sistemine sahip kuruluşlar, tedarik zincirinin güvenilir halkaları olarak değerlendirilir.",
    ],
    faydalarKapanis:
      "ISO 14001 belgesinin sağladığı faydaların düzeyi, kuruluşun standardı ne ölçüde benimsediği ve çevre yönetimini günlük operasyonlarına ne kadar entegre ettiği ile doğrudan ilişkilidir. Belgenin alınması başlangıç noktasıdır; asıl değer, sistemin yaşatılması ve sürekli iyileştirilmesi ile ortaya çıkar.",
  },

  // ===================================================================
  "iso-45001": {
    slug: "iso-45001",
    stdAd: "ISO 45001",
    stdKod: "ISO 45001:2018",
    sistemAdiBuyuk: "İş Sağlığı ve Güvenliği Yönetim Sistemi",
    sistem: {
      i: "iş sağlığı ve güvenliği yönetim sistemi",
      ni: "iş sağlığı ve güvenliği yönetim sistemini",
      nin: "iş sağlığı ve güvenliği yönetim sisteminin",
      cumleBasi: "İş sağlığı ve güvenliği yönetim sisteminin",
    },
    politika: "İş sağlığı ve güvenliği politikası",
    metaTitle: "ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi Belgelendirmesi | DVN Cert",
    metaDescription:
      "TÜRKAK akreditasyon kapsamında ISO 45001:2018 iş sağlığı ve güvenliği yönetim sistemi belgelendirmesi. Başvuru süreci, faydalar ve adım adım rehber.",
    keywords: [
      "ISO 45001 belgesi",
      "ISO 45001:2018",
      "ISO 45001 nasıl alınır",
      "ISO 45001 belgesi nedir",
      "iş sağlığı ve güvenliği yönetim sistemi belgesi",
      "İSG yönetim sistemi",
      "TÜRKAK ISO 45001",
      "ISO 45001 İstanbul",
      "ISO 45001 belgelendirme",
      "ISO 45001 faydaları",
    ],
    ogTitle: "ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi Belgelendirmesi",
    ogDescription:
      "TÜRKAK akreditasyon kapsamında ISO 45001:2018 belgelendirmesi. Adım adım rehber, faydalar ve sertifika geçerlilik bilgileri.",
    nedirParagraflar: [
      "ISO 45001, çalışanların sağlığını ve güvenliğini korumayı, iş kazalarını ve meslek hastalıklarını önlemeyi amaçlayan uluslararası iş sağlığı ve güvenliği (İSG) yönetim sistemi standardıdır. Uluslararası Standartlar Örgütü (ISO) tarafından yayımlanan standart, güvenli ve sağlıklı bir çalışma ortamının sistematik biçimde oluşturulmasını sağlar.",
      "ISO 45001 belgesi, bir kuruluşun işyeri tehlikelerini belirlediğini, İSG risklerini değerlendirip kontrol altına aldığını ve yasal yükümlülüklerine uyduğunu gösteren resmi bir dokümandır. Bu belge, akredite belgelendirme kuruluşları tarafından yapılan denetimler sonucunda düzenlenir.",
      "ISO 45001, 2018 yılında yayımlanarak önceki OHSAS 18001 standardının yerini almıştır. Yüksek seviye yapısı sayesinde ISO 9001 ve ISO 14001 ile kolayca entegre edilebilir. Çalışan katılımı, liderliğin sorumluluğu ve risk temelli düşünme standardın merkezinde yer alır.",
      "ISO 45001, sektör ve ölçek fark etmeksizin her kuruluşa uygulanabilir. İnşaat, üretim, enerji, madencilik, lojistik, sağlık ve hizmet gibi iş sağlığı ve güvenliği riskinin bulunduğu tüm alanlarda değerlidir. Çalışan sayısı fark etmeksizin güvenli bir çalışma ortamı hedefleyen her organizasyon bu standardı uygulayabilir.",
    ],
    bolum2Baslik: "ISO 45001 İSG Yönetim Sisteminin Temel Unsurları",
    bolum2Etiket: "Unsurlar",
    bolum2Giris:
      "ISO 45001:2018 standardı, kuruluşların iş sağlığı ve güvenliği yönetim sistemini etkin bir şekilde kurması için birbiriyle ilişkili temel unsurlar üzerine inşa edilmiştir. Bu unsurlar, çalışan sağlığının ve güvenliğinin sistematik biçimde planlanması, uygulanması ve iyileştirilmesini sağlar.",
    bolum2Kartlar: [
      {
        baslik: "Liderlik ve Çalışan Katılımı",
        metin:
          "ISO 45001, üst yönetimin İSG performansından doğrudan sorumlu olmasını ve her seviyeden çalışanın sürece aktif katılımını esas alır. Çalışan görüşü, güvenli iş yerinin temel girdisidir.",
      },
      {
        baslik: "Tehlike Tanımlama",
        metin:
          "Çalışma ortamındaki fiziksel, kimyasal, biyolojik, ergonomik ve psikososyal tehlikeler sistematik olarak belirlenir. Tehlikelerin kaynağında ortadan kaldırılması önceliklidir.",
      },
      {
        baslik: "Risk Değerlendirme ve Kontrol",
        metin:
          "Belirlenen tehlikelerin yol açabileceği riskler değerlendirilir ve kontrol hiyerarşisine göre önlemler alınır. Amaç, kazaları ve meslek hastalıklarını oluşmadan önlemektir.",
      },
      {
        baslik: "Yasal ve Diğer Yükümlülükler",
        metin:
          "İş sağlığı ve güvenliği ile ilgili yasal mevzuat ve kuruluşun uyduğu diğer şartlar tanımlanır; uyum düzenli olarak değerlendirilir.",
      },
      {
        baslik: "Operasyonel Kontrol",
        metin:
          "Riskli faaliyetler için güvenli çalışma prosedürleri, izin sistemleri ve kişisel koruyucu donanım kullanımı gibi kontroller tanımlı şekilde uygulanır.",
      },
      {
        baslik: "Acil Duruma Hazırlık ve Müdahale",
        metin:
          "Olası acil durumlar (yangın, kimyasal maruziyet, iş kazası vb.) önceden belirlenir; müdahale planları oluşturulur ve tatbikatlarla denenir.",
      },
      {
        baslik: "Performans İzleme ve Sürekli İyileştirme",
        metin:
          "İSG performansı; kaza, ramak kala ve uygunsuzluk verileriyle izlenir. İç tetkikler ve yönetim gözden geçirmeleri ile sistem sürekli iyileştirilir. PUKÖ döngüsü bu yaklaşımın merkezindedir.",
      },
    ],
    faydalarGiris:
      "ISO 45001 belgesi, kuruluşlara hem çalışan güvenliği hem de operasyonel ve ticari açıdan çok yönlü katkılar sağlar. Standardı benimseyen bir kuruluş, iş kazalarını azaltırken çalışan memnuniyeti ve kurumsal itibar açısından da belirgin kazanımlar elde eder. Aşağıda bu faydaları iki ana başlıkta inceliyoruz.",
    icFaydalar: [
      "İş kazalarında azalma: Risklerin önceden belirlenmesi ve kontrol altına alınması, kaza ve meslek hastalığı oranlarını düşürür.",
      "İş gücü kayıplarının azalması: Daha az kaza ve hastalık, devamsızlık ve üretim kaybının azalması anlamına gelir.",
      "Yasal uyumun güvence altına alınması: İSG mevzuatına sistematik uyum, idari ceza ve yaptırım riskini azaltır.",
      "Çalışan motivasyonu ve aidiyeti: Güvenli bir çalışma ortamı, çalışan memnuniyetini ve bağlılığını artırır.",
      "Maliyet kontrolü: Kaza kaynaklı tazminat, sigorta ve üretim duruşu maliyetlerinin azalması sağlanır.",
      "Güvenlik kültürü: Güvenli çalışma alışkanlığının kurum kültürüne yerleşmesi kalıcı iyileşme getirir.",
      "Kurumsal hazırlık: Acil durumlara karşı hazırlıklı olmak, olası kayıpları en aza indirir.",
    ],
    pazarFaydalar: [
      "Kurumsal itibar: Çalışan sağlığına önem veren bir kuruluş imajı, paydaş güvenini güçlendirir.",
      "İhale ve tedarik avantajı: Kamu ihalelerinde ve kurumsal tedarik süreçlerinde ISO 45001 sıklıkla aranan bir şarttır.",
      "Uluslararası kabul: Akredite bir kuruluştan alınan belge, yabancı iş ortaklıklarında ve ihracatta kabul gören bir referanstır.",
      "Müşteri ve iş ortağı güveni: Güvenli operasyon, sözleşme ilişkilerinde güvenilirlik sağlar.",
      "Rekabet üstünlüğü: İSG performansı, sektörde ayırt edici bir unsur haline gelir.",
      "Sigorta avantajları: Düşük kaza oranı, bazı durumlarda daha uygun sigorta koşullarına imkan tanır.",
    ],
    faydalarKapanis:
      "ISO 45001 belgesinin sağladığı faydaların düzeyi, kuruluşun standardı ne ölçüde benimsediği ve iş sağlığı ve güvenliği yönetimini günlük operasyonlarına ne kadar entegre ettiği ile doğrudan ilişkilidir. Belgenin alınması başlangıç noktasıdır; asıl değer, sistemin yaşatılması ve sürekli iyileştirilmesi ile ortaya çıkar.",
  },

  // ===================================================================
  "iso-50001": {
    slug: "iso-50001",
    stdAd: "ISO 50001",
    stdKod: "ISO 50001:2018",
    sistemAdiBuyuk: "Enerji Yönetim Sistemi",
    sistem: {
      i: "enerji yönetim sistemi",
      ni: "enerji yönetim sistemini",
      nin: "enerji yönetim sisteminin",
      cumleBasi: "Enerji yönetim sisteminin",
    },
    politika: "Enerji politikası",
    metaTitle: "ISO 50001:2018 Enerji Yönetim Sistemi Belgelendirmesi | DVN Cert",
    metaDescription:
      "TÜRKAK akreditasyon kapsamında ISO 50001:2018 enerji yönetim sistemi belgelendirmesi. Başvuru süreci, faydalar, geçerlilik süresi ve adım adım rehber.",
    keywords: [
      "ISO 50001 belgesi",
      "ISO 50001:2018",
      "ISO 50001 nasıl alınır",
      "ISO 50001 belgesi nedir",
      "enerji yönetim sistemi belgesi",
      "TÜRKAK ISO 50001",
      "ISO 50001 İstanbul",
      "ISO 50001 belgelendirme",
      "ISO 50001 belgesi geçerlilik süresi",
      "ISO 50001 faydaları",
    ],
    ogTitle: "ISO 50001:2018 Enerji Yönetim Sistemi Belgelendirmesi",
    ogDescription:
      "TÜRKAK akreditasyon kapsamında ISO 50001:2018 belgelendirmesi. Adım adım rehber, faydalar ve sertifika geçerlilik bilgileri.",
    nedirParagraflar: [
      "ISO 50001, kuruluşların enerji performansını sistematik bir şekilde yönetmesini ve sürekli iyileştirmesini sağlayan uluslararası enerji yönetim sistemi standardıdır. Uluslararası Standartlar Örgütü (ISO) tarafından yayımlanan standart, enerji verimliliğini artırmayı, enerji tüketimini ve maliyetlerini azaltmayı amaçlar.",
      "ISO 50001 belgesi, bir kuruluşun enerji kullanımını izleyip analiz ettiğini, enerji performansı göstergeleri belirlediğini ve enerji verimliliğini artırmaya yönelik bir yönetim sistemi kurduğunu gösteren resmi bir dokümandır. Bu belge, akredite belgelendirme kuruluşları tarafından yapılan denetimler sonucunda düzenlenir.",
      "ISO 50001:2018 versiyonu, standardın günümüzde geçerli olan son sürümüdür. Yüksek seviye yapısı sayesinde ISO 9001 ve ISO 14001 gibi standartlarla kolayca entegre edilebilir. Standardın merkezinde, enerji performansının ölçülebilir verilerle sürekli iyileştirilmesi yer alır.",
      "ISO 50001, sektör ve ölçek fark etmeksizin enerji tüketen her kuruluşa uygulanabilir. Üretim tesisleri, enerji yoğun sanayi, oteller, hastaneler, alışveriş merkezleri ve kamu binaları başta olmak üzere enerji maliyetini düşürmek isteyen her organizasyon bu standarttan yararlanabilir.",
    ],
    bolum2Baslik: "ISO 50001 Enerji Yönetim Sisteminin Temel Unsurları",
    bolum2Etiket: "Unsurlar",
    bolum2Giris:
      "ISO 50001:2018 standardı, kuruluşların enerji yönetim sistemini etkin bir şekilde kurması için birbiriyle ilişkili temel unsurlar üzerine inşa edilmiştir. Bu unsurlar, enerji performansının ölçülebilir verilerle planlanması, uygulanması ve sürekli iyileştirilmesini sağlar.",
    bolum2Kartlar: [
      {
        baslik: "Enerji Politikası",
        metin:
          "Üst yönetim tarafından belirlenen enerji politikası, enerji performansının iyileştirilmesi taahhüdünü ortaya koyar. Bilgi ve kaynak sağlama ile yasal uyum taahhütlerini içerir.",
      },
      {
        baslik: "Enerji Gözden Geçirme",
        metin:
          "Kuruluşun enerji kullanımı ve tüketimi analiz edilir; önemli enerji kullanım alanları ve iyileştirme fırsatları belirlenir. Bu analiz, sistemin temelini oluşturur.",
      },
      {
        baslik: "Enerji Performans Göstergeleri (EnPI)",
        metin:
          "Enerji performansını izlemek için ölçülebilir göstergeler tanımlanır. Bu göstergeler, iyileştirmelerin nesnel olarak değerlendirilmesini sağlar.",
      },
      {
        baslik: "Enerji Baz Çizgisi",
        metin:
          "Belirli bir referans dönemine ait enerji performansı, baz çizgisi olarak alınır. Gelecekteki performans bu referansla karşılaştırılarak iyileşme ölçülür.",
      },
      {
        baslik: "Hedefler ve Eylem Planları",
        metin:
          "Enerji performansını iyileştirmek için ölçülebilir hedefler ve bu hedeflere ulaştıracak eylem planları oluşturulur.",
      },
      {
        baslik: "Operasyonel Kontrol ve Tasarım",
        metin:
          "Önemli enerji kullanım alanları kontrol altında tutulur; yeni yatırım ve tasarım kararlarında enerji verimliliği dikkate alınır.",
      },
      {
        baslik: "İzleme, Ölçme ve Sürekli İyileştirme",
        metin:
          "Enerji performansı düzenli olarak izlenir ve ölçülür. İç tetkikler ve yönetim gözden geçirmeleri ile sistem sürekli iyileştirilir. PUKÖ döngüsü bu yaklaşımın merkezindedir.",
      },
    ],
    faydalarGiris:
      "ISO 50001 belgesi, kuruluşlara hem enerji ve maliyet hem de çevresel ve ticari açıdan çok yönlü katkılar sağlar. Standardı benimseyen bir kuruluş, enerji tüketimini azaltırken karbon ayak izini ve işletme maliyetlerini de düşürür. Aşağıda bu faydaları iki ana başlıkta inceliyoruz.",
    icFaydalar: [
      "Enerji maliyetlerinde azalma: Sistematik enerji yönetimi, tüketimi ve buna bağlı maliyetleri düşürür.",
      "Enerji verimliliğinde artış: Önemli enerji kullanım alanlarının yönetimi, verimliliği kalıcı olarak artırır.",
      "Veriye dayalı yönetim: Enerji performans göstergeleri, kararların ölçülebilir verilerle alınmasını sağlar.",
      "Karbon ayak izinin azalması: Daha düşük enerji tüketimi, sera gazı salımının azalması anlamına gelir.",
      "Süreçlerde verimlilik: Operasyonel kontroller, enerji performansını öngörülebilir kılar.",
      "Bakım ve ekipman ömrü: Verimli çalışan ekipmanlar, bakım maliyetlerini düşürür ve ömrü uzatır.",
      "Yasal ve teşvik uyumu: Enerji ile ilgili yasal yükümlülüklere uyum ve teşviklerden yararlanma kolaylaşır.",
    ],
    pazarFaydalar: [
      "Kurumsal sürdürülebilirlik imajı: Enerji verimliliği, çevreye duyarlı kuruluş algısını güçlendirir.",
      "İhale ve tedarik avantajı: Kamu ihalelerinde ve kurumsal tedarik süreçlerinde enerji yönetimi giderek daha fazla aranır.",
      "Uluslararası kabul: Akredite bir kuruluştan alınan belge, ihracat ve yabancı iş ortaklıklarında kabul gören bir referanstır.",
      "ESG ve yatırımcı güveni: Enerji performansı, çevresel ve yönetişim kriterleri açısından paydaş güvenini artırır.",
      "Rekabet üstünlüğü: Düşük enerji maliyeti, fiyat rekabetinde avantaj sağlar.",
      "Karbon düzenlemelerine hazırlık: Artan karbon düzenlemeleri karşısında kuruluşu hazırlıklı kılar.",
    ],
    faydalarKapanis:
      "ISO 50001 belgesinin sağladığı faydaların düzeyi, kuruluşun standardı ne ölçüde benimsediği ve enerji yönetimini günlük operasyonlarına ne kadar entegre ettiği ile doğrudan ilişkilidir. Belgenin alınması başlangıç noktasıdır; asıl değer, sistemin yaşatılması ve sürekli iyileştirilmesi ile ortaya çıkar.",
  },
};

export function isoMeta(slug: string): Metadata {
  const v = isoIcerikler[slug];
  const url = `https://dvncert.com/hizmetler/${slug}`;
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    keywords: v.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: v.ogTitle,
      description: v.ogDescription,
      url,
      type: "article",
    },
  };
}
