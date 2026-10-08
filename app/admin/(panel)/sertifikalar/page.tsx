import Link from "next/link";
import type { CSSProperties } from "react";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { egitimSertifikaGruplari, egitimSertifikalari } from "@/lib/db/schema";
import { egitimTarihiYaz, sertifikaNoNormalize } from "@/lib/sertifika";
import { SayfaBaslik, btnBirincil, btnIkincil, adminTablo, adminInput } from "../_ui";
import SilButonu from "../_SilButonu";
import { sertifikaGrubuSil } from "./actions";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "top" };

export default async function SertifikalarListe({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const arama = q.trim();

  const gruplar = await db
    .select({
      id: egitimSertifikaGruplari.id,
      egitimAdi: egitimSertifikaGruplari.egitimAdi,
      baslangicTarihi: egitimSertifikaGruplari.baslangicTarihi,
      bitisTarihi: egitimSertifikaGruplari.bitisTarihi,
      egitmen: egitimSertifikaGruplari.egitmen,
      adet: sql<number>`(select count(*) from ${egitimSertifikalari} where ${egitimSertifikalari.grupId} = ${egitimSertifikaGruplari.id})`,
    })
    .from(egitimSertifikaGruplari)
    .orderBy(desc(egitimSertifikaGruplari.baslangicTarihi), desc(egitimSertifikaGruplari.id));

  const bulunanlar = arama
    ? await db
        .select({
          id: egitimSertifikalari.id,
          sertifikaNo: egitimSertifikalari.sertifikaNo,
          katilimciAdi: egitimSertifikalari.katilimciAdi,
          iptal: egitimSertifikalari.iptal,
          grupId: egitimSertifikaGruplari.id,
          egitimAdi: egitimSertifikaGruplari.egitimAdi,
        })
        .from(egitimSertifikalari)
        .innerJoin(egitimSertifikaGruplari, eq(egitimSertifikalari.grupId, egitimSertifikaGruplari.id))
        .where(
          or(
            eq(egitimSertifikalari.sertifikaNo, sertifikaNoNormalize(arama)),
            ilike(egitimSertifikalari.katilimciAdi, `%${arama}%`),
          ),
        )
        .limit(50)
    : [];

  return (
    <div>
      <SayfaBaslik
        baslik="Eğitim Sertifikaları"
        sag={
          <Link href="/admin/sertifikalar/form" style={btnBirincil}>
            + Yeni Eğitim / Sertifika
          </Link>
        }
      />

      <form style={{ display: "flex", gap: 10, marginBottom: 18, maxWidth: 520 }}>
        <input name="q" defaultValue={arama} placeholder="Sertifika no veya katılımcı adı ile ara" style={adminInput} />
        <button type="submit" style={btnIkincil}>Ara</button>
      </form>

      {arama && (
        <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12, marginBottom: 28 }}>
          <table style={adminTablo}>
            <thead>
              <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
                <th style={hucre}>Sertifika No</th>
                <th style={hucre}>Katılımcı</th>
                <th style={hucre}>Eğitim</th>
                <th style={hucre}>Durum</th>
              </tr>
            </thead>
            <tbody>
              {bulunanlar.map((r) => (
                <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                  <td style={{ ...hucre, fontFamily: "monospace", fontSize: 14 }}>{r.sertifikaNo}</td>
                  <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.katilimciAdi}</td>
                  <td style={hucre}>
                    <Link href={`/admin/sertifikalar/form?id=${r.grupId}`} style={{ color: "var(--dvn-turuncu)" }}>{r.egitimAdi}</Link>
                  </td>
                  <td style={hucre}>{r.iptal ? <span style={{ color: "#dc2626" }}>İptal</span> : "Geçerli"}</td>
                </tr>
              ))}
              {bulunanlar.length === 0 && (
                <tr><td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={4}>&quot;{arama}&quot; için sonuç yok.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Eğitim</th>
              <th style={hucre}>Tarih</th>
              <th style={hucre}>Eğitmen</th>
              <th style={hucre}>Sertifika</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {gruplar.map((g) => (
              <tr key={g.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{g.egitimAdi}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>{egitimTarihiYaz(g.baslangicTarihi, g.bitisTarihi)}</td>
                <td style={hucre}>{g.egitmen}</td>
                <td style={hucre}>{Number(g.adet)}</td>
                <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                    <Link href={`/admin/sertifikalar/form?id=${g.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                      Aç
                    </Link>
                    <Link href={`/admin/sertifika-baski?grup=${g.id}`} target="_blank" style={{ color: "var(--dvn-lacivert)", fontWeight: 500 }}>
                      Toplu Yazdır
                    </Link>
                    <SilButonu id={g.id} action={sertifikaGrubuSil} etiket="Sil" />
                  </span>
                </td>
              </tr>
            ))}
            {gruplar.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={5}>
                  Henüz eğitim sertifikası yok. Yukarıdaki butonla eğitim bilgilerini ve katılımcı listesini girerek
                  sertifikaları oluşturabilirsiniz.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", marginTop: 10 }}>
        Bir eğitimi silmek, o eğitime ait tüm sertifikaları da siler ve doğrulama sayfasında artık bulunamazlar.
        Tek bir sertifikayı geçersiz kılmak için silmek yerine eğitimin içinden &quot;İptal et&quot;i kullanın.
      </p>
    </div>
  );
}
