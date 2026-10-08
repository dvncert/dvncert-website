CREATE TABLE "egitim_tanimlari" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"aktif" boolean DEFAULT true NOT NULL,
	"sira" integer DEFAULT 0 NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "egitim_tanimlari_ad_unique" UNIQUE("ad")
);
