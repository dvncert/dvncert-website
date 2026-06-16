import Link from "next/link";

/**
 * Ana sayfa "Sertifika Doğrulama" modülü.
 * Belge geçerliliği TÜRKAK Belge Doğrulama Sistemi (TBDS) üzerinden teyit edilir.
 */
export default function SertifikaSorgula() {
  return (
    <section className="dvn-sorgu-bolum">
      <div className="dvn-grid-desen" aria-hidden />
      <span className="dvn-glow-orb dvn-glow-orb--altin dvn-sorgu-orb1" aria-hidden />
      <span className="dvn-glow-orb dvn-glow-orb--turuncu dvn-sorgu-orb2" aria-hidden />

      <div className="dvn-sorgu-ic">
        <div className="dvn-sorgu-ikon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l8 4v6c0 5.5-3.5 10-8 12-4.5-2-8-6.5-8-12V6l8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        <div className="dvn-sorgu-metin">
          <p className="dvn-sorgu-eyebrow">BELGE DOĞRULAMA</p>
          <h2>
            Sertifikanın geçerliliğini <span className="dvn-altin-vurgu">anında doğrulayın</span>
          </h2>
          <p className="dvn-sorgu-aciklama">
            DVN Cert tarafından düzenlenen belgelerin güncel durumunu — geçerli, askıda veya iptal —
            TÜRKAK Belge Doğrulama Sistemi (TBDS) üzerinden çevrim içi sorgulayabilirsiniz.
          </p>
        </div>

        <div className="dvn-sorgu-aksiyon">
          <Link
            href="https://tbds.turkak.org.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="dvn-btn-primary"
            style={{ padding: "14px 28px", fontSize: 14.5 }}
          >
            TÜRKAK TBDS&apos;de Sorgula →
          </Link>
          <span className="dvn-sorgu-not">tbds.turkak.org.tr</span>
        </div>
      </div>

      <style>{`
        .dvn-sorgu-bolum {
          position: relative;
          overflow: hidden;
          padding: 30px 32px 64px;
          background: var(--dvn-gri-50);
        }
        .dvn-sorgu-ic {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          background: var(--dvn-gradient-lacivert);
          border-radius: 20px;
          padding: 40px 44px;
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          box-shadow: 0 20px 54px rgba(2, 35, 152, 0.26), 0 0 0 1px rgba(212, 169, 63, 0.16);
          overflow: hidden;
        }
        /* Orb ve grid'i kart içine hizala */
        .dvn-sorgu-bolum .dvn-grid-desen {
          inset: 30px 32px 64px;
          opacity: 0.5;
          border-radius: 20px;
        }
        .dvn-sorgu-orb1 { top: -40px; right: 6%; width: 320px; height: 320px; opacity: 0.4; }
        .dvn-sorgu-orb2 { bottom: -80px; left: 2%; width: 280px; height: 280px; opacity: 0.28; animation-delay: -7s; }

        .dvn-sorgu-ikon {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          width: 76px;
          height: 76px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .dvn-sorgu-ikon svg { width: 38px; height: 38px; }

        .dvn-sorgu-metin { position: relative; z-index: 1; flex: 1; min-width: 280px; }
        .dvn-sorgu-eyebrow {
          color: var(--dvn-altin-acik);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          margin: 0 0 8px;
        }
        .dvn-sorgu-metin h2 {
          color: #fff;
          font-size: clamp(22px, 2.6vw, 30px);
          font-weight: 600;
          line-height: 1.2;
          margin: 0 0 10px;
        }
        .dvn-sorgu-aciklama {
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
          max-width: 640px;
        }

        .dvn-sorgu-aksiyon {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .dvn-sorgu-not { color: #9aa5b1; font-size: 12px; letter-spacing: 0.3px; }

        @media (max-width: 860px) {
          .dvn-sorgu-ic { flex-direction: column; align-items: flex-start; text-align: left; padding: 32px 28px; }
          .dvn-sorgu-aksiyon { align-items: flex-start; width: 100%; }
        }
      `}</style>
    </section>
  );
}
