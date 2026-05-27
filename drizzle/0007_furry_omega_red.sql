CREATE TABLE "ozel_sayfalar" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"baslik" text NOT NULL,
	"sablon" varchar(40) NOT NULL,
	"ust_etiket" varchar(80),
	"aciklama" text,
	"veri" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"no_index" boolean DEFAULT false NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ozel_sayfalar_slug_unique" UNIQUE("slug")
);
