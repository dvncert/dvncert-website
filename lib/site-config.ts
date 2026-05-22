/**
 * DVN Cert - Site sabit bilgileri
 * Bu dosyadaki bilgiler tüm sayfalarda kullanılır.
 * İleride bir bilgi değişirse SADECE burası değişir.
 */

export const siteConfig = {
  // Temel kimlik
  ad: "DVN Cert",
  adUzun: "DVN Cert Belgelendirme",
  slogan: "Bağımsız, tarafsız ve doğrulanabilir belgelendirme yaklaşımı",
  aciklamaKisa:
    "ISO 9001, 14001, 45001 ve 50001 yönetim sistemleri belgelendirmesinde TÜRKAK akreditasyonu ile güvence altında şeffaf süreç.",
  aciklamaUzun:
    "DVN Cert, bağımsız ve tarafsız bir uygunluk değerlendirme kuruluşudur. ISO 9001, ISO 14001, ISO 45001 ve ISO 50001 yönetim sistemleri belgelendirmesinde TÜRKAK akreditasyon kapsamı dahilinde hizmet verir. Şeffaf süreç, uzman denetçi kadrosu ve uluslararası geçerli sertifikalar ile kuruluşların güvenilirliğini artırır.",

  // URL ve dil
  url: "https://dvncert.com",
  dbysUrl: "https://dbys.dvncert.com",
  dil: "tr-TR",
  bolge: "TR",

  // İletişim
  email: "info@dvncert.com",
  telefon: "+90 530 044 80 37",
  telefonGorunen: "+90 530 044 80 37",

  // Adres
  adres: {
    sokak: "Güzelyalı Mah. Eyüp Sultan Cad. No:32/A",
    bina: "Devran Apt.",
    ilce: "Pendik",
    il: "İstanbul",
    ulke: "Türkiye",
    posta: "34903",
  },
  adresTamMetin:
    "Güzelyalı Mah. Eyüp Sultan Cad. No:32/A Devran Apt. Pendik / İstanbul",

  // Anahtar kelimeler (SEO)
  anahtarKelimeler: [
    "ISO 9001 belgelendirme",
    "ISO 14001 belgelendirme",
    "ISO 45001 belgelendirme",
    "ISO 50001 belgelendirme",
    "TÜRKAK akreditasyon",
    "yönetim sistemi belgelendirme",
    "2. taraf denetimi",
    "iç denetçi eğitimi",
    "belgelendirme kuruluşu İstanbul",
    "DVN Cert",
  ],

  // Sosyal medya (ileride doldurursunuz)
  sosyal: {
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  },

  // Akreditasyon bilgileri
  akreditasyon: {
    kurulus: "TÜRKAK",
    kapsam: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "ISO 50001:2018"],
    referansNumarasi: "AB-XXXX-YS", // İleride gerçek numarayı koyacağız
  },

  // Coğrafi koordinatlar (Pendik için yaklaşık)
  konum: {
    enlem: 40.876,
    boylam: 29.255,
  },

  // Çalışma saatleri
  calismaSaatleri: {
    haftaIciAcilis: "09:00",
    haftaIciKapanis: "18:00",
    haftaSonu: "Kapalı",
  },

  // Kariyer
  kariyer: {
    // Denetçi ve Teknik Uzman başvuruları DBYS üzerinden alınır.
    // DBYS başvuru linki buraya yazılınca /kariyer sayfasındaki buton otomatik aktifleşir.
    denetciBasvuruUrl: "",
    // İdari/ofis pozisyonları (kariyer başvuru formundaki seçenekler)
    idariPozisyonlar: [
      "Planlama Uzmanı",
      "Belgelendirme / Dosya Sorumlusu",
      "Yönetim Temsilcisi",
      "Müşteri İlişkileri Uzmanı",
      "İdari İşler / Operasyon Uzmanı",
    ],
  },
};

export type SiteConfig = typeof siteConfig;