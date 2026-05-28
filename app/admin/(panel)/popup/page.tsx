import { asc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { popup } from "@/lib/db/schema";
import { popupKaydet } from "../actions";
import { Alan, adminInput, btnBirincil, SayfaBaslik } from "../_ui";

export default async function PopupPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;

  const mevcut = (
    await db
      .select({
        id: popup.id,
        aktif: popup.aktif,
        baslik: popup.baslik,
        metin: popup.metin,
        butonYazi: popup.butonYazi,
        butonUrl: popup.butonUrl,
        gorselAlt: popup.gorselAlt,
        gorselVar: sql<boolean>`${popup.gorselVeri} is not null`,
        guncellenme: popup.guncellenme,
      })
      .from(popup)
      .orderBy(asc(popup.id))
      .limit(1)
  )[0];

  return (
    <div style={{ maxWidth: 640 }}>
      <SayfaBaslik baslik="Pop-up" />

      {ok && (
        <div
          style={{
            background: "#ecfdf5",
            border: "0.5px solid #a7f3d0",
            color: "#065f46",
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 13,
            marginBottom: 18,
          }}
        >
          ✓ Pop-up kaydedildi. Site genelinde 1–2 dakikada güncellenir.
        </div>
      )}

      <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 18px", lineHeight: 1.6 }}>
        Tüm site sayfalarında ziyaretçiye gösterilen açılır pencere (modal). &quot;Aktif&quot; işaretliyse
        yayında olur. Pop-up&apos;ı her güncellediğinizde, daha önce kapatmış olan ziyaretçilere bir kez
        daha gösterilir.
      </p>

      <form action={popupKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 22,
            fontSize: 14,
            color: "var(--dvn-lacivert)",
            fontWeight: 600,
          }}
        >
          <input
            type="checkbox"
            name="aktif"
            defaultChecked={mevcut ? mevcut.aktif : false}
            style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }}
          />
          Aktif (pop-up&apos;ı sitede göster)
        </label>

        <Alan etiket="Başlık (opsiyonel)">
          <input name="baslik" defaultValue={mevcut?.baslik ?? ""} placeholder="Örn. Yeni eğitim takvimimiz yayında!" style={adminInput} />
        </Alan>

        <Alan etiket="Metin (opsiyonel)">
          <textarea
            name="metin"
            rows={4}
            defaultValue={mevcut?.metin ?? ""}
            placeholder="Pop-up içeriği..."
            style={{ ...adminInput, resize: "vertical" }}
          />
        </Alan>

        <Alan etiket="Görsel — önerilen: 800×600 px (4:3) · PNG / JPG / WebP (sistem otomatik WebP'e çevirir)">
          {mevcut?.gorselVar && (
            <div style={{ marginBottom: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/gorsel/popup/${mevcut.id}?v=${new Date(mevcut.guncellenme).getTime()}`}
                alt="Mevcut pop-up görseli"
                style={{ maxHeight: 160, width: "auto", borderRadius: 8, border: "0.5px solid var(--dvn-gri-300)" }}
              />
              <label style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 0", fontSize: 13, color: "var(--dvn-gri-700)" }}>
                <input type="checkbox" name="gorselKaldir" style={{ width: 15, height: 15, accentColor: "var(--dvn-turuncu)" }} />
                Görseli kaldır
              </label>
            </div>
          )}
          <input type="file" name="gorselDosya" accept="image/png,image/jpeg,image/webp" style={{ ...adminInput, padding: 8 }} />
          {mevcut?.gorselVar && (
            <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "6px 0 0" }}>
              Görseli değiştirmek istemiyorsan boş bırak.
            </p>
          )}
        </Alan>

        <Alan etiket="Görsel alt metni (erişilebilirlik — opsiyonel)">
          <input name="gorselAlt" defaultValue={mevcut?.gorselAlt ?? ""} placeholder="Görseli açıklayan kısa metin" style={adminInput} />
        </Alan>

        <Alan etiket="Buton metni (opsiyonel)">
          <input name="butonYazi" defaultValue={mevcut?.butonYazi ?? ""} placeholder="Örn. Detaylı bilgi" style={adminInput} />
        </Alan>

        <Alan etiket="Buton / görsel bağlantısı (opsiyonel)">
          <input name="butonUrl" type="url" defaultValue={mevcut?.butonUrl ?? ""} placeholder="https://..." style={adminInput} />
          <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "6px 0 0" }}>
            Bağlantı girilirse hem buton hem de görsel bu adrese yönlendirir.
          </p>
        </Alan>

        <button type="submit" style={btnBirincil}>
          Kaydet
        </button>
      </form>
    </div>
  );
}
