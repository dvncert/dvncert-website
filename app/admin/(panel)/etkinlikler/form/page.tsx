import Link from "next/link";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { egitimEtkinlikleri } from "@/lib/db/schema";
import { etkinlikKaydet } from "../../actions";
import { Alan, adminInput, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";

/** Tarih nesnesini <input type="datetime-local"> değerine çevir (yerel saat). */
function dt(d: Date | null): string {
  if (!d) return "";
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 16);
}

export default async function EtkinlikForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const mevcut = id
    ? (
        await db
          .select({
            id: egitimEtkinlikleri.id,
            slug: egitimEtkinlikleri.slug,
            baslik: egitimEtkinlikleri.baslik,
            kategori: egitimEtkinlikleri.kategori,
            baslangic: egitimEtkinlikleri.baslangic,
            bitis: egitimEtkinlikleri.bitis,
            yer: egitimEtkinlikleri.yer,
            ozet: egitimEtkinlikleri.ozet,
            icerik: egitimEtkinlikleri.icerik,
            gorselAlt: egitimEtkinlikleri.gorselAlt,
            kayitUrl: egitimEtkinlikleri.kayitUrl,
            ucretli: egitimEtkinlikleri.ucretli,
            seoTitle: egitimEtkinlikleri.seoTitle,
            seoDescription: egitimEtkinlikleri.seoDescription,
            noIndex: egitimEtkinlikleri.noIndex,
            yayinda: egitimEtkinlikleri.yayinda,
            gorselVar: sql<boolean>`${egitimEtkinlikleri.gorselVeri} is not null`,
            guncellenme: egitimEtkinlikleri.guncellenme,
          })
          .from(egitimEtkinlikleri)
          .where(eq(egitimEtkinlikleri.id, Number(id)))
      )[0]
    : null;

  return (
    <div style={{ maxWidth: 760 }}>
      <SayfaBaslik baslik={mevcut ? "Etkinlik Düzenle" : "Yeni Etkinlik"} />
      <form action={etkinlikKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}

        <Alan etiket="Başlık">
          <input name="baslik" required defaultValue={mevcut?.baslik ?? ""} style={adminInput} />
        </Alan>
        <Alan etiket="Slug (URL'de görünen kısa ad, ör. iso-9001-egitimi-haziran)">
          <input name="slug" required defaultValue={mevcut?.slug ?? ""} style={adminInput} />
        </Alan>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Alan etiket="Kategori">
            <select name="kategori" defaultValue={mevcut?.kategori ?? "Eğitim"} style={adminInput}>
              <option value="Eğitim">Eğitim</option>
              <option value="Seminer">Seminer</option>
              <option value="Konferans">Konferans</option>
              <option value="Webinar">Webinar</option>
              <option value="Atölye">Atölye</option>
            </select>
          </Alan>
          <Alan etiket="Yer (ör. İstanbul / Online)">
            <input name="yer" required defaultValue={mevcut?.yer ?? ""} placeholder="İstanbul / Online" style={adminInput} />
          </Alan>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Alan etiket="Başlangıç tarih/saat">
            <input
              type="datetime-local"
              name="baslangic"
              required
              defaultValue={dt(mevcut?.baslangic ?? null)}
              style={adminInput}
            />
          </Alan>
          <Alan etiket="Bitiş (opsiyonel — tek günlükse boş)">
            <input
              type="datetime-local"
              name="bitis"
              defaultValue={dt(mevcut?.bitis ?? null)}
              style={adminInput}
            />
          </Alan>
        </div>
        <Alan etiket="Özet (kart ve meta açıklaması için 1-2 cümle)">
          <textarea name="ozet" required rows={2} defaultValue={mevcut?.ozet ?? ""} style={{ ...adminInput, resize: "vertical" }} />
        </Alan>
        <Alan etiket="İçerik (paragraflar boş satırla ayrılır)">
          <textarea name="icerik" required rows={10} defaultValue={mevcut?.icerik ?? ""} style={{ ...adminInput, resize: "vertical", minHeight: 200 }} />
          <p style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", margin: "4px 0 0", lineHeight: 1.5 }}>
            Paragraflar arasında boş bir satır bırakın. URL yazdığınızda otomatik link olur. Metin üzerine link
            için: <code>[bağlantı metni](https://...)</code> biçimini kullanabilirsiniz.
          </p>
        </Alan>
        <Alan etiket="Kapak görseli — önerilen: 1600×900 px (16:9) · PNG / JPG / WebP (sistem otomatik WebP'e çevirir, opsiyonel)">
          {mevcut?.gorselVar && (
            <div style={{ marginBottom: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/gorsel/etkinlik/${mevcut.id}?v=${new Date(mevcut.guncellenme).getTime()}`}
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
        <Alan etiket="Kayıt / başvuru URL'i (opsiyonel)">
          <input name="kayitUrl" type="url" defaultValue={mevcut?.kayitUrl ?? ""} placeholder="https://..." style={adminInput} />
        </Alan>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="ucretli" defaultChecked={mevcut?.ucretli ?? false} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Ücretli etkinlik
        </label>

        <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-gri-700)", margin: "20px 0 14px", letterSpacing: 0.3 }}>
          SEO AYARLARI
        </h2>
        <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 14px", lineHeight: 1.5 }}>
          Boş bırakılırsa Google&apos;a başlık ve özet alanları gönderilir. Sadece bu sayfayı farklılaştırmak istersen doldur.
        </p>
        <Alan etiket="Meta başlık (opsiyonel — 50-60 karakter ideal)">
          <input name="seoTitle" defaultValue={mevcut?.seoTitle ?? ""} placeholder="Boş bırakılırsa etkinlik başlığı kullanılır" style={adminInput} />
        </Alan>
        <Alan etiket="Meta açıklama (opsiyonel — 140-160 karakter ideal)">
          <textarea name="seoDescription" rows={2} defaultValue={mevcut?.seoDescription ?? ""} placeholder="Boş bırakılırsa özet alanı kullanılır" style={{ ...adminInput, resize: "vertical" }} />
        </Alan>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="noIndex" defaultChecked={mevcut?.noIndex ?? false} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Arama motorlarına kapat (noindex) — bu sayfa Google&apos;da listelenmesin
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="yayinda" defaultChecked={mevcut ? mevcut.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Yayında
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={btnBirincil}>Kaydet</button>
          <Link href="/admin/etkinlikler" style={btnIkincil}>İptal</Link>
        </div>
      </form>
    </div>
  );
}
