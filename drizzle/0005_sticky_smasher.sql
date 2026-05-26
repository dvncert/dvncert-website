CREATE TABLE "akreditasyon_belgeleri" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" varchar(255) NOT NULL,
	"aciklama" text,
	"kapsam" text,
	"belge_veri" "bytea",
	"belge_mime" varchar(80),
	"gecerlilik_tarihi" varchar(10),
	"sira" integer DEFAULT 0 NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dokumanlar" (
	"id" serial PRIMARY KEY NOT NULL,
	"kod" varchar(50) NOT NULL,
	"baslik" text NOT NULL,
	"aciklama" text,
	"kategori" varchar(60) NOT NULL,
	"tip" varchar(10) NOT NULL,
	"dosya_veri" "bytea",
	"dosya_mime" varchar(80),
	"dosya_adi" varchar(200),
	"sira" integer DEFAULT 0 NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ekip_uyeleri" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" varchar(200) NOT NULL,
	"unvan" varchar(200) NOT NULL,
	"uzmanlik" text,
	"foto_veri" "bytea",
	"foto_alt" text,
	"sira" integer DEFAULT 0 NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "logo_dosyalari" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" varchar(200) NOT NULL,
	"aciklama" text,
	"zemin_tipi" varchar(20) DEFAULT 'acik' NOT NULL,
	"dosya_veri" "bytea",
	"dosya_mime" varchar(80),
	"dosya_adi" varchar(200),
	"sira" integer DEFAULT 0 NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sayfa_seo" (
	"yol" varchar(200) PRIMARY KEY NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"no_index" boolean DEFAULT false NOT NULL,
	"og_image_veri" "bytea",
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
