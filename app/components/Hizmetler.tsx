import Link from "next/link";
import type { ReactNode } from "react";

const ikonlar: Record<string, ReactNode> = {
  belge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  ),
  denetim: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  egitim: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 10v5" />
    </svg>
  ),
};

const hizmetler = [
  {
    ikon: "belge",
    baslik: "Sistem Belgelendirme",
    aciklama:
      "ISO 9001, 14001, 45001 ve 50001 yönetim sistemleri için başvuru, denetim planlama ve belge durumu süreçleri.",
    maddeler: ["Kapsam teyidi", "Aşama 1 / Aşama 2", "Belge durumu takibi"],
    link: "/hizmetler/sistem-belgelendirme",
  },
  {
    ikon: "denetim",
    baslik: "İkinci Taraf Denetimleri",
    aciklama:
      "Tedarikçi, şube ve operasyon denetimlerinde kurumunuza özel kontrol kriterleriyle saha değerlendirmesi.",
    maddeler: ["Tedarikçi riski", "Saha kontrolü", "Raporlama"],
    link: "/hizmetler/2-taraf-denetimleri",
  },
  {
    ikon: "egitim",
    baslik: "Eğitim Hizmetleri",
    aciklama:
      "Yönetim sistemi, iç denetçi ve uygulama eğitimleriyle ekiplerin standart gerekliliklerini sahada yorumlaması.",
    maddeler: ["İç denetçi", "Uygulama eğitimi", "Kuruma özel içerik"],
    link: "/egitimler",
  },
];

export default function Hizmetler() {
  return (
    <section style={{ background: "white", padding: "64px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="dvn-hizmet-baslik">
          <span className="dvn-bolum-etiket">HİZMETLERİMİZ</span>
          <h2>Kuruluşunuzun karar vermesini kolaylaştıran üç ana akış</h2>
          <p>Her hizmette hedef; kapsamı netleştirmek, kanıtı kayıt altına almak ve sonucu anlaşılır raporlamaktır.</p>
        </div>

        <div className="dvn-hizmet-grid-yeni">
          {hizmetler.map((h) => (
            <Link key={h.link} href={h.link} className="dvn-hizmet-kart-yeni">
              <div className="dvn-hizmet-ikon">{ikonlar[h.ikon]}</div>
              <h3>{h.baslik}</h3>
              <p>{h.aciklama}</p>
              <ul>
                {h.maddeler.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <span>Detayları gör</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dvn-hizmet-baslik {
          max-width: 720px;
          margin-bottom: 34px;
        }
        .dvn-hizmet-baslik h2 {
          color: var(--dvn-lacivert);
          font-size: 28px;
          font-weight: 600;
          line-height: 1.25;
          margin: 0 0 10px;
        }
        .dvn-hizmet-baslik p {
          color: var(--dvn-gri-500);
          font-size: 14.5px;
          line-height: 1.7;
          margin: 0;
        }
        .dvn-hizmet-grid-yeni {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--dvn-gri-300);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--dvn-shadow-md);
        }
        .dvn-hizmet-kart-yeni {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 340px;
          padding: 32px 28px;
          color: inherit;
          background: white;
          border-right: 1px solid var(--dvn-gri-300);
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .dvn-hizmet-kart-yeni::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 80% at 50% 0%, rgba(245, 130, 32, 0.08), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .dvn-hizmet-kart-yeni:last-child { border-right: 0; }
        .dvn-hizmet-kart-yeni:hover {
          background: white;
          color: inherit;
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(2, 35, 152, 0.14), 0 0 0 1px rgba(212, 169, 63, 0.2);
          z-index: 1;
        }
        .dvn-hizmet-kart-yeni:hover::after { opacity: 1; }
        .dvn-hizmet-ikon {
          position: relative;
          overflow: hidden;
          width: 60px;
          height: 60px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: var(--dvn-gradient-lacivert);
          color: #fff;
          margin-bottom: 24px;
          box-shadow: 0 10px 24px rgba(2, 35, 152, 0.28);
          transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
        }
        .dvn-hizmet-ikon::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.35), transparent 60%);
          pointer-events: none;
        }
        .dvn-hizmet-ikon svg {
          width: 30px;
          height: 30px;
        }
        .dvn-hizmet-kart-yeni:hover .dvn-hizmet-ikon {
          background: var(--dvn-gradient-turuncu);
          transform: scale(1.08) rotate(-3deg);
          box-shadow: 0 14px 30px rgba(245, 130, 32, 0.35);
        }
        .dvn-hizmet-kart-yeni h3 {
          color: var(--dvn-lacivert);
          font-size: 21px;
          font-weight: 600;
          line-height: 1.25;
          margin: 0 0 12px;
        }
        .dvn-hizmet-kart-yeni p {
          color: var(--dvn-gri-500);
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 18px;
        }
        .dvn-hizmet-kart-yeni ul {
          list-style: none;
          padding: 0;
          margin: auto 0 22px;
          display: grid;
          gap: 8px;
        }
        .dvn-hizmet-kart-yeni li {
          color: var(--dvn-gri-700);
          font-size: 13.5px;
          border-top: 1px solid var(--dvn-gri-200);
          padding-top: 8px;
        }
        .dvn-hizmet-kart-yeni span {
          color: var(--dvn-turuncu);
          font-size: 13.5px;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .dvn-hizmet-grid-yeni { grid-template-columns: 1fr; }
          .dvn-hizmet-kart-yeni { border-right: 0; border-bottom: 1px solid var(--dvn-gri-300); min-height: auto; }
          .dvn-hizmet-kart-yeni:last-child { border-bottom: 0; }
        }
      `}</style>
    </section>
  );
}
