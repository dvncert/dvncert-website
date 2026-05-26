import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteAyarlari } from "@/lib/db/schema";
import { siteAyarlariKaydet } from "../actions";
import { Alan, adminInput, btnBirincil, SayfaBaslik } from "../_ui";
import { SOSYAL_AYAR_ANAHTARLARI } from "@/lib/site-ayarlari";

export default async function SiteAyarlariPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;

  const rows = await db
    .select({ anahtar: siteAyarlari.anahtar, deger: siteAyarlari.deger })
    .from(siteAyarlari)
    .where(inArray(siteAyarlari.anahtar, SOSYAL_AYAR_ANAHTARLARI as unknown as string[]));
  const harita = new Map(rows.map((r) => [r.anahtar, r.deger]));
  const al = (k: string) => harita.get(k) ?? "";

  return (
    <div style={{ maxWidth: 640 }}>
      <SayfaBaslik baslik="Site Ayarları" />

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
          ✓ Ayarlar kaydedildi. Site genelinde 1–2 dakikada güncellenir.
        </div>
      )}

      <form action={siteAyarlariKaydet}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-gri-700)", margin: "0 0 14px", letterSpacing: 0.3 }}>
          SOSYAL MEDYA HESAPLARI
        </h2>
        <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 18px", lineHeight: 1.5 }}>
          Tam URL girin (örn. <code>https://www.linkedin.com/company/dvncert</code>). Boş bıraktığınız
          platform sitede hiç görünmez. Değişiklik kaydedildiğinde footer ve blog &quot;Bizi Takip Et&quot;
          köşesi otomatik güncellenir.
        </p>

        <Alan etiket="LinkedIn URL">
          <input
            name="linkedin"
            type="url"
            defaultValue={al("sosyal.linkedin")}
            placeholder="https://www.linkedin.com/company/..."
            style={adminInput}
          />
        </Alan>
        <Alan etiket="Instagram URL">
          <input
            name="instagram"
            type="url"
            defaultValue={al("sosyal.instagram")}
            placeholder="https://www.instagram.com/..."
            style={adminInput}
          />
        </Alan>
        <Alan etiket="Twitter / X URL (opsiyonel)">
          <input
            name="twitter"
            type="url"
            defaultValue={al("sosyal.twitter")}
            placeholder="https://x.com/..."
            style={adminInput}
          />
        </Alan>
        <Alan etiket="Facebook URL (opsiyonel)">
          <input
            name="facebook"
            type="url"
            defaultValue={al("sosyal.facebook")}
            placeholder="https://www.facebook.com/..."
            style={adminInput}
          />
        </Alan>

        <button type="submit" style={btnBirincil}>
          Kaydet
        </button>
      </form>
    </div>
  );
}
