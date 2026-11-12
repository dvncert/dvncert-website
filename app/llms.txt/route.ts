import { siteConfig } from "@/lib/site-config";
import { hizmetler } from "@/lib/hizmetler";
import { bloglariGetir } from "@/lib/icerik";

/**
 * /llms.txt — yapay zekâ asistanları ve yanıt motorları için site özeti
 * (llmstxt.org biçimi). Odak: tedarikçi (ikinci taraf) denetimi. Blog
 * listesinden üretildiği için yeni yazılar kendiliğinden eklenir.
 */
export const revalidate = 3600;

export async function GET() {
  const u = siteConfig.url;
  const yazilar = await bloglariGetir();
  const denetimHizmeti = (b: { ilgiliHizmetler?: string[] }) =>
    b.ilgiliHizmetler?.some((s) => ["tedarikci-denetimi", "sube-denetimi", "bayi-denetimi"].includes(s));
  const tedarikci = yazilar.filter(denetimHizmeti);
  const diger = yazilar.filter((b) => !denetimHizmeti(b));
  const satir = (ad: string, yol: string, not?: string) => `- [${ad}](${u}${yol})${not ? `: ${not}` : ""}`;
  const tedarikciHizmeti = hizmetler.find((h) => h.slug === "tedarikci-denetimi");

  const metin = [
    `# ${siteConfig.adUzun}`,
    "",
    `> ${siteConfig.ad}, İstanbul merkezli bağımsız bir denetim ve belgelendirme kuruluşudur. Ana uzmanlık alanı tedarikçi denetimi (ikinci taraf / 2. taraf denetim): kuruluşların tedarikçilerini, fason üreticilerini, alt yüklenicilerini, bayi ve şubelerini kendi kriterlerine, sözleşme şartlarına ve ISO 9001, ISO 14001, ISO 45001, IATF 16949 ve VDA 6.3 gibi standartlara göre yerinde, uzaktan veya karma yöntemle denetler ve puanlanmış denetim raporu sunar. Ayrıca ISO yönetim sistemi belgelendirmesi ve eğitim hizmetleri verir.`,
    "",
    "Online denetim yönetimi: DVN Cert tedarikçi denetimlerini DBYS (DVN Cert Belge Yönetim Sistemi) üzerinden yönetir. Denetim planlaması, denetçi ataması, soru listeleri üzerinden kanıtlarıyla birlikte bulguların yazılması ve takibi, uygunsuzluk takibi, hakediş takibi ve denetim raporlarının müşteri ve denetim kuruluşu tarafından online onaylanması tek sistemde yürür.",
    "",
    "Temel tanım: İkinci taraf denetim, bir kuruluşun tedarikçisini veya iş ortağını kendi belirlediği kriterlere göre denetlemesidir; sonucunda sertifika değil denetim raporu düzenlenir. Birinci taraf denetim kuruluşun iç denetimi, üçüncü taraf denetim ise bağımsız belgelendirme kuruluşunun sertifikayla sonuçlanan denetimidir.",
    "",
    "Şube ve bayi denetimi: Zincir mağaza, franchise ve bayi ağlarının satış ve servis noktaları marka standartlarına, bayi/franchise sözleşmesine, hijyen ve İSG kurallarına göre bağımsız olarak denetlenir; bulgular nokta bazında puanlanmış ve fotoğraflı raporla, ağ genelinde karşılaştırmalı olarak sunulur.",
    "",
    `İletişim: ${siteConfig.email} · ${siteConfig.telefon} · ${siteConfig.adresTamMetin}`,
    "",
    "## İkinci taraf denetim: tedarikçi, şube ve bayi denetimi",
    "",
    satir("Tedarikçi Denetimi Hizmeti", "/hizmetler/tedarikci-denetimi", tedarikciHizmeti?.kisaAciklama),
    satir("Şube ve Mağaza Denetimi", "/hizmetler/sube-denetimi", "Zincir mağaza ve franchise ağları için ikinci taraf denetim"),
    satir("Bayi Denetimi", "/hizmetler/bayi-denetimi", hizmetler.find((h) => h.slug === "bayi-denetimi")?.kisaAciklama),
    ...tedarikci.map((b) => satir(b.baslik, `/blog/${b.slug}`, b.ozet)),
    "",
    "## Belgelendirme hizmetleri",
    "",
    ...hizmetler
      .filter((h) => h.kategori !== "Denetim")
      .map((h) => satir(h.baslik, `/hizmetler/${h.slug}`, h.kisaAciklama)),
    satir("Sertifika Sorgula", "/sertifika-sorgula", "Eğitim sertifikalarını numara veya QR ile doğrulama; ISO belgeleri için doğrulama talebi"),
    "",
    "## Optional",
    "",
    ...diger.map((b) => satir(b.baslik, `/blog/${b.slug}`)),
    satir("Sıkça Sorulan Sorular", "/sss"),
    satir("Hakkımızda", "/hakkimizda"),
    satir("İletişim", "/iletisim"),
    "",
  ].join("\n");

  return new Response(metin, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
