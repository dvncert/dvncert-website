import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { egitimSertifikaGruplari, egitimSertifikalari } from "@/lib/db/schema";
import { egitimTarihiYaz, qrSvg } from "@/lib/sertifika";
import EgitimSertifikasi, { type EgitimSertifikasiVeri } from "@/app/components/EgitimSertifikasi";
import YazdirButonu from "./YazdirButonu";

export const metadata: Metadata = {
  title: "Sertifika Baskı",
  robots: { index: false, follow: false },
};

/**
 * Eğitim sertifikası baskı sayfası — her sertifika ayrı bir A4 yatay sayfa.
 * ?grup={id}: eğitimdeki tüm (iptal edilmemiş) sertifikalar · ?id={id}: tek sertifika.
 * Panel layout'unun dışında tutuldu ki üst menü baskıya girmesin.
 */
export default async function SertifikaBaski({ searchParams }: { searchParams: Promise<{ grup?: string; id?: string }> }) {
  const oturum = await auth();
  if (!oturum?.user) redirect("/admin/giris");

  const { grup, id } = await searchParams;
  const sorgu = db
    .select({
      sertifikaNo: egitimSertifikalari.sertifikaNo,
      katilimciAdi: egitimSertifikalari.katilimciAdi,
      iptal: egitimSertifikalari.iptal,
      grupId: egitimSertifikaGruplari.id,
      egitimAdi: egitimSertifikaGruplari.egitimAdi,
      baslangicTarihi: egitimSertifikaGruplari.baslangicTarihi,
      bitisTarihi: egitimSertifikaGruplari.bitisTarihi,
      egitmen: egitimSertifikaGruplari.egitmen,
    })
    .from(egitimSertifikalari)
    .innerJoin(egitimSertifikaGruplari, eq(egitimSertifikalari.grupId, egitimSertifikaGruplari.id));

  const satirlar = id
    ? await sorgu.where(eq(egitimSertifikalari.id, Number(id)))
    : grup
      ? (await sorgu.where(eq(egitimSertifikalari.grupId, Number(grup))).orderBy(asc(egitimSertifikalari.id))).filter((r) => !r.iptal)
      : [];

  const sertifikalar: EgitimSertifikasiVeri[] = await Promise.all(
    satirlar.map(async (r) => ({
      katilimciAdi: r.katilimciAdi,
      egitimAdi: r.egitimAdi,
      egitimTarihi: egitimTarihiYaz(r.baslangicTarihi, r.bitisTarihi),
      egitmen: r.egitmen,
      sertifikaNo: r.sertifikaNo,
      qrSvg: await qrSvg(r.sertifikaNo),
    })),
  );
  const geriGrup = satirlar[0]?.grupId ?? grup;

  return (
    <div className="dvn-baski">
      <div className="dvn-baski-arac">
        <Link href={geriGrup ? `/admin/sertifikalar/form?id=${geriGrup}` : "/admin/sertifikalar"} style={{ color: "#022398", fontSize: 13.5, textDecoration: "none" }}>
          ← Geri
        </Link>
        <span style={{ fontSize: 13, color: "#64748b" }}>
          {sertifikalar.length} sertifika · Yazdırırken <strong>A4 yatay</strong>, kenar boşluğu <strong>yok</strong>, &quot;arka plan grafikleri&quot; açık seçin.
        </span>
        <YazdirButonu />
      </div>

      {sertifikalar.length === 0 && <p style={{ textAlign: "center", color: "#64748b" }}>Basılacak sertifika bulunamadı.</p>}

      {sertifikalar.map((v) => (
        <div key={v.sertifikaNo} className="dvn-baski-sayfa">
          <EgitimSertifikasi veri={v} />
        </div>
      ))}

      <style>{`
        body { background: #e5e7eb; }
        .dvn-baski { padding: 0 16px 40px; }
        .dvn-baski-arac {
          position: sticky; top: 0; z-index: 10;
          display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
          max-width: 1100px; margin: 0 auto 20px; padding: 12px 16px;
          background: white; border-radius: 0 0 12px 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .dvn-baski-sayfa { max-width: 1100px; margin: 0 auto 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); }

        @page { size: A4 landscape; margin: 0; }
        @media print {
          body { background: #fafafa; }
          .dvn-baski { padding: 0; }
          .dvn-baski-arac { display: none; }
          .dvn-baski-sayfa {
            width: 297mm; height: 210mm; max-width: none; margin: 0; box-shadow: none;
            display: flex; align-items: center; background: #fafafa;
            break-after: page; page-break-after: always;
          }
          .dvn-baski-sayfa:last-child { break-after: auto; page-break-after: auto; }
        }
      `}</style>
    </div>
  );
}
