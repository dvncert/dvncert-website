/**
 * DVN Cert - Bayi, franchise ve denetim firması seçimi içerik kümesi
 * (ikinci taraf denetim).
 *
 * Tedarikçi kümesiyle (lib/blog-tedarikci-kumesi.ts) aynı biçim: her bölüm bir
 * soruyla başlar ve ilk cümlesi soruya doğrudan yanıt verir — arama ve yapay
 * zekâ yanıtlarında kaynak gösterilebilmek için. lib/blog.ts listesinin başına
 * eklenir. SSS'leri lib/blog-sss.ts'te, arama başlıkları lib/blog-seo.ts'te.
 */

import type { BlogYazisi } from "./blog";

const BAYI = "/hizmetler/bayi-denetimi";
const SUBE = "/hizmetler/sube-denetimi";
const TEDARIKCI = "/hizmetler/tedarikci-denetimi";

export const bayiKumesi: BlogYazisi[] = [
  {
    slug: "bayi-denetimi-kontrol-listesi",
    baslik: "Bayi Denetimi Kontrol Listesi: Bayi Denetim Formunda Hangi Başlıklar Olmalı?",
    ozet:
      "Bayi denetimi kontrol listesi; sözleşme yükümlülükleri, görsel kimlik, satış süreci, servis, garanti, orijinal parça ve yasal belgeleri kapsar. Başlıkları ve puanlamayı açıklıyoruz.",
    tarih: "2026-11-12",
    kategori: "Denetim",
    icerik:
      "Bayi denetimi kontrol listesi, bir markanın bağımsız bayilerini, yetkili satıcılarını ve yetkili servislerini aynı ölçütlerle değerlendirmek için kullandığı yapılandırılmış soru listesidir. İyi bir liste; bayi sözleşmesindeki yükümlülükleri, marka ve showroom standartlarını, satış ve satış sonrası süreçleri, garanti ve orijinal parça kullanımını, iş sağlığı ve güvenliğini ve yasal belgeleri kapsar; her soru kanıta dayalı olarak cevaplanır ve puanlanır. Bu yazıda bayi denetim formunda bulunması gereken başlıkları ve puanlamanın nasıl kurgulanacağını ele alıyoruz.\n\n" +
      "## Bayi denetimi kontrol listesi neden şube listesinden farklıdır?\n\n" +
      "Bayi, markanın kendi şubesi değil, sözleşmeyle bağlı bağımsız bir işletmedir; bu yüzden bayi listesi operasyon standartlarının yanında sözleşme yükümlülüklerine de ağırlık verir. Şube denetimi listesi mağaza düzeni, hijyen ve müşteri karşılama gibi operasyonel konulara odaklanır (bkz. [şube denetimi kontrol listesi](/blog/sube-denetimi-kontrol-listesi)). Bayi listesinde ise yetki bölgesi, asgari stok, personel ve eğitim şartları, garanti işlemleri ve orijinal parça kullanımı gibi ticari ve teknik yükümlülükler de sorgulanır.\n\n" +
      "## Bayi denetim formunda hangi başlıklar olmalı?\n\n" +
      "Sektöre göre değişmekle birlikte bir bayi denetim formu genellikle şu başlıklardan oluşur:\n\n" +
      "| Başlık | Örnek kontrol soruları |\n" +
      "|---|---|\n" +
      "| Sözleşme yükümlülükleri | Bayi yetki bölgesi dışında satış yapıyor mu? Sözleşmedeki asgari stok ve teşhir şartları karşılanıyor mu? |\n" +
      "| Görsel kimlik ve showroom | Tabela, cephe, iç mekân ve teşhir alanları güncel marka kılavuzuna uygun mu? |\n" +
      "| Ürün teşhiri ve fiyatlandırma | Ürünler doğru teşhir ediliyor mu? Fiyat etiketleri mevcut ve güncel mi? |\n" +
      "| Satış süreci | Müşteri karşılama, ihtiyaç analizi, teklif ve sözleşme adımları marka standardına uygun mu? |\n" +
      "| Personel ve eğitim | Zorunlu marka eğitimleri tamamlanmış mı? Satış ve servis kadrosu şartlara uygun mu? |\n" +
      "| Satış sonrası hizmet ve servis | İş emri, arıza kaydı, teslim ve müşteri bilgilendirme süreçleri kayıt altında mı? |\n" +
      "| Orijinal parça ve onaylı ürün | Servis işlemlerinde orijinal veya onaylı parça kullanılıyor mu, kayıtlarla eşleşiyor mu? |\n" +
      "| Garanti işlemleri | Garanti talepleri kayıtlarla ve fiziksel kanıtla destekleniyor mu? |\n" +
      "| Müşteri şikâyetleri | Şikâyetler kayda alınıyor, süresinde yanıtlanıyor ve kapatılıyor mu? |\n" +
      "| İSG ve çevre | Servis alanında kişisel koruyucu donanım, yangın güvenliği ve atık yönetimi uygun mu? |\n" +
      "| Ticari ve yasal belgeler | Ruhsat, vergi levhası, sigorta ve sektörel izinler geçerli mi? |\n\n" +
      "## Sektöre göre hangi başlıklar eklenir?\n\n" +
      "Kontrol listesi, bayi ağının çalıştığı sektörün kritik risklerine göre genişletilir:\n\n" +
      "- Otomotiv ve iş makinesi bayileri: servis iş emri disiplini, kalibrasyonlu ekipman, test sürüşü ve teslim prosedürü, garanti kayıtlarının fiziksel parça ile eşleşmesi.\n" +
      "- Beyaz eşya ve elektronik yetkili satıcıları: teşhir ürünlerinin durumu, kampanya ve fiyat politikasına uyum, kurulum ve servis yönlendirmesi.\n" +
      "- Akaryakıt ve LPG istasyonları: pompa ve ölçüm kontrolleri, yangın ve patlama güvenliği, tank ve saha güvenliği, market ve hijyen standartları.\n" +
      "- Tarım girdisi bayileri: ürün depolama koşulları, son kullanma tarihleri, ruhsatlı ürün satışı ve kayıtları.\n\n" +
      "## Bayi denetiminde puanlama nasıl yapılır?\n\n" +
      "En yaygın yöntem, her başlığa önemine göre ağırlık verip soruları uygun, kısmen uygun ve uygun değil olarak puanlamak ve sonucu 100 üzerinden bayi puanına dönüştürmektir. Sözleşmenin esaslı şartlarına veya güvenliğe ilişkin bazı sorular \"kritik\" olarak işaretlenir; kritik bir uygunsuzluk, toplam puandan bağımsız olarak takip denetimini tetikler. Aynı ağırlıkların tüm bayilerde kullanılması, bölgeler ve bayiler arasında adil karşılaştırma yapılmasını sağlar.\n\n" +
      "## Kanıt nasıl toplanır?\n\n" +
      "Her bulgu bir kanıta dayanmalıdır: fotoğraf, incelenen kayıt (iş emri, garanti formu, fatura, eğitim sertifikası) veya yapılan görüşme. Fotoğraflı ve kayda dayalı kanıt, bayiyle yapılacak performans görüşmesinde bulgunun tartışılmasını önler ve düzeltici faaliyetin neyi kapatması gerektiğini netleştirir. Denetim raporunun yapısı için [tedarikçi denetim raporu](/blog/tedarikci-denetim-raporu) yazımızdaki ilkeler bayi raporları için de geçerlidir.\n\n" +
      "## Kontrol listesi ne sıklıkla güncellenmeli?\n\n" +
      "Kontrol listesi en az yılda bir kez ve marka standartları, bayi sözleşmesi veya mevzuat değiştiğinde gözden geçirilmelidir. Önceki denetim dönemlerinde hiç uygunsuzluk çıkmayan sorular sadeleştirilebilir; tekrarlayan sorunların görüldüğü alanlarda ise soru sayısı ve ağırlık artırılır.\n\n" +
      "DVN Cert olarak bayi denetimlerinde kontrol listesini markanızın bayi standartlarına göre sizinle birlikte hazırlıyor, bayileri bağımsız denetçilerle yerinde denetliyor ve bayi bazında puanlanmış, fotoğraflı raporlar sunuyoruz. Ayrıntılar için [bayi denetimi](" + BAYI + ") hizmetimizi inceleyebilirsiniz.",
    ilgiliHizmetler: ["bayi-denetimi", "sube-denetimi"],
  },
  {
    slug: "franchise-denetimi-nedir",
    baslik: "Franchise Denetimi Nedir? Franchise Veren Marka Neyi, Nasıl Denetler?",
    ozet:
      "Franchise denetimi, franchise alanın işlettiği noktanın operasyon el kitabına ve franchise sözleşmesine uyumunun bağımsızca doğrulanmasıdır. Kapsamını ve sürecini anlatıyoruz.",
    tarih: "2026-11-12",
    kategori: "Denetim",
    icerik:
      "Franchise denetimi, franchise veren markanın, franchise alanın işlettiği satış noktasında operasyon el kitabına, franchise sözleşmesine, görsel kimlik ve ürün standartlarına, hijyen ve güvenlik kurallarına uyulup uyulmadığını yerinde değerlendirmesidir. Denetim marka adına ve markanın kriterleriyle yürütüldüğü için bir ikinci taraf denetimdir; sonucunda sertifika değil, puanlanmış bir denetim raporu düzenlenir.\n\n" +
      "## Franchise denetimi neden yapılır?\n\n" +
      "Franchise modelinde müşteri, noktayı kimin işlettiğini bilmez; tek bir noktadaki kötü deneyim tüm markanın itibarına yansır. Franchise denetimi; marka standardının her noktada aynı seviyede uygulanıp uygulanmadığını ölçer, sözleşmeden sapmaları erken tespit eder ve franchise alanla yapılan performans görüşmelerine nesnel veri sağlar. Düzenli denetim, iyi çalışan noktaların öne çıkarılmasına ve destek ihtiyacı olan noktaların belirlenmesine de yardımcı olur.\n\n" +
      "## Franchise denetiminde neler kontrol edilir?\n\n" +
      "Franchise denetimi tipik olarak şu alanları kapsar:\n\n" +
      "- Operasyon el kitabına uyum: açılış-kapanış, hazırlık, servis ve temizlik prosedürleri\n" +
      "- Görsel kimlik: tabela, dekorasyon, menü ve kampanya materyallerinin güncel marka kılavuzuna uygunluğu\n" +
      "- Ürün standartları: reçete, porsiyon, sunum ve ürün kalitesi\n" +
      "- Onaylı tedarikçi kullanımı: hammadde ve ürünlerin markanın onayladığı kaynaklardan alınıp alınmadığı\n" +
      "- Hijyen ve gıda güvenliği: depolama sıcaklıkları, son kullanma tarihleri, kişisel hijyen ve temizlik kayıtları\n" +
      "- İş sağlığı ve güvenliği: yangın güvenliği, ekipman güvenliği ve acil durum hazırlığı\n" +
      "- Personel ve eğitim: zorunlu marka eğitimleri, kıyafet ve müşteri karşılama standardı\n" +
      "- Sözleşme yükümlülükleri: çalışma saatleri, kampanyalara katılım, raporlama ve kayıt yükümlülükleri\n\n" +
      "Hangi başlıkların nasıl soruya dönüştürüleceğini [şube denetimi kontrol listesi](/blog/sube-denetimi-kontrol-listesi) yazımızda örneklerle anlattık.\n\n" +
      "## Franchise denetimi, şube ve bayi denetiminden nasıl ayrılır?\n\n" +
      "Üç denetim de ikinci taraf denetimdir; fark, denetlenen noktanın markayla ilişkisinden doğar:\n\n" +
      "| Denetim türü | Denetlenen nokta | Ana odak |\n" +
      "|---|---|---|\n" +
      "| Şube denetimi | Markanın kendi işlettiği şube | Operasyon ve marka standartları |\n" +
      "| Franchise denetimi | Franchise alanın işlettiği, markanın tüm sistemini kullanan nokta | Operasyon el kitabı ve franchise sözleşmesi |\n" +
      "| Bayi denetimi | Markanın ürünlerini satan veya servisini veren bağımsız işletme | Bayi sözleşmesi, satış ve servis süreçleri, garanti |\n\n" +
      "Kendi şubeleriniz ve franchise noktalarınız için [şube ve mağaza denetimi](" + SUBE + "), bağımsız satış ve servis ağınız için [bayi denetimi](" + BAYI + ") hizmetimizi inceleyebilirsiniz.\n\n" +
      "## Franchise denetimi nasıl yapılır?\n\n" +
      "Franchise denetimi dört adımda ilerler:\n\n" +
      "1. Kriterlerin belirlenmesi: Operasyon el kitabı ve franchise sözleşmesi esas alınarak kontrol listesi ve puanlama ağırlıkları hazırlanır.\n" +
      "2. Saha denetimi: Nokta habersiz veya önceden bildirilerek ziyaret edilir; gözlem, kayıt incelemesi ve görüşmelerle kanıt toplanır.\n" +
      "3. Raporlama: Bulgular puanlanır, fotoğraflarla desteklenir ve öncelik seviyesiyle raporlanır.\n" +
      "4. Takip: Franchise alanın düzeltici faaliyetleri izlenir; kritik bulgularda doğrulama denetimi yapılır.\n\n" +
      "## Franchise denetimi habersiz yapılabilir mi?\n\n" +
      "Evet, franchise sözleşmesi markaya denetim hakkı tanıyorsa habersiz denetim yapılabilir ve noktanın olağan işleyişini en doğru gösteren yöntem budur. Kayıt ve belge incelemesi ağırlıklı denetimlerde ise önceden bildirim, ilgili sorumlunun hazır bulunmasını sağlar. Birçok marka iki yöntemi belirli bir oranla birlikte kullanır.\n\n" +
      "## Denetimi neden bağımsız bir kuruluş yapmalı?\n\n" +
      "Markanın saha ekibi franchise alanla ticari ve kişisel bir ilişki içindedir; bu durum değerlendirmenin tarafsızlığını zayıflatabilir ve noktalar arasında tutarsız puanlamaya yol açabilir. Bağımsız bir denetçi tüm noktaları aynı ölçütle değerlendirir; raporlar, sözleşme yaptırımı gibi hassas kararlarda daha kolay savunulur. Bağımsız denetimin tedarik zincirindeki karşılığı için [tedarikçi denetimi](" + TEDARIKCI + ") hizmetimize bakabilirsiniz.",
    ilgiliHizmetler: ["sube-denetimi", "bayi-denetimi"],
  },
  {
    slug: "tedarikci-denetim-firmasi-nasil-secilir",
    baslik: "Tedarikçi Denetim Firması Nasıl Seçilir? İkinci Taraf Denetimde 8 Seçim Kriteri",
    ozet:
      "Tedarikçi, şube veya bayi denetimini dışarıdan yaptıracaksanız denetim firmasını tarafsızlık, denetçi yetkinliği, rapor kalitesi ve online takip gibi kriterlerle seçin.",
    tarih: "2026-11-12",
    kategori: "Denetim",
    icerik:
      "Tedarikçi denetim firması seçerken en önemli kriterler tarafsızlık, denetçi yetkinliği, sektör deneyimi, kontrol listesinin size göre uyarlanabilmesi, rapor kalitesi, kapsama alanı ve denetimlerin online takip edilebilmesidir. İkinci taraf denetimi dışarıdan yaptırmak, denetimin sizin adınıza ama bağımsız bir gözle yapılması demektir; bu nedenle denetim firmasının seçimi, denetim sonuçlarının güvenilirliğini doğrudan belirler. Bu yazıda tedarikçi, şube ve bayi denetimlerinde kullanabileceğiniz sekiz seçim kriterini ele alıyoruz.\n\n" +
      "## İkinci taraf denetim neden dışarıdan yaptırılır?\n\n" +
      "Kendi ekibinizle yapılan denetimler; kapasite, coğrafi erişim ve tarafsızlık açısından sınırlıdır. Satın alma veya satış ekibi denetlenen tarafla ticari ilişki içindedir; çok sayıda tedarikçi, şube veya bayi olduğunda düzenli denetim için yeterli kadro bulunmaz. Bağımsız bir denetim firması aynı kontrol listesini tüm ağa tutarlı biçimde uygular ve sonuçları karşılaştırılabilir hâle getirir. Denetim türleri arasındaki fark için [birinci, ikinci ve üçüncü taraf denetim farkı](/blog/birinci-ikinci-ucuncu-taraf-denetim-farki) yazımıza bakabilirsiniz.\n\n" +
      "## Denetim firması seçerken hangi kriterlere bakılmalı?\n\n" +
      "Aşağıdaki sekiz kriter, teklif aldığınız firmaları karşılaştırmak için bir kontrol listesi olarak kullanılabilir:\n\n" +
      "1. Tarafsızlık ve çıkar çatışması yönetimi: Firma, denetlediği tedarikçiye aynı konuda danışmanlık veriyor mu? Denetçilerin denetlenen taraflarla ilişkisi nasıl kontrol ediliyor?\n" +
      "2. Denetçi yetkinliği: Denetçilerin ilgili standart (ISO 9001, ISO 14001, ISO 45001, IATF 16949, VDA 6.3 gibi) ve denetim tekniği eğitimleri, saha deneyimi ve performans izlemesi var mı?\n" +
      "3. Sektör deneyimi: Gıda, tekstil, otomotiv, perakende veya bayi ağı gibi sektörünüzün kritik risklerini bilen denetçi atanabiliyor mu?\n" +
      "4. Kontrol listesinin uyarlanabilirliği: Firma kendi hazır formunu mu dayatıyor, yoksa sizin şartnamenize, sözleşmenize ve marka standartlarınıza göre liste hazırlayabiliyor mu?\n" +
      "5. Rapor kalitesi: Bulgular kanıtla (fotoğraf, kayıt, görüşme) destekleniyor mu? Puanlama, öncelik seviyesi ve düzeltici faaliyet talebi açık mı? İsterseniz örnek bir anonim rapor isteyin.\n" +
      "6. Online takip ve şeffaflık: Denetim planı, bulgular, açık uygunsuzluklar ve rapor onayı tek bir sistemden izlenebiliyor mu, yoksa her şey e-posta ve Excel ile mi yürüyor?\n" +
      "7. Kapsama alanı ve esneklik: Tedarikçi, şube veya bayilerinizin bulunduğu bölgelere denetçi gönderilebiliyor mu? Yerinde, uzaktan ve karma denetim seçenekleri var mı?\n" +
      "8. Gizlilik: Denetim bulguları ve tedarikçi bilgileri gizlilik taahhüdü altında mı tutuluyor? Raporlara kimlerin erişebildiği tanımlı mı?\n\n" +
      "## Teklif alırken hangi soruları sormalısınız?\n\n" +
      "- Denetçi kadronuz kimlerden oluşuyor; sektörümüzde kaç denetim yaptınız?\n" +
      "- Kontrol listesini bizim şartlarımıza göre birlikte hazırlayabilir miyiz?\n" +
      "- Bir denetim raporu örneğini (anonimleştirilmiş) görebilir miyiz?\n" +
      "- Bulguların ve düzeltici faaliyetlerin takibini nasıl yapıyorsunuz?\n" +
      "- Denetimleri online izleyebilir ve raporları sistem üzerinden onaylayabilir miyiz?\n" +
      "- Ücret neye göre belirleniyor; seyahat ve raporlama ücrete dahil mi?\n\n" +
      "## En sık yapılan seçim hatası nedir?\n\n" +
      "En sık hata, denetim firmasını yalnızca denetim günü ücretine göre seçmektir. Düşük ücretli ama kanıtsız, puanlaması belirsiz veya takibi yapılmayan bir denetim, uygunsuzlukların kapanmasını sağlamaz ve satın alma kararlarına güvenilir veri üretmez. Değerlendirmeyi denetim başına maliyet yerine, kapanan uygunsuzluk ve azalan kalite şikâyeti gibi sonuçlar üzerinden yapmak daha doğrudur.\n\n" +
      "## DVN Cert bu kriterleri nasıl karşılar?\n\n" +
      "DVN Cert, ikinci taraf denetimlerini tarafsızlık, bağımsızlık ve gizlilik ilkeleriyle yürütür; denetlediği taraflara danışmanlık vermez. Kontrol listelerini sizin şartnamenize ve standartlarınıza göre birlikte hazırlar, bulguları kanıtlarıyla birlikte puanlanmış raporla sunar. Tedarikçi denetimleri, [DBYS üzerinden online](/blog/tedarikci-denetim-yonetimi-yazilimi) yönetilir: denetim planlaması, denetçi ataması, bulgu ve uygunsuzluk takibi ve raporların online onayı tek sistemde yürür. Hizmetlerimiz için [tedarikçi denetimi](" + TEDARIKCI + "), [şube ve mağaza denetimi](" + SUBE + ") ve [bayi denetimi](" + BAYI + ") sayfalarımızı inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi", "bayi-denetimi", "sube-denetimi"],
  },
];
