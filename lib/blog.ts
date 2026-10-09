/**
 * DVN Cert - Blog / Bilgi Merkezi (merkezi veri)
 *
 * Bilgilendirici, faktüel makaleler. Hem /blog liste hem /blog/[slug] detay
 * sayfası bu listeden beslenir. Liste en yeni yazı en üstte olacak şekilde tutulur.
 *
 * İçerik biçimi (icerik alanı): paragraflar boş satır (\n\n) ile ayrılır.
 *   "## "  -> H2 alt başlık
 *   "### " -> H3 alt başlık
 *   "- "   -> madde listesi (her satır)
 *   "1. "  -> numaralı adım listesi (her satır)
 *   "| a | b |" -> tablo (ilk satır başlık; "|---|" ayraç satırı isteğe bağlı)
 *   diğer  -> paragraf
 *
 * GO-LIVE: Yeni yazılar admin paneli/DBYS üzerinden de eklenebilecek.
 */

import { tedarikciKumesi } from "./blog-tedarikci-kumesi";

export type BlogYazisi = {
  slug: string;
  baslik: string;
  /** Meta açıklaması + kart özeti */
  ozet: string;
  /** ISO formatı: "YYYY-MM-DD" */
  tarih: string;
  /** Son güncelleme (YYYY-MM-DD) — DB'den gelir; dateModified ve "Güncellendi" için. */
  guncellenme?: string;
  kategori: string;
  /** Yazar (opsiyonel; boşsa kurum adı kullanılır) */
  yazar?: string;
  /** Kapak görseli yolu veya /api/gorsel/blog/{id} (opsiyonel; boşsa yer tutucu) */
  gorsel?: string;
  /** Kapak görseli alt metni (SEO / erişilebilirlik). */
  gorselAlt?: string;
  /** Gövde; biçim için yukarıdaki nota bakın */
  icerik: string;
  /** İlgili hizmet slug'ları — iç linkleme */
  ilgiliHizmetler?: string[];
};

export const blogYazilari: BlogYazisi[] = [
  // Tedarikçi (ikinci taraf) denetimi soru-cevap kümesi — lib/blog-tedarikci-kumesi.ts
  ...tedarikciKumesi,
  {
    slug: "iso-9001-belgesi",
    baslik: "ISO 9001 Belgesi Nedir? Belgede Yer Alan Bilgiler, Geçerlilik ve Doğrulama",
    ozet:
      "ISO 9001 belgesi neyi gösterir, belge üzerinde hangi bilgiler yer alır, kaç yıl geçerlidir ve nasıl doğrulanır? ISO 9001 belgesinin ayırt edici özelliklerini açıklıyoruz.",
    tarih: "2026-08-08",
    kategori: "Yönetim Sistemleri",
    icerik:
      "ISO 9001 belgesi, bir kuruluşun kalite yönetim sisteminin ISO 9001:2015 standardının şartlarını karşıladığının bağımsız bir belgelendirme kuruluşu tarafından doğrulandığını gösteren sertifikadır. Bu yazıda belgenin ne anlama geldiğini, üzerinde hangi bilgilerin bulunduğunu, geçerlilik süresini ve doğruluğunun nasıl teyit edileceğini ele alıyoruz. Belgeyi almaya yönelik süreç adımları için [ISO 9001 belgelendirme nedir ve nasıl alınır](/blog/iso-9001-belgelendirme-nedir-nasil-alinir) yazımızı inceleyebilirsiniz.\n\n" +
      "## ISO 9001 belgesi nedir?\n\n" +
      "ISO 9001 belgesi, kuruluşun tanımlı bir kapsam dahilinde kurduğu ve uyguladığı kalite yönetim sisteminin standart şartlarına uygun bulunduğunu gösterir. Belge, tetkik ekibinin bulgularının ardından, denetimi yapanlardan bağımsız bir karar mercii tarafından verilen belgelendirme kararına dayanır. Bu ayrım, ISO/IEC 17021-1 standardının tarafsızlık şartlarının bir gereğidir.\n\n" +
      "## ISO 9001 belgesi neyi gösterir, neyi göstermez?\n\n" +
      "ISO 9001 belgesi bir yönetim sistemi belgesidir; ürün veya hizmetin kendisinin belgelendirildiği anlamına gelmez. Belge, kuruluşun süreçlerini tanımlı, izlenebilir ve iyileştirilebilir biçimde yönettiğini gösterir; tek tek ürünlerin teknik uygunluğunu ya da bir hizmetin sonucunu garanti etmez. Bu nedenle belge ve belgelendirme markası, ürün üzerinde veya ürün uygunluğunu çağrıştıracak biçimde kullanılamaz; kullanım kuralları için [logo ve marka kullanımı](/logolarimiz) sayfamıza bakabilirsiniz.\n\n" +
      "## ISO 9001 belgesinde hangi bilgiler yer alır?\n\n" +
      "Bir ISO 9001 belgesi üzerinde tipik olarak şu bilgiler bulunur:\n" +
      "- Belgelendirilen kuruluşun ticari unvanı ve belgeye konu adres bilgileri\n" +
      "- Belgelendirme kapsamı; yani hangi faaliyet, ürün ve hizmetlerin sistem kapsamında olduğu\n" +
      "- Uygulanan standart ve sürümü (ISO 9001:2015)\n" +
      "- Belge numarası, ilk yayın tarihi, revizyon bilgisi ve geçerlilik tarihi\n" +
      "- Belgeyi düzenleyen belgelendirme kuruluşunun adı ve imza/onay bilgisi\n\n" +
      "Kapsam ifadesinin nasıl belirlendiği, belgenin hangi faaliyetleri kapsadığını doğrudan etkiler; ayrıntı için [belgelendirme kapsamı nasıl belirlenir](/blog/belgelendirme-kapsami-nasil-belirlenir) yazımıza bakabilirsiniz.\n\n" +
      "## ISO 9001 belgesi kaç yıl geçerlidir?\n\n" +
      "ISO 9001 belgesinin geçerlilik süresi üç yıldır. Bu süre boyunca kuruluş, planlanan aralıklarla gözetim tetkiklerine tabi tutulur; üçüncü yılın sonunda ise yeniden belgelendirme tetkiki yapılır. Gözetim tetkiklerinin nasıl işlediği için [gözetim tetkiki nedir](/blog/gozetim-tetkiki-nedir), yenileme süreci için [ISO belgesi geçerliliği ve yenileme](/blog/iso-belgesi-gecerlilik-ve-yenileme) yazımıza bakabilirsiniz.\n\n" +
      "## ISO 9001 belgesi nasıl doğrulanır?\n\n" +
      "Bir ISO 9001 belgesinin geçerli olup olmadığı, belgeyi düzenleyen belgelendirme kuruluşunun sorgulama sistemi üzerinden teyit edilir. DVN Cert tarafından düzenlenen belgeler [sertifika sorgulama](/sertifika-sorgula) sayfamızdan sorgulanabilir.\n\n" +
      "## ISO 9001 belgesi askıya alınabilir mi?\n\n" +
      "Evet. Gözetim tetkikinin zamanında yapılmaması, tespit edilen uygunsuzlukların kapatılmaması veya belgelendirme kurallarına aykırı kullanım gibi durumlarda belge askıya alınabilir, kapsamı daraltılabilir veya geri çekilebilir. Askı süresince kuruluş, belgeye ve belgelendirme markasına atıf yapan tüm kullanımları durdurmakla yükümlüdür. Belgelendirme kurallarının tamamına [dokümanlar](/dokumanlar) sayfamızdaki Belgelendirme Kuralları Talimatı üzerinden ulaşabilirsiniz.\n\n" +
      "## Belgelendirme kuruluşunun rolü\n\n" +
      "Kalite yönetim sisteminin kurulması ve uygulanması kuruluşun kendi sorumluluğundadır. Belgelendirme kuruluşları, ISO/IEC 17021-1 gereği belgelendirdikleri kuruluşlara sistemin nasıl kurulacağına dair danışmanlık veremez; görevi, kurulan sistemi bağımsız ve tarafsız biçimde tetkik ederek standardın şartlarının karşılanıp karşılanmadığını değerlendirmektir.\n\n" +
      "ISO 9001 belgesi başvurusu ve kapsam değerlendirmesi için [ISO 9001 belgelendirme hizmetimizi](/hizmetler/iso-9001) inceleyebilir; birden fazla standardın birlikte belgelendirilmesi için [sistem belgelendirme hizmetimize](/hizmetler/sistem-belgelendirme) bakabilirsiniz.",
    ilgiliHizmetler: ["iso-9001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-45001-belgesi",
    baslik: "ISO 45001 Belgesi: Kimler Alabilir, Belge Neyi Gösterir?",
    ozet:
      "ISO 45001 belgesi, iş sağlığı ve güvenliği yönetim sisteminizin standarda uygunluğunu gösterir. Kapsamını, geçerliliğini ve doğrulanmasını açıklıyoruz.",
    tarih: "2026-08-07",
    kategori: "Yönetim Sistemleri",
    icerik:
      "ISO 45001 belgesi, bir kuruluşun iş sağlığı ve güvenliği (İSG) yönetim sisteminin ISO 45001:2018 standardının şartlarını karşıladığının bağımsız biçimde doğrulandığını gösteren sertifikadır. Bu yazıda belgeyi kimlerin alabileceğini, belgenin neyi gösterip neyi göstermediğini ve geçerliliğinin nasıl sürdürüldüğünü ele alıyoruz. Belgelendirme sürecinin adımları için [ISO 45001 belgelendirme](/blog/iso-45001-belgelendirme-is-sagligi-guvenligi) yazımızı inceleyebilirsiniz.\n\n" +
      "## ISO 45001 belgesi nedir?\n\n" +
      "ISO 45001 belgesi, kuruluşun çalışanlarının ve faaliyetlerinden etkilenen diğer kişilerin sağlık ve güvenliğini korumak amacıyla kurduğu yönetim sisteminin standarda uygun bulunduğunu gösterir. Standart; tehlikelerin belirlenmesi, risklerin değerlendirilmesi, kontrollerin uygulanması, çalışan katılımı ve performansın izlenmesi gibi şartları içerir.\n\n" +
      "## ISO 45001 belgesini kimler alabilir?\n\n" +
      "Standart, sektör ve ölçek ayrımı yapmaz; çalışanı olan her kuruluş ISO 45001 belgesi başvurusunda bulunabilir. Uygulamada belge; imalat, inşaat, lojistik, enerji ve hizmet sektörlerindeki kuruluşlar tarafından yaygın biçimde talep edilir. Küçük ölçekli kuruluşlarda sistem daha az dokümantasyonla yürütülebilir; ancak tehlike tanımlama, risk değerlendirme ve çalışan katılımı gibi şartlarda ölçeğe bağlı istisna tanınmaz.\n\n" +
      "## ISO 45001 belgesi yasal yükümlülüklerin yerine geçer mi?\n\n" +
      "Hayır. ISO 45001 belgesi, iş sağlığı ve güvenliği mevzuatından doğan yükümlülüklerin yerine geçmez ve bunların yerine getirildiğini garanti etmez. Standart, kuruluşun uymakla yükümlü olduğu yasal şartları belirlemesini ve bunlara uyumu izlemesini şart koşar; ancak mevzuata uyumun sorumluluğu her durumda kuruluşa aittir. Belge, sistemin standart şartlarını karşıladığını gösterir; tek tek olayların veya kazaların yaşanmayacağını taahhüt etmez.\n\n" +
      "## ISO 45001 belgesinde hangi bilgiler yer alır?\n\n" +
      "- Belgelendirilen kuruluşun unvanı ve belgeye konu adresleri\n" +
      "- İSG yönetim sisteminin kapsamı ve kapsanan faaliyetler\n" +
      "- Uygulanan standart ve sürümü (ISO 45001:2018)\n" +
      "- Belge numarası, yayın tarihi, revizyon bilgisi ve geçerlilik tarihi\n" +
      "- Belgeyi düzenleyen belgelendirme kuruluşunun adı ve imza/onay bilgisi\n\n" +
      "## ISO 45001 belgesinin geçerliliği nasıl sürdürülür?\n\n" +
      "Belgenin geçerlilik süresi üç yıldır. Bu süre içinde planlanan gözetim tetkikleriyle sistemin işlerliği doğrulanır; üçüncü yılın sonunda yeniden belgelendirme tetkiki yapılır. Tetkik süresi; çalışan sayısı, saha sayısı ve faaliyetin risk düzeyi gibi kriterlere göre belirlenir. Ayrıntılar için [gözetim tetkiki nedir](/blog/gozetim-tetkiki-nedir) yazımıza bakabilirsiniz.\n\n" +
      "## ISO 45001 belgesi nasıl doğrulanır?\n\n" +
      "Belgenin güncel durumu, belgeyi düzenleyen kuruluşun sorgulama sistemi üzerinden teyit edilir. DVN Cert belgeleri için [sertifika sorgulama](/sertifika-sorgula) sayfamızı kullanabilirsiniz.\n\n" +
      "## ISO 45001 belgesi ile diğer standartların birlikte belgelendirilmesi\n\n" +
      "ISO 45001; ISO 9001 ve ISO 14001 ile ortak bir üst yapıyı paylaşır. Bu nedenle birden fazla standart tek bir entegre yönetim sistemi altında ve birleşik bir tetkik programıyla belgelendirilebilir; bu yaklaşım toplam tetkik süresini ve tekrar eden faaliyetleri azaltır. Konu hakkında [entegre yönetim sistemi nedir](/blog/entegre-yonetim-sistemi-nedir) yazımıza bakabilirsiniz.\n\n" +
      "ISO 45001 belgesi başvurusu için [ISO 45001 belgelendirme hizmetimizi](/hizmetler/iso-45001) inceleyebilir; İSG yetkinliğini artırmak isteyen ekipler için genel katılıma açık [eğitim programlarımıza](/egitimler) göz atabilirsiniz.",
    ilgiliHizmetler: ["iso-45001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-14001-belgesi",
    baslik: "ISO 14001 Belgesi: Kapsam, Geçerlilik ve 2026 Sürümüne Geçiş",
    ozet:
      "ISO 14001 belgesi, çevre yönetim sisteminizin standarda uygun olduğunu gösterir. Kapsam, geçerlilik süresi, doğrulama ve 2026 geçişini açıklıyoruz.",
    tarih: "2026-08-07",
    kategori: "Yönetim Sistemleri",
    icerik:
      "ISO 14001 belgesi, bir kuruluşun çevre yönetim sisteminin ISO 14001 standardının şartlarını karşıladığının bağımsız bir belgelendirme kuruluşu tarafından doğrulandığını gösteren sertifikadır. Bu yazıda belgenin kapsamını, geçerliliğini, nasıl doğrulandığını ve yeni sürüme geçişte belgelerin durumunu ele alıyoruz. Sürecin adımları için [ISO 14001 belgelendirme](/blog/iso-14001-belgelendirme-cevre-yonetim-sistemi) yazımızı inceleyebilirsiniz.\n\n" +
      "## ISO 14001 belgesi nedir?\n\n" +
      "ISO 14001 belgesi, kuruluşun faaliyet, ürün ve hizmetlerinden kaynaklanan çevresel etkileri sistematik biçimde yönettiğini gösterir. Standart; çevre boyutlarının belirlenmesi, uyulması gereken yasal şartların tanımlanması, çevresel amaçların konulması ve performansın izlenmesi gibi şartları içerir. Belge, çevresel performansın belirli bir seviyede olduğunu değil, bu performansı yönetecek sistemin kurulduğunu ve uygulandığını gösterir.\n\n" +
      "## ISO 14001 belgesinin kapsamı ne anlama gelir?\n\n" +
      "Kapsam; belgenin hangi faaliyetleri, ürün ve hizmetleri ve hangi lokasyonları kapsadığını tanımlar. Kapsam dışında kalan bölüm, bağlı kuruluş veya iştiraklerde belgeye atıf yapılamaz. Birden fazla sahası olan kuruluşlarda kapsam, örnekleme yaklaşımıyla birlikte değerlendirilir; ayrıntı için [çok sahalı belgelendirme](/blog/cok-sahali-belgelendirme) yazımıza bakabilirsiniz.\n\n" +
      "## ISO 14001 belgesinde hangi bilgiler yer alır?\n\n" +
      "- Kuruluşun unvanı ve belgeye konu adresleri\n" +
      "- Çevre yönetim sisteminin kapsamı\n" +
      "- Uygulanan standart ve sürümü\n" +
      "- Belge numarası, yayın tarihi, revizyon bilgisi ve geçerlilik tarihi\n" +
      "- Belgeyi düzenleyen belgelendirme kuruluşunun adı ve imza/onay bilgisi\n\n" +
      "## ISO 14001:2026 geçişinde mevcut belgeler ne olacak?\n\n" +
      "ISO 14001'in yeni sürümü 2026 yılında yayımlandı ve önceki sürüme göre düzenlenmiş belgeler için bir geçiş süresi öngörüldü. Geçiş süresi sonunda eski sürüme göre düzenlenmiş belgeler geçerliliğini yitirir; kuruluşlar bu süre içinde geçiş tetkikini tamamlayarak belgelerini yeni sürüme taşımalıdır. Geçiş takvimi ve değişikliklerin ayrıntısı için [ISO 14001:2026 yayımlandı: ne değişti, geçiş süresi ne kadar](/blog/iso-14001-2026-degisiklikler-ve-gecis) yazımızı inceleyebilirsiniz.\n\n" +
      "## ISO 14001 belgesi kaç yıl geçerlidir?\n\n" +
      "Belgenin geçerlilik süresi üç yıldır. Bu süre boyunca gözetim tetkikleri yapılır ve üçüncü yılın sonunda yeniden belgelendirme tetkiki gerçekleştirilir. Belge süresinin dolması, askıya alınması veya geri çekilmesi durumunda kuruluş belgeye ve belgelendirme markasına atıf yapan kullanımları durdurmakla yükümlüdür.\n\n" +
      "## ISO 14001 belgesi nasıl doğrulanır?\n\n" +
      "Belgenin güncel durumu, belgeyi düzenleyen kuruluşun sorgulama sistemi üzerinden teyit edilir. DVN Cert tarafından düzenlenen belgeler için [sertifika sorgulama](/sertifika-sorgula) sayfamızı kullanabilirsiniz.\n\n" +
      "## ISO 9001 ile birlikte belgelendirme\n\n" +
      "ISO 14001, ISO 9001 ile ortak bir yapıyı paylaşır ve iki standart tek bir entegre sistem altında birlikte belgelendirilebilir. İki standardın odak farkı için [ISO 9001 ve ISO 14001 farkı](/blog/iso-9001-ve-iso-14001-farki) yazımıza bakabilirsiniz.\n\n" +
      "ISO 14001 belgesi başvurusu, geçiş tetkiki planlaması veya kapsam değerlendirmesi için [ISO 14001 belgelendirme hizmetimizi](/hizmetler/iso-14001) inceleyebilirsiniz.",
    ilgiliHizmetler: ["iso-14001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-50001-belgesi",
    baslik: "ISO 50001 Belgesi: Enerji Yönetim Sistemi Belgesi Nedir?",
    ozet:
      "ISO 50001 belgesi, enerji yönetim sisteminizin standarda uygunluğunu gösterir. Kapsamı, enerji performansı şartını, tetkik süresini ve doğrulamayı açıklıyoruz.",
    tarih: "2026-08-06",
    kategori: "Yönetim Sistemleri",
    icerik:
      "ISO 50001 belgesi, bir kuruluşun enerji yönetim sisteminin ISO 50001:2018 standardının şartlarını karşıladığının bağımsız biçimde doğrulandığını gösteren sertifikadır. Bu yazıda belgenin diğer yönetim sistemi belgelerinden ayrılan yönlerini, geçerliliğini ve doğrulanmasını ele alıyoruz. Belgelendirme sürecinin adımları için [ISO 50001 belgelendirme](/blog/iso-50001-belgelendirme-enerji-yonetim-sistemi) yazımızı inceleyebilirsiniz.\n\n" +
      "## ISO 50001 belgesi nedir?\n\n" +
      "ISO 50001 belgesi, kuruluşun enerji kullanımını ve tüketimini sistematik biçimde yönettiğini; enerji performansını izlemek, ölçmek ve iyileştirmek için gerekli yapıyı kurduğunu gösterir. Standart; enerji gözden geçirmesi, enerji performans göstergeleri, enerji esas çizgisi ve enerji hedefleri gibi kendine özgü şartlar içerir.\n\n" +
      "## ISO 50001 belgesini diğer belgelerden ayıran nedir?\n\n" +
      "ISO 50001, yönetim sistemi standartları arasında enerji performansının sürekli iyileştirilmesini doğrudan şart koşan standarttır. Tetkikte yalnızca sistemin kurulmuş olması değil; enerji verilerinin toplanması, performans göstergelerinin izlenmesi ve iyileşmenin kanıtlanabilir olması da değerlendirilir. Bu nedenle enerji verilerinin doğruluğu ve ölçüm altyapısı, tetkikin önemli bir parçasıdır.\n\n" +
      "## ISO 50001 tetkik süresi nasıl belirlenir?\n\n" +
      "Enerji yönetim sistemi belgelendirmesinde tetkik süresi, ISO 50003 standardının kuralları çerçevesinde hesaplanır. Sürede; kuruluşun toplam enerji tüketimi, enerji kaynaklarının çeşitliliği, önemli enerji kullanım alanlarının sayısı ve saha sayısı gibi kriterler dikkate alınır. Bu kriterler, benzer büyüklükteki kuruluşlarda dahi farklı tetkik süreleri ortaya çıkmasına neden olabilir.\n\n" +
      "## ISO 50001 belgesinde hangi bilgiler yer alır?\n\n" +
      "- Kuruluşun unvanı ve belgeye konu adresleri\n" +
      "- Enerji yönetim sisteminin kapsamı ve sınırları\n" +
      "- Uygulanan standart ve sürümü (ISO 50001:2018)\n" +
      "- Belge numarası, yayın tarihi, revizyon bilgisi ve geçerlilik tarihi\n" +
      "- Belgeyi düzenleyen belgelendirme kuruluşunun adı ve imza/onay bilgisi\n\n" +
      "## ISO 50001 belgesi zorunlu mudur?\n\n" +
      "ISO 50001 belgelendirmesi gönüllülük esasına dayanır. Bununla birlikte kamu programları, ihale şartnameleri, müşteri sözleşmeleri veya destek mekanizmaları belge talep edebilir; kuruluşunuz açısından bağlayıcı bir şart olup olmadığını ilgili mevzuat ve sözleşme hükümleri üzerinden teyit etmeniz gerekir.\n\n" +
      "## ISO 50001 belgesinin geçerliliği ve doğrulanması\n\n" +
      "Belgenin geçerlilik süresi üç yıldır; bu süre boyunca gözetim tetkikleri yapılır ve üçüncü yılın sonunda yeniden belgelendirme tetkiki gerçekleştirilir. Belgenin güncel durumu, belgeyi düzenleyen kuruluşun sorgulama sistemi üzerinden teyit edilir; DVN Cert belgeleri için [sertifika sorgulama](/sertifika-sorgula) sayfamızı kullanabilirsiniz.\n\n" +
      "ISO 50001 belgesi başvurusu ve tetkik süresi değerlendirmesi için [ISO 50001 belgelendirme hizmetimizi](/hizmetler/iso-50001) inceleyebilir; birden fazla standardın birlikte belgelendirilmesi için [sistem belgelendirme hizmetimize](/hizmetler/sistem-belgelendirme) bakabilirsiniz.",
    ilgiliHizmetler: ["iso-50001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-9001-kobiler-icin",
    baslik:
      "ISO 9001 KOBİ'ler İçin Ne Anlama Gelir? Küçük ve Orta Ölçekli İşletmelerde Belgelendirme",
    ozet:
      "ISO 9001 standardı kuruluş büyüklüğüne göre bir asgari şart içermez. KOBİ'lerde belgelendirme kapsamı, tetkik süresi ve yaygın yanlış anlamaları ele alıyoruz.",
    tarih: "2026-08-04",
    kategori: "Yönetim Sistemleri",
    icerik:
      "Küçük ve orta ölçekli işletmeler (KOBİ), ISO 9001 belgelendirmesini genellikle büyük kuruluşlara özgü bir süreç olarak görme eğilimindedir. Oysa ISO 9001:2015 standardı, kuruluş büyüklüğüne veya sektörüne dair herhangi bir asgari şart içermez; standart, her ölçekteki kuruluşun kendi yapısına uyarlayabileceği bir kalite yönetim sistemi çerçevesi sunar.\n\n" +
      "## ISO 9001 yalnızca büyük kuruluşlar için mi?\n\n" +
      "Hayır. ISO 9001, kuruluşun çalışan sayısına, cirosuna veya sektörüne bakmaksızın uygulanabilecek şekilde tasarlanmıştır. Standardın şartları; süreçlerin tanımlanması, sorumlulukların netleştirilmesi ve performansın izlenmesi gibi ilkeler etrafında kurulur. Bu ilkeler on kişilik bir işletmede de yüzlerce çalışanı olan bir kuruluşta da aynı şekilde geçerlidir. Fark, sistemin ne kadar karmaşık dokümantasyon ve kaç ayrı rol ile yürütüldüğündedir; standart bu ayrıntıyı kuruluşun kendi yapısına bırakır.\n\n" +
      "## KOBİ'lerde belgelendirme kapsamı nasıl belirlenir?\n\n" +
      "Belgelendirme kapsamı, kuruluşun büyüklüğünden bağımsız olarak; sunulan ürün ve hizmetler, faaliyet gösterilen lokasyon ve standardın uygulanabilir maddeleri esas alınarak tanımlanır. Küçük ölçekli bir işletmede kapsam genellikle tek bir lokasyon ve dar bir ürün/hizmet grubuyla sınırlı olduğu için kapsam ifadesi de buna paralel olarak daha dar tutulur. Kapsamın nasıl belirlendiği hakkında ayrıntılı bilgi için [belgelendirme kapsamı nasıl belirlenir](/blog/belgelendirme-kapsami-nasil-belirlenir) yazımızı inceleyebilirsiniz.\n\n" +
      "## Tetkik süresi kuruluş büyüklüğüne göre değişir mi?\n\n" +
      "Evet. Tetkik süresi; çalışan sayısı, süreç karmaşıklığı, faaliyet gösterilen alan sayısı ve ilgili risk düzeyi gibi kriterlere göre hesaplanır. Bu nedenle küçük ölçekli bir kuruluşun tetkik süresi, benzer kapsamdaki büyük bir kuruluşa kıyasla genellikle daha kısadır. Tetkik süresinin hesaplanması, belgelendirme kuruluşunun ilgili standart ve kurallara göre yürüttüğü standart bir uygulamadır.\n\n" +
      "## İç tetkik ve yönetimin gözden geçirmesi KOBİ'ler için de geçerli mi?\n\n" +
      "Evet. Standart, iç tetkik ve yönetimin gözden geçirmesi şartlarında kuruluş büyüklüğüne göre bir istisna tanımaz; her belgeli kuruluş, sistemin kendi içinde de düzenli olarak gözden geçirilmesini sağlamakla yükümlüdür. Küçük ölçekli kuruluşlarda bu faaliyetler genellikle daha az kişi tarafından ve daha kısa sürede yürütülür; ancak faaliyetin kendisi atlanamaz. İç tetkik yetkinliği hakkında genel bilgi için genel katılıma açık [ISO 9001 iç tetkikçi eğitimi](/egitimler/iso-9001-ic-tetkikci-egitimi) sayfamızı inceleyebilirsiniz.\n\n" +
      "## KOBİ'lerde yaygın yanlış anlamalar\n\n" +
      "- ISO 9001'in yalnızca imalat sektöründeki büyük fabrikalar için geçerli olduğu düşüncesi; standart hizmet sektöründeki işletmeler dahil her sektöre uygulanabilir\n" +
      "- Belgelendirmenin ağır bir dokümantasyon yükü getireceği düşüncesi; standart, dokümante bilginin kapsamını kuruluşun büyüklüğüne ve süreç karmaşıklığına göre belirlemesine izin verir\n" +
      "- Küçük bir kuruluşta bir çalışanın birden fazla rolü üstlenemeyeceği düşüncesi; standart görevler ayrılığını değil, sorumlulukların açık biçimde tanımlanmasını şart koşar\n" +
      "- Belgelendirmenin yalnızca ihale şartı olduğu, başka bir faydası olmadığı düşüncesi; sistematik süreç yönetimi ihale dışında da izlenebilirlik ve tutarlılık sağlar\n\n" +
      "## Yönetim sisteminin kurulması ve belgelendirme kuruluşunun rolü\n\n" +
      "Kalite yönetim sisteminin kurulması ve uygulanması, kuruluş büyüklüğünden bağımsız olarak kuruluşun kendi sorumluluğundadır. Belgelendirme kuruluşunun rolü, kurulan sistemi bağımsız ve tarafsız biçimde tetkik ederek standardın şartlarını karşılayıp karşılamadığını değerlendirmektir. ISO/IEC 17021-1 gereği belgelendirme kuruluşları, belgelendirdikleri kuruluşlara sistemin nasıl kurulacağına dair danışmanlık veremez; bu ayrım KOBİ'ler için de büyük kuruluşlar için olduğu kadar geçerlidir. ISO 9001 belgelendirme sürecinin adımları için [ISO 9001 belgelendirme nedir ve nasıl alınır](/blog/iso-9001-belgelendirme-nedir-nasil-alinir) yazımızı inceleyebilirsiniz.\n\n" +
      "ISO 9001 belgelendirme başvurusu için [ISO 9001 belgelendirme hizmetimizi](/hizmetler/iso-9001) inceleyebilir; sistemin genel belgelendirme süreci için [sistem belgelendirme hizmetimizi](/hizmetler/sistem-belgelendirme) ziyaret edebilirsiniz.",
    ilgiliHizmetler: ["iso-9001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-14001-2026-degisiklikler-ve-gecis",
    baslik:
      "ISO 14001:2026 Yayımlandı: Ne Değişti, Geçiş Süresi Ne Kadar?",
    ozet:
      "ISO 14001:2026, 15 Nisan 2026'da yayımlandı. Yeni sürümdeki değişiklikleri, üç yıllık geçiş takvimini ve kuruluşların atması gereken adımları açıklıyoruz.",
    tarih: "2026-07-31",
    kategori: "Yönetim Sistemleri",
    icerik:
      "Çevre yönetim sistemi standardı ISO 14001, on bir yıl aradan sonra revize edildi. ISO 14001:2026, 15 Nisan 2026 tarihinde yayımlanarak ISO 14001:2015'in yerini aldı. Bu yazıda yeni sürümde nelerin değiştiğini, geçiş süresinin ne kadar olduğunu ve belgeli kuruluşların hangi adımları izlemesi gerektiğini ele alıyoruz.\n\n" +
      "## ISO 14001:2026 ne zaman yayımlandı?\n\n" +
      "Standardın nihai taslağı (FDIS) Ocak 2026'da paylaşılmış, nihai metin ise 15 Nisan 2026 tarihinde yayımlanmıştır. Yeni sürüm, 2024 yılında ISO 14001:2015'e eklenen iklim değişikliği tadilini de içermekte ve standardı ISO'nun güncel Uyumlaştırılmış Yapısı (Harmonized Structure) ile hizalamaktadır.\n\n" +
      "## Geçiş süresi ne kadar?\n\n" +
      "ISO 14001:2015'ten ISO 14001:2026'ya geçiş için üç yıllık bir süre öngörülmüştür. Geçiş takviminin ana hatları şöyledir:\n\n" +
      "- 15 Nisan 2026 — ISO 14001:2026 yayımlandı; geçiş süresi başladı\n" +
      "- 2026 ikinci yarısı — Belgelendirme kuruluşlarının yeni sürüme göre tetkik yapabilir hâle gelmesi\n" +
      "- 2027 sonbaharı — ISO 14001:2015'e göre yeni ilk belgelendirme yapılmasının sona ermesinin beklendiği dönem (geçişin son 18 ayı)\n" +
      "- Nisan 2029 — Geçiş süresinin sonu; bu tarihten sonra ISO 14001:2015 sertifikaları geçerliliğini yitirir\n\n" +
      "Geçiş kurallarının bağlayıcı kaynağı, ISO tarafından yayımlanan standart metni ile ilgili uluslararası geçiş dokümanlarıdır. Kesin tarihler ve uygulama ayrıntıları bu dokümanlarla netleşir; kuruluşların planlamayı bu kaynaklar üzerinden teyit etmesi önerilir.\n\n" +
      "## ISO 14001:2026 ile ne değişti?\n\n" +
      "Revizyon, standardın temel mantığını değiştirmemekte; mevcut şartları açıklığa kavuşturmakta ve bazı alanlarda beklentileri genişletmektedir. Öne çıkan değişiklikler şunlardır:\n\n" +
      "### Kuruluş bağlamında çevresel koşullar genişledi\n\n" +
      "Kuruluşun bağlamı belirlenirken yalnızca iklim değişikliği değil; biyoçeşitlilik, ekosistem sağlığı, kirlilik düzeyleri ve doğal kaynakların erişilebilirliği gibi daha geniş bir çevresel koşullar kümesi dikkate alınmalıdır.\n\n" +
      "### Çevresel risk ve fırsatlar ayrıştırıldı\n\n" +
      "Risk ve fırsatlara ilişkin şartlar yeniden düzenlenmiş; çevresel risk ve fırsatlar, genel iş riskinden ayrı biçimde ele alınacak şekilde netleştirilmiştir. Bu düzenleme, çevresel boyutlar ile kurumsal risk yönetimi arasındaki bağın daha anlaşılır kurulmasını amaçlar.\n\n" +
      "### Değişikliklerin yönetimi için ayrı şart\n\n" +
      "Yönetim sistemini etkileyebilecek değişikliklerin belirlenmesi, değerlendirilmesi ve kontrol edilmesi için yapılandırılmış bir yaklaşım beklenmektedir. Yeni tesis, yeni proses, mevzuat değişikliği veya organizasyon değişikliği gibi durumların planlı biçimde ele alınması gerekir.\n\n" +
      "### Yaşam döngüsü bakış açısı değer zincirine yayıldı\n\n" +
      "Çevresel boyutların yalnızca kuruluşun kendi faaliyetlerinde değil, ürün ve hizmetin değer zinciri boyunca değerlendirilmesi beklentisi güçlendirilmiştir.\n\n" +
      "### Operasyonel kontrolün kapsamı genişledi\n\n" +
      "Daha önce \"dış kaynaklı prosesler\" ile sınırlı olan kontrol beklentisi, dışarıdan sağlanan proses, ürün ve hizmetleri kapsayacak biçimde genişletilmiştir. Bu değişiklik, tedarikçi yönetimini çevre yönetim sisteminin daha görünür bir parçası hâline getirir. Tedarikçilerin değerlendirilmesi için [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızı inceleyebilirsiniz.\n\n" +
      "### Liderlik ve iç tetkik beklentileri netleşti\n\n" +
      "Üst yönetimin çevre yönetim sistemini iş stratejisine entegre etmesine ilişkin beklentiler güçlendirilmiş; yönetim kademesi dışındaki rollerin de sistemi desteklemesi vurgulanmıştır. İç tetkiklerde ise kapsam ve kriterlerin yanı sıra tetkik amaçlarının açıkça tanımlanması istenmektedir. İç tetkik yetkinliği için [iç denetçi (iç tetkikçi) eğitimi nedir](/blog/ic-denetci-ic-tetkikci-egitimi-nedir) yazımıza bakabilirsiniz.\n\n" +
      "## Belgeli bir kuruluş geçiş için ne yapmalı?\n\n" +
      "- Standardın yeni sürümünü temin edip mevcut sistemle karşılaştıran bir fark (gap) analizi yapmak\n" +
      "- Kuruluş bağlamı, çevresel koşullar, çevresel risk ve fırsatlar ile değişiklik yönetimi başlıklarında doküman ve süreçleri güncellemek\n" +
      "- Dışarıdan sağlanan proses, ürün ve hizmetlere ilişkin kontrolleri gözden geçirmek\n" +
      "- İç tetkikçileri ve yönetim ekibini yeni şartlar konusunda eğitmek; iç tetkiki yeni sürüme göre yürütmek\n" +
      "- Yönetimin gözden geçirmesinde geçiş hazırlığını değerlendirmek\n" +
      "- Belgelendirme kuruluşuyla geçiş tetkiki planlamasını erkenden yapmak\n\n" +
      "## Geçiş tetkiki nasıl yapılır?\n\n" +
      "Geçiş tetkiki, planlı bir [gözetim tetkiki](/blog/gozetim-tetkiki-nedir) veya yeniden belgelendirme tetkikiyle birlikte ya da ayrı bir tetkik olarak gerçekleştirilebilir; her durumda yeni şartların karşılandığını doğrulamak için ek tetkik süresi gerekir. Tetkik sonunda bulguların değerlendirilmesi ve belgenin yeni sürüme göre düzenlenmesi, tetkik ekibinden bağımsız bir [belgelendirme kararı](/blog/belgelendirme-karari-nasil-verilir) süreciyle sonuçlandırılır.\n\n" +
      "## Geçişi ertelemenin riski nedir?\n\n" +
      "Geçiş süresinin sonuna yaklaşıldıkça, belgelendirme kuruluşlarındaki tetkik kapasitesi ve tetkikçi erişilebilirliği daralır. Geçiş tetkikini süresi içinde tamamlayamayan kuruluşların sertifikası geçerliliğini yitirir; bu durumda belge, geçiş yerine yeni bir ilk belgelendirme süreciyle (Aşama 1 ve Aşama 2 tetkikleri) yeniden alınmak zorunda kalınabilir. Bu nedenle geçişin, planlı tetkik takvimine erkenden yerleştirilmesi önerilir.\n\n" +
      "## Yeni başvurular hangi sürüme göre yapılmalı?\n\n" +
      "Geçiş süresi boyunca her iki sürüme göre belgelendirme mümkün olsa da, yeni başvuran kuruluşların doğrudan ISO 14001:2026'ya göre belgelendirilmesi; kısa süre sonra ikinci bir geçiş tetkiki gerekmemesi açısından daha verimlidir.\n\n" +
      "## Diğer standartlarla entegrasyon\n\n" +
      "ISO 14001:2026, ISO'nun güncel uyumlaştırılmış yapısını izlediği için ISO 9001 ve ISO 45001 ile ortak çatı korunmaktadır. Birden çok standardı birlikte yürüten kuruluşlar geçişi entegre biçimde planlayabilir; ayrıntı için [entegre yönetim sistemi nedir](/blog/entegre-yonetim-sistemi-nedir) yazımıza göz atabilirsiniz. ISO 14001'in kapsamı ve belgelendirme süreci hakkında genel bilgi için [ISO 14001 belgelendirme: çevre yönetim sistemi belgesi](/blog/iso-14001-belgelendirme-cevre-yonetim-sistemi) yazımızı okuyabilirsiniz.\n\n" +
      "ISO 14001 geçişi, yeni belgelendirme başvurusu veya tetkik planlaması için [ISO 14001 belgelendirme hizmetimizi](/hizmetler/iso-14001) inceleyebilirsiniz.",
    ilgiliHizmetler: ["iso-14001", "sistem-belgelendirme"],
  },
  {
    slug: "cok-sahali-belgelendirme",
    baslik:
      "Çok Sahalı (Çok Lokasyonlu) Belgelendirme Nedir? Örnekleme Yaklaşımı Nasıl İşler?",
    ozet:
      "Çok sahalı belgelendirmede örnekleme yaklaşımı, merkezi yönetim sistemi şartı ve gözetim tetkiklerinde saha seçimi nasıl işler? Süreci açıklıyoruz.",
    tarih: "2026-07-27",
    kategori: "Belgelendirme Süreci",
    icerik:
      "Birden fazla şube, tesis veya sahada faaliyet gösteren kuruluşlar için her lokasyonun ayrı ayrı ve tam kapsamlı denetlenmesi her zaman gerekli değildir. Bu gibi durumlarda devreye giren çok sahalı (çok lokasyonlu) belgelendirme yaklaşımı, tek bir sertifika altında birden fazla sahayı örnekleme yoluyla değerlendirmeyi mümkün kılar.\n\n" +
      "## Çok sahalı belgelendirme nedir?\n\n" +
      "Çok sahalı belgelendirme, merkezi olarak yönetilen ve ortak bir yönetim sistemine sahip birden fazla lokasyonun, tek bir belgelendirme sözleşmesi ve tek bir sertifika kapsamında değerlendirilmesidir. Her sahanın ayrı ayrı ve tam kapsamlı denetlenmesi yerine, tetkik ekibi belirli bir örnekleme yöntemiyle sahaların bir kısmını ziyaret eder; kalan sahalar ise sonraki tetkiklerde örnekleme kapsamına dahil edilir.\n\n" +
      "## Hangi kuruluşlar için uygundur?\n\n" +
      "Bu yaklaşım; aynı yönetim sistemi, aynı politika ve prosedürler altında faaliyet gösteren, merkezi bir yönetimin denetlediği zincir mağaza, şube ağı, üretim tesisleri veya bölge ofisleri gibi yapılar için uygundur. Her sahanın kendi başına farklı bir yönetim sistemi uyguladığı veya merkezi kontrolün bulunmadığı durumlarda çok sahalı yaklaşım uygulanamaz; bu sahaların ayrı ayrı belgelendirilmesi gerekir.\n\n" +
      "## Örnekleme yaklaşımı nasıl işler?\n\n" +
      "Tetkik ekibi, tüm sahaları listeleyip risk ve benzerlik durumuna göre bir örnekleme planı hazırlar. Örnekleme; sahaların benzer faaliyet gösterip göstermediği, coğrafi dağılımı, saha sayısı ve geçmiş tetkik sonuçları gibi unsurlar dikkate alınarak belirlenir. Her tetkik döneminde farklı bir saha alt kümesi ziyaret edilir; böylece belgenin geçerlilik süresi boyunca sahaların tamamı zaman içinde örnekleme kapsamına girmiş olur.\n\n" +
      "## Örneklemede dikkate alınan unsurlar\n\n" +
      "- Sahaların aynı yönetim sistemi, politika ve prosedürleri uygulayıp uygulamadığı\n" +
      "- Sahaların benzer faaliyet, ürün veya hizmet sunup sunmadığı\n" +
      "- Saha sayısı, büyüklüğü ve coğrafi dağılımı\n" +
      "- Geçmiş tetkiklerde tespit edilen uygunsuzluklar ve saha bazlı risk seviyesi\n" +
      "- Merkezi yönetimin sahalar üzerindeki kontrol ve izleme etkinliği\n\n" +
      "## Merkezi yönetim sistemi şartı\n\n" +
      "Çok sahalı belgelendirmenin ön koşulu, tüm sahaların ortak bir yönetim sistemi çatısı altında, merkezi olarak planlanan iç tetkik ve yönetim gözden geçirme faaliyetleriyle yönetilmesidir. Merkezi ofis, sahalar arasındaki tutarlılığı sağlamakla ve iç tetkik programının tüm sahaları kapsamasıyla yükümlüdür. Kapsamın ve lokasyonların nasıl tanımlandığı için [belgelendirme kapsamı nasıl belirlenir](/blog/belgelendirme-kapsami-nasil-belirlenir) yazımıza bakabilirsiniz.\n\n" +
      "## Gözetim tetkiklerinde saha seçimi\n\n" +
      "İlk belgelendirme tetkikinde genellikle merkez ofis ve örnekleme yoluyla seçilen bir grup saha ziyaret edilir. Sonraki [gözetim tetkiklerinde](/blog/gozetim-tetkiki-nedir) farklı sahalar örnekleme kapsamına alınarak, belgenin geçerlilik süresi boyunca tüm sahaların zaman içinde denetlenmiş olması hedeflenir. Bir sahada ciddi bir uygunsuzluk tespit edilirse, bu durum diğer sahalar için de ek tetkik gerekliliği doğurabilir.\n\n" +
      "## Sertifikada sahaların gösterilmesi\n\n" +
      "Çok sahalı bir sertifikada, kapsama dahil edilen sahaların listesi genellikle sertifika ekinde veya belgelendirme kuruluşunun sertifika sorgu sisteminde yer alır. Örnekleme yoluyla denetlenen bir sahanın sertifikada yer alması, o sahanın münferiden ayrıca ve tam kapsamlı tetkik edildiği anlamına gelmez; sahanın merkezi yönetim sistemine dahil olduğu ve örnekleme kapsamında değerlendirildiği anlamına gelir.\n\n" +
      "## Çok sahalı belgelendirme ile şube denetimi arasındaki fark\n\n" +
      "Çok sahalı belgelendirme, bağımsız bir belgelendirme kuruluşunun kendi şubelerinizi 3. taraf olarak denetleyip tek bir ISO sertifikası düzenlemesidir. Buna karşılık [şube ve mağaza denetimi](/hizmetler/sube-denetimi), markanızın kendi belirlediği kriterlerle şubelerinizi değerlendirdiği bir denetim hizmetidir ve sonucunda bir sertifika değil, ayrıntılı bir denetim raporu sunulur. İki yaklaşım farklı amaçlara hizmet eder ve birbirinin yerine geçmez.\n\n" +
      "Çok sahalı belgelendirmenin uygunluğu, sahalarınızın yapısına ve yönetim sisteminizin merkezi kontrol düzeyine bağlıdır. Kapsam ve örnekleme yaklaşımının değerlendirilmesi için [sistem belgelendirme hizmetimizi](/hizmetler/sistem-belgelendirme) inceleyebilir.",
    ilgiliHizmetler: ["sistem-belgelendirme", "sube-denetimi"],
  },
  {
    slug: "belgelendirme-karari-nasil-verilir",
    baslik:
      "Belgelendirme Kararı Nasıl Verilir? Bağımsız Karar Verme Süreci Nedir?",
    ozet:
      "Belgelendirme kararı, tetkikten bağımsız bir karar vericinin onayıyla verilir. Yönetim sistemi belgelendirme sürecinde kararın nasıl alındığını açıklıyoruz.",
    tarih: "2026-07-13",
    kategori: "Belgelendirme Süreci",
    icerik:
      "Bir ISO sertifikasının düzenlenmesi, denetimi yürüten tetkikçinin kararı değildir; TS EN ISO/IEC 17021-1 standardı, tetkik sonucunun değerlendirilmesini ve sertifikanın onaylanmasını tetkikten bağımsız, ayrı bir belgelendirme kararı sürecine bağlar. Bu yazıda belgelendirme kararının ne olduğunu, kimin verdiğini ve hangi adımlardan geçtiğini ele alıyoruz.\n\n" +
      "## Belgelendirme kararı nedir?\n\n" +
      "Belgelendirme kararı, bir tetkik sonucunda toplanan bulguların değerlendirilerek kuruluşa sertifika düzenlenip düzenlenmeyeceğine, sertifikanın kapsamına veya devam eden bir belgenin sürdürülüp sürdürülmeyeceğine dair verilen resmi karardır. İlk belgelendirme, gözetim ve yeniden belgelendirme tetkiklerinin her birinin sonunda ayrı bir belgelendirme kararı alınır.\n\n" +
      "## Neden tetkikçiden bağımsız bir karar süreci gerekir?\n\n" +
      "Tetkiki yürüten kişi, tetkik sırasında kuruluşla doğrudan temas kurar; kararın aynı kişi tarafından verilmesi bu nedenle tarafsızlığı zedeleyebilir. ISO/IEC 17021-1 gereği belgelendirme kuruluşları, o tetkike katılmamış, tetkik ekibinden bağımsız bir karar vericinin sertifikasyon kararını onaylamasını sağlamak zorundadır. Bu ayrım, belgenin güvenilirliğinin ve tarafsızlığının temel güvencelerinden biridir.\n\n" +
      "## Belgelendirme kararı süreci nasıl işler?\n\n" +
      "Tetkik tamamlandıktan sonra tetkik ekibi; bulguları, uygunsuzlukları ve varsa düzeltici faaliyetlerin durumunu içeren bir tetkik raporu hazırlar. Bu rapor, tetkike katılmamış bağımsız bir karar vericiye iletilir. Karar verici, raporu ve destekleyici kayıtları inceleyerek sertifikanın düzenlenip düzenlenmeyeceğine karar verir; gerektiğinde ek bilgi veya açıklama talep edebilir.\n\n" +
      "## Karar sürecinde neler değerlendirilir?\n\n" +
      "- Tetkik bulgularının standardın ilgili maddelerine uygun biçimde değerlendirilip değerlendirilmediği\n" +
      "- Tespit edilen uygunsuzlukların kapatılıp kapatılmadığı veya kapatma planının yeterliliği\n" +
      "- Tetkik ekibinin yetkinliğinin ve tarafsızlığının ilgili tetkik için uygun olup olmadığı\n" +
      "- Kapsam ifadesinin tetkik edilen faaliyetlerle tutarlı olup olmadığı\n" +
      "- Önceki tetkiklerden gelen açık konuların, varsa, sonuçlandırılıp sonuçlandırılmadığı\n\n" +
      "## Olumlu ve olumsuz karar durumunda ne olur?\n\n" +
      "Karar olumluysa sertifika düzenlenir veya mevcut belgenin geçerliliği sürdürülür. Bulgular yeterince kapatılmamışsa veya kanıtlar yetersizse karar verici ek bilgi talep edebilir, sertifikayı reddedebilir ya da mevcut bir belgeyi askıya alabilir. Askıya alma ve iptal koşulları hakkında [ISO belgesi geçerlilik ve yenileme](/blog/iso-belgesi-gecerlilik-ve-yenileme) yazımızda bilgi bulabilirsiniz.\n\n" +
      "## Gözetim ve yeniden belgelendirmede karar süreci\n\n" +
      "Aynı bağımsız karar mekanizması, ilk belgelendirmenin yanı sıra her yıllık [gözetim tetkiki](/blog/gozetim-tetkiki-nedir) ve üç yılın sonundaki yeniden belgelendirme tetkiki için de işletilir. Böylece sertifikanın geçerliliği boyunca her aşamada aynı tarafsızlık güvencesi korunur.\n\n" +
      "## Belgelendirme kararının kuruluş için anlamı\n\n" +
      "Belgelendirme kararı sürecinin bağımsızlığı, sertifikanın taşıdığı güvencenin en önemli unsurlarından biridir. Kuruluşlar için bu, tetkik sonucunun tek bir kişinin takdirine değil, yapılandırılmış ve denetlenebilir bir sürece dayandığı anlamına gelir. ISO 9001 belgelendirme sürecinin tüm adımları için [ISO 9001 belgelendirme nedir ve nasıl alınır](/blog/iso-9001-belgelendirme-nedir-nasil-alinir) yazımızı inceleyebilirsiniz.\n\n" +
      "Belgelendirme kararı dahil tüm sürecin nasıl yürütüldüğü için [sistem belgelendirme hizmetimizi](/hizmetler/sistem-belgelendirme) inceleyebilirsiniz.",
    ilgiliHizmetler: ["sistem-belgelendirme", "iso-9001"],
  },
  {
    slug: "gozetim-tetkiki-nedir",
    baslik:
      "Gözetim Tetkiki Nedir? Yıllık Gözetim Denetiminde Neler Değerlendirilir?",
    ozet:
      "Gözetim tetkiki, ISO belgesinin geçerlilik süresince sistemin sürdürüldüğünü doğrulayan yıllık bağımsız denetimdir. Kapsamını ve işleyişini açıklıyoruz.",
    tarih: "2026-07-10",
    kategori: "Belgelendirme Süreci",
    icerik:
      "Bir ISO sertifikası alındıktan sonra süreç bitmez; sertifikanın geçerlilik süresi boyunca yönetim sisteminin sürdürüldüğü, düzenli aralıklarla yapılan gözetim tetkikleriyle bağımsız olarak doğrulanır. Bu yazıda gözetim tetkikinin ne olduğunu, kimin yürüttüğünü, ne sıklıkla yapıldığını ve kapsamını ele alıyoruz.\n\n" +
      "## Gözetim tetkiki nedir?\n\n" +
      "Gözetim tetkiki (surveillance audit), bağımsız bir belgelendirme kuruluşunun; sertifikalandırılmış bir yönetim sisteminin, belgelendirme kararından sonra da standardın gerekliliklerini karşılamaya devam edip etmediğini periyodik olarak değerlendirdiği denetimdir. Belgenin 3 yıllık geçerlilik süresi boyunca gerçekleştirilir ve belgenin sürekli geçerliliğinin ön koşuludur.\n\n" +
      "## Gözetim tetkiki neden yapılır?\n\n" +
      "Bir ISO sertifikası, yalnızca belgelendirme anındaki bir an fotoğrafı değil; sistemin zaman içinde sürdürüldüğüne dair sürekli bir güvencedir. TS EN ISO/IEC 17021-1 standardı, belgelendirme kuruluşlarının bu sürekliliği periyodik tetkiklerle doğrulamasını şart koşar. Gözetim tetkiki olmadan düzenlenen bir belge, zaman içindeki uygunluğu güvence altına almaz; bu nedenle gözetim tetkiki, belgenin taşıdığı güvencenin ayrılmaz bir parçasıdır.\n\n" +
      "## Gözetim tetkikini kim yürütür?\n\n" +
      "Gözetim tetkiki de, ilk belgelendirme tetkikinde olduğu gibi, belgelendirme kuruluşunun görevlendirdiği bağımsız tetkikçiler tarafından yürütülür. Tetkikçilerin tarafsızlığı ve yetkinliği, ilk tetkikte aranan kriterlerle aynıdır. Tetkik sonucunda bulguların değerlendirilmesi ve belgenin geçerliliğinin sürdürülüp sürdürülmeyeceğine ilişkin karar, tetkiki yapan tetkikçiden bağımsız bir belgelendirme kararı sürecine tabidir.\n\n" +
      "## Gözetim tetkikinde neler değerlendirilir?\n\n" +
      "Gözetim tetkiki, sistemin tamamını değil; standardın kritik maddelerini ve önceki tetkiklerde öne çıkan alanları örnekleme yoluyla değerlendirir. Tipik olarak şu başlıklar incelenir:\n\n" +
      "- Bir önceki tetkikte tespit edilen uygunsuzluklara yönelik düzeltici faaliyetlerin durumu\n" +
      "- İç tetkik ve yönetim gözden geçirme faaliyetlerinin gerçekleştirilip gerçekleştirilmediği\n" +
      "- Şikayetler ve bunlara verilen yanıtların yönetimi\n" +
      "- Sistemde hedeflenen amaçlara ulaşılıp ulaşılmadığı ve sürekli iyileştirme faaliyetleri\n" +
      "- Belgelendirme kapsamında, kuruluş yapısında veya mevzuatta meydana gelen değişiklikler\n" +
      "- Belgelendirme markasının ve belgelendirme kuruluşu atıflarının doğru kullanımı\n\n" +
      "## Gözetim tetkiki ile belgelendirme tetkiki arasındaki fark\n\n" +
      "İlk belgelendirme tetkiki, Aşama 1 ve Aşama 2 adımlarıyla sistemin tüm maddelerini kapsamlı biçimde değerlendirir. Gözetim tetkiki ise daha dar kapsamlıdır; sistemin sürdürüldüğünü ve önceki bulguların kapatıldığını doğrulamaya odaklanır, standardın tüm maddelerini yeniden baştan sona incelemez. Aşama 1 ve Aşama 2 tetkiklerinin işleyişi için [belgelendirme denetimine hazırlık](/blog/belgelendirme-denetimine-hazirlik) yazımıza bakabilirsiniz.\n\n" +
      "## Çok lokasyonlu kuruluşlarda gözetim tetkiki\n\n" +
      "Birden fazla şube veya sahada faaliyet gösteren kuruluşlarda gözetim tetkiki, belirlenen örnekleme yaklaşımına göre planlanır; her gözetim tetkikinde farklı lokasyonlar ziyaret edilebilir. Kapsam ve lokasyon örneklemesinin nasıl belirlendiği için [belgelendirme kapsamı nasıl belirlenir](/blog/belgelendirme-kapsami-nasil-belirlenir) yazımıza bakabilirsiniz.\n\n" +
      "## Gözetim tetkiki ne sıklıkla yapılır?\n\n" +
      "Gözetim tetkikleri, sertifikanın 3 yıllık geçerlilik süresi boyunca genellikle yılda bir kez, belgelendirme tarihinden itibaren 12 aylık dönemlerde planlanır. Üçüncü yılın sonunda ise gözetim yerine kapsamı daha geniş bir yeniden belgelendirme tetkiki yapılır. Belge geçerliliği ve yenileme süreci hakkında ayrıntılı bilgi için [ISO belgesi geçerlilik ve yenileme](/blog/iso-belgesi-gecerlilik-ve-yenileme) yazımızı inceleyebilirsiniz.\n\n" +
      "## Gözetim tetkiki sonucunda ne olur?\n\n" +
      "Gözetim tetkikinde uygunsuzluk tespit edilirse, kuruluşun bunlar için düzeltici faaliyet sunması ve belirlenen sürede kapatması gerekir; aksi halde belge askıya alınabilir. Gözetim tetkikinin zamanında yapılmaması veya erişim sağlanmaması da benzer şekilde belgenin askıya alınmasına ya da iptaline yol açabilir. Bu nedenle gözetim tetkiki, yalnızca biçimsel bir formalite değil; belgenin güvenilirliğini sürdüren aktif bir denetim adımıdır.\n\n" +
      "Gözetim tetkikleri dahil tüm belgelendirme sürecinin nasıl işlediği için [sistem belgelendirme hizmetimizi](/hizmetler/sistem-belgelendirme) inceleyebilir; ISO 9001 belgelendirme sürecinin adımları için [ISO 9001 belgelendirme nedir ve nasıl alınır](/blog/iso-9001-belgelendirme-nedir-nasil-alinir) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["sistem-belgelendirme", "iso-9001"],
  },
  {
    slug: "iso-9001-ve-iso-14001-farki",
    baslik: "ISO 9001 ile ISO 14001 Arasındaki Fark Nedir?",
    ozet:
      "ISO 9001 kalite, ISO 14001 çevre yönetim sistemi standardıdır. İki standardın odak noktalarını, ortak yönlerini ve birlikte yürütülme imkanını karşılaştırıyoruz.",
    tarih: "2026-07-06",
    kategori: "Yönetim Sistemleri",
    icerik:
      "ISO 9001 ve ISO 14001, kuruluşların en sık başvurduğu iki yönetim sistemi standardıdır. İkisi de bağımsız bir belgelendirme kuruluşu tarafından denetlenip belgelendirilebilir, ancak odaklandıkları alan farklıdır.\n\n" +
      "## ISO 9001 nedir?\n\n" +
      "ISO 9001, bir kuruluşun ürün ve hizmetlerini müşteri ve yasal gerekliliklere uygun, tutarlı biçimde sunma yeteneğini güvence altına alan kalite yönetim sistemi standardıdır. Odak noktası; süreç kontrolü, müşteri memnuniyeti ve sürekli iyileştirmedir.\n\n" +
      "## ISO 14001 nedir?\n\n" +
      "ISO 14001 ise bir kuruluşun faaliyet, ürün ve hizmetlerinden kaynaklanan çevresel etkileri sistematik biçimde yönetmesini sağlayan çevre yönetim sistemi standardıdır. Odak noktası; çevresel etkilerin belirlenmesi, yasal uyum ve çevresel performansın sürekli iyileştirilmesidir.\n\n" +
      "## Odak noktası farkı\n\n" +
      "- ISO 9001: ürün/hizmet kalitesi, müşteri memnuniyeti ve süreç verimliliği\n" +
      "- ISO 14001: çevresel etki, kaynak kullanımı ve çevre mevzuatına uyum\n" +
      "- ISO 9001'de \"ilgili taraf\" öncelikli olarak müşteridir; ISO 14001'de ise çevre ve toplum daha belirgin bir ilgili taraf grubudur\n\n" +
      "## Ortak yönler: Annex SL yapısı\n\n" +
      "Her iki standart da Annex SL adı verilen ortak üst yapıyı (High Level Structure) kullanır. Bu nedenle kuruluşun bağlamı, liderlik, planlama, destek, operasyon, performans değerlendirme ve iyileştirme gibi ana madde başlıkları her iki standartta da aynı sırayla yer alır. Bu ortak yapı, iki sistemin bütünleşik biçimde yürütülmesini kolaylaştırır.\n\n" +
      "## Hangi kuruluşlar ikisini birlikte yürütür?\n\n" +
      "Özellikle üretim, inşaat, enerji ve kimya gibi çevresel etkisi belirgin sektörlerdeki kuruluşlar, kalite ve çevre yönetimini birlikte ele almayı tercih eder. Bu sayede doküman yönetimi, iç tetkik ve yönetim gözden geçirme gibi ortak süreçler tek elden yürütülebilir.\n\n" +
      "## Birlikte belgelendirme mümkün mü?\n\n" +
      "Evet; iki standart ortak yapıları sayesinde tek bir entegre yönetim sistemi çatısı altında birleştirilebilir ve tek bir denetim programıyla belgelendirilebilir. Entegrasyonun nasıl işlediği için [entegre yönetim sistemi nedir](/blog/entegre-yonetim-sistemi-nedir) yazımıza bakabilirsiniz.\n\n" +
      "ISO 9001 belgelendirme süreci için [ISO 9001 belgelendirme nedir ve nasıl alınır](/blog/iso-9001-belgelendirme-nedir-nasil-alinir) yazımızı, ISO 14001 için [ISO 14001 belgelendirme: çevre yönetim sistemi belgesi](/blog/iso-14001-belgelendirme-cevre-yonetim-sistemi) yazımızı inceleyebilirsiniz. Her iki standardın belgelendirme başvurusu için [ISO 9001 belgelendirme hizmetimizi](/hizmetler/iso-9001) ve [ISO 14001 belgelendirme hizmetimizi](/hizmetler/iso-14001) ziyaret edebilirsiniz.",
    ilgiliHizmetler: ["iso-9001", "iso-14001", "sistem-belgelendirme"],
  },
  {
    slug: "belgelendirme-kapsami-nasil-belirlenir",
    baslik: "Belgelendirme Kapsamı Nasıl Belirlenir?",
    ozet:
      "Belgelendirme kapsamı, bir ISO sertifikasının sınırlarını tanımlar. Yönetim sistemi belgelendirme sürecinde kapsamın nasıl belirlendiğini açıklıyoruz.",
    tarih: "2026-07-05",
    kategori: "Belgelendirme Süreci",
    icerik:
      "Bir ISO sertifikasının üzerinde yer alan kapsam ifadesi, belgenin tam olarak neyi kapsadığını ve hangi faaliyetler için geçerli olduğunu gösterir. Belgelendirme kapsamının doğru belirlenmesi, hem denetimin sağlıklı planlanması hem de belgenin güvenilirliği açısından kritik bir adımdır.\n\n" +
      "## Belgelendirme kapsamı nedir?\n\n" +
      "Belgelendirme kapsamı, bir yönetim sistemi sertifikasının hangi faaliyet, ürün, hizmet, lokasyon ve süreçleri içerdiğini tanımlayan resmi ifadedir. Sertifika üzerinde yer alır ve belgenin geçerli olduğu sınırları netleştirir. Örneğin bir üretim kuruluşu için kapsam; üretilen ürün grupları, üretim tesisleri ve varsa ilgili destek süreçleriyle sınırlı olarak tanımlanabilir.\n\n" +
      "## Kapsam neden önemlidir?\n\n" +
      "Kapsam ifadesi net değilse, belgeyi inceleyen üçüncü taraflar (müşteriler, ihale makamları, tedarik zinciri ortakları) sertifikanın kendi ihtiyaçlarını karşılayıp karşılamadığını doğru değerlendiremez. Ayrıca kapsam dışı bırakılan faaliyetler için belgenin bir güvence sunmadığı da açıkça anlaşılmalıdır. Bu nedenle kapsam; ne çok dar ne de gerçek faaliyetleri aşacak kadar geniş tanımlanmalıdır.\n\n" +
      "## Kapsam belirlerken dikkate alınan unsurlar\n\n" +
      "- Kuruluşun sunduğu ürün ve hizmetlerin türü ve çeşitliliği\n" +
      "- Faaliyetin yürütüldüğü lokasyon veya lokasyonlar\n" +
      "- Standardın kuruluşa uygulanabilir olan ve olmayan maddeleri (ör. ISO 9001'de tasarım ve geliştirme maddesinin hariç tutulabilmesi)\n" +
      "- Dış kaynaklı (outsource) süreçlerin sisteme dahil edilip edilmeyeceği\n" +
      "- Yasal ve düzenleyici gerekliliklerin kapsam üzerindeki etkisi\n\n" +
      "## Kapsamın belirlenme süreci\n\n" +
      "Kapsam, başvuru aşamasında kuruluş tarafından tanımlanır ve belgelendirme kuruluşu tarafından aşama 1 tetkikinde gözden geçirilir. Tanımlanan kapsamın standardın gerekliliklerine ve kuruluşun fiilen yürüttüğü faaliyetlere uygun olup olmadığı bu aşamada değerlendirilir; gerekirse kapsam ifadesinde netleştirme istenir. Aşama 1 ve aşama 2 tetkiklerinin nasıl işlediğini [belgelendirme denetimine hazırlık](/blog/belgelendirme-denetimine-hazirlik) yazımızda ele aldık.\n\n" +
      "## Çok lokasyonlu kuruluşlarda kapsam\n\n" +
      "Birden fazla şube, tesis veya saha üzerinden faaliyet gösteren kuruluşlarda kapsamın; tüm lokasyonları mı yoksa belirli bir örnekleme yaklaşımıyla mı değerlendirileceği ayrıca netleştirilir. Bu durumlarda hangi lokasyonların sertifikada adlandırılacağı, hangilerinin örnekleme yoluyla denetleneceği önceden tanımlanır.\n\n" +
      "## Kapsam değişebilir mi?\n\n" +
      "Kuruluşun faaliyet alanı zamanla genişleyebilir veya daralabilir. Böyle durumlarda kapsam güncellemesi talep edilebilir; belgelendirme kuruluşu, kapsam değişikliğinin etkisini değerlendirerek ek bir denetim gerekip gerekmediğine karar verir. Kapsam değişikliği, mevcut sertifikanın geçerlilik süresini etkilemez ancak belge üzerinde güncellenir.\n\n" +
      "Belgelendirme kapsamının netleştirilmesi, sürecin ilk ve en önemli adımlarından biridir. Kapsam belirleme dahil tüm belgelendirme sürecinin işleyişi için [sistem belgelendirme hizmetimizi](/hizmetler/sistem-belgelendirme) inceleyebilir; ISO 9001 belgelendirme sürecinin ayrıntıları için [ISO 9001 belgelendirme nedir ve nasıl alınır](/blog/iso-9001-belgelendirme-nedir-nasil-alinir) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["sistem-belgelendirme", "iso-9001"],
  },
  {
    slug: "iso-9001-belgelendirme-nedir-nasil-alinir",
    baslik: "ISO 9001 Belgelendirme Nedir ve Nasıl Alınır?",
    ozet:
      "ISO 9001 belgelendirme, kalite yönetim sisteminizin bağımsız bir kuruluşça doğrulanmasıdır. Başvurudan sertifikaya kadar süreci adım adım anlatıyoruz.",
    tarih: "2026-07-04",
    kategori: "Yönetim Sistemleri",
    icerik:
      "ISO 9001, dünya genelinde en yaygın kullanılan kalite yönetim sistemi standardıdır. Bir kuruluşun ürün ve hizmetlerini tutarlı biçimde, müşteri ve yasal gerekliliklere uygun olarak sunma yeteneğini güvence altına alır. ISO 9001 belgelendirme ise bu sistemin bağımsız, tarafsız bir belgelendirme kuruluşu tarafından doğrulanmasıdır.\n\n" +
      "## ISO 9001 belgelendirme nedir?\n\n" +
      "ISO 9001 belgelendirme; kuruluşunuzun kurduğu kalite yönetim sisteminin ISO 9001:2015 standardının şartlarını karşıladığının, bağımsız bir belgelendirme kuruluşunca yapılan denetimle teyit edilmesi ve sonucunda sertifika düzenlenmesidir. Belge, sisteminizin belgelendirme kuruluşundan bağımsız olarak kurulduğunu ve sürdürüldüğünü gösterir.\n\n" +
      "## ISO 9001 belgesi neden alınır?\n\n" +
      "- Müşteri memnuniyetini ve süreç tutarlılığını artırmak\n" +
      "- İhale ve tedarikçi ön yeterlilik şartlarını karşılamak\n" +
      "- Hata, tekrar iş ve maliyetleri azaltarak verimliliği yükseltmek\n" +
      "- Kurumsal itibarı ve pazar güvenilirliğini güçlendirmek\n" +
      "- Risk temelli düşünme ile sürekli iyileşmeyi kurumsallaştırmak\n\n" +
      "## ISO 9001 belgelendirme süreci adım adım\n\n" +
      "- Başvuru ve sözleşme: Kuruluş bilgileri, kapsam ve çalışan sayısına göre denetim planlanır.\n" +
      "- Aşama 1 (hazırlık tetkiki): Yönetim sisteminin dokümantasyonu ve denetime hazırlığı incelenir.\n" +
      "- Aşama 2 (saha tetkiki): Sistemin sahada uygulandığı, kayıtlar ve süreçler üzerinden doğrulanır.\n" +
      "- Uygunsuzlukların kapatılması: Varsa bulgular için düzeltici faaliyetler değerlendirilir.\n" +
      "- Belgelendirme kararı: Bağımsız bir karar vericinin onayıyla sertifika düzenlenir.\n" +
      "- Gözetim tetkikleri: Belge geçerliliği boyunca sistemin sürdürüldüğü periyodik denetimlerle teyit edilir.\n\n" +
      "## Belgelendirmede tarafsızlık ilkesi\n\n" +
      "ISO/IEC 17021-1 gereği belgelendirme kuruluşları tarafsız ve bağımsız olmak zorundadır; belgelendirdikleri kuruluşlara yönetim sistemi danışmanlığı veremez, sistemi onlar adına kuramaz. Yönetim sisteminin kurulması ve sürdürülmesi kuruluşun kendi sorumluluğundadır; belgelendirme kuruluşunun rolü, kurulan sistemi bağımsız biçimde denetleyip değerlendirmektir. Bu ayrım, belgenin güvenilirliğinin temelidir.\n\n" +
      "ISO 9001 belgelendirme başvurusu ve süreç ayrıntıları için [ISO 9001 belgelendirme hizmetimizi](/hizmetler/iso-9001) inceleyebilir; belgenin geçerlilik ve yenileme koşulları için [ISO belgesi geçerlilik ve yenileme](/blog/iso-belgesi-gecerlilik-ve-yenileme) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["iso-9001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-45001-belgelendirme-is-sagligi-guvenligi",
    baslik: "ISO 45001 Belgelendirme: İş Sağlığı ve Güvenliği Yönetim Sistemi",
    ozet:
      "ISO 45001 belgelendirme, İSG yönetim sisteminizin bağımsız bir kuruluşça doğrulanmasıdır. Standardın kapsamını, faydalarını ve belgelendirme sürecini anlatıyoruz.",
    tarih: "2026-06-27",
    kategori: "Yönetim Sistemleri",
    icerik:
      "İş kazaları ve meslek hastalıkları hem insani hem de yasal açıdan ciddi sonuçlar doğurur. ISO 45001, iş sağlığı ve güvenliği (İSG) risklerini sistematik biçimde yönetmek için geliştirilmiş uluslararası yönetim sistemi standardıdır.\n\n" +
      "## ISO 45001 nedir?\n\n" +
      "ISO 45001:2018, kuruluşların çalışanları ve işyerinde etkilenen diğer kişiler için güvenli ve sağlıklı çalışma koşulları sağlamasına yönelik şartları belirleyen İSG yönetim sistemi standardıdır. Risk temelli ve çalışan katılımını esas alan bir yaklaşım sunar.\n\n" +
      "## ISO 45001 belgesinin faydaları\n\n" +
      "- İş kazası ve meslek hastalığı risklerini sistematik olarak azaltmak\n" +
      "- Yasal İSG yükümlülüklerine uyumu gösterebilmek\n" +
      "- Çalışan güvenini ve katılımını artırmak\n" +
      "- İhale ve tedarikçi şartlarında İSG performansını belgeleyebilmek\n" +
      "- Kaza kaynaklı maliyet ve iş gücü kayıplarını düşürmek\n\n" +
      "## Belgelendirme süreci\n\n" +
      "ISO 45001 belgelendirme; başvuru, aşama 1 (hazırlık) tetkiki, aşama 2 (saha) tetkiki, uygunsuzlukların kapatılması ve bağımsız belgelendirme kararı adımlarını izler. Belge geçerliliği boyunca yıllık gözetim tetkikleriyle sistemin sürdürüldüğü doğrulanır. Belgenin geçerlilik ve yenileme koşulları için [ISO belgesi geçerlilik ve yenileme](/blog/iso-belgesi-gecerlilik-ve-yenileme) yazımıza bakabilirsiniz.\n\n" +
      "## Diğer sistemlerle entegrasyon\n\n" +
      "ISO 45001; ISO 9001 ve ISO 14001 ile ortak bir üst yapı (HLS) paylaşır ve entegre yönetim sistemi olarak birlikte ele alınabilir. Ayrıntı için [entegre yönetim sistemi nedir](/blog/entegre-yonetim-sistemi-nedir) yazımızı inceleyebilirsiniz.\n\n" +
      "ISO 45001 belgelendirme başvurusu için [ISO 45001 belgelendirme hizmetimizi](/hizmetler/iso-45001) inceleyebilirsiniz.",
    ilgiliHizmetler: ["iso-45001", "sistem-belgelendirme"],
  },
  {
    slug: "iso-14001-belgelendirme-cevre-yonetim-sistemi",
    baslik: "ISO 14001 Belgelendirme: Çevre Yönetim Sistemi Belgesi",
    ozet:
      "ISO 14001 belgelendirme, çevre yönetim sisteminizin bağımsız bir kuruluşça doğrulanmasıdır. Standardın kapsamını, faydalarını ve sürecini açıklıyoruz.",
    tarih: "2026-06-24",
    kategori: "Yönetim Sistemleri",
    icerik:
      "Çevresel sorumluluk, artık yalnızca yasal bir zorunluluk değil; müşteri, yatırımcı ve tedarik zinciri beklentisidir. ISO 14001, kuruluşların çevresel etkilerini sistematik biçimde yönetmesini sağlayan uluslararası çevre yönetim sistemi standardıdır.\n\n" +
      "## ISO 14001 nedir?\n\n" +
      "ISO 14001:2015, bir kuruluşun faaliyet, ürün ve hizmetlerinden kaynaklanan çevresel etkileri kontrol altına almasına ve çevresel performansını sürekli iyileştirmesine yönelik şartları belirleyen yönetim sistemi standardıdır. Yaşam döngüsü bakış açısı ve yasal uyum bu sistemin temelidir.\n\n" +
      "## ISO 14001 belgesinin faydaları\n\n" +
      "- Çevre mevzuatına uyumu gösterebilmek ve yaptırım riskini azaltmak\n" +
      "- Enerji, su ve hammadde kullanımını iyileştirerek maliyet düşürmek\n" +
      "- Atık ve emisyonları sistematik olarak yönetmek\n" +
      "- Kurumsal sürdürülebilirlik ve marka itibarını güçlendirmek\n" +
      "- İhale ve ihracatta çevresel gereklilikleri karşılamak\n\n" +
      "## Belgelendirme süreci\n\n" +
      "ISO 14001 belgelendirme; başvuru, aşama 1 ve aşama 2 tetkikleri, uygunsuzlukların kapatılması ve bağımsız belgelendirme kararı ile ilerler; belge boyunca yıllık gözetim tetkikleri yapılır. Belgenin geçerlilik ve yenileme koşulları için [ISO belgesi geçerlilik ve yenileme](/blog/iso-belgesi-gecerlilik-ve-yenileme) yazımıza bakabilirsiniz.\n\n" +
      "ISO 14001 belgelendirme başvurusu için [ISO 14001 belgelendirme hizmetimizi](/hizmetler/iso-14001) inceleyebilir; birden çok standardın birlikte belgelendirilmesi için [entegre yönetim sistemi nedir](/blog/entegre-yonetim-sistemi-nedir) yazımıza göz atabilirsiniz.",
    ilgiliHizmetler: ["iso-14001", "sistem-belgelendirme"],
  },
  {
    slug: "ic-denetci-ic-tetkikci-egitimi-nedir",
    baslik: "İç Denetçi (İç Tetkikçi) Eğitimi Nedir, Kimler Katılmalı?",
    ozet:
      "İç denetçi (iç tetkikçi) eğitimi, yönetim sistemi iç tetkiklerini yürütme yetkinliği kazandırır. Kapsamını ve kimlerin katılması gerektiğini anlatıyoruz.",
    tarih: "2026-06-20",
    kategori: "Eğitim",
    icerik:
      "ISO yönetim sistemleri, kuruluşun kendi sistemini düzenli olarak denetlemesini (iç tetkik) zorunlu kılar. Bu tetkikleri yürütecek kişilerin yetkinliği ise iç denetçi (iç tetkikçi) eğitimi ile kazandırılır.\n\n" +
      "## İç tetkik (iç denetim) nedir?\n\n" +
      "İç tetkik, kuruluşun kendi yönetim sisteminin standardın şartlarına ve kendi belirlediği kurallara uygunluğunu, planlı aralıklarla, tarafsız bir gözle değerlendirmesidir. Belgelendirme (3. taraf) denetiminden önce sistemin sağlığını gösteren en önemli araçtır.\n\n" +
      "## İç denetçi eğitiminde neler öğrenilir?\n\n" +
      "- İlgili standardın (ör. ISO 9001, 14001, 45001) şartlarının yorumlanması\n" +
      "- Tetkik prensipleri ve ISO 19011 tetkik rehberi\n" +
      "- Tetkik planlama, soru listesi hazırlama ve delil toplama\n" +
      "- Bulgu ve uygunsuzlukların sınıflandırılması, raporlanması\n" +
      "- Düzeltici faaliyetlerin takibi\n\n" +
      "## Kimler katılmalı?\n\n" +
      "Yönetim temsilcileri, kalite/İSG/çevre sorumluları, süreç sahipleri ve iç tetkik ekibinde görev alacak tüm çalışanlar bu eğitimden yararlanır. İç tetkikçiler, kendi doğrudan sorumlu oldukları alanı tetkik etmeyecek şekilde görevlendirilerek tarafsızlık korunur.\n\n" +
      "## İç tetkik ile tedarikçi denetiminin ilişkisi\n\n" +
      "İç tetkikte kazanılan yetkinlik, tedarikçi denetimlerinde de temel oluşturur. Konu için [tedarikçi denetimi nedir](/blog/tedarikci-denetimi-nedir) yazımıza bakabilirsiniz.\n\n" +
      "Genel katılıma açık iç tetkikçi ve tetkik eğitimlerimiz için [ISO 9001 iç tetkikçi eğitimi](/egitimler/iso-9001-ic-tetkikci-egitimi) ve [ISO 19011 tetkik eğitimi](/egitimler/iso-19011-tetkik-egitimi) sayfalarını inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "iso-50001-belgelendirme-enerji-yonetim-sistemi",
    baslik: "ISO 50001 Belgelendirme: Enerji Yönetim Sistemi Belgesi",
    ozet:
      "ISO 50001 belgelendirme, enerji yönetim sisteminizin bağımsız bir kuruluşça doğrulanmasıdır. Kapsamını, verimlilik faydalarını ve sürecini açıklıyoruz.",
    tarih: "2026-06-16",
    kategori: "Yönetim Sistemleri",
    icerik:
      "Artan enerji maliyetleri ve sürdürülebilirlik hedefleri, enerji tüketiminin sistematik yönetimini zorunlu hale getiriyor. ISO 50001, kuruluşların enerji performansını ölçülebilir biçimde iyileştirmesini sağlayan uluslararası enerji yönetim sistemi standardıdır.\n\n" +
      "## ISO 50001 nedir?\n\n" +
      "ISO 50001:2018, bir kuruluşun enerji kullanımını ve tüketimini yönetmek, enerji performansını izlemek ve sürekli iyileştirmek için gereken şartları belirleyen yönetim sistemi standardıdır. Enerji temel çizgisi (baseline) ve enerji performans göstergeleri (EnPI) bu sistemin ölçüm omurgasını oluşturur.\n\n" +
      "## ISO 50001 belgesinin faydaları\n\n" +
      "- Enerji maliyetlerini ölçülebilir biçimde düşürmek\n" +
      "- Enerji verimliliğini kurumsal bir sürece dönüştürmek\n" +
      "- Sera gazı emisyonlarını ve çevresel etkiyi azaltmak\n" +
      "- Yasal ve müşteri kaynaklı enerji gerekliliklerini karşılamak\n" +
      "- Sürdürülebilirlik ve ESG hedeflerini desteklemek\n\n" +
      "## Belgelendirme süreci\n\n" +
      "ISO 50001 belgelendirme; başvuru, aşama 1 ve aşama 2 tetkikleri, uygunsuzlukların kapatılması ve bağımsız belgelendirme kararı ile ilerler. Enerji verilerinin ve performans göstergelerinin izlenebilirliği, bu standartta özellikle önemlidir.\n\n" +
      "ISO 50001 belgelendirme başvurusu için [ISO 50001 belgelendirme hizmetimizi](/hizmetler/iso-50001) inceleyebilir; birden çok standardı birlikte yürütmek için [entegre yönetim sistemi nedir](/blog/entegre-yonetim-sistemi-nedir) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["iso-50001", "sistem-belgelendirme"],
  },
  {
    slug: "gida-tedarikci-denetimi",
    baslik: "Gıda Tedarikçi Denetimi: Gıda Güvenliği ve Hijyen Kriterleri",
    ozet:
      "Gıda tedarikçi denetimi; hammadde, ambalaj ve fason üreticilerin gıda güvenliği, hijyen ve izlenebilirlik uyumunu doğrular. Başlıkları ve standartları anlatıyoruz.",
    tarih: "2026-06-13",
    kategori: "Denetim",
    icerik:
      "Gıda sektöründe bir tek tedarikçi kaynaklı sorun bile tüm zincire ve marka itibarına zarar verebilir. Bu nedenle gıda tedarikçilerinin bağımsız bir gözle denetlenmesi, gıda güvenliğinin en kritik halkalarından biridir.\n\n" +
      "## Gıda tedarikçi denetimi nedir?\n\n" +
      "Gıda tedarikçi denetimi, bir gıda işletmesinin hammadde, katkı, ambalaj veya fason üretim tedarikçilerini; gıda güvenliği, hijyen ve yasal gerekliliklere uygunluk açısından değerlendirdiği bir 2. taraf (tedarikçi) denetimidir. Amaç, satın alınan ürün ve hizmetlerin güvenli ve istenen kalitede olduğunu üretim öncesinde doğrulamaktır.\n\n" +
      "## Neden önemlidir?\n\n" +
      "Gıda güvenliği zincirin en zayıf halkası kadar güçlüdür. Tedarikçi denetimi; kontaminasyon ve tağşiş risklerini erken tespit etmenizi, yasal sorumluluğunuzu yönetmenizi ve müşteri ile perakende zincirlerinin tedarikçi onay şartlarını karşılamanızı sağlar.\n\n" +
      "## Denetimde değerlendirilen başlıklar\n\n" +
      "- HACCP planı ve kritik kontrol noktalarının uygulanması\n" +
      "- Personel hijyeni, tesis temizliği ve sanitasyon programları\n" +
      "- Haşere kontrolü, alerjen yönetimi ve çapraz bulaşma önlemleri\n" +
      "- Hammadde kabul, depolama ve soğuk zincir koşulları\n" +
      "- İzlenebilirlik, parti takibi ve geri çağırma (recall) hazırlığı\n" +
      "- Su, atık ve yasal gıda mevzuatına uyum\n\n" +
      "## Hangi standartlar referans alınır?\n\n" +
      "- ISO 22000 gıda güvenliği yönetim sistemi\n" +
      "- FSSC 22000\n" +
      "- BRCGS ve IFS Food (perakende zincirlerinin sık talep ettiği kriterler)\n" +
      "- Codex Alimentarius ilkeleri ve ulusal gıda mevzuatı\n\n" +
      "Bu denetimler, kuruluşunuzun belirlediği kriterler ve ilgili standartların gereklilikleri doğrultusunda yürütülür; sonucunda bir sertifika değil, ayrıntılı bir tedarikçi denetim raporu sunulur.\n\n" +
      "## Gıda tedarik zincirinde tedarikçi denetiminin rolü\n\n" +
      "Beyana veya yalnızca belgeye dayanmak gıdada yeterli değildir; üretim koşullarının yerinde gözlemlenmesi gerekir. Risk temelli bir yaklaşımla kritik tedarikçileri daha sık denetlemek, tedarik zinciri güvenliğini sürdürmenin en etkili yoludur.\n\n" +
      "Gıda tedarikçilerinizi bağımsız değerlendirmek için [tedarikçi denetimi hizmetimizi](/hizmetler/tedarikci-denetimi) inceleyebilir; denetim başlıklarının tamamı için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "tekstil-tedarikci-denetimi",
    baslik: "Tekstil ve Hazır Giyim Tedarikçi Denetimi: Kalite ve Sosyal Uygunluk",
    ozet:
      "Tekstil ve hazır giyim alıcıları tedarikçiden kalite ve sosyal uygunluk bekler. Tekstil tedarikçi denetiminin kalite, sosyal ve çevre başlıklarını ele alıyoruz.",
    tarih: "2026-06-13",
    kategori: "Denetim",
    icerik:
      "Türkiye'nin en güçlü ihracat sektörlerinden biri olan tekstil ve hazır giyimde, uluslararası alıcılar tedarikçilerini yalnızca kaliteyle değil; çalışan hakları, etik ve çevre kriterleriyle de değerlendirir. Bu nedenle tekstil tedarikçi denetimi çok boyutludur.\n\n" +
      "## Tekstil tedarikçi denetimi nedir?\n\n" +
      "Tekstil tedarikçi denetimi; konfeksiyon, dokuma, örme, boya-apre veya fason üreticilerin kalite, sosyal uygunluk ve çevre kriterlerine uygunluğunu değerlendiren bir 2. taraf (tedarikçi) denetimidir. Marka ve perakendecilerin fason üretim ağlarını kontrol etmesinde yaygın olarak kullanılır.\n\n" +
      "## İhracatta sosyal uygunluğun önemi\n\n" +
      "Avrupa ve global alıcılar, tedarik zincirlerinde insan hakları ve etik iş uygulamalarını giderek daha sıkı şart koşuyor. Sosyal uygunluk gereklilikleri karşılanmadığında siparişler iptal olabilir; bu yüzden bağımsız denetim, ihracat sürekliliği için kritik hâle gelmiştir.\n\n" +
      "## Kalite denetimi başlıkları\n\n" +
      "- Dikiş, ölçü, renk ve aksesuar kalite kontrolü\n" +
      "- Üretim süreçlerinin ve kalite kontrol noktalarının yeterliliği\n" +
      "- AQL örnekleme ile son ürün kontrolü\n" +
      "- Kapasite, teslim performansı ve fason ağ yönetimi\n\n" +
      "## Sosyal uygunluk ve etik başlıklar\n\n" +
      "- Çalışma saatleri, ücret ve yasal istihdam uygunluğu\n" +
      "- Çocuk işçi ve zorla çalıştırma yasaklarına uyum\n" +
      "- İş sağlığı ve güvenliği ile çalışan refahı\n" +
      "- BSCI, Sedex/SMETA gibi sosyal uygunluk kriterleri doğrultusunda değerlendirme\n\n" +
      "## Çevre ve kimyasal yönetimi\n\n" +
      "- Kimyasal madde yönetimi ve yasaklı madde (RSL) kontrolü\n" +
      "- OEKO-TEX ve ZDHC benzeri kriterlere uyum\n" +
      "- Atık su, enerji ve atık yönetimi\n\n" +
      "Bu denetimler, alıcı/müşteri kriterleri ve ilgili standartların gereklilikleri doğrultusunda yürütülür; çıktı bir tedarikçi denetim raporudur.\n\n" +
      "## Tekstil tedarik zincirinde denetimin rolü\n\n" +
      "Tekstilde üretim çoğunlukla geniş bir fason ağına yayılır; bu da her halkanın bağımsız denetimini zorunlu kılar. Düzenli denetim, hem kalite tutarlılığını hem de sosyal uygunluğu güvence altına alır.\n\n" +
      "Tekstil tedarikçilerinizi değerlendirmek için [tedarikçi denetimi hizmetimizi](/hizmetler/tedarikci-denetimi); denetim başlıkları için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımızı inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "otomotiv-tedarikci-denetimi",
    baslik: "Otomotiv Tedarikçi Denetimi: IATF 16949 ve VDA 6.3 Bakışı",
    ozet:
      "Otomotiv tedarik zincirinde sıfır hata beklenir. Otomotiv tedarikçi denetiminin IATF 16949, VDA 6.3 proses denetimi, PPAP ve APQP gibi temel başlıklarını açıklıyoruz.",
    tarih: "2026-06-13",
    kategori: "Denetim",
    icerik:
      "Otomotiv sektörü, tedarik zinciri kalite gerekliliklerinin en sıkı olduğu alanlardan biridir. Ana sanayi (OEM) ve üst kademe tedarikçiler, alt tedarikçilerini sistematik denetimlerle değerlendirir.\n\n" +
      "## Otomotiv tedarikçi denetimi nedir?\n\n" +
      "Otomotiv tedarikçi denetimi; bir OEM'in veya üst kademe tedarikçinin (Tier 1/Tier 2) alt tedarikçilerini kalite, proses yeterliliği ve teslim güvenilirliği açısından değerlendirdiği bir 2. taraf (tedarikçi) denetimidir. Amaç, seri üretimde tutarlı kalite ve sıfır hata hedefini güvence altına almaktır.\n\n" +
      "## IATF 16949 ve otomotiv kalite zinciri\n\n" +
      "IATF 16949, otomotiv sektörünün kalite yönetim sistemi standardıdır ve tedarikçi geliştirme ile alt tedarikçi yönetimini açıkça şart koşar. Tedarikçi denetimleri, bu zincirdeki gerekliliklerin alt halkalara kadar aktarıldığını doğrular.\n\n" +
      "## VDA 6.3 proses denetimi nedir?\n\n" +
      "VDA 6.3, Alman otomotiv endüstrisinin geliştirdiği bir proses denetimi yöntemidir. Ürünün geliştirilmesinden seri üretime kadar her aşamadaki prosesleri risk temelli olarak değerlendirir ve tedarikçi denetimlerinde yaygın bir referanstır. Süreç elemanları, puanlama sistemi ve IATF 16949 ile farkı için [VDA 6.3 nedir](/blog/vda-6-3-nedir) yazımıza bakabilirsiniz.\n\n" +
      "## Denetimde değerlendirilen başlıklar\n\n" +
      "- APQP (ileri ürün kalite planlaması) ve proje yönetimi\n" +
      "- PPAP (üretim parçası onay prosesi) dokümantasyonu\n" +
      "- FMEA ile risk analizi ve önleyici yaklaşım\n" +
      "- Proses kontrol planları ve SPC ile süreç yeterliliği\n" +
      "- İzlenebilirlik, hata izolasyonu ve uygunsuz ürün yönetimi\n" +
      "- Ölçüm sistemleri analizi (MSA) ve kalibrasyon\n\n" +
      "Bu denetimler, müşteri/OEM gereklilikleri ve ilgili otomotiv standartlarının kriterleri doğrultusunda yürütülür; sonucunda ayrıntılı bir tedarikçi denetim raporu sunulur.\n\n" +
      "## Otomotiv tedarik zincirinde tedarikçi denetiminin rolü\n\n" +
      "Otomotivde tek bir hatalı parti, geri çağırma ve ciddi maliyetlere yol açabilir. Risk temelli ve düzenli tedarikçi denetimleri; sorunları seri üretime ulaşmadan önce tespit ederek tedarik zincirinin güvenilirliğini korur.\n\n" +
      "Otomotiv tedarikçilerinizi değerlendirmek için [tedarikçi denetimi hizmetimizi](/hizmetler/tedarikci-denetimi); süreç ayrıntıları için [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızı inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "vda-6-3-nedir",
    baslik: "VDA 6.3 Nedir? Proses Denetimi, Soru Kataloğu ve IATF 16949 Farkı",
    ozet:
      "VDA 6.3, Alman otomotiv sektörünün proses denetimi standardıdır. P1–P7 süreç elemanlarını, A/B/C puanlamasını ve IATF 16949 ile farkını açıklıyoruz.",
    tarih: "2026-10-06",
    kategori: "Denetim",
    icerik:
      "Otomotiv tedarik zincirinde bir tedarikçinin \"kaliteli parça üretip üretemeyeceği\" sorusu, yalnızca kalite yönetim sistemine bakılarak cevaplanamaz. Bu soruya proses düzeyinde cevap arayan yöntemlerin başında VDA 6.3 gelir.\n\n" +
      "## VDA 6.3 nedir?\n\n" +
      "VDA 6.3, Alman Otomotiv Sanayii Birliği (VDA – Verband der Automobilindustrie) tarafından yayımlanan proses denetimi standardıdır. Ürünün geliştirilmesinden seri üretime ve müşteri hizmetlerine kadar tüm ürün yaşam döngüsündeki prosesleri, standart bir soru kataloğu ve puanlama sistemiyle risk temelli olarak değerlendirir. Güncel sürümü 2023 yılında yayımlanmıştır.\n\n" +
      "VDA 6.3'ün amacı bir yönetim sistemini belgelendirmek değil; belirli bir ürün veya ürün grubu için proseslerin gerçekten yeterli, kararlı ve hatasız ürün üretebilecek durumda olup olmadığını ortaya koymaktır.\n\n" +
      "## VDA 6.3 denetimi nerelerde kullanılır?\n\n" +
      "- Otomotiv ana sanayisinin (OEM) ve Tier 1 tedarikçilerin alt tedarikçilerini değerlendirdiği tedarikçi denetimlerinde\n" +
      "- Yeni tedarikçi seçimi öncesinde potansiyel analizi olarak\n" +
      "- Kuruluşun kendi üretim proseslerini değerlendirdiği iç proses denetimlerinde\n" +
      "- Kalite sorunları sonrasında kök neden ve proses yeterliliği incelemelerinde\n\n" +
      "## VDA 6.3 süreç elemanları (P1–P7)\n\n" +
      "Soru kataloğu, ürün yaşam döngüsünü izleyen yedi süreç elemanına ayrılır:\n\n" +
      "- P1 – Potansiyel analizi: Yeni bir tedarikçinin veya lokasyonun proje öncesi yeterliliğinin değerlendirilmesi\n" +
      "- P2 – Proje yönetimi: Proje organizasyonu, kaynak planlaması, değişiklik ve risk yönetimi\n" +
      "- P3 – Ürün ve proses geliştirmenin planlanması: Gereksinimlerin belirlenmesi, fizibilite ve geliştirme planları\n" +
      "- P4 – Ürün ve proses geliştirmenin gerçekleştirilmesi: FMEA, kontrol planları, numune ve onay süreçleri\n" +
      "- P5 – Tedarikçi yönetimi: Alt tedarikçilerin seçimi, onayı, izlenmesi ve geliştirilmesi\n" +
      "- P6 – Proses analizi / üretim: Girdiler, iş içeriği, destek prosesleri, malzeme ve insan kaynağı, proses etkinliği ve çıktılar\n" +
      "- P7 – Müşteri desteği, müşteri memnuniyeti ve servis: Şikâyet yönetimi, saha hataları ve müşteri gereksinimlerinin karşılanması\n\n" +
      "Seri üretimdeki bir tedarikçinin denetiminde ağırlık genellikle P5, P6 ve P7'dedir; yeni proje süreçlerinde ise P2–P4 öne çıkar.\n\n" +
      "## VDA 6.3 puanlama ve A/B/C sınıflandırması\n\n" +
      "Her soru, kanıtlanan uygunluk düzeyine göre 0, 4, 6, 8 veya 10 puan üzerinden değerlendirilir. Soru puanlarından süreç elemanlarının ve toplam denetimin uygunluk yüzdesi hesaplanır ve sonuç üç sınıfa ayrılır:\n\n" +
      "- A – Uygun: Toplam uygunluk %90 ve üzeri\n" +
      "- B – Koşullu uygun: %80 ile %90 arası\n" +
      "- C – Uygun değil: %80'in altı\n\n" +
      "Toplam puan yüksek olsa bile tek tek soruların veya süreç elemanlarının belirli eşiklerin altında kalması, sınıflandırmayı düşüren kurallara bağlanmıştır. Bu sayede tek bir kritik zayıflık, iyi bir ortalamanın arkasına saklanamaz. Yıldızla işaretli kritik sorular da özel olarak değerlendirilir.\n\n" +
      "## VDA 6.3 ile IATF 16949 arasındaki fark\n\n" +
      "- IATF 16949, otomotiv sektörünün kalite yönetim sistemi standardıdır; uygunluğu, IATF tarafından tanınan belgelendirme kuruluşlarının yaptığı denetimle belgelendirilir.\n" +
      "- VDA 6.3 ise bir proses denetimi yöntemidir; sonucunda sertifika değil, puanlı bir denetim raporu ve sınıflandırma çıkar. Çoğunlukla müşterinin tedarikçisini değerlendirdiği tedarikçi denetimlerinde ve iç denetimlerde kullanılır.\n" +
      "- İki yaklaşım birbirini tamamlar: IATF 16949 üretim prosesi denetimlerini şart koşar ve pek çok OEM, müşteriye özgü şartlarında bu denetimlerin VDA 6.3 yöntemiyle yapılmasını ister.\n\n" +
      "Kısaca IATF 16949 \"sistem var mı ve işliyor mu?\" sorusuna, VDA 6.3 ise \"bu ürün için prosesler yeterli ve kararlı mı?\" sorusuna odaklanır.\n\n" +
      "## VDA 6.3 denetimine nasıl hazırlanılır?\n\n" +
      "- Denetlenecek ürün, proses ve süreç elemanlarını müşteriyle birlikte netleştirin\n" +
      "- FMEA, kontrol planı, proses akış şeması ve iş talimatlarının güncel ve birbiriyle tutarlı olduğundan emin olun\n" +
      "- Proses yeterlilik (Cpk), ölçüm sistemi analizi (MSA) ve hata kayıtlarını hazır bulundurun\n" +
      "- Alt tedarikçi değerlendirme ve onay kayıtlarınızı gözden geçirin (P5)\n" +
      "- Müşteri şikâyetleri ve 8D raporlarının kapanış durumunu kontrol edin (P7)\n" +
      "- Soru kataloğunu kullanarak bir iç ön denetim yapın ve düşük puan beklenen alanları önceden iyileştirin\n\n" +
      "Otomotiv tedarikçi denetiminin genel çerçevesini [otomotiv tedarikçi denetimi](/blog/otomotiv-tedarikci-denetimi) yazımızda ele aldık. Tedarikçilerinizi kendi kriterleriniz ve müşteri şartlarınız doğrultusunda bağımsız bir gözle değerlendirmek için [tedarikçi denetimi hizmetimizi](/hizmetler/tedarikci-denetimi) inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "tedarikci-denetimi-nedir",
    baslik: "Tedarikçi Denetimi Nedir? Neden, Ne Zaman ve Nasıl Yapılır?",
    ozet:
      "Tedarikçi denetimi (ikinci taraf denetim), tedarikçi ve fason üreticilerin yerinde değerlendirilmesidir. Amacını ve iç denetimden farkını açıklıyoruz.",
    tarih: "2026-06-12",
    kategori: "Denetim",
    icerik:
      "Satın aldığınız her hammadde, parça ve hizmet, sizin ürününüzün ve itibarınızın bir parçasıdır. Tedarikçi denetimi, bu zincirdeki halkaların beklediğiniz kalitede ve şartlarda çalışıp çalışmadığını yerinde doğrulamanın en güvenilir yoludur.\n\n" +
      "## Tedarikçi denetimi nedir?\n\n" +
      "Tedarikçi denetimi; bir kuruluşun mal veya hizmet aldığı tedarikçilerini, fason üreticilerini, alt yüklenicilerini ve iş ortaklarını belirlenen standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından değerlendirmesidir. Denetim, müşteri konumundaki kuruluş adına yürütülür; denetim literatüründe 2. taraf denetimi olarak da geçer. Sonucunda sertifika değil, bulguları ve iyileştirme önerilerini içeren ayrıntılı bir tedarikçi denetim raporu sunulur.\n\n" +
      "## Tedarikçi denetimi neden yapılır?\n\n" +
      "- Tedarikçi kaynaklı kalite sorunlarını, ürün geri çağırmalarını ve müşteri şikâyetlerini önlemek\n" +
      "- Tedarikçi seçimi ve onayını beyana değil, yerinde kanıta dayandırmak\n" +
      "- Sözleşme ve tedarikçi şartnamesi yükümlülüklerinin yerine getirildiğini doğrulamak\n" +
      "- Çevre, iş sağlığı ve güvenliği ile yasal uyum risklerini tedarik zincirinde de yönetmek\n" +
      "- ISO 9001 madde 8.4 gibi dış kaynaklı süreçlerin kontrolüne ilişkin şartları karşılamak\n\n" +
      "## Tedarikçi denetimi hangi durumlarda yapılır?\n\n" +
      "- Yeni bir tedarikçi seçimi ve onayı öncesinde\n" +
      "- Kritik tedarikçilerin performansını periyodik olarak izlemek için\n" +
      "- Kalite şikâyeti, iade veya tekrarlayan uygunsuzluk sonrasında\n" +
      "- Yeni bir ürün, sözleşme veya iş birliği başlamadan önce\n" +
      "- Tedarik zincirinde kalite, çevre, İSG veya sektörel risklerin yönetilmesi gerektiğinde\n\n" +
      "## Tedarikçi denetiminde neler değerlendirilir?\n\n" +
      "Kapsam, tedarikçinin sizin için ne ürettiğine göre belirlenir. Tipik başlıklar; kalite yönetimi ve kalite kontrol uygulamaları, üretim ve proses kontrolü, izlenebilirlik, ölçüm ekipmanlarının kalibrasyonu, uygun olmayan ürün yönetimi, depolama ve sevkiyat, iş sağlığı ve güvenliği, çevre ve yasal uyumdur. Başlıkların ayrıntısını [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımızda bulabilirsiniz.\n\n" +
      "## İç denetim, tedarikçi denetimi ve belgelendirme denetimi farkı\n\n" +
      "Denetimler, kimin kimi değerlendirdiğine göre üç türe ayrılır:\n\n" +
      "- İç denetim (1. taraf): Kuruluş kendi sistemini denetler. Çıktı: iç iyileştirme.\n" +
      "- Tedarikçi denetimi (2. taraf): Kuruluş tedarikçisini veya iş ortağını denetler. Çıktı: denetim raporu.\n" +
      "- Belgelendirme denetimi (3. taraf): Bağımsız bir belgelendirme kuruluşu denetler. Çıktı: sertifika.\n\n" +
      "Tedarikçinizin ISO 9001 belgesine sahip olması, onun yönetim sisteminin standarda uygun olduğunu gösterir; ancak sizin ürününüze özel şartlarınızı karşıladığını garanti etmez. Bu nedenle kritik tedarikçilerde belgelendirme denetimi, tedarikçi denetiminin yerini tutmaz.\n\n" +
      "## Tedarikçi denetimini kim yapmalı?\n\n" +
      "Denetim, satın alma veya kalite ekibiniz tarafından yapılabileceği gibi bağımsız bir denetim kuruluşuna da yaptırılabilir. Bağımsız denetim; ticari ilişkiden kaynaklanan önyargıyı ortadan kaldırır, farklı tedarikçiler arasında aynı ölçütlerle karşılaştırma yapılmasını sağlar ve iç kaynaklarınızın yükünü azaltır.\n\n" +
      "Tedarikçi denetiminin adım adım nasıl yürütüldüğünü [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızda anlattık. Tedarikçilerinizi bağımsız bir gözle değerlendirmek için [tedarikçi denetimi hizmetimizi](/hizmetler/tedarikci-denetimi); kendi şube, bayi ve franchise ağınız için ise [şube ve mağaza denetimi](/hizmetler/sube-denetimi) hizmetimizi inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi", "sube-denetimi"],
  },
  {
    slug: "tedarikci-denetimi-nasil-yapilir",
    baslik: "Tedarikçi Denetimi Nasıl Yapılır? Adım Adım Süreç",
    ozet:
      "Tedarikçi denetimi; planlama, doküman incelemesi, saha denetimi, raporlama ve düzeltici faaliyet takibinden oluşur. Her aşamayı adım adım açıklıyoruz.",
    tarih: "2026-06-09",
    kategori: "Denetim",
    icerik:
      "Tedarikçi denetimi (2. taraf denetimi), tedarik zincirinizdeki riskleri yönetmenin ve sözleşme şartlarına uyumu doğrulamanın en etkili yollarından biridir. İyi yapılandırılmış bir denetim süreci, nesnel ve tekrarlanabilir sonuçlar üretir.\n\n" +
      "## Tedarikçi denetimine neden ihtiyaç duyulur?\n\n" +
      "Bir tedarikçinin kalite, çevre, iş sağlığı ve güvenliği veya sektörel gerekliliklere uyumunu yalnızca beyana dayanarak değerlendirmek risklidir. Yerinde ve nesnel bir denetim; uygunsuzlukları erken tespit etmenizi, tedarikçi seçimini verilere dayandırmanızı ve tedarik zinciri sürekliliğini güvence altına almanızı sağlar.\n\n" +
      "## Adım 1: Planlama ve kapsam belirleme\n\n" +
      "Denetimin hangi tesis, süreç ve kriterleri kapsayacağı netleştirilir. Denetim kriterleri; ilgili ISO standartları, sözleşme şartları, yasal yükümlülükler ve kuruluşun kendi kontrol listelerinden oluşabilir. Bu aşamada denetim planı ve zaman çizelgesi hazırlanır.\n\n" +
      "## Adım 2: Doküman incelemesi\n\n" +
      "Saha denetiminden önce tedarikçinin politika, prosedür, kayıt ve sertifikaları incelenir. Bu ön inceleme, sahada nelere odaklanılacağını belirler ve denetimi verimli hâle getirir.\n\n" +
      "## Adım 3: Saha denetimi\n\n" +
      "Denetçi tesise giderek faaliyetleri yerinde gözlemler, süreç sahipleriyle görüşür ve kayıtları inceler. Üretim koşulları, izlenebilirlik, kalite kontrol noktaları ve uygunluk kanıtları yerinde değerlendirilir.\n\n" +
      "## Adım 4: Raporlama\n\n" +
      "Bulgular önem derecelerine göre sınıflandırılır ve destekleyici kanıtlarla birlikte bir denetim raporunda toplanır. Rapor; tespit edilen uygunsuzlukları, öncelik seviyelerini ve önerilen düzeltici faaliyetleri içerir.\n\n" +
      "## Adım 5: Düzeltici faaliyet takibi\n\n" +
      "Tedarikçi, tespit edilen uygunsuzluklar için bir düzeltici faaliyet planı sunar. Bu faaliyetlerin uygulanıp uygulanmadığı izlenir; gerektiğinde doğrulama amacıyla takip denetimi yapılır.\n\n" +
      "## Yerinde mi, uzaktan mı?\n\n" +
      "Doküman incelemesi ve görüşmeler uzaktan (online) yürütülebilir; ancak üretim ve saha koşullarının gözlemlenmesi gereken durumlarda yerinde denetim önerilir. Çoğu zaman ikisini birleştiren karma bir yaklaşım uygulanır.\n\n" +
      "Denetimde değerlendirilen başlıkların ayrıntısı için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımıza bakabilir; profesyonel destek için [tedarikçi denetimi hizmetimizi](/hizmetler/tedarikci-denetimi) inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "tedarikci-denetimi-kontrol-listesi",
    baslik: "Tedarikçi Denetimi Kontrol Listesi (Checklist) ve Değerlendirme Başlıkları",
    ozet:
      "Tedarikçi denetiminde kalite, üretim, İSG, çevre, sosyal uygunluk ve izlenebilirlik başlıklarını kapsayan kontrol listesi (checklist) rehberi.",
    tarih: "2026-06-05",
    kategori: "Denetim",
    icerik:
      "İyi hazırlanmış bir kontrol listesi (checklist), tedarikçi denetimini nesnel, kapsamlı ve şubeler/tedarikçiler arasında karşılaştırılabilir hâle getirir. Aşağıda tipik bir tedarikçi denetimi kontrol listesinin ana başlıklarını derledik.\n\n" +
      "## Tedarikçi denetim kontrol listesi neden önemli?\n\n" +
      "Kontrol listesi; denetimin her tedarikçide aynı kriterlerle, aynı titizlikle yapılmasını sağlar. Bulguların puanlanabilmesi ve tedarikçilerin objektif olarak karşılaştırılabilmesi için yapılandırılmış bir liste şarttır. Liste, kuruluşun kendi gereksinimlerine göre uyarlanmalıdır.\n\n" +
      "## Kalite yönetimi başlıkları\n\n" +
      "- Kalite politikası, hedefleri ve sorumlulukların tanımlı olması\n" +
      "- Girdi, proses ve son ürün kalite kontrol noktaları\n" +
      "- Uygunsuz ürün yönetimi ve düzeltici faaliyet kayıtları\n" +
      "- Ölçüm ve test ekipmanlarının kalibrasyon durumu\n\n" +
      "## Üretim ve süreç kontrolü\n\n" +
      "- Üretim süreçlerinin tanımlı ve kontrol altında olması\n" +
      "- İzlenebilirlik ve parti/lot takibi\n" +
      "- Depolama, taşıma ve sevkiyat koşulları\n" +
      "- Kapasite ve teslim performansının yeterliliği\n\n" +
      "## İş sağlığı ve güvenliği ile çevre\n\n" +
      "- İSG risk değerlendirmesi ve gerekli önlemlerin uygulanması\n" +
      "- Kişisel koruyucu donanım ve acil durum hazırlığı\n" +
      "- Atık yönetimi ve yasal çevre yükümlülüklerine uyum\n\n" +
      "## Sosyal uygunluk ve etik\n\n" +
      "- Çalışan hakları, çalışma saatleri ve ücretlendirme uygunluğu\n" +
      "- Çocuk işçi ve zorla çalıştırma yasaklarına uyum\n" +
      "- Etik iş uygulamaları ve gerekli yasal izinler\n\n" +
      "## Dokümantasyon ve izlenebilirlik\n\n" +
      "- Sözleşme ve şartname gerekliliklerinin karşılanması\n" +
      "- Kayıtların güncel, eksiksiz ve erişilebilir olması\n" +
      "- Alt tedarikçilerin kontrol ve değerlendirme durumu\n\n" +
      "## Kontrol listesi nasıl puanlanır?\n\n" +
      "Her başlık genellikle \"uygun / kısmen uygun / uygun değil\" veya sayısal bir puanla değerlendirilir. Bulgular önem derecelerine (kritik / majör / minör) göre sınıflandırılır. Böylece tedarikçiler karşılaştırılabilir ve önceliklendirilmiş bir iyileştirme planı oluşturulabilir.\n\n" +
      "Bu başlıkların hangi adımlarla sahada değerlendirildiğini [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızda bulabilirsiniz. Kapsamlı bir denetim için [tedarikçi denetimi hizmetimizden](/hizmetler/tedarikci-denetimi) yararlanabilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "tedarikci-degerlendirme-kriterleri",
    baslik: "Tedarikçi Değerlendirme Kriterleri ve Tedarikçi Seçimi",
    ozet:
      "Tedarikçi seçimi ve onayında kullanılan değerlendirme kriterleri, ön yeterlilik ve performans izleme aşamaları ile denetimin bu süreçteki rolü.",
    tarih: "2026-06-02",
    kategori: "Denetim",
    icerik:
      "Doğru tedarikçiyi seçmek ve performansını sürekli izlemek, tedarik zinciri yönetiminin temelidir. Bunun için nesnel ve ölçülebilir tedarikçi değerlendirme kriterlerine ihtiyaç vardır.\n\n" +
      "## Tedarikçi değerlendirme nedir?\n\n" +
      "Tedarikçi değerlendirme; bir tedarikçinin kalite, teslim, maliyet, uygunluk ve sürdürülebilirlik açısından belirlenen kriterleri ne ölçüde karşıladığının sistematik olarak ölçülmesidir. Hem yeni tedarikçi seçiminde (onay öncesi) hem de mevcut tedarikçilerin izlenmesinde (onay sonrası) kullanılır.\n\n" +
      "## Tedarikçi seçim kriterleri\n\n" +
      "- Kalite yönetim sistemi ve ürün/hizmet kalitesi\n" +
      "- Teslim performansı ve zamanında teslim oranı\n" +
      "- Fiyat ve toplam sahip olma maliyeti\n" +
      "- Kapasite, finansal istikrar ve süreklilik\n" +
      "- Yasal, çevresel ve sosyal uygunluk\n" +
      "- İlgili sertifikalar (ör. ISO 9001) ve referanslar\n\n" +
      "## Ön yeterlilik (onay öncesi) değerlendirmesi\n\n" +
      "Yeni bir tedarikçi devreye alınmadan önce, belirlenen kriterlere uygunluğu değerlendirilir. Bu aşamada doküman incelemesinin yanı sıra yerinde bir tedarikçi denetimi, beyan edilen yeterliliklerin gerçekte karşılanıp karşılanmadığını doğrular.\n\n" +
      "## Performans izleme (onay sonrası)\n\n" +
      "Onaylı tedarikçilerin performansı; kalite, teslim ve uygunsuzluk verileriyle düzenli olarak izlenir. Belirli aralıklarla yapılan periyodik denetimler, tedarikçinin zaman içinde standartlarını koruduğunu teyit eder.\n\n" +
      "## Tedarikçi denetiminin değerlendirmedeki rolü\n\n" +
      "Tedarikçi değerlendirmesi büyük ölçüde verilere ve beyana dayanır; bağımsız bir denetim ise bu verileri yerinde kanıtla doğrular. Bu nedenle [tedarikçi denetimi](/hizmetler/tedarikci-denetimi), sağlam bir tedarikçi değerlendirme sürecinin en güçlü bileşenidir. Denetimde kullanılan başlıklar için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımıza, tedarik zinciri riskleri için [tedarik zinciri risk yönetimi](/blog/tedarik-zinciri-risk-yonetimi) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "sube-magaza-denetimi-rehberi",
    baslik: "Şube ve Mağaza Denetimi Nedir? Zincir İşletmeler İçin Rehber",
    ozet:
      "Şube (mağaza) denetimi, zincir işletme ve franchise şubelerinin marka standartlarına uygunluğunun değerlendirilmesidir. Kapsam ve gizli müşteri farkı.",
    tarih: "2026-05-28",
    kategori: "Denetim",
    icerik:
      "Çok şubeli işletmelerde her noktada aynı kaliteyi sunmak kolay değildir. Düzenli ve bağımsız şube denetimleri, marka standartlarının tüm şubelerde korunmasını sağlayan en etkili araçlardan biridir.\n\n" +
      "## Şube denetimi nedir?\n\n" +
      "Şube denetimi (mağaza denetimi); zincir işletmelerin, bayi ve franchise ağlarının şubelerini belirlenen marka standartlarına, operasyonel prosedürlere ve hijyen-güvenlik kurallarına uygunluk açısından bağımsız olarak değerlendirmesidir. Yapı olarak tedarik zincirindeki tarafları değerlendiren 2. taraf denetimine benzer; burada değerlendirilen taraf, kendi şube veya bayi ağınızdır.\n\n" +
      "## Hangi işletmeler şube denetimine ihtiyaç duyar?\n\n" +
      "- Zincir mağaza ve perakende markaları\n" +
      "- Restoran, kafe ve yiyecek-içecek zincirleri\n" +
      "- Franchise ve bayi ağıyla büyüyen markalar\n" +
      "- Banka şubeleri, yetkili servisler ve hizmet noktaları\n\n" +
      "## Şube denetiminde değerlendirilen başlıklar\n\n" +
      "- Operasyonel süreçlere ve standart prosedürlere uyum\n" +
      "- Hijyen, gıda güvenliği ve temizlik standartları\n" +
      "- İş sağlığı ve güvenliği ile yasal gerekliliklere uyum\n" +
      "- Görsel kimlik, ürün sunumu ve marka uyumu\n" +
      "- Müşteri deneyimi ve hizmet kalitesi\n" +
      "- Stok, kasa ve dokümantasyon düzeni\n\n" +
      "## Şube denetimi ile gizli müşteri farkı\n\n" +
      "Gizli müşteri (mystery shopper) kimliğini gizleyerek yalnızca müşteri deneyimini ölçer. Şube denetimi ise kimliği açık, kontrol listesine dayalı ve kanıta dayalı kapsamlı bir değerlendirmedir; operasyon, hijyen, güvenlik ve marka uyumu gibi alanları da kapsar. İkisi birbirini tamamlar.\n\n" +
      "## Bayi ve franchise denetimi\n\n" +
      "Bayi ve franchise modellerinde şubeler bağımsız işletmeciler tarafından yönetilir. Bu nedenle markanın belirlediği standartlara uyumun bağımsız bir denetimle doğrulanması, marka itibarını korumak için kritiktir.\n\n" +
      "## Düzenli şube denetiminin faydaları\n\n" +
      "- Tüm şubelerde tutarlı kalite ve marka deneyimi\n" +
      "- Sapmaların ve risklerin erken tespiti\n" +
      "- Şubeler arası karşılaştırılabilir performans verisi\n" +
      "- Müşteri memnuniyeti ve marka itibarının korunması\n\n" +
      "Şubelerinizi bağımsız bir gözle değerlendirmek için [şube ve mağaza denetimi hizmetimizi](/hizmetler/sube-denetimi); tedarikçilerinizi denetlemek için [tedarikçi denetimi hizmetimizi](/hizmetler/tedarikci-denetimi) inceleyebilirsiniz.",
    ilgiliHizmetler: ["sube-denetimi", "tedarikci-denetimi"],
  },
  {
    slug: "sube-denetimi-kontrol-listesi",
    baslik: "Şube Denetimi Kontrol Listesi: Mağaza Denetim Formunda Olması Gerekenler",
    ozet:
      "Mağaza denetim formunda olması gereken başlıklar, puanlama yaklaşımı ve şube denetimi kontrol listesi hazırlarken dikkat edilmesi gerekenler.",
    tarih: "2026-10-05",
    kategori: "Denetim",
    icerik:
      "Şube denetiminin değeri, kullanılan kontrol listesinin kalitesiyle doğrudan ilişkilidir. Her denetçinin aynı soruları aynı ölçütlerle sorduğu bir şube denetim formu; şubeler arasında karşılaştırılabilir veri üretir ve iyileştirme önceliklerini netleştirir.\n\n" +
      "## Şube denetimi kontrol listesi nedir?\n\n" +
      "Şube denetimi kontrol listesi (mağaza denetim formu), bir zincir işletmenin şubelerinde marka standartlarına, operasyonel prosedürlere, hijyen ve güvenlik kurallarına uyumun hangi sorularla ve hangi ölçütlerle değerlendirileceğini tanımlayan yapılandırılmış formdur. Her madde için uygun / kısmen uygun / uygun değil gibi bir değerlendirme ve gerektiğinde fotoğraflı kanıt kaydedilir.\n\n" +
      "## 1. Dış görünüm ve mağaza girişi\n\n" +
      "- Tabela, vitrin ve cephe temizliği, aydınlatmanın çalışır durumda olması\n" +
      "- Çalışma saatleri ve zorunlu bilgilendirmelerin görünür olması\n" +
      "- Giriş alanının, otoparkın ve engelli erişiminin düzeni\n\n" +
      "## 2. Mağaza düzeni ve görsel marka uyumu\n\n" +
      "- Planograma ve görsel düzen (merchandising) standartlarına uyum\n" +
      "- Kampanya ve tanıtım materyallerinin güncel ve doğru yerde olması\n" +
      "- Fiyat etiketlerinin eksiksiz ve kasadaki fiyatla tutarlı olması\n" +
      "- Reyonların dolu, düzenli ve temiz olması\n\n" +
      "## 3. Hijyen ve gıda güvenliği\n\n" +
      "- Satış alanı, depo, mutfak ve tuvaletlerin temizliği; temizlik çizelgelerinin güncelliği\n" +
      "- Soğuk zincir ve sıcaklık kayıtları\n" +
      "- Son kullanma tarihi geçmiş ürün kontrolü ve ilk giren ilk çıkar uygulaması\n" +
      "- Haşere kontrolü kayıtları ve personel hijyeni\n\n" +
      "## 4. Stok, depo ve kasa işlemleri\n\n" +
      "- Depo düzeni, ürünlerin yerden yüksekte ve etiketli saklanması\n" +
      "- Stok sayım farkları ve fire kayıtları\n" +
      "- Kasa açılış-kapanış prosedürleri, iade ve indirim yetkileri\n\n" +
      "## 5. İş sağlığı ve güvenliği\n\n" +
      "- Yangın tüplerinin yeri, dolum tarihleri ve acil çıkışların açık olması\n" +
      "- İlk yardım malzemeleri ve acil durum planları\n" +
      "- Elektrik panoları, istifleme ve kayma-düşme riskleri\n" +
      "- Personelin İSG eğitim kayıtları\n\n" +
      "## 6. Personel ve müşteri deneyimi\n\n" +
      "- Kıyafet ve kişisel görünüm standartları\n" +
      "- Müşteriyi karşılama, yönlendirme ve satış sonrası iletişim\n" +
      "- Şikâyet yönetimi ve müşteri geri bildirim kayıtları\n\n" +
      "## 7. Yasal ve idari gereklilikler\n\n" +
      "- İşyeri açma ve çalışma ruhsatı ile zorunlu belgelerin geçerliliği\n" +
      "- Fiyat ve tüketici mevzuatına ilişkin zorunlu bilgilendirmeler\n" +
      "- Merkezden gönderilen talimat ve duyuruların uygulanması\n\n" +
      "## Puanlama nasıl yapılmalı?\n\n" +
      "Tüm maddeleri eşit ağırlıkta puanlamak yanıltıcı olabilir. Gıda güvenliği veya yangın güvenliği gibi kritik maddeler daha yüksek ağırlıkla puanlanmalı, hatta tek başına \"kritik uygunsuzluk\" olarak işaretlenebilmelidir. Şube puanı genellikle 100 üzerinden hesaplanır ve şubeler bölge, format veya dönem bazında karşılaştırılır.\n\n" +
      "## Kontrol listesi hazırlarken dikkat edilmesi gerekenler\n\n" +
      "- Maddeler gözlemlenebilir ve ölçülebilir olmalı; yoruma açık ifadelerden kaçınılmalı\n" +
      "- Liste markanın gerçek standartlarından türetilmeli, genel şablonlar olduğu gibi kullanılmamalı\n" +
      "- Her uygunsuzluk için fotoğraf ve açıklama kaydı zorunlu tutulmalı\n" +
      "- Liste, sektör ve format farklılıklarına göre (cadde mağazası, AVM, istasyon) uyarlanmalı\n" +
      "- Yılda en az bir kez gözden geçirilip güncellenmeli\n\n" +
      "Şube denetiminin nasıl planlandığını ve gizli müşteriden farkını [şube ve mağaza denetimi rehberi](/blog/sube-magaza-denetimi-rehberi) yazımızda anlattık. Markanıza özel kontrol listesiyle şubelerinizi bağımsız bir gözle değerlendirmek için [şube ve mağaza denetimi hizmetimizi](/hizmetler/sube-denetimi) inceleyebilirsiniz.",
    ilgiliHizmetler: ["sube-denetimi", "tedarikci-denetimi"],
  },
  {
    slug: "tedarik-zinciri-risk-yonetimi",
    baslik: "Tedarik Zinciri Risk Yönetimi ve Denetimin Rolü",
    ozet:
      "Tedarik zinciri riskleri işletmenin sürekliliğini doğrudan etkiler. Başlıca riskleri, risk temelli yaklaşımı ve tedarikçi denetiminin rolünü ele alıyoruz.",
    tarih: "2026-05-24",
    kategori: "Denetim",
    icerik:
      "Bir işletmenin kalitesi ve sürekliliği, büyük ölçüde tedarik zincirinin sağlamlığına bağlıdır. Tedarik zinciri risk yönetimi, bu zincirdeki olası aksaklıkları önceden görüp azaltmayı amaçlar.\n\n" +
      "## Tedarik zinciri riski nedir?\n\n" +
      "Tedarik zinciri riski; bir tedarikçiden veya iş ortağından kaynaklanan ve ürün/hizmet kalitesini, teslimatı, maliyeti veya itibarı olumsuz etkileyebilecek belirsizliklerdir. Bu riskler tek bir tedarikçide başlayıp tüm zincire yayılabilir.\n\n" +
      "## Başlıca tedarik zinciri riskleri\n\n" +
      "- Kalite riskleri: uygunsuz ürün, tutarsız kalite, izlenebilirlik eksikliği\n" +
      "- Süreklilik riskleri: teslim gecikmeleri, kapasite ve finansal sorunlar\n" +
      "- Uygunluk riskleri: yasal, çevresel ve sosyal gerekliliklere uymama\n" +
      "- İtibar riskleri: tedarikçi kaynaklı etik veya çevresel sorunlar\n\n" +
      "## Riskleri yönetmede tedarikçi denetiminin rolü\n\n" +
      "Tedarikçi beyanları tek başına güvence sağlamaz. Bağımsız bir [tedarikçi denetimi](/hizmetler/tedarikci-denetimi); riskleri yerinde, kanıta dayalı biçimde değerlendirir ve henüz sorun yaşanmadan önlem alınmasını sağlar. Bu yönüyle denetim, risk yönetiminin önleyici bir aracıdır.\n\n" +
      "## Risk temelli tedarikçi denetimi yaklaşımı\n\n" +
      "Tüm tedarikçileri aynı sıklıkta denetlemek verimli değildir. Risk temelli yaklaşımda; kritik, yüksek hacimli veya geçmişinde uygunsuzluk bulunan tedarikçiler daha sık ve derinlemesine denetlenir. Denetim sıklığı ve kapsamı, tedarikçinin risk seviyesine göre belirlenir.\n\n" +
      "## Tedarik zinciri sürekliliği\n\n" +
      "Düzenli denetim ve performans izleme; tedarikçilerin standartlarını korumasını teşvik eder, sorunların erken çözülmesini sağlar ve tedarik zincirinin kesintisiz işlemesine katkıda bulunur.\n\n" +
      "Tedarikçi seçim ve izleme sürecinin tamamı için [tedarikçi değerlendirme kriterleri](/blog/tedarikci-degerlendirme-kriterleri) yazımıza; denetimin nasıl yürütüldüğü için [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "entegre-yonetim-sistemi-nedir",
    baslik: "Entegre Yönetim Sistemi (ISO 9001, 14001, 45001) Nedir?",
    ozet:
      "Birden fazla ISO standardını tek bir yönetim sistemi çatısında birleştiren entegre yönetim sistemi; tek denetim, daha az maliyet ve daha güçlü bir yönetim yapısı sağlar.",
    tarih: "2026-05-20",
    kategori: "Yönetim Sistemleri",
    icerik:
      "Kalite, çevre ve iş sağlığı güvenliği gibi farklı yönetim sistemlerini ayrı ayrı kurmak ve sürdürmek, kuruluşlar için tekrar eden iş yükü ve maliyet anlamına gelebilir. Entegre yönetim sistemi (EYS), bu standartları tek bir bütünleşik çatı altında toplayarak süreçleri sadeleştirir.\n\n" +
      "## Entegre yönetim sistemi nedir?\n\n" +
      "Entegre yönetim sistemi; ISO 9001 (kalite), ISO 14001 (çevre) ve ISO 45001 (iş sağlığı ve güvenliği) gibi standartların ortak gerekliliklerini tek bir yönetim yapısında birleştiren yaklaşımdır. Doküman yönetimi, risk değerlendirmesi, iç tetkik ve yönetim gözden geçirme gibi ortak süreçler tek elden yürütülür.\n\n" +
      "## Annex SL: ortak üst yapı\n\n" +
      "Günümüzdeki ISO yönetim sistemi standartları, Annex SL adı verilen ortak bir üst yapı (High Level Structure) kullanır. Bu sayede standartların madde başlıkları ve temel gereklilikleri büyük ölçüde örtüşür; bu da entegrasyonu kolaylaştırır.\n\n" +
      "## Entegre yönetim sisteminin avantajları\n\n" +
      "- Tek bir bütünleşik denetimle birden fazla standardın belgelendirilmesi\n" +
      "- Tekrar eden dokümantasyon ve süreçlerin azaltılması\n" +
      "- Daha düşük denetim ve yönetim maliyeti\n" +
      "- Departmanlar arası tutarlılık ve daha güçlü kurum kültürü\n" +
      "- Risklerin bütünsel olarak ele alınması\n\n" +
      "## Hangi standartlar entegre edilebilir?\n\n" +
      "En yaygın entegrasyon ISO 9001, ISO 14001 ve ISO 45001 üçlüsüdür. Enerji yoğun kuruluşlar buna ISO 50001 enerji yönetim sistemini de ekleyebilir. DVN Cert, bu standartlarda belgelendirme, tedarikçi ve şube denetimi ile eğitim süreçlerini açık kriterlerle yürütür.\n\n" +
      "Entegre belgelendirme süreci, ayrı ayrı belgelendirmeye kıyasla zaman ve kaynak tasarrufu sağlar. Kuruluşunuzun mevcut yönetim sistemlerini tek çatı altında değerlendirmek için belgelendirme hizmetlerimizi inceleyebilirsiniz.",
    ilgiliHizmetler: ["sistem-belgelendirme", "iso-9001", "iso-14001", "iso-45001"],
  },
  {
    slug: "belgelendirme-denetimine-hazirlik",
    baslik: "Belgelendirme Denetimine Nasıl Hazırlanılır? Aşama 1 ve Aşama 2 Tetkikleri",
    ozet:
      "ISO belgelendirme denetimi Aşama 1 ve Aşama 2 olmak üzere iki aşamadan oluşur. Tetkike hazırlık için yapılması gerekenleri ve sık karşılaşılan uygunsuzlukları derledik.",
    tarih: "2026-05-12",
    kategori: "Belgelendirme Süreci",
    icerik:
      "ISO belgelendirme denetimi, kuruluşun yönetim sisteminin standardın gerekliliklerini karşılayıp karşılamadığını bağımsız olarak değerlendiren yapılandırılmış bir süreçtir. İyi bir hazırlık, sürecin sorunsuz ilerlemesini sağlar.\n\n" +
      "## Aşama 1 tetkiki (ön tetkik)\n\n" +
      "Aşama 1 tetkiki, yönetim sistemi dokümantasyonunun ve genel hazırlık durumunun değerlendirildiği aşamadır. Bu aşamada tetkikçi; politika, hedefler, prosedürler ve kayıtların standardın şartlarını karşılayıp karşılamadığını inceler ve Aşama 2'nin planlamasını yapar.\n\n" +
      "## Aşama 2 tetkiki (belgelendirme tetkiki)\n\n" +
      "Aşama 2, yönetim sisteminin sahada nasıl uygulandığının kapsamlı olarak değerlendirildiği ana denetimdir. Süreç sahipleriyle görüşmeler yapılır, kayıtlar incelenir ve sistemin etkinliği yerinde gözlemlenir.\n\n" +
      "## Denetime hazırlık için öneriler\n\n" +
      "- Politika, hedef ve prosedürlerinizi güncel ve erişilebilir tutun\n" +
      "- En az bir tam iç tetkik ve yönetim gözden geçirme toplantısı tamamlayın\n" +
      "- Düzeltici faaliyet kayıtlarınızı ve kanıtlarını hazır bulundurun\n" +
      "- Çalışanların kendi süreç ve sorumluluklarına hâkim olduğundan emin olun\n" +
      "- Yasal yükümlülüklere uyum kayıtlarını gözden geçirin\n\n" +
      "## Sık karşılaşılan uygunsuzluklar\n\n" +
      "- Eksik veya güncellenmemiş kayıtlar\n" +
      "- İç tetkik veya yönetim gözden geçirmesinin yapılmamış olması\n" +
      "- Düzeltici faaliyetlerin etkinliğinin gösterilememesi\n" +
      "- Risk ve fırsatların yeterince ele alınmaması\n\n" +
      "Uygunsuzluk tespit edilmesi durumunda kuruluş düzeltici faaliyetleri planlar ve uygular. Belgelendirme sürecinin tüm adımları hakkında daha fazla bilgi için sistem belgelendirme hizmetimizi inceleyebilirsiniz.",
    ilgiliHizmetler: ["sistem-belgelendirme", "iso-9001"],
  },
  {
    slug: "iso-belgesi-gecerlilik-ve-yenileme",
    baslik: "ISO Belgesi Kaç Yılda Bir Yenilenir? Gözetim ve Yeniden Belgelendirme",
    ozet:
      "ISO sertifikaları 3 yıl geçerlidir. Bu süre boyunca yıllık gözetim tetkikleri ve üçüncü yılda yeniden belgelendirme tetkiki yapılır. Sürecin nasıl işlediğini açıklıyoruz.",
    tarih: "2026-05-04",
    kategori: "Belgelendirme Süreci",
    icerik:
      "ISO yönetim sistemi belgeleri süresiz değildir; belirli bir geçerlilik süresi vardır ve bu süre boyunca sistemin sürdürüldüğü periyodik denetimlerle teyit edilir.\n\n" +
      "## ISO belgesi kaç yıl geçerlidir?\n\n" +
      "ISO 9001, 14001, 45001 ve 50001 sertifikalarının geçerlilik süresi 3 yıldır. Bu süre, belgenin düzenlendiği tarihten itibaren başlar ve sertifika üzerinde belirtilir.\n\n" +
      "## Yıllık gözetim tetkikleri\n\n" +
      "Üç yıllık geçerlilik süresi boyunca her yıl bir kez gözetim tetkiki yapılır. Bu tetkikler, yönetim sisteminin standardın gerekliliklerini karşılamaya devam ettiğini doğrular ve genellikle sertifikanın düzenlenme tarihinden itibaren 12'şer aylık dönemlerde planlanır.\n\n" +
      "## Yeniden belgelendirme\n\n" +
      "Geçerlilik süresinin sonunda, belgenin yenilenmesi için yeniden belgelendirme tetkiki yapılır. Bu tetkik ilk belgelendirme tetkikine benzer kapsamdadır ve başarıyla tamamlandığında belge 3 yıl daha uzatılır.\n\n" +
      "## Belge askıya alınır mı?\n\n" +
      "Gözetim tetkiklerinin zamanında yapılmaması, uygunsuzlukların giderilmemesi veya sistemin sürdürülmemesi gibi durumlarda sertifika askıya alınabilir veya iptal edilebilir. Bu nedenle belge süresi boyunca sistemin canlı tutulması önemlidir.\n\n" +
      "Standartlara özel geçerlilik ve yenileme ayrıntıları için ilgili hizmet sayfalarımızı inceleyebilirsiniz.",
    ilgiliHizmetler: ["iso-9001", "iso-14001", "iso-50001"],
  },
];

export function blogGetir(slug: string): BlogYazisi | undefined {
  return blogYazilari.find((y) => y.slug === slug);
}
