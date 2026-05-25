import crypto from "node:crypto";

/**
 * Google servis hesabı ile sunucu tarafında erişim jetonu (access token) üretir.
 * Harici paket kullanılmaz; JWT, Node'un yerleşik `crypto` modülüyle imzalanır.
 *
 * Gerekli ortam değişkenleri (Vercel → Settings → Environment Variables):
 *  - GOOGLE_SERVICE_ACCOUNT_JSON : servis hesabı anahtar dosyasının (JSON) tamamı
 *      (düz JSON metni ya da base64 ile kodlanmış hali olabilir)
 *  - GA4_PROPERTY_ID  : Google Analytics 4 mülk (property) numarası, ör. 123456789
 *  - GSC_SITE_URL     : Search Console mülk adresi, ör. https://dvncert.com/  veya  sc-domain:dvncert.com
 */

type Kimlik = { client_email: string; private_key: string };

function kimlik(): Kimlik | null {
  const ham = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!ham) return null;
  const metin = ham.startsWith("{") ? ham : Buffer.from(ham, "base64").toString("utf8");
  const o = JSON.parse(metin) as Partial<Kimlik>;
  if (!o.client_email || !o.private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON eksik: client_email / private_key bulunamadı.");
  }
  return { client_email: o.client_email, private_key: o.private_key };
}

/** GA ve Search Console verisi için gerekli yapılandırma var mı? */
export function googleYapilandirildiMi(): boolean {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
}

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
].join(" ");

function base64url(girdi: Buffer | string): string {
  return Buffer.from(girdi).toString("base64").replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// Jeton ~1 saat geçerli; gereksiz yere yeniden üretmemek için bellekte tutulur.
let _jeton: { deger: string; bitis: number } | null = null;

/** GA4 + Search Console kapsamlarını içeren bir erişim jetonu döndürür. */
export async function erisimTokeni(): Promise<string> {
  const simdi = Math.floor(Date.now() / 1000);
  if (_jeton && _jeton.bitis - 60 > simdi) return _jeton.deger;

  const k = kimlik();
  if (!k) throw new Error("Google servis hesabı tanımlı değil (GOOGLE_SERVICE_ACCOUNT_JSON).");

  const baslik = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const istem = base64url(
    JSON.stringify({
      iss: k.client_email,
      scope: SCOPES,
      aud: "https://oauth2.googleapis.com/token",
      iat: simdi,
      exp: simdi + 3600,
    }),
  );
  const imzaGirdisi = `${baslik}.${istem}`;
  const imza = crypto.createSign("RSA-SHA256").update(imzaGirdisi).sign(k.private_key);
  const jwt = `${imzaGirdisi}.${base64url(imza)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Google jeton hatası ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const j = (await res.json()) as { access_token: string; expires_in: number };
  _jeton = { deger: j.access_token, bitis: simdi + (j.expires_in ?? 3600) };
  return _jeton.deger;
}
