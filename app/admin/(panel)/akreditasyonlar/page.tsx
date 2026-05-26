import Link from "next/link";
import type { CSSProperties } from "react";
import { asc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { akreditasyonBelgeleri } from "@/lib/db/schema";
import { akreditasyonKaydet, akreditasyonSil } from "../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, adminTablo, btnBirincil, btnIkincil } from "../_ui";
import SilButonu from "../_SilButonu";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "middle" };

export default async function AkrYonetim({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const rows = await db
    .select({
      id: akreditasyonBelgeleri.id,
      ad: akreditasyonBelgeleri.ad,
      aciklama: akreditasyonBelgeleri.aciklama,
      kapsam: akreditasyonBelgeleri.kapsam,
      gecerlilikTarihi: akreditasyonBelgeleri.gecerlilikTarihi,
      belgeMime: akreditasyonBelgeleri.belgeMime,
      sira: akreditasyonBelgeleri.sira,
      yayinda: akreditasyonBelgeleri.yayinda,
      belgeVar: sql<boolean>`${akreditasyonBelgeleri.belgeVeri} is not null`,
    })
    .from(akreditasyonBelgeleri)
    .orderBy(asc(akreditasyonBelgeleri.sira), asc(akreditasyonBelgeleri.id));
  const duzenlenen = id ? rows.find((r) => r.id === Number(id)) : null;

  return (
    <div>
      <SayfaBaslik baslik="Akreditasyon Belgeleri" />
      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6, maxWidth: 760 }}>
        TÜRKAK ve diğer akreditasyon belgelerinizi PDF veya görsel olarak yükleyin. Yüklediğiniz dosyalar
        /akreditasyonlarimiz sayfasında ziyaretçilere indirilebilir/önizlenebilir biçimde sunulur.
      </p>

      <div style={{ ...adminKart, maxWidth: 760, marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 16px" }}>
          {duzenlenen ? "Belgeyi Düzenle" : "Yeni Belge Ekle"}
        </h2>
        <form action={akreditasyonKaydet}>
          {duzenlenen && <input type="hidden" name="id" value={duzenlenen.id} />}
          <Alan etiket="Belge adı">
            <input name="ad" required defaultValue={duzenlenen?.ad ?? ""} placeholder="TÜRKAK Akreditasyon Sertifikası" style={adminInput} />
          </Alan>
          <Alan etiket="Açıklama (opsiyonel)">
            <textarea name="aciklama" rows={2} defaultValue={duzenlenen?.aciklama ?? ""} style={{ ...adminInput, resize: "vertical" }} />
          </Alan>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Alan etiket="Kapsam (örn. ISO 9001, 14001, 45001)">
              <input name="kapsam" defaultValue={duzenlenen?.kapsam ?? ""} style={adminInput} />
            </Alan>
            <Alan etiket="Geçerlilik tarihi (YYYY-AA-GG)">
              <input name="gecerlilikTarihi" defaultValue={duzenlenen?.gecerlilikTarihi ?? ""} placeholder="2029-12-31" style={adminInput} />
            </Alan>
          </div>
          <Alan etiket="Belge dosyası (PDF veya görsel)">
            {duzenlenen?.belgeVar && (
              <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 8px" }}>
                Mevcut: <a href={`/api/dosya/akreditasyon/${duzenlenen.id}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--dvn-turuncu)" }}>belgeyi görüntüle ({duzenlenen.belgeMime})</a>
              </p>
            )}
            <input type="file" name="belgeDosya" accept="application/pdf,image/*" style={{ ...adminInput, padding: 8 }} />
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
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button type="submit" style={btnBirincil}>{duzenlenen ? "Güncelle" : "Ekle"}</button>
            {duzenlenen && <Link href="/admin/akreditasyonlar" style={btnIkincil}>İptal</Link>}
          </div>
        </form>
      </div>

      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Ad</th>
              <th style={hucre}>Kapsam</th>
              <th style={hucre}>Geçerlilik</th>
              <th style={hucre}>Dosya</th>
              <th style={hucre}>Sıra</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.ad}</td>
                <td style={hucre}>{r.kapsam ?? "—"}</td>
                <td style={hucre}>{r.gecerlilikTarihi ?? "—"}</td>
                <td style={hucre}>{r.belgeVar ? r.belgeMime?.split("/")[1]?.toUpperCase() ?? "Var" : "—"}</td>
                <td style={hucre}>{r.sira}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/akreditasyonlar?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Düzenle</Link>
                    <SilButonu id={r.id} action={akreditasyonSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={7}>Henüz akreditasyon belgesi eklenmedi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
