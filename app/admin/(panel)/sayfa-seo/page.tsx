import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { sayfaSeo } from "@/lib/db/schema";
import { sayfaSeoKaydet } from "../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, btnBirincil } from "../_ui";

/**
 * Yönetilebilir statik sayfalar. Yeni eklemek isterse yol string'i admin'in
 * elinde — açılır listede olmayan bir yolu doğrudan girip kaydedebilirsin.
 */
const SAYFA_LISTESI: { yol: string; ad: string; varsayilanTitle: string; varsayilanDesc: string }[] = [
  { yol: "/", ad: "Ana sayfa", varsayilanTitle: "DVN Cert Belgelendirme - ISO Belgelendirme, Denetim ve Eğitim", varsayilanDesc: "ISO 9001, 14001, 45001 ve 50001 için bağımsız, tarafsız ve izlenebilir süreç yönetimi." },
  { yol: "/hakkimizda", ad: "Hakkımızda", varsayilanTitle: "Hakkımızda | DVN Cert", varsayilanDesc: "" },
  { yol: "/ekibimiz", ad: "Ekibimiz", varsayilanTitle: "Ekibimiz | DVN Cert", varsayilanDesc: "DVN Cert'in alanında deneyimli baş denetçi ve teknik uzman kadrosu." },
  { yol: "/akreditasyonlarimiz", ad: "Akreditasyonumuz", varsayilanTitle: "Akreditasyonumuz | DVN Cert", varsayilanDesc: "TÜRKAK akreditasyonu (AB-0209-YS): ISO 9001, 14001, 45001 ve 50001 akreditasyon kapsamı ve sertifikamız." },
  { yol: "/politika-ve-beyanlar", ad: "Politika ve Beyanlar", varsayilanTitle: "Politika ve Beyanlar | DVN Cert", varsayilanDesc: "" },
  { yol: "/logolarimiz", ad: "Logolarımız", varsayilanTitle: "Logolarımız | DVN Cert", varsayilanDesc: "" },
  { yol: "/dokumanlar", ad: "Dokümanlar", varsayilanTitle: "Dokümanlar | DVN Cert", varsayilanDesc: "" },
  { yol: "/sss", ad: "S.S.S.", varsayilanTitle: "S.S.S. | DVN Cert", varsayilanDesc: "" },
  { yol: "/iletisim", ad: "İletişim", varsayilanTitle: "İletişim | DVN Cert", varsayilanDesc: "" },
  { yol: "/kariyer", ad: "Kariyer", varsayilanTitle: "Kariyer | DVN Cert", varsayilanDesc: "" },
  { yol: "/hizmetler", ad: "Hizmetler (genel)", varsayilanTitle: "Hizmetler | DVN Cert", varsayilanDesc: "" },
  { yol: "/hizmetler/iso-9001", ad: "ISO 9001", varsayilanTitle: "ISO 9001 Kalite Yönetim Sistemi | DVN Cert", varsayilanDesc: "" },
  { yol: "/hizmetler/iso-14001", ad: "ISO 14001", varsayilanTitle: "ISO 14001 Çevre Yönetim Sistemi | DVN Cert", varsayilanDesc: "" },
  { yol: "/hizmetler/iso-45001", ad: "ISO 45001", varsayilanTitle: "ISO 45001 İSG Yönetim Sistemi | DVN Cert", varsayilanDesc: "" },
  { yol: "/hizmetler/iso-50001", ad: "ISO 50001", varsayilanTitle: "ISO 50001 Enerji Yönetim Sistemi | DVN Cert", varsayilanDesc: "" },
  { yol: "/blog", ad: "Blog", varsayilanTitle: "Blog ve Bilgi Merkezi | DVN Cert", varsayilanDesc: "" },
  { yol: "/duyurular", ad: "Duyurular", varsayilanTitle: "Duyurular | DVN Cert", varsayilanDesc: "" },
  { yol: "/etkinlikler", ad: "Etkinlikler", varsayilanTitle: "Eğitimler ve Etkinlikler | DVN Cert", varsayilanDesc: "" },
];

export default async function SayfaSeoYonetim({
  searchParams,
}: {
  searchParams: Promise<{ yol?: string; ok?: string }>;
}) {
  const sp = await searchParams;
  const yol = sp.yol ?? "/";
  const sayfa = SAYFA_LISTESI.find((s) => s.yol === yol);

  const mevcut = (
    await db
      .select({
        seoTitle: sayfaSeo.seoTitle,
        seoDescription: sayfaSeo.seoDescription,
        noIndex: sayfaSeo.noIndex,
        ogVar: sql<boolean>`${sayfaSeo.ogImageVeri} is not null`,
        guncellenme: sayfaSeo.guncellenme,
      })
      .from(sayfaSeo)
      .where(eq(sayfaSeo.yol, yol))
      .limit(1)
  )[0];

  return (
    <div style={{ maxWidth: 760 }}>
      <SayfaBaslik baslik="Sayfa SEO Ayarları" />

      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6 }}>
        Her statik sayfanın meta başlık, açıklama, OG görseli ve noindex ayarını buradan değiştirebilirsiniz.
        Boş bırakılan alanlar için sayfanın koddaki varsayılan değeri kullanılır.
      </p>

      {sp.ok && (
        <div style={{ background: "#ecfdf5", border: "0.5px solid #a7f3d0", color: "#065f46", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 18 }}>
          ✓ SEO ayarları kaydedildi.
        </div>
      )}

      <form method="get" style={{ marginBottom: 22 }}>
        <Alan etiket="Sayfa seç">
          <div style={{ display: "flex", gap: 10 }}>
            <select name="yol" defaultValue={yol} style={{ ...adminInput, flexGrow: 1 }}>
              {SAYFA_LISTESI.map((s) => (
                <option key={s.yol} value={s.yol}>{s.ad} ({s.yol})</option>
              ))}
            </select>
            <button type="submit" style={btnBirincil}>Yükle</button>
          </div>
        </Alan>
      </form>

      <form action={sayfaSeoKaydet} encType="multipart/form-data">
        <input type="hidden" name="yol" value={yol} />

        <div style={{ ...adminKart, marginBottom: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 14px" }}>
            {sayfa?.ad ?? yol}
          </h2>
          <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "0 0 16px" }}>
            Varsayılan başlık: <code style={{ fontSize: 11.5 }}>{sayfa?.varsayilanTitle ?? "—"}</code><br />
            {sayfa?.varsayilanDesc && <>Varsayılan açıklama: <code style={{ fontSize: 11.5 }}>{sayfa.varsayilanDesc}</code></>}
          </p>

          <Alan etiket="Meta başlık (boş bırakılırsa varsayılan kullanılır)">
            <input name="seoTitle" defaultValue={mevcut?.seoTitle ?? ""} placeholder={sayfa?.varsayilanTitle} style={adminInput} />
          </Alan>
          <Alan etiket="Meta açıklama (140-160 karakter ideal)">
            <textarea name="seoDescription" rows={3} defaultValue={mevcut?.seoDescription ?? ""} placeholder={sayfa?.varsayilanDesc} style={{ ...adminInput, resize: "vertical" }} />
          </Alan>
          <Alan etiket="OG / Twitter görseli — önerilen: 1200×630 px (sosyal medya paylaşımında görünür)">
            {mevcut?.ogVar && (
              <div style={{ marginBottom: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/gorsel/sayfa-seo/${encodeURIComponent(yol)}?v=${new Date(mevcut.guncellenme).getTime()}`} alt="OG görseli" style={{ maxWidth: 240, height: "auto", borderRadius: 6, border: "0.5px solid var(--dvn-gri-300)" }} />
              </div>
            )}
            <input type="file" name="ogImageDosya" accept="image/png,image/jpeg,image/webp" style={{ ...adminInput, padding: 8 }} />
          </Alan>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--dvn-lacivert)" }}>
            <input type="checkbox" name="noIndex" defaultChecked={mevcut?.noIndex ?? false} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
            Arama motorlarına kapat (noindex)
          </label>
        </div>

        <button type="submit" style={btnBirincil}>Kaydet</button>
      </form>
    </div>
  );
}
