import type { CSSProperties } from "react";
import Image from "next/image";
import { referanslariGetir } from "@/lib/icerik";

/**
 * Ana sayfa "Referanslarımız" — yatay sonsuz kayan logo şeridi (marquee).
 * Tek satır olduğu için logo sayısı arttıkça sayfa dikeyde büyümez.
 * Hover'da durur; prefers-reduced-motion'da animasyon kapanır, elle kaydırılır.
 */
export default async function Referanslar() {
  const referanslar = await referanslariGetir();
  if (referanslar.length === 0) return null;

  // Kesintisiz döngü için liste iki kez render edilir.
  // Süre adet ile orantılı (logo başına ~4sn) — adet artsa da hız sabit kalır.
  const sure = Math.max(20, referanslar.length * 4);
  const liste = [...referanslar, ...referanslar];

  return (
    <section className="dvn-ref-bolum">
      <span className="dvn-glow-orb dvn-glow-orb--lacivert dvn-ref-orb" aria-hidden />
      <div style={{ textAlign: "center", marginBottom: 32, padding: "0 32px", position: "relative" }}>
        <span className="dvn-bolum-etiket">REFERANSLARIMIZ</span>
        <h2 className="dvn-bolum-baslik" style={{ fontSize: 28 }}>
          Bize güvenen kurumlar
        </h2>
      </div>

      <div className="dvn-ref-marquee">
        <div className="dvn-ref-track" style={{ "--sure": `${sure}s` } as CSSProperties}>
          {liste.map((r, i) => {
            const ikincilKopya = i >= referanslar.length;
            // Yerel logolar (yüklenen /api/gorsel/... veya /public yolları) next/image
            // ile gösterim boyutuna (150px, retina için 2x) küçültülüp sıkıştırılır.
            // Dış URL'ler optimize edilemez; oldukları gibi sunulur.
            const harici = /^https?:\/\//.test(r.logo);
            const icerik = (
              <div style={{ position: "relative", width: 150, height: 56 }}>
                <Image
                  src={r.logo}
                  alt={r.ad}
                  fill
                  sizes="150px"
                  style={{ objectFit: "contain" }}
                  className="dvn-referans-logo"
                  unoptimized={harici}
                />
              </div>
            );

            return r.url ? (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.ad}
                aria-hidden={ikincilKopya}
                className="dvn-ref-hucre"
              >
                {icerik}
              </a>
            ) : (
              <div key={i} aria-hidden={ikincilKopya} className="dvn-ref-hucre">
                {icerik}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .dvn-ref-bolum {
          position: relative;
          overflow: hidden;
          padding: 60px 0;
          background: linear-gradient(180deg, var(--dvn-gri-50) 0%, #ffffff 100%);
        }
        .dvn-ref-orb {
          top: -160px;
          right: 8%;
          width: 380px;
          height: 380px;
          opacity: 0.16;
        }
        .dvn-ref-marquee {
          position: relative;
          overflow: hidden;
          width: 100%;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .dvn-ref-track {
          display: flex;
          width: max-content;
          align-items: center;
          /* Önce sağdan içeri girer (tek sefer), sonra kesintisiz döngü. */
          animation: dvn-ref-giris 2.6s linear, dvn-ref-kay var(--sure, 40s) linear 2.6s infinite;
        }
        .dvn-ref-marquee:hover .dvn-ref-track { animation-play-state: paused; }
        .dvn-ref-hucre {
          flex-shrink: 0;
          margin-right: 18px;
          background: white;
          border: 1px solid var(--dvn-gri-300);
          border-radius: 14px;
          padding: 16px 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: var(--dvn-shadow-sm);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dvn-ref-hucre:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 169, 63, 0.5);
          box-shadow: 0 16px 32px rgba(2, 35, 152, 0.12);
        }
        .dvn-referans-logo { filter: grayscale(1); opacity: 0.7; transition: filter 0.25s ease, opacity 0.25s ease; }
        .dvn-ref-hucre:hover .dvn-referans-logo { filter: grayscale(0); opacity: 1; }
        @keyframes dvn-ref-giris {
          from { transform: translateX(100vw); }
          to { transform: translateX(0); }
        }
        @keyframes dvn-ref-kay {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dvn-ref-marquee { overflow-x: auto; }
          .dvn-ref-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
