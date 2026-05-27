import Link from "next/link";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogYazilari } from "@/lib/db/schema";
import { blogKaydet } from "../../actions";
import { Alan, adminInput, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";

export default async function BlogForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const mevcut = id
    ? (
        await db
          .select({
            id: blogYazilari.id,
            slug: blogYazilari.slug,
            baslik: blogYazilari.baslik,
            ozet: blogYazilari.ozet,
            tarih: blogYazilari.tarih,
            kategori: blogYazilari.kategori,
            yazar: blogYazilari.yazar,
            gorselAlt: blogYazilari.gorselAlt,
            icerik: blogYazilari.icerik,
            ilgiliHizmetler: blogYazilari.ilgiliHizmetler,
            yayinda: blogYazilari.yayinda,
            gorselVar: sql<boolean>`${blogYazilari.gorselVeri} is not null`,
          })
          .from(blogYazilari)
          .where(eq(blogYazilari.id, Number(id)))
      )[0]
    : null;

  return (
    <div style={{ maxWidth: 760 }}>
      <SayfaBaslik baslik={mevcut ? "Yazı Düzenle" : "Yeni Yazı"} />
      <form action={blogKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}

        <Alan etiket="Başlık">
          <input name="baslik" required defaultValue={mevcut?.baslik ?? ""} style={adminInput} />
        </Alan>
        <Alan etiket="Slug (URL'de görünen kısa ad)">
          <input name="slug" required defaultValue={mevcut?.slug ?? ""} style={adminInput} />
        </Alan>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Alan etiket="Tarih (YYYY-AA-GG)">
            <input name="tarih" required defaultValue={mevcut?.tarih ?? ""} placeholder="2026-05-25" style={adminInput} />
          </Alan>
          <Alan etiket="Kategori">
            <input name="kategori" required defaultValue={mevcut?.kategori ?? "Yönetim Sistemleri"} style={adminInput} />
          </Alan>
        </div>
        <Alan etiket="Yazar (opsiyonel)">
          <input name="yazar" defaultValue={mevcut?.yazar ?? ""} placeholder="DVN Cert" style={adminInput} />
        </Alan>
        <Alan etiket="Özet">
          <textarea name="ozet" required rows={2} defaultValue={mevcut?.ozet ?? ""} style={{ ...adminInput, resize: "vertical" }} />
        </Alan>
        <Alan etiket="İçerik (## Alt başlık, ### H3, - madde; paragraflar boş satırla ayrılır)">
          <textarea name="icerik" required rows={14} defaultValue={mevcut?.icerik ?? ""} style={{ ...adminInput, resize: "vertical", minHeight: 280 }} />
          <p style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", margin: "4px 0 0", lineHeight: 1.5 }}>
            URL yazdığınızda otomatik link olur. Metin üzerine link için: <code>[bağlantı metni](https://...)</code>.
          </p>
        </Alan>
        <Alan etiket="Kapak görseli (PNG / JPG / WebP — sistem otomatik WebP'e çevirir, opsiyonel)">
          {mevcut?.gorselVar && (
            <div style={{ marginBottom: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/gorsel/blog/${mevcut.id}`}
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
          <input name="ilgiliHizmetler" defaultValue={(mevcut?.ilgiliHizmetler ?? []).join(", ")} placeholder="iso-9001, sistem-belgelendirme" style={adminInput} />
        </Alan>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="yayinda" defaultChecked={mevcut ? mevcut.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Yayında
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={btnBirincil}>Kaydet</button>
          <Link href="/admin/blog" style={btnIkincil}>İptal</Link>
        </div>
      </form>
    </div>
  );
}
