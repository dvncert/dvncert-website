ALTER TABLE "blog_yazilari" ADD COLUMN "gorsel_veri" "bytea";--> statement-breakpoint
ALTER TABLE "blog_yazilari" ADD COLUMN "gorsel_alt" text;--> statement-breakpoint
ALTER TABLE "duyurular" ADD COLUMN "gorsel_veri" "bytea";--> statement-breakpoint
ALTER TABLE "duyurular" ADD COLUMN "gorsel_alt" text;