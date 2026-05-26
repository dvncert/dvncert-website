CREATE TABLE "sayfa_bloklari" (
	"yol" varchar(200) NOT NULL,
	"anahtar" varchar(100) NOT NULL,
	"deger" text DEFAULT '' NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sayfa_bloklari_yol_anahtar_pk" PRIMARY KEY("yol","anahtar")
);
--> statement-breakpoint
CREATE TABLE "sss_sorulari" (
	"id" serial PRIMARY KEY NOT NULL,
	"soru" text NOT NULL,
	"cevap" text NOT NULL,
	"sira" integer DEFAULT 0 NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
