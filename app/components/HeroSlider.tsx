import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const surecAdimlari = [
  "Başvuru ve kapsam teyidi",
  "Sözleşme ve planlama",
  "Aşama 1 doküman inceleme",
  "Aşama 2 saha denetimi",
  "Karar ve belge durumu",
];

export default function HeroSlider() {
  return (
    <>
      <section className="dvn-hero-yeni">
        <div className="dvn-hero-icerik">
          <div className="dvn-hero-metin">
            <p className="dvn-hero-eyebrow">ISO belgelendirme, ikinci taraf denetim ve eğitim</p>
            <h1>Belgelendirme sürecinizi açık, izlenebilir ve ölçülü yönetin</h1>
            <p className="dvn-hero-aciklama">
              DVN Cert, yönetim sistemi belgelendirme süreçlerinde tarafsız değerlendirme,
              net kayıt yönetimi ve sahaya uygulanabilir denetim yaklaşımı sunar.
            </p>

            <div className="dvn-hero-uyari" role="note">
              <strong>{siteConfig.akreditasyon.kurulus} durumu:</strong> {siteConfig.akreditasyon.durum}{" "}
              {siteConfig.akreditasyon.not}
            </div>

            <div className="dvn-hero-aksiyonlar">
              <Link href="https://dbys.dvncert.com/basvuru" target="_blank" rel="noopener noreferrer" className="dvn-btn-primary">
                Başvuru Yap
              </Link>
              <Link href="/sertifika-sorgula" className="dvn-btn-secondary">
                Sertifika Sorgula
              </Link>
              <Link href="/hizmetler" className="dvn-hero-link">
                Hizmetleri incele
              </Link>
            </div>
          </div>

          <div className="dvn-hero-panel" aria-label="Belgelendirme süreci özeti">
            <div className="dvn-panel-ust">
              <span>DVN CERT</span>
              <strong>Süreç Dosyası</strong>
            </div>
            <div className="dvn-panel-cizgi" />
            <div className="dvn-panel-kapsam">
              {siteConfig.akreditasyon.hedefKapsam.map((std) => (
                <span key={std}>{std}</span>
              ))}
            </div>
            <ol className="dvn-panel-adimlar">
              {surecAdimlari.map((adim) => (
                <li key={adim}>{adim}</li>
              ))}
            </ol>
            <div className="dvn-panel-alt">
              <span>Belge durumu çevrim içi doğrulanabilir</span>
              <Link href="/belgelendirme-sureci">Süreci gör</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="dvn-hero-serit">
        <span>Tarafsızlık</span>
        <span>İzlenebilir kayıt</span>
        <span>Yetkin denetçi havuzu</span>
        <span>Online başvuru</span>
      </div>
    </>
  );
}
