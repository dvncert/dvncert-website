CREATE TABLE "popup" (
	"id" serial PRIMARY KEY NOT NULL,
	"aktif" boolean DEFAULT false NOT NULL,
	"baslik" text,
	"metin" text,
	"buton_yazi" varchar(120),
	"buton_url" text,
	"gorsel_veri" "bytea",
	"gorsel_alt" text,
	"guncellenme" timestamp with time zone DEFAULT now() NOT NULL
);
