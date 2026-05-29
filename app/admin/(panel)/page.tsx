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
  return <div style={{ ...adminKart, color: "var(--dvn-gri-500)", fontSize: 13 }}>{ad} yükleniyor…</div>;
}

/** Basit çizgi (Feather tarzı) ikon seti — admin kartları için. */
function Ikon({ ad }: { ad: string }) {
  const ortak = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (ad) {
    case "duyuru":
      return <svg {...ortak}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>;
    case "blog":
      return <svg {...ortak}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>;
    case "etkinlik":
      return <svg {...ortak}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "sss":
      return <svg {...ortak}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>;
    case "icerik":
      return <svg {...ortak}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>;
    case "sayfa":
      return <svg {...ortak}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
    case "ekip":
      return <svg {...ortak}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.7" /></svg>;
    case "akreditasyon":
      return <svg {...ortak}><circle cx="12" cy="8" r="6" /><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" /></svg>;
    case "logo":
      return <svg {...ortak}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>;
    case "dokuman":
      return <svg {...ortak}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
    case "referans":
      return <svg {...ortak}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case "yorum":
      return <svg {...ortak}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case "form":
      return <svg {...ortak}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z" /></svg>;
    case "menu":
      return <svg {...ortak}><path d="M3 12h18M3 6h18M3 18h18" /></svg>;
    case "popup":
      return <svg {...ortak}><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>;
    case "seo":
      return <svg {...ortak}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
    case "ayarlar":
      return <svg {...ortak}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H1a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 2.6 7a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 7 2.6h.1A1.7 1.7 0 0 0 8 1V1a2 2 0 0 1 4 0v.1A1.7 1.7 0 0 0 15 2.6a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V7a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>;
    default:
      return <svg {...ortak}><rect x="3" y="3" width="18" height="18" rx="2" /></svg>;
  }
}

type Kart = { ad: string; aciklama: string; href: string; ikon: string };

const gruplar: { baslik: string; kartlar: Kart[] }[] = [
  {
    baslik: "İÇERİK YÖNETİMİ",
    kartlar: [
      { ad: "Duyurular", aciklama: "Haber ve duyuru yazıları", href: "/admin/duyurular", ikon: "duyuru" },
      { ad: "Blog", aciklama: "Bilgi merkezi yazıları", href: "/admin/blog", ikon: "blog" },
      { ad: "Etkinlikler", aciklama: "Eğitim ve etkinlik takvimi", href: "/admin/etkinlikler", ikon: "etkinlik" },
      { ad: "S.S.S.", aciklama: "Sıkça sorulan sorular", href: "/admin/sss", ikon: "sss" },
      { ad: "Sayfa İçeriği", aciklama: "Statik sayfa metinleri", href: "/admin/icerik", ikon: "icerik" },
      { ad: "Özel Sayfalar", aciklama: "Şablonlu yeni sayfalar", href: "/admin/sayfalar", ikon: "sayfa" },
    ],
  },
  {
    baslik: "KURUMSAL & MEDYA",
    kartlar: [
      { ad: "Ekibimiz", aciklama: "Ekip üyeleri", href: "/admin/ekip", ikon: "ekip" },
      { ad: "Akreditasyonlar", aciklama: "Sertifika ve belgeler", href: "/admin/akreditasyonlar", ikon: "akreditasyon" },
      { ad: "Logolar", aciklama: "İndirilebilir logo dosyaları", href: "/admin/logolar", ikon: "logo" },
      { ad: "Dokümanlar", aciklama: "Politika, prosedür, form", href: "/admin/dokumanlar", ikon: "dokuman" },
      { ad: "Referanslar", aciklama: "Müşteri logoları", href: "/admin/referanslar", ikon: "referans" },
      { ad: "Müşteri Yorumları", aciklama: "Görüş ve değerlendirmeler", href: "/admin/yorumlar", ikon: "yorum" },
    ],
  },
  {
    baslik: "SİTE & AYARLAR",
    kartlar: [
      { ad: "Form Gönderileri", aciklama: "İletişim & başvurular", href: "/admin/gonderiler", ikon: "form" },
      { ad: "Üst Menü", aciklama: "Navigasyon ek öğeleri", href: "/admin/menu", ikon: "menu" },
      { ad: "Pop-up", aciklama: "Site geneli açılır pencere", href: "/admin/popup", ikon: "popup" },
      { ad: "Sayfa SEO", aciklama: "Başlık, açıklama, OG görseli", href: "/admin/sayfa-seo", ikon: "seo" },
      { ad: "Site Ayarları", aciklama: "Sosyal medya ve genel", href: "/admin/site-ayarlari", ikon: "ayarlar" },
    ],
  },
];

export default async function Panel() {
  const [d, b, e, y, r, g] = await Promise.all([
    say(duyurular),
    say(blogYazilari),
    say(egitimEtkinlikleri),
    say(yorumlar),
    say(referanslar),
    say(formGonderileri),
  ]);

  const istatistik = [
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

      {/* Özet sayıları */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14, marginBottom: 36 }}>
        {istatistik.map((k) => (
          <Link key={k.href} href={k.href} className="dvn-stat-kart" style={{ ...adminKart, textDecoration: "none", display: "block", padding: "16px 18px" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--dvn-lacivert)", lineHeight: 1 }}>{k.sayi}</div>
            <div style={{ fontSize: 13, color: "var(--dvn-gri-500)", marginTop: 6 }}>{k.ad}</div>
          </Link>
        ))}
      </div>

      {/* Bölüm kartları */}
      {gruplar.map((grup) => (
        <section key={grup.baslik} style={{ marginBottom: 30 }}>
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 600, letterSpacing: "1.2px", margin: "0 0 14px" }}>
            {grup.baslik}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 14 }}>
            {grup.kartlar.map((k) => (
              <Link key={k.href} href={k.href} className="dvn-bolum-kart" style={{ ...adminKart, display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit", padding: "16px 18px" }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "var(--dvn-altin-soluk)",
                    color: "var(--dvn-altin)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ikon ad={k.ikon} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 14.5, fontWeight: 600, color: "var(--dvn-lacivert)" }}>{k.ad}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--dvn-gri-500)", marginTop: 2 }}>{k.aciklama}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <Suspense fallback={<div style={{ marginTop: 32 }}><Yukleniyor ad="Ziyaretçi istatistikleri" /></div>}>
        <AnalitikBolum />
      </Suspense>

      <Suspense fallback={<div style={{ marginTop: 32 }}><Yukleniyor ad="Arama performansı" /></div>}>
        <AramaBolum />
      </Suspense>

      <style>{`
        .dvn-stat-kart, .dvn-bolum-kart { transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
        .dvn-stat-kart:hover, .dvn-bolum-kart:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(2,35,152,0.10);
          border-color: var(--dvn-altin) !important;
        }
      `}</style>
    </div>
  );
}
