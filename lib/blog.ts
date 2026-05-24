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
  /** Kapak görseli (opsiyonel; boşsa marka renkli yer tutucu) */
  gorsel?: string;
  /** Gövde; biçim için yukarıdaki nota bakın */
  icerik: string;
  /** İlgili hizmet slug'ları — iç linkleme */
  ilgiliHizmetler?: string[];
};

export const blogYazilari: BlogYazisi[] = [
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
      "En yaygın entegrasyon ISO 9001, ISO 14001 ve ISO 45001 üçlüsüdür. Enerji yoğun kuruluşlar buna ISO 50001 enerji yönetim sistemini de ekleyebilir. DVN Cert, bu standartların tamamında TÜRKAK akreditasyon kapsamında belgelendirme hizmeti sunar.\n\n" +
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
