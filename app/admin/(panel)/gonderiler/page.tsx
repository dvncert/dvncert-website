import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { formGonderileri } from "@/lib/db/schema";
import { SayfaBaslik, adminKart, btnIkincil, adminInput } from "../_ui";
import SilButonu from "../_SilButonu";
import { gonderiDurum, gonderiSil } from "../actions";

const tipEtiket: Record<string, string> = {
  iletisim: "İletişim",
  sikayet: "Şikayet / Görüş",
  kariyer: "Kariyer Başvurusu",
};

function tarihBicim(d: Date | string): string {
  return new Date(d).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default async function GonderilerListe() {
  const rows = await db.select().from(formGonderileri).orderBy(desc(formGonderileri.olusturulma));

  return (
    <div>
      <SayfaBaslik baslik="Form Gönderileri" />

      {rows.length === 0 && (
        <p style={{ color: "var(--dvn-gri-500)", fontSize: 14 }}>Henüz gönderi yok.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map((r) => (
          <div key={r.id} style={adminKart}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--dvn-turuncu)", background: "var(--dvn-turuncu-soluk)", padding: "3px 10px", borderRadius: 999 }}>
                  {tipEtiket[r.tip] ?? r.tip}
                </span>
                <span style={{ fontSize: 12.5, color: "var(--dvn-gri-500)" }}>{tarihBicim(r.olusturulma)}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 999,
                    color: r.durum === "cozuldu" ? "#15803d" : r.durum === "okundu" ? "#475569" : "var(--dvn-lacivert)",
                    background: r.durum === "cozuldu" ? "#dcfce7" : "var(--dvn-gri-100)",
                  }}
                >
                  {r.durum}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <form action={gonderiDurum} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  <input type="hidden" name="id" value={r.id} />
                  <select name="durum" defaultValue={r.durum} style={{ ...adminInput, width: "auto", padding: "6px 10px", fontSize: 13 }}>
                    <option value="yeni">Yeni</option>
                    <option value="okundu">Okundu</option>
                    <option value="cozuldu">Çözüldü</option>
                  </select>
                  <button type="submit" style={{ ...btnIkincil, padding: "6px 12px" }}>Güncelle</button>
                </form>
                <SilButonu id={r.id} action={gonderiSil} />
              </div>
            </div>

            <div style={{ fontSize: 14, color: "var(--dvn-lacivert)", fontWeight: 500 }}>
              {r.ad ?? "—"}
              {r.konu ? <span style={{ color: "var(--dvn-gri-500)", fontWeight: 400 }}> · {r.konu}</span> : null}
            </div>
            <div style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "2px 0 10px" }}>
              {r.email ? <a href={`mailto:${r.email}`} style={{ color: "var(--dvn-turuncu)" }}>{r.email}</a> : null}
              {r.telefon ? <span> · {r.telefon}</span> : null}
            </div>

            {r.mesaj && (
              <p style={{ fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{r.mesaj}</p>
            )}

            {r.ekVeri && Object.keys(r.ekVeri).length > 0 && (
              <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--dvn-gri-500)" }}>
                {Object.entries(r.ekVeri).map(([k, v]) => (
                  <div key={k}>
                    <strong style={{ color: "var(--dvn-gri-700)" }}>{k}:</strong> {String(v)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
