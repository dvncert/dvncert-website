import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { referanslar } from "@/lib/db/schema";

/**
 * Veritabanında saklanan referans logosunu (webp) sunar.
 * /api/referans-logo/{id}
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n)) return new Response("Geçersiz id", { status: 400 });

  const row = (
    await db.select({ logoVeri: referanslar.logoVeri }).from(referanslar).where(eq(referanslar.id, n)).limit(1)
  )[0];

  if (!row?.logoVeri) return new Response("Bulunamadı", { status: 404 });

  return new Response(new Uint8Array(row.logoVeri), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
