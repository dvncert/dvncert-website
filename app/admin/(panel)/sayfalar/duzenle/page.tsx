import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { ozelSayfalar } from "@/lib/db/schema";
import { sablonBul } from "@/lib/sablonlar";
import { ozelSayfaKaydet } from "../../actions";
import { Alan, SayfaBaslik, adminInput, adminKart, btnBirincil, btnIkincil } from "../../_ui";

export default async function OzelSayfaDuzenle({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; sablon?: string }>;
}) {
  const sp = await searchParams;

  // Mevcut sayfa yükle (id varsa) veya yeni şablonu hazırla
  const mevcut = sp.id
    ? (await db.select().from(ozelSayfalar).where(eq(ozelSayfalar.id, Number(sp.id))).limit(1))[0]
    : null;

  const sablonId = mevcut?.sablon ?? sp.sablon ?? "metin";
  const sablon = sablonBul(sablonId);

  if (!sablon) {
    return (
      <div>
        <SayfaBaslik baslik="Hatalı şablon" />
        <p style={{ color: "#b91c1c" }}>Şablon bulunamadı: {sablonId}</p>
        <Link href="/admin/sayfalar" style={btnIkincil}>Geri dön</Link>
      </div>
    );
  }

  const mevcutVeri: Record<string, string> = (mevcut?.veri ?? {}) as Record<string, string>;

  return (
    <div style={{ maxWidth: 820 }}>
      <SayfaBaslik
        baslik={mevcut ? `Sayfayı Düzenle — ${mevcut.baslik}` : `Yeni Sayfa — ${sablon.ad}`}
      />

      <div style={{ ...adminKart, marginBottom: 22 }}>
        <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: 0, lineHeight: 1.6 }}>
          {sablon.ikon} <strong style={{ color: "var(--dvn-lacivert)" }}>{sablon.ad}</strong>
          {" — "}{sablon.aciklama}
        </p>
      </div>

      <form action={ozelSayfaKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}
        <input type="hidden" name="sablon" value={sablonId} />

        {/* Temel başlık alanları */}
        <Alan etiket="Başlık (sayfa üstünde büyük başlık)">
          <input name="baslik" required defaultValue={mevcut?.baslik ?? ""} style={adminInput} />
        </Alan>
        <Alan etiket="Slug (URL — küçük harf, rakam, tire)">
          <input
            name="slug"
            required
            defaultValue={mevcut?.slug ?? ""}
            placeholder="ornek-yeni-sayfa"
            pattern="[a-z0-9-]+"
            style={{ ...adminInput, fontFamily: "monospace" }}
          />
          <p style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", margin: "4px 0 0" }}>
            Site adresi: <code>dvncert.com/&lt;slug&gt;</code>. Sistem yollarıyla çakışan slug'lar (admin, blog, hizmetler vb.) kabul edilmez.
          </p>
        </Alan>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
          <Alan etiket="Üst etiket (opsiyonel)">
            <input name="ustEtiket" defaultValue={mevcut?.ustEtiket ?? ""} placeholder="KURUMSAL" style={adminInput} />
          </Alan>
          <Alan etiket="Sayfa açıklaması (başlığın altında, opsiyonel)">
            <input name="aciklama" defaultValue={mevcut?.aciklama ?? ""} style={adminInput} />
          </Alan>
        </div>

        {/* Şablon-özel alanlar */}
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-gri-700)", margin: "26px 0 14px", letterSpacing: 0.3 }}>
          İÇERİK
        </h2>
        {sablon.alanlar.map((alan) => (
          <Alan key={alan.anahtar} etiket={alan.etiket + (alan.zorunlu ? " *" : "")}>
            {alan.tip === "input" ? (
              <input
                name={alan.anahtar}
                required={alan.zorunlu}
                defaultValue={mevcutVeri[alan.anahtar] ?? ""}
                style={adminInput}
              />
            ) : (
              <textarea
                name={alan.anahtar}
                required={alan.zorunlu}
                rows={alan.tip === "textarea-uzun" ? 10 : 3}
                defaultValue={mevcutVeri[alan.anahtar] ?? ""}
                style={{ ...adminInput, resize: "vertical", minHeight: alan.tip === "textarea-uzun" ? 180 : undefined }}
              />
            )}
            {alan.yardim && (
              <p style={{ fontSize: 11.5, color: "var(--dvn-gri-500)", margin: "4px 0 0", lineHeight: 1.5 }}>{alan.yardim}</p>
            )}
          </Alan>
        ))}

        {/* SEO */}
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-gri-700)", margin: "26px 0 14px", letterSpacing: 0.3 }}>
          SEO AYARLARI
        </h2>
        <Alan etiket="Meta başlık (boş bırakılırsa başlık kullanılır)">
          <input name="seoTitle" defaultValue={mevcut?.seoTitle ?? ""} style={adminInput} />
        </Alan>
        <Alan etiket="Meta açıklama (140-160 karakter ideal)">
          <textarea name="seoDescription" rows={2} defaultValue={mevcut?.seoDescription ?? ""} style={{ ...adminInput, resize: "vertical" }} />
        </Alan>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="noIndex" defaultChecked={mevcut?.noIndex ?? false} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Arama motorlarına kapat (noindex)
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 14, color: "var(--dvn-lacivert)" }}>
          <input type="checkbox" name="yayinda" defaultChecked={mevcut ? mevcut.yayinda : true} style={{ width: 16, height: 16, accentColor: "var(--dvn-turuncu)" }} />
          Yayında (kapalıysa sayfa erişilemez)
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={btnBirincil}>{mevcut ? "Kaydet" : "Sayfayı Oluştur"}</button>
          <Link href="/admin/sayfalar" style={btnIkincil}>İptal</Link>
        </div>
      </form>
    </div>
  );
}
