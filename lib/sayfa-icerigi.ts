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
import { isoIcerikler, type IsoIcerik, type IsoKart } from "./iso-icerik";
import { hizmetGetir, type Hizmet, type SurecAdimi } from "./hizmetler";

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

/** ISO sayfaları için ortak alan üretici — lib/iso-icerik.ts'teki statik veriyi varsayılan olarak alır. */
function isoAlanlari(def: IsoIcerik): Alan[] {
  return [
    {
      anahtar: "nedir",
      etiket: `"${def.stdAd} Belgesi Nedir?" — paragraflar`,
      tip: "textarea-uzun",
      varsayilan: def.nedirParagraflar.join("\n\n"),
      yardim: "Her paragrafı boş bir satırla ayırın. Sayfada akredite cümlesi otomatik olarak en sona eklenir.",
    },
    { anahtar: "bolum2-baslik", etiket: "İlkeler/Unsurlar — bölüm başlığı", tip: "input", varsayilan: def.bolum2Baslik },
    { anahtar: "bolum2-giris", etiket: "İlkeler/Unsurlar — giriş paragrafı", tip: "textarea", varsayilan: def.bolum2Giris },
    {
      anahtar: "bolum2-kartlar",
      etiket: "İlkeler/Unsurlar — kart listesi",
      tip: "textarea-uzun",
      varsayilan: def.bolum2Kartlar.map((k) => `## ${k.baslik}\n${k.metin}`).join("\n\n"),
      yardim: "Her kart için: '## Başlık' satırı, ardından kart metni. Kartları boş satırla ayırın.",
    },
    { anahtar: "faydalar-giris", etiket: "Faydalar — giriş paragrafı", tip: "textarea", varsayilan: def.faydalarGiris },
    {
      anahtar: "ic-faydalar",
      etiket: "Kuruluş içi faydalar — her satır 1 madde",
      tip: "textarea-uzun",
      varsayilan: def.icFaydalar.join("\n"),
      yardim: "Her satır = 1 madde. Etiket-açıklama biçimi için 'Etiket: açıklama' yazabilirsiniz.",
    },
    {
      anahtar: "pazar-faydalar",
      etiket: "Pazar/dış faydalar — her satır 1 madde",
      tip: "textarea-uzun",
      varsayilan: def.pazarFaydalar.join("\n"),
      yardim: "Her satır = 1 madde. Etiket-açıklama biçimi için 'Etiket: açıklama' yazabilirsiniz.",
    },
    { anahtar: "faydalar-kapanis", etiket: "Faydalar — kapanış paragrafı", tip: "textarea", varsayilan: def.faydalarKapanis },
  ];
}

const isoSayfaTanimlari: Record<string, SayfaIcerikTanim> = Object.fromEntries(
  Object.values(isoIcerikler).map((def) => [
    `/hizmetler/${def.slug}`,
    { ad: `${def.stdKod} ${def.sistemAdiBuyuk}`, alanlar: isoAlanlari(def) },
  ]),
);

/** Hizmet detay sayfaları (/hizmetler/[slug]) için alan üretici. */
function hizmetAlanlari(h: Hizmet): Alan[] {
  const alanlar: Alan[] = [
    { anahtar: "kisa-aciklama", etiket: "Üst kısa açıklama (sayfa başlığı altında)", tip: "textarea", varsayilan: h.kisaAciklama },
    {
      anahtar: "giris",
      etiket: "Giriş paragrafları (boş satırla ayır)",
      tip: "textarea-uzun",
      varsayilan: h.giris,
      yardim: "Paragrafları boş satırla ayırın.",
    },
    {
      anahtar: "faydalar",
      etiket: "Kazanımlar / faydalar (her satır 1 madde)",
      tip: "textarea-uzun",
      varsayilan: h.faydalar.join("\n"),
    },
    {
      anahtar: "surec-kartlari",
      etiket: "Süreç adımları ('## Başlık' formatı)",
      tip: "textarea-uzun",
      varsayilan: (h.surec ?? []).map((s) => `## ${s.baslik}\n${s.aciklama}`).join("\n\n"),
      yardim: "Her adım için: '## Başlık' satırı, ardından açıklama. Adımları boş satırla ayırın.",
    },
  ];
  if (h.sss && h.sss.length > 0) {
    alanlar.push({
      anahtar: "sss",
      etiket: "Sıkça sorulan sorular ('## Soru' formatı)",
      tip: "textarea-uzun",
      varsayilan: h.sss.map((s) => `## ${s.soru}\n${s.cevap}`).join("\n\n"),
      yardim:
        "Her soru için: '## Soru' satırı, ardından cevabı. Soruları boş satırla ayırın. Google'da zengin sonuç (SSS) olarak görünebilir.",
    });
  }
  return alanlar;
}

const hizmetSayfaTanimlari: Record<string, SayfaIcerikTanim> = Object.fromEntries(
  (["sistem-belgelendirme", "2-taraf-denetimleri"] as const)
    .map((slug) => hizmetGetir(slug))
    .filter((h): h is Hizmet => Boolean(h))
    .map((h) => [`/hizmetler/${h.slug}`, { ad: h.baslik, alanlar: hizmetAlanlari(h) }]),
);

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
  ...isoSayfaTanimlari,
  ...hizmetSayfaTanimlari,
  "/egitimler": {
    ad: "Eğitimler",
    alanlar: [
      { anahtar: "giris-etiket", etiket: "Giriş — üst etiket", tip: "input", varsayilan: "ISO YÖNETİM SİSTEMLERİ EĞİTİM PROGRAMLARI" },
      { anahtar: "giris-baslik", etiket: "Giriş — başlık", tip: "input", varsayilan: "Yönetim sistemi bilgi seviyenizi artırın" },
      {
        anahtar: "giris-metin",
        etiket: "Giriş — paragraf",
        tip: "textarea-uzun",
        varsayilan:
          "DVN Cert olarak, uluslararası standartlarda belgelendirme deneyimimizden edindiğimiz bilgi birikimini profesyonel eğitim programlarımızla paylaşarak kurumların yönetim sistemi bilgi seviyesini artırmayı hedefliyoruz. Eğitimlerimiz çevrim içi veya yüz yüze gerçekleştirilmekte olup genel katılıma açıktır.",
      },
      {
        anahtar: "egitim-kartlari",
        etiket: "Eğitim kartları ('## Başlık' formatı)",
        tip: "textarea-uzun",
        varsayilan:
          "## ISO 9001 Kalite Yönetim Sistemi Eğitimi\nTemel kavramlar, madde bazlı gereklilikler ve uygulama örnekleri.\n\n## ISO 14001 Çevre Yönetim Sistemi Eğitimi\nÇevre boyutları, risk ve fırsat yönetimi ve mevzuat uyumu.\n\n## ISO 45001 İş Sağlığı ve Güvenliği Yönetim Sistemi Eğitimi\nTehlike tanımlama, risk değerlendirme ve İSG performans yönetimi.\n\n## ISO 50001 Enerji Yönetim Sistemi Eğitimi\nEnerji performans göstergeleri, enerji verimliliği ve sürekli iyileştirme.",
        yardim: "Her eğitim için: '## Başlık' satırı, ardından açıklama. Eğitimleri boş satırla ayırın. İkonlar başlığa göre otomatik atanır.",
      },
      { anahtar: "cta-baslik", etiket: "Alt CTA — başlık", tip: "input", varsayilan: "Eğitim talebinde bulunun" },
      { anahtar: "cta-metin", etiket: "Alt CTA — alt metin", tip: "input", varsayilan: "Kurumunuza özel veya genel katılımlı eğitim programları için bizimle iletişime geçin." },
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

// ---------- ISO sayfaları için DB-aware getirme ----------

/** "## Başlık\nMetin..." formatından IsoKart[] dizisi üretir. */
function kartlariCozumle(metin: string): IsoKart[] {
  if (!metin.trim()) return [];
  const bloklar = metin.split(/\n\s*\n/).filter((b) => b.trim());
  return bloklar.map((b) => {
    const satirlar = b.split("\n");
    const baslikSatiri = satirlar[0] ?? "";
    const baslik = baslikSatiri.replace(/^##\s*/, "").trim();
    const metinKismi = satirlar.slice(1).join("\n").trim();
    return { baslik, metin: metinKismi };
  });
}

/** Çok satırlı metni satır-bazlı maddelere çevirir; boşları atar. */
function maddeleriCozumle(metin: string): string[] {
  return metin
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Süreç kartları formatından SurecAdimi[] üretir (kartlariCozumle ile aynı format). */
function surecCozumle(metin: string): SurecAdimi[] {
  return kartlariCozumle(metin).map((k) => ({ baslik: k.baslik, aciklama: k.metin }));
}

/**
 * Bir hizmet sayfasının (/hizmetler/[slug]) statik + DB override içeriklerinin
 * birleşmiş halini döner. lib/hizmetler.ts'teki Hizmet shape'inde, sadece
 * düzenlenebilir alanlar override edilmiş olur.
 */
export async function hizmetIcerikGetirDB(slug: string): Promise<Hizmet | undefined> {
  const def = hizmetGetir(slug);
  if (!def) return undefined;
  const yol = `/hizmetler/${slug}`;
  // Yalnızca admin'de tanımlı sayfalar için override uygula
  if (!SAYFA_ICERIK[yol]) return def;

  const icerik = await sayfaIcerigiGetir(yol);
  const al = (k: string) => alanDegeri(icerik, yol, k);

  const sonuc: Hizmet = {
    ...def,
    kisaAciklama: al("kisa-aciklama"),
    giris: al("giris"),
    faydalar: maddeleriCozumle(al("faydalar")),
    surec: surecCozumle(al("surec-kartlari")),
  };
  if (def.sss) {
    sonuc.sss = kartlariCozumle(al("sss")).map((k) => ({ soru: k.baslik, cevap: k.metin }));
  }
  return sonuc;
}

/** Eğitimler sayfasındaki kart başlığından ikon anahtarına çevrim. */
export function egitimIkonu(baslik: string): string {
  const b = baslik.toLowerCase();
  if (b.includes("9001")) return "kalite";
  if (b.includes("14001")) return "cevre";
  if (b.includes("45001")) return "isg";
  if (b.includes("50001")) return "enerji";
  return "egitim";
}

/**
 * Bir ISO sayfasının statik + DB override içeriklerinin birleşmiş halini döner.
 * IsoStandartSayfasi bileşeni bunu kullanır.
 */
export async function isoIcerikGetirDB(slug: string): Promise<IsoIcerik | undefined> {
  const def = isoIcerikler[slug];
  if (!def) return undefined;
  const yol = `/hizmetler/${slug}`;
  const icerik = await sayfaIcerigiGetir(yol);
  const al = (k: string) => alanDegeri(icerik, yol, k);

  const nedirHam = al("nedir");
  const kartlarHam = al("bolum2-kartlar");
  const icHam = al("ic-faydalar");
  const pazarHam = al("pazar-faydalar");

  return {
    ...def,
    nedirParagraflar: nedirHam
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    bolum2Baslik: al("bolum2-baslik"),
    bolum2Giris: al("bolum2-giris"),
    bolum2Kartlar: kartlariCozumle(kartlarHam),
    faydalarGiris: al("faydalar-giris"),
    icFaydalar: maddeleriCozumle(icHam),
    pazarFaydalar: maddeleriCozumle(pazarHam),
    faydalarKapanis: al("faydalar-kapanis"),
  };
}
