import Link from "next/link";
import type { CSSProperties } from "react";
import { asc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { ekipUyeleri } from "@/lib/db/schema";
import { ekipKaydet, ekipSil } from "../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, adminTablo, btnBirincil, btnIkincil } from "../_ui";
import SilButonu from "../_SilButonu";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "middle" };

export default async function EkipYonetim({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const rows = await db
    .select({
      id: ekipUyeleri.id,
      ad: ekipUyeleri.ad,
      unvan: ekipUyeleri.unvan,
      uzmanlik: ekipUyeleri.uzmanlik,
      fotoAlt: ekipUyeleri.fotoAlt,
      sira: ekipUyeleri.sira,
      yayinda: ekipUyeleri.yayinda,
      fotoVar: sql<boolean>`${ekipUyeleri.fotoVeri} is not null`,
    })
    .from(ekipUyeleri)
    .orderBy(asc(ekipUyeleri.sira), asc(ekipUyeleri.id));
  const duzenlenen = id ? rows.find((r) => r.id === Number(id)) : null;

  return (
    <div>
      <SayfaBaslik baslik="Ekibimiz" />

      <div style={{ ...adminKart, maxWidth: 760, marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 16px" }}>
          {duzenlenen ? "Üyeyi Düzenle" : "Yeni Üye Ekle"}
        </h2>
        <form action={ekipKaydet}>
          {duzenlenen && <input type="hidden" name="id" value={duzenlenen.id} />}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Alan etiket="Ad Soyad">
              <input name="ad" required defaultValue={duzenlenen?.ad ?? ""} style={adminInput} />
            </Alan>
            <Alan etiket="Ünvan / Rol">
              <input name="unvan" required defaultValue={duzenlenen?.unvan ?? ""} placeholder="Baş Denetçi / Genel Müdür..." style={adminInput} />
            </Alan>
          </div>
          <Alan etiket="Uzmanlık alanı (kısa açıklama)">
            <textarea name="uzmanlik" rows={2} defaultValue={duzenlenen?.uzmanlik ?? ""} style={{ ...adminInput, resize: "vertical" }} />
          </Alan>
          <Alan etiket="Profil fotoğrafı — önerilen: 600×600 px (kare) · PNG / JPG (otomatik WebP'e çevrilir)">
            {duzenlenen?.fotoVar && (
              <div style={{ marginBottom: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/gorsel/ekip/${duzenlenen.id}`} alt="Mevcut foto" style={{ width: 90, height: 90, objectFit: "cover", borderRadius: "50%", border: "0.5px solid var(--dvn-gri-300)" }} />
              </div>
            )}
            <input type="file" name="fotoDosya" accept="image/png,image/jpeg,image/webp" style={{ ...adminInput, padding: 8 }} />
          </Alan>
          <Alan etiket="Foto alt metni (SEO / erişilebilirlik)">
            <input name="fotoAlt" defaultValue={duzenlenen?.fotoAlt ?? ""} placeholder="ör. Ahmet Yılmaz — Baş Denetçi" style={adminInput} />
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
            {duzenlenen && <Link href="/admin/ekip" style={btnIkincil}>İptal</Link>}
          </div>
        </form>
      </div>

      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Foto</th>
              <th style={hucre}>Ad Soyad</th>
              <th style={hucre}>Ünvan</th>
              <th style={hucre}>Sıra</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={hucre}>
                  {r.fotoVar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={`/api/gorsel/ekip/${r.id}`} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--dvn-gri-200)", display: "inline-block" }} />
                  )}
                </td>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.ad}</td>
                <td style={hucre}>{r.unvan}</td>
                <td style={hucre}>{r.sira}</td>
                <td style={hucre}>{r.yayinda ? "Yayında" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/ekip?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>Düzenle</Link>
                    <SilButonu id={r.id} action={ekipSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={6}>Henüz üye eklenmedi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
