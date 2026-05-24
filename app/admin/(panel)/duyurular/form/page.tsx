import Link from "next/link";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { duyurular } from "@/lib/db/schema";
import { duyuruKaydet } from "../../actions";
import { Alan, adminInput, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";

export default async function DuyuruForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const mevcut = id
    ? (
        await db
          .select({
            id: duyurular.id,
            slug: duyurular.slug,
            baslik: duyurular.baslik,
            tarih: duyurular.tarih,
            kategori: duyurular.kategori,
            ozet: duyurular.ozet,
            icerik: duyurular.icerik,
            gorselAlt: duyurular.gorselAlt,
            ilgiliHizmetler: duyurular.ilgiliHizmetler,
            yayinda: duyurular.yayinda,
            gorselVar: sql<boolean>`${duyurular.gorselVeri} is not null`,
          })
          .from(duyurular)
          .where(eq(duyurular.id, Number(id)))
      )[0]
    : null;

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
        <Alan etiket="Kapak görseli (PNG / JPG / WebP — sistem otomatik WebP'e çevirir, opsiyonel)">
          {mevcut?.gorselVar && (
            <div style={{ marginBottom: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/gorsel/duyuru/${mevcut.id}`}
                alt="Mevcut görsel"
                style={{ height: 70, width: "auto", borderRadius: 6, border: "0.5px solid var(--dvn-gri-300)" }}
              />
            </div>
          )}
          <input type="file" name="gorselDosya" accept="image/png,image/jpeg,image/webp" style={{ ...adminInput, padding: 8 }} />
          {mevcut?.gorselVar && (
            <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "6px 0 0" }}>
              Görseli değiştirmek istemiyorsan boş bırak.
            </p>
          )}
        </Alan>
        <Alan etiket="Görsel alt metni (SEO / erişilebilirlik — opsiyonel)">
          <input name="gorselAlt" defaultValue={mevcut?.gorselAlt ?? ""} placeholder="Görseli betimleyen kısa metin" style={adminInput} />
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
