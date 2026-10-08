import type { CSSProperties } from "react";
import { Cormorant_Garamond, Source_Serif_4 } from "next/font/google";

const baslikFont = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["600", "700"], display: "swap" });
const metinFont = Source_Serif_4({ subsets: ["latin", "latin-ext"], weight: ["600"], display: "swap" });

export type EgitimSertifikasiVeri = {
  katilimciAdi: string;
  egitimAdi: string;
  /** Sertifikadaki biçim, örn. "15-16.10.2026" (lib/sertifika egitimTarihiYaz). */
  egitimTarihi: string;
  egitmen: string;
  sertifikaNo: string;
  /** lib/sertifika qrSvg çıktısı. */
  qrSvg: string;
};

/*
 * Şablon görseli 1536×1024 px (public/sertifika/egitim-sertifikasi.webp,
 * noktalı alanları temizlenmiş). Aşağıdaki konumlar bu görseldeki piksel
 * koordinatlarının yüzdesidir; yazı boyutları cqw (sertifika genişliğinin
 * %1'i = 15.36 px) cinsindendir — böylece ekranda ve A4 baskıda aynı oranda
 * ölçeklenir.
 */
const W = 1536;
const H = 1024;
const x = (px: number) => `${(px / W) * 100}%`;
const y = (px: number) => `${(px / H) * 100}%`;

const LACIVERT = "#0b1f4d";

/** Satıra sığması için ad uzunluğuna göre yazı boyutu (cqw). */
function adBoyutu(ad: string): number {
  const buyukOrani = ad.replace(/[^A-ZÇĞİÖŞÜ]/g, "").length / Math.max(ad.replace(/\s/g, "").length, 1);
  const karakterGenisligi = buyukOrani > 0.6 ? 0.66 : 0.46; // em cinsinden ortalama (Cormorant dar bir yazı tipi)
  return Math.min(3, 44 / (ad.length * karakterGenisligi));
}

/** Eğitim adı: tek satıra sığarsa tek satır, sığmazsa küçültülüp iki satır. */
function egitimBoyutu(ad: string): { boyut: number; tekSatir: boolean } {
  const tek = 50 / (ad.length * 0.41);
  if (tek >= 1.3) return { boyut: Math.min(2.1, tek), tekSatir: true };
  return { boyut: Math.max(1.05, Math.min(1.45, (2 * 50) / (ad.length * 0.41))), tekSatir: false };
}

export default function EgitimSertifikasi({ veri, className }: { veri: EgitimSertifikasiVeri; className?: string }) {
  const egitim = egitimBoyutu(veri.egitimAdi);

  return (
    <div className={`dvn-sertifika ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/sertifika/egitim-sertifikasi.webp" alt="" className="dvn-sertifika-zemin" />

      {/* Katılımcı adı — "katılım sağlamış olduğu" ifadesinin solu */}
      <div
        className={baslikFont.className}
        style={{
          ...satir,
          left: x(300),
          width: x(705),
          bottom: `calc(100% - ${y(514)})`,
          fontSize: `${adBoyutu(veri.katilimciAdi)}cqw`,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        {veri.katilimciAdi}
      </div>

      {/* Eğitim adı — "Eğitimini başarı ile..." satırının üstü */}
      <div
        className={baslikFont.className}
        style={{
          ...satir,
          left: x(370),
          width: x(796),
          bottom: `calc(100% - ${y(566)})`,
          fontSize: `${egitim.boyut}cqw`,
          fontWeight: 700,
          lineHeight: 1.08,
          whiteSpace: egitim.tekSatir ? "nowrap" : "normal",
          textWrap: "balance",
        }}
      >
        {veri.egitimAdi}
      </div>

      {/* Alt bilgi sütunları */}
      <div className={metinFont.className} style={{ ...alan, left: x(306) }}>{veri.egitimTarihi}</div>
      <div className={metinFont.className} style={{ ...alan, left: x(631) }}>{veri.egitmen}</div>
      <div className={metinFont.className} style={{ ...alan, left: x(974), letterSpacing: "0.12em" }}>{veri.sertifikaNo}</div>

      {/* QR — iletişim bilgileri ile mühür arasında, "Eğitim Tarihi" sütunu hizasında */}
      <div style={{ position: "absolute", left: x(386), top: y(800), width: x(112), textAlign: "center" }}>
        <div
          style={{ width: "100%", aspectRatio: "1", background: "#fff", padding: "0.45cqw", borderRadius: "0.4cqw", boxShadow: "0 0 0 0.06cqw #d9c08a", boxSizing: "border-box" }}
          dangerouslySetInnerHTML={{ __html: veri.qrSvg }}
        />
        <div className={metinFont.className} style={{ marginTop: "0.45cqw", fontSize: "0.8cqw", color: LACIVERT, opacity: 0.8, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
          QR ile doğrulayın
        </div>
      </div>

      <style>{`
        .dvn-sertifika {
          position: relative;
          width: 100%;
          aspect-ratio: ${W} / ${H};
          container-type: inline-size;
          overflow: hidden;
          background: #fafafa;
          color: ${LACIVERT};
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dvn-sertifika-zemin { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .dvn-sertifika svg { display: block; width: 100%; height: 100%; }
      `}</style>
    </div>
  );
}

const satir: CSSProperties = {
  position: "absolute",
  textAlign: "center",
  color: LACIVERT,
  lineHeight: 1.15,
};

const alan: CSSProperties = {
  position: "absolute",
  width: x(268),
  bottom: `calc(100% - ${y(748)})`,
  textAlign: "center",
  fontSize: "1.3cqw",
  fontWeight: 600,
  lineHeight: 1.35,
  color: LACIVERT,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
