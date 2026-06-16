import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { tarihiBicimle, type Duyuru } from "@/lib/duyurular";
import { duyurulariGetir } from "@/lib/icerik";

// Kategoriye göre kapak ikonu (görsel yoksa kullanılır)
function kategoriIkon(kategori: string): ReactNode {
  const k = kategori.toLocaleLowerCase("tr-TR");
  if (k.includes("akredit"))
    return <path d="M12 2l8 4v6c0 5.5-3.5 10-8 12-4.5-2-8-6.5-8-12V6l8-4z M9 12l2 2 4-4" />;
  if (k.includes("eğit") || k.includes("egit"))
    return <path d="M22 10 12 5 2 10l10 5 10-5Z M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />;
  // varsayılan: megafon
  return <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1z M14 8a5 5 0 0 1 0 8 M17 5a9 9 0 0 1 0 14" />;
}

function Kapak({ d, buyuk = false }: { d: Duyuru; buyuk?: boolean }) {
  const harici = d.gorsel ? /^https?:\/\//.test(d.gorsel) : false;
  return (
    <div className={`dvn-haber-kapak${buyuk ? " buyuk" : ""}`}>
      {d.gorsel ? (
        <Image
          src={d.gorsel}
          alt={d.gorselAlt || d.baslik}
          fill
          sizes={buyuk ? "(max-width: 900px) 100vw, 700px" : "(max-width: 900px) 100vw, 320px"}
          className="dvn-haber-img"
          unoptimized={harici}
        />
      ) : (
        <>
          <div className="dvn-grid-desen" aria-hidden />
          <svg className="dvn-haber-watermark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {kategoriIkon(d.kategori)}
          </svg>
        </>
      )}
      <span className="dvn-haber-rozet">{d.kategori}</span>
    </div>
  );
}

export default async function Duyurular() {
  const sonDuyurular = (await duyurulariGetir()).slice(0, 3);
  if (sonDuyurular.length === 0) return null;

  const oneCikan = sonDuyurular[0];
  const digerleri = sonDuyurular.slice(1);

  return (
    <section className="dvn-haber-bolum">
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Başlık satırı */}
        <div className="dvn-haber-baslik-satir">
          <div>
            <p className="dvn-bolum-etiket">DUYURULAR</p>
            <h2 className="dvn-gradyan-metin--koyu" style={{ fontSize: 28, fontWeight: 600, margin: 0, lineHeight: 1.3, display: "inline-block" }}>
              Güncel haberler ve gelişmeler
            </h2>
          </div>

          <Link href="/duyurular" className="dvn-haber-tumu">
            Tümünü gör
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Öne çıkan + liste */}
        <div className="dvn-haber-grid">
          {/* Öne çıkan */}
          <Link href={`/duyurular/${oneCikan.slug}`} className="dvn-haber-one">
            <Kapak d={oneCikan} buyuk />
            <div className="dvn-haber-one-govde">
              <span className="dvn-haber-tarih">{tarihiBicimle(oneCikan.tarih)}</span>
              <h3>{oneCikan.baslik}</h3>
              <p>{oneCikan.ozet}</p>
              <span className="dvn-haber-oku">
                Devamını oku
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Yan liste */}
          <div className="dvn-haber-liste">
            {digerleri.map((d) => (
              <Link key={d.slug} href={`/duyurular/${d.slug}`} className="dvn-haber-kart">
                <Kapak d={d} />
                <div className="dvn-haber-kart-govde">
                  <span className="dvn-haber-tarih">{tarihiBicimle(d.tarih)}</span>
                  <h4>{d.baslik}</h4>
                  <span className="dvn-haber-oku">
                    Devamını oku
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dvn-haber-bolum {
          background: linear-gradient(180deg, var(--dvn-gri-50) 0%, #fff 100%);
          padding: 64px 32px;
        }
        .dvn-haber-baslik-satir {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 34px;
        }
        .dvn-haber-tumu {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--dvn-turuncu);
        }
        .dvn-haber-tumu svg { transition: transform 0.25s ease; }
        .dvn-haber-tumu:hover svg { transform: translateX(4px); }

        .dvn-haber-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 22px;
          align-items: start;
        }

        /* Ortak kapak */
        .dvn-haber-kapak {
          position: relative;
          overflow: hidden;
          background: var(--dvn-gradient-lacivert);
          color: #fff;
        }
        .dvn-haber-kapak .dvn-grid-desen { opacity: 0.55; }
        .dvn-haber-watermark {
          position: absolute;
          right: -10px;
          bottom: -14px;
          width: 120px;
          height: 120px;
          color: rgba(255,255,255,0.16);
        }
        .dvn-haber-img { object-fit: cover; object-position: center; transition: transform 0.5s ease; }
        .dvn-haber-rozet {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #fff;
          background: var(--dvn-gradient-turuncu);
          padding: 5px 12px;
          border-radius: 999px;
          box-shadow: 0 6px 16px rgba(245,130,32,0.4);
        }

        /* Öne çıkan kart */
        .dvn-haber-one {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--dvn-gri-300);
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: var(--dvn-shadow-md);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .dvn-haber-one .dvn-haber-kapak.buyuk { aspect-ratio: 16 / 9; width: 100%; }
        .dvn-haber-one-govde { padding: 26px 28px 30px; }
        .dvn-haber-one-govde h3 {
          color: var(--dvn-lacivert);
          font-size: 22px;
          font-weight: 600;
          line-height: 1.3;
          margin: 8px 0 10px;
        }
        .dvn-haber-one-govde p {
          color: var(--dvn-gri-500);
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 16px;
        }

        /* Yan liste */
        .dvn-haber-liste { display: flex; flex-direction: column; gap: 22px; }
        .dvn-haber-kart {
          position: relative;
          display: grid;
          grid-template-columns: 132px 1fr;
          background: #fff;
          border: 1px solid var(--dvn-gri-300);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: var(--dvn-shadow-sm);
          flex: 1;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .dvn-haber-kart .dvn-haber-kapak { height: 100%; min-height: 130px; }
        .dvn-haber-kart .dvn-haber-watermark { width: 78px; height: 78px; }
        .dvn-haber-kart-govde {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
        }
        .dvn-haber-kart-govde h4 {
          color: var(--dvn-lacivert);
          font-size: 15px;
          font-weight: 600;
          line-height: 1.4;
          margin: 0;
        }

        /* Ortak metin öğeleri */
        .dvn-haber-tarih { font-size: 12px; color: var(--dvn-gri-500); font-weight: 500; }
        .dvn-haber-oku {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 600;
          color: var(--dvn-turuncu);
        }
        .dvn-haber-oku svg { transition: transform 0.25s ease; }

        /* Hover */
        .dvn-haber-one:hover, .dvn-haber-kart:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(2,35,152,0.15);
          border-color: rgba(212,169,63,0.45);
        }
        .dvn-haber-one:hover .dvn-haber-img,
        .dvn-haber-kart:hover .dvn-haber-img { transform: scale(1.06); }
        .dvn-haber-one:hover .dvn-haber-oku svg,
        .dvn-haber-kart:hover .dvn-haber-oku svg { transform: translateX(4px); }

        @media (max-width: 900px) {
          .dvn-haber-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .dvn-haber-kart { grid-template-columns: 100px 1fr; }
        }
      `}</style>
    </section>
  );
}
