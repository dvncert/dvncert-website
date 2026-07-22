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
  "2-taraf-denetimi-nedir": [
    {
      soru: "2. taraf denetimi ile 3. taraf denetimi arasındaki fark nedir?",
      cevap:
        "2. taraf denetimi, bir kuruluşun kendi tedarikçisini veya iş ortağını, kendi belirlediği kriterlere göre denetlemesidir ve sertifika ile sonuçlanmaz. 3. taraf denetimi ise bağımsız ve akredite bir belgelendirme kuruluşunun standart şartlarına göre yaptığı, sertifika ile sonuçlanan denetimdir.",
    },
    {
      soru: "İkinci taraf denetimi ile tedarikçi denetimi aynı şey mi?",
      cevap:
        "Pratikte evet. Tedarikçi denetimi, ikinci taraf denetiminin en yaygın uygulamasıdır; kuruluşun mal veya hizmet aldığı tedarikçileri değerlendirmesini ifade eder. İkinci taraf denetimi ayrıca fason üretici, bayi ve şube denetimlerini de kapsayan daha geniş bir şemsiye terimdir.",
    },
    {
      soru: "2. taraf denetimi sonunda sertifika verilir mi?",
      cevap:
        "Hayır. 2. taraf denetimi bir belgelendirme faaliyeti değildir; sonucunda ISO sertifikası düzenlenmez. Denetim, bulguları ve iyileştirme önerilerini içeren bir rapor ile sonuçlanır; bu rapor tedarikçi ilişkisinin yönetiminde kullanılır.",
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
  // ---------- ISO belgelendirme kümesi ----------
  "iso-9001-belgelendirme-nedir-nasil-alinir": [
    {
      soru: "ISO 9001 belgesi nasıl alınır?",
      cevap:
        "ISO 9001 belgesi; akredite bir belgelendirme kuruluşuna başvuru, Aşama 1 (doküman ve hazırlık incelemesi) ve Aşama 2 (yerinde belgelendirme denetimi) adımlarının ardından, tetkik ekibinden bağımsız bir belgelendirme kararıyla düzenlenir. Öncesinde kuruluşun kalite yönetim sistemini kurup uygulamaya alması gerekir.",
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
