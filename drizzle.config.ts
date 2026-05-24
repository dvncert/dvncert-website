import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// .env.local'i yükle (vercel env pull ile gelen POSTGRES_URL burada olur)
config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL || "",
  },
});
