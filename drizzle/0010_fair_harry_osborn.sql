CREATE TABLE "giris_denemeleri" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip" varchar(45),
	"email" varchar(255),
	"basarili" boolean DEFAULT false NOT NULL,
	"olusturulma" timestamp with time zone DEFAULT now() NOT NULL
);
