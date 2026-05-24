import Link from "next/link";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { referanslar } from "@/lib/db/schema";
import { referansKaydet } from "../../actions";
import { Alan, adminInput, btnBirincil, btnIkincil, SayfaBaslik } from "../../_ui";

export default async function ReferansForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const mevcut = id
    ? (
        await db
          .select({
            id: referanslar.id,
            ad: referanslar.ad,
            url: referanslar.url,
            sira: referanslar.sira,
            yayinda: referanslar.yayinda,
            logoVar: sql<boolean>`${referanslar.logoVeri} is not null`,
          })
          .from(referanslar)
          .where(eq(referanslar.id, Number(id)))
      )[0]
    : null;

  return (
    <div style={{ maxWidth: 560 }}>
      <SayfaBaslik baslik={mevcut ? "Referans Düzenle" : "Yeni Referans"} />
      <form action={referansKaydet}>
        {mevcut && <input type="hidden" name="id" value={mevcut.id} />}

        <Alan etiket="Firma adı (logo alt metni)">
          <input name="ad" required defaultValue={mevcut?.ad ?? ""} style={adminInput} />
        </Alan>

        <Alan etiket="Logo dosyası (PNG / JPG / SVG / WebP — sistem otomatik WebP'e çevirir)">
          {mevcut?.logoVar && (
            <div style={{ marginBottom: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/gorsel/referans/${mevcut.id}`}
                alt="Mevcut logo"
                style={{ height: 46, width: "auto", background: "var(--dvn-gri-50)", padding: 6, borderRadius: 6, border: "0.5px solid var(--dvn-gri-300)" }}
              />
            </div>
          )}
          <input type="file" name="logoDosya" accept="image/png,image/jpeg,image/webp,image/svg+xml" required={!mevcut} style={{ ...adminInput, padding: 8 }} />
          {mevcut && (
            <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: "6px 0 0" }}>
              Logoyu değiştirmek istemiyorsan boş bırak.
            </p>
          )}
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
