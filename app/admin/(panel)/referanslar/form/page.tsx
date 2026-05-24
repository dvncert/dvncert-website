import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { referanslar } from "@/lib/db/schema";
import { referansKaydet } from "../../actions";
import { Alan, adminInput, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";

export default async function ReferansForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const mevcut = id ? (await db.select().from(referanslar).where(eq(referanslar.id, Number(id))))[0] : null;

  return (
    <div style={{ maxWidth: 560 }}>
      <SayfaBaslik baslik={mevcut ? "Referans Düzenle" : "Yeni Referans"} />
      <form action={referansKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}

        <Alan etiket="Firma adı (logo alt metni)">
          <input name="ad" required defaultValue={mevcut?.ad ?? ""} style={adminInput} />
        </Alan>
        <Alan etiket="Logo yolu (public altında)">
          <input name="logo" required defaultValue={mevcut?.logo ?? ""} placeholder="/gorseller/referanslar/firma.webp" style={adminInput} />
        </Alan>
        <Alan etiket="Firma web sitesi (opsiyonel)">
          <input name="url" type="url" defaultValue={mevcut?.url ?? ""} placeholder="https://..." style={adminInput} />
        </Alan>
        <Alan etiket="Sıra (büyük üstte)">
          <input name="sira" type="number" defaultValue={mevcut?.sira ?? 0} style={adminInput} />
        </Alan>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="yayinda" defaultChecked={mevcut ? mevcut.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Yayında (sitede göster)
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={btnBirincil}>Kaydet</button>
          <Link href="/admin/referanslar" style={btnIkincil}>İptal</Link>
        </div>
      </form>
    </div>
  );
}
