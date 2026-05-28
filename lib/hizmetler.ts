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
    baslik: "2. Taraf Denetimleri",
    seoTitle: "2. Taraf Denetimi (Tedarikçi Denetimi) Hizmeti",
    seoAciklama:
      "Tedarikçi ve iş ortaklarınızı standartlara, sözleşme ve yasal gerekliliklere uygunluk açısından bağımsız 2. taraf (tedarikçi) denetimiyle değerlendiriyoruz.",
    kisaAciklama:
      "Tedarikçi ve iş ortaklarınızı standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından bağımsızca değerlendiriyoruz.",
    ikon: "denetim",
    giris:
      "2. taraf denetimi (ikinci taraf denetimi); bir kuruluşun kendi tedarikçilerini, alt yüklenicilerini veya iş ortaklarını belirlenen standartlara, sözleşme şartlarına ya da yasal gerekliliklere uygunluk açısından değerlendirmesidir. Uygulamada çoğu zaman \"tedarikçi denetimi\" olarak da anılır.\n\n" +
      "1. taraf denetimi kuruluşun kendi iç denetimini, 3. taraf denetimi ise bağımsız ve akredite bir belgelendirme kuruluşunun yaptığı denetimi ifade eder. 2. taraf denetimi bu ikisinin arasında konumlanır: müşteri konumundaki kuruluş adına, tedarik zincirindeki bir tarafın yerinde ve nesnel biçimde değerlendirilmesini sağlar.\n\n" +
      "Bu hizmet; işletmelerin tedarikçi performansını objektif ölçütlerle değerlendirmesine, tedarik zinciri risklerini önceden tespit etmesine ve sözleşmesel yükümlülüklerin yerine getirildiğini doğrulamasına yardımcı olur. Özellikle kalite, çevre, iş sağlığı ve güvenliği ile sektörel uygunluk gereksinimlerinin kritik olduğu tedarik ilişkilerinde güvence sağlar.\n\n" +
      "DVN Cert olarak 2. taraf denetimlerini tarafsızlık, bağımsızlık ve gizlilik ilkeleriyle yürütür; bulguları ayrıntılı ve uygulanabilir bir denetim raporuyla paylaşırız.",
    faydalar: [
      "Tedarikçi veya iş ortağının belirlenen standartlara uygunluğunun bağımsızca değerlendirilmesi",
      "Kalite, çevre, İSG veya sektörel gerekliliklere uyumun yerinde kontrolü",
      "Tedarik zinciri risklerinin erken tespit edilmesi ve azaltılması",
      "Sözleşme yükümlülüklerinin yerine getirildiğinin doğrulanması",
      "Tedarikçi seçimi ve değerlendirme süreçlerine nesnel veri sağlanması",
      "Ayrıntılı denetim raporu ve düzeltici faaliyet takibi",
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
    ],
  },
];

export function hizmetGetir(slug: string): Hizmet | undefined {
  return hizmetler.find((h) => h.slug === slug);
}

export function hizmetlerKategoriye(kategori: string): Hizmet[] {
  return hizmetler.filter((h) => h.kategori === kategori);
}
