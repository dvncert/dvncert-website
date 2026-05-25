import { unstable_cache } from "next/cache";
import { erisimTokeni } from "./client";

export type GscSatir = { ad: string; tiklama: number; gosterim: number; ctr: number; sira: number };
export type GscOzet = {
  tiklama: number;
  gosterim: number;
  ctr: number;
  sira: number;
  baslangic: string;
  bitis: string;
  sorgular: GscSatir[];
  sayfalar: GscSatir[];
};

type ApiSatir = { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number };
type ApiYanit = { rows?: ApiSatir[] };

function gunOnce(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function sorgula(siteUrl: string, govde: unknown, token: string): Promise<ApiYanit> {
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(govde),
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`Search Console API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json() as Promise<ApiYanit>;
}

async function getir(): Promise<GscOzet> {
  const siteUrl = process.env.GSC_SITE_URL;
  if (!siteUrl) throw new Error("GSC_SITE_URL tanımlı değil.");
  const token = await erisimTokeni();

  const baslangic = gunOnce(30);
  const bitis = gunOnce(3); // Search Console verisi ~2-3 gün gecikmeli gelir.
  const ortak = { startDate: baslangic, endDate: bitis };

  const [toplam, sorgu, sayfa] = await Promise.all([
    sorgula(siteUrl, { ...ortak, dimensions: [] }, token),
    sorgula(siteUrl, { ...ortak, dimensions: ["query"], rowLimit: 10 }, token),
    sorgula(siteUrl, { ...ortak, dimensions: ["page"], rowLimit: 10 }, token),
  ]);

  const t = toplam.rows?.[0] ?? {};
  const eslestir = (r: ApiSatir): GscSatir => ({
    ad: r.keys?.[0] ?? "",
    tiklama: Number(r.clicks ?? 0),
    gosterim: Number(r.impressions ?? 0),
    ctr: Number(r.ctr ?? 0),
    sira: Number(r.position ?? 0),
  });

  return {
    tiklama: Number(t.clicks ?? 0),
    gosterim: Number(t.impressions ?? 0),
    ctr: Number(t.ctr ?? 0),
    sira: Number(t.position ?? 0),
    baslangic,
    bitis,
    sorgular: (sorgu.rows ?? []).map(eslestir),
    sayfalar: (sayfa.rows ?? []).map(eslestir),
  };
}

/** 15 dk önbellekli Search Console özeti. */
export const gscOzetGetir = unstable_cache(getir, ["gsc-ozet-v1"], { revalidate: 900, tags: ["analitik"] });
