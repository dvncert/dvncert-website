/**
 * DVN Cert - Veritabanı istemcisi (Drizzle + postgres.js)
 *
 * Bağlantı POSTGRES_URL üzerinden kurulur. postgres.js hem Vercel Postgres/Neon
 * (havuzlu bağlantı, prepare:false) hem de standart Postgres ile çalışır.
 *
 * Not: POSTGRES_URL yoksa geçersiz bir yer tutucu ile kurulur (import sırasında
 * hata atmaz; bağlantı yalnızca sorgu anında denenir). Public sayfalar sorgu
 * başarısız olursa lib/*.ts statik içeriğine geri düşer.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.POSTGRES_URL || "postgres://placeholder";

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

export { schema };

/** POSTGRES_URL tanımlı mı? (Public sayfalar DB mi yoksa statik mi okuyacağına karar verir) */
export const dbHazir = Boolean(process.env.POSTGRES_URL);
