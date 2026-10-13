/**
 * DVN Cert - Blog yazıları için arama sonucu başlıkları (slug bazlı).
 *
 * Sayfadaki H1 (baslik) uzun ve açıklayıcı kalabilir; Google ~60 karakterden
 * sonrasını keser. Bu harita yalnızca <title> / og:title için kısa başlık verir.
 * Yoksa baslik kullanılır. blog-sss.ts ile aynı nedenle DB yerine burada tutulur.
 */

export const blogSeoBasliklari: Record<string, string> = {
  "tedarikci-denetim-yonetimi-yazilimi": "Tedarikçi Denetim Yönetimi Yazılımı ile Online Takip",
  "birinci-ikinci-ucuncu-taraf-denetim-farki": "Birinci, İkinci ve Üçüncü Taraf Denetim Farkı (Tablolu)",
  "iso-9001-tedarikci-denetimi-zorunlu-mu": "ISO 9001'de Tedarikçi Denetimi Zorunlu mu? (Madde 8.4)",
  "tedarikci-denetim-raporu": "Tedarikçi Denetim Raporu Nasıl Hazırlanır? Örnek Yapı",
  "tedarikci-denetimi-sorulari": "Tedarikçi Denetiminde Sorulacak Sorular: Örnek Liste",
  "sube-denetimi-kontrol-listesi": "Şube Denetimi Kontrol Listesi: Mağaza Denetim Formu",
  "uzaktan-tedarikci-denetimi": "Uzaktan (Online) Tedarikçi Denetimi Nasıl Yapılır?",
  "iso-9001-belgesi": "ISO 9001 Belgesi Nedir? Geçerlilik ve Doğrulama",
  "iso-9001-kobiler-icin": "KOBİ'ler İçin ISO 9001: Küçük İşletmede Belgelendirme",
  "cok-sahali-belgelendirme": "Çok Sahalı Belgelendirme Nedir? Örnekleme Nasıl İşler?",
  "gozetim-tetkiki-nedir": "Gözetim Tetkiki Nedir? Yıllık Denetimde Neye Bakılır?",
  "tedarikci-denetimi-kontrol-listesi": "Tedarikçi Denetimi Kontrol Listesi (Checklist)",
  "belgelendirme-denetimine-hazirlik": "Belgelendirme Denetimine Hazırlık: Aşama 1 ve Aşama 2",
  "fason-uretici-denetimi": "Fason Üretici ve Alt Yüklenici Denetimi Nasıl Yapılır?",
  "belgelendirme-karari-nasil-verilir": "Belgelendirme Kararı Nasıl Verilir? Bağımsız Karar Süreci",
  "tekstil-tedarikci-denetimi": "Tekstil Tedarikçi Denetimi: Kalite ve Sosyal Uygunluk",
  "iso-belgesi-gecerlilik-ve-yenileme": "ISO Belgesi Kaç Yılda Bir Yenilenir? Gözetim ve Yenileme",
  "vda-6-3-nedir": "VDA 6.3 Nedir? Proses Denetimi ve IATF 16949 Farkı",
  "iso-45001-belgelendirme-is-sagligi-guvenligi": "ISO 45001 Belgelendirme: İSG Yönetim Sistemi",
  "iso-14001-2026-degisiklikler-ve-gecis": "ISO 14001:2026 Yayımlandı: Ne Değişti, Geçiş Süresi?",
};

/** Yazının arama sonucu başlığı (kısa başlık yoksa asıl başlık). */
export function blogSeoBaslik(slug: string, baslik: string): string {
  return blogSeoBasliklari[slug] ?? baslik;
}

/**
 * Blog yazıları için arama sonucu açıklamaları (slug bazlı). Özet (ozet) liste
 * kartlarında ve DB'de olduğu gibi kalır; Google ~160 karakterden sonrasını
 * kestiği için uzun özetlerin yerine meta açıklamada bu kısa metin kullanılır.
 */
export const blogSeoAciklamalari: Record<string, string> = {
  "tedarikci-denetim-yonetimi-yazilimi":
    "Tedarikçi denetimlerini planlama, denetçi ataması, bulgu, uygunsuzluk ve rapor onayıyla tek online sistemden yönetin. DBYS ile nasıl işlediğini anlatıyoruz.",
  "iso-9001-belgesi":
    "ISO 9001 belgesi neyi gösterir, üzerinde hangi bilgiler yer alır, kaç yıl geçerlidir ve nasıl doğrulanır? Belgenin ayırt edici özelliklerini açıklıyoruz.",
  "iso-9001-ve-iso-14001-farki":
    "ISO 9001 kalite, ISO 14001 çevre yönetim sistemi standardıdır. Odak noktalarını, ortak yönlerini ve birlikte yürütülme imkânını karşılaştırıyoruz.",
  "iso-45001-belgelendirme-is-sagligi-guvenligi":
    "ISO 45001 belgelendirme, İSG yönetim sisteminizin bağımsız bir kuruluşça doğrulanmasıdır. Kapsamını, faydalarını ve belgelendirme sürecini anlatıyoruz.",
  "gida-tedarikci-denetimi":
    "Gıda tedarikçi denetimi; hammadde, ambalaj ve fason üreticilerin gıda güvenliği, hijyen ve izlenebilirlik uyumunu doğrular. Kapsamını anlatıyoruz.",
  "otomotiv-tedarikci-denetimi":
    "Otomotiv tedarikçi denetiminin IATF 16949, VDA 6.3 proses denetimi, PPAP ve APQP gibi temel başlıklarını ve sıfır hata beklentisini açıklıyoruz.",
  "entegre-yonetim-sistemi-nedir":
    "Entegre yönetim sistemi, birden fazla ISO standardını tek çatıda birleştirir: tek denetim, daha az maliyet ve daha güçlü bir yönetim yapısı sağlar.",
  "belgelendirme-denetimine-hazirlik":
    "ISO belgelendirme denetimi Aşama 1 ve Aşama 2'den oluşur. Tetkike hazırlıkta yapılması gerekenleri ve sık görülen uygunsuzlukları derledik.",
  "iso-belgesi-gecerlilik-ve-yenileme":
    "ISO sertifikaları 3 yıl geçerlidir; bu sürede yıllık gözetim, üçüncü yılda yeniden belgelendirme tetkiki yapılır. Sürecin nasıl işlediğini açıklıyoruz.",
};

/** Yazının meta açıklaması (kısa açıklama yoksa özet). */
export function blogSeoAciklama(slug: string, ozet: string): string {
  return blogSeoAciklamalari[slug] ?? ozet;
}
