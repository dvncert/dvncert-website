import Link from "next/link";
import Image from "next/image";
import BultenFormu from "./BultenFormu";

export default function Footer() {
  const yil = new Date().getFullYear();

  return (
    <footer>
      <div className="dvn-footer-cta" style={{ background: "var(--dvn-gradient-lacivert)", padding: "38px 32px", position: "relative", overflow: "hidden" }}>
        <div className="dvn-grid-desen" aria-hidden style={{ opacity: 0.5 }} />
        <span className="dvn-glow-orb dvn-glow-orb--altin" aria-hidden style={{ top: -120, right: "12%", width: 300, height: 300, opacity: 0.35 }} />
        <span className="dvn-glow-orb dvn-glow-orb--turuncu" aria-hidden style={{ bottom: -140, left: -40, width: 260, height: 260, opacity: 0.25 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, position: "relative", zIndex: 1 }}>
          <div>
            <h2 style={{ color: "white", fontSize: 23, fontWeight: 600, margin: "0 0 6px" }}>
              Belgelendirme süreciniz için <span className="dvn-altin-vurgu">ücretsiz teklif</span> alın
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 13.5, margin: 0 }}>Online başvuru sistemimiz ile dakikalar içinde başvurunuzu oluşturun.</p>
          </div>
          <Link href="https://dbys.dvncert.com/basvuru" target="_blank" className="dvn-btn-primary" style={{ padding: "13px 26px", fontSize: 14 }}>
            Hemen başvur →
          </Link>
        </div>
      </div>

      <div className="dvn-footer-alt" style={{ background: "var(--dvn-lacivert-koyu)", padding: "40px 32px 24px", color: "#94a3b8", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32 }}>
          <div>
            <div
              style={{
                background: "white",
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 8,
                marginBottom: 14,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <Image
                src="/logo.webp"
                alt="DVN Cert Belgelendirme"
                width={105}
                height={70}
                style={{ height: 70, width: "auto", display: "block" }}
              />
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>Bağımsız ve tarafsız bir uygunluk değerlendirme kuruluşu.</p>
            <a href="mailto:info@dvncert.com" style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 6 }}>✉ info@dvncert.com</a>
            <a href="tel:+905300448037" style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 6 }}>☎ +90 530 044 80 37</a>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>📍 Güzelyalı Mah. Eyüp Sultan Cad. No:32/A Pendik / İstanbul</p>
            <p style={{ fontSize: 11.5, color: "var(--dvn-altin-acik)", fontWeight: 500, margin: "18px 0 0" }}>Bültenimize abone olun</p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>Duyuru ve içeriklerden haberdar olun.</p>
            <BultenFormu />
          </div>

          <div>
            <p style={{ fontSize: 12, color: "var(--dvn-altin-acik)", fontWeight: 500, margin: "0 0 12px" }}>KURUMSAL</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/hakkimizda" style={{ fontSize: 12, color: "#94a3b8" }}>Hakkımızda</Link>
              <Link href="/ekibimiz" style={{ fontSize: 12, color: "#94a3b8" }}>Ekibimiz</Link>
              <Link href="/akreditasyonlarimiz" style={{ fontSize: 12, color: "#94a3b8" }}>Akreditasyon Durumu</Link>
              <Link href="/politika-ve-beyanlar" style={{ fontSize: 12, color: "#94a3b8" }}>Politika ve Beyanlar</Link>
              <Link href="/belgelendirme-kurallari" style={{ fontSize: 12, color: "#94a3b8" }}>Belgelendirme Kuralları</Link>
              <Link href="/marka-ve-logo-kullanimi" style={{ fontSize: 12, color: "#94a3b8" }}>Marka ve Logo Kullanımı</Link>
              <Link href="/kariyer" style={{ fontSize: 12, color: "#94a3b8" }}>Kariyer</Link>
              <Link href="/blog" style={{ fontSize: 12, color: "#94a3b8" }}>Blog</Link>
            </div>
          </div>

          <div>
            <p style={{ fontSize: 12, color: "var(--dvn-altin-acik)", fontWeight: 500, margin: "0 0 12px" }}>HİZMETLER</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/hizmetler/iso-9001" style={{ fontSize: 12, color: "#94a3b8" }}>ISO 9001</Link>
              <Link href="/hizmetler/iso-14001" style={{ fontSize: 12, color: "#94a3b8" }}>ISO 14001</Link>
              <Link href="/hizmetler/iso-45001" style={{ fontSize: 12, color: "#94a3b8" }}>ISO 45001</Link>
              <Link href="/hizmetler/iso-50001" style={{ fontSize: 12, color: "#94a3b8" }}>ISO 50001</Link>
              <Link href="/hizmetler/2-taraf-denetimleri" style={{ fontSize: 12, color: "#94a3b8" }}>Tedarikçi Denetimi</Link>
              <Link href="/egitimler" style={{ fontSize: 12, color: "#94a3b8" }}>Eğitimler</Link>
              <Link href="/belgelendirme-sureci" style={{ fontSize: 12, color: "#94a3b8" }}>Belgelendirme Süreci</Link>
            </div>
          </div>

          <div>
            <p style={{ fontSize: 12, color: "var(--dvn-altin-acik)", fontWeight: 500, margin: "0 0 12px" }}>İLETİŞİM</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/iletisim" style={{ fontSize: 12, color: "#94a3b8" }}>Bize Ulaşın</Link>
              <Link href="https://dbys.dvncert.com/basvuru" target="_blank" style={{ fontSize: 12, color: "#94a3b8" }}>Başvuru Yap</Link>
              <Link href="https://tbds.turkak.org.tr" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#94a3b8" }}>Sertifika Sorgula</Link>
              <Link href="/sikayet-ve-gorusler" style={{ fontSize: 12, color: "#94a3b8" }}>Şikayet ve Görüşler</Link>
              <Link href="/itiraz-ve-sikayet" style={{ fontSize: 12, color: "#94a3b8" }}>İtiraz ve Şikayet Süreci</Link>
              <Link href="/sss" style={{ fontSize: 12, color: "#94a3b8" }}>Sıkça Sorulan Sorular</Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", marginTop: 32, paddingTop: 20, maxWidth: 1280, margin: "32px auto 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>© {yil} DVN Cert. Tüm hakları saklıdır.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/kvkk" style={{ fontSize: 11, color: "#64748b" }}>KVKK</Link>
            <Link href="/cerez-politikasi" style={{ fontSize: 11, color: "#64748b" }}>Çerez Politikası</Link>
            <Link href="/gizlilik" style={{ fontSize: 11, color: "#64748b" }}>Gizlilik</Link>
          </div>
        </div>
      </div>

      <style>{`
        .dvn-footer-alt::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--dvn-altin), var(--dvn-turuncu), transparent);
          background-size: 200% 100%;
          animation: dvn-gradyan-kay 7s linear infinite;
        }
        .dvn-footer-alt a {
          transition: color 0.2s ease, transform 0.2s ease;
          width: fit-content;
        }
        .dvn-footer-alt a:hover {
          color: var(--dvn-turuncu-acik) !important;
          transform: translateX(3px);
        }
      `}</style>
    </footer>
  );
}
