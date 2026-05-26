import { Suspense } from "react";
import Link from "next/link";
import { sql } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import { db } from "@/lib/db";
import { duyurular, blogYazilari, yorumlar, referanslar, formGonderileri, egitimEtkinlikleri } from "@/lib/db/schema";
import { SayfaBaslik, adminKart } from "./_ui";
import { AnalitikBolum, AramaBolum } from "./_analitik";

async function say(tbl: PgTable): Promise<number> {
  try {
    const r = await db.select({ c: sql<number>`count(*)` }).from(tbl);
    return Number(r[0]?.c ?? 0);
  } catch {
    return 0;
  }
}

function Yukleniyor({ ad }: { ad: string }) {
  return (
    <div style={{ ...adminKart, color: "var(--dvn-gri-500)", fontSize: 13 }}>{ad} yükleniyor…</div>
  );
}

export default async function Panel() {
  const [d, b, e, y, r, g] = await Promise.all([
    say(duyurular),
    say(blogYazilari),
    say(egitimEtkinlikleri),
    say(yorumlar),
    say(referanslar),
    say(formGonderileri),
  ]);

  const kartlar = [
    { ad: "Duyurular", sayi: d, href: "/admin/duyurular" },
    { ad: "Blog Yazıları", sayi: b, href: "/admin/blog" },
    { ad: "Etkinlikler", sayi: e, href: "/admin/etkinlikler" },
    { ad: "Müşteri Yorumları", sayi: y, href: "/admin/yorumlar" },
    { ad: "Referanslar", sayi: r, href: "/admin/referanslar" },
    { ad: "Form Gönderileri", sayi: g, href: "/admin/gonderiler" },
  ];

  return (
    <div>
      <SayfaBaslik baslik="Genel Bakış" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
        {kartlar.map((k) => (
          <Link key={k.href} href={k.href} style={{ ...adminKart, textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "var(--dvn-lacivert)" }}>{k.sayi}</div>
            <div style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", marginTop: 4 }}>{k.ad}</div>
          </Link>
        ))}
      </div>

      <Suspense fallback={<div style={{ marginTop: 32 }}><Yukleniyor ad="Ziyaretçi istatistikleri" /></div>}>
        <AnalitikBolum />
      </Suspense>

      <Suspense fallback={<div style={{ marginTop: 32 }}><Yukleniyor ad="Arama performansı" /></div>}>
        <AramaBolum />
      </Suspense>
    </div>
  );
}
