import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { bloglariGetir } from "@/lib/icerik";
import { blogSSSGetir } from "@/lib/blog-sss";
import { hizmetGetir } from "@/lib/hizmetler";
import { googleYapilandirildiMi } from "@/lib/google/client";
import { gscKonuGetir } from "@/lib/google/search-console";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { adminKart } from "./_ui";

/**
 * Panel "SEO Durumu" kartı — Google kimlik bilgisi gerektirmeyen kontroller
 * (teknik ayarlar, içerik sağlığı, tedarikçi içerik kümesi) her zaman çalışır;
 * Search Console bağlıysa tedarikçi/ikinci taraf aramalarındaki sıralama da
 * gösterilir.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-3VJDV7WQBG";
/** Odak konu: tedarikçi (ikinci taraf) denetimi aramaları. */
const ODAK_DESEN = "tedarik|taraf denetim|2\\. taraf|fason|alt yüklenici|supplier|vda|ppap";

type Durum = "iyi" | "uyari" | "kotu";
const RENK: Record<Durum, string> = { iyi: "#15803d", uyari: "#b45309", kotu: "#b91c1c" };
const ISARET: Record<Durum, string> = { iyi: "✓", uyari: "!", kotu: "✕" };

type Kontrol = { ad: string; durum: Durum; detay: ReactNode };

const oran = (pay: number, payda: number) => (payda ? pay / payda : 0);
const yuzde = (o: number) => `%${Math.round(o * 100)}`;
const esik = (o: number, iyi: number, orta: number): Durum => (o >= iyi ? "iyi" : o >= orta ? "uyari" : "kotu");

function gunFarki(tarih: string): number {
  return Math.floor((Date.now() - new Date(tarih + "T00:00:00Z").getTime()) / 86400000);
}

function KontrolSatiri({ k }: { k: Kontrol }) {
  return (
    <li style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderTop: "0.5px solid var(--dvn-gri-300)" }}>
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: RENK[k.durum],
          color: "white",
          fontSize: 12,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {ISARET[k.durum]}
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--dvn-lacivert)" }}>{k.ad}</span>
        <span style={{ display: "block", fontSize: 12.5, color: "var(--dvn-gri-500)", marginTop: 2, lineHeight: 1.5 }}>{k.detay}</span>
      </span>
    </li>
  );
}

function Grup({ baslik, kontroller }: { baslik: string; kontroller: Kontrol[] }) {
  return (
    <div style={adminKart}>
      <h3 style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.1, color: "var(--dvn-turuncu)", margin: "0 0 4px" }}>{baslik}</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {kontroller.map((k) => (
          <KontrolSatiri key={k.ad} k={k} />
        ))}
      </ul>
    </div>
  );
}

const td: CSSProperties = { padding: "8px 12px", borderTop: "0.5px solid var(--dvn-gri-300)", fontSize: 13 };

export async function SeoBolum() {
  const [yazilar, siteHaritasi] = await Promise.all([bloglariGetir(), sitemap()]);
  const kurallar = robots().rules;
  const kuralListesi = Array.isArray(kurallar) ? kurallar : [kurallar];
  const tumKapali = kuralListesi.flatMap((r) => (Array.isArray(r.disallow) ? r.disallow : r.disallow ? [r.disallow] : []));
  const yzAjanlari = kuralListesi.flatMap((r) => (Array.isArray(r.userAgent) ? r.userAgent : r.userAgent ? [r.userAgent] : []));

  // ---- İçerik ölçümleri ----
  const n = yazilar.length;
  const sssli = yazilar.filter((b) => blogSSSGetir(b.slug).length > 0);
  const aciklamaIyi = yazilar.filter((b) => b.ozet.length >= 110 && b.ozet.length <= 170);
  const baslikIyi = yazilar.filter((b) => b.baslik.length <= 70);
  const gorselli = yazilar.filter((b) => b.gorsel);
  const enYeni = yazilar.map((b) => b.tarih).sort().at(-1);
  const son30 = yazilar.filter((b) => gunFarki(b.tarih) <= 30).length;
  const tedarikci = yazilar.filter((b) => b.ilgiliHizmetler?.includes("tedarikci-denetimi"));
  const tedarikciSssli = tedarikci.filter((b) => blogSSSGetir(b.slug).length > 0);

  const teknik: Kontrol[] = [
    { ad: "Google Analytics etiketi", durum: "iyi", detay: `${GA_ID} tüm sayfalarda yüklü; ölçüm çerez onayıyla (Consent Mode) çalışıyor.` },
    {
      ad: "Search Console ve Analytics panel bağlantısı",
      durum: googleYapilandirildiMi() ? "iyi" : "uyari",
      detay: googleYapilandirildiMi()
        ? "Bağlı — ziyaretçi ve arama verileri aşağıda."
        : "Bağlı değil. Vercel'e GOOGLE_SERVICE_ACCOUNT_JSON, GA4_PROPERTY_ID ve GSC_SITE_URL eklenince arama sıralamaları bu kartta görünür (docs/google-analytics-kurulum.md).",
    },
    { ad: "Site haritası (sitemap.xml)", durum: siteHaritasi.length > 0 ? "iyi" : "kotu", detay: `${siteHaritasi.length} adres listeleniyor.` },
    {
      ad: "robots.txt",
      durum: tumKapali.some((y) => y.startsWith("/_next")) ? "kotu" : "iyi",
      detay: tumKapali.some((y) => y.startsWith("/_next"))
        ? "/_next/ engelli — Google sayfa stillerini ve betiklerini okuyamaz."
        : `Yönetim alanı kapalı; ${yzAjanlari.filter((a) => a !== "*").length} yapay zekâ arama tarayıcısına (Google-Extended, ChatGPT, Perplexity, Claude…) açık.`,
    },
    { ad: "llms.txt", durum: "iyi", detay: "Yapay zekâ asistanları için tedarikçi denetimi odaklı site özeti yayında (/llms.txt)." },
    { ad: "Yapısal veri", durum: "iyi", detay: "Organization, Service (eş anlamlı adlarla), BlogPosting, FAQPage ve BreadcrumbList işaretlemeleri aktif." },
  ];

  const icerik: Kontrol[] = [
    {
      ad: "İçerik tazeliği",
      durum: son30 >= 2 ? "iyi" : son30 >= 1 ? "uyari" : "kotu",
      detay: `Son 30 günde ${son30} yeni yazı · en yeni: ${enYeni ?? "—"} · toplam ${n} yazı.`,
    },
    {
      ad: "SSS (FAQPage) içeren yazılar",
      durum: esik(oran(sssli.length, n), 0.6, 0.3),
      detay: `${sssli.length}/${n} yazı (${yuzde(oran(sssli.length, n))}). Soru-cevap blokları yapay zekâ yanıtlarında alıntılanma şansını artırır.`,
    },
    {
      ad: "Meta açıklama uzunluğu (110–170 karakter)",
      durum: esik(oran(aciklamaIyi.length, n), 0.85, 0.6),
      detay: `${aciklamaIyi.length}/${n} yazı uygun aralıkta.`,
    },
    {
      ad: "Başlık uzunluğu (≤ 70 karakter)",
      durum: esik(oran(baslikIyi.length, n), 0.8, 0.5),
      detay: `${baslikIyi.length}/${n} yazı. Uzun başlıklar arama sonucunda kesilir; anlam ilk 60 karakterde verilmeli.`,
    },
    {
      ad: "Kapak görseli",
      durum: esik(oran(gorselli.length, n), 0.8, 0.4),
      detay: `${gorselli.length}/${n} yazıda kapak görseli var. Görselsiz yazılar paylaşımda ve Google Discover'da zayıf kalır.`,
    },
  ];

  const odak: Kontrol[] = [
    {
      ad: "Tedarikçi / ikinci taraf denetimi yazıları",
      durum: tedarikci.length >= 12 ? "iyi" : tedarikci.length >= 6 ? "uyari" : "kotu",
      detay: `${tedarikci.length} yazı bu kümede; ${tedarikciSssli.length} tanesinde SSS bloğu var.`,
    },
    {
      ad: "Hizmet sayfası",
      durum: "iyi",
      detay: (
        <>
          <Link href="/hizmetler/tedarikci-denetimi" target="_blank" style={{ color: "var(--dvn-turuncu)" }}>
            /hizmetler/tedarikci-denetimi
          </Link>{" "}
          — &quot;ikinci taraf denetim&quot; tanımı ve {hizmetGetir("tedarikci-denetimi")?.sss?.length ?? 0} SSS.
        </>
      ),
    },
  ];

  // Düzeltilecek yazılar: en çok sorunu olandan başlayarak
  const sorunlar = yazilar
    .map((b) => {
      const s: string[] = [];
      if (b.baslik.length > 70) s.push(`başlık ${b.baslik.length} karakter`);
      if (b.ozet.length < 110) s.push(`açıklama kısa (${b.ozet.length})`);
      if (b.ozet.length > 170) s.push(`açıklama uzun (${b.ozet.length})`);
      if (!blogSSSGetir(b.slug).length) s.push("SSS yok");
      if (!b.gorsel) s.push("kapak görseli yok");
      return { b, s };
    })
    .filter((x) => x.s.length > 0)
    .sort((a, b) => b.s.length - a.s.length)
    .slice(0, 8);

  const tumu = [...teknik, ...icerik, ...odak];
  const puan = Math.round((tumu.reduce((t, k) => t + (k.durum === "iyi" ? 1 : k.durum === "uyari" ? 0.5 : 0), 0) / tumu.length) * 100);
  const puanRenk = puan >= 80 ? RENK.iyi : puan >= 60 ? RENK.uyari : RENK.kotu;

  let aramalar: Awaited<ReturnType<typeof gscKonuGetir>> | null = null;
  if (googleYapilandirildiMi()) {
    try {
      aramalar = await gscKonuGetir(ODAK_DESEN);
    } catch {
      aramalar = null;
    }
  }

  return (
    <section style={{ marginTop: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", margin: "0 0 14px" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: `5px solid ${puanRenk}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19,
            fontWeight: 700,
            color: puanRenk,
            flexShrink: 0,
          }}
        >
          {puan}
        </div>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--dvn-lacivert)", margin: 0 }}>SEO Durumu</h2>
          <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "4px 0 0" }}>
            {tumu.filter((k) => k.durum === "iyi").length}/{tumu.length} kontrol başarılı · odak: tedarikçi (ikinci taraf) denetimi
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
        <Grup baslik="TEKNİK SEO" kontroller={teknik} />
        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <Grup baslik="ODAK: TEDARİKÇİ DENETİMİ" kontroller={odak} />
          <Grup baslik="İÇERİK SAĞLIĞI" kontroller={icerik} />
        </div>
      </div>

      {aramalar && (
        <div style={{ ...adminKart, padding: 0, marginTop: 16, overflowX: "auto" }}>
          <div style={{ padding: "14px 16px 6px", fontSize: 13.5, fontWeight: 600, color: "var(--dvn-lacivert)" }}>
            Tedarikçi / ikinci taraf aramalarında Google sıralaması <span style={{ fontWeight: 400, color: "var(--dvn-gri-500)" }}>(son 28 gün)</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "var(--dvn-gri-700)", fontSize: 12.5 }}>
                <th style={{ ...td, textAlign: "left" }}>Arama</th>
                <th style={{ ...td, textAlign: "right" }}>Gösterim</th>
                <th style={{ ...td, textAlign: "right" }}>Tıklama</th>
                <th style={{ ...td, textAlign: "right" }}>Ort. sıra</th>
              </tr>
            </thead>
            <tbody>
              {aramalar.map((r) => (
                <tr key={r.ad}>
                  <td style={{ ...td, color: "var(--dvn-lacivert)" }}>{r.ad}</td>
                  <td style={{ ...td, textAlign: "right" }}>{r.gosterim.toLocaleString("tr-TR")}</td>
                  <td style={{ ...td, textAlign: "right" }}>{r.tiklama.toLocaleString("tr-TR")}</td>
                  <td style={{ ...td, textAlign: "right", fontWeight: 600, color: r.sira <= 3 ? RENK.iyi : r.sira <= 10 ? RENK.uyari : RENK.kotu }}>
                    {r.sira.toFixed(1)}
                  </td>
                </tr>
              ))}
              {aramalar.length === 0 && (
                <tr>
                  <td style={{ ...td, color: "var(--dvn-gri-500)" }} colSpan={4}>
                    Bu dönemde tedarikçi aramalarında henüz gösterim yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {sorunlar.length > 0 && (
        <div style={{ ...adminKart, padding: 0, marginTop: 16, overflowX: "auto" }}>
          <div style={{ padding: "14px 16px 6px", fontSize: 13.5, fontWeight: 600, color: "var(--dvn-lacivert)" }}>
            İyileştirilebilecek yazılar
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {sorunlar.map(({ b, s }) => (
                <tr key={b.slug}>
                  <td style={td}>
                    <Link href={`/blog/${b.slug}`} target="_blank" style={{ color: "var(--dvn-lacivert)", textDecoration: "none" }}>
                      {b.baslik}
                    </Link>
                  </td>
                  <td style={{ ...td, color: RENK.uyari, whiteSpace: "nowrap", textAlign: "right" }}>{s.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
