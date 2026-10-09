/**
 * DVN Cert - Blog yazılarına özel Sıkça Sorulan Sorular (slug bazlı).
 *
 * NEDEN AYRI DOSYA: Blog gövdesi (icerik) prod'da DB'den beslenir; ancak FAQ
 * yapısal verisi + görünür FAQ bloğu, DB şemasına dokunmadan build-zamanı
 * lib'ten okunabilsin diye burada slug'a göre tutulur. Blog detay sayfası
 * (app/blog/[slug]/page.tsx) bu haritadan okur: varsa görünür FAQ akordeonu
 * render eder VE FAQPage JSON-LD üretir. Google kuralı gereği şema, sayfada
 * GÖRÜNEN içerikle eşleşmelidir — bu yüzden ikisi de aynı kaynaktan gelir.
 *
 * Cevaplar düz metindir (markdown/link parse edilmez). Her yazı için 3-4 soru.
 */

export type BlogSSSorusu = { soru: string; cevap: string };

export const blogSSS: Record<string, BlogSSSorusu[]> = {
  // ---------- Tedarikçi (ikinci taraf) denetimi soru-cevap kümesi ----------
  "birinci-ikinci-ucuncu-taraf-denetim-farki": [
    {
      soru: "İkinci taraf denetim nedir?",
      cevap:
        "İkinci taraf denetim, bir kuruluşun tedarikçisini, fason üreticisini, alt yüklenicisini veya bayi ve şubelerini kendi belirlediği kriterlere göre denetlemesidir. En yaygın örneği tedarikçi denetimidir. Denetim müşteri kuruluş veya onun adına bağımsız bir denetim firması tarafından yapılır ve sonucunda sertifika değil denetim raporu düzenlenir.",
    },
    {
      soru: "Birinci, ikinci ve üçüncü taraf denetim arasındaki fark nedir?",
      cevap:
        "Birinci taraf denetimde kuruluş kendi sistemini denetler (iç denetim). İkinci taraf denetimde kuruluş tedarikçisini veya iş ortağını denetler (tedarikçi denetimi). Üçüncü taraf denetimde ise bağımsız bir belgelendirme kuruluşu denetim yapar ve olumlu sonuçta sertifika düzenler.",
    },
    {
      soru: "Belgelendirme denetimi kaçıncı taraf denetimdir?",
      cevap:
        "Belgelendirme denetimi üçüncü taraf denetimdir. Denetlenen kuruluşla ticari ilişkisi olmayan bağımsız bir belgelendirme kuruluşu tarafından, ISO 9001 gibi bir standardın şartlarına göre yapılır.",
    },
    {
      soru: "İkinci taraf denetimini bağımsız bir firma yapabilir mi?",
      cevap:
        "Evet. İkinci taraf denetim müşteri kuruluş adına yapılan denetimdir; kuruluşun kendi kalite veya satın alma ekibi yapabileceği gibi bağımsız bir denetim firmasına da yaptırılabilir. Bağımsız denetçi ticari ilişkiden kaynaklanan önyargıyı azaltır ve tedarikçiler arasında aynı ölçütlerle karşılaştırma sağlar.",
    },
  ],
  "iso-9001-tedarikci-denetimi-zorunlu-mu": [
    {
      soru: "ISO 9001'de tedarikçi denetimi zorunlu mu?",
      cevap:
        "Her tedarikçi için zorunlu değildir. ISO 9001 madde 8.4, dış tedarikçilerin değerlendirilmesini, seçilmesini, performanslarının izlenmesini ve kontrol edilmesini şart koşar; kontrolün türünü ise tedarikçinin ürün uygunluğu üzerindeki etkisine göre kuruluş belirler. Kritik tedarikçilerde bu kontrolün en güçlü yolu tedarikçi denetimidir.",
    },
    {
      soru: "ISO 9001 madde 8.4 nedir?",
      cevap:
        "ISO 9001:2015 madde 8.4, dışarıdan sağlanan proses, ürün ve hizmetlerin kontrolünü düzenler. Dış tedarikçilerin değerlendirme ve seçim kriterlerinin belirlenmesini, kontrolün türü ve kapsamının riske göre tanımlanmasını ve şartların tedarikçiye açıkça iletilmesini ister.",
    },
    {
      soru: "Hangi tedarikçiler denetlenmelidir?",
      cevap:
        "Ürüne doğrudan giren hammadde ve parçaları sağlayan, fason üretim yapan veya ürün güvenliğini etkileyen kritik tedarikçiler öncelikli olarak denetlenmelidir. Düşük etkili tedarikçiler için belge incelemesi ve performans takibi genellikle yeterlidir.",
    },
  ],
  "tedarikci-denetim-raporu": [
    {
      soru: "Tedarikçi denetim raporunda neler bulunur?",
      cevap:
        "Rapor; tedarikçi ve denetim bilgilerini, kapsam ve kriterleri, yönetici özetini, bölüm bazında puanları, objektif kanıtlarıyla birlikte bulguları ve sınıflarını, olumlu yönleri, düzeltici faaliyet taleplerini ve onaylı, koşullu onaylı veya onaysız şeklindeki sonuç kararını içerir.",
    },
    {
      soru: "Majör ve minör uygunsuzluk arasındaki fark nedir?",
      cevap:
        "Majör uygunsuzluk ürün uygunluğunu veya müşteri güvenliğini doğrudan riske atan, sistematik bir eksikliktir ve hızlı düzeltici faaliyet ile doğrulama gerektirir. Minör uygunsuzluk ise tekil ve sistemi bozmayan bir eksikliktir; belirlenen sürede düzeltilmesi beklenir.",
    },
    {
      soru: "Tedarikçi denetiminde puanlama nasıl yapılır?",
      cevap:
        "Kontrol listesindeki her soru bir ölçekle (ör. 0-10) puanlanır, bölümler önemine göre ağırlıklandırılır ve genel başarı yüzdesi hesaplanır. Sonuç eşik değerlerle sınıflandırılır; tek bir majör uygunsuzluk ise yüksek puana rağmen sonucu koşullu onay veya onaysıza düşürebilir.",
    },
  ],
  "tedarikci-denetimi-sorulari": [
    {
      soru: "Tedarikçi denetiminde hangi sorular sorulur?",
      cevap:
        "Kalite yönetimi, üretim ve proses kontrolü, izlenebilirlik, ölçüm ve kalibrasyon, uygun olmayan ürün, satın alma ve alt tedarikçiler, depolama ve sevkiyat ile iş sağlığı, güvenliği ve çevre başlıklarında; her yanıtın kayıt veya sahada gözlemle kanıtlanmasını isteyen açık uçlu sorular sorulur.",
    },
    {
      soru: "Tedarikçi denetiminde sorular nasıl sorulmalı?",
      cevap:
        "Evet/hayır soruları yerine \"nasıl yapıyorsunuz, gösterir misiniz?\" kalıbıyla açık uçlu sorulmalı, incelenecek kayıt ve partileri denetçi seçmeli ve yönetimin anlattıkları sahadaki uygulama ve operatör görüşmeleriyle karşılaştırılmalıdır.",
    },
    {
      soru: "Tedarikçi denetim soru listesi her sektörde aynı mı?",
      cevap:
        "Hayır. Temel başlıklar ortaktır; ancak gıdada hijyen ve gıda güvenliği, otomotivde proses yeterliliği ve PPAP, tekstilde sosyal uygunluk ve kimyasal yönetimi gibi sektöre özgü sorular eklenmeli ve liste sözleşme şartlarına göre uyarlanmalıdır.",
    },
  ],
  "fason-uretici-denetimi": [
    {
      soru: "Fason üretici denetimi nedir?",
      cevap:
        "Fason üretici denetimi, ürününüzü sizin adınıza veya markanızla üreten firmanın üretim koşullarını, kalite kontrolünü, izlenebilirliğini, şartnameye uyumunu ve yasal uyumunu yerinde değerlendiren ikinci taraf denetimidir.",
    },
    {
      soru: "Fason üretimde ürün sorumluluğu kimdedir?",
      cevap:
        "Üretim fason firmada yapılsa da ürün sizin markanızı taşıdığı için kalite, güvenlik ve itibar sorumluluğu büyük ölçüde marka sahibinde kalır. Bu nedenle fason üreticinin şartlarınızı uyguladığının yerinde doğrulanması önemlidir.",
    },
    {
      soru: "Fason üretici ne sıklıkla denetlenmelidir?",
      cevap:
        "İlk sipariş öncesinde onay denetimi, ardından risk ve performansa göre genellikle yılda bir periyodik denetim yapılır. Kalite şikâyeti, geri çağırma, tesis veya proses değişikliği gibi durumlarda ek denetim planlanır.",
    },
  ],
  "uzaktan-tedarikci-denetimi": [
    {
      soru: "Uzaktan tedarikçi denetimi geçerli midir?",
      cevap:
        "Evet. İkinci taraf denetimlerinde yöntemi müşteri kuruluş belirler; ISO 19011:2018 de uzaktan tetkik yöntemlerine ilişkin rehberlik içerir. Ancak saha gözlemi gerektiren durumlarda uzaktan denetim tek başına yeterli değildir.",
    },
    {
      soru: "Uzaktan denetim hangi durumlarda yeterli olmaz?",
      cevap:
        "Yeni ve kritik bir tedarikçinin ilk onayında, ciddi bir kalite şikâyeti sonrasında ve gıda, ilaç, otomotiv gibi yüksek riskli üretimlerde; üretim, hijyen ve depolama koşullarının doğrudan gözlemlenmesi gerektiği için yerinde denetim önerilir.",
    },
    {
      soru: "Karma (hibrit) tedarikçi denetimi nedir?",
      cevap:
        "Doküman incelemesi ve yönetim görüşmelerinin uzaktan, saha gözleminin ise kısa bir yerinde ziyaretle yapıldığı denetim yöntemidir. Seyahat süresini azaltırken saha gözlemini korur.",
    },
  ],
  // ---------- Taraf denetimleri kümesi ----------
  "tedarikci-denetimi-nedir": [
    {
      soru: "Tedarikçi denetimi ile belgelendirme denetimi arasındaki fark nedir?",
      cevap:
        "Tedarikçi denetimi, bir kuruluşun kendi tedarikçisini veya iş ortağını kendi belirlediği kriterlere göre denetlemesidir ve sertifika ile sonuçlanmaz. Belgelendirme denetimi ise bağımsız ve tarafsız bir belgelendirme kuruluşunun standart şartlarına göre yaptığı, sertifika ile sonuçlanan denetimdir.",
    },
    {
      soru: "Tedarikçi denetimi ile 2. taraf denetimi aynı şey mi?",
      cevap:
        "Evet. Tedarikçi denetimi, denetim literatüründe 2. taraf (ikinci taraf) denetimi olarak geçer; kuruluşun mal veya hizmet aldığı tedarikçileri değerlendirmesini ifade eder. Aynı yaklaşım fason üretici, bayi ve şube denetimlerinde de uygulanır.",
    },
    {
      soru: "ISO belgesi olan tedarikçinin ayrıca denetlenmesi gerekir mi?",
      cevap:
        "Kritik tedarikçilerde çoğu zaman evet. ISO belgesi tedarikçinin yönetim sisteminin standarda uygun olduğunu gösterir; ancak sizin ürününüze ve sözleşmenize özgü şartları karşıladığını garanti etmez. Tedarikçi denetimi bu özel şartları yerinde doğrular.",
    },
    {
      soru: "Tedarikçi denetimi sonunda sertifika verilir mi?",
      cevap:
        "Hayır. Tedarikçi denetimi bir belgelendirme faaliyeti değildir; sonucunda ISO sertifikası düzenlenmez. Denetim, bulguları ve iyileştirme önerilerini içeren bir rapor ile sonuçlanır; bu rapor tedarikçi onayı ve performans değerlendirmesinde kullanılır.",
    },
  ],
  "tedarikci-denetimi-nasil-yapilir": [
    {
      soru: "Tedarikçi denetimi hangi adımlardan oluşur?",
      cevap:
        "Tedarikçi denetimi genellikle planlama ve kriterlerin belirlenmesi, saha (veya uzaktan) denetiminin yürütülmesi, bulguların raporlanması ve düzeltici faaliyetlerin takibi adımlarından oluşur. Kapsam ve kontrol listesi, denetimi talep eden kuruluşun beklentilerine göre şekillenir.",
    },
    {
      soru: "Tedarikçi denetimi yerinde mi yoksa uzaktan mı yapılır?",
      cevap:
        "Her ikisi de mümkündür. Saha koşullarının, üretim süreçlerinin ve fiziksel kontrollerin değerlendirilmesi gereken durumlarda yerinde denetim tercih edilir; doküman ve kayıt incelemesinin öne çıktığı durumlarda uzaktan (online) denetim uygulanabilir. Sıklıkla ikisi birlikte, karma bir yaklaşımla yürütülür.",
    },
    {
      soru: "Tedarikçi denetimi ne kadar sürer?",
      cevap:
        "Süre; tedarikçinin büyüklüğüne, faaliyet alanına, denetim kapsamına ve lokasyon sayısına göre değişir. Tek bir tedarikçi için saha denetimi çoğu zaman bir ile birkaç gün arasında tamamlanır; raporlama ve düzeltici faaliyet takibi ise sonraki günlere yayılır.",
    },
  ],
  "sube-magaza-denetimi-rehberi": [
    {
      soru: "Şube denetimi ile gizli müşteri (mystery shopper) arasındaki fark nedir?",
      cevap:
        "Gizli müşteri, kimliğini gizleyen bir değerlendiricinin müşteri deneyimini ölçmesidir. Şube denetimi ise kimliği açık bir denetçinin; marka standartları, hijyen, stok, güvenlik ve operasyonel süreçleri belirlenmiş kriterlere göre sistematik biçimde değerlendirmesidir. İkisi birbirini tamamlayabilir.",
    },
    {
      soru: "Bayi ve franchise işletmeleri şube denetimi kapsamına girer mi?",
      cevap:
        "Evet. Zincir mağazaların yanı sıra bayi, franchise ve yetkili servis ağları da şube denetimi kapsamında değerlendirilebilir. Bu denetimler, marka standartlarının farklı işletmeler arasında tutarlı biçimde uygulandığını doğrulamayı amaçlar.",
    },
    {
      soru: "Şube denetiminde neler değerlendirilir?",
      cevap:
        "Marka ve hizmet standartlarına uyum, hijyen ve temizlik, ürün/stok yönetimi, görsel düzen (merchandising), personel uygulamaları, iş sağlığı ve güvenliği ile müşteri deneyimi tipik değerlendirme başlıklarıdır. Kriterler, işletmeye özel bir kontrol listesiyle önceden belirlenir.",
    },
  ],
  "sube-denetimi-kontrol-listesi": [
    {
      soru: "Şube denetimi kontrol listesinde hangi başlıklar olmalı?",
      cevap:
        "Dış görünüm ve giriş, mağaza düzeni ve görsel marka uyumu, hijyen ve gıda güvenliği, stok-depo ve kasa işlemleri, iş sağlığı ve güvenliği, personel ve müşteri deneyimi ile yasal-idari gereklilikler temel başlıklardır. Liste, markanın kendi standartlarına göre özelleştirilmelidir.",
    },
    {
      soru: "Mağaza denetim formu nasıl puanlanır?",
      cevap:
        "Maddeler genellikle uygun / kısmen uygun / uygun değil şeklinde değerlendirilir ve 100 üzerinden şube puanı hesaplanır. Gıda güvenliği veya yangın güvenliği gibi kritik maddelere daha yüksek ağırlık verilmesi, hatta tek başına kritik uygunsuzluk sayılması önerilir.",
    },
    {
      soru: "Şube denetim formu ne sıklıkla güncellenmeli?",
      cevap:
        "Kontrol listesi en az yılda bir kez ve marka standartlarında, mevzuatta veya mağaza formatlarında değişiklik olduğunda gözden geçirilmelidir. Güncelleme sonrasında puanların önceki dönemlerle karşılaştırılabilirliği de dikkate alınmalıdır.",
    },
  ],
  "vda-6-3-nedir": [
    {
      soru: "VDA 6.3 nedir?",
      cevap:
        "VDA 6.3, Alman Otomotiv Sanayii Birliği (VDA) tarafından yayımlanan proses denetimi standardıdır. Ürün geliştirmeden seri üretime ve müşteri hizmetlerine kadar prosesleri standart bir soru kataloğu ve puanlama sistemiyle risk temelli olarak değerlendirir.",
    },
    {
      soru: "VDA 6.3 ile IATF 16949 arasındaki fark nedir?",
      cevap:
        "IATF 16949 otomotiv kalite yönetim sistemi standardıdır ve belgelendirme ile sonuçlanır. VDA 6.3 ise bir proses denetimi yöntemidir; sonucunda sertifika değil, puanlı bir rapor ve A/B/C sınıflandırması çıkar. Pek çok OEM, IATF 16949'un gerektirdiği üretim prosesi denetimlerinin VDA 6.3 yöntemiyle yapılmasını ister.",
    },
    {
      soru: "VDA 6.3 denetiminde A, B ve C ne anlama gelir?",
      cevap:
        "Toplam uygunluk %90 ve üzerindeyse A (uygun), %80 ile %90 arasındaysa B (koşullu uygun), %80'in altındaysa C (uygun değil) olarak sınıflandırılır. Tek tek soruların veya süreç elemanlarının düşük puan alması, toplam puandan bağımsız olarak sınıflandırmayı düşürebilir.",
    },
    {
      soru: "VDA 6.3 hangi süreç elemanlarından oluşur?",
      cevap:
        "P1 potansiyel analizi, P2 proje yönetimi, P3 ürün ve proses geliştirmenin planlanması, P4 ürün ve proses geliştirmenin gerçekleştirilmesi, P5 tedarikçi yönetimi, P6 proses analizi/üretim ve P7 müşteri desteği, müşteri memnuniyeti ve servis olmak üzere yedi süreç elemanından oluşur.",
    },
  ],
  // ---------- ISO belgelendirme kümesi ----------
  "iso-14001-2026-degisiklikler-ve-gecis": [
    {
      soru: "ISO 14001:2026 ne zaman yayımlandı?",
      cevap:
        "ISO 14001:2026, 15 Nisan 2026 tarihinde yayımlanmış ve ISO 14001:2015'in yerini almıştır. Yeni sürüm, 2024 yılında yayımlanan iklim değişikliği tadilini de içermekte ve ISO'nun güncel uyumlaştırılmış yapısıyla hizalanmaktadır.",
    },
    {
      soru: "ISO 14001:2026 geçiş süresi ne kadar?",
      cevap:
        "Geçiş süresi, standardın yayımından itibaren üç yıl olarak öngörülmüştür. Bu takvime göre ISO 14001:2015'e göre düzenlenmiş sertifikalar Nisan 2029'da geçerliliğini yitirir. Geçiş kurallarının bağlayıcı kaynağı, ISO tarafından yayımlanan standart metni ve ilgili uluslararası geçiş dokümanlarıdır.",
    },
    {
      soru: "ISO 14001:2015 belgem geçiş süresi içinde geçerli mi?",
      cevap:
        "Evet. Gözetim tetkikleri zamanında yapıldığı ve sistem sürdürüldüğü sürece ISO 14001:2015 sertifikaları geçiş süresi boyunca geçerliliğini korur. Geçiş süresinin sonuna kadar geçiş tetkiki tamamlanmazsa belge geçerliliğini yitirir.",
    },
    {
      soru: "ISO 14001:2026 geçiş tetkiki ayrı bir denetim mi?",
      cevap:
        "Geçiş tetkiki, planlı bir gözetim veya yeniden belgelendirme tetkikiyle birlikte yürütülebileceği gibi ayrı bir tetkik olarak da yapılabilir. Her iki durumda da yeni şartların karşılandığını doğrulamak için ek tetkik süresi ayrılır ve sonuç bağımsız bir belgelendirme kararıyla sonuçlandırılır.",
    },
  ],
  // ---------- "ISO ... belgesi" kümesi (belge odaklı; süreç yazılarını tamamlar) ----------
  "iso-9001-belgesi": [
    {
      soru: "ISO 9001 belgesi kaç yıl geçerlidir?",
      cevap:
        "ISO 9001 belgesinin geçerlilik süresi üç yıldır. Bu süre boyunca planlanan aralıklarla gözetim tetkikleri yapılır; üçüncü yılın sonunda yeniden belgelendirme tetkiki gerçekleştirilerek belge yenilenir.",
    },
    {
      soru: "ISO 9001 belgesi ürünün kalitesini belgelendirir mi?",
      cevap:
        "Hayır. ISO 9001 bir yönetim sistemi belgesidir; kuruluşun süreçlerini tanımlı ve izlenebilir biçimde yönettiğini gösterir. Tek tek ürünlerin teknik uygunluğunu belgelendirmez ve bu nedenle belge ile marka, ürün üzerinde veya ürün uygunluğunu çağrıştıracak şekilde kullanılamaz.",
    },
    {
      soru: "ISO 9001 belgesinin gerçek olup olmadığı nasıl anlaşılır?",
      cevap:
        "Belge, düzenleyen belgelendirme kuruluşunun sorgulama sistemi üzerinden teyit edilir. DVN Cert belgeleri sertifika sorgulama sayfasından sorgulanabilir.",
    },
    ],
  "iso-45001-belgesi": [
    {
      soru: "ISO 45001 belgesi yasal İSG yükümlülüklerinin yerine geçer mi?",
      cevap:
        "Hayır. Belge, iş sağlığı ve güvenliği mevzuatından doğan yükümlülüklerin yerine geçmez. Standart, kuruluşun uymakla yükümlü olduğu yasal şartları belirlemesini ve uyumu izlemesini şart koşar; mevzuata uyum sorumluluğu her durumda kuruluşa aittir.",
    },
    {
      soru: "ISO 45001 belgesini hangi kuruluşlar alabilir?",
      cevap:
        "Standart sektör ve ölçek ayrımı yapmaz; çalışanı olan her kuruluş başvurabilir. Küçük kuruluşlarda sistem daha az dokümantasyonla yürütülebilir, ancak tehlike tanımlama, risk değerlendirme ve çalışan katılımı şartlarında ölçeğe bağlı istisna tanınmaz.",
    },
    {
      soru: "ISO 45001 belgesi iş kazası yaşanmayacağını garanti eder mi?",
      cevap:
        "Hayır. Belge, İSG risklerini yönetmek için kurulan sistemin standart şartlarını karşıladığını gösterir; tek tek olayların yaşanmayacağını taahhüt etmez. Sistemin etkinliği, kuruluşun uygulamasına ve sürekli iyileştirmesine bağlıdır.",
    },
    {
      soru: "ISO 45001 belgesi ISO 9001 ile birlikte alınabilir mi?",
      cevap:
        "Evet. Standartlar ortak bir üst yapıyı paylaştığı için tek bir entegre yönetim sistemi altında ve birleşik bir tetkik programıyla belgelendirilebilir; bu yaklaşım toplam tetkik süresini ve tekrar eden faaliyetleri azaltır.",
    },
  ],
  "iso-14001-belgesi": [
    {
      soru: "ISO 14001 belgesi çevresel performansın iyi olduğunu mu gösterir?",
      cevap:
        "Belge, çevresel performansın belirli bir seviyede olduğunu değil; bu performansı yönetecek sistemin kurulduğunu ve uygulandığını gösterir. Standart, çevre boyutlarının belirlenmesini, yasal şartlara uyumun izlenmesini ve performansın ölçülmesini şart koşar.",
    },
    {
      soru: "ISO 14001:2026'ya geçmezsem mevcut belgem ne olur?",
      cevap:
        "Geçiş süresi sonunda önceki sürüme göre düzenlenmiş belgeler geçerliliğini yitirir. Kuruluşların bu süre içinde geçiş tetkikini tamamlayarak belgelerini yeni sürüme taşıması gerekir; geçiş tetkiki planlı bir gözetim veya yeniden belgelendirme tetkikiyle birlikte de yürütülebilir.",
    },
    {
      soru: "ISO 14001 belgesi kaç yıl geçerlidir?",
      cevap:
        "Belgenin geçerlilik süresi üç yıldır. Bu süre boyunca gözetim tetkikleri yapılır; üçüncü yılın sonunda yeniden belgelendirme tetkiki gerçekleştirilir.",
    },
    {
      soru: "Belgede yer almayan bir şubemiz için belgeye atıf yapabilir miyim?",
      cevap:
        "Hayır. Belge yalnızca kapsamda tanımlı faaliyet, ürün, hizmet ve lokasyonlar için geçerlidir; kapsam dışındaki bölüm, bağlı kuruluş veya iştiraklerde belgeye ve belgelendirme markasına atıf yapılamaz.",
    },
  ],
  "iso-50001-belgesi": [
    {
      soru: "ISO 50001 belgesi zorunlu mudur?",
      cevap:
        "ISO 50001 belgelendirmesi gönüllülük esasına dayanır. Bununla birlikte kamu programları, ihale şartnameleri veya müşteri sözleşmeleri belge talep edebilir; kuruluşunuz açısından bağlayıcı bir şart olup olmadığı ilgili mevzuat ve sözleşme hükümlerinden teyit edilmelidir.",
    },
    {
      soru: "ISO 50001 tetkik süresi neye göre belirlenir?",
      cevap:
        "Tetkik süresi ISO 50003 standardının kuralları çerçevesinde hesaplanır. Kuruluşun toplam enerji tüketimi, enerji kaynaklarının çeşitliliği, önemli enerji kullanım alanlarının sayısı ve saha sayısı gibi kriterler dikkate alınır.",
    },
    {
      soru: "ISO 50001 belgesi için enerji tüketiminin azalmış olması şart mı?",
      cevap:
        "Standart, enerji performansının sürekli iyileştirilmesini şart koşar ve tetkikte enerji verilerinin toplanması, performans göstergelerinin izlenmesi ile iyileşmenin kanıtlanabilir olması değerlendirilir. Belirli bir tasarruf yüzdesi standartta tanımlanmaz.",
    },
    {
      soru: "ISO 50001 belgesi diğer yönetim sistemleriyle birlikte belgelendirilebilir mi?",
      cevap:
        "Evet. ISO 50001; ISO 9001 ve ISO 14001 ile ortak bir yapıyı paylaşır ve entegre bir yönetim sistemi altında birleşik tetkik programıyla belgelendirilebilir.",
    },
  ],
  "iso-9001-kobiler-icin": [
    {
      soru: "ISO 9001 için asgari çalışan sayısı şartı var mı?",
      cevap:
        "Hayır. ISO 9001 standardı kuruluş büyüklüğüne, cirosuna veya sektörüne dair bir asgari şart içermez. Standart, her ölçekteki kuruluşun kendi yapısına uyarlayabileceği bir kalite yönetim sistemi çerçevesi sunar; farklılık, sistemin dokümantasyon düzeyinde ve rol dağılımında ortaya çıkar.",
    },
    {
      soru: "KOBİ'lerde tetkik süresi daha mı kısa olur?",
      cevap:
        "Genellikle evet. Tetkik süresi; çalışan sayısı, süreç karmaşıklığı, faaliyet gösterilen alan sayısı ve risk düzeyi gibi kriterlere göre hesaplanır. Bu nedenle küçük ölçekli bir kuruluşun tetkik süresi, benzer kapsamdaki büyük bir kuruluşa kıyasla daha kısa olur.",
    },
    {
      soru: "Küçük bir işletmede iç tetkik ve yönetimin gözden geçirmesi zorunlu mu?",
      cevap:
        "Evet. Standart, iç tetkik ve yönetimin gözden geçirmesi şartlarında kuruluş büyüklüğüne göre istisna tanımaz. Küçük ölçekli kuruluşlarda bu faaliyetler daha az kişi tarafından ve daha kısa sürede yürütülebilir; ancak faaliyetin kendisi atlanamaz.",
    },
    {
      soru: "Belgelendirme kuruluşu KOBİ'ye sistemin kurulmasında yardımcı olabilir mi?",
      cevap:
        "Hayır. ISO/IEC 17021-1 gereği belgelendirme kuruluşları, belgelendirdikleri kuruluşlara yönetim sisteminin nasıl kurulacağına dair danışmanlık veremez. Sistemin kurulması kuruluşun sorumluluğundadır; belgelendirme kuruluşunun rolü bağımsız ve tarafsız tetkiktir.",
    },
  ],
  "iso-9001-belgelendirme-nedir-nasil-alinir": [
    {
      soru: "ISO 9001 belgesi nasıl alınır?",
      cevap:
        "ISO 9001 belgesi; bağımsız bir belgelendirme kuruluşuna başvuru, Aşama 1 (doküman ve hazırlık incelemesi) ve Aşama 2 (yerinde belgelendirme denetimi) adımlarının ardından, tetkik ekibinden bağımsız bir belgelendirme kararıyla düzenlenir. Öncesinde kuruluşun kalite yönetim sistemini kurup uygulamaya alması gerekir.",
    },
    {
      soru: "ISO 9001 belgesi almak için danışmanlık şart mı?",
      cevap:
        "Hayır, danışmanlık zorunlu değildir. Kuruluş sistemini kendi iç kaynaklarıyla da kurabilir. Tarafsızlık ilkesi gereği belgelendirme kuruluşu, belge verdiği kuruluşa danışmanlık sunamaz; danışmanlık ihtiyacı varsa bağımsız danışmanlardan alınmalıdır.",
    },
    {
      soru: "ISO 9001 belgesi kaç yıl geçerlidir?",
      cevap:
        "ISO 9001 sertifikasının geçerlilik süresi 3 yıldır. Bu süre boyunca her yıl gözetim tetkiki yapılır; üçüncü yılın sonunda yeniden belgelendirme tetkikiyle belge yenilenir.",
    },
  ],
  "gozetim-tetkiki-nedir": [
    {
      soru: "Gözetim tetkiki ne sıklıkla yapılır?",
      cevap:
        "Gözetim tetkikleri, sertifikanın 3 yıllık geçerlilik süresi boyunca genellikle yılda bir kez, belgelendirme tarihinden itibaren 12'şer aylık dönemlerde yapılır. Üçüncü yılın sonunda ise gözetim yerine daha kapsamlı bir yeniden belgelendirme tetkiki gerçekleştirilir.",
    },
    {
      soru: "Gözetim tetkiki ile ilk belgelendirme tetkiki arasındaki fark nedir?",
      cevap:
        "İlk belgelendirme tetkiki (Aşama 1 ve Aşama 2), sistemin tüm maddelerini kapsamlı biçimde değerlendirir. Gözetim tetkiki ise daha dar kapsamlıdır; sistemin sürdürüldüğünü ve önceki bulguların kapatıldığını örnekleme yoluyla doğrulamaya odaklanır.",
    },
    {
      soru: "Gözetim tetkiki yapılmazsa ne olur?",
      cevap:
        "Gözetim tetkikinin zamanında yapılmaması veya erişim sağlanamaması, belgenin askıya alınmasına ya da iptaline yol açabilir. Bu tetkikler, belgenin geçerliliğinin sürmesi için bir ön koşuldur.",
    },
  ],
  "iso-belgesi-gecerlilik-ve-yenileme": [
    {
      soru: "ISO belgesi kaç yılda bir yenilenir?",
      cevap:
        "ISO sertifikaları 3 yıl geçerlidir ve üçüncü yılın sonunda yeniden belgelendirme tetkikiyle yenilenir. Geçerlilik süresi boyunca her yıl gözetim tetkiki yapılarak sistemin sürekliliği doğrulanır.",
    },
    {
      soru: "ISO belgesi hangi durumlarda askıya alınır veya iptal edilir?",
      cevap:
        "Gözetim tetkiklerinin zamanında yapılmaması, uygunsuzlukların belirlenen sürede giderilmemesi, yönetim sisteminin sürdürülmemesi veya belgenin yanıltıcı biçimde kullanılması belgenin askıya alınmasına yol açabilir. Askı süresince gerekli faaliyetler tamamlanmazsa belge iptal edilir.",
    },
    {
      soru: "Süresi dolan ISO belgesi nasıl yenilenir?",
      cevap:
        "Geçerlilik süresi dolmadan önce, ilk belgelendirmeye benzer kapsamda bir yeniden belgelendirme tetkiki planlanır. Sistemin son üç yıldaki performansı ve standardın güncel şartlarına uyumu değerlendirilir; olumlu sonuçta belge 3 yıl daha uzatılır.",
    },
  ],

  // ---------- Belgelendirme süreci, standartlar ve tedarikçi rehberleri ----------
  "cok-sahali-belgelendirme": [
    {
      soru: "Çok sahalı belgelendirme nedir?",
      cevap:
        "Çok sahalı belgelendirme, merkezi olarak yönetilen ve ortak bir yönetim sistemine sahip birden fazla lokasyonun tek bir sözleşme ve tek bir sertifika kapsamında değerlendirilmesidir. Her saha ayrı ayrı denetlenmez; tetkik ekibi örnekleme yöntemiyle sahaların bir kısmını ziyaret eder.",
    },
    {
      soru: "Çok sahalı belgelendirmede her şube denetlenir mi?",
      cevap:
        "Her tetkikte her şube denetlenmez. Her tetkik döneminde örnekleme ile farklı bir saha grubu ziyaret edilir; böylece belgenin geçerlilik süresi boyunca sahaların tamamı zaman içinde örnekleme kapsamına girer.",
    },
    {
      soru: "Çok sahalı belgelendirme için şartlar nelerdir?",
      cevap:
        "Tüm sahaların aynı yönetim sistemi, politika ve prosedürler altında çalışması ve merkezi bir yönetim tarafından denetlenmesi gerekir. İç tetkik programı tüm sahaları kapsamalı, iç tetkik ve yönetim gözden geçirme merkezi olarak planlanmalıdır. Merkezi kontrolün olmadığı sahalar ayrı ayrı belgelendirilir.",
    },
    {
      soru: "Çok sahalı belgelendirme ile şube denetimi aynı şey mi?",
      cevap:
        "Hayır. Çok sahalı belgelendirme, bağımsız bir belgelendirme kuruluşunun şubeleri üçüncü taraf olarak denetleyip tek bir ISO sertifikası düzenlemesidir. Şube ve mağaza denetimi ise markanın kendi kriterleriyle yapılan ikinci taraf denetimdir ve sonucunda sertifika değil denetim raporu sunulur.",
    },
  ],
  "belgelendirme-karari-nasil-verilir": [
    {
      soru: "ISO belgelendirme kararını kim verir?",
      cevap:
        "Belgelendirme kararını, o tetkike katılmamış ve tetkik ekibinden bağımsız bir karar verici verir. ISO/IEC 17021-1 standardı, tarafsızlığı korumak için tetkiki yürüten kişinin sertifika kararını tek başına vermesine izin vermez.",
    },
    {
      soru: "Belgelendirme kararında neler değerlendirilir?",
      cevap:
        "Karar verici; tetkik bulgularının standarda uygun değerlendirilip değerlendirilmediğini, uygunsuzlukların kapatılıp kapatılmadığını, tetkik ekibinin yetkinliğini ve kapsam ifadesinin tetkik edilen faaliyetlerle tutarlılığını inceler. Gerekirse ek bilgi veya açıklama talep edebilir.",
    },
    {
      soru: "Belgelendirme kararı olumsuz olursa ne olur?",
      cevap:
        "Bulgular yeterince kapatılmamışsa veya kanıtlar yetersizse karar verici ek bilgi isteyebilir, sertifikayı reddedebilir ya da mevcut bir belgeyi askıya alabilir. Karar olumluysa sertifika düzenlenir veya mevcut belgenin geçerliliği sürdürülür.",
    },
  ],
  "iso-9001-ve-iso-14001-farki": [
    {
      soru: "ISO 9001 ile ISO 14001 arasındaki fark nedir?",
      cevap:
        "ISO 9001 kalite yönetim sistemi standardıdır ve ürün/hizmet kalitesine, müşteri memnuniyetine ve süreç kontrolüne odaklanır. ISO 14001 ise çevre yönetim sistemi standardıdır ve çevresel etkilerin yönetimine, çevre mevzuatına uyuma ve çevresel performansın iyileştirilmesine odaklanır.",
    },
    {
      soru: "ISO 9001 ve ISO 14001 birlikte alınabilir mi?",
      cevap:
        "Evet. İki standart da Annex SL ortak üst yapısını kullandığı için tek bir entegre yönetim sistemi çatısı altında birleştirilebilir ve tek bir denetim programıyla belgelendirilebilir.",
    },
    {
      soru: "ISO 9001 ve ISO 14001'in ortak yönleri nelerdir?",
      cevap:
        "Her iki standart da kuruluşun bağlamı, liderlik, planlama, destek, operasyon, performans değerlendirme ve iyileştirme başlıklarını aynı sırayla içerir. Bu sayede doküman yönetimi, iç tetkik ve yönetim gözden geçirme gibi süreçler tek elden yürütülebilir.",
    },
  ],
  "belgelendirme-kapsami-nasil-belirlenir": [
    {
      soru: "Belgelendirme kapsamı nedir?",
      cevap:
        "Belgelendirme kapsamı, bir yönetim sistemi sertifikasının hangi faaliyet, ürün, hizmet, lokasyon ve süreçleri içerdiğini tanımlayan ve sertifika üzerinde yer alan resmi ifadedir. Belgenin geçerli olduğu sınırları netleştirir.",
    },
    {
      soru: "Belgelendirme kapsamını kim belirler?",
      cevap:
        "Kapsam başvuru aşamasında kuruluş tarafından tanımlanır ve belgelendirme kuruluşu tarafından aşama 1 tetkikinde gözden geçirilir. Kapsamın standardın şartlarına ve kuruluşun fiilen yürüttüğü faaliyetlere uygun olmadığı görülürse netleştirme istenir.",
    },
    {
      soru: "ISO sertifikasının kapsamı sonradan değiştirilebilir mi?",
      cevap:
        "Evet. Faaliyet alanı genişler veya daralırsa kapsam güncellemesi talep edilebilir; belgelendirme kuruluşu değişikliğin etkisine göre ek denetim gerekip gerekmediğine karar verir. Kapsam değişikliği sertifikanın geçerlilik süresini etkilemez, yalnızca belge üzerinde güncellenir.",
    },
  ],
  "iso-45001-belgelendirme-is-sagligi-guvenligi": [
    {
      soru: "ISO 45001 nedir?",
      cevap:
        "ISO 45001:2018, kuruluşların çalışanları ve işyerinde etkilenen diğer kişiler için güvenli ve sağlıklı çalışma koşulları sağlamasına yönelik şartları belirleyen iş sağlığı ve güvenliği yönetim sistemi standardıdır. Risk temelli ve çalışan katılımını esas alan bir yaklaşım sunar.",
    },
    {
      soru: "ISO 45001 belgesi ne işe yarar?",
      cevap:
        "ISO 45001 belgesi, iş kazası ve meslek hastalığı risklerinin sistematik olarak yönetildiğini ve yasal İSG yükümlülüklerine uyulduğunu gösterir. İhale ve tedarikçi şartlarında İSG performansını belgelemeye, kaza kaynaklı maliyet ve iş gücü kayıplarını azaltmaya yardımcı olur.",
    },
    {
      soru: "ISO 45001 belgelendirme süreci nasıl işler?",
      cevap:
        "Süreç; başvuru, aşama 1 (hazırlık) tetkiki, aşama 2 (saha) tetkiki, uygunsuzlukların kapatılması ve bağımsız belgelendirme kararı adımlarından oluşur. Belge geçerliliği boyunca yıllık gözetim tetkikleriyle sistemin sürdürüldüğü doğrulanır.",
    },
  ],
  "iso-14001-belgelendirme-cevre-yonetim-sistemi": [
    {
      soru: "ISO 14001 belgesi nedir?",
      cevap:
        "ISO 14001 belgesi, bir kuruluşun ISO 14001:2015 çevre yönetim sistemi standardına göre çevresel etkilerini kontrol altına aldığını ve çevresel performansını sürekli iyileştirdiğini gösteren sertifikadır. Bağımsız bir belgelendirme kuruluşunun tetkiki sonucunda verilir.",
    },
    {
      soru: "ISO 14001 belgesinin faydaları nelerdir?",
      cevap:
        "Çevre mevzuatına uyumu göstermeyi ve yaptırım riskini azaltmayı sağlar; enerji, su ve hammadde kullanımını iyileştirerek maliyetleri düşürür. Ayrıca atık ve emisyonların sistematik yönetimini, kurumsal itibarı ve ihale ile ihracattaki çevresel gerekliliklerin karşılanmasını destekler.",
    },
    {
      soru: "ISO 14001 belgelendirme nasıl yapılır?",
      cevap:
        "Belgelendirme; başvuru, aşama 1 ve aşama 2 tetkikleri, uygunsuzlukların kapatılması ve bağımsız belgelendirme kararı ile ilerler. Belge geçerliliği boyunca yıllık gözetim tetkikleri yapılır.",
    },
  ],
  "ic-denetci-ic-tetkikci-egitimi-nedir": [
    {
      soru: "İç denetçi eğitimi nedir?",
      cevap:
        "İç denetçi (iç tetkikçi) eğitimi, kuruluşun kendi yönetim sistemini planlı aralıklarla ve tarafsız biçimde denetleyecek kişilere gerekli yetkinliği kazandıran eğitimdir. Standart şartlarının yorumlanması, ISO 19011 tetkik prensipleri, tetkik planlama, delil toplama ve raporlama konularını kapsar.",
    },
    {
      soru: "İç denetçi eğitimine kimler katılmalı?",
      cevap:
        "Yönetim temsilcileri, kalite, İSG ve çevre sorumluları, süreç sahipleri ve iç tetkik ekibinde görev alacak tüm çalışanlar bu eğitimden yararlanır.",
    },
    {
      soru: "İç tetkik ile belgelendirme denetimi arasındaki fark nedir?",
      cevap:
        "İç tetkik, kuruluşun kendi sistemini kendi ekibiyle değerlendirdiği birinci taraf denetimdir. Belgelendirme denetimi ise bağımsız bir belgelendirme kuruluşunun yaptığı üçüncü taraf denetimdir. İç tetkik, belgelendirme denetiminden önce sistemin sağlığını gösteren en önemli araçtır.",
    },
    {
      soru: "İç tetkikçi kendi bölümünü denetleyebilir mi?",
      cevap:
        "Hayır, tarafsızlığın korunması için iç tetkikçiler doğrudan sorumlu oldukları alanı tetkik etmeyecek şekilde görevlendirilir.",
    },
  ],
  "iso-50001-belgelendirme-enerji-yonetim-sistemi": [
    {
      soru: "ISO 50001 nedir?",
      cevap:
        "ISO 50001:2018, bir kuruluşun enerji kullanımını ve tüketimini yönetmesi, enerji performansını izlemesi ve sürekli iyileştirmesi için gereken şartları belirleyen enerji yönetim sistemi standardıdır.",
    },
    {
      soru: "ISO 50001 belgesinin faydaları nelerdir?",
      cevap:
        "Enerji maliyetlerini ölçülebilir biçimde düşürmeyi ve enerji verimliliğini kurumsal bir sürece dönüştürmeyi sağlar. Sera gazı emisyonlarının azaltılmasını, yasal ve müşteri kaynaklı enerji gerekliliklerinin karşılanmasını ve sürdürülebilirlik ile ESG hedeflerini destekler.",
    },
    {
      soru: "Enerji performans göstergesi (EnPI) nedir?",
      cevap:
        "Enerji performans göstergeleri (EnPI), kuruluşun enerji performansını ölçmek için kullandığı göstergelerdir. Enerji temel çizgisi (baseline) ile birlikte ISO 50001 sisteminin ölçüm omurgasını oluşturur ve belgelendirmede bu verilerin izlenebilirliği özellikle önemlidir.",
    },
  ],
  "tekstil-tedarikci-denetimi": [
    {
      soru: "Tekstil tedarikçi denetimi nedir?",
      cevap:
        "Tekstil tedarikçi denetimi; konfeksiyon, dokuma, örme, boya-apre veya fason üreticilerin kalite, sosyal uygunluk ve çevre kriterlerine uygunluğunu değerlendiren ikinci taraf denetimdir. Marka ve perakendeciler fason üretim ağlarını kontrol etmek için yaygın olarak kullanır.",
    },
    {
      soru: "Tekstil tedarikçi denetiminde neler kontrol edilir?",
      cevap:
        "Dikiş, ölçü, renk ve aksesuar kalitesi, üretim ve kalite kontrol noktaları ile AQL örneklemeli son ürün kontrolü değerlendirilir. Bunlara ek olarak çalışma saatleri, ücret, çocuk işçi ve zorla çalıştırma yasakları gibi sosyal uygunluk başlıkları ile kimyasal, atık su ve atık yönetimi incelenir.",
    },
    {
      soru: "Tekstil ihracatında sosyal uygunluk denetimi neden önemli?",
      cevap:
        "Avrupa ve global alıcılar, tedarik zincirlerinde insan hakları ve etik iş uygulamalarını giderek daha sıkı şart koşuyor. Sosyal uygunluk gereklilikleri karşılanmadığında siparişler iptal olabilir; bu nedenle bağımsız denetim ihracat sürekliliği için kritiktir.",
    },
  ],
  "otomotiv-tedarikci-denetimi": [
    {
      soru: "Otomotiv tedarikçi denetimi nedir?",
      cevap:
        "Otomotiv tedarikçi denetimi, bir OEM'in veya Tier 1/Tier 2 tedarikçinin alt tedarikçilerini kalite, proses yeterliliği ve teslim güvenilirliği açısından değerlendirdiği ikinci taraf denetimdir. Amaç seri üretimde tutarlı kaliteyi ve sıfır hata hedefini güvence altına almaktır.",
    },
    {
      soru: "Otomotiv tedarikçi denetiminde hangi konular değerlendirilir?",
      cevap:
        "APQP ve proje yönetimi, PPAP dokümantasyonu, FMEA ile risk analizi, proses kontrol planları ve SPC, izlenebilirlik ile uygunsuz ürün yönetimi ve ölçüm sistemleri analizi (MSA) başlıca değerlendirme konularıdır.",
    },
    {
      soru: "Otomotiv tedarikçi denetiminde VDA 6.3 kullanılır mı?",
      cevap:
        "Evet. VDA 6.3, Alman otomotiv endüstrisinin geliştirdiği risk temelli bir proses denetimi yöntemidir; ürün geliştirmeden seri üretime kadar prosesleri değerlendirir ve otomotiv tedarikçi denetimlerinde yaygın bir referanstır.",
    },
  ],
  "gida-tedarikci-denetimi": [
    {
      soru: "Gıda tedarikçi denetimi nedir?",
      cevap:
        "Gıda tedarikçi denetimi, bir gıda işletmesinin hammadde, katkı, ambalaj veya fason üretim tedarikçilerini gıda güvenliği, hijyen ve yasal gerekliliklere uygunluk açısından değerlendirdiği ikinci taraf denetimdir. Sonucunda sertifika değil, ayrıntılı bir tedarikçi denetim raporu sunulur.",
    },
    {
      soru: "Gıda tedarikçi denetiminde neler kontrol edilir?",
      cevap:
        "HACCP planı ve kritik kontrol noktaları, personel hijyeni ve sanitasyon, haşere kontrolü, alerjen yönetimi ve çapraz bulaşma önlemleri incelenir. Hammadde kabul, depolama ve soğuk zincir koşulları ile izlenebilirlik ve geri çağırma hazırlığı da değerlendirilir.",
    },
    {
      soru: "Gıda tedarikçi denetiminde hangi standartlar referans alınır?",
      cevap:
        "ISO 22000, FSSC 22000, BRCGS ve IFS Food ile Codex Alimentarius ilkeleri ve ulusal gıda mevzuatı sık kullanılan referanslardır. Denetim, kuruluşun kendi belirlediği kriterlerle birlikte bu standartların gereklilikleri doğrultusunda yürütülür.",
    },
  ],
  "tedarikci-denetimi-kontrol-listesi": [
    {
      soru: "Tedarikçi denetimi kontrol listesinde neler olmalı?",
      cevap:
        "Tipik bir kontrol listesi; kalite yönetimi, üretim ve süreç kontrolü, iş sağlığı ve güvenliği ile çevre, sosyal uygunluk ve etik, dokümantasyon ve izlenebilirlik başlıklarını içerir. Liste kuruluşun kendi gereksinimlerine göre uyarlanmalıdır.",
    },
    {
      soru: "Tedarikçi denetim kontrol listesi nasıl puanlanır?",
      cevap:
        "Her başlık genellikle uygun, kısmen uygun, uygun değil şeklinde veya sayısal bir puanla değerlendirilir. Bulgular kritik, majör ve minör olarak önem derecesine göre sınıflandırılır; böylece tedarikçiler karşılaştırılabilir ve önceliklendirilmiş bir iyileştirme planı oluşturulabilir.",
    },
    {
      soru: "Tedarikçi denetiminde kontrol listesi neden kullanılır?",
      cevap:
        "Kontrol listesi, ikinci taraf denetimin her tedarikçide aynı kriterlerle ve aynı titizlikle yapılmasını sağlar. Bulguların puanlanması ve tedarikçilerin nesnel biçimde karşılaştırılması için yapılandırılmış bir liste gerekir.",
    },
  ],
  "tedarikci-degerlendirme-kriterleri": [
    {
      soru: "Tedarikçi değerlendirme kriterleri nelerdir?",
      cevap:
        "Başlıca kriterler; kalite yönetim sistemi ve ürün kalitesi, teslim performansı, fiyat ve toplam sahip olma maliyeti, kapasite ve finansal istikrar, yasal, çevresel ve sosyal uygunluk ile ISO 9001 gibi sertifikalar ve referanslardır.",
    },
    {
      soru: "Tedarikçi değerlendirme ne zaman yapılır?",
      cevap:
        "Tedarikçi değerlendirme hem yeni tedarikçi seçiminde onay öncesi ön yeterlilik olarak hem de onaylı tedarikçilerin performansını izlemek için onay sonrası düzenli olarak yapılır.",
    },
    {
      soru: "Tedarikçi değerlendirme ile tedarikçi denetimi arasındaki fark nedir?",
      cevap:
        "Tedarikçi değerlendirme büyük ölçüde verilere ve tedarikçi beyanına dayanır. Tedarikçi denetimi ise bu bilgileri yerinde ve kanıta dayalı olarak doğrulayan ikinci taraf denetimdir; bu yüzden sağlam bir değerlendirme sürecinin en güçlü bileşenidir.",
    },
  ],
  "tedarik-zinciri-risk-yonetimi": [
    {
      soru: "Tedarik zinciri riski nedir?",
      cevap:
        "Tedarik zinciri riski, bir tedarikçiden veya iş ortağından kaynaklanan ve kaliteyi, teslimatı, maliyeti veya itibarı olumsuz etkileyebilecek belirsizliklerdir. Bu riskler tek bir tedarikçide başlayıp tüm zincire yayılabilir.",
    },
    {
      soru: "Tedarik zinciri riskleri nelerdir?",
      cevap:
        "Başlıca riskler; uygunsuz ürün ve izlenebilirlik eksikliği gibi kalite riskleri, teslim gecikmesi ve finansal sorunlar gibi süreklilik riskleri, yasal ve sosyal gerekliliklere uymama gibi uygunluk riskleri ve tedarikçi kaynaklı etik veya çevresel sorunlardan doğan itibar riskleridir.",
    },
    {
      soru: "Risk temelli tedarikçi denetimi nedir?",
      cevap:
        "Risk temelli tedarikçi denetimi, denetim sıklığını ve kapsamını tedarikçinin risk seviyesine göre belirleme yaklaşımıdır. Kritik, yüksek hacimli veya geçmişinde uygunsuzluk bulunan tedarikçiler daha sık ve derinlemesine denetlenir.",
    },
  ],
  "entegre-yonetim-sistemi-nedir": [
    {
      soru: "Entegre yönetim sistemi nedir?",
      cevap:
        "Entegre yönetim sistemi (EYS), ISO 9001, ISO 14001 ve ISO 45001 gibi standartların ortak gerekliliklerini tek bir yönetim yapısında birleştiren yaklaşımdır. Doküman yönetimi, risk değerlendirmesi, iç tetkik ve yönetim gözden geçirme gibi ortak süreçler tek elden yürütülür.",
    },
    {
      soru: "Entegre yönetim sisteminin avantajları nelerdir?",
      cevap:
        "Birden fazla standart tek bir bütünleşik denetimle belgelendirilebilir; tekrar eden dokümantasyon azalır ve denetim ile yönetim maliyeti düşer. Ayrıca departmanlar arası tutarlılık artar ve riskler bütünsel olarak ele alınır.",
    },
    {
      soru: "Hangi ISO standartları entegre edilebilir?",
      cevap:
        "En yaygın entegrasyon ISO 9001, ISO 14001 ve ISO 45001 üçlüsüdür. Enerji yoğun kuruluşlar buna ISO 50001 enerji yönetim sistemini de ekleyebilir. Annex SL ortak üst yapısı bu entegrasyonu kolaylaştırır.",
    },
  ],
  "belgelendirme-denetimine-hazirlik": [
    {
      soru: "Aşama 1 ve aşama 2 tetkiki arasındaki fark nedir?",
      cevap:
        "Aşama 1 tetkikinde yönetim sistemi dokümantasyonu ve genel hazırlık durumu değerlendirilir ve aşama 2 planlanır. Aşama 2 ise sistemin sahada nasıl uygulandığının görüşmeler, kayıt incelemesi ve yerinde gözlemle kapsamlı olarak değerlendirildiği ana belgelendirme tetkikidir.",
    },
    {
      soru: "ISO belgelendirme denetimine nasıl hazırlanılır?",
      cevap:
        "Politika, hedef ve prosedürler güncel tutulmalı, en az bir tam iç tetkik ve yönetim gözden geçirme toplantısı tamamlanmalıdır. Düzeltici faaliyet kayıtları ve yasal uyum kayıtları hazır bulundurulmalı, çalışanların kendi süreç ve sorumluluklarına hâkim olduğundan emin olunmalıdır.",
    },
    {
      soru: "Belgelendirme denetiminde en sık hangi uygunsuzluklar çıkar?",
      cevap:
        "En sık görülenler; eksik veya güncellenmemiş kayıtlar, iç tetkik veya yönetim gözden geçirmesinin yapılmamış olması, düzeltici faaliyetlerin etkinliğinin gösterilememesi ve risk ve fırsatların yeterince ele alınmamasıdır.",
    },
  ],
};

/** Bir blog slug'ına ait curated SSS'i getirir (yoksa boş dizi). */
export function blogSSSGetir(slug: string): BlogSSSorusu[] {
  return blogSSS[slug] ?? [];
}
