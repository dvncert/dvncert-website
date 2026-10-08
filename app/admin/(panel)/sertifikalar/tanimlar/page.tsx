import Link from "next/link";
import type { CSSProperties } from "react";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { egitimTanimlari } from "@/lib/db/schema";
import { SayfaBaslik, adminInput, adminKart, adminTablo, btnBirincil, btnIkincil } from "../../_ui";
import SilButonu from "../../_SilButonu";
import { egitimTanimiKaydet, egitimTanimiSil } from "../actions";

const hucre: CSSProperties = { padding: "8px 12px", textAlign: "left", verticalAlign: "middle" };

export default async function EgitimTanimlari({ searchParams }: { searchParams: Promise<{ hata?: string }> }) {
  const { hata } = await searchParams;
  const tanimlar = await db.select().from(egitimTanimlari).orderBy(asc(egitimTanimlari.sira), asc(egitimTanimlari.ad));
  const sonrakiSira = (tanimlar.at(-1)?.sira ?? 0) + 10;

  return (
    <div style={{ maxWidth: 900 }}>
      <SayfaBaslik
        baslik="Eğitim Tanımları"
        sag={
          <Link href="/admin/sertifikalar" style={btnIkincil}>
            ← Eğitim Sertifikaları
          </Link>
        }
      />
      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "-8px 0 18px", lineHeight: 1.6 }}>
        Sertifika oluştururken &quot;Eğitim adı&quot; alanına yazdıkça bu listeden öneri gelir. Ad sertifikaya aynen
        basılır; şablonda altında &quot;Eğitimini&quot; yazdığı için sonuna &quot;Eğitimi&quot; eklemeyin. Pasif tanımlar
        önerilerde görünmez.
      </p>

      {hata === "ayni" && (
        <div style={{ ...adminKart, padding: "10px 14px", marginBottom: 14, borderColor: "#dc2626", color: "#b91c1c", fontSize: 13.5 }}>
          Bu adla bir eğitim tanımı zaten var.
        </div>
      )}

      <form action={egitimTanimiKaydet} style={{ ...adminKart, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
        <input name="ad" required placeholder="Yeni eğitim adı — örn. ISO 31000:2018 Risk Yönetimi Temel" style={{ ...adminInput, flex: "1 1 360px" }} />
        <input name="sira" type="number" defaultValue={sonrakiSira} title="Sıra" style={{ ...adminInput, width: 90 }} />
        <button type="submit" style={btnBirincil}>+ Ekle</button>
      </form>

      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Eğitim adı</th>
              <th style={{ ...hucre, width: 90 }}>Sıra</th>
              <th style={{ ...hucre, width: 70 }}>Aktif</th>
              <th style={{ ...hucre, width: 130 }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {tanimlar.map((t) => {
              const formId = `tanim-${t.id}`;
              return (
                <tr key={t.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)", opacity: t.aktif ? 1 : 0.55 }}>
                  <td style={hucre}>
                    <form id={formId} action={egitimTanimiKaydet}>
                      <input type="hidden" name="id" value={t.id} />
                    </form>
                    <input form={formId} name="ad" required defaultValue={t.ad} style={{ ...adminInput, padding: "6px 10px" }} />
                  </td>
                  <td style={hucre}>
                    <input form={formId} name="sira" type="number" defaultValue={t.sira} style={{ ...adminInput, padding: "6px 8px" }} />
                  </td>
                  <td style={hucre}>
                    <input form={formId} name="aktif" type="checkbox" defaultChecked={t.aktif} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
                  </td>
                  <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                      <button form={formId} type="submit" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--dvn-lacivert)", fontSize: 13, fontWeight: 500 }}>
                        Kaydet
                      </button>
                      <SilButonu id={t.id} action={egitimTanimiSil} />
                    </span>
                  </td>
                </tr>
              );
            })}
            {tanimlar.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={4}>
                  Henüz eğitim tanımı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
