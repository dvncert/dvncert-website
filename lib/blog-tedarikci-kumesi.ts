/**
 * DVN Cert - Tedarikçi (ikinci taraf) denetimi içerik kümesi
 *
 * Arama ve yapay zekâ yanıtlarında (Google AI Overviews vb.) kaynak
 * gösterilebilmek için soru odaklı yazılar: her bölüm bir soruyla başlar ve
 * ilk cümlesi soruya doğrudan yanıt verir. lib/blog.ts listesinin başına
 * eklenir; biçim kuralları için oradaki nota bakın. SSS'leri lib/blog-sss.ts'te.
 */

import type { BlogYazisi } from "./blog";

const HIZMET = "/hizmetler/tedarikci-denetimi";

export const tedarikciKumesi: BlogYazisi[] = [
  {
    slug: "birinci-ikinci-ucuncu-taraf-denetim-farki",
    baslik: "Birinci, İkinci ve Üçüncü Taraf Denetim Nedir? Farkları ve Karşılaştırma Tablosu",
    ozet:
      "İkinci taraf denetim, bir kuruluşun tedarikçisini veya iş ortağını kendi kriterlerine göre denetlemesidir. Birinci, ikinci ve üçüncü taraf denetimlerin tanımlarını, farklarını ve hangi durumda hangisinin gerektiğini tabloyla açıklıyoruz.",
    tarih: "2026-10-08",
    kategori: "Denetim",
    icerik:
      "Denetimler, denetimi kimin kim adına yaptığına göre üçe ayrılır: kuruluşun kendi kendini denetlediği birinci taraf (iç) denetim, kuruluşun tedarikçisini veya iş ortağını denetlediği ikinci taraf denetim ve bağımsız bir kuruluşun yaptığı üçüncü taraf denetim. Bu sınıflandırma, yönetim sistemleri tetkik kılavuzu olan ISO 19011:2018 standardında da aynı biçimde yer alır.\n\n" +
      "## İkinci taraf denetim nedir?\n\n" +
      "İkinci taraf denetim (2. taraf denetim); bir kuruluşun mal veya hizmet satın aldığı tedarikçisini, fason üreticisini, alt yüklenicisini ya da kendi adına faaliyet gösteren bayi ve şubelerini, kendi belirlediği kriterlere göre denetlemesidir. Günlük kullanımda en yaygın adı tedarikçi denetimidir. Denetim, müşteri konumundaki kuruluş tarafından veya onun adına bağımsız bir denetim firması tarafından yapılır ve sonucunda sertifika değil, bulguları içeren bir denetim raporu düzenlenir.\n\n" +
      "## Birinci taraf denetim nedir?\n\n" +
      "Birinci taraf denetim, kuruluşun kendi yönetim sistemini ve süreçlerini kendi adına denetlemesidir; iç denetim veya iç tetkik olarak da bilinir. ISO 9001, ISO 14001 ve ISO 45001 gibi standartlar planlı aralıklarla iç denetim yapılmasını şart koşar. Ayrıntı için [iç denetçi eğitimi nedir](/blog/ic-denetci-ic-tetkikci-egitimi-nedir) yazımıza bakabilirsiniz.\n\n" +
      "## Üçüncü taraf denetim nedir?\n\n" +
      "Üçüncü taraf denetim, denetlenen kuruluşla ve onun müşterileriyle ticari ilişkisi olmayan bağımsız bir kuruluş tarafından yapılan denetimdir. Belgelendirme denetimleri (ör. ISO 9001 belgelendirme tetkiki) ve yasal düzenleyici denetimler bu gruptadır. Belgelendirme denetimi olumlu sonuçlanırsa kuruluşa sertifika düzenlenir.\n\n" +
      "## Birinci, ikinci ve üçüncü taraf denetim karşılaştırması\n\n" +
      "| Ölçüt | Birinci taraf (iç denetim) | İkinci taraf (tedarikçi denetimi) | Üçüncü taraf (belgelendirme denetimi) |\n" +
      "|---|---|---|---|\n" +
      "| Kim denetler? | Kuruluşun kendisi | Müşteri kuruluş veya onun adına bağımsız denetçi | Bağımsız belgelendirme kuruluşu |\n" +
      "| Kim denetlenir? | Kuruluşun kendi süreçleri | Tedarikçi, fason üretici, alt yüklenici, bayi, şube | Belgelendirme başvurusu yapan kuruluş |\n" +
      "| Kriterler | Kuruluşun kendi sistemi ve standart şartları | Müşterinin şartnamesi, sözleşme, ilgili standartlar | Standart şartları (ör. ISO 9001) |\n" +
      "| Sonuç | İç iyileştirme ve düzeltici faaliyet | Tedarikçi denetim raporu, puan, onay kararı | Sertifika (belge) veya ret |\n" +
      "| Sıklık | Planlı aralıklarla, genellikle yılda en az bir | Risk ve tedarikçi önemine göre | Belge döngüsünde yıllık gözetim, üç yılda bir yenileme |\n" +
      "| Bağımsızlık | Denetçi kendi işini denetlemez | Ticari ilişki nedeniyle sınırlı; bağımsız denetçiyle artar | Tam bağımsızlık ve tarafsızlık şartı |\n\n" +
      "## İkinci taraf denetim ile üçüncü taraf denetim arasındaki fark nedir?\n\n" +
      "Temel fark, denetimin kimin şartlarına göre ve ne amaçla yapıldığıdır. Üçüncü taraf denetim, kuruluşun bir standarda genel olarak uyduğunu doğrular ve sertifikayla sonuçlanır. İkinci taraf denetim ise tedarikçinin sizin ürününüze, sözleşmenize ve şartnamenize uyup uymadığını doğrular. Bu nedenle tedarikçinizin ISO 9001 belgesi olması, sizin özel şartlarınızı karşıladığı anlamına gelmez; kritik tedarikçilerde ikinci taraf denetimi ayrıca gerekir.\n\n" +
      "## Hangi durumda hangi denetim gerekir?\n\n" +
      "- Kendi sisteminizin işleyişini izlemek ve standart şartını karşılamak için: birinci taraf (iç) denetim\n" +
      "- Yeni tedarikçi onayı, kritik tedarikçi izlemesi, kalite şikâyeti sonrası doğrulama için: ikinci taraf (tedarikçi) denetimi\n" +
      "- Müşterilere ve pazara yönetim sisteminizi belgeyle kanıtlamak için: üçüncü taraf (belgelendirme) denetimi\n\n" +
      "Üç denetim türü birbirinin alternatifi değil, tamamlayıcısıdır. İkinci taraf denetiminin adımlarını [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir) yazımızda anlattık. Tedarikçilerinizi bağımsız bir gözle denetletmek için [tedarikçi denetimi hizmetimizi](" + HIZMET + ") inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi", "sube-denetimi"],
  },
  {
    slug: "iso-9001-tedarikci-denetimi-zorunlu-mu",
    baslik: "ISO 9001'de Tedarikçi Denetimi Zorunlu mu? Madde 8.4 Dış Tedarikçilerin Kontrolü",
    ozet:
      "ISO 9001, tedarikçi denetimini her durumda zorunlu tutmaz; ancak madde 8.4 dış tedarikçilerin risk temelli değerlendirilmesini ve kontrolünü şart koşar. Hangi tedarikçilerin denetlenmesi gerektiğini ve tetkikte hangi kanıtların arandığını açıklıyoruz.",
    tarih: "2026-10-08",
    kategori: "Denetim",
    icerik:
      "Kısa yanıt: ISO 9001:2015, her tedarikçinin yerinde denetlenmesini zorunlu tutmaz. Standart, kuruluşun dış tedarikçileri değerlendirme, seçme, performanslarını izleme ve yeniden değerlendirme kriterlerini belirleyip uygulamasını ister (madde 8.4.1). Kontrolün türü ve sıkılığı ise tedarikçinin ürün ve hizmet uygunluğu üzerindeki etkisine göre belirlenir (madde 8.4.2). Kritik ve yüksek riskli tedarikçilerde bu kontrolün en güçlü yolu tedarikçi denetimidir.\n\n" +
      "## ISO 9001 madde 8.4 ne ister?\n\n" +
      "Madde 8.4, \"dışarıdan sağlanan proses, ürün ve hizmetlerin kontrolü\" başlığını taşır ve üç bölümden oluşur:\n\n" +
      "- 8.4.1 Genel: Dışarıdan sağlanan ürün ve hizmetlerin şartlara uygunluğunun güvence altına alınması; dış tedarikçilerin değerlendirilmesi, seçilmesi, performanslarının izlenmesi ve yeniden değerlendirilmesi için kriterlerin belirlenmesi ve bu faaliyetlerin kayıtlarının saklanması\n" +
      "- 8.4.2 Kontrolün türü ve kapsamı: Kontrollerin, dışarıdan sağlanan ürünün sizin müşterinize uygun ürün sunma yeteneğinize olan potansiyel etkisi dikkate alınarak belirlenmesi\n" +
      "- 8.4.3 Dış tedarikçilere bilgi: Şartların, onay kriterlerinin, yetkinlik beklentilerinin ve kuruluşun veya müşterisinin tedarikçi tesislerinde yapmayı planladığı doğrulama faaliyetlerinin tedarikçiye bildirilmesi\n\n" +
      "Son madde önemlidir: Tedarikçi tesisinde doğrulama, yani tedarikçi denetimi yapmayı planlıyorsanız, bunu tedarikçiye önceden bildirmeniz beklenir. Bu bildirim çoğunlukla sözleşmeye veya tedarikçi şartnamesine eklenen bir denetim hakkı maddesiyle yapılır.\n\n" +
      "## Hangi tedarikçiler denetlenmeli?\n\n" +
      "ISO 9001 risk temelli düşünmeyi esas aldığı için tüm tedarikçilere aynı kontrolün uygulanması beklenmez. Yaygın yaklaşım, tedarikçileri etkisine göre sınıflandırmaktır:\n\n" +
      "| Tedarikçi sınıfı | Örnek | Önerilen kontrol |\n" +
      "|---|---|---|\n" +
      "| Kritik | Ürüne doğrudan giren hammadde, kritik parça, fason üretim | Onay öncesi ve periyodik tedarikçi denetimi, giriş kontrolü, performans izleme |\n" +
      "| Önemli | Ambalaj, kalibrasyon, lojistik hizmeti | Doküman ve belge incelemesi, anket, gerektiğinde denetim |\n" +
      "| Düşük etkili | Kırtasiye, genel sarf malzemeleri | Satın alma kayıtları ve performans takibi |\n\n" +
      "Kritik tedarikçiyi belirlerken; ürünün güvenlik veya fonksiyon üzerindeki etkisi, alternatif tedarikçi bulunup bulunmadığı, geçmiş kalite performansı, şikâyet ve iade geçmişi ile yasal riskler birlikte değerlendirilir. Puanlama yöntemleri için [tedarikçi değerlendirme kriterleri](/blog/tedarikci-degerlendirme-kriterleri) yazımıza bakabilirsiniz.\n\n" +
      "## Belgelendirme tetkikinde madde 8.4 için hangi kanıtlar aranır?\n\n" +
      "- Onaylı tedarikçi listesi ve tedarikçilerin hangi kriterlerle seçildiği\n" +
      "- Tedarikçi değerlendirme ve yeniden değerlendirme kayıtları\n" +
      "- Tedarikçi performansının izlendiğini gösteren veriler (zamanında teslimat, ret oranı, şikâyetler)\n" +
      "- Kritik tedarikçiler için yapılan denetim raporları ve düzeltici faaliyet takibi\n" +
      "- Tedarikçilere iletilen şartlar: şartname, sözleşme, teknik çizim, kabul kriterleri\n\n" +
      "## Tedarikçinin ISO 9001 belgesi olması yeterli mi?\n\n" +
      "Tek başına yeterli değildir. Tedarikçinin belgesi, onun kalite yönetim sisteminin standarda uygun olduğunu gösterir; sizin ürününüze özgü teknik şartları, toleransları veya sözleşme yükümlülüklerini karşıladığını göstermez. Belge, değerlendirme kriterlerinden biri olarak kullanılabilir; kritik tedarikçilerde ise yerinde doğrulamanın yerini tutmaz. Konunun ayrıntısını [birinci, ikinci ve üçüncü taraf denetim farkı](/blog/birinci-ikinci-ucuncu-taraf-denetim-farki) yazımızda ele aldık.\n\n" +
      "## Otomotivde durum farklı: IATF 16949\n\n" +
      "Otomotiv sektöründe IATF 16949, ISO 9001'in ötesine geçerek ikinci taraf denetimlerini açıkça düzenler. Standart, tedarikçi yönetiminde ikinci taraf denetimlerin risk temelli olarak kullanılmasını (madde 8.4.2.4.1) ve bu denetimleri yapan denetçilerin yetkinliğinin tanımlanmasını (madde 7.2.4) ister. Proses denetimlerinde yaygın kullanılan yöntem için [VDA 6.3 nedir](/blog/vda-6-3-nedir) yazımıza bakabilirsiniz.\n\n" +
      "Kritik tedarikçilerinizi madde 8.4'e uygun, kanıta dayalı biçimde denetletmek için [tedarikçi denetimi hizmetimizi](" + HIZMET + ") inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi", "iso-9001"],
  },
  {
    slug: "tedarikci-denetim-raporu",
    baslik: "Tedarikçi Denetim Raporu Nasıl Hazırlanır? İçerik, Puanlama ve Örnek Yapı",
    ozet:
      "Tedarikçi denetim raporu; denetimin kapsamını, kriterlerini, bulguları, puanı ve düzeltici faaliyet taleplerini içerir. İyi bir raporun bölümlerini, bulguların nasıl sınıflandırıldığını ve puanlamanın nasıl yapıldığını açıklıyoruz.",
    tarih: "2026-10-07",
    kategori: "Denetim",
    icerik:
      "Tedarikçi denetim raporu, tedarikçi denetiminin resmî çıktısıdır: Denetimde neyin, hangi kriterlere göre incelendiğini, hangi kanıtların görüldüğünü, tespit edilen bulguları ve bunların önemini, tedarikçinin aldığı puanı ve sonuç kararını kayıt altına alır. Satın alma ve kalite ekipleri tedarikçi onayı, sipariş dağılımı ve performans değerlendirmesi kararlarını bu rapora dayandırır.\n\n" +
      "## Tedarikçi denetim raporunda hangi bölümler olmalı?\n\n" +
      "1. Genel bilgiler: Tedarikçinin unvanı, denetlenen tesis adresi, denetim tarihi, denetim türü (onay, periyodik, olay sonrası) ve denetim ekibi\n" +
      "2. Kapsam ve kriterler: Denetlenen ürün ve prosesler; esas alınan şartname, sözleşme ve standartlar\n" +
      "3. Yönetici özeti: Genel sonuç, puan, en önemli üç-beş bulgu ve öneri tek sayfada\n" +
      "4. Bölüm bazında değerlendirme: Kalite yönetimi, üretim ve proses kontrolü, izlenebilirlik, kalibrasyon, uygun olmayan ürün, depolama, İSG, çevre gibi başlıklarda puan ve gözlemler\n" +
      "5. Bulgular: Her bulgu için şart, tespit edilen durum, objektif kanıt ve sınıfı\n" +
      "6. Olumlu yönler: Tedarikçinin güçlü uygulamaları\n" +
      "7. Düzeltici faaliyet talepleri: Beklenen aksiyonlar ve kapanış tarihleri\n" +
      "8. Sonuç kararı: Onaylı, koşullu onaylı veya onaysız; bir sonraki denetim önerisi\n\n" +
      "## Bulgular nasıl sınıflandırılır?\n\n" +
      "| Bulgu sınıfı | Anlamı | Örnek | Beklenen aksiyon |\n" +
      "|---|---|---|---|\n" +
      "| Majör uygunsuzluk | Ürün uygunluğunu veya müşteri güvenliğini doğrudan riske atan, sistematik eksiklik | Kritik ölçüm ekipmanlarının kalibrasyonsuz kullanılması | Hızlı kök neden analizi ve düzeltici faaliyet; doğrulama denetimi |\n" +
      "| Minör uygunsuzluk | Tekil, sistemi bozmayan eksiklik | Bir partide izlenebilirlik kaydının eksik tutulması | Belirlenen sürede düzeltici faaliyet ve kanıt |\n" +
      "| Gözlem / iyileştirme fırsatı | Uygunsuzluk değil, ileride risk oluşturabilecek durum | Depo etiketlemesinin karışıklığa açık olması | Tedarikçinin değerlendirmesine bırakılır |\n\n" +
      "Her bulgu üç unsuru açıkça içermelidir: hangi şartın karşılanmadığı, sahada ne görüldüğü ve bunu gösteren objektif kanıt (kayıt numarası, gözlem, fotoğraf, görüşme). Kanıtsız bulgu tartışmaya açıktır ve tedarikçinin düzeltici faaliyetini zorlaştırır.\n\n" +
      "## Tedarikçi denetiminde puanlama nasıl yapılır?\n\n" +
      "Yaygın yöntem, kontrol listesindeki her soruyu 0-10 veya 0-3 gibi bir ölçekle puanlayıp bölüm ve genel başarı yüzdesi hesaplamaktır. Ürün kalitesini doğrudan etkileyen bölümlere daha yüksek ağırlık verilir. Sonuç genellikle eşik değerlerle sınıflandırılır; örneğin %85 ve üzeri onaylı, %70-84 koşullu onaylı, %70 altı onaysız. Eşik değerleri sektöre ve riske göre kuruluş belirler. Otomotivde VDA 6.3 gibi yöntemler kendi puanlama ve değerlendirme kurallarını tanımlar.\n\n" +
      "Tek bir majör uygunsuzluğun, toplam puan yüksek olsa bile sonucu \"koşullu onaylı\" veya \"onaysız\"a düşürmesi iyi bir uygulamadır. Aksi hâlde yüksek ortalama, kritik bir riski gizleyebilir.\n\n" +
      "## Denetim raporu ne zaman ve kime iletilir?\n\n" +
      "Rapor, kapanış toplantısında sözlü olarak paylaşılan bulguların ardından genellikle birkaç iş günü içinde yazılı olarak iletilir. Rapor denetimi talep eden müşteri kuruluşa sunulur; tedarikçiye hangi bölümlerin paylaşılacağına müşteri karar verir. Bulguların kapanışı, tedarikçinin gönderdiği kanıtların incelenmesiyle veya gerekirse doğrulama denetimiyle takip edilir.\n\n" +
      "## İyi bir tedarikçi denetim raporunun özellikleri\n\n" +
      "- Tarafsız ve kanıta dayalı: Yorum değil, görülen durum yazılır\n" +
      "- Karşılaştırılabilir: Aynı kontrol listesi ve puanlama ile farklı tedarikçiler kıyaslanabilir\n" +
      "- Önceliklendirilmiş: Okuyan kişi en kritik riski ilk sayfada görür\n" +
      "- Uygulanabilir: Her bulgu için ne yapılması gerektiği açıktır\n\n" +
      "Raporda değerlendirilen başlıklar için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi), sahada sorulan sorular için [tedarikçi denetiminde sorulacak sorular](/blog/tedarikci-denetimi-sorulari) yazılarımıza bakabilirsiniz. DVN Cert, [tedarikçi denetimi hizmetinde](" + HIZMET + ") puanlanmış ve önceliklendirilmiş bir rapor sunar.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "tedarikci-denetimi-sorulari",
    baslik: "Tedarikçi Denetiminde Sorulacak Sorular: Bölüm Bölüm Örnek Soru Listesi",
    ozet:
      "Tedarikçi denetiminde kalite yönetimi, üretim, izlenebilirlik, kalibrasyon, uygun olmayan ürün, depolama, İSG ve çevre başlıklarında sorulacak örnek soruları ve her soruda hangi kanıtın istenmesi gerektiğini listeledik.",
    tarih: "2026-10-06",
    kategori: "Denetim",
    icerik:
      "Tedarikçi denetiminde sorular, tedarikçinin beyanını değil uygulamasını ortaya çıkaracak biçimde sorulmalıdır. Bu yüzden her sorunun ardından kanıt istenir: \"Kalibrasyon yapıyor musunuz?\" yerine \"Bu kumpasın son kalibrasyon kaydını görebilir miyim?\" diye sorulur. Aşağıdaki liste, genel bir üretim tedarikçisi için başlangıç noktasıdır; sorular ürüne, sektöre ve sözleşme şartlarına göre uyarlanmalıdır.\n\n" +
      "## Kalite yönetimi ile ilgili sorular\n\n" +
      "- Kalite politikanız ve ölçülebilir kalite hedefleriniz nelerdir; hedeflerin son dönem gerçekleşmesini gösterebilir misiniz?\n" +
      "- Geçerli bir yönetim sistemi belgeniz var mı; kapsamı denetlediğimiz ürün ve tesisi içeriyor mu?\n" +
      "- Son iç denetiminiz ne zaman yapıldı; bulgular ve kapanış kayıtları nerede?\n" +
      "- Müşteri şikâyetlerini nasıl kaydediyor ve kök neden analizini nasıl yapıyorsunuz? Son şikâyeti örnek gösterebilir misiniz?\n\n" +
      "## Üretim ve proses kontrolü ile ilgili sorular\n\n" +
      "- Bizim ürünümüzün üretim akışını ve kontrol noktalarını gösterir misiniz?\n" +
      "- Operatörler hangi talimatlara göre çalışıyor; talimat sahada güncel sürümde mi?\n" +
      "- Proses parametreleri (sıcaklık, basınç, süre vb.) nasıl izleniyor ve kayıt altına alınıyor?\n" +
      "- İlk ürün onayı ve vardiya başlangıç kontrolü nasıl yapılıyor?\n\n" +
      "## İzlenebilirlik ile ilgili sorular\n\n" +
      "- Bize gönderilen son partiden geriye doğru hammadde lotuna kadar izleme yapabilir misiniz?\n" +
      "- Lot ve parti numarası ürün, ambalaj ve sevk belgelerinde nasıl eşleşiyor?\n" +
      "- Geri çağırma gerekseydi etkilenen ürünleri ne kadar sürede belirleyebilirdiniz?\n\n" +
      "## Ölçüm ve kalibrasyon ile ilgili sorular\n\n" +
      "- Ürün kabulünde kullanılan ölçüm ekipmanlarının listesi ve kalibrasyon planı nerede?\n" +
      "- Kalibrasyon süresi geçmiş bir cihaz nasıl tespit ediliyor ve kullanımdan çekiliyor?\n" +
      "- Kalibrasyon dışı çıkan bir cihazla ölçülen ürünler için ne yapıldı?\n\n" +
      "## Uygun olmayan ürün ve düzeltici faaliyet ile ilgili sorular\n\n" +
      "- Uygun olmayan ürün nasıl tanımlanıyor, ayrılıyor ve kayıt altına alınıyor?\n" +
      "- Karantina alanını görebilir miyiz?\n" +
      "- Tekrarlayan bir uygunsuzluk için yapılan düzeltici faaliyetin etkinliğini nasıl doğruladınız?\n\n" +
      "## Satın alma ve alt tedarikçiler ile ilgili sorular\n\n" +
      "- Kritik hammaddeleri kimlerden alıyorsunuz; alt tedarikçilerinizi nasıl değerlendiriyorsunuz?\n" +
      "- Ürünümüzün bir kısmını fasona veriyor musunuz? Veriyorsanız bize bildirdiniz mi?\n" +
      "- Giriş kontrolünde hangi kontroller yapılıyor; kayıtlarını görebilir miyiz?\n\n" +
      "## Depolama, ambalaj ve sevkiyat ile ilgili sorular\n\n" +
      "- Ürünler hangi koşullarda depolanıyor; sıcaklık ve nem gibi koşullar izleniyor mu?\n" +
      "- İlk giren ilk çıkar (FIFO) veya son kullanma tarihi kontrolü nasıl sağlanıyor?\n" +
      "- Sevkiyat öncesi son kontrol ve etiket doğrulaması nasıl yapılıyor?\n\n" +
      "## İş sağlığı, güvenliği ve çevre ile ilgili sorular\n\n" +
      "- Risk değerlendirmeniz güncel mi; bizim ürünümüzün üretildiği alanı kapsıyor mu?\n" +
      "- Zorunlu İSG eğitimleri ve sağlık gözetimi kayıtları tam mı?\n" +
      "- Atıklar nasıl ayrıştırılıyor ve lisanslı firmalara teslim ediliyor; kayıtları nerede?\n" +
      "- Faaliyetiniz için gerekli çevre izin ve lisansları geçerli mi?\n\n" +
      "## Soru sorarken nelere dikkat edilmeli?\n\n" +
      "- Açık uçlu sorun: \"Nasıl yapıyorsunuz, gösterir misiniz?\" kalıbı evet/hayır sorularından daha fazla bilgi verir.\n" +
      "- Örneklem seçimini siz yapın: Gösterilmek istenen değil, sizin seçtiğiniz kayıt ve partileri inceleyin.\n" +
      "- Yönetimle değil sahayla da konuşun: Operatörün anlattığı ile talimatta yazanın tutarlılığını kontrol edin.\n" +
      "- Her yanıtı not edin: Kanıtın adı, numarası ve tarihi rapora girecektir.\n\n" +
      "Bu soruların puanlanacağı bölümler için [tedarikçi denetimi kontrol listesi](/blog/tedarikci-denetimi-kontrol-listesi), bulguların rapora nasıl yazılacağı için [tedarikçi denetim raporu](/blog/tedarikci-denetim-raporu) yazılarımıza bakabilirsiniz. Denetimi deneyimli ve bağımsız denetçilerle yaptırmak için [tedarikçi denetimi hizmetimizi](" + HIZMET + ") inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "fason-uretici-denetimi",
    baslik: "Fason Üretici ve Alt Yüklenici Denetimi: Neden Gerekli, Nasıl Yapılır?",
    ozet:
      "Fason üretici denetimi, sizin adınıza ve markanızla üretim yapan firmanın üretim koşullarının, kalite kontrolünün ve yasal uyumunun yerinde doğrulanmasıdır. Fason ve alt yüklenici denetiminin farklarını, kapsamını ve adımlarını açıklıyoruz.",
    tarih: "2026-10-05",
    kategori: "Denetim",
    icerik:
      "Fason üretici denetimi, ürününüzü sizin adınıza üreten bir firmanın; üretim koşullarını, kalite kontrol uygulamalarını, izlenebilirliğini ve yasal uyumunu yerinde değerlendiren ikinci taraf denetimidir. Fason üretimde ürün sizin markanızı taşır; bu yüzden üretim başkasının tesisinde yapılsa da kalite, güvenlik ve yasal sorumluluk büyük ölçüde size aittir.\n\n" +
      "## Fason üretici denetimi neden gereklidir?\n\n" +
      "- Ürün üzerindeki sorumluluk markada kalır: Hatalı ürün, geri çağırma ve müşteri şikâyeti doğrudan sizin itibarınızı etkiler.\n" +
      "- Üretim gözünüzün önünde değildir: Reçete, malzeme veya proses değişiklikleri haberiniz olmadan yapılabilir.\n" +
      "- Sözleşme şartlarının uygulanması doğrulanmalıdır: Teknik şartname, ambalaj, etiketleme ve gizlilik yükümlülükleri sahada kontrol edilmelidir.\n" +
      "- Mevzuat uyumu sizi de bağlar: Gıda, kozmetik, tıbbi ürün ve oyuncak gibi sektörlerde üretim yeri izinleri ve kayıtları kritik önemdedir.\n\n" +
      "## Fason üretici ile alt yüklenici arasındaki fark nedir?\n\n" +
      "| Ölçüt | Fason üretici | Alt yüklenici |\n" +
      "|---|---|---|\n" +
      "| Ne yapar? | Ürünün tamamını veya bir kısmını sizin adınıza üretir | Bir projenin, hizmetin veya prosesin bir bölümünü üstlenir |\n" +
      "| Örnek | Özel markalı gıda, kozmetik veya tekstil üretimi | Kaplama, ısıl işlem, montaj, kurulum, bakım hizmeti |\n" +
      "| Denetimde odak | Reçete ve şartname uyumu, kalite kontrol, izlenebilirlik, hijyen | Proses yeterliliği, personel yetkinliği, İSG, iş teslim kalitesi |\n\n" +
      "Her iki durumda da denetim aynı mantıkla yürür: Sizin şartlarınız esas alınır ve uygulama yerinde kanıtla doğrulanır.\n\n" +
      "## Fason üretici denetiminde neler incelenir?\n\n" +
      "- Ürüne özgü teknik şartname, reçete ve onaylı numune ile seri üretimin uyumu\n" +
      "- Hammadde tedariki ve giriş kontrolü; onaylı olmayan malzeme kullanımının önlenmesi\n" +
      "- Proses kontrolü, ara ve son kontroller, test ve analiz kayıtları\n" +
      "- Parti bazında izlenebilirlik ve geri çağırma kabiliyeti\n" +
      "- Hijyen, depolama ve ambalaj koşulları; etiketleme doğruluğu\n" +
      "- Değişiklik yönetimi: Malzeme, ekipman veya proses değişikliklerinin size bildirilmesi\n" +
      "- Fikrî mülkiyet ve gizlilik: Kalıp, reçete ve tasarım bilgilerinin korunması\n" +
      "- İş sağlığı ve güvenliği, çevre izinleri ve sosyal uygunluk (çalışma koşulları)\n\n" +
      "## Fason üretici denetimi nasıl yapılır?\n\n" +
      "1. Kapsamı belirleyin: Hangi ürünler, hangi tesis ve hangi şartlar denetlenecek\n" +
      "2. Ön bilgi toplayın: Şartname, sözleşme, geçmiş kalite verileri ve şikâyetler\n" +
      "3. Ürüne özgü kontrol listesi hazırlayın\n" +
      "4. Saha denetimini yapın: Üretim hattını gözlemleyin, sizin ürününüzün kayıtlarını inceleyin, operatörlerle görüşün\n" +
      "5. Bulguları puanlayıp raporlayın\n" +
      "6. Düzeltici faaliyetleri takip edin ve riske göre periyodik denetim planlayın\n\n" +
      "Denetimin genel akışı için [tedarikçi denetimi nasıl yapılır](/blog/tedarikci-denetimi-nasil-yapilir), sektöre özgü başlıklar için [gıda tedarikçi denetimi](/blog/gida-tedarikci-denetimi) ve [tekstil tedarikçi denetimi](/blog/tekstil-tedarikci-denetimi) yazılarımıza bakabilirsiniz.\n\n" +
      "## Fason üreticinin ISO belgesi denetim ihtiyacını ortadan kaldırır mı?\n\n" +
      "Hayır. Fason üreticinin ISO 9001 veya benzeri bir belgesi, genel bir yönetim sisteminin varlığını gösterir; sizin reçetenizin, şartnamenizin ve etiketinizin doğru uygulandığını göstermez. Belge, tedarikçi seçiminde olumlu bir kriterdir; kritik fason üreticilerde ise yerinde denetimin yerini tutmaz.\n\n" +
      "Fason üreticilerinizi ve alt yüklenicilerinizi bağımsız, gizlilik ilkesine bağlı denetçilerle denetletmek için [tedarikçi denetimi hizmetimizi](" + HIZMET + ") inceleyebilirsiniz.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
  {
    slug: "uzaktan-tedarikci-denetimi",
    baslik: "Uzaktan (Online) Tedarikçi Denetimi Nasıl Yapılır? Avantajları ve Sınırları",
    ozet:
      "Uzaktan tedarikçi denetimi, doküman incelemesi, görüşme ve canlı saha görüntüsünün video konferansla yapıldığı ikinci taraf denetimidir. Ne zaman uygun olduğunu, nasıl hazırlanılacağını ve yerinde denetimin yerini ne zaman tutmadığını açıklıyoruz.",
    tarih: "2026-10-04",
    kategori: "Denetim",
    icerik:
      "Uzaktan tedarikçi denetimi (online veya sanal denetim), tedarikçinin tesisine gidilmeden; doküman ve kayıtların ekran paylaşımıyla incelendiği, görüşmelerin video konferansla yapıldığı ve gerekirse sahanın canlı kamerayla gösterildiği bir ikinci taraf denetim yöntemidir. Yönetim sistemleri tetkik kılavuzu ISO 19011:2018, sanal konumların ve uzaktan tetkik yöntemlerinin kullanımına ilişkin rehberlik içerir.\n\n" +
      "## Uzaktan tedarikçi denetimi ne zaman uygundur?\n\n" +
      "- Tedarikçinin geçmiş performansı iyi olan periyodik takip denetimlerinde\n" +
      "- Ağırlıklı olarak doküman ve kayıt incelemesine dayanan değerlendirmelerde\n" +
      "- Önceki denetimde verilen düzeltici faaliyetlerin kapanışının doğrulanmasında\n" +
      "- Uzak lokasyonlardaki veya yurt dışındaki tedarikçilerin ön değerlendirmesinde\n" +
      "- Seyahatin mümkün olmadığı veya maliyetin orantısız olduğu durumlarda\n\n" +
      "## Uzaktan denetim ne zaman yerinde denetimin yerini tutmaz?\n\n" +
      "Üretim koşullarının, hijyenin, depolamanın, ekipman durumunun ve çalışma ortamının doğrudan gözlemlenmesi gerektiğinde uzaktan denetim tek başına yeterli değildir. Yeni ve kritik bir tedarikçinin ilk onayı, ciddi bir kalite şikâyeti sonrası yapılan denetim ve gıda, ilaç, otomotiv gibi yüksek riskli üretimler için yerinde denetim önerilir. Kamera açısı ve gösterilen alan tedarikçinin kontrolünde olduğundan, sahadaki gerçek durumun tamamen görüldüğünden emin olmak zordur.\n\n" +
      "| Ölçüt | Yerinde denetim | Uzaktan denetim |\n" +
      "|---|---|---|\n" +
      "| Saha gözlemi | Doğrudan ve denetçinin seçtiği alanlarda | Kamera ile, tedarikçinin gösterdiği kadar |\n" +
      "| Doküman incelemesi | Tam | Tam (ekran paylaşımı, paylaşılan klasör) |\n" +
      "| Personel görüşmesi | Sahada, doğal ortamda | Planlı görüntülü görüşme |\n" +
      "| Maliyet ve süre | Seyahat ve konaklama gerekir | Seyahat yok, planlama daha esnek |\n" +
      "| Uygun olduğu durum | İlk onay, kritik ve yüksek riskli tedarikçi | Takip, kapanış doğrulaması, düşük-orta risk |\n\n" +
      "## Uzaktan tedarikçi denetimine nasıl hazırlanılır?\n\n" +
      "1. Teknik altyapıyı test edin: Görüntü ve ses kalitesi, mobil kamera ile sahada dolaşma imkânı, internet bağlantısı\n" +
      "2. Gizlilik ve kayıt kurallarını önceden yazılı olarak belirleyin: Ekran görüntüsü ve kayıt alınıp alınmayacağı\n" +
      "3. Denetim planını saat saat paylaşın ve görüşülecek kişileri netleştirin\n" +
      "4. İncelenecek kayıtların listesini önceden bildirin; örneklemi ise denetim sırasında denetçinin seçmesine izin verin\n" +
      "5. Saha turu için güzergâh belirleyin ve kameranın denetçinin istediği noktaya yönlendirilmesini sağlayın\n\n" +
      "## Karma (hibrit) denetim yaklaşımı\n\n" +
      "Uygulamada en verimli yöntem çoğu zaman karma denetimdir: Doküman incelemesi ve yönetim görüşmeleri uzaktan yapılır, saha gözlemi için daha kısa bir yerinde ziyaret planlanır. Böylece sahada geçen süre gerçekten gözlem gerektiren konulara ayrılır.\n\n" +
      "Hangi tedarikçi için hangi yöntemin uygun olduğunu risk sınıfına göre belirlemek için [tedarikçi değerlendirme kriterleri](/blog/tedarikci-degerlendirme-kriterleri) yazımıza bakabilirsiniz. DVN Cert, [tedarikçi denetimi hizmetinde](" + HIZMET + ") yerinde, uzaktan ve karma denetim seçenekleri sunar.",
    ilgiliHizmetler: ["tedarikci-denetimi"],
  },
];
