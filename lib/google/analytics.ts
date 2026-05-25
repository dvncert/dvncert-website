import { unstable_cache } from "next/cache";
import { erisimTokeni } from "./client";

const API = "https://analyticsdata.googleapis.com/v1beta";

export type GaSayfa = { yol: string; goruntuleme: number };
export type GaOzet = {
  aktif7: number;
  oturum7: number;
  goruntuleme7: number;
  aktif28: number;
  oturum28: number;
  goruntuleme28: number;
  ortSure28: number; // saniye
  sayfalar: GaSayfa[];
};

type RaporSatir = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };
type Rapor = { rows?: RaporSatir[] };

async function rapor(propertyId: string, govde: unknown, token: string): Promise<Rapor> {
  const res = await fetch(`${API}/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(govde),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GA4 API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json() as Promise<Rapor>;
}

async function getir(): Promise<GaOzet> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error("GA4_PROPERTY_ID tanımlı değil.");
  const token = await erisimTokeni();

  const ozet = await rapor(
    propertyId,
    {
      dateRanges: [
        { startDate: "7daysAgo", endDate: "today" },
        { startDate: "28daysAgo", endDate: "today" },
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    },
    token,
  );

  const sayfaRapor = await rapor(
    propertyId,
    {
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ desc: true, metric: { metricName: "screenPageViews" } }],
      limit: 8,
    },
    token,
  );

  const rows = ozet.rows ?? [];
  const mv = (r: RaporSatir | undefined, i: number) => Number(r?.metricValues?.[i]?.value ?? 0);
  // İki tarih aralığı + ek boyut yok → satırlar tarih aralığı sırasıyla gelir (0: son 7, 1: son 28).
  const r7 = rows[0];
  const r28 = rows[1] ?? rows[0];

  const sayfalar: GaSayfa[] = (sayfaRapor.rows ?? []).map((r) => ({
    yol: r.dimensionValues?.[0]?.value ?? "/",
    goruntuleme: Number(r.metricValues?.[0]?.value ?? 0),
  }));

  return {
    aktif7: mv(r7, 0),
    oturum7: mv(r7, 1),
    goruntuleme7: mv(r7, 2),
    aktif28: mv(r28, 0),
    oturum28: mv(r28, 1),
    goruntuleme28: mv(r28, 2),
    ortSure28: mv(r28, 3),
    sayfalar,
  };
}

/** 15 dk önbellekli GA4 özeti. */
export const gaOzetGetir = unstable_cache(getir, ["ga-ozet-v1"], { revalidate: 900, tags: ["analitik"] });
