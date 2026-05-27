/**
 * Özel sayfa şablonları — admin panelinde yeni sayfa oluşturulurken hangi
 * alanların görüneceği ve public tarafta nasıl render edileceği.
 *
 * Her şablon:
 *  - id: DB'de tutulan kısa kimlik
 *  - ad: kullanıcıya gösterilen ad
 *  - aciklama: şablon seçicide görünen kısa anlatım
 *  - alanlar: admin formunda istenecek alanlar
 *
 * Çoklu kayıt tutan alanlar (FAQ soruları, kartlar) tek bir textarea'da
 * '## Başlık\nMetin\n\n## ...' formatında saklanır; bu pattern Faz 3'te de
 * kullanıldı.
 */

import type { ReactNode } from "react";

export type AlanTipi = "input" | "textarea" | "textarea-uzun";
export type SablonAlan = {
  anahtar: string;
  etiket: string;
  tip: AlanTipi;
  yardim?: string;
  zorunlu?: boolean;
};

export type SablonTanim = {
  id: string;
  ad: string;
  aciklama: string;
  /** Şablonu temsil eden basit emoji/ikon (UI'da görsel ipucu). */
  ikon: string;
  alanlar: SablonAlan[];
};

export const SABLONLAR: SablonTanim[] = [
  {
    id: "metin",
    ad: "Tek Metin Sayfası",
    aciklama: "Başlık + zengin paragraflı içerik. Hakkında, açıklayıcı yazılar için.",
    ikon: "📄",
    alanlar: [
      {
        anahtar: "icerik",
        etiket: "İçerik",
        tip: "textarea-uzun",
        zorunlu: true,
        yardim: "Paragraflar boş satırla ayrılır. URL'ler otomatik link olur; [metin](url) biçimi de desteklenir.",
      },
    ],
  },
  {
    id: "bolumler",
    ad: "Bölümlü Sayfa",
    aciklama: "Birden fazla başlıklı bölümden oluşan sayfa.",
    ikon: "📑",
    alanlar: [
      {
        anahtar: "bolumler",
        etiket: "Bölümler",
        tip: "textarea-uzun",
        zorunlu: true,
        yardim: "Her bölüm için '## Bölüm Başlığı' satırı, ardından paragrafları. Bölümleri boş satırla ayırın.",
      },
    ],
  },
  {
    id: "kart-listesi",
    ad: "Açıklamalı Kart Listesi",
    aciklama: "Başlık + açıklamadan oluşan kartların 2-3'lü ızgarası.",
    ikon: "🗂️",
    alanlar: [
      { anahtar: "giris", etiket: "Giriş paragrafı (opsiyonel)", tip: "textarea" },
      {
        anahtar: "kartlar",
        etiket: "Kartlar",
        tip: "textarea-uzun",
        zorunlu: true,
        yardim: "Her kart için '## Başlık' satırı, ardından açıklama. Kartları boş satırla ayırın.",
      },
    ],
  },
  {
    id: "faq",
    ad: "Soru / Cevap (FAQ)",
    aciklama: "Tıklanınca açılan soru-cevap akordeon listesi.",
    ikon: "❓",
    alanlar: [
      { anahtar: "giris", etiket: "Giriş paragrafı (opsiyonel)", tip: "textarea" },
      {
        anahtar: "sorular",
        etiket: "Sorular",
        tip: "textarea-uzun",
        zorunlu: true,
        yardim: "Her soru için '## Soru?' satırı, ardından cevap. Soruları boş satırla ayırın.",
      },
    ],
  },
  {
    id: "adimlar",
    ad: "Süreç / Adımlar",
    aciklama: "Numaralı adımlar dizisi. Belgelendirme süreci vb. için.",
    ikon: "🔢",
    alanlar: [
      { anahtar: "giris", etiket: "Giriş paragrafı (opsiyonel)", tip: "textarea" },
      {
        anahtar: "adimlar",
        etiket: "Adımlar (sıralı)",
        tip: "textarea-uzun",
        zorunlu: true,
        yardim: "Her adım için '## Adım Başlığı' satırı, ardından açıklama. Adımları boş satırla ayırın. Numaralar otomatik atanır.",
      },
    ],
  },
  {
    id: "baglanti-kartlari",
    ad: "Bağlantı Kartları",
    aciklama: "Başlık + açıklama + bağlantı; iç veya dış URL'lere yönlendiren tıklanabilir kartlar.",
    ikon: "🔗",
    alanlar: [
      { anahtar: "giris", etiket: "Giriş paragrafı (opsiyonel)", tip: "textarea" },
      {
        anahtar: "kartlar",
        etiket: "Bağlantı kartları",
        tip: "textarea-uzun",
        zorunlu: true,
        yardim: "Her kart için 3 satır: 1) '## Başlık', 2) Açıklama, 3) '→ https://url' (veya '→ /sayfa-yolu').",
      },
    ],
  },
  {
    id: "dokuman-listesi",
    ad: "Doküman / İndirme Listesi",
    aciklama: "PDF, DOCX vb. dosyalar için indirme bağlantılı kart listesi (URL ile).",
    ikon: "📥",
    alanlar: [
      { anahtar: "giris", etiket: "Giriş paragrafı (opsiyonel)", tip: "textarea" },
      {
        anahtar: "dokumanlar",
        etiket: "Doküman listesi",
        tip: "textarea-uzun",
        zorunlu: true,
        yardim: "Her doküman için 3 satır: 1) '## Başlık', 2) Kısa açıklama, 3) '→ /dosya-yolu.pdf' (URL veya yol).",
      },
    ],
  },
  {
    id: "cta",
    ad: "Çağrı Sayfası (CTA)",
    aciklama: "Başlık + büyük açıklama + 1-2 buton. Tek hedefli açılış sayfaları için.",
    ikon: "🎯",
    alanlar: [
      { anahtar: "vurgu", etiket: "Üst vurgu satırı (opsiyonel)", tip: "input" },
      { anahtar: "aciklama", etiket: "Büyük açıklama metni", tip: "textarea", zorunlu: true },
      { anahtar: "buton1-metin", etiket: "Birincil buton — metin", tip: "input" },
      { anahtar: "buton1-url", etiket: "Birincil buton — URL", tip: "input" },
      { anahtar: "buton2-metin", etiket: "İkincil buton — metin (opsiyonel)", tip: "input" },
      { anahtar: "buton2-url", etiket: "İkincil buton — URL (opsiyonel)", tip: "input" },
    ],
  },
];

export function sablonBul(id: string): SablonTanim | undefined {
  return SABLONLAR.find((s) => s.id === id);
}

// ---------------- Public render bileşenleri ----------------

import IcerikMetin, { metniBaglantiyaCevir } from "../app/components/IcerikMetin";

type RenderProps = {
  baslik: string;
  veri: Record<string, string>;
};

/** Verilen şablon kimliğine göre sayfanın gövdesini render eder. */
export function SablonGovde({ sablon, veri, baslik }: RenderProps & { sablon: string }): ReactNode {
  switch (sablon) {
    case "metin":
      return <MetinGovde veri={veri} baslik={baslik} />;
    case "bolumler":
      return <BolumlerGovde veri={veri} baslik={baslik} />;
    case "kart-listesi":
      return <KartListesiGovde veri={veri} baslik={baslik} />;
    case "faq":
      return <FaqGovde veri={veri} baslik={baslik} />;
    case "adimlar":
      return <AdimlarGovde veri={veri} baslik={baslik} />;
    case "baglanti-kartlari":
      return <BaglantiKartlariGovde veri={veri} baslik={baslik} />;
    case "dokuman-listesi":
      return <DokumanListesiGovde veri={veri} baslik={baslik} />;
    case "cta":
      return <CtaGovde veri={veri} baslik={baslik} />;
    default:
      return <MetinGovde veri={veri} baslik={baslik} />;
  }
}

// ---------- Yardımcı parser'lar (Faz 3'tekilerle aynı pattern) ----------

type Kart = { baslik: string; metin: string };

function kartlariCozumle(metin: string): Kart[] {
  if (!metin?.trim()) return [];
  return metin
    .split(/\n\s*\n/)
    .filter((b) => b.trim())
    .map((b) => {
      const satirlar = b.split("\n");
      const baslik = (satirlar[0] ?? "").replace(/^##\s*/, "").trim();
      const govde = satirlar.slice(1).join("\n").trim();
      return { baslik, metin: govde };
    });
}

type BaglantiliKart = { baslik: string; metin: string; url: string };
function baglantilariCozumle(metin: string): BaglantiliKart[] {
  if (!metin?.trim()) return [];
  return metin
    .split(/\n\s*\n/)
    .filter((b) => b.trim())
    .map((b) => {
      const satirlar = b.split("\n").map((s) => s.trim()).filter(Boolean);
      const baslik = (satirlar[0] ?? "").replace(/^##\s*/, "").trim();
      const urlSatiri = satirlar.find((s) => s.startsWith("→") || s.startsWith("->"));
      const url = urlSatiri ? urlSatiri.replace(/^(→|->)\s*/, "").trim() : "";
      const metinKismi = satirlar
        .slice(1)
        .filter((s) => !s.startsWith("→") && !s.startsWith("->"))
        .join("\n")
        .trim();
      return { baslik, metin: metinKismi, url };
    })
    .filter((k) => k.baslik);
}

// ---------- Şablon render bileşenleri ----------

function Bolum({ children, koyu = false }: { children: ReactNode; koyu?: boolean }) {
  return (
    <section style={{ background: koyu ? "var(--dvn-gri-50)" : "white", padding: "60px 32px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function GirisParagraf({ metin }: { metin?: string }) {
  if (!metin?.trim()) return null;
  return <IcerikMetin metin={metin} paragrafStil={{ fontSize: 15.5, margin: "0 0 24px" }} />;
}

function MetinGovde({ veri }: RenderProps) {
  return (
    <Bolum>
      <IcerikMetin metin={veri.icerik ?? ""} />
    </Bolum>
  );
}

function BolumlerGovde({ veri }: RenderProps) {
  const bolumler = kartlariCozumle(veri.bolumler ?? "");
  return (
    <Bolum>
      {bolumler.map((b, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 600, margin: "0 0 14px", lineHeight: 1.35 }}>
            {b.baslik}
          </h2>
          <IcerikMetin metin={b.metin} />
        </div>
      ))}
    </Bolum>
  );
}

function KartListesiGovde({ veri }: RenderProps) {
  const kartlar = kartlariCozumle(veri.kartlar ?? "");
  return (
    <Bolum>
      <GirisParagraf metin={veri.giris} />
      <div
        className="dvn-ozel-kart-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}
      >
        {kartlar.map((k, i) => (
          <div
            key={i}
            style={{
              background: "var(--dvn-gri-50)",
              border: "0.5px solid var(--dvn-gri-300)",
              borderRadius: 14,
              padding: "24px 22px",
            }}
          >
            <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.35 }}>
              {k.baslik}
            </h3>
            <p style={{ fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.7, margin: 0 }}>
              {metniBaglantiyaCevir(k.metin)}
            </p>
          </div>
        ))}
      </div>
    </Bolum>
  );
}

function FaqGovde({ veri }: RenderProps) {
  const sorular = kartlariCozumle(veri.sorular ?? "");
  return (
    <Bolum>
      <GirisParagraf metin={veri.giris} />
      <div style={{ display: "grid", gap: 14 }}>
        {sorular.map((s, i) => (
          <details
            key={i}
            className="dvn-ozel-faq"
            style={{ background: "var(--dvn-gri-50)", borderRadius: 12, border: "0.5px solid var(--dvn-gri-300)", overflow: "hidden" }}
          >
            <summary
              className="dvn-ozel-faq-baslik"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "20px 22px",
                cursor: "pointer",
                fontSize: 15.5,
                fontWeight: 500,
                color: "var(--dvn-lacivert)",
                listStyle: "none",
              }}
            >
              {s.baslik}
              <svg className="dvn-ozel-faq-ok" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M6 9l6 6 6-6" stroke="var(--dvn-turuncu)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div style={{ padding: "0 22px 22px" }}>
              <p style={{ fontSize: 14, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>
                {metniBaglantiyaCevir(s.metin)}
              </p>
            </div>
          </details>
        ))}
      </div>
      <style>{`
        .dvn-ozel-faq-baslik::-webkit-details-marker { display: none; }
        .dvn-ozel-faq[open] .dvn-ozel-faq-ok { transform: rotate(180deg); }
        .dvn-ozel-faq-ok { transition: transform 0.22s ease; }
        .dvn-ozel-faq[open] { border-color: var(--dvn-altin) !important; }
      `}</style>
    </Bolum>
  );
}

function AdimlarGovde({ veri }: RenderProps) {
  const adimlar = kartlariCozumle(veri.adimlar ?? "");
  return (
    <Bolum>
      <GirisParagraf metin={veri.giris} />
      <div style={{ display: "grid", gap: 16 }}>
        {adimlar.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 18,
              background: "white",
              border: "0.5px solid var(--dvn-gri-300)",
              borderRadius: 14,
              padding: "22px 22px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--dvn-gradient-turuncu)",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 600,
                boxShadow: "0 6px 16px rgba(245,130,32,0.3)",
              }}
            >
              {i + 1}
            </span>
            <div>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.35 }}>
                {a.baslik}
              </h3>
              <p style={{ fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.7, margin: 0 }}>
                {metniBaglantiyaCevir(a.metin)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Bolum>
  );
}

function BaglantiKartlariGovde({ veri }: RenderProps) {
  const kartlar = baglantilariCozumle(veri.kartlar ?? "");
  return (
    <Bolum>
      <GirisParagraf metin={veri.giris} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
        {kartlar.map((k, i) => {
          const dis = /^https?:\/\//.test(k.url);
          return (
            <a
              key={i}
              href={k.url}
              {...(dis ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                background: "white",
                border: "0.5px solid var(--dvn-gri-300)",
                borderRadius: 14,
                padding: "22px 22px",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: "0 4px 16px rgba(2,35,152,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              className="dvn-baglanti-kart"
            >
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.35 }}>{k.baslik}</h3>
              {k.metin && (
                <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.65, margin: 0 }}>{k.metin}</p>
              )}
              <span style={{ marginTop: 4, fontSize: 13, color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                {dis ? "Sayfaya git" : "Daha fazla"} →
              </span>
            </a>
          );
        })}
      </div>
      <style>{`
        .dvn-baglanti-kart:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(2,35,152,0.12) !important; }
      `}</style>
    </Bolum>
  );
}

function DokumanListesiGovde({ veri }: RenderProps) {
  const dokumanlar = baglantilariCozumle(veri.dokumanlar ?? "");
  return (
    <Bolum>
      <GirisParagraf metin={veri.giris} />
      <div style={{ display: "grid", gap: 10 }}>
        {dokumanlar.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "var(--dvn-gri-50)",
              border: "0.5px solid var(--dvn-gri-300)",
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#fdecea",
                color: "#d93025",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.3,
              }}
            >
              PDF
            </span>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14.5, fontWeight: 500, color: "var(--dvn-lacivert)", margin: 0, lineHeight: 1.4 }}>{d.baslik}</p>
              {d.metin && (
                <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "2px 0 0", lineHeight: 1.5 }}>{d.metin}</p>
              )}
            </div>
            {d.url && (
              <a
                href={d.url}
                target={/^https?:\/\//.test(d.url) ? "_blank" : undefined}
                rel={/^https?:\/\//.test(d.url) ? "noopener noreferrer" : undefined}
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--dvn-gradient-turuncu)",
                  color: "white",
                  padding: "9px 16px",
                  borderRadius: "var(--dvn-radius-md)",
                  fontWeight: 500,
                  fontSize: 12.5,
                  textDecoration: "none",
                }}
              >
                İndir →
              </a>
            )}
          </div>
        ))}
      </div>
    </Bolum>
  );
}

function CtaGovde({ veri }: RenderProps) {
  const b1Metin = veri["buton1-metin"];
  const b1Url = veri["buton1-url"];
  const b2Metin = veri["buton2-metin"];
  const b2Url = veri["buton2-url"];
  return (
    <Bolum koyu>
      <div
        style={{
          background: "var(--dvn-gradient-lacivert)",
          borderRadius: 18,
          padding: "50px 40px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 12px 40px rgba(2,35,152,0.2)",
        }}
      >
        {veri.vurgu && (
          <p style={{ fontSize: 11, color: "var(--dvn-altin-acik)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 14px" }}>
            {veri.vurgu}
          </p>
        )}
        <p style={{ fontSize: 16.5, color: "#cbd5e1", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          {veri.aciklama}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          {b1Metin && b1Url && (
            <a
              href={b1Url}
              {...(/^https?:\/\//.test(b1Url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                background: "var(--dvn-gradient-turuncu)",
                color: "white",
                padding: "13px 30px",
                borderRadius: "var(--dvn-radius-md)",
                fontWeight: 500,
                fontSize: 14.5,
                boxShadow: "0 8px 20px rgba(245,130,32,0.3)",
                textDecoration: "none",
              }}
            >
              {b1Metin} →
            </a>
          )}
          {b2Metin && b2Url && (
            <a
              href={b2Url}
              {...(/^https?:\/\//.test(b2Url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "13px 30px",
                borderRadius: "var(--dvn-radius-md)",
                fontWeight: 500,
                fontSize: 14.5,
                textDecoration: "none",
              }}
            >
              {b2Metin}
            </a>
          )}
        </div>
      </div>
    </Bolum>
  );
}
