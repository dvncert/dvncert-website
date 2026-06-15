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
 *   diğer  -> paragraf
 *
 * GO-LIVE: Yeni yazılar admin paneli/DBYS üzerinden de eklenebilecek.
 */

export type BlogYazisi = {
  slug: string;
  baslik: string;
  /** Meta açıklaması + kart özeti */
  ozet: string;
  /** ISO formatı: "YYYY-MM-DD" */
  tarih: string;
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
  {
    slug: "gida-tedarikci-denetimi",
    baslik: "Gıda Tedarikçi Denetimi: Gıda Güvenliği ve Hijyen Kriterleri",
    ozet:
      "Gıda tedarikçi denetimi; hammadde, ambalaj ve fason üreticilerin gıda güvenliği, hijyen ve izlenebilirlik kriterlerine uygunluğunu doğrular. Denetim başlıklarını ve referans standartları açıklıyoruz.",
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
      "Bu denetimler, kuruluşunuzun belirlediği kriterler ve ilgili standartların gereklilikleri doğrultusunda yürütülür; sonucunda akredite bir sertifika değil, ayrıntılı bir tedarikçi denetim raporu sunulur.\n\n" +
      "## Gıda tedarik zincirinde 2. taraf denetiminin rolü\n\n" +
      "Beyana veya yalnızca belgeye dayanmak gıdada yeterli değildir; üretim koşullarının yerinde gözlemlenmesi gerekir. Risk temelli bir yaklaşımla kritik tedarikçileri daha sık denetlemek, tedarik zinciri güvenliğini sürdürmenin en etkili yoludur.\n\n" +
      "Gıda tedarikçilerinizi bağımsız değerlendirmek için [tedarikçi denetimi (2. taraf denetimi) hizmetimizi](/hizmetler/2-taraf-denetimleri) inceleyebilir; denetim başlıklarının tamamı için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri"],
  },
  {
    slug: "tekstil-tedarikci-denetimi",
    baslik: "Tekstil ve Hazır Giyim Tedarikçi Denetimi: Kalite ve Sosyal Uygunluk",
    ozet:
      "Tekstil ve hazır giyim ihracatında alıcılar tedarikçilerden hem kalite hem de sosyal uygunluk bekler. Tekstil tedarikçi denetiminin kalite, sosyal uygunluk ve çevre başlıklarını ele alıyoruz.",
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
      "Tekstil tedarikçilerinizi değerlendirmek için [tedarikçi denetimi (2. taraf denetimi) hizmetimizi](/hizmetler/2-taraf-denetimleri); denetim başlıkları için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımızı inceleyebilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri"],
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
      "VDA 6.3, Alman otomotiv endüstrisinin geliştirdiği bir proses denetimi yöntemidir. Ürünün geliştirilmesinden seri üretime kadar her aşamadaki prosesleri risk temelli olarak değerlendirir ve tedarikçi denetimlerinde yaygın bir referanstır.\n\n" +
      "## Denetimde değerlendirilen başlıklar\n\n" +
      "- APQP (ileri ürün kalite planlaması) ve proje yönetimi\n" +
      "- PPAP (üretim parçası onay prosesi) dokümantasyonu\n" +
      "- FMEA ile risk analizi ve önleyici yaklaşım\n" +
      "- Proses kontrol planları ve SPC ile süreç yeterliliği\n" +
      "- İzlenebilirlik, hata izolasyonu ve uygunsuz ürün yönetimi\n" +
      "- Ölçüm sistemleri analizi (MSA) ve kalibrasyon\n\n" +
      "Bu denetimler, müşteri/OEM gereklilikleri ve ilgili otomotiv standartlarının kriterleri doğrultusunda yürütülür; sonucunda ayrıntılı bir tedarikçi denetim raporu sunulur.\n\n" +
      "## Otomotiv tedarik zincirinde 2. taraf denetiminin rolü\n\n" +
      "Otomotivde tek bir hatalı parti, geri çağırma ve ciddi maliyetlere yol açabilir. Risk temelli ve düzenli tedarikçi denetimleri; sorunları seri üretime ulaşmadan önce tespit ederek tedarik zincirinin güvenilirliğini korur.\n\n" +
      "Otomotiv tedarikçilerinizi değerlendirmek için [tedarikçi denetimi (2. taraf denetimi) hizmetimizi](/hizmetler/2-taraf-denetimleri); süreç ayrıntıları için [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızı inceleyebilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri"],
  },
  {
    slug: "2-taraf-denetimi-nedir",
    baslik: "2. Taraf Denetimi Nedir? 1., 2. ve 3. Taraf Denetim Farkları",
    ozet:
      "2. taraf denetimi (tedarikçi denetimi), bir kuruluşun tedarikçilerini ve iş ortaklarını değerlendirmesidir. 1., 2. ve 3. taraf denetim arasındaki farkları ve ne zaman hangisinin gerektiğini açıklıyoruz.",
    tarih: "2026-06-12",
    kategori: "Denetim",
    icerik:
      "Denetimler, kimin kimi değerlendirdiğine göre üç temel türe ayrılır: 1. taraf (iç denetim), 2. taraf (tedarikçi denetimi) ve 3. taraf (belgelendirme denetimi). Bu ayrımı bilmek, hangi durumda hangi denetime ihtiyaç duyduğunuzu doğru belirlemenizi sağlar.\n\n" +
      "## 1. taraf denetimi (iç denetim) nedir?\n\n" +
      "1. taraf denetimi, bir kuruluşun kendi yönetim sistemini, süreçlerini ve uygulamalarını kendi adına değerlendirdiği iç denetimdir. Amaç, standartlara ve iç prosedürlere uyumu kuruluşun kendisinin doğrulaması ve iyileştirme fırsatlarını görmesidir. ISO belgelendirmesi öncesinde yapılan iç tetkik bunun tipik bir örneğidir.\n\n" +
      "## 2. taraf denetimi (tedarikçi denetimi) nedir?\n\n" +
      "2. taraf denetimi (ikinci taraf denetimi), bir kuruluşun kendi tedarikçilerini, alt yüklenicilerini veya iş ortaklarını; belirlenen standartlara, sözleşme şartlarına ve yasal gerekliliklere uygunluk açısından değerlendirmesidir. Müşteri konumundaki kuruluş adına yürütülür ve uygulamada çoğunlukla \"tedarikçi denetimi\" olarak anılır. Sonucunda sertifika değil, ayrıntılı bir denetim raporu sunulur.\n\n" +
      "## 3. taraf denetimi (belgelendirme denetimi) nedir?\n\n" +
      "3. taraf denetimi, bağımsız ve akredite bir belgelendirme kuruluşunun yaptığı denetimdir. Örneğin ISO 9001 belgelendirmesi için yapılan denetim bir 3. taraf denetimidir ve başarıyla tamamlandığında uluslararası geçerli bir sertifika düzenlenir. Denetimi yapan taraf, denetlenen kuruluştan ve onun müşterilerinden bağımsızdır.\n\n" +
      "## 1., 2. ve 3. taraf denetim arasındaki farklar\n\n" +
      "- 1. taraf: Kuruluş kendi sistemini denetler (iç denetim). Çıktı: iç iyileştirme.\n" +
      "- 2. taraf: Kuruluş tedarikçisini/iş ortağını denetler (tedarikçi denetimi). Çıktı: denetim raporu.\n" +
      "- 3. taraf: Bağımsız akredite kuruluş denetler (belgelendirme). Çıktı: akredite sertifika.\n\n" +
      "## 2. taraf denetimi hangi durumlarda yapılır?\n\n" +
      "- Yeni bir tedarikçi seçimi ve onayı öncesinde\n" +
      "- Mevcut tedarikçilerin performansını periyodik olarak izlemek için\n" +
      "- Yeni bir sözleşme veya iş birliği başlamadan önce\n" +
      "- Tedarik zincirinde kalite, çevre, İSG veya sektörel risklerin yönetilmesi gerektiğinde\n\n" +
      "2. taraf denetiminin adım adım nasıl yürütüldüğünü [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızda anlattık. Tedarikçilerinizi bağımsız bir gözle değerlendirmek için [tedarikçi denetimi (2. taraf denetimi) hizmetimizi](/hizmetler/2-taraf-denetimleri); kendi şube, bayi ve franchise ağınız için ise [şube ve mağaza denetimi](/hizmetler/sube-denetimi) hizmetimizi inceleyebilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri", "sube-denetimi"],
  },
  {
    slug: "tedarikci-denetimi-nasil-yapilir",
    baslik: "Tedarikçi Denetimi Nasıl Yapılır? Adım Adım Süreç",
    ozet:
      "Tedarikçi denetimi (2. taraf denetimi); planlama, doküman incelemesi, saha denetimi, raporlama ve düzeltici faaliyet takibi adımlarından oluşur. Sürecin her aşamasını adım adım açıklıyoruz.",
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
      "Denetimde değerlendirilen başlıkların ayrıntısı için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımıza bakabilir; profesyonel destek için [tedarikçi denetimi (2. taraf denetimi) hizmetimizi](/hizmetler/2-taraf-denetimleri) inceleyebilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri"],
  },
  {
    slug: "tedarikci-denetimi-kontrol-listesi",
    baslik: "Tedarikçi Denetimi Kontrol Listesi (Checklist) ve Değerlendirme Başlıkları",
    ozet:
      "Tedarikçi denetiminde hangi başlıklar değerlendirilir? Kalite, üretim, İSG, çevre, sosyal uygunluk ve izlenebilirlik başlıklarını kapsayan bir tedarikçi denetimi kontrol listesi rehberi.",
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
      "Bu başlıkların hangi adımlarla sahada değerlendirildiğini [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızda bulabilirsiniz. Kapsamlı bir denetim için [tedarikçi denetimi (2. taraf denetimi) hizmetimizden](/hizmetler/2-taraf-denetimleri) yararlanabilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri"],
  },
  {
    slug: "tedarikci-degerlendirme-kriterleri",
    baslik: "Tedarikçi Değerlendirme Kriterleri ve Tedarikçi Seçimi",
    ozet:
      "Tedarikçi seçimi ve onayında hangi kriterler kullanılır? Tedarikçi değerlendirme kriterlerini, ön yeterlilik ve performans izleme aşamalarını ve denetimin bu süreçteki rolünü açıklıyoruz.",
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
      "Tedarikçi değerlendirmesi büyük ölçüde verilere ve beyana dayanır; bağımsız bir denetim ise bu verileri yerinde kanıtla doğrular. Bu nedenle [tedarikçi denetimi (2. taraf denetimi)](/hizmetler/2-taraf-denetimleri), sağlam bir tedarikçi değerlendirme sürecinin en güçlü bileşenidir. Denetimde kullanılan başlıklar için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi) yazımıza, tedarik zinciri riskleri için [tedarik zinciri risk yönetimi](/blog/tedarik-zinciri-risk-yonetimi) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri"],
  },
  {
    slug: "sube-magaza-denetimi-rehberi",
    baslik: "Şube ve Mağaza Denetimi Nedir? Zincir İşletmeler İçin Rehber",
    ozet:
      "Şube denetimi (mağaza denetimi), zincir işletmelerin ve franchise ağlarının şubelerini marka standartlarına uygunluk açısından değerlendirmesidir. Kapsamını, faydalarını ve gizli müşteriden farkını açıklıyoruz.",
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
      "Şubelerinizi bağımsız bir gözle değerlendirmek için [şube ve mağaza denetimi hizmetimizi](/hizmetler/sube-denetimi); tedarikçilerinizi denetlemek için [tedarikçi denetimi (2. taraf denetimi) hizmetimizi](/hizmetler/2-taraf-denetimleri) inceleyebilirsiniz.",
    ilgiliHizmetler: ["sube-denetimi", "2-taraf-denetimleri"],
  },
  {
    slug: "tedarik-zinciri-risk-yonetimi",
    baslik: "Tedarik Zinciri Risk Yönetimi ve Denetimin Rolü",
    ozet:
      "Tedarik zinciri riskleri işletmenin sürekliliğini doğrudan etkiler. Başlıca riskleri, risk temelli bir yaklaşımı ve 2. taraf (tedarikçi) denetiminin riskleri yönetmedeki rolünü ele alıyoruz.",
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
      "## Riskleri yönetmede 2. taraf denetiminin rolü\n\n" +
      "Tedarikçi beyanları tek başına güvence sağlamaz. Bağımsız bir [tedarikçi denetimi (2. taraf denetimi)](/hizmetler/2-taraf-denetimleri); riskleri yerinde, kanıta dayalı biçimde değerlendirir ve henüz sorun yaşanmadan önlem alınmasını sağlar. Bu yönüyle denetim, risk yönetiminin önleyici bir aracıdır.\n\n" +
      "## Risk temelli tedarikçi denetimi yaklaşımı\n\n" +
      "Tüm tedarikçileri aynı sıklıkta denetlemek verimli değildir. Risk temelli yaklaşımda; kritik, yüksek hacimli veya geçmişinde uygunsuzluk bulunan tedarikçiler daha sık ve derinlemesine denetlenir. Denetim sıklığı ve kapsamı, tedarikçinin risk seviyesine göre belirlenir.\n\n" +
      "## Tedarik zinciri sürekliliği\n\n" +
      "Düzenli denetim ve performans izleme; tedarikçilerin standartlarını korumasını teşvik eder, sorunların erken çözülmesini sağlar ve tedarik zincirinin kesintisiz işlemesine katkıda bulunur.\n\n" +
      "Tedarikçi seçim ve izleme sürecinin tamamı için [tedarikçi değerlendirme kriterleri](/blog/tedarikci-degerlendirme-kriterleri) yazımıza; denetimin nasıl yürütüldüğü için [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımıza bakabilirsiniz.",
    ilgiliHizmetler: ["2-taraf-denetimleri"],
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
      "En yaygın entegrasyon ISO 9001, ISO 14001 ve ISO 45001 üçlüsüdür. Enerji yoğun kuruluşlar buna ISO 50001 enerji yönetim sistemini de ekleyebilir. DVN Cert, bu standartlarda belgelendirme, ikinci taraf denetim ve eğitim süreçlerini açık kriterlerle yürütür; TÜRKAK akreditasyon süreci tamamlandığında resmi kapsam ayrıca duyurulacaktır.\n\n" +
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
