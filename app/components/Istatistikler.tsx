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
          border-radius: 10px;
          overflow: hidden;
        }
        .dvn-guven-madde {
          padding: 24px 22px;
          border-right: 1px solid var(--dvn-gri-300);
          min-height: 170px;
        }
        .dvn-guven-madde:last-child { border-right: 0; }
        .dvn-guven-madde span {
          display: block;
          color: var(--dvn-turuncu);
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 18px;
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
