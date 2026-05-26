CREATE TABLE "site_ayarlari" (
	"anahtar" varchar(100) PRIMARY KEY NOT NULL,
	"deger" text DEFAULT '' NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
