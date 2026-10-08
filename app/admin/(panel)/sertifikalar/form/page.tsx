import Link from "next/link";
import type { CSSProperties } from "react";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { egitimSertifikaGruplari, egitimSertifikalari } from "@/lib/db/schema";
import { egitimTarihiYaz, qrSvg } from "@/lib/sertifika";
import EgitimSertifikasi from "@/app/components/EgitimSertifikasi";
import { Alan, adminInput, adminKart, adminTablo, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";
import SilButonu from "../../_SilButonu";
import { katilimciAdiGuncelle, sertifikaGrubuKaydet, sertifikaIptalDegistir, sertifikaSil } from "../actions";

const hucre: CSSProperties = { padding: "8px 12px", textAlign: "left", verticalAlign: "middle" };
const linkBtn: CSSProperties = { background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 13, fontWeight: 500 };

export default async function SertifikaGrubuForm({ searchParams }: { searchParams: Promise<{ id?: string; ok?: string }> }) {
  const { id, ok } = await searchParams;
  const grup = id ? (await db.select().from(egitimSertifikaGruplari).where(eq(egitimSertifikaGruplari.id, Number(id))))[0] : null;
  const sertifikalar = grup
    ? await db.select().from(egitimSertifikalari).where(eq(egitimSertifikalari.grupId, grup.id)).orderBy(asc(egitimSertifikalari.id))
    : [];
  const ornek = sertifikalar.find((r) => !r.iptal);

  return (
    <div>
      <SayfaBaslik
        baslik={grup ? "Eğitim Sertifikaları" : "Yeni Eğitim / Toplu Sertifika"}
        sag={
          <Link href="/admin/sertifikalar" style={btnIkincil}>
            ← Tüm eğitimler
          </Link>
        }
      />

      {ok && (
        <div style={{ ...adminKart, padding: "12px 16px", marginBottom: 18, borderColor: "var(--dvn-altin)", color: "var(--dvn-lacivert)", fontSize: 13.5 }}>
          Kaydedildi. Sertifika numaraları ve QR kodları otomatik oluşturuldu.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, alignItems: "start" }}>
        <form action={sertifikaGrubuKaydet} style={adminKart}>
          {grup && <input type="hidden" name="id" value={grup.id} />}
          <h2 style={altBaslik}>EĞİTİM BİLGİLERİ</h2>
          <Alan etiket='Eğitim adı — sertifikada altında "Eğitimini" yazar, bu yüzden sonuna "Eğitimi" eklemeyin'>
            <input
              name="egitimAdi"
              required
              defaultValue={grup?.egitimAdi ?? ""}
              placeholder="ISO 9001:2015 Kalite Yönetim Sistemi Temel ve İç Denetçi"
              style={adminInput}
            />
          </Alan>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Alan etiket="Eğitim tarihi">
              <input type="date" name="baslangicTarihi" required defaultValue={grup?.baslangicTarihi ?? ""} style={adminInput} />
            </Alan>
            <Alan etiket="Bitiş (tek günse boş)">
              <input type="date" name="bitisTarihi" defaultValue={grup?.bitisTarihi ?? ""} style={adminInput} />
            </Alan>
          </div>
          <Alan etiket="Eğitmen">
            <input name="egitmen" required defaultValue={grup?.egitmen ?? ""} placeholder="Ad Soyad" style={adminInput} />
          </Alan>

          <h2 style={{ ...altBaslik, marginTop: 22 }}>{grup ? "KATILIMCI EKLE" : "KATILIMCI LİSTESİ"}</h2>
          <Alan etiket="Her satıra bir katılımcı (Excel'den Ad / Soyad sütunlarını doğrudan yapıştırabilirsiniz)">
            <textarea
              name="katilimcilar"
              required={!grup}
              rows={grup ? 4 : 10}
              placeholder={"Ayşe Yılmaz\nMehmet Demir\nZeynep Kaya"}
              style={{ ...adminInput, resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
            />
          </Alan>
          <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "-6px 0 16px", lineHeight: 1.5 }}>
            Her katılımcıya 8 haneli benzersiz bir sertifika numarası ve doğrulama QR kodu otomatik verilir.
            {grup && " Eğitim bilgilerinde yaptığınız değişiklik bu eğitimin tüm sertifikalarına yansır."}
          </p>

          <button type="submit" style={btnBirincil}>{grup ? "Kaydet" : "Sertifikaları Oluştur"}</button>
        </form>

        {ornek && grup && (
          <div>
            <h2 style={altBaslik}>ÖNİZLEME</h2>
            <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 22px rgba(2,35,152,0.12)" }}>
              <EgitimSertifikasi
                veri={{
                  katilimciAdi: ornek.katilimciAdi,
                  egitimAdi: grup.egitimAdi,
                  egitimTarihi: egitimTarihiYaz(grup.baslangicTarihi, grup.bitisTarihi),
                  egitmen: grup.egitmen,
                  sertifikaNo: ornek.sertifikaNo,
                  qrSvg: await qrSvg(ornek.sertifikaNo),
                }}
              />
            </div>
          </div>
        )}
      </div>

      {grup && (
        <section style={{ marginTop: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
            <h2 style={{ ...altBaslik, margin: 0 }}>SERTİFİKALAR ({sertifikalar.length})</h2>
            <Link href={`/admin/sertifika-baski?grup=${grup.id}`} target="_blank" style={btnBirincil}>
              Tümünü Yazdır / PDF
            </Link>
          </div>
          <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
            <table style={adminTablo}>
              <thead>
                <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
                  <th style={hucre}>Sertifika No</th>
                  <th style={hucre}>Katılımcı</th>
                  <th style={hucre}>Durum</th>
                  <th style={hucre}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {sertifikalar.map((r) => (
                  <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)", opacity: r.iptal ? 0.6 : 1 }}>
                    <td style={{ ...hucre, fontFamily: "monospace", fontSize: 14, letterSpacing: 1 }}>{r.sertifikaNo}</td>
                    <td style={hucre}>
                      <form action={katilimciAdiGuncelle} style={{ display: "flex", gap: 8 }}>
                        <input type="hidden" name="id" value={r.id} />
                        <input name="katilimciAdi" defaultValue={r.katilimciAdi} required style={{ ...adminInput, padding: "6px 10px", minWidth: 200 }} />
                        <button type="submit" style={{ ...linkBtn, color: "var(--dvn-lacivert)" }}>Kaydet</button>
                      </form>
                    </td>
                    <td style={hucre}>{r.iptal ? <span style={{ color: "#dc2626", fontWeight: 500 }}>İptal</span> : "Geçerli"}</td>
                    <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                        <Link href={`/admin/sertifika-baski?id=${r.id}`} target="_blank" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                          Yazdır
                        </Link>
                        <Link href={`/sertifika-sorgula/${r.sertifikaNo}`} target="_blank" style={{ color: "var(--dvn-lacivert)", fontWeight: 500 }}>
                          Doğrula
                        </Link>
                        <form action={sertifikaIptalDegistir} style={{ display: "inline" }}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="iptal" value={r.iptal ? "0" : "1"} />
                          <button type="submit" style={{ ...linkBtn, color: r.iptal ? "#16a34a" : "#b45309" }}>
                            {r.iptal ? "Geri al" : "İptal et"}
                          </button>
                        </form>
                        <SilButonu id={r.id} action={sertifikaSil} />
                      </span>
                    </td>
                  </tr>
                ))}
                {sertifikalar.length === 0 && (
                  <tr>
                    <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={4}>
                      Bu eğitimde henüz sertifika yok. Yukarıdan katılımcı ekleyin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", marginTop: 10, lineHeight: 1.5 }}>
            İptal edilen sertifika doğrulama sayfasında &quot;iptal edilmiş&quot; olarak görünür ve toplu baskıya dahil edilmez.
            Silinen sertifika ise hiç bulunamaz.
          </p>
        </section>
      )}
    </div>
  );
}

const altBaslik: CSSProperties = { fontSize: 12, fontWeight: 600, color: "var(--dvn-turuncu)", letterSpacing: 1.1, margin: "0 0 14px" };
