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
  /** SEO için özel <title> (verilmezse baslik kullanılır); layout şablonu " | DVN Cert Belgelendirme" ekler. */
  seoTitle?: string;
  /** SEO için özel meta açıklaması (verilmezse kisaAciklama kullanılır). */
  seoAciklama?: string;
  /** Sayfada gösterilen ve FAQPage yapısal verisi üretilen sıkça sorulan sorular. */
  sss?: { soru: string; cevap: string }[];
};

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
    giris:
      "DVN Cert olarak tarafsız ve profesyonel belgelendirme çözümleri sunuyoruz. Deneyimli denetçi kadromuzla yönetim sistemi belgelendirme süreçlerinizi şeffaf ve etkin bir şekilde yönetiyoruz.\n\n" +
      "Akreditasyon kapsamımızdaki dört temel yönetim sistemi standardında, kuruluşunuzun uluslararası standartlara uyumunu bağımsızlık ve gizlilik ilkeleriyle değerlendiriyoruz.",
    faydalar: [
      "Tek noktadan dört yönetim sistemi belgelendirmesi",
      "Akredite ve uluslararası geçerli sertifikalar",
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
          "DVN Cert, TÜRKAK akreditasyon kapsamındaki dört yönetim sistemi standardında belgelendirme yapar: ISO 9001 (Kalite), ISO 14001 (Çevre), ISO 45001 (İş Sağlığı ve Güvenliği) ve ISO 50001 (Enerji). Bu standartların her biri için ayrı ayrı veya birlikte başvurabilirsiniz.",
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
      {
        soru: "Belgelerimiz TÜRKAK akreditasyonlu mu olacak?",
        cevap:
          "Evet. DVN Cert, TS EN ISO/IEC 17021-1:2015 kapsamında TÜRKAK tarafından akredite edilmiştir (Akreditasyon No: AB-0209-YS). Düzenlenen sertifikalar ulusal ve uluslararası düzeyde tanınırlık taşır ve TÜRKAK Belge Doğrulama Sistemi üzerinden doğrulanabilir.",
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
    slug: "2-taraf-denetimleri",
    kategori: "Denetim",
    baslik: "Tedarikçi Denetimi (2. Taraf Denetimi)",
    seoTitle: "Tedarikçi Denetimi (2. Taraf Denetimi) Hizmeti",
    seoAciklama:
      "Tedarikçilerinizi ve iş ortaklarınızı standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından bağımsız 2. taraf (tedarikçi) denetimiyle yerinde değerlendiriyoruz; tedarik zinciri risklerini erken görün.",
    kisaAciklama:
      "Tedarikçi ve iş ortaklarınızı standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından bağımsızca değerlendiriyoruz.",
    ikon: "denetim",
    giris:
      "Tedarikçi denetimi (2. taraf denetimi / ikinci taraf denetimi); bir kuruluşun kendi tedarikçilerini, alt yüklenicilerini veya iş ortaklarını belirlenen standartlara, sözleşme şartlarına ya da yasal gerekliliklere uygunluk açısından değerlendirmesidir. Uygulamada çoğu zaman \"tedarikçi denetimi\" olarak anılır; tedarik zincirindeki riskleri yönetmenin en etkili yollarından biridir.\n\n" +
      "1. taraf denetimi kuruluşun kendi iç denetimini, 3. taraf denetimi ise bağımsız ve akredite bir belgelendirme kuruluşunun yaptığı denetimi ifade eder. 2. taraf denetimi bu ikisinin arasında konumlanır: müşteri konumundaki kuruluş adına, tedarik zincirindeki bir tarafın yerinde ve nesnel biçimde değerlendirilmesini sağlar. Aradaki farkları [1., 2. ve 3. taraf denetim farkları](/blog/2-taraf-denetimi-nedir) yazımızda ayrıntılı ele aldık.\n\n" +
      "Bu hizmet; işletmelerin tedarikçi performansını objektif ölçütlerle değerlendirmesine, tedarik zinciri risklerini önceden tespit etmesine ve sözleşmesel yükümlülüklerin yerine getirildiğini doğrulamasına yardımcı olur. Özellikle kalite, çevre, iş sağlığı ve güvenliği ile sektörel uygunluk gereksinimlerinin kritik olduğu tedarik ilişkilerinde güvence sağlar.\n\n" +
      "Denetim; tedarikçi seçimi ve onayı öncesinde, mevcut tedarikçilerin performansını izlemek için veya yeni bir sözleşme başlamadan önce planlanabilir. Sürecin adım adım nasıl yürütüldüğünü [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) ve hangi başlıkların değerlendirildiğini [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazılarımızda bulabilirsiniz.\n\n" +
      "Aynı bağımsız denetim yaklaşımını kendi zincir mağaza, bayi ve franchise ağınıza uygulamak için [şube ve mağaza denetimi](/hizmetler/sube-denetimi) hizmetimizi inceleyebilirsiniz.\n\n" +
      "DVN Cert olarak 2. taraf denetimlerini tarafsızlık, bağımsızlık ve gizlilik ilkeleriyle yürütür; bulguları ayrıntılı, önceliklendirilmiş ve uygulanabilir bir denetim raporuyla paylaşırız.",
    faydalar: [
      "Tedarikçi veya iş ortağının belirlenen standartlara uygunluğunun bağımsızca değerlendirilmesi",
      "Kalite, çevre, İSG veya sektörel gerekliliklere uyumun yerinde kontrolü",
      "Tedarik zinciri risklerinin erken tespit edilmesi ve azaltılması",
      "Sözleşme yükümlülüklerinin yerine getirildiğinin doğrulanması",
      "Tedarikçi seçimi ve değerlendirme süreçlerine nesnel veri sağlanması",
      "Ayrıntılı denetim raporu ve düzeltici faaliyet takibi",
      "Yerinde veya uzaktan (online) denetim seçenekleriyle esnek planlama",
      "Marka itibarının ve müşteri güveninin korunması",
    ],
    surec: [
      { baslik: "Planlama", aciklama: "Denetim kapsamı, kriterleri ve zaman planı belirlenir." },
      { baslik: "Saha Denetimi", aciklama: "Faaliyetler yerinde gözlemlenir ve ilgili dokümanlar incelenir." },
      { baslik: "Raporlama", aciklama: "Bulgular ve öneriler ayrıntılı bir denetim raporuyla paylaşılır." },
      { baslik: "Takip", aciklama: "Düzeltici ve önleyici faaliyetlerin uygulanması izlenir." },
    ],
    sss: [
      {
        soru: "2. taraf denetimi nedir?",
        cevap:
          "2. taraf denetimi (ikinci taraf denetimi), bir kuruluşun kendi tedarikçilerini, alt yüklenicilerini veya iş ortaklarını; belirlenen standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından değerlendirmesidir. Genellikle \"tedarikçi denetimi\" olarak da bilinir ve müşteri konumundaki kuruluş adına yürütülür.",
      },
      {
        soru: "1. taraf, 2. taraf ve 3. taraf denetim arasındaki fark nedir?",
        cevap:
          "1. taraf denetimi, kuruluşun kendi yönetim sistemini değerlendirdiği iç denetimdir. 2. taraf denetimi, bir kuruluşun tedarikçisini veya iş ortağını değerlendirmesidir. 3. taraf denetimi ise bağımsız ve akredite bir belgelendirme kuruluşunun (örneğin ISO 9001 belgelendirmesi için) yaptığı denetimdir.",
      },
      {
        soru: "2. taraf denetimi hangi durumlarda gereklidir?",
        cevap:
          "Tedarikçi seçimi ve onayı öncesinde, mevcut tedarikçilerin performansını izlemek için, yeni bir sözleşme veya iş birliği başlamadan önce ya da tedarik zincirinde kalite, çevre ve İSG risklerinin yönetilmesi gerektiğinde 2. taraf denetimi yapılır.",
      },
      {
        soru: "2. taraf (tedarikçi) denetimi nasıl yapılır?",
        cevap:
          "Süreç; denetim kapsamı ve kriterlerinin belirlendiği planlama, faaliyetlerin yerinde gözlemlendiği ve dokümanların incelendiği saha denetimi, bulguların paylaşıldığı raporlama ve düzeltici faaliyetlerin izlendiği takip aşamalarından oluşur.",
      },
      {
        soru: "2. taraf denetimi ile belgelendirme denetimi aynı şey midir?",
        cevap:
          "Hayır. Belgelendirme (3. taraf) denetimi sonunda akredite bir sertifika düzenlenir. 2. taraf denetiminde ise amaç, tedarikçinizin veya iş ortağınızın sizin belirlediğiniz kriterlere uygunluğunu doğrulamaktır; sonucunda sertifika değil, ayrıntılı bir denetim raporu sunulur.",
      },
      {
        soru: "Tedarikçi denetimi ne kadar sürer?",
        cevap:
          "Süre; tedarikçinin büyüklüğüne, denetim kapsamına ve değerlendirilecek süreç sayısına göre değişir. Tek bir tesisin saha denetimi genellikle 1-2 gün sürer; planlama ve raporlama bu sürenin dışındadır. Kapsam netleştikten sonra net bir zaman planı paylaşılır.",
      },
      {
        soru: "Denetim raporu neler içerir?",
        cevap:
          "Rapor; denetim kapsamı ve kriterleri, tespit edilen bulgular ve uygunsuzluklar, bunların önem/öncelik seviyeleri, destekleyici kanıtlar ve önerilen düzeltici faaliyetleri içerir. Amaç, tedarikçinin uygunluk durumunu nesnel ve uygulanabilir biçimde ortaya koymaktır.",
      },
      {
        soru: "Uzaktan (online) tedarikçi denetimi mümkün müdür?",
        cevap:
          "Evet. Doküman incelemesi ve görüşmeler video konferans ve ekran paylaşımıyla uzaktan yürütülebilir. Ancak üretim ve saha koşullarının yerinde gözlemlenmesi gereken durumlarda yerinde denetim önerilir; çoğu zaman yerinde ve uzaktan adımları birleştiren karma bir yaklaşım uygulanır.",
      },
      {
        soru: "Tedarikçi denetimi hangi kriterlere göre yapılır?",
        cevap:
          "Denetim, kuruluşunuzun belirlediği şartlar ve kontrol listeleri doğrultusunda yapılır. Kriterler; ilgili ISO standartları (ör. ISO 9001 kalite, ISO 14001 çevre, ISO 45001 İSG), sektörel gereklilikler, sözleşme şartları ve yasal yükümlülüklerden oluşabilir. Değerlendirme başlıkları için tedarikçi denetimi kontrol listesi yazımıza bakabilirsiniz.",
      },
    ],
  },
  {
    slug: "sube-denetimi",
    kategori: "Denetim",
    baslik: "Şube ve Mağaza Denetimi",
    seoTitle: "Şube, Mağaza ve Bayi Denetimi Hizmeti",
    seoAciklama:
      "Zincir işletmeler, bayi ve franchise ağları için bağımsız şube ve mağaza denetimi: marka standartlarına, hizmet kalitesine, hijyen ve operasyonel kurallara uyumu yerinde değerlendiriyoruz.",
    kisaAciklama:
      "Zincir mağaza, bayi ve franchise ağlarınızdaki şubeleri; marka standartlarına, hizmet kalitesine ve operasyonel kurallara uygunluk açısından bağımsızca denetliyoruz.",
    ikon: "denetim",
    giris:
      "Şube denetimi (mağaza denetimi); zincir işletmelerin, bayi ve franchise ağlarının kendi şubelerini veya iş ortaklarının işlettiği birimleri belirlenen marka standartlarına, operasyonel prosedürlere, hijyen ve güvenlik kurallarına uygunluk açısından bağımsız olarak değerlendirmesidir.\n\n" +
      "Çok şubeli yapılarda hizmet kalitesini her noktada aynı seviyede tutmak markaların en büyük zorluklarından biridir. Bağımsız bir göz tarafından yapılan düzenli şube denetimleri; standartlardan sapmaları erken tespit eder, şubeler arası tutarlılığı artırır ve müşteri deneyimini korur.\n\n" +
      "Şube denetimi, tedarik zincirindeki tarafları değerlendiren [tedarikçi denetimi (2. taraf denetimi)](/hizmetler/2-taraf-denetimleri) yaklaşımının; kendi şube, bayi ve franchise ağınıza uygulanmış hâlidir. Özellikle bayi ve franchise ilişkilerinde, markanın belirlediği kriterlere uyumun bağımsızca doğrulanması değerlidir.\n\n" +
      "DVN Cert olarak şube ve mağaza denetimlerini, kuruluşunuzun belirlediği kontrol listeleri ve marka standartları doğrultusunda; tarafsızlık ve gizlilik ilkeleriyle yürütür, bulguları puanlanmış ve fotoğraflı bir denetim raporuyla paylaşırız. Şube denetiminin nasıl planlandığını [şube ve mağaza denetimi rehberi](/blog/sube-magaza-denetimi-rehberi) yazımızda ele aldık.",
    faydalar: [
      "Tüm şubelerde tutarlı hizmet kalitesi ve marka deneyimi",
      "Marka standartlarından ve operasyonel prosedürlerden sapmaların erken tespiti",
      "Hijyen, iş sağlığı ve güvenliği ile yasal gerekliliklere uyumun yerinde kontrolü",
      "Bayi ve franchise ağında sözleşme şartlarına uyumun bağımsız doğrulanması",
      "Şubeler arası karşılaştırılabilir, puanlanmış performans verisi",
      "Fotoğraflı ve önceliklendirilmiş rapor ile düzeltici faaliyet takibi",
    ],
    surec: [
      { baslik: "Kriterlerin Belirlenmesi", aciklama: "Marka standartları, kontrol listesi ve puanlama kriterleri birlikte netleştirilir." },
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
        soru: "Şube denetimi ile gizli müşteri (mystery shopper) aynı şey midir?",
        cevap:
          "Hayır. Gizli müşteri kimliğini gizleyerek yalnızca müşteri deneyimini ölçer. Şube denetimi ise kimliği açık, kontrol listesine dayalı; operasyon, hijyen, güvenlik, stok ve marka uyumu gibi alanları kapsamlı ve kanıta dayalı biçimde değerlendiren yapılandırılmış bir denetimdir.",
      },
      {
        soru: "Bayi ve franchise denetimi de bu kapsamda mıdır?",
        cevap:
          "Evet. Markanın belirlediği standartlara uyumun bağımsızca doğrulanması gereken bayi, franchise ve yetkili servis ağları şube denetimi kapsamında değerlendirilir.",
      },
      {
        soru: "Şubeler hangi kriterlere göre denetlenir?",
        cevap:
          "Denetim, kuruluşunuzun belirlediği marka standartları ve kontrol listeleri doğrultusunda yapılır. Operasyonel süreçler, hijyen ve gıda güvenliği, iş sağlığı ve güvenliği, görsel/marka uyumu ve müşteri deneyimi tipik denetim başlıklarıdır.",
      },
      {
        soru: "Denetim raporu neler içerir?",
        cevap:
          "Rapor; şube bazında puanlama, tespit edilen uygunsuzluklar, destekleyici fotoğraflar, öncelik seviyeleri ve önerilen düzeltici faaliyetleri içerir. Birden çok şubenin karşılaştırılabildiği özet tablolar da sunulur.",
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
