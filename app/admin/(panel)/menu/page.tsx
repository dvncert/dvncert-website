import Link from "next/link";
import type { CSSProperties } from "react";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { ekstraMenuOgeleri } from "@/lib/db/schema";
import { menuOgesiKaydet, menuOgesiSil } from "../actions";
import { SayfaBaslik, adminInput, adminKart, adminLabel, adminTablo, btnBirincil, btnIkincil } from "../_ui";
import SilButonu from "../_SilButonu";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "top" };

export default async function MenuYonetim({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const rows = await db.select().from(ekstraMenuOgeleri).orderBy(asc(ekstraMenuOgeleri.sira), asc(ekstraMenuOgeleri.id));
  const duzenlenen = id ? rows.find((r) => r.id === Number(id)) : null;

  return (
    <div>
      <SayfaBaslik baslik="Üst Menü Yönetimi" />

      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6, maxWidth: 760 }}>
        Üst navigasyon şeridine ek menü öğeleri ekleyin. Buradan eklenen öğeler ana menüdeki sabit
        başlıkların (Neden DVN Cert / Hizmetler / İletişim) yanına eklenir. Sıra numarası küçük olan
        önce gelir.
      </p>

      {/* Ekleme/düzenleme formu */}
      <div style={{ ...adminKart, maxWidth: 760, marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 16px" }}>
          {duzenlenen ? "Öğeyi Düzenle" : "Yeni Menü Öğesi"}
        </h2>
        <form action={menuOgesiKaydet}>
          {duzenlenen && <input type="hidden" name="id" value={duzenlenen.id} />}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
            <div>
              <label style={adminLabel}>Başlık (menüde görünecek metin)</label>
              <input name="baslik" required defaultValue={duzenlenen?.baslik ?? ""} placeholder="Örn. Sertifika Sorgula" style={adminInput} />
            </div>
            <div>
              <label style={adminLabel}>Bağlantı (URL veya site içi yol)</label>
              <input name="href" required defaultValue={duzenlenen?.href ?? ""} placeholder="/sertifika-sorgula veya https://..." style={adminInput} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={adminLabel}>Sıra (küçük olan önce)</label>
              <input name="sira" type="number" defaultValue={duzenlenen?.sira ?? 0} style={adminInput} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "flex-end", paddingBottom: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--dvn-lacivert)" }}>
                <input type="checkbox" name="yeniSekme" defaultChecked={duzenlenen?.yeniSekme ?? false} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
                Yeni sekmede aç (dış bağlantılar için)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--dvn-lacivert)" }}>
                <input type="checkbox" name="aktif" defaultChecked={duzenlenen ? duzenlenen.aktif : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
                Aktif
              </label>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" style={btnBirincil}>{duzenlenen ? "Güncelle" : "Ekle"}</button>
            {duzenlenen && <Link href="/admin/menu" style={btnIkincil}>İptal</Link>}
          </div>
        </form>
      </div>

      {/* Liste */}
      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Sıra</th>
              <th style={hucre}>Başlık</th>
              <th style={hucre}>Bağlantı</th>
              <th style={hucre}>Hedef</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={hucre}>{r.sira}</td>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.baslik}</td>
                <td style={{ ...hucre, fontFamily: "monospace", fontSize: 12.5 }}>{r.href}</td>
                <td style={hucre}>{r.yeniSekme ? "Yeni sekme" : "Aynı pencere"}</td>
                <td style={hucre}>{r.aktif ? "Aktif" : "Gizli"}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/menu?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                      Düzenle
                    </Link>
                    <SilButonu id={r.id} action={menuOgesiSil} />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={6}>
                  Henüz menü öğesi eklenmedi. Yukarıdaki formla ekleyebilirsiniz.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

