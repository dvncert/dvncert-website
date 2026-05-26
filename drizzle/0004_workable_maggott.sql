CREATE TABLE "egitim_etkinlikleri" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"baslik" text NOT NULL,
	"kategori" varchar(60) NOT NULL,
	"baslangic" timestamp with time zone NOT NULL,
	"bitis" timestamp with time zone,
	"yer" varchar(200) NOT NULL,
	"ozet" text NOT NULL,
	"icerik" text NOT NULL,
	"gorsel" text,
	"gorsel_veri" "bytea",
	"gorsel_alt" text,
	"kayit_url" text,
	"ucretli" boolean DEFAULT false NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"no_index" boolean DEFAULT false NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "egitim_etkinlikleri_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ekstra_menu_ogeleri" (
	"id" serial PRIMARY KEY NOT NULL,
	"baslik" varchar(100) NOT NULL,
	"href" text NOT NULL,
	"yeni_sekme" boolean DEFAULT false NOT NULL,
	"sira" integer DEFAULT 0 NOT NULL,
	"aktif" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
