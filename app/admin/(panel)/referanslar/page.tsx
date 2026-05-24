import Link from "next/link";
import type { CSSProperties } from "react";
import { desc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { referanslar } from "@/lib/db/schema";
import { SayfaBaslik, btnBirincil, adminTablo } from "../_ui";
import SilButonu from "../_SilButonu";
import { referansSil } from "../actions";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "middle" };

export default async function ReferanslarListe() {
  const rows = await db
    .select({
      id: referanslar.id,
      ad: referanslar.ad,
      logo: referanslar.logo,
      url: referanslar.url,
      yayinda: referanslar.yayinda,
      sira: referanslar.sira,
      logoVar: sql<boolean>`${referanslar.logoVeri} is not null`,
    })
    .from(referanslar)
    .orderBy(desc(referanslar.sira), desc(referanslar.id));

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
        Logo dosyasını formdan yükle; sistem otomatik olarak WebP&apos;e çevirip kaydeder.
      </p>
      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Logo</th>
              <th style={hucre}>Firma</th>
              <th style={hucre}>Sıra</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const src = r.logoVar ? `/api/referans-logo/${r.id}` : r.logo ?? "";
              return (
                <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                  <td style={hucre}>
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={r.ad} style={{ height: 34, width: "auto", maxWidth: 110, objectFit: "contain" }} />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.ad}</td>
                  <td style={hucre}>{r.sira}</td>
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
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={5}>
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
