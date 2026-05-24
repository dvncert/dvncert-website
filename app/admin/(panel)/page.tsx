import Link from "next/link";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { duyurular, blogYazilari, yorumlar, referanslar, formGonderileri } from "@/lib/db/schema";
import { SayfaBaslik, adminKart } from "./_ui";
import type { PgTable } from "drizzle-orm/pg-core";

async function say(tbl: PgTable): Promise<number> {
  try {
    const r = await db.select({ c: sql<number>`count(*)` }).from(tbl);
    return Number(r[0]?.c ?? 0);
  } catch {
    return 0;
  }
}

export default async function Panel() {
  const [d, b, y, r, g] = await Promise.all([
    say(duyurular),
    say(blogYazilari),
    say(yorumlar),
    say(referanslar),
    say(formGonderileri),
  ]);

  const kartlar = [
    { ad: "Duyurular", sayi: d, href: "/admin/duyurular" },
    { ad: "Blog Yazıları", sayi: b, href: "/admin/blog" },
    { ad: "Müşteri Yorumları", sayi: y, href: "/admin/yorumlar" },
    { ad: "Referanslar", sayi: r, href: "/admin/referanslar" },
    { ad: "Form Gönderileri", sayi: g, href: "/admin/gonderiler" },
  ];

  return (
    <div>
      <SayfaBaslik baslik="Genel Bakış" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {kartlar.map((k) => (
          <Link key={k.href} href={k.href} style={{ ...adminKart, textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "var(--dvn-lacivert)" }}>{k.sayi}</div>
            <div style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", marginTop: 4 }}>{k.ad}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
