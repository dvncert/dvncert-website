CREATE TABLE "egitim_sertifika_gruplari" (
	"id" serial PRIMARY KEY NOT NULL,
	"egitim_adi" text NOT NULL,
	"baslangic_tarihi" varchar(10) NOT NULL,
	"bitis_tarihi" varchar(10),
	"egitmen" varchar(200) NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "egitim_sertifikalari" (
	"id" serial PRIMARY KEY NOT NULL,
	"sertifika_no" varchar(8) NOT NULL,
	"grup_id" integer NOT NULL,
	"katilimci_adi" varchar(200) NOT NULL,
	"iptal" boolean DEFAULT false NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "egitim_sertifikalari_sertifika_no_unique" UNIQUE("sertifika_no")
);
--> statement-breakpoint
ALTER TABLE "egitim_sertifikalari" ADD CONSTRAINT "egitim_sertifikalari_grup_id_egitim_sertifika_gruplari_id_fk" FOREIGN KEY ("grup_id") REFERENCES "public"."egitim_sertifika_gruplari"("id") ON DELETE cascade ON UPDATE no action;