import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { yorumlar } from "@/lib/db/schema";
import { yorumKaydet } from "../../actions";
import { Alan, adminInput, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";

export default async function YorumForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const mevcut = id ? (await db.select().from(yorumlar).where(eq(yorumlar.id, Number(id))))[0] : null;

  return (
    <div style={{ maxWidth: 640 }}>
      <SayfaBaslik baslik={mevcut ? "Yorum Düzenle" : "Yeni Yorum"} />
      <form action={yorumKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Alan etiket="İsim">
            <input name="isim" required defaultValue={mevcut?.isim ?? ""} style={adminInput} />
          </Alan>
          <Alan etiket="Kurum (opsiyonel)">
            <input name="kurum" defaultValue={mevcut?.kurum ?? ""} style={adminInput} />
          </Alan>
        </div>
        <Alan etiket="Yorum">
          <textarea name="yorum" required rows={4} defaultValue={mevcut?.yorum ?? ""} style={{ ...adminInput, resize: "vertical", minHeight: 90 }} />
        </Alan>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <Alan etiket="Puan (1-5, opsiyonel)">
            <input name="puan" type="number" min={1} max={5} defaultValue={mevcut?.puan ?? ""} style={adminInput} />
          </Alan>
          <Alan etiket="Tarih (opsiyonel)">
            <input name="tarih" defaultValue={mevcut?.tarih ?? ""} placeholder="2026-05-25" style={adminInput} />
          </Alan>
          <Alan etiket="Sıra (büyük üstte)">
            <input name="sira" type="number" defaultValue={mevcut?.sira ?? 0} style={adminInput} />
          </Alan>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="yayinda" defaultChecked={mevcut ? mevcut.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Yayında (sitede göster)
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={btnBirincil}>Kaydet</button>
          <Link href="/admin/yorumlar" style={btnIkincil}>İptal</Link>
        </div>
      </form>
    </div>
  );
}
