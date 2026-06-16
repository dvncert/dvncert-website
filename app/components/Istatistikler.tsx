const guvenMaddeleri = [
  {
    baslik: "Akreditasyon durumu açık yazılır",
    metin: "Süreç, kapsam ve belge beyanları kullanıcıyı yanıltmayacak şekilde ayrıştırılır.",
  },
  {
    baslik: "Denetim kanıtları kayıt altındadır",
    metin: "Başvuru, planlama, denetim bulguları ve karar adımları izlenebilir kayıtlarla yürütülür.",
  },
  {
    baslik: "Sertifika durumu doğrulanabilir",
    metin: "Düzenlenen belgelerin güncel durumu çevrim içi sorgulama ekranından kontrol edilebilir.",
  },
  {
    baslik: "Başvuru süreci dijitaldir",
    metin: "Başvuru talebi, belge sorgulama ve iletişim adımları tek bir akışta takip edilebilir.",
  },
];

export default function Istatistikler() {
  return (
    <section style={{ background: "var(--dvn-gri-50)", padding: "42px 32px" }}>
      <div className="dvn-guven-grid" style={{ maxWidth: 1280, margin: "0 auto" }}>
        {guvenMaddeleri.map((madde, i) => (
          <div key={madde.baslik} className="dvn-guven-madde">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h2>{madde.baslik}</h2>
            <p>{madde.metin}</p>
          </div>
        ))}
      </div>

      <style>{`
        .dvn-guven-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--dvn-gri-300);
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--dvn-shadow-md);
        }
        .dvn-guven-madde {
          position: relative;
          padding: 26px 22px;
          border-right: 1px solid var(--dvn-gri-300);
          min-height: 178px;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .dvn-guven-madde::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--dvn-gradient-turuncu);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .dvn-guven-madde:hover::before { transform: scaleX(1); }
        .dvn-guven-madde:hover {
          background: linear-gradient(180deg, #fff 0%, var(--dvn-gri-50) 100%);
        }
        .dvn-guven-madde:last-child { border-right: 0; }
        .dvn-guven-madde span {
          display: inline-block;
          color: var(--dvn-turuncu);
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 16px;
          background: var(--dvn-gradient-turuncu);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .dvn-guven-madde h2 {
          color: var(--dvn-lacivert);
          font-size: 17px;
          font-weight: 600;
          line-height: 1.35;
          margin: 0 0 10px;
        }
        .dvn-guven-madde p {
          color: var(--dvn-gri-500);
          font-size: 13.5px;
          line-height: 1.65;
          margin: 0;
        }
        @media (max-width: 980px) {
          .dvn-guven-grid { grid-template-columns: 1fr 1fr; }
          .dvn-guven-madde:nth-child(2) { border-right: 0; }
          .dvn-guven-madde:nth-child(-n + 2) { border-bottom: 1px solid var(--dvn-gri-300); }
        }
        @media (max-width: 560px) {
          .dvn-guven-grid { grid-template-columns: 1fr; }
          .dvn-guven-madde { border-right: 0; border-bottom: 1px solid var(--dvn-gri-300); min-height: auto; }
          .dvn-guven-madde:last-child { border-bottom: 0; }
        }
      `}</style>
    </section>
  );
}
