// GEÇİCİ TEŞHİS ENDPOINT'İ — e-posta env/commit kontrolü. Doğrulama sonrası silinecek.
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  return Response.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    hasResendKey: !!key,
    resendKeyPrefix: key ? key.slice(0, 3) : null,
    hasResendFrom: !!from,
    resendFrom: from ?? null,
    iletisimAlici: process.env.ILETISIM_ALICI ?? null,
  });
}
