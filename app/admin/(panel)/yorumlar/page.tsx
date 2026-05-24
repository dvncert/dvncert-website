import Link from "next/link";
import type { CSSProperties } from "react";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { yorumlar } from "@/lib/db/schema";
import { SayfaBaslik, btnBirincil, adminTablo } from "../_ui";
import SilButonu from "../_SilButonu";
import { yorumSil } from "../actions";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "top" };

export default async function YorumlarListe() {
  const rows = await db.select().from(yorumlar).orderBy(desc(yorumlar.sira), desc(yorumlar.id));

  return (
    <div>
      <SayfaBaslik
        baslik="Müşteri Yorumları"
        sag={
          <Link href="/admin/yorumlar/form" style={btnBirincil}>
            + Yeni Yorum
          </Link>
        }
      />
      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>İsim</th>
              <th style={hucre}>Kurum</th>
              <th style={hucre}>Puan</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.isim}</td>
                <td style={hucre}>{r.kurum ?? "—"}</td>
                <td style={hucre}>{r.puan ? `${r.puan}/5` : "—"}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/yorumlar/form?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                      Düzenle
                    </Link>
                    <SilButonu id={r.id} action={yorumSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={5}>
                  Henüz yorum yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
