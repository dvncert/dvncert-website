/**
 * DVN Cert - Veritabanı istemcisi (Drizzle + Vercel Postgres)
 *
 * Bağlantı, ortam değişkeni POSTGRES_URL üzerinden kurulur (Vercel Postgres
 * bunu otomatik sağlar; lokalde `vercel env pull .env.local` ile çekilir).
 */

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });

export { schema };
