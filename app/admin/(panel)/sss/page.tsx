import Link from "next/link";
import type { CSSProperties } from "react";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { sssSorulari } from "@/lib/db/schema";
import { sssKaydet, sssSil } from "../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, adminTablo, btnBirincil, btnIkincil } from "../_ui";
import SilButonu from "../_SilButonu";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "top" };

export default async function SssYonetim({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const rows = await db.select().from(sssSorulari).orderBy(asc(sssSorulari.sira), asc(sssSorulari.id));
  const duzenlenen = id ? rows.find((r) => r.id === Number(id)) : null;

  return (
    <div>
      <SayfaBaslik baslik="Sıkça Sorulan Sorular" />
      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6, maxWidth: 760 }}>
        /sss sayfasında listelenecek soru-cevap çiftlerini buradan yönetin. Hiç yayında soru yoksa
        sayfa boş kalır.
      </p>

      <div style={{ ...adminKart, maxWidth: 820, marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 16px" }}>
          {duzenlenen ? "Soruyu Düzenle" : "Yeni Soru Ekle"}
        </h2>
        <form action={sssKaydet}>
          {duzenlenen && <input type="hidden" name="id" value={duzenlenen.id} />}
          <Alan etiket="Soru">
            <input name="soru" required defaultValue={duzenlenen?.soru ?? ""} style={adminInput} />
          </Alan>
          <Alan etiket="Cevap (paragraflar boş satırla ayrılır)">
            <textarea name="cevap" required rows={5} defaultValue={duzenlenen?.cevap ?? ""} style={{ ...adminInput, resize: "vertical" }} />
          </Alan>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "end" }}>
            <Alan etiket="Sıra (küçük olan önce)">
              <input name="sira" type="number" defaultValue={duzenlenen?.sira ?? 0} style={adminInput} />
            </Alan>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--dvn-lacivert)", paddingBottom: 12 }}>
              <input type="checkbox" name="yayinda" defaultChecked={duzenlenen ? duzenlenen.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
              Yayında
            </label>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button type="submit" style={btnBirincil}>{duzenlenen ? "Güncelle" : "Ekle"}</button>
            {duzenlenen && <Link href="/admin/sss" style={btnIkincil}>İptal</Link>}
          </div>
        </form>
      </div>

      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Sıra</th>
              <th style={hucre}>Soru</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={hucre}>{r.sira}</td>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.soru}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/sss?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Düzenle</Link>
                    <SilButonu id={r.id} action={sssSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={4}>Henüz soru eklenmedi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
