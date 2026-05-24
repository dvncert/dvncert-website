CREATE TABLE "admin_kullanicilar" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"sifre_hash" text NOT NULL,
	"ad" varchar(120),
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_kullanicilar_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "blog_yazilari" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"baslik" text NOT NULL,
	"ozet" text NOT NULL,
	"tarih" varchar(10) NOT NULL,
	"kategori" varchar(80) NOT NULL,
	"yazar" varchar(120),
	"gorsel" text,
	"icerik" text NOT NULL,
	"ilgili_hizmetler" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blog_yazilari_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "duyurular" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"baslik" text NOT NULL,
	"tarih" varchar(10) NOT NULL,
	"kategori" varchar(80) NOT NULL,
	"ozet" text NOT NULL,
	"icerik" text NOT NULL,
	"gorsel" text,
	"ilgili_hizmetler" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"yayinda" boolean DEFAULT true NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "duyurular_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "form_gonderileri" (
	"id" serial PRIMARY KEY NOT NULL,
	"tip" varchar(40) NOT NULL,
	"ad" varchar(255),
	"email" varchar(255),
	"telefon" varchar(60),
	"konu" text,
	"mesaj" text,
	"ek_veri" jsonb,
	"durum" varchar(30) DEFAULT 'yeni' NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referanslar" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" varchar(255) NOT NULL,
	"logo" text NOT NULL,
	"url" text,
	"yayinda" boolean DEFAULT true NOT NULL,
	"sira" integer DEFAULT 0 NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "yorumlar" (
	"id" serial PRIMARY KEY NOT NULL,
	"isim" varchar(255) NOT NULL,
	"kurum" varchar(255),
	"yorum" text NOT NULL,
	"puan" integer,
	"tarih" varchar(10),
	"yayinda" boolean DEFAULT true NOT NULL,
	"sira" integer DEFAULT 0 NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL
);
