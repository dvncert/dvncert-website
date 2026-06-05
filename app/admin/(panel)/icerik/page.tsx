import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { sayfaBloklari, sayfaSeo } from "@/lib/db/schema";
import { SAYFA_ICERIK } from "@/lib/sayfa-icerigi";
import { sayfaIcerikKaydet, sayfaIcerikSifirla, sayfaKapakKaydet, sayfaKapakSil } from "../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, btnBirincil, btnIkincil } from "../_ui";

export default async function SayfaIcerikYonetim({
  searchParams,
}: {
  searchParams: Promise<{ yol?: string; ok?: string }>;
}) {
  const sp = await searchParams;
  const yollar = Object.keys(SAYFA_ICERIK);
  const yol = sp.yol && yollar.includes(sp.yol) ? sp.yol : yollar[0];
  const tanim = SAYFA_ICERIK[yol];

  const rows = await db
    .select({ anahtar: sayfaBloklari.anahtar, deger: sayfaBloklari.deger })
    .from(sayfaBloklari)
    .where(eq(sayfaBloklari.yol, yol));
  const mevcut = Object.fromEntries(rows.map((r) => [r.anahtar, r.deger]));

  // Kapak görseli yüklenebilen sayfalar için mevcut görsel durumu.
  const kapak = tanim.kapak
    ? (
        await db
          .select({ var: sql<boolean>`${sayfaSeo.kapakVeri} is not null`, guncellenme: sayfaSeo.guncellenme })
          .from(sayfaSeo)
          .where(eq(sayfaSeo.yol, yol))
          .limit(1)
      )[0]
    : undefined;

  return (
    <div style={{ maxWidth: 820 }}>
      <SayfaBaslik baslik="Sayfa İçeriği Düzenleyici" />

      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6 }}>
        Statik sayfaların metinlerini buradan düzenleyebilirsiniz. Boş bıraktığınız alanlar için sayfanın
        koddaki varsayılan metni kullanılır. Tasarım sabit kalır, yalnızca metinler değişir.
      </p>

      {sp.ok && (
        <div style={{ background: "#ecfdf5", border: "0.5px solid #a7f3d0", color: "#065f46", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 18 }}>
          ✓ İçerik kaydedildi. Site 1-2 dakika içinde güncellenir.
        </div>
      )}

      <form method="get" style={{ marginBottom: 22 }}>
        <Alan etiket="Sayfa seç">
          <div style={{ display: "flex", gap: 10 }}>
            <select name="yol" defaultValue={yol} style={{ ...adminInput, flexGrow: 1 }}>
              {yollar.map((y) => (
                <option key={y} value={y}>{SAYFA_ICERIK[y].ad} ({y})</option>
              ))}
            </select>
            <button type="submit" style={btnBirincil}>Yükle</button>
          </div>
        </Alan>
      </form>

      {tanim.kapak && (
        <div style={{ ...adminKart, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 4px" }}>
            Kapak Görseli
          </h2>
          <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 14px", lineHeight: 1.6 }}>
            Sayfanın üst kapak alanındaki görsel. Önerilen ölçü <strong>1280×380 px</strong> (yatay, ~3.4:1).
            PNG / JPG / WebP yükleyin; otomatik WebP&apos;e çevrilir. Görsel yokken marka renkli yer tutucu gösterilir.
          </p>

          {kapak?.var && (
            <div style={{ marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/gorsel/sayfa-kapak/${encodeURIComponent(yol)}?v=${new Date(kapak.guncellenme).getTime()}`}
                alt="Mevcut kapak görseli"
                style={{ maxWidth: 420, width: "100%", height: "auto", borderRadius: 8, border: "0.5px solid var(--dvn-gri-300)" }}
              />
            </div>
          )}

          <form action={sayfaKapakKaydet} encType="multipart/form-data" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <input type="hidden" name="yol" value={yol} />
            <input type="file" name="kapakDosya" accept="image/png,image/jpeg,image/webp" required style={{ ...adminInput, padding: 8, flexGrow: 1, minWidth: 220 }} />
            <button type="submit" style={btnBirincil}>{kapak?.var ? "Görseli Değiştir" : "Görseli Yükle"}</button>
          </form>

          {kapak?.var && (
            <form action={sayfaKapakSil} style={{ marginTop: 10 }}>
              <input type="hidden" name="yol" value={yol} />
              <button type="submit" style={{ ...btnIkincil, padding: "6px 12px", fontSize: 12.5 }}>Görseli kaldır</button>
            </form>
          )}
        </div>
      )}

      <form action={sayfaIcerikKaydet}>
        <input type="hidden" name="yol" value={yol} />

        <div style={{ ...adminKart, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 4px" }}>
            {tanim.ad}
          </h2>
          <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "0 0 18px" }}>
            <a href={yol} target="_blank" rel="noopener noreferrer" style={{ color: "var(--dvn-turuncu)" }}>
              {yol} sayfasını yeni sekmede aç →
            </a>
          </p>

          {tanim.alanlar.map((alan) => {
            const dbDeger = mevcut[alan.anahtar];
            const yer = alan.varsayilan;
            const ovrMi = dbDeger !== undefined && dbDeger.trim() !== "";
            return (
              <div key={alan.anahtar} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: "var(--dvn-gri-700)" }}>
                    {alan.etiket}
                    {ovrMi && (
                      <span style={{ marginLeft: 8, fontSize: 10.5, color: "var(--dvn-turuncu)", fontWeight: 500 }}>● özelleştirilmiş</span>
                    )}
                  </label>
                  {ovrMi && (
                    <SifirlamaButonu yol={yol} anahtar={alan.anahtar} />
                  )}
                </div>
                {alan.tip === "input" ? (
                  <input
                    name={alan.anahtar}
                    defaultValue={dbDeger ?? ""}
                    placeholder={yer}
                    style={adminInput}
                  />
                ) : (
                  <textarea
                    name={alan.anahtar}
                    rows={alan.tip === "textarea-uzun" ? 7 : 3}
                    defaultValue={dbDeger ?? ""}
                    placeholder={yer}
                    style={{ ...adminInput, resize: "vertical" }}
                  />
                )}
                {alan.yardim && <p style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", margin: "4px 0 0" }}>{alan.yardim}</p>}
              </div>
            );
          })}
        </div>

        <button type="submit" style={btnBirincil}>Tümünü Kaydet</button>
      </form>
    </div>
  );
}

function SifirlamaButonu({ yol, anahtar }: { yol: string; anahtar: string }) {
  return (
    <form action={sayfaIcerikSifirla} style={{ display: "inline" }}>
      <input type="hidden" name="yol" value={yol} />
      <input type="hidden" name="anahtar" value={anahtar} />
      <button type="submit" style={{ ...btnIkincil, padding: "3px 9px", fontSize: 11.5 }}>
        Varsayılana sıfırla
      </button>
    </form>
  );
}
