/**
 * DVN Cert - Sıkça Sorulan Sorular (merkezi veri)
 *
 * Hem /sss sayfası (faqSchema + tam liste) hem ana sayfadaki SSS özeti
 * bu listeden beslenir. Soru eklemek/düzenlemek için SADECE burası değişir.
 *
 * NOT: Cevaplar düz metin olarak render edilir (link/markdown parse EDİLMEZ);
 * bu yüzden cevaplara markdown bağlantı yazmayın.
 *
 * PROD: /sss prod'da DB'den beslenir; scripts/sync-content.ts bu listeyi
 * DB'ye YALNIZCA-EKLEME ile taşır (admin'den eklenenler korunur, üstte kalır).
 * İlk 4 soru ana sayfada gösterilir — en genel/önemli sorular başta tutulmalı.
 */

export type SSSorusu = { soru: string; cevap: string };

export const sssSorular: SSSorusu[] = [
  {
    soru: "DVN Cert hangi yönetim sistemleri için belgelendirme hizmeti sunmaktadır?",
    cevap:
      "DVN Cert olarak, TÜRKAK akreditasyon kapsamımızdaki dört temel yönetim sistemi standardında belgelendirme hizmeti sunuyoruz: ISO 9001 (Kalite Yönetimi), ISO 14001 (Çevre Yönetimi), ISO 45001 (İş Sağlığı ve Güvenliği) ve ISO 50001 (Enerji Yönetimi). Bu standartlar, kuruluşunuzun operasyonel verimliliğini artırmasına ve sürdürülebilirlik hedeflerine ulaşmasına yardımcı olur. Ayrıca tedarikçi ve şube ağınıza yönelik ikinci taraf denetimleri ile yönetim sistemi eğitimleri de sağlıyoruz.",
  },
  {
    soru: "Belgelendirme süreci ne kadar sürer ve hangi aşamalardan oluşur?",
    cevap:
      "Belgelendirme süreci; kuruluşunuzun büyüklüğüne, sektörüne ve mevcut yönetim sisteminin olgunluğuna göre değişir. Süreç genellikle başvuru ve sözleşme, Aşama 1 (doküman ve hazırlık incelemesi), Aşama 2 (yerinde belgelendirme denetimi) ve bağımsız belgelendirme kararı adımlarından oluşur. Hazırlık düzeyinize bağlı olarak süreç birkaç hafta ile birkaç ay arasında tamamlanabilir.",
  },
  {
    soru: "Belgemizin TÜRKAK akreditasyonlu olması neden önemlidir?",
    cevap:
      "Akreditasyon, belgelendirme kuruluşunun bağımsız bir otorite tarafından yetkinliğinin doğrulandığını gösterir. TÜRKAK (Türk Akreditasyon Kurumu) tarafından akredite edilmiş bir kuruluştan alınan belge, ulusal ve uluslararası düzeyde tanınırlık taşır; ihale, tedarik zinciri ve ihracat süreçlerinde geçerliliği sorgulanmaz. DVN Cert, TS EN ISO/IEC 17021-1:2015 kapsamında TÜRKAK tarafından akredite edilmiştir (Akreditasyon No: AB-0209-YS).",
  },
  {
    soru: "ISO belgesine sahip olmak şirketimize ne gibi faydalar sağlar?",
    cevap:
      "ISO belgesi, kuruluşunuzun uluslararası kabul görmüş standartlara uygun çalıştığını bağımsız olarak kanıtlar. Bu; müşteri güvenini artırır, süreçleri sistematik hale getirerek operasyonel verimliliği yükseltir, riskleri azaltır ve pazarda rekabet avantajı sağlar. Standarda bağlı olarak enerji maliyetlerinin düşürülmesi (ISO 50001) veya iş kazalarının azaltılması (ISO 45001) gibi doğrudan kazanımlar da elde edilir.",
  },
  {
    soru: "Akreditasyon ile belgelendirme arasındaki fark nedir?",
    cevap:
      "Belgelendirme, bir kuruluşun yönetim sisteminin ilgili ISO standardına uygunluğunun bağımsız bir belgelendirme kuruluşu tarafından denetlenip onaylanmasıdır. Akreditasyon ise bu belgelendirme kuruluşunun yetkinliğinin ve tarafsızlığının, TÜRKAK gibi bir akreditasyon kurumu tarafından doğrulanmasıdır. Kısaca kuruluşlar belgelendirilir, belgelendirme kuruluşları ise akredite edilir.",
  },
  {
    soru: "DVN Cert'i diğer belgelendirme kuruluşlarından ayıran özellikler nelerdir?",
    cevap:
      "DVN Cert; tarafsızlık, yetkinlik, kayıt izlenebilirliği ve açık süreç yönetimine önem veren bağımsız bir belgelendirme kuruluşudur. Deneyimli denetçi kadromuz ve sektör uzmanlığımızla, yalnızca uygunluğu değerlendirmekle kalmaz; kuruluşların yönetim sistemlerini daha etkili hale getirecek, uygulanabilir ve kanıta dayalı geri bildirimler sunmayı hedefleriz. Tüm süreçlerimiz dijital başvuru ve izlenebilir kayıt yönetimiyle yürütülür.",
  },
  {
    soru: "ISO belgesi kaç yıl geçerlidir ve belge sonrası yükümlülüklerimiz nelerdir?",
    cevap:
      "ISO sertifikasının geçerlilik süresi 3 yıldır. Bu süre boyunca yönetim sisteminizin etkinliğini sürdürmeniz beklenir ve her yıl bir gözetim denetimi yapılarak sistemin standarda uygunluğu teyit edilir. Üçüncü yılın sonunda ise kapsamı daha geniş bir yeniden belgelendirme denetimiyle belge yenilenir. Gözetim denetimlerinin zamanında yapılmaması, belgenin askıya alınmasına yol açabilir.",
  },
  {
    soru: "Belgelendirme kararını kim verir?",
    cevap:
      "Belgelendirme kararı, denetimi yürüten tetkikçi tarafından değil; tetkik ekibinden bağımsız, o denetime katılmamış yetkili bir karar mercii tarafından verilir. Bu ayrım, TS EN ISO/IEC 17021-1 standardının tarafsızlık gereğidir ve belgenin güvenilirliğinin temel güvencelerinden biridir. Karar verici, tetkik raporunu ve kayıtları değerlendirerek sertifikanın düzenlenip düzenlenmeyeceğine karar verir.",
  },
  {
    soru: "DVN Cert danışmanlık hizmeti de veriyor mu?",
    cevap:
      "Hayır. Tarafsızlık ilkesi ve TS EN ISO/IEC 17021-1 gereği, belgelendirme kuruluşları belge verdikleri kuruluşlara yönetim sistemi danışmanlığı sunamaz. DVN Cert; belgelendirme, ikinci taraf denetim ve genel katılıma açık eğitim hizmetleri sağlar; sisteminizi kurma/işletme danışmanlığını ise bağımsız danışmanlardan almanız gerekir. Bu ayrım, belgenin bağımsızlığını ve güvenilirliğini korur.",
  },
  {
    soru: "Belgelendirme kapsamı nasıl belirlenir?",
    cevap:
      "Belgelendirme kapsamı; kuruluşun faaliyet alanı, ürün/hizmetleri, süreçleri ve belgelendirilecek lokasyonları dikkate alınarak, başvuru aşamasında birlikte netleştirilir. Kapsam, sertifika üzerinde açıkça yer alır ve yalnızca denetlenip doğrulanan faaliyetleri içerir. Çok lokasyonlu kuruluşlarda belirli bir örnekleme yaklaşımı uygulanabilir.",
  },
  {
    soru: "Başka bir kuruluştan aldığımız belgeyi DVN Cert'e transfer edebilir miyiz?",
    cevap:
      "Geçerli ve akredite bir belgeye sahipseniz, belge transferi mümkündür. Transfer sürecinde mevcut sertifikanız, denetim geçmişiniz ve açık uygunsuzluklarınız gözden geçirilir; uygun bulunması halinde belge kalan geçerlilik süresiyle devralınır. Süreci netleştirmek için bizimle iletişime geçebilirsiniz.",
  },
  {
    soru: "Belgemiz hangi durumlarda askıya alınır veya iptal edilir?",
    cevap:
      "Gözetim denetimlerinin zamanında yapılmaması, tespit edilen uygunsuzlukların belirlenen sürede giderilmemesi, yönetim sisteminin sürdürülmemesi veya belgenin yanıltıcı biçimde kullanılması durumunda belge askıya alınabilir. Askı süresince gereken düzeltici faaliyetler tamamlanırsa belge yeniden geçerli hale getirilir; aksi halde iptal edilir.",
  },
  {
    soru: "DVN Cert tarafından düzenlenen bir sertifikanın geçerliliğini nasıl doğrularız?",
    cevap:
      "DVN Cert tarafından düzenlenen sertifikaların geçerliliği, sitemizdeki sertifika sorgulama sayfasından teyit edilebilir. Akreditasyonlu belgeler ayrıca TÜRKAK Belge Doğrulama Sistemi (TBDS) üzerinden de doğrulanabilir. Müşterileriniz, iş ortaklarınız ve tedarikçileriniz belgenizin güncel durumunu bu kanallardan kontrol edebilir.",
  },
  {
    soru: "Belgelendirme ücreti neye göre belirlenir?",
    cevap:
      "Belgelendirme ücreti sabit değildir; kuruluşun büyüklüğü (çalışan sayısı), faaliyet alanı, belgelendirme kapsamı, lokasyon sayısı ve buna bağlı denetim adam/gün süresi gibi ölçütlere göre belirlenir. Denetim süreleri, uluslararası akreditasyon kuralları (IAF/TÜRKAK) çerçevesinde hesaplanır. Kuruluşunuza özel bir teklif için başvuru oluşturabilir veya bizimle iletişime geçebilirsiniz.",
  },
  {
    soru: "KOBİ'ler de belge alabilir mi ve birden fazla standardı birlikte belgelendirebilir miyiz?",
    cevap:
      "Evet. ISO yönetim sistemi standartları, sektör ve ölçek fark etmeksizin standardın şartlarını karşılayan her kuruluşa uygulanabilir; KOBİ'ler de büyük kuruluşlar da belge alabilir. Ayrıca ortak yapıları (Annex SL) sayesinde birden fazla standart, tek bir entegre yönetim sistemi çatısı altında ve tek bir denetim programıyla birlikte belgelendirilebilir; bu, denetim maliyet ve süresini azaltır.",
  },
];
