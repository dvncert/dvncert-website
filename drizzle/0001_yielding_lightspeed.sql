ALTER TABLE "referanslar" ALTER COLUMN "logo" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "referanslar" ADD COLUMN "logo_veri" "bytea";