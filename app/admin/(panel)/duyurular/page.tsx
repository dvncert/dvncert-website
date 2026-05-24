import Link from "next/link";
import type { CSSProperties } from "react";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { duyurular } from "@/lib/db/schema";
import { tarihiBicimle } from "@/lib/duyurular";
import { SayfaBaslik, btnBirincil, adminTablo } from "../_ui";
import SilButonu from "../_SilButonu";
import { duyuruSil } from "../actions";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "top" };

export default async function DuyurularListe() {
  const rows = await db.select().from(duyurular).orderBy(desc(duyurular.tarih));

  return (
    <div>
      <SayfaBaslik
        baslik="Duyurular"
        sag={
          <Link href="/admin/duyurular/form" style={btnBirincil}>
            + Yeni Duyuru
          </Link>
        }
      />
      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Başlık</th>
              <th style={hucre}>Kategori</th>
              <th style={hucre}>Tarih</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.baslik}</td>
                <td style={hucre}>{r.kategori}</td>
                <td style={hucre}>{tarihiBicimle(r.tarih)}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Taslak"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/duyurular/form?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                      Düzenle
                    </Link>
                    <SilButonu id={r.id} action={duyuruSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={5}>
                  Henüz duyuru yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
