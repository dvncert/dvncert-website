import Link from "next/link";
import type { CSSProperties } from "react";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { ozelSayfalar } from "@/lib/db/schema";
import { SABLONLAR, sablonBul } from "@/lib/sablonlar";
import { ozelSayfaSil } from "../actions";
import { SayfaBaslik, adminTablo, adminKart } from "../_ui";
import SilButonu from "../_SilButonu";

const hucre: CSSProperties = { padding: "10px 12px", textAlign: "left", verticalAlign: "middle" };

export default async function OzelSayfalarListe() {
  const rows = await db.select().from(ozelSayfalar).orderBy(desc(ozelSayfalar.id));

  return (
    <div>
      <SayfaBaslik baslik="Özel Sayfalar" />

      <p style={{ fontSize: 13, color: "var(--dvn-gri-500)", margin: "0 0 22px", lineHeight: 1.6, maxWidth: 760 }}>
        Site içinde yeni sayfalar oluşturun. Bir şablon seçin, içerikleri girin; sayfa otomatik olarak{" "}
        <code>dvncert.com/&lt;slug&gt;</code> altında yayınlansın.
      </p>

      {/* Şablon seçici (yeni sayfa için) */}
      <div style={{ ...adminKart, marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 6px" }}>
          Yeni Sayfa Oluştur
        </h2>
        <p style={{ fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "0 0 18px" }}>
          Aşağıdaki şablonlardan birini seçin; sonra başlık, slug ve içeriği gireceğiniz forma yönlendirileceksiniz.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {SABLONLAR.map((s) => (
            <Link
              key={s.id}
              href={`/admin/sayfalar/duzenle?sablon=${encodeURIComponent(s.id)}`}
              className="dvn-sablon-kart"
              style={{
                display: "block",
                background: "var(--dvn-gri-50)",
                border: "0.5px solid var(--dvn-gri-300)",
                borderRadius: 12,
                padding: "16px 16px",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.ikon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 4px" }}>
                {s.ad}
              </div>
              <div style={{ fontSize: 12, color: "var(--dvn-gri-500)", lineHeight: 1.5 }}>{s.aciklama}</div>
            </Link>
          ))}
        </div>
        <style>{`
          .dvn-sablon-kart:hover {
            background: white !important;
            border-color: var(--dvn-turuncu-acik) !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(2,35,152,0.08);
          }
        `}</style>
      </div>

      {/* Mevcut sayfalar listesi */}
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 14px" }}>
        Mevcut Özel Sayfalar
      </h2>
      <div style={{ overflowX: "auto", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 12 }}>
        <table style={adminTablo}>
          <thead>
            <tr style={{ background: "var(--dvn-gri-50)", color: "var(--dvn-gri-700)" }}>
              <th style={hucre}>Başlık</th>
              <th style={hucre}>Slug (URL)</th>
              <th style={hucre}>Şablon</th>
              <th style={hucre}>Durum</th>
              <th style={hucre}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const sablon = sablonBul(r.sablon);
              return (
                <tr key={r.id} style={{ borderTop: "0.5px solid var(--dvn-gri-300)" }}>
                  <td style={{ ...hucre, color: "var(--dvn-lacivert)", fontWeight: 500 }}>{r.baslik}</td>
                  <td style={{ ...hucre, fontFamily: "monospace", fontSize: 12.5 }}>
                    <a href={`/${r.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--dvn-turuncu)" }}>
                      /{r.slug}
                    </a>
                  </td>
                  <td style={hucre}>{sablon ? `${sablon.ikon} ${sablon.ad}` : r.sablon}</td>
                  <td style={hucre}>{r.yayinda ? "Yayında" : "Taslak"}</td>
                  <td style={{ ...hucre, whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                      <Link href={`/admin/sayfalar/duzenle?id=${r.id}`} style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                        Düzenle
                      </Link>
                      <SilButonu id={r.id} action={ozelSayfaSil} />
                    </span>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td style={{ ...hucre, color: "var(--dvn-gri-500)" }} colSpan={5}>
                  Henüz özel sayfa oluşturulmadı. Yukarıdan bir şablon seçerek başlayın.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
