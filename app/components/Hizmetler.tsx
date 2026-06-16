import Link from "next/link";

const hizmetler = [
  {
    kod: "ISO",
    baslik: "Sistem Belgelendirme",
    aciklama:
      "ISO 9001, 14001, 45001 ve 50001 yönetim sistemleri için başvuru, denetim planlama ve belge durumu süreçleri.",
    maddeler: ["Kapsam teyidi", "Aşama 1 / Aşama 2", "Belge durumu takibi"],
    link: "/hizmetler/sistem-belgelendirme",
  },
  {
    kod: "2T",
    baslik: "İkinci Taraf Denetimleri",
    aciklama:
      "Tedarikçi, şube ve operasyon denetimlerinde kurumunuza özel kontrol kriterleriyle saha değerlendirmesi.",
    maddeler: ["Tedarikçi riski", "Saha kontrolü", "Raporlama"],
    link: "/hizmetler/2-taraf-denetimleri",
  },
  {
    kod: "EDU",
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
              <div className="dvn-hizmet-kod">{h.kod}</div>
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
        .dvn-hizmet-kod {
          width: max-content;
          min-width: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 14px;
          border-radius: 8px;
          background: var(--dvn-gradient-lacivert);
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.8px;
          margin-bottom: 24px;
          box-shadow: 0 6px 16px rgba(2, 35, 152, 0.22);
          transition: transform 0.3s ease;
        }
        .dvn-hizmet-kart-yeni:hover .dvn-hizmet-kod {
          background: var(--dvn-gradient-turuncu);
          transform: scale(1.05);
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
