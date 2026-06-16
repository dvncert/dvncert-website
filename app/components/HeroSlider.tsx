"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

type Slayt = {
  eyebrow: string;
  baslikBas: string;
  baslikVurgu: string;
  baslikSon: string;
  aciklama: string;
  cta: { etiket: string; href: string; disHref?: boolean };
  uyariGoster?: boolean;
};

const slaytlar: Slayt[] = [
  {
    eyebrow: "ISO belgelendirme, ikinci taraf denetim ve eğitim",
    baslikBas: "Belgelendirme sürecinizi ",
    baslikVurgu: "açık, izlenebilir",
    baslikSon: " ve ölçülü yönetin",
    aciklama:
      "DVN Cert, yönetim sistemi belgelendirme süreçlerinde tarafsız değerlendirme, net kayıt yönetimi ve sahaya uygulanabilir denetim yaklaşımı sunar.",
    cta: { etiket: "Başvuru Yap", href: "https://dbys.dvncert.com/basvuru", disHref: true },
    uyariGoster: true,
  },
  {
    eyebrow: "İkinci taraf denetimleri",
    baslikBas: "Tedarikçi ve şube ağınızı ",
    baslikVurgu: "bağımsız bir gözle",
    baslikSon: " değerlendirin",
    aciklama:
      "Tedarikçi, şube ve operasyon denetimlerinde kurumunuza özel kontrol kriterleriyle saha değerlendirmesi yapar; riskleri kanıta dayalı raporlarız.",
    cta: { etiket: "Denetim hizmetini incele", href: "/hizmetler/2-taraf-denetimleri" },
  },
  {
    eyebrow: "Eğitim hizmetleri",
    baslikBas: "Ekiplerinizi standartları ",
    baslikVurgu: "sahada uygulayacak",
    baslikSon: " yetkinliğe taşıyın",
    aciklama:
      "Yönetim sistemi, iç denetçi ve uygulama eğitimleriyle ekiplerinizin standart gerekliliklerini sahada doğru yorumlamasını sağlarız.",
    cta: { etiket: "Eğitimleri görüntüle", href: "/egitimler" },
  },
];

const GECIS_MS = 7000;

export default function HeroSlider() {
  const [aktif, setAktif] = useState(0);
  const zamanlayici = useRef<ReturnType<typeof setInterval> | null>(null);

  const durdur = useCallback(() => {
    if (zamanlayici.current) clearInterval(zamanlayici.current);
  }, []);

  const baslat = useCallback(() => {
    durdur();
    zamanlayici.current = setInterval(() => {
      setAktif((o) => (o + 1) % slaytlar.length);
    }, GECIS_MS);
  }, [durdur]);

  useEffect(() => {
    baslat();
    return durdur;
  }, [baslat, durdur]);

  const git = useCallback(
    (i: number) => {
      setAktif((i + slaytlar.length) % slaytlar.length);
      baslat();
    },
    [baslat]
  );

  const s = slaytlar[aktif];

  return (
    <>
      <section
        className="dvn-hero-yeni"
        onMouseEnter={durdur}
        onMouseLeave={baslat}
        aria-roledescription="carousel"
        aria-label="DVN Cert hizmet tanıtımı"
      >
        <Image
          src="/gorseller/dvn-cert-kurumsal-kapak.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="dvn-hero-gorsel"
        />
        <div className="dvn-hero-kaplama" />
        <div className="dvn-grid-desen" aria-hidden />
        <span className="dvn-glow-orb dvn-glow-orb--altin dvn-hero-orb-1" aria-hidden />
        <span className="dvn-glow-orb dvn-glow-orb--turuncu dvn-hero-orb-2" aria-hidden />
        <span className="dvn-glow-orb dvn-glow-orb--lacivert dvn-hero-orb-3" aria-hidden />

        <div className="dvn-hero-icerik">
          <div
            className="dvn-hero-metin"
            key={aktif}
            aria-live="polite"
            aria-roledescription="slide"
            aria-label={`${aktif + 1} / ${slaytlar.length}`}
          >
            <p className="dvn-hero-eyebrow">{s.eyebrow}</p>
            <h1>
              {s.baslikBas}
              <span className="dvn-vurgu">{s.baslikVurgu}</span>
              {s.baslikSon}
            </h1>
            <p className="dvn-hero-aciklama">{s.aciklama}</p>

            {s.uyariGoster && (
              <div className="dvn-hero-uyari" role="note">
                <strong>{siteConfig.akreditasyon.kurulus} durumu:</strong> {siteConfig.akreditasyon.durum}{" "}
                {siteConfig.akreditasyon.not}
              </div>
            )}

            <div className="dvn-hero-aksiyonlar">
              {s.cta.disHref ? (
                <Link
                  href={s.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dvn-btn-primary"
                >
                  {s.cta.etiket}
                </Link>
              ) : (
                <Link href={s.cta.href} className="dvn-btn-primary">
                  {s.cta.etiket}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="dvn-hero-nav" role="group" aria-label="Slayt gezinme">
          <button
            type="button"
            className="dvn-hero-ok"
            onClick={() => git(aktif - 1)}
            aria-label="Önceki slayt"
          >
            ‹
          </button>
          <div className="dvn-hero-noktalar">
            {slaytlar.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dvn-hero-nokta${i === aktif ? " aktif" : ""}`}
                onClick={() => git(i)}
                aria-label={`${i + 1}. slayda git`}
                aria-current={i === aktif}
              />
            ))}
          </div>
          <button
            type="button"
            className="dvn-hero-ok"
            onClick={() => git(aktif + 1)}
            aria-label="Sonraki slayt"
          >
            ›
          </button>
        </div>
      </section>

      <div className="dvn-hero-serit">
        <span>Tarafsızlık</span>
        <span>İzlenebilir kayıt</span>
        <span>Yetkin denetçi havuzu</span>
        <span>Online başvuru</span>
      </div>
    </>
  );
}
