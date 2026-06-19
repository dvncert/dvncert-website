/**
 * DVN Cert - Dokümanlar (merkezi veri)
 *
 * Yayımlanan politika, talimat, prosedür ve formların listesi.
 * Dosyalar /public/dokumanlar/ altına eklendikçe ilgili kaydın `dosya`
 * alanına yol yazılır (ör. "/dokumanlar/POL-01-kalite-politikasi.pdf").
 * `dosya` boş olduğunda arayüzde "Yakında" olarak görünür.
 */

export type DokumanTipi = "PDF" | "DOCX" | "XLSX";

export type Dokuman = {
  kod: string;
  baslik: string;
  tip: DokumanTipi;
  /** /public altındaki dosya yolu. Boşsa henüz yayımlanmamış demektir. */
  dosya: string;
};

export type DokumanGrubu = {
  grup: string;
  dokumanlar: Dokuman[];
};

export const dokumanGruplari: DokumanGrubu[] = [
  {
    grup: "Politikalar",
    dokumanlar: [
      { kod: "POL.01 Rev01", baslik: "Kalite Politikası", tip: "PDF", dosya: "" },
    ],
  },
  {
    grup: "Talimatlar",
    dokumanlar: [
      { kod: "TL.01 Rev01", baslik: "Ücretlendirme Talimatı", tip: "PDF", dosya: "" },
      { kod: "TL.11 Rev02", baslik: "Marka ve Logo Kullanım Talimatı", tip: "PDF", dosya: "/dokumanlar/marka-logo-kullanim-talimati.pdf" },
      { kod: "TL.12 Rev01", baslik: "Belgelendirme Kuralları Talimatı", tip: "PDF", dosya: "" },
    ],
  },
  {
    grup: "Prosedürler",
    dokumanlar: [
      { kod: "PR.01 Rev01", baslik: "Belgelendirme Başvurularının Alınması Prosedürü", tip: "PDF", dosya: "" },
      { kod: "PR.04 Rev01", baslik: "Belgelendirmenin Askıya Alınması ve Geri Çekilmesi Prosedürü", tip: "PDF", dosya: "" },
      { kod: "PR.05 Rev01", baslik: "İtiraz ve Şikayet Değerlendirme Prosedürü", tip: "PDF", dosya: "" },
      { kod: "PR.16 Rev01", baslik: "Sistem Belgelendirme Prosedürü", tip: "PDF", dosya: "" },
    ],
  },
  {
    grup: "Formlar",
    dokumanlar: [
      { kod: "FR.01 Rev02", baslik: "Belgelendirme Başvuru Formu", tip: "DOCX", dosya: "" },
      { kod: "FR.03", baslik: "ISO 45001 Başvuru Formu", tip: "DOCX", dosya: "" },
      { kod: "FR.04", baslik: "ISO 50001 Başvuru Formu", tip: "DOCX", dosya: "" },
      { kod: "FR.34", baslik: "İtiraz ve Şikayet Değerlendirme Formu", tip: "XLSX", dosya: "" },
      { kod: "FR.53", baslik: "Müşteri Memnuniyeti Anketi Formu", tip: "DOCX", dosya: "" },
    ],
  },
];
