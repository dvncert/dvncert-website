import type { CSSProperties, ReactNode } from "react";
import { googleYapilandirildiMi } from "@/lib/google/client";
import { gaOzetGetir } from "@/lib/google/analytics";
import { gscOzetGetir, type GscSatir } from "@/lib/google/search-console";
import { adminKart, btnBirincil, btnIkincil } from "./_ui";

const sayi = (n: number) => Math.round(n).toLocaleString("tr-TR");
const yuzde = (oran: number) => `%${(oran * 100).toFixed(1)}`;
function sureBicim(sn: number): string {
  const dk = Math.floor(sn / 60);
  const kalan = Math.round(sn % 60);
  return dk > 0 ? `${dk}dk ${kalan}sn` : `${kalan}sn`;
}

// GA4 mülk numarası ortam değişkeninden gelir; yoksa GA4 ana ekranına götür.
const GA4_URL = process.env.GA4_PROPERTY_ID
  ? `https://analytics.google.com/analytics/web/#/p${process.env.GA4_PROPERTY_ID}/reports/intelligenthome`
  : "https://analytics.google.com/";
const GSC_URL = `https://search.google.com/search-console?resource_id=${encodeURIComponent(
  process.env.GSC_SITE_URL ?? "sc-domain:dvncert.com",
)}`;

function BolumBaslik({ baslik, aciklama }: { baslik: string; aciklama?: string }) {
  return (
    <div style={{ margin: "32px 0 14px" }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--dvn-lacivert)", margin: 0 }}>{baslik}</h2>
      {aciklama && <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "4px 0 0" }}>{aciklama}</p>}
    </div>
  );
}

function Stat({ ad, deger, alt }: { ad: string; deger: string; alt?: string }) {
  return (
    <div style={adminKart}>
      <div style={{ fontSize: 26, fontWeight: 700, color: "var(--dvn-lacivert)", lineHeight: 1.1 }}>{deger}</div>
      <div style={{ fontSize: 13, color: "var(--dvn-gri-500)", marginTop: 5 }}>{ad}</div>
      {alt && <div style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", opacity: 0.75, marginTop: 2 }}>{alt}</div>}
    </div>
  );
}

const statIzgara: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
  gap: 14,
};

/** GA4 ve Search Console'a yönlendiren hızlı erişim kartı. */
function HarciPanelKart({ aciklama }: { aciklama: string }) {
  const baglantiOrtak: CSSProperties = { textDecoration: "none" };
  return (
    <div style={{ ...adminKart, display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.6, margin: 0 }}>
        {aciklama}
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href={GA4_URL} target="_blank" rel="noopener noreferrer" style={{ ...btnBirincil, ...baglantiOrtak }}>
          Google Analytics&apos;i Aç →
        </a>
        <a href={GSC_URL} target="_blank" rel="noopener noreferrer" style={{ ...btnIkincil, ...baglantiOrtak }}>
          Search Console&apos;u Aç →
        </a>
      </div>
    </div>
  );
}

function ListeTablo({ basliklar, satirlar }: { basliklar: string[]; satirlar: ReactNode[][] }) {
  const td: CSSProperties = { padding: "8px 12px", borderTop: "0.5px solid var(--dvn-gri-300)", verticalAlign: "middle" };
  return (
    <div style={{ ...adminKart, padding: 0, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
            {basliklar.map((b, i) => (
              <th key={i} style={{ padding: "9px 12px", textAlign: i === 0 ? "left" : "right", fontWeight: 600, whiteSpace: "nowrap" }}>
                {b}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {satirlar.map((satir, ri) => (
            <tr key={ri}>
              {satir.map((hucre, ci) => (
                <td key={ci} style={{ ...td, textAlign: ci === 0 ? "left" : "right", color: ci === 0 ? "var(--dvn-lacivert)" : "var(--dvn-gri-700)" }}>
                  {hucre}
                </td>
              ))}
            </tr>
          ))}
          {satirlar.length === 0 && (
            <tr>
              <td style={{ ...td, color: "var(--dvn-gri-500)" }} colSpan={basliklar.length}>
                Veri yok.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ----------------------------- Google Analytics ---------------------------- */

export async function AnalitikBolum() {
  if (!googleYapilandirildiMi()) {
    return (
      <>
        <BolumBaslik
          baslik="Ziyaretçi İstatistikleri · Google Analytics"
          aciklama="Site GA4 etiketiyle veri toplamaya devam ediyor (G-3VJDV7WQBG)."
        />
        <HarciPanelKart aciklama="Ziyaretçi sayısı, sayfa görüntülemeleri ve gerçek zamanlı kullanıcı verisi için doğrudan Google Analytics&apos;i açın. Tüm raporlar, kitle, dönüşüm ve özel segmentler orada." />
      </>
    );
  }
  try {
    const g = await gaOzetGetir();
    return (
      <>
        <BolumBaslik baslik="Ziyaretçi İstatistikleri · Google Analytics" aciklama="Son 28 gün (parantez içinde son 7 gün)." />
        <div style={statIzgara}>
          <Stat ad="Aktif kullanıcı" deger={sayi(g.aktif28)} alt={`son 7 gün: ${sayi(g.aktif7)}`} />
          <Stat ad="Oturum" deger={sayi(g.oturum28)} alt={`son 7 gün: ${sayi(g.oturum7)}`} />
          <Stat ad="Sayfa görüntüleme" deger={sayi(g.goruntuleme28)} alt={`son 7 gün: ${sayi(g.goruntuleme7)}`} />
          <Stat ad="Ort. oturum süresi" deger={sureBicim(g.ortSure28)} alt="son 28 gün" />
        </div>
        <div style={{ marginTop: 16 }}>
          <ListeTablo
            basliklar={["En çok görüntülenen sayfa", "Görüntüleme"]}
            satirlar={g.sayfalar.map((s) => [s.yol, sayi(s.goruntuleme)])}
          />
        </div>
      </>
    );
  } catch {
    return (
      <>
        <BolumBaslik
          baslik="Ziyaretçi İstatistikleri · Google Analytics"
          aciklama="Panel içi veri çekilemedi; verileri doğrudan Google Analytics&apos;te görüntüleyebilirsiniz."
        />
        <HarciPanelKart aciklama="Ziyaretçi sayısı, sayfa görüntülemeleri ve gerçek zamanlı kullanıcı verisi için doğrudan Google Analytics&apos;i açın." />
      </>
    );
  }
}

/* ------------------------------ Search Console ----------------------------- */

export async function AramaBolum() {
  if (!googleYapilandirildiMi()) return null; // Üstteki Google Analytics kartında Search Console butonu zaten var.
  try {
    const s = await gscOzetGetir();
    const satir = (r: GscSatir): ReactNode[] => [r.ad, sayi(r.tiklama), sayi(r.gosterim), yuzde(r.ctr), r.sira.toFixed(1)];
    return (
      <>
        <BolumBaslik
          baslik="Arama Performansı · Google Search Console"
          aciklama={`Google aramalarından gelen trafik (${s.baslangic} – ${s.bitis}).`}
        />
        <div style={statIzgara}>
          <Stat ad="Tıklama" deger={sayi(s.tiklama)} />
          <Stat ad="Gösterim" deger={sayi(s.gosterim)} />
          <Stat ad="Ort. TO (CTR)" deger={yuzde(s.ctr)} />
          <Stat ad="Ort. sıralama" deger={s.sira.toFixed(1)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginTop: 16 }}>
          <ListeTablo
            basliklar={["Arama sorgusu", "Tıkl.", "Gös.", "TO", "Sıra"]}
            satirlar={s.sorgular.map(satir)}
          />
          <ListeTablo
            basliklar={["Sayfa", "Tıkl.", "Gös.", "TO", "Sıra"]}
            satirlar={s.sayfalar.map(satir)}
          />
        </div>
      </>
    );
  } catch {
    return null; // GA bölümündeki kart Search Console butonunu zaten içeriyor.
  }
}
