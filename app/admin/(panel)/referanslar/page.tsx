import Link from "next/link";
import type { CSSProperties } from "react";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { referanslar } from "@/lib/db/schema";
import { SayfaBaslik, btnBirincil, adminTablo } from "../_ui";
import SilButonu from "../_SilButonu";
import { referansSil } from "../actions";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "top" };

export default async function ReferanslarListe() {
  const rows = await db.select().from(referanslar).orderBy(desc(referanslar.sira), desc(referanslar.id));

  return (
    <div>
      <SayfaBaslik
        baslik="Referanslar"
        sag={
          <Link href="/admin/referanslar/form" style={btnBirincil}>
            + Yeni Referans
          </Link>
        }
      />
      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 16px" }}>
        Logo dosyalarını <code>public/gorseller/referanslar/</code> altına yükleyip yolu girin (ör. /gorseller/referanslar/firma.webp).
      </p>
      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Firma</th>
              <th style={hucre}>Logo yolu</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.ad}</td>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)", fontFamily: "monospace", fontSize: 12 }}>{r.logo}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/referanslar/form?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                      Düzenle
                    </Link>
                    <SilButonu id={r.id} action={referansSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={4}>
                  Henüz referans yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
