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
};

/** Bir blog slug'ına ait curated SSS'i getirir (yoksa boş dizi). */
export function blogSSSGetir(slug: string): BlogSSSorusu[] {
  return blogSSS[slug] ?? [];
}
