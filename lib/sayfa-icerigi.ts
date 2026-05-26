/**
 * Statik sayfaların düzenlenebilir alan haritası ve public erişim helper'ı.
 *
 * Her sayfa için hangi alanların (anahtar) düzenlenebilir olduğu burada tanımlı;
 * varsayılan içerik de burada — admin panelinden override edilmedikçe bu kullanılır.
 *
 * Yeni bir sayfayı düzenlenebilir yapmak için SAYFA_ICERIK'e bir kayıt ekleyip
 * ilgili public sayfada `sayfaIcerigiGetir(yol)` çağırıp varsayılana fallback yap.
 */

import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db, dbHazir } from "./db";
import { sayfaBloklari } from "./db/schema";
import { siteConfig } from "./site-config";

export type AlanTipi = "input" | "textarea" | "textarea-uzun";

export type Alan = {
  anahtar: string;
  etiket: string;
  tip: AlanTipi;
  varsayilan: string;
  /** Alan altındaki yardım metni — opsiyonel. */
  yardim?: string;
};

export type SayfaIcerikTanim = {
  ad: string;
  alanlar: Alan[];
};

export const SAYFA_ICERIK: Record<string, SayfaIcerikTanim> = {
  "/hakkimizda": {
    ad: "Hakkımızda",
    alanlar: [
      { anahtar: "giris-etiket", etiket: "Giriş — üst etiket", tip: "input", varsayilan: "BİZ KİMİZ" },
      { anahtar: "giris-baslik", etiket: "Giriş — başlık", tip: "input", varsayilan: "Bağımsız ve tarafsız bir uygunluk değerlendirme kuruluşu" },
      { anahtar: "giris-metin", etiket: "Giriş — paragraf", tip: "textarea-uzun", varsayilan: siteConfig.aciklamaUzun },
      { anahtar: "misyon", etiket: "Misyonumuz metni", tip: "textarea", varsayilan: "Kuruluşların yönetim sistemlerini uluslararası standartlara uygunluk açısından bağımsız ve tarafsız biçimde değerlendirerek; güvenilir, şeffaf ve katma değer yaratan belgelendirme hizmeti sunmak." },
      { anahtar: "vizyon", etiket: "Vizyonumuz metni", tip: "textarea", varsayilan: "Akreditasyon kapsamımızı ve uzmanlık alanlarımızı sürekli genişleterek, ulusal ve uluslararası ölçekte tercih edilen, itibarı yüksek bir belgelendirme kuruluşu olmak." },
      { anahtar: "degerler-baslik", etiket: "Değerler bölümü — başlık", tip: "input", varsayilan: "Çalışma kültürümüzü şekillendiren ilkeler" },
      { anahtar: "deger-1-baslik", etiket: "1. değer — başlık", tip: "input", varsayilan: "Bağımsızlık ve Tarafsızlık" },
      { anahtar: "deger-1-metin", etiket: "1. değer — açıklama", tip: "textarea", varsayilan: "Belgelendirme kararlarımız her türlü ticari, mali ve idari baskıdan bağımsızdır. Tarafsızlığımız kurumsal kimliğimizin temelidir." },
      { anahtar: "deger-2-baslik", etiket: "2. değer — başlık", tip: "input", varsayilan: "Şeffaflık" },
      { anahtar: "deger-2-metin", etiket: "2. değer — açıklama", tip: "textarea", varsayilan: "Süreçlerimizin her adımı izlenebilir ve açıktır. Müşterilerimiz denetim sürecinin tamamını net biçimde takip edebilir." },
      { anahtar: "deger-3-baslik", etiket: "3. değer — başlık", tip: "input", varsayilan: "Uzmanlık" },
      { anahtar: "deger-3-metin", etiket: "3. değer — açıklama", tip: "textarea", varsayilan: "Sektör deneyimi yüksek, yetkin denetçi kadromuzla her standardın gerekliliklerine hakim bir değerlendirme sunarız." },
      { anahtar: "deger-4-baslik", etiket: "4. değer — başlık", tip: "input", varsayilan: "Gizlilik" },
      { anahtar: "deger-4-metin", etiket: "4. değer — açıklama", tip: "textarea", varsayilan: "Denetim sürecinde edindiğimiz tüm bilgileri gizlilik ilkeleri ve yasal yükümlülüklere uygun olarak korur, üçüncü taraflarla paylaşmayız." },
      { anahtar: "deger-5-baslik", etiket: "5. değer — başlık", tip: "input", varsayilan: "Sürekli İyileştirme" },
      { anahtar: "deger-5-metin", etiket: "5. değer — açıklama", tip: "textarea", varsayilan: "Kendi süreçlerimizi de denetlediğimiz kuruluşlar gibi sürekli geliştirir, hizmet kalitemizi her gün bir adım ileriye taşırız." },
      { anahtar: "deger-6-baslik", etiket: "6. değer — başlık", tip: "input", varsayilan: "Güvenilirlik" },
      { anahtar: "deger-6-metin", etiket: "6. değer — açıklama", tip: "textarea", varsayilan: "Verdiğimiz sertifikalar uluslararası geçerliliğe sahiptir; kuruluşların pazardaki güvenilirliğini somut biçimde güçlendirir." },
      { anahtar: "cta-baslik", etiket: "Alt CTA — başlık", tip: "input", varsayilan: "Belgelendirme süreciniz hakkında konuşalım" },
      { anahtar: "cta-metin", etiket: "Alt CTA — alt metin", tip: "input", varsayilan: "Uzman ekibimiz kuruluşunuza en uygun çözümü birlikte planlamak için hazır." },
    ],
  },
  "/politika-ve-beyanlar": {
    ad: "Politika ve Beyanlar",
    alanlar: [
      { anahtar: "pol-1-baslik", etiket: "1. politika — başlık", tip: "input", varsayilan: "Tarafsızlık ve Bağımsızlık Beyanı" },
      { anahtar: "pol-1-metin", etiket: "1. politika — metin", tip: "textarea", varsayilan: "Belgelendirme faaliyetlerimizi her türlü ticari, mali ve idari etkiden bağımsız olarak yürütürüz. Tarafsızlığı tehdit eden çıkar ilişkilerini düzenli olarak değerlendirir; danışmanlık veya iç denetim gibi tarafsızlığı zedeleyebilecek hizmetleri sunmayız." },
      { anahtar: "pol-2-baslik", etiket: "2. politika — başlık", tip: "input", varsayilan: "Kalite Politikası" },
      { anahtar: "pol-2-metin", etiket: "2. politika — metin", tip: "textarea", varsayilan: "Hizmetlerimizi ilgili akreditasyon ve standart gerekliliklerine tam uyum içinde, tutarlı ve güvenilir biçimde sunmayı; süreçlerimizi ve denetçi yetkinliklerimizi sürekli iyileştirmeyi taahhüt ederiz." },
      { anahtar: "pol-3-baslik", etiket: "3. politika — başlık", tip: "input", varsayilan: "Gizlilik Politikası" },
      { anahtar: "pol-3-metin", etiket: "3. politika — metin", tip: "textarea", varsayilan: "Denetim ve belgelendirme sürecinde edindiğimiz tüm bilgileri gizli tutar; yasal zorunluluklar dışında üçüncü taraflarla paylaşmayız. Bilgi güvenliği önlemlerimizi yürürlükteki mevzuata uygun olarak uygularız." },
      { anahtar: "pol-4-baslik", etiket: "4. politika — başlık", tip: "input", varsayilan: "Şikayet ve İtirazların Değerlendirilmesi" },
      { anahtar: "pol-4-metin", etiket: "4. politika — metin", tip: "textarea", varsayilan: "Belgelendirme kararlarımıza yönelik itirazlar ve hizmetlerimize ilişkin şikayetler; tarafsız, adil ve gizlilik esasına dayalı bir süreçle ele alınır. Her başvuru kayıt altına alınır ve sonucu başvurana bildirilir." },
      { anahtar: "pol-5-baslik", etiket: "5. politika — başlık", tip: "input", varsayilan: "Ayrım Gözetmeme" },
      { anahtar: "pol-5-metin", etiket: "5. politika — metin", tip: "textarea", varsayilan: "Belgelendirme hizmetlerimize erişim; başvuran kuruluşun büyüklüğü, üyeliği veya halihazırda belgelendirilmiş kuruluş sayısı gibi koşullara bağlı tutulmadan, eşit ve ayrımcılık yapılmaksızın sağlanır." },
      { anahtar: "pol-6-baslik", etiket: "6. politika — başlık", tip: "input", varsayilan: "Belge Kullanımı ve Marka" },
      { anahtar: "pol-6-metin", etiket: "6. politika — metin", tip: "textarea", varsayilan: "Belgelendirilen kuruluşların sertifika ve akreditasyon markalarını yalnızca kapsam dahilinde ve yanıltıcı olmayacak biçimde kullanmasını bekleriz. Hatalı kullanım durumunda gerekli düzeltici işlemler uygulanır." },
    ],
  },
};

// ---------- Erişim katmanı ----------

async function _icerikGetir(yol: string): Promise<Record<string, string>> {
  if (!dbHazir) return {};
  try {
    const rows = await db
      .select({ anahtar: sayfaBloklari.anahtar, deger: sayfaBloklari.deger })
      .from(sayfaBloklari)
      .where(eq(sayfaBloklari.yol, yol));
    return Object.fromEntries(rows.map((r) => [r.anahtar, r.deger]));
  } catch (e) {
    console.error("sayfa içeriği DB hatası:", e);
    return {};
  }
}

/** 10 dk önbellekli; admin kaydedince updateTag('sayfa-icerik') ile temizleniyor. */
export const sayfaIcerigiGetir = unstable_cache(_icerikGetir, ["sayfa-icerik-v1"], {
  revalidate: 600,
  tags: ["sayfa-icerik"],
});

/** Verilen sayfa + alan için: önce DB'deki override, yoksa kod'daki varsayılan. */
export function alanDegeri(icerik: Record<string, string>, yol: string, anahtar: string): string {
  const dbDeger = icerik[anahtar];
  if (dbDeger && dbDeger.trim()) return dbDeger;
  const alan = SAYFA_ICERIK[yol]?.alanlar.find((a) => a.anahtar === anahtar);
  return alan?.varsayilan ?? "";
}
