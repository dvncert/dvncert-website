import Image from "next/image";
import { referanslar } from "@/lib/referanslar";

/**
 * Ana sayfa "Referanslarımız" logo şeridi.
 * Veri lib/referanslar.ts'ten gelir. Liste boşken bölüm RENDER EDİLMEZ
 * (sahte logo yok). Logolar gri tonda gösterilir, hover'da renklenir.
 */
export default function Referanslar() {
  if (referanslar.length === 0) return null;

  const hucreStili = {
    background: "white",
    border: "0.5px solid var(--dvn-gri-300)",
    borderRadius: 12,
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as const;

  return (
    <section style={{ background: "var(--dvn-gri-50)", padding: "56px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="dvn-bolum-etiket">REFERANSLARIMIZ</span>
          <h2 className="dvn-bolum-baslik" style={{ fontSize: 25 }}>
            Bize güvenen kurumlar
          </h2>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
          {referanslar.map((r, i) => {
            const icerik = (
              <div style={{ position: "relative", width: 150, height: 60 }}>
                <Image
                  src={r.logo}
                  alt={r.ad}
                  fill
                  sizes="150px"
                  style={{ objectFit: "contain" }}
                  className="dvn-referans-logo"
                />
              </div>
            );

            return r.url ? (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.ad} style={hucreStili}>
                {icerik}
              </a>
            ) : (
              <div key={i} style={hucreStili}>
                {icerik}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .dvn-referans-logo { filter: grayscale(1); opacity: 0.7; transition: filter 0.25s ease, opacity 0.25s ease; }
        a:hover .dvn-referans-logo, .dvn-referans-logo:hover { filter: grayscale(0); opacity: 1; }
      `}</style>
    </section>
  );
}
