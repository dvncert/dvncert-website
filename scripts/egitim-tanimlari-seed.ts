/**
 * Varsayılan eğitim tanımlarını egitim_tanimlari tablosuna ekler.
 * Var olan adlara dokunmaz (tekrar çalıştırmak güvenlidir).
 * Çalıştırma: `npx tsx scripts/egitim-tanimlari-seed.ts`
 */

import { config } from "dotenv";
config({ path: ".env.local", quiet: true });

async function main() {
  const { db } = await import("../lib/db");
  const { egitimTanimlari } = await import("../lib/db/schema");
  const { VARSAYILAN_EGITIM_TANIMLARI } = await import("../lib/egitim-tanimlari");

  const eklenen = await db
    .insert(egitimTanimlari)
    .values(VARSAYILAN_EGITIM_TANIMLARI.map((ad, i) => ({ ad, sira: (i + 1) * 10 })))
    .onConflictDoNothing({ target: egitimTanimlari.ad })
    .returning({ ad: egitimTanimlari.ad });

  console.log(`✓ ${eklenen.length} eğitim tanımı eklendi (${VARSAYILAN_EGITIM_TANIMLARI.length - eklenen.length} zaten vardı).`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
