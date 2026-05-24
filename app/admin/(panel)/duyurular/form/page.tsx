import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { duyurular } from "@/lib/db/schema";
import { duyuruKaydet } from "../../actions";
import { Alan, adminInput, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";

export default async function DuyuruForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const mevcut = id ? (await db.select().from(duyurular).where(eq(duyurular.id, Number(id))))[0] : null;

  return (
    <div style={{ maxWidth: 760 }}>
      <SayfaBaslik baslik={mevcut ? "Duyuru Düzenle" : "Yeni Duyuru"} />
      <form action={duyuruKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}

        <Alan etiket="Başlık">
          <input name="baslik" required defaultValue={mevcut?.baslik ?? ""} style={adminInput} />
        </Alan>
        <Alan etiket="Slug (URL'de görünen kısa ad, ör. yeni-duyuru)">
          <input name="slug" required defaultValue={mevcut?.slug ?? ""} style={adminInput} />
        </Alan>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Alan etiket="Tarih (YYYY-AA-GG)">
            <input name="tarih" required defaultValue={mevcut?.tarih ?? ""} placeholder="2026-05-25" style={adminInput} />
          </Alan>
          <Alan etiket="Kategori">
            <input name="kategori" required defaultValue={mevcut?.kategori ?? "Duyuru"} style={adminInput} />
          </Alan>
        </div>
        <Alan etiket="Özet (kart ve meta açıklaması)">
          <textarea name="ozet" required rows={2} defaultValue={mevcut?.ozet ?? ""} style={{ ...adminInput, resize: "vertical" }} />
        </Alan>
        <Alan etiket="İçerik (paragraflar boş satırla ayrılır)">
          <textarea name="icerik" required rows={10} defaultValue={mevcut?.icerik ?? ""} style={{ ...adminInput, resize: "vertical", minHeight: 200 }} />
        </Alan>
        <Alan etiket="Görsel yolu (opsiyonel)">
          <input name="gorsel" defaultValue={mevcut?.gorsel ?? ""} placeholder="/gorseller/duyurular/ornek.webp" style={adminInput} />
        </Alan>
        <Alan etiket="İlgili hizmet slug'ları (virgülle ayır, opsiyonel)">
          <input name="ilgiliHizmetler" defaultValue={(mevcut?.ilgiliHizmetler ?? []).join(", ")} placeholder="iso-9001, iso-14001" style={adminInput} />
        </Alan>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="yayinda" defaultChecked={mevcut ? mevcut.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Yayında
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={btnBirincil}>Kaydet</button>
          <Link href="/admin/duyurular" style={btnIkincil}>İptal</Link>
        </div>
      </form>
    </div>
  );
}
