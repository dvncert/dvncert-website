import Link from "next/link";
import type { CSSProperties } from "react";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { egitimEtkinlikleri } from "@/lib/db/schema";
import { SayfaBaslik, btnBirincil, adminTablo } from "../_ui";
import SilButonu from "../_SilButonu";
import { etkinlikSil } from "../actions";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "top" };

function bicim(d: Date): string {
  return new Date(d).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default async function EtkinliklerListe() {
  const rows = await db.select().from(egitimEtkinlikleri).orderBy(desc(egitimEtkinlikleri.baslangic));
  const simdi = new Date();

  return (
    <div>
      <SayfaBaslik
        baslik="Eğitim Etkinlikleri"
        sag={
          <Link href="/admin/etkinlikler/form" style={btnBirincil}>
            + Yeni Etkinlik
          </Link>
        }
      />
      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Başlık</th>
              <th style={hucre}>Kategori</th>
              <th style={hucre}>Başlangıç</th>
              <th style={hucre}>Yer</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const gelecek = r.baslangic > simdi;
              return (
                <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                  <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.baslik}</td>
                  <td style={hucre}>{r.kategori}</td>
                  <td style={hucre}>
                    {bicim(r.baslangic)}
                    {!gelecek && (
                      <span style={{ marginLeft: 8, fontSize: 11, color: "var(--dvn-gri-500)" }}>(geçmiş)</span>
                    )}
                  </td>
                  <td style={hucre}>{r.yer}</td>
                  <td style={hucre}>{r.yayinda ? "Yayında" : "Taslak"}</td>
                  <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                      <Link href={`/admin/etkinlikler/form?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                        Düzenle
                      </Link>
                      <SilButonu id={r.id} action={etkinlikSil} />
                    </span>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={6}>
                  Henüz etkinlik yok. Yukarıdaki butonla ekleyebilirsiniz.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
