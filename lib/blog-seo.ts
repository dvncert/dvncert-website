/**
 * DVN Cert - Blog yazıları için arama sonucu başlıkları (slug bazlı).
 *
 * Sayfadaki H1 (baslik) uzun ve açıklayıcı kalabilir; Google ~60 karakterden
 * sonrasını keser. Bu harita yalnızca <title> / og:title için kısa başlık verir.
 * Yoksa baslik kullanılır. blog-sss.ts ile aynı nedenle DB yerine burada tutulur.
 */

export const blogSeoBasliklari: Record<string, string> = {
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
};

/** Yazının arama sonucu başlığı (kısa başlık yoksa asıl başlık). */
export function blogSeoBaslik(slug: string, baslik: string): string {
  return blogSeoBasliklari[slug] ?? baslik;
}
