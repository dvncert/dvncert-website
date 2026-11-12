/**
 * DVN Cert - Hizmetler (merkezi veri)
 *
 * Tüm hizmet detay sayfaları (/hizmetler/[slug]) ve /hizmetler hub sayfası
 * bu listeden beslenir. İçerik değişirse SADECE burası değişir.
 */

export type SurecAdimi = { baslik: string; aciklama: string };

export type Hizmet = {
  slug: string;
  /** Standart kodu, ör. "ISO 9001:2015" (varsa) */
  kod?: string;
  /** Gruplama için: "Sistem Belgelendirme" | "Denetim" */
  kategori: string;
  baslik: string;
  /** Kart ve meta açıklaması için kısa metin */
  kisaAciklama: string;
  /** HizmetIkon bileşeni için ikon anahtarı (kapak görseli yer tutucusunda kullanılır) */
  ikon: string;
  /** Kapak görseli yolu, ör. "/gorseller/hizmetler/iso-50001.webp". Boşsa yer tutucu gösterilir. */
  gorsel?: string;
  /** Giriş gövdesi; paragraflar boş satır (\n\n) ile ayrılır */
  giris: string;
  faydalar: string[];
  surec?: SurecAdimi[];
  /** Sadece "sistem-belgelendirme" için: alt standartların slug'ları */
  altStandartlar?: string[];
  /** SEO için özel <title> (verilmezse baslik kullanılır); layout şablonu " | DVN Cert" ekler (bkz. lib/seo-baslik.ts). */
  seoTitle?: string;
  /** SEO için özel meta açıklaması (verilmezse kisaAciklama kullanılır). */
  seoAciklama?: string;
  /** Eş anlamlı adlar — Service şemasında alternateName olarak verilir. */
  alternatifAdlar?: string[];
  /** Sayfada gösterilen ve FAQPage yapısal verisi üretilen sıkça sorulan sorular. */
  sss?: { soru: string; cevap: string }[];
  /** Hizmetin yürütüldüğü online sistem tanıtımı (ör. DBYS); faydalardan sonra ayrı bölüm olarak gösterilir. */
  platform?: {
    etiket: string;
    baslik: string;
    aciklama: string;
    ozellikler: { baslik: string; aciklama: string }[];
  };
  /** İçeriğin son gözden geçirildiği tarih (YYYY-MM-DD) — sayfada "Son güncelleme",
   *  WebPage şemasında dateModified ve sitemap lastmod olarak kullanılır.
   *  İçerik anlamlı biçimde değiştiğinde güncelleyin. */
  guncellenme?: string;
  /** Hizmetin hedef kitlesi — Service şemasında audience olarak verilir. */
  hedefKitle?: string[];
  /** Girişten sonra gösterilen karşılaştırma tablosu (yapay zekâ yanıtlarında alıntılanmaya uygun yapı).
   *  sutunlar[0] satır başlığı sütunudur; her satır sutunlar ile aynı uzunlukta olmalı. */
  karsilastirma?: {
    baslik: string;
    aciklama?: string;
    sutunlar: string[];
    satirlar: string[][];
  };
};

/** Hizmetlerde guncellenme verilmemişse kullanılan taban tarih. */
export const HIZMET_TABAN_GUNCELLEME = "2026-06-15";

// Tüm ISO sistem belgelendirmeleri için ortak süreç adımları
const isoSurec: SurecAdimi[] = [
  {
    baslik: "Başvuru ve Ön Değerlendirme",
    aciklama: "Başvurunuz alınır, belgelendirme kapsamı ve gereksinimler netleştirilir; gerektiğinde bir ön değerlendirme yapılır.",
  },
  {
    baslik: "Belgelendirme Denetimi",
    aciklama: "Aşama 1 (doküman incelemesi) ve Aşama 2 (yerinde denetim) ile yönetim sisteminiz standardın gerekliliklerine göre değerlendirilir.",
  },
  {
    baslik: "Belge Düzenleme",
    aciklama: "Olumlu denetim sonucunun ardından belgelendirme kararı alınır ve uluslararası geçerli sertifikanız düzenlenir.",
  },
  {
    baslik: "Gözetim Denetimleri",
    aciklama: "Belge geçerliliği süresince (genellikle 3 yıl) yıllık gözetim denetimleriyle sistemin sürekliliği teyit edilir.",
  },
];

export const hizmetler: Hizmet[] = [
  {
    slug: "sistem-belgelendirme",
    kategori: "Sistem Belgelendirme",
    baslik: "Sistem Belgelendirme",
    kisaAciklama:
      "ISO 9001, 14001, 45001 ve 50001 yönetim sistemleri belgelendirmesini şeffaf ve etkin bir süreçle yönetiyoruz.",
    ikon: "sistem",
    gorsel: "/gorseller/hizmetler/sistem-belgelendirme.webp",
    giris:
      "DVN Cert olarak tarafsız ve profesyonel belgelendirme çözümleri sunuyoruz. Deneyimli denetçi kadromuzla yönetim sistemi belgelendirme süreçlerinizi şeffaf ve etkin bir şekilde yönetiyoruz.\n\n" +
      "Kapsamımızdaki dört temel yönetim sistemi standardında, kuruluşunuzun uluslararası standartlara uyumunu bağımsızlık ve gizlilik ilkeleriyle değerlendiriyoruz.",
    faydalar: [
      "Tek noktadan dört yönetim sistemi belgelendirmesi",
      "Uluslararası standartlara göre düzenlenen sertifikalar",
      "Tarafsız, bağımsız ve gizlilik esaslı süreç",
      "Deneyimli denetçi kadrosu",
      "Şeffaf ve izlenebilir denetim adımları",
    ],
    surec: isoSurec,
    altStandartlar: ["iso-9001", "iso-14001", "iso-45001", "iso-50001"],
    sss: [
      {
        soru: "Sistem belgelendirmesi hangi standartları kapsıyor?",
        cevap:
          "DVN Cert, dört yönetim sistemi standardında belgelendirme yapar: ISO 9001 (Kalite), ISO 14001 (Çevre), ISO 45001 (İş Sağlığı ve Güvenliği) ve ISO 50001 (Enerji). Bu standartların her biri için ayrı ayrı veya birlikte başvurabilirsiniz.",
      },
      {
        soru: "Birden fazla standardı tek denetimde birlikte belgelendirebilir miyiz?",
        cevap:
          "Evet. Standartların ortak üst yapısı (Annex SL) sayesinde birden fazla yönetim sistemi, tek bir entegre denetim programıyla birlikte belgelendirilebilir. Bu yaklaşım denetim süresini ve maliyetini azaltır, doküman ve süreç yönetimini kolaylaştırır.",
      },
      {
        soru: "Belgelendirme süreci hangi aşamalardan oluşur?",
        cevap:
          "Süreç; başvuru ve sözleşme, Aşama 1 (doküman ve hazırlık incelemesi), Aşama 2 (yerinde belgelendirme denetimi) ve tetkik ekibinden bağımsız bir belgelendirme kararı adımlarından oluşur. Olumlu karar sonrası uluslararası geçerli sertifikanız düzenlenir.",
      },
      {
        soru: "Sistem belgesi kaç yıl geçerlidir?",
        cevap:
          "Sertifikanın geçerlilik süresi 3 yıldır. Bu süre boyunca her yıl bir gözetim denetimi yapılır; üçüncü yılın sonunda yeniden belgelendirme denetimiyle belge yenilenir.",
      },
    ],
  },
  {
    slug: "iso-9001",
    kod: "ISO 9001:2015",
    kategori: "Sistem Belgelendirme",
    baslik: "ISO 9001 Kalite Yönetim Sistemi",
    kisaAciklama:
      "Müşteri memnuniyeti ve süreç verimliliğini esas alan, dünyada en yaygın kalite yönetim sistemi standardı.",
    ikon: "kalite",
    giris:
      "ISO 9001; işletmelerin müşteri memnuniyetini artırmak, süreçlerini iyileştirmek ve uluslararası kabul görmüş kalite standartlarına uyum sağlamak amacıyla uyguladığı en yaygın kalite yönetim sistemi standardıdır.\n\n" +
      "Müşteri odaklılık, liderlik, çalışan katılımı, süreç yaklaşımı, sürekli iyileştirme ve kanıta dayalı karar verme ilkeleri üzerine kuruludur. Belgelendirme sürecinde kuruluşun kalite yönetim sistemi; tarafsızlık, bağımsızlık ve gizlilik ilkeleriyle standardın gerekliliklerine göre değerlendirilir.",
    faydalar: [
      "Müşteri memnuniyetini artırma ve şikayetleri azaltma",
      "Süreçleri standartlaştırarak verimlilik sağlama",
      "Sürekli iyileştirme kültürünü geliştirme",
      "Ulusal ve uluslararası pazarda güvenilirlik kazanma",
      "Riskleri proaktif şekilde yönetme",
    ],
    surec: isoSurec,
  },
  {
    slug: "iso-14001",
    kod: "ISO 14001:2015",
    kategori: "Sistem Belgelendirme",
    baslik: "ISO 14001 Çevre Yönetim Sistemi",
    kisaAciklama:
      "Çevresel etkileri sistematik biçimde yöneten ve yasal uyumu güvence altına alan çevre yönetim sistemi standardı.",
    ikon: "cevre",
    giris:
      "ISO 14001; kuruluşların çevresel etkilerini sistematik şekilde yönetmesini, yasal gerekliliklere uyum sağlamasını ve çevre performansını sürekli iyileştirmesini hedefleyen uluslararası bir standarttır.\n\n" +
      "Temel amaç; doğal kaynak kullanımını optimize etmek, atıkları azaltmak ve kirliliği önlemektir. Bu sayede kuruluşlar çevresel sorumluluklarını yerine getirirken operasyonel maliyetlerini de düşürebilir.",
    faydalar: [
      "Çevresel riskleri azaltma ve yönetme",
      "Yasal mevzuata uyum sağlama",
      "Kaynak verimliliği ile maliyetleri düşürme",
      "Müşteri ve paydaşlar nezdinde güvenilirlik kazanma",
      "Sürdürülebilir kalkınma hedeflerine katkı",
    ],
    surec: isoSurec,
  },
  {
    slug: "iso-45001",
    kod: "ISO 45001:2018",
    kategori: "Sistem Belgelendirme",
    baslik: "ISO 45001 İş Sağlığı ve Güvenliği Yönetim Sistemi",
    kisaAciklama:
      "Çalışan sağlığı ve güvenliğini koruyan, iş kazaları ve meslek hastalıklarını önlemeye yönelik İSG yönetim sistemi standardı.",
    ikon: "isg",
    giris:
      "ISO 45001; kuruluşların çalışan sağlığı ve güvenliğini korumak, iş kazalarını ve meslek hastalıklarını önlemek, güvenli bir çalışma ortamı oluşturmak amacıyla uyguladığı uluslararası yönetim sistemi standardıdır.\n\n" +
      "Risk temelli düşünme, tehlikelerin ortadan kaldırılması, yasal uyum ve sürekli iyileştirme prensipleri üzerine kuruludur. Çalışan katılımını esas alarak güvenlik kültürünü güçlendirir.",
    faydalar: [
      "İş kazalarını ve meslek hastalıklarını azaltma",
      "Çalışanların güvenliğini ve motivasyonunu artırma",
      "Yasal mevzuata uyumu sağlama",
      "Kurumsal itibarı ve paydaş güvenini güçlendirme",
      "İş gücü kayıplarını ve buna bağlı maliyetleri azaltma",
    ],
    surec: isoSurec,
  },
  {
    slug: "iso-50001",
    kod: "ISO 50001:2018",
    kategori: "Sistem Belgelendirme",
    baslik: "ISO 50001 Enerji Yönetim Sistemi",
    kisaAciklama:
      "Enerji verimliliğini artıran, tüketimi ve karbon salımını azaltan enerji yönetim sistemi standardı.",
    ikon: "enerji",
    giris:
      "ISO 50001; işletmelere enerji verimliliği, enerji tasarrufu ve karbon ayak izinin azaltılması konularında yol gösteren uluslararası bir yönetim sistemi standardıdır.\n\n" +
      "Sistematik bir enerji yönetimi yaklaşımıyla enerji performansının sürekli iyileştirilmesini hedefler; bu da hem maliyet kontrolü hem de sürdürülebilirlik açısından önemli kazanımlar sağlar.",
    faydalar: [
      "Enerji tüketimini ve maliyetleri azaltma",
      "Enerji verimliliğini artırma",
      "Karbon salımını ve çevresel etkileri azaltma",
      "Yasal ve diğer enerji ile ilgili gerekliliklere uyum sağlama",
      "Kurumsal sürdürülebilirlik hedeflerine katkıda bulunma",
    ],
    surec: isoSurec,
  },
  {
    slug: "tedarikci-denetimi",
    kategori: "Denetim",
    baslik: "Tedarikçi Denetimi",
    seoTitle: "Tedarikçi Denetimi ve İkinci Taraf Denetim",
    alternatifAdlar: ["İkinci taraf denetim", "2. taraf denetim", "Tedarikçi denetimi hizmeti", "Fason üretici denetimi", "Supplier audit", "Second-party audit"],
    karsilastirma: {
      baslik: "Birinci, ikinci ve üçüncü taraf denetim karşılaştırması",
      aciklama: "Tedarikçi denetimi ikinci taraf denetimdir: denetimi, tedarikçiden ürün veya hizmet alan müşteri kuruluş ya da onun adına bağımsız bir denetim kuruluşu yapar.",
      sutunlar: ["Kriter", "Birinci taraf (iç denetim)", "İkinci taraf (tedarikçi denetimi)", "Üçüncü taraf (belgelendirme denetimi)"],
      satirlar: [
        ["Denetimi kim yapar?", "Kuruluşun kendi iç denetçileri", "Müşteri kuruluş veya onun adına bağımsız denetim kuruluşu", "Bağımsız belgelendirme kuruluşu"],
        ["Neye göre denetlenir?", "Kuruluşun kendi yönetim sistemi ve prosedürleri", "Müşterinin kriterleri, sözleşme şartları ve ilgili standartlar (ISO 9001, IATF 16949, VDA 6.3 vb.)", "İlgili ISO standardının gereklilikleri"],
        ["Sonucunda ne çıkar?", "İç denetim raporu ve düzeltici faaliyetler", "Puanlanmış denetim raporu; tedarikçi onayı, gelişim planı veya ret kararına girdi", "Belgelendirme kararı ve sertifika"],
        ["Kapsam", "Kuruluşun tüm süreçleri", "Satın alınan ürün veya hizmeti etkileyen süreçler", "Belgelendirme kapsamındaki yönetim sistemi"],
        ["Sıklık", "İç denetim programına göre", "Tedarikçinin risk düzeyine göre müşterinin belirlediği aralıkta", "Yıllık gözetim, üç yılda bir yeniden belgelendirme"],
      ],
    },
    guncellenme: "2026-11-12",
    hedefKitle: ["Üretici firmalar", "Satın alma ve tedarik zinciri yöneticileri", "Kalite yöneticileri", "Perakende ve marka sahipleri"],
    seoAciklama:
      "Bağımsız tedarikçi denetimi (ikinci taraf denetim): tedarikçi, fason üretici ve alt yüklenicilerinizi yerinde denetliyor, ayrıntılı rapor sunuyoruz.",
    kisaAciklama:
      "Tedarikçi, fason üretici ve alt yüklenicilerinizi kalite, çevre, İSG ve sözleşme şartlarına uygunluk açısından yerinde ve bağımsızca denetliyoruz.",
    ikon: "denetim",
    gorsel: "/gorseller/hizmetler/tedarikci-denetimi.webp",
    giris:
      "Tedarikçi denetimi (ikinci taraf denetim); bir kuruluşun mal veya hizmet satın aldığı tedarikçilerini, fason üreticilerini, alt yüklenicilerini ve iş ortaklarını belirlenen standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından yerinde değerlendirmesidir. Denetim müşteri kuruluş adına yapılır ve sonucunda sertifika değil, puanlanmış bir denetim raporu düzenlenir; tedarik zincirindeki riskleri yönetmenin en etkili yollarından biridir. İç denetim ve belgelendirme denetimiyle karşılaştırması için [birinci, ikinci ve üçüncü taraf denetim farkı](/blog/birinci-ikinci-ucuncu-taraf-denetim-farki) yazımıza bakabilirsiniz.\n\n" +
      "Tedarikçi beyanları, anketler ve belgeler tek başına yeterli güvence sağlamaz. Bağımsız bir tedarikçi denetimi; üretim koşullarını, kalite kontrol uygulamalarını, kayıtları ve yasal uyumu sahada kanıta dayalı olarak doğrular. Böylece tedarikçi seçimi, onayı ve performans değerlendirmesi kararlarınızı nesnel verilere dayandırırsınız. Tedarikçi denetiminin iç denetim ve belgelendirme denetiminden farkını [tedarikçi denetimi nedir](/blog/tedarikci-denetimi-nedir) yazımızda ele aldık.\n\n" +
      "Tedarikçi denetimi; yeni tedarikçi onayı öncesinde, kritik tedarikçilerin periyodik izlenmesinde, kalite şikâyeti veya uygunsuzluk sonrasında ve yeni bir sözleşme başlamadan önce planlanabilir. Denetim kriterleri ISO 9001, ISO 14001, ISO 45001 gibi standartlardan, müşteri ve sektör şartlarından ya da doğrudan sizin tedarikçi şartnamenizden oluşabilir. Sürecin adım adım nasıl yürütüldüğünü [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir), hangi başlıkların değerlendirildiğini [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) ve puanlamanın nasıl yapıldığını [tedarikçi değerlendirme kriterleri](/blog/tedarikci-degerlendirme-kriterleri) yazılarımızda bulabilirsiniz. ISO 9001 madde 8.4 açısından hangi tedarikçilerin denetlenmesi gerektiğini [ISO 9001'de tedarikçi denetimi zorunlu mu](/blog/iso-9001-tedarikci-denetimi-zorunlu-mu), sahada sorulan soruları [tedarikçi denetiminde sorulacak sorular](/blog/tedarikci-denetimi-sorulari), raporun yapısını ise [tedarikçi denetim raporu](/blog/tedarikci-denetim-raporu) yazımızda ele aldık.\n\n" +
      "Sektörünüze özgü denetim başlıkları için [gıda tedarikçi denetimi](/blog/gida-tedarikci-denetimi), [tekstil tedarikçi denetimi](/blog/tekstil-tedarikci-denetimi) ve [otomotiv tedarikçi denetimi](/blog/otomotiv-tedarikci-denetimi) rehberlerimize göz atabilirsiniz. Sizin adınıza üretim yapan firmalar için [fason üretici denetimi](/blog/fason-uretici-denetimi), yerinde ziyaretin zor olduğu durumlar için [uzaktan tedarikçi denetimi](/blog/uzaktan-tedarikci-denetimi) yazılarımız yol gösterir. Aynı bağımsız denetim yaklaşımını zincir mağaza, bayi ve franchise ağınıza uygulamak için [şube ve mağaza denetimi](/hizmetler/sube-denetimi) hizmetimizi inceleyebilirsiniz.\n\n" +
      "Tedarikçi denetimlerinizin tamamı DBYS (Denetim ve Belgelendirme Yönetim Sistemi) üzerinden online yönetilir: denetim planlaması, denetçi ataması, soru listeleri üzerinden kanıtlarıyla birlikte bulguların yazılması ve takibi, uygunsuzluk takibi, hakediş takibi ve denetim raporlarının müşteri ve denetim kuruluşu tarafından online onaylanması tek sistemde, hızlı ve düzenli biçimde yürür. Ayrıntılar için [tedarikçi denetim yönetimi yazılımı](/blog/tedarikci-denetim-yonetimi-yazilimi) yazımıza bakabilirsiniz.\n\n" +
      "DVN Cert olarak tedarikçi denetimlerini tarafsızlık, bağımsızlık ve gizlilik ilkeleriyle yürütür; bulguları ayrıntılı, önceliklendirilmiş ve uygulanabilir bir tedarikçi denetim raporuyla paylaşırız.",
    faydalar: [
      "Tedarikçi ve fason üreticilerin belirlenen kriterlere uygunluğunun bağımsızca değerlendirilmesi",
      "Kalite, çevre, İSG ve sektörel gerekliliklere uyumun yerinde, kanıta dayalı kontrolü",
      "Tedarik zinciri risklerinin erken tespit edilmesi ve azaltılması",
      "Sözleşme ve tedarikçi şartnamesi yükümlülüklerinin yerine getirildiğinin doğrulanması",
      "Tedarikçi seçimi, onayı ve performans değerlendirmesine nesnel veri sağlanması",
      "Puanlanmış tedarikçi denetim raporu ve düzeltici faaliyet takibi",
      "DBYS ile tüm denetimlerin online, hızlı ve düzenli yönetimi; raporların online onayı",
      "Yerinde veya uzaktan (online) denetim seçenekleriyle esnek planlama",
      "Marka itibarının ve müşteri güveninin korunması",
    ],
    platform: {
      etiket: "DBYS İLE ONLINE DENETİM YÖNETİMİ",
      baslik: "Tedarikçi denetimleriniz tek sistemde, online ve düzenli",
      aciklama:
        "Tedarikçi denetimlerinizi DBYS (Denetim ve Belgelendirme Yönetim Sistemi) üzerinden yönetiyoruz. Planlamadan rapor onayına kadar her adım online ilerler; e-posta ve Excel dosyaları arasında kaybolan bilgi, bekleyen onay ve unutulan uygunsuzluk kalmaz. Denetim raporlarınıza ve denetimle ilgili tüm ayrıntılara sistem üzerinden anında ulaşırsınız.",
      ozellikler: [
        { baslik: "Denetim planlaması", aciklama: "Denetlenecek tedarikçiler, kapsam, kriterler ve tarihler sistemde planlanır; takvim tek ekrandan izlenir." },
        { baslik: "Denetçi ataması", aciklama: "Her denetime yetkin denetçi atanır; sorumluluklar açıkça görünür." },
        { baslik: "Soru listeleri ve kanıtlı bulgular", aciklama: "Denetim soru listeleri üzerinden yürütülür; bulgular kanıtlarıyla birlikte yazılır ve takip edilir." },
        { baslik: "Uygunsuzluk takibi", aciklama: "Uygunsuzluklar kapanana kadar sistemde görünür kalır; düzeltici faaliyetler izlenir." },
        { baslik: "Online rapor onayı", aciklama: "Denetim raporları müşteri ve denetim kuruluşu tarafından sistem üzerinden online onaylanır." },
        { baslik: "Hakediş takibi", aciklama: "Tamamlanan denetimlere ait hakedişler sistem üzerinden düzenli olarak takip edilir." },
      ],
    },
    surec: [
      { baslik: "Planlama", aciklama: "Denetlenecek tedarikçiler, kapsam, kriterler ve kontrol listesi belirlenir." },
      { baslik: "Saha Denetimi", aciklama: "Tedarikçi tesisinde faaliyetler gözlemlenir, kayıt ve dokümanlar incelenir." },
      { baslik: "Raporlama", aciklama: "Bulgular puanlanır ve ayrıntılı tedarikçi denetim raporuyla paylaşılır." },
      { baslik: "Takip", aciklama: "Tedarikçinin düzeltici faaliyetleri izlenir, gerekirse doğrulama denetimi yapılır." },
    ],
    sss: [
      {
        soru: "Tedarikçi denetimi nedir?",
        cevap:
          "Tedarikçi denetimi, bir kuruluşun mal veya hizmet aldığı tedarikçilerini, fason üreticilerini ve alt yüklenicilerini; belirlenen standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından yerinde değerlendirmesidir. Denetim, müşteri konumundaki kuruluş adına yürütülür ve 2. taraf denetimi olarak da adlandırılır.",
      },
      {
        soru: "İkinci taraf denetim nedir?",
        cevap:
          "İkinci taraf denetim, bir kuruluşun tedarikçisini, fason üreticisini, alt yüklenicisini veya bayi ve şubelerini kendi belirlediği kriterlere göre denetlemesidir; en yaygın örneği tedarikçi denetimidir. Birinci taraf denetim kuruluşun kendi iç denetimi, üçüncü taraf denetim ise bağımsız bir belgelendirme kuruluşunun sertifikayla sonuçlanan denetimidir.",
      },
      {
        soru: "Tedarikçi denetimi neden yapılır?",
        cevap:
          "Satın alınan ürün ve hizmetlerin kalitesi doğrudan sizin ürününüzü ve itibarınızı etkiler. Tedarikçi denetimi; kalite, teslimat, yasal uyum, çevre ve İSG risklerini sorun yaşanmadan önce tespit etmenizi, tedarikçi seçimi ve onayını nesnel verilere dayandırmanızı ve sözleşme şartlarına uyumu doğrulamanızı sağlar.",
      },
      {
        soru: "Tedarikçi denetimi hangi durumlarda yapılır?",
        cevap:
          "Yeni bir tedarikçi onaylanmadan önce, kritik tedarikçilerin periyodik izlenmesinde, kalite şikâyeti veya tekrarlayan uygunsuzluk sonrasında, yeni bir sözleşme ya da ürün devreye alınmadan önce ve tedarik zincirinde kalite, çevre ve İSG risklerinin yönetilmesi gerektiğinde tedarikçi denetimi yapılır.",
      },
      {
        soru: "Tedarikçi denetimi nasıl yapılır?",
        cevap:
          "Süreç; kapsam, kriter ve kontrol listesinin belirlendiği planlama, tedarikçi tesisinde faaliyetlerin gözlemlendiği ve kayıtların incelendiği saha denetimi, bulguların puanlanarak raporlandığı raporlama ve düzeltici faaliyetlerin izlendiği takip aşamalarından oluşur.",
      },
      {
        soru: "Tedarikçi denetimi hangi kriterlere göre yapılır?",
        cevap:
          "Denetim, kuruluşunuzun belirlediği şartlar ve kontrol listeleri doğrultusunda yapılır. Kriterler; ilgili ISO standartları (ör. ISO 9001 kalite, ISO 14001 çevre, ISO 45001 İSG), sektörel gereklilikler, tedarikçi şartnamesi, sözleşme şartları ve yasal yükümlülüklerden oluşabilir.",
      },
      {
        soru: "Fason üretici ve alt yüklenici denetimi de bu kapsamda mı?",
        cevap:
          "Evet. Sizin adınıza üretim yapan fason üreticiler, alt yükleniciler, depolama ve lojistik hizmet sağlayıcıları da tedarikçi denetimi kapsamında değerlendirilebilir.",
      },
      {
        soru: "Tedarikçi denetimi ile belgelendirme denetimi aynı şey midir?",
        cevap:
          "Hayır. Belgelendirme denetimi, bağımsız bir belgelendirme kuruluşunun standart şartlarına göre yaptığı ve sonunda sertifika düzenlenen denetimdir. Tedarikçi denetiminde ise amaç, tedarikçinizin sizin belirlediğiniz kriterlere uygunluğunu doğrulamaktır; sonucunda sertifika değil, ayrıntılı bir denetim raporu sunulur. Tedarikçinin ISO belgesi olması, sizin özel şartlarınızı karşıladığı anlamına gelmez.",
      },
      {
        soru: "ISO 9001'de tedarikçi denetimi zorunlu mu?",
        cevap:
          "Her tedarikçi için zorunlu değildir. ISO 9001 madde 8.4, dış tedarikçilerin risk temelli olarak değerlendirilmesini, seçilmesini, izlenmesini ve kontrol edilmesini ister. Ürün kalitesini doğrudan etkileyen kritik tedarikçilerde bu kontrolün en güçlü ve en çok kabul gören yolu tedarikçi denetimidir.",
      },
      {
        soru: "Tedarikçi denetimi ne kadar sürer?",
        cevap:
          "Süre; tedarikçinin büyüklüğüne, denetim kapsamına ve değerlendirilecek süreç sayısına göre değişir. Tek bir tesisin saha denetimi genellikle 1-2 gün sürer; planlama ve raporlama bu sürenin dışındadır. Kapsam netleştikten sonra net bir zaman planı paylaşılır.",
      },
      {
        soru: "Tedarikçi denetimi ücreti neye göre belirlenir?",
        cevap:
          "Ücret; denetlenecek tedarikçi ve tesis sayısına, tesislerin konumuna, denetim kapsamına ve kriterlerine, sahada geçecek gün sayısına ve denetimin yerinde, uzaktan veya karma yapılmasına göre belirlenir. Kapsam netleştikten sonra size özel teklif hazırlanır.",
      },
      {
        soru: "Tedarikçi denetimlerini online takip edebilir miyim?",
        cevap:
          "Evet. DVN Cert tedarikçi denetimlerini DBYS (Denetim ve Belgelendirme Yönetim Sistemi) üzerinden yönetir. Denetim planlaması, denetçi ataması, soru listeleri üzerinden kanıtlarıyla birlikte bulgular, uygunsuzluk takibi ve hakediş takibi sistemde yürür; denetim raporları müşteri ve denetim kuruluşu tarafından online onaylanır.",
      },
      {
        soru: "Tedarikçi denetim raporu neler içerir?",
        cevap:
          "Rapor; denetim kapsamı ve kriterleri, tedarikçinin aldığı puan, tespit edilen bulgular ve uygunsuzluklar, bunların önem/öncelik seviyeleri, destekleyici kanıtlar ve önerilen düzeltici faaliyetleri içerir. Birden fazla tedarikçi denetlendiğinde karşılaştırmalı özet de sunulur.",
      },
      {
        soru: "Uzaktan (online) tedarikçi denetimi mümkün müdür?",
        cevap:
          "Evet. Doküman incelemesi ve görüşmeler video konferans ve ekran paylaşımıyla uzaktan yürütülebilir. Ancak üretim ve saha koşullarının yerinde gözlemlenmesi gereken durumlarda yerinde denetim önerilir; çoğu zaman yerinde ve uzaktan adımları birleştiren karma bir yaklaşım uygulanır.",
      },
    ],
  },
  {
    slug: "sube-denetimi",
    kategori: "Denetim",
    baslik: "Şube ve Mağaza Denetimi",
    seoTitle: "Şube ve Mağaza Denetimi Hizmeti",
    alternatifAdlar: ["Mağaza denetimi", "Franchise denetimi", "Satış noktası denetimi", "Zincir mağaza denetimi", "Store audit", "Franchise audit"],
    karsilastirma: {
      baslik: "İç kontrol, gizli müşteri ve bağımsız şube denetimi",
      aciklama: "Üç yöntem farklı soruları yanıtlar; bağımsız şube denetimi, tüm şubeleri aynı kontrol listesiyle ve kanıta dayalı olarak karşılaştırılabilir kılar.",
      sutunlar: ["Kriter", "Bölge müdürü / iç kontrol", "Gizli müşteri", "Bağımsız şube denetimi"],
      satirlar: [
        ["Odak", "Günlük operasyon ve satış hedefleri", "Müşterinin yaşadığı hizmet deneyimi", "Marka standardı, hijyen, İSG, operasyon ve kayıtlar"],
        ["Tarafsızlık", "Şubeyle iş ilişkisi içinde; zamanla rutinleşebilir", "Bağımsız", "Bağımsız"],
        ["Arka plan erişimi", "Var", "Yok; yalnızca müşteri alanı", "Var; depo, mutfak, kayıtlar ve belgeler dahil"],
        ["Kanıt", "Çoğunlukla gözlem notları", "Senaryo bazlı deneyim raporu", "Puanlı kontrol listesi, fotoğraf ve kayıt kanıtı"],
        ["Şubeler arası karşılaştırma", "Denetleyene göre değişebilir", "Senaryoyla sınırlı", "Tüm şubelerde aynı ölçüt ve puanlama"],
      ],
    },
    guncellenme: "2026-11-12",
    hedefKitle: ["Perakende ve market zincirleri", "Restoran ve kafe zincirleri", "Franchise ağları", "Çok şubeli işletmeler"],
    seoAciklama:
      "Zincir işletmeler, bayi ve franchise ağları için bağımsız şube ve mağaza denetimi: marka standardı, hijyen ve İSG uyumu, puanlı ve fotoğraflı rapor.",
    kisaAciklama:
      "Zincir mağaza, bayi ve franchise ağlarınızdaki şubeleri; marka standartlarına, hizmet kalitesine, hijyen ve operasyonel kurallara uygunluk açısından yerinde ve bağımsızca denetliyoruz.",
    ikon: "denetim",
    gorsel: "/gorseller/hizmetler/sube-denetimi.webp",
    giris:
      "Şube denetimi (mağaza denetimi); zincir işletmelerin, bayi ve franchise ağlarının kendi şubelerini veya iş ortaklarının işlettiği satış noktalarını belirlenen marka standartlarına, operasyonel prosedürlere, hijyen ve güvenlik kurallarına uygunluk açısından bağımsız olarak değerlendirmesidir. Franchise denetimi ve satış noktası denetimi de bu hizmetin kapsamındadır; bağımsız iş ortaklarının işlettiği satış ve servis noktaları için ayrıca [bayi denetimi](/hizmetler/bayi-denetimi) hizmetimizi sunuyoruz.\n\n" +
      "Çok şubeli yapılarda hizmet kalitesini her noktada aynı seviyede tutmak markaların en büyük zorluklarından biridir. Bölge müdürlerinin yaptığı iç kontroller zamanla rutinleşir ve şubeler arasında karşılaştırılabilir veri üretmez. Bağımsız bir denetçinin aynı kontrol listesiyle yaptığı düzenli şube denetimleri; standartlardan sapmaları erken tespit eder, şubeler arası tutarlılığı artırır ve müşteri deneyimini korur.\n\n" +
      "Denetimde tipik olarak mağaza düzeni ve görsel marka uyumu, ürün teşhiri ve fiyat etiketleri, hijyen ve gıda güvenliği, stok ve son kullanma tarihi kontrolleri, iş sağlığı ve güvenliği, kasa ve nakit prosedürleri, personel görünümü ve müşteri karşılama standartları değerlendirilir. Kontrol listesi markanıza özel hazırlanır; hangi başlıkların yer aldığını [şube denetimi kontrol listesi](/blog/sube-denetimi-kontrol-listesi) yazımızda ayrıntılı ele aldık.\n\n" +
      "Franchise denetimi, şube denetiminin franchise sözleşmesine odaklanan biçimidir. Franchise veren marka; franchise alanın işlettiği noktada operasyon el kitabına, görsel kimlik ve ürün standartlarına, onaylı tedarikçi ve ürün kullanımına, eğitim yükümlülüklerine ve hijyen-güvenlik kurallarına uyulup uyulmadığını bağımsız bir denetçiyle doğrular. Denetim sonuçları, franchise alanlarla yapılan performans görüşmelerine, destek ve eğitim planlarına ve gerektiğinde sözleşme yaptırımlarına nesnel bir dayanak sağlar.\n\n" +
      "Şube denetimi; perakende ve market zincirleri, restoran ve kafe zincirleri, akaryakıt istasyonları, yetkili servis ve bayi ağları, eczane, optik, kozmetik ve eğitim zincirleri gibi çok noktalı tüm yapılarda uygulanır. Denetimin nasıl planlandığını [şube ve mağaza denetimi rehberi](/blog/sube-magaza-denetimi-rehberi) yazımızda anlattık. Aynı bağımsız yaklaşımı tedarik zincirinize uygulamak için [tedarikçi denetimi](/hizmetler/tedarikci-denetimi) hizmetimizi inceleyebilirsiniz.\n\n" +
      "DVN Cert olarak şube ve mağaza denetimlerini, kuruluşunuzun belirlediği kontrol listeleri ve marka standartları doğrultusunda; tarafsızlık ve gizlilik ilkeleriyle yürütür, bulguları şube bazında puanlanmış ve fotoğraflı bir denetim raporuyla paylaşırız.",
    faydalar: [
      "Tüm şubelerde tutarlı hizmet kalitesi ve marka deneyimi",
      "Marka standartlarından ve operasyonel prosedürlerden sapmaların erken tespiti",
      "Hijyen, iş sağlığı ve güvenliği ile yasal gerekliliklere uyumun yerinde kontrolü",
      "Bayi ve franchise ağında sözleşme şartlarına uyumun bağımsız doğrulanması",
      "Şubeler arası karşılaştırılabilir, puanlanmış performans verisi",
      "Fotoğraflı ve önceliklendirilmiş rapor ile düzeltici faaliyet takibi",
      "Sezon ve kampanya dönemleri öncesinde hazırlık ve uygunluk denetimleri",
      "Coğrafi olarak dağınık ağlarda merkezi, tutarlı ve karşılaştırılabilir görünürlük",
    ],
    surec: [
      { baslik: "Kriterlerin Belirlenmesi", aciklama: "Marka standartları, şube denetim formu ve puanlama kriterleri birlikte netleştirilir." },
      { baslik: "Saha Denetimi", aciklama: "Şubeler yerinde ziyaret edilir; operasyon, hijyen ve müşteri deneyimi gözlemlenir." },
      { baslik: "Raporlama", aciklama: "Bulgular puanlanmış, fotoğraflı ve şube bazında karşılaştırmalı raporla paylaşılır." },
      { baslik: "Takip", aciklama: "Düzeltici faaliyetlerin uygulanması izlenir, gerektiğinde tekrar denetim yapılır." },
    ],
    sss: [
      {
        soru: "Şube denetimi nedir?",
        cevap:
          "Şube denetimi (mağaza denetimi), çok şubeli bir işletmenin veya franchise/bayi ağının; şubelerini marka standartlarına, operasyonel prosedürlere ve hijyen-güvenlik kurallarına uygunluk açısından bağımsız olarak değerlendirmesidir.",
      },
      {
        soru: "Şube denetiminde neler kontrol edilir?",
        cevap:
          "Tipik başlıklar; mağaza düzeni ve görsel marka uyumu, ürün teşhiri ve fiyat etiketleri, hijyen ve gıda güvenliği, stok ve son kullanma tarihi kontrolleri, iş sağlığı ve güvenliği, kasa ve nakit prosedürleri, personel görünümü ve müşteri karşılama standartlarıdır. Kontrol listesi markanın kendi standartlarına göre özelleştirilir.",
      },
      {
        soru: "Şube denetimi ile gizli müşteri (mystery shopper) aynı şey midir?",
        cevap:
          "Hayır. Gizli müşteri kimliğini gizleyerek yalnızca müşteri deneyimini ölçer. Şube denetimi ise kimliği açık, kontrol listesine dayalı; operasyon, hijyen, güvenlik, stok ve marka uyumu gibi alanları kapsamlı ve kanıta dayalı biçimde değerlendiren yapılandırılmış bir denetimdir.",
      },
      {
        soru: "Bayi ve franchise denetimi de bu kapsamda mıdır?",
        cevap:
          "Evet. Markanın belirlediği standartlara uyumun bağımsızca doğrulanması gereken franchise ağları şube denetimi kapsamında değerlendirilir. Bağımsız işletmelerin yürüttüğü satış, servis ve dağıtım noktaları için ise bayi sözleşmesine ve satış-servis standartlarına odaklanan Bayi Denetimi hizmetimizi sunuyoruz.",
      },
      {
        soru: "Franchise denetimi nedir?",
        cevap:
          "Franchise denetimi, franchise veren markanın, franchise alanın işlettiği noktada operasyon el kitabına, görsel kimlik ve ürün standartlarına, onaylı tedarikçi kullanımına, eğitim yükümlülüklerine ve hijyen-güvenlik kurallarına uyumunu bağımsız bir denetçiyle doğrulatmasıdır. Sonuçlar puanlanmış ve fotoğraflı raporla paylaşılır; franchise alanla yapılacak performans görüşmelerine nesnel dayanak oluşturur.",
      },
      {
        soru: "Şube denetim formu (kontrol listesi) kim tarafından hazırlanır?",
        cevap:
          "Kontrol listesi, markanızın standartları ve öncelikleri esas alınarak sizinle birlikte hazırlanır. Hazır bir şube denetim formunuz varsa doğrudan kullanılabilir; yoksa sektörünüze uygun başlıklar ve puanlama ağırlıkları birlikte belirlenir.",
      },
      {
        soru: "Habersiz şube denetimi yapılabilir mi?",
        cevap:
          "Evet. Şubelerin günlük olağan işleyişini görmek için habersiz denetimler planlanabilir. Habersiz ve önceden bildirilen denetimlerin oranı, markanın hedeflerine göre belirlenir.",
      },
      {
        soru: "Denetim raporu neler içerir?",
        cevap:
          "Rapor; şube bazında puanlama, tespit edilen uygunsuzluklar, destekleyici fotoğraflar, öncelik seviyeleri ve önerilen düzeltici faaliyetleri içerir. Birden çok şubenin karşılaştırılabildiği özet tablolar da sunulur.",
      },
      {
        soru: "Şube denetimi ne sıklıkla yapılmalıdır?",
        cevap:
          "Sıklık; sektöre, şube sayısına ve risk düzeyine göre belirlenir. Perakende ve yeme-içme gibi hızlı değişen ortamlarda periyodik (örneğin çeyreklik veya aylık) denetimler tercih edilir; kritik dönemlerde habersiz denetimler de planlanabilir. En etkili yaklaşım, düzenli aralıklarla ve belirli bir örnekleme mantığıyla tüm ağı kapsamaktır.",
      },
      {
        soru: "Şube denetimi yerinde mi yoksa uzaktan mı yapılır?",
        cevap:
          "Şube denetimi ağırlıklı olarak yerinde yürütülür; çünkü hijyen, görsel düzen, stok ve müşteri deneyimi gibi unsurların gözlemlenmesi gerekir. Bununla birlikte doküman ve kayıt incelemesi ya da kamera üzerinden bazı kontroller uzaktan (online) tamamlanabilir; ihtiyaca göre karma bir model uygulanır.",
      },
      {
        soru: "Hangi sektörlerde şube denetimi uygulanır?",
        cevap:
          "Şube ve mağaza denetimi; perakende zincirleri, marketler, restoran-kafe (HORECA) işletmeleri, akaryakıt istasyonları, yetkili servisler, bankacılık ve finans şubeleri ile sağlık, güzellik ve eğitim zincirleri başta olmak üzere, çok noktalı ve marka standartlarını her şubede aynı seviyede tutması gereken tüm sektörlerde uygulanır.",
      },
    ],
  },
  {
    slug: "bayi-denetimi",
    kategori: "Denetim",
    baslik: "Bayi Denetimi",
    seoTitle: "Bayi Denetimi: Bağımsız Bayi Ağı Denetimi",
    alternatifAdlar: [
      "Bayi ağı denetimi",
      "Yetkili satıcı denetimi",
      "Yetkili servis denetimi",
      "Distribütör denetimi",
      "Dealer audit",
      "Dealer network audit",
    ],
    karsilastirma: {
      baslik: "Saha ekibi ziyareti ile bağımsız bayi denetimi",
      aciklama: "Saha ekibi ilişkiyi ve satışı geliştirir; bağımsız bayi denetimi ise sözleşme ve marka standardına uyumu tarafsız biçimde doğrular. İkisi birbirinin yerine değil, birlikte kullanılır.",
      sutunlar: ["Kriter", "Marka saha ekibi ziyareti", "Bağımsız bayi denetimi"],
      satirlar: [
        ["Temel amaç", "Satış geliştirme ve bayi ilişkisini yönetme", "Sözleşme, marka standardı ve servis kalitesine uyumu doğrulama"],
        ["Bayiyle ilişki", "Ticari ve kişisel ilişki içinde", "Ticari ilişkisi olmayan bağımsız denetçi"],
        ["Ölçüt tutarlılığı", "Ziyaret edene göre değişebilir", "Tüm bayilerde aynı kontrol listesi ve puanlama"],
        ["Kanıt", "Çoğunlukla ziyaret notları", "Puanlı rapor, fotoğraf ve kayıt kanıtı"],
        ["Yaptırım kararlarında kullanım", "Taraf olduğu için itiraza açık", "Bağımsız rapor olarak daha kolay savunulur"],
      ],
    },
    guncellenme: "2026-11-12",
    hedefKitle: [
      "Bayi ağı yöneten üretici ve markalar",
      "Otomotiv, beyaz eşya ve elektronik markaları",
      "Akaryakıt ve enerji dağıtım şirketleri",
      "Distribütör ve yetkili servis ağları",
    ],
    seoAciklama:
      "Bayi ve yetkili servis ağınız için bağımsız bayi denetimi: sözleşme ve marka standardı uyumu, satış ve servis kalitesi, puanlı ve fotoğraflı rapor.",
    kisaAciklama:
      "Bayi, yetkili satıcı, yetkili servis ve distribütör ağınızı; bayi sözleşmesine, marka standartlarına, satış ve servis kalitesine uygunluk açısından yerinde ve bağımsızca denetliyoruz.",
    ikon: "denetim",
    giris:
      "Bayi denetimi; bir üreticinin veya markanın, kendi adına satış, servis ya da dağıtım yapan bağımsız işletmeleri (bayi, yetkili satıcı, yetkili servis, distribütör) bayi sözleşmesine, marka standartlarına, satış ve servis prosedürlerine ve yasal yükümlülüklere uygunluk açısından yerinde değerlendirmesidir. Denetlenen taraf markanın iş ortağı olduğu ve denetim marka adına yürütüldüğü için bayi denetimi bir ikinci taraf denetimdir.\n\n" +
      "Bayiler markanın müşteriyle buluştuğu noktadır; ancak bayi, markanın değil kendi sahibinin işletmesidir. Bu nedenle şirketin kendi şubelerinde uygulanan doğrudan yönetim araçları bayide aynı etkiyi göstermez. Bölge satış ekiplerinin ziyaretleri ise çoğu zaman ticari ilişkinin gölgesinde kalır ve bayiler arasında karşılaştırılabilir veri üretmez. Bağımsız bir denetçinin aynı kontrol listesiyle yürüttüğü bayi denetimi; standartlardan sapmaları kanıtıyla ortaya koyar, bayiler arasında adil bir kıyas sağlar ve teşvik, prim veya sözleşme kararlarına nesnel bir dayanak oluşturur.\n\n" +
      "Bayi denetiminde tipik olarak şu başlıklar değerlendirilir: bayi sözleşmesindeki yükümlülükler (yetki bölgesi, asgari stok, personel ve eğitim şartları), görsel kimlik ve showroom standartları, ürün teşhiri ve fiyatlandırma, satış süreci ve müşteri karşılama, satış sonrası hizmet ve servis süreçleri, orijinal yedek parça ve onaylı ürün kullanımı, garanti işlemleri ve kayıtları, müşteri şikâyetlerinin yönetimi, iş sağlığı ve güvenliği, çevre ve atık yönetimi ile ticari ve yasal belgelerin geçerliliği. Kontrol listesi markanızın bayi standartlarına göre birlikte hazırlanır; sık kullanılan başlıkları [bayi denetimi kontrol listesi](/blog/bayi-denetimi-kontrol-listesi) yazımızda ayrıntılı ele aldık.\n\n" +
      "Bayi denetimi; otomotiv ve iş makinesi bayileri, beyaz eşya ve elektronik yetkili satıcıları, akaryakıt ve LPG istasyonları, tarım makineleri ve gübre-ilaç bayileri, yapı malzemeleri ve mobilya bayileri, telekom ve bankacılık acenteleri ile yetkili servis ağları gibi bağımsız iş ortaklarıyla çalışan tüm dağıtım modellerinde uygulanır. Şirketin kendi işlettiği ya da franchise modelindeki satış noktaları için [şube ve mağaza denetimi](/hizmetler/sube-denetimi), tedarik zincirinin üretim tarafı için ise [tedarikçi denetimi](/hizmetler/tedarikci-denetimi) hizmetimizi inceleyebilirsiniz.\n\n" +
      "DVN Cert olarak bayi denetimlerini markanızın belirlediği kriterler doğrultusunda; tarafsızlık, bağımsızlık ve gizlilik ilkeleriyle yürütür, bulguları bayi bazında puanlanmış, fotoğraflı ve önceliklendirilmiş bir denetim raporuyla paylaşırız. Birden çok bayi denetlendiğinde bölge ve ağ genelinde karşılaştırmalı özet sunarız.",
    faydalar: [
      "Bayi sözleşmesindeki yükümlülüklere uyumun bağımsız ve kanıta dayalı doğrulanması",
      "Tüm bayilerde tutarlı marka deneyimi, satış ve servis kalitesi",
      "Bayiler arası adil ve karşılaştırılabilir, puanlanmış performans verisi",
      "Teşvik, prim, yetki ve sözleşme yenileme kararlarına nesnel dayanak",
      "Orijinal parça, onaylı ürün ve garanti süreçlerindeki suistimal risklerinin erken tespiti",
      "İSG, çevre ve yasal gerekliliklere uyumun yerinde kontrolü",
      "Fotoğraflı ve önceliklendirilmiş rapor ile düzeltici faaliyet takibi",
      "Satış ekibinin ticari ilişkisinden ayrışan, tarafsız bir değerlendirme",
    ],
    surec: [
      { baslik: "Kriterlerin Belirlenmesi", aciklama: "Bayi sözleşmesi, marka standartları, bayi denetim formu ve puanlama ağırlıkları birlikte netleştirilir." },
      { baslik: "Saha Denetimi", aciklama: "Bayi yerinde ziyaret edilir; showroom, satış, servis, stok ve kayıtlar gözlemlenip incelenir." },
      { baslik: "Raporlama", aciklama: "Bulgular bayi bazında puanlanmış, fotoğraflı ve ağ genelinde karşılaştırmalı raporla paylaşılır." },
      { baslik: "Takip", aciklama: "Bayinin düzeltici faaliyetleri izlenir; gerektiğinde doğrulama denetimi yapılır." },
    ],
    sss: [
      {
        soru: "Bayi denetimi nedir?",
        cevap:
          "Bayi denetimi, bir markanın kendi adına satış, servis veya dağıtım yapan bağımsız işletmeleri (bayi, yetkili satıcı, yetkili servis, distribütör) bayi sözleşmesine, marka standartlarına, satış ve servis prosedürlerine ve yasal yükümlülüklere uygunluk açısından yerinde ve bağımsız olarak değerlendirmesidir.",
      },
      {
        soru: "Bayi denetimi ile şube denetimi arasındaki fark nedir?",
        cevap:
          "Şube denetimi, markanın kendi işlettiği veya franchise modelindeki satış noktalarını operasyon ve marka standartlarına göre değerlendirir. Bayi denetiminde ise denetlenen işletme bağımsız bir iş ortağıdır; denetim bayi sözleşmesindeki yükümlülüklere, yetki ve stok şartlarına, satış sonrası hizmet, garanti ve orijinal parça kullanımına daha fazla odaklanır.",
      },
      {
        soru: "Bayi denetimi ikinci taraf denetim midir?",
        cevap:
          "Evet. Denetim, bayi ile sözleşme ilişkisi olan marka adına ve markanın belirlediği kriterlere göre yürütüldüğü için ikinci taraf denetimdir. Sonucunda sertifika değil, puanlanmış bir bayi denetim raporu düzenlenir.",
      },
      {
        soru: "Bayi denetiminde neler kontrol edilir?",
        cevap:
          "Tipik başlıklar; bayi sözleşmesi yükümlülükleri, görsel kimlik ve showroom standartları, ürün teşhiri ve fiyatlandırma, satış süreci ve müşteri karşılama, satış sonrası hizmet ve servis süreçleri, orijinal yedek parça ve onaylı ürün kullanımı, garanti kayıtları, müşteri şikâyetlerinin yönetimi, iş sağlığı ve güvenliği ile ticari ve yasal belgelerdir. Kontrol listesi markanın kendi bayi standartlarına göre özelleştirilir.",
      },
      {
        soru: "Hangi sektörlerde bayi denetimi yapılır?",
        cevap:
          "Otomotiv ve iş makinesi bayileri, beyaz eşya ve elektronik yetkili satıcıları, akaryakıt ve LPG istasyonları, tarım makineleri ve tarım girdisi bayileri, yapı malzemeleri ve mobilya bayileri, telekom ve finans acenteleri ile yetkili servis ağları gibi bağımsız iş ortaklarıyla çalışan tüm sektörlerde bayi denetimi uygulanır.",
      },
      {
        soru: "Bayi denetimi neden bağımsız bir kuruluşa yaptırılmalı?",
        cevap:
          "Bölge satış ekipleri bayiyle ticari bir ilişki içindedir; bu durum değerlendirmenin tarafsızlığını ve bayiler arası karşılaştırılabilirliği zayıflatabilir. Bağımsız bir denetçi tüm bayileri aynı kontrol listesi ve puanlama mantığıyla, kanıta dayalı olarak değerlendirir; sonuçlar teşvik, prim ve sözleşme kararlarında daha kolay savunulur.",
      },
      {
        soru: "Habersiz bayi denetimi yapılabilir mi?",
        cevap:
          "Evet, bayi sözleşmesi denetim hakkını tanıyorsa habersiz denetim planlanabilir. Habersiz ve önceden bildirilen denetimlerin oranı markanın hedeflerine göre belirlenir; servis ve kayıt incelemesi gerektiren denetimlerde çoğunlukla önceden bildirim tercih edilir.",
      },
      {
        soru: "Bayi denetimi ne sıklıkla yapılmalıdır?",
        cevap:
          "Sıklık; bayi sayısına, satış hacmine, risk düzeyine ve önceki denetim sonuçlarına göre belirlenir. Yaygın uygulama, tüm bayilerin yılda en az bir kez denetlenmesi; düşük puan alan veya şikâyet yoğunluğu olan bayilerde ise takip denetimlerinin daha sık planlanmasıdır.",
      },
      {
        soru: "Bayi denetim raporu neler içerir?",
        cevap:
          "Rapor; bayinin toplam ve başlık bazında puanını, tespit edilen uygunsuzlukları, destekleyici fotoğrafları, öncelik seviyelerini ve önerilen düzeltici faaliyetleri içerir. Birden çok bayi denetlendiğinde bölge ve ağ genelinde karşılaştırmalı özet tablolar da sunulur.",
      },
      {
        soru: "Bayi denetimi ücreti neye göre belirlenir?",
        cevap:
          "Ücret; denetlenecek bayi sayısına ve coğrafi dağılımına, kontrol listesinin kapsamına, bayi başına sahada geçecek süreye ve denetim sıklığına göre belirlenir. Kapsam netleştikten sonra size özel teklif hazırlanır.",
      },
    ],
  },
];

export function hizmetGetir(slug: string): Hizmet | undefined {
  return hizmetler.find((h) => h.slug === slug);
}

export function hizmetlerKategoriye(kategori: string): Hizmet[] {
  return hizmetler.filter((h) => h.kategori === kategori);
}
