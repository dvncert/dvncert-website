import type { Metadata } from "next";
import Image from "next/image";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Logolarımız",
  description:
    "DVN Cert kurumsal logosu ve marka kullanım kuralları. Logomuzun doğru kullanımına ilişkin yönergeler ve indirilebilir logo dosyaları.",
  alternates: { canonical: `${siteConfig.url}/logolarimiz` },
};

const yapilmasiGerekenler = [
  "Logoyu orijinal en-boy oranını koruyarak kullanın.",
  "Logonun çevresinde yeterli boşluk (temiz alan) bırakın.",
  "Yalnızca tarafımızca sağlanan güncel logo dosyalarını kullanın.",
  "Logoyu okunabilirliği koruyan, kontrastı yeterli zeminlerde kullanın.",
];

const yapilmamasiGerekenler = [
  "Logonun renklerini, oranlarını veya öğelerini değiştirmeyin.",
  "Logoyu eğmeyin, döndürmeyin veya gölge/efekt eklemeyin.",
  "Düşük çözünürlüklü veya bozulmuş kopyalar kullanmayın.",
  "Logoyu, belgelendirme kapsamı dışında yanıltıcı biçimde kullanmayın.",
];

export default function LogolarimizSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Logolarımız", url: "/logolarimiz" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="KURUMSAL"
        baslik="Logolarımız"
        aciklama="Kurumsal logomuzun doğru ve tutarlı kullanımı için yönergeler ve indirilebilir dosyalar."
        kirintilar={[{ etiket: "Kurumsal" }, { etiket: "Logolarımız" }]}
      />

      <KapakGorsel alt="DVN Cert kurumsal logo ve marka kullanımı" etiket="Marka ve logo kullanım kuralları" oncelik />

      {/* Logo indirme kartları */}
      <section style={{ background: "white", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              LOGO DOSYALARI
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              DVN Cert kurumsal logosu
            </h2>
          </div>

          <div
            className="dvn-logo-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {/* Açık zemin */}
            <LogoKart zeminKoyu={false} baslik="Açık zemin için" />
            {/* Koyu zemin */}
            <LogoKart zeminKoyu={true} baslik="Koyu zemin için" />
          </div>
        </div>
      </section>

      {/* Kullanım kuralları */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
              MARKA KULLANIMI
            </p>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 26, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
              Logo kullanım kuralları
            </h2>
          </div>

          <div
            className="dvn-kural-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {/* Yapılması gerekenler */}
            <div style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", borderTop: "3px solid var(--dvn-altin)" }}>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 18px", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--dvn-altin)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Yapılması gerekenler
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                {yapilmasiGerekenler.map((k, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--dvn-altin)", flexShrink: 0 }}>✓</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            {/* Yapılmaması gerekenler */}
            <div style={{ background: "white", borderRadius: 14, padding: "28px 26px", border: "0.5px solid var(--dvn-gri-300)", borderTop: "3px solid var(--dvn-turuncu)" }}>
              <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16.5, fontWeight: 600, margin: "0 0 18px", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 9l-6 6M9 9l6 6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--dvn-turuncu)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Yapılmaması gerekenler
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                {yapilmamasiGerekenler.map((k, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--dvn-turuncu)", flexShrink: 0 }}>✕</span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--dvn-gri-500)", margin: "28px auto 0", maxWidth: 720, lineHeight: 1.6 }}>
            Belgelendirilen kuruluşların sertifika ve akreditasyon markalarını kullanımına ilişkin ayrıntılı
            kurallar için lütfen <strong>Politika ve Beyanlar</strong> bölümünü inceleyiniz.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .dvn-logo-grid { grid-template-columns: 1fr !important; }
          .dvn-kural-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function LogoKart({ zeminKoyu, baslik }: { zeminKoyu: boolean; baslik: string }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: 20, border: "0.5px solid var(--dvn-gri-300)", boxShadow: "0 4px 16px rgba(46,26,107,0.06)" }}>
      <div
        style={{
          background: zeminKoyu ? "var(--dvn-gradient-lacivert)" : "var(--dvn-gri-50)",
          borderRadius: 12,
          padding: "40px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          minHeight: 150,
          border: zeminKoyu ? "none" : "0.5px solid var(--dvn-gri-300)",
        }}
      >
        <Image src="/logo.webp" alt="DVN Cert Belgelendirme logosu" width={126} height={84} style={{ height: 84, width: "auto" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--dvn-lacivert)", margin: "0 0 2px" }}>{baslik}</p>
          <p style={{ fontSize: 12, color: "var(--dvn-gri-500)", margin: 0 }}>PNG · Yatay logo</p>
        </div>
        <a
          href="/logo.png"
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "var(--dvn-gradient-turuncu)",
            color: "white",
            padding: "9px 18px",
            borderRadius: "var(--dvn-radius-md)",
            fontWeight: 500,
            fontSize: 13,
            boxShadow: "0 6px 16px rgba(245,130,32,0.28)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          İndir
        </a>
      </div>
    </div>
  );
}
