/**
 * DVN Cert - Sıkça Sorulan Sorular (merkezi veri)
 *
 * Hem /sss sayfası (faqSchema + tam liste) hem ana sayfadaki SSS özeti
 * bu listeden beslenir. Soru eklemek/düzenlemek için SADECE burası değişir.
 */

export type SSSorusu = { soru: string; cevap: string };

export const sssSorular: SSSorusu[] = [
  {
    soru: "DVN Cert hangi yönetim sistemleri için belgelendirme hizmeti sunmaktadır?",
    cevap:
      "DVN Cert olarak, kuruluşların uluslararası standartlara uygunluğunu doğrulamak amacıyla çeşitli yönetim sistemleri için belgelendirme hizmeti sunmaktayız. Başlıca hizmet verdiğimiz standartlar; ISO 9001 (Kalite Yönetimi), ISO 14001 (Çevre Yönetimi), ISO 45001 (İş Sağlığı ve Güvenliği) ve ISO 50001 (Enerji Yönetimi)'dir. Bu standartlar, operasyonel verimliliğinizi ve sürdürülebilirlik hedeflerinizi geliştirmenize yardımcı olur.",
  },
  {
    soru: "Belgelendirme süreci ne kadar sürer ve hangi aşamalardan oluşur?",
    cevap:
      "Belgelendirme süreci; kuruluşunuzun büyüklüğüne, sektörüne ve mevcut yönetim sisteminin olgunluğuna göre değişiklik gösterebilir. Süreç genellikle başvuru, Aşama 1 (doküman incelemesi) ve Aşama 2 (yerinde denetim) denetimlerinden oluşur. Başarılı bir denetim sonrası belgelendirme kararı alınır ve belge düzenlenir. Bu süreç, ilgili standarda ve hazırlık düzeyinize bağlı olarak birkaç hafta ile birkaç ay arasında tamamlanabilir.",
  },
  {
    soru: "ISO belgesine sahip olmak şirketimize ne gibi faydalar sağlar?",
    cevap:
      "ISO belgesi, kuruluşunuzun uluslararası kabul görmüş standartlara uygun çalıştığını kanıtlar. Bu, müşteri güvenini artırır, operasyonel verimliliği yükseltir ve pazarda rekabet avantajı sağlar. Örneğin ISO 50001 belgesi, enerji verimliliğinizi artırarak maliyetlerinizi düşürmenize doğrudan yardımcı olur. Tüm standartlar, süreçlerinizi sistematik hale getirerek riskleri azaltır ve sürekli iyileştirme kültürünün oluşmasına katkı sağlar.",
  },
  {
    soru: "DVN Cert'i diğer belgelendirme kuruluşlarından ayıran özellikler nelerdir?",
    cevap:
      "DVN Cert; tarafsızlık, yetkinlik, kayıt izlenebilirliği ve açık süreç yönetimine önem veren bağımsız bir belgelendirme kuruluşudur. TÜRKAK akreditasyon sürecimiz devam etmektedir; süreç tamamlanana kadar akredite sertifikalandırma hizmeti sunduğumuza dair bir beyan kullanılmaz. Deneyimli denetçi kadromuz ve sektör uzmanlığımızla kuruluşların yönetim sistemlerini daha etkili hale getirecek uygulanabilir geri bildirimler sunmayı hedefleriz.",
  },
  {
    soru: "Belgelendirme sonrası ne gibi yükümlülüklerimiz olacak?",
    cevap:
      "Belgeyi aldıktan sonra yönetim sisteminizin etkinliğini sürdürmeniz gerekir. Belgenizin geçerliliği süresince (genellikle 3 yıl) tarafımızdan yıllık gözetim denetimleri yapılır. Bu denetimler, sistemin devamlılığını ve standartlara uygunluğunu teyit etmeyi amaçlar. Üçüncü yılın sonunda ise yeniden belgelendirme denetimi yapılarak belgenizin geçerliliği yenilenir.",
  },
];
