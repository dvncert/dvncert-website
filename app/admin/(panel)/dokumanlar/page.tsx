import Link from "next/link";
import type { CSSProperties } from "react";
import { asc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dokumanlar } from "@/lib/db/schema";
import { dokumanKaydet, dokumanSil } from "../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, adminTablo, btnBirincil, btnIkincil } from "../_ui";
import SilButonu from "../_SilButonu";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "middle" };

const KATEGORILER = ["Politikalar", "Talimatlar", "Prosedürler", "Formlar", "Diğer"];

export default async function DokumanYonetim({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const rows = await db
    .select({
      id: dokumanlar.id,
      kod: dokumanlar.kod,
      baslik: dokumanlar.baslik,
      aciklama: dokumanlar.aciklama,
      kategori: dokumanlar.kategori,
      tip: dokumanlar.tip,
      dosyaMime: dokumanlar.dosyaMime,
      dosyaAdi: dokumanlar.dosyaAdi,
      sira: dokumanlar.sira,
      yayinda: dokumanlar.yayinda,
      dosyaVar: sql<boolean>`${dokumanlar.dosyaVeri} is not null`,
    })
    .from(dokumanlar)
    .orderBy(asc(dokumanlar.kategori), asc(dokumanlar.sira), asc(dokumanlar.id));
  const duzenlenen = id ? rows.find((r) => r.id === Number(id)) : null;

  return (
    <div>
      <SayfaBaslik baslik="Dokümanlar" />
      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6, maxWidth: 760 }}>
        Politika, talimat, prosedür ve formları yükleyin. Yüklenen dosyalar /dokumanlar sayfasında
        kategoriler altında indirilebilir olarak listelenir. Dosya yüklemeden eklenen kayıtlar
        sayfada &quot;Yakında&quot; rozetiyle görünür.
      </p>

      <div style={{ ...adminKart, maxWidth: 760, marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 16px" }}>
          {duzenlenen ? "Dokümanı Düzenle" : "Yeni Doküman Ekle"}
        </h2>
        <form action={dokumanKaydet}>
          {duzenlenen && <input type="hidden" name="id" value={duzenlenen.id} />}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
            <Alan etiket="Kod (örn. POL.01 Rev01)">
              <input name="kod" required defaultValue={duzenlenen?.kod ?? ""} style={adminInput} />
            </Alan>
            <Alan etiket="Başlık">
              <input name="baslik" required defaultValue={duzenlenen?.baslik ?? ""} style={adminInput} />
            </Alan>
          </div>
          <Alan etiket="Açıklama (opsiyonel)">
            <input name="aciklama" defaultValue={duzenlenen?.aciklama ?? ""} style={adminInput} />
          </Alan>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Alan etiket="Kategori">
              <select name="kategori" defaultValue={duzenlenen?.kategori ?? "Politikalar"} style={adminInput}>
                {KATEGORILER.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </Alan>
            <Alan etiket="Tip rozeti">
              <select name="tip" defaultValue={duzenlenen?.tip ?? "PDF"} style={adminInput}>
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="XLSX">XLSX</option>
              </select>
            </Alan>
            <Alan etiket="Sıra">
              <input name="sira" type="number" defaultValue={duzenlenen?.sira ?? 0} style={adminInput} />
            </Alan>
          </div>
          <Alan etiket="Dosya (PDF / DOCX / XLSX — opsiyonel; yoksa 'Yakında' rozeti gösterilir)">
            {duzenlenen?.dosyaVar && (
              <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 8px" }}>
                Mevcut: <a href={`/api/dosya/dokuman/${duzenlenen.id}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--dvn-turuncu)" }}>{duzenlenen.dosyaAdi || "dosyayı indir"}</a>
              </p>
            )}
            <input type="file" name="dokumanDosya" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style={{ ...adminInput, padding: 8 }} />
          </Alan>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--dvn-lacivert)", marginBottom: 14 }}>
            <input type="checkbox" name="yayinda" defaultChecked={duzenlenen ? duzenlenen.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
            Yayında
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" style={btnBirincil}>{duzenlenen ? "Güncelle" : "Ekle"}</button>
            {duzenlenen && <Link href="/admin/dokumanlar" style={btnIkincil}>İptal</Link>}
          </div>
        </form>
      </div>

      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Kategori</th>
              <th style={hucre}>Kod</th>
              <th style={hucre}>Başlık</th>
              <th style={hucre}>Tip</th>
              <th style={hucre}>Dosya</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={hucre}>{r.kategori}</td>
                <td style={{ ...hucre, fontFamily: "monospace", fontSize: 12 }}>{r.kod}</td>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.baslik}</td>
                <td style={hucre}>{r.tip}</td>
                <td style={hucre}>{r.dosyaVar ? "Yüklü" : <em style={{ color: "var(--dvn-gri-500)" }}>yakında</em>}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/dokumanlar?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Düzenle</Link>
                    <SilButonu id={r.id} action={dokumanSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={7}>Henüz doküman eklenmedi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
