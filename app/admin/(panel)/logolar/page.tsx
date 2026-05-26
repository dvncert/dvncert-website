import Link from "next/link";
import type { CSSProperties } from "react";
import { asc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { logoDosyalari } from "@/lib/db/schema";
import { logoKaydet, logoSil } from "../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, adminTablo, btnBirincil, btnIkincil } from "../_ui";
import SilButonu from "../_SilButonu";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "middle" };

export default async function LogoYonetim({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const rows = await db
    .select({
      id: logoDosyalari.id,
      ad: logoDosyalari.ad,
      aciklama: logoDosyalari.aciklama,
      zeminTipi: logoDosyalari.zeminTipi,
      dosyaMime: logoDosyalari.dosyaMime,
      dosyaAdi: logoDosyalari.dosyaAdi,
      sira: logoDosyalari.sira,
      yayinda: logoDosyalari.yayinda,
      dosyaVar: sql<boolean>`${logoDosyalari.dosyaVeri} is not null`,
    })
    .from(logoDosyalari)
    .orderBy(asc(logoDosyalari.sira), asc(logoDosyalari.id));
  const duzenlenen = id ? rows.find((r) => r.id === Number(id)) : null;

  return (
    <div>
      <SayfaBaslik baslik="Logo Dosyaları" />
      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6, maxWidth: 760 }}>
        İndirilebilir kurumsal logoları yükleyin. PNG, SVG, PDF, JPG kabul edilir. /logolarimiz sayfasında
        seçtiğiniz zemin tipine göre önizleme kartlarında listelenir.
      </p>

      <div style={{ ...adminKart, maxWidth: 760, marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 16px" }}>
          {duzenlenen ? "Logoyu Düzenle" : "Yeni Logo Ekle"}
        </h2>
        <form action={logoKaydet}>
          {duzenlenen && <input type="hidden" name="id" value={duzenlenen.id} />}
          <Alan etiket="Logo adı">
            <input name="ad" required defaultValue={duzenlenen?.ad ?? ""} placeholder="DVN Cert Yatay Logo - PNG" style={adminInput} />
          </Alan>
          <Alan etiket="Açıklama (opsiyonel)">
            <input name="aciklama" defaultValue={duzenlenen?.aciklama ?? ""} placeholder="Yüksek çözünürlüklü, yatay yönlü" style={adminInput} />
          </Alan>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Alan etiket="Önizleme zemini">
              <select name="zeminTipi" defaultValue={duzenlenen?.zeminTipi ?? "acik"} style={adminInput}>
                <option value="acik">Açık zemin için</option>
                <option value="koyu">Koyu zemin için</option>
              </select>
            </Alan>
            <Alan etiket="Sıra">
              <input name="sira" type="number" defaultValue={duzenlenen?.sira ?? 0} style={adminInput} />
            </Alan>
          </div>
          <Alan etiket="Logo dosyası (PNG / SVG / PDF / JPG)">
            {duzenlenen?.dosyaVar && (
              <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 8px" }}>
                Mevcut: <a href={`/api/dosya/logo/${duzenlenen.id}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--dvn-turuncu)" }}>{duzenlenen.dosyaAdi || "dosyayı görüntüle"}</a> ({duzenlenen.dosyaMime})
              </p>
            )}
            <input type="file" name="logoDosya" accept="image/*,application/pdf" style={{ ...adminInput, padding: 8 }} />
          </Alan>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--dvn-lacivert)", marginBottom: 14 }}>
            <input type="checkbox" name="yayinda" defaultChecked={duzenlenen ? duzenlenen.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
            Yayında
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" style={btnBirincil}>{duzenlenen ? "Güncelle" : "Ekle"}</button>
            {duzenlenen && <Link href="/admin/logolar" style={btnIkincil}>İptal</Link>}
          </div>
        </form>
      </div>

      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Ad</th>
              <th style={hucre}>Zemin</th>
              <th style={hucre}>Format</th>
              <th style={hucre}>Sıra</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.ad}</td>
                <td style={hucre}>{r.zeminTipi === "koyu" ? "Koyu" : "Açık"}</td>
                <td style={hucre}>{r.dosyaMime?.split("/")[1]?.toUpperCase() ?? "—"}</td>
                <td style={hucre}>{r.sira}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/logolar?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Düzenle</Link>
                    <SilButonu id={r.id} action={logoSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={6}>Henüz logo eklenmedi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
