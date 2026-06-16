import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import SertifikaSorgulaFormu from "../components/SertifikaSorgulaFormu";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/sertifika-sorgula",
    title: "Sertifika Sorgula / Belge Doğrulama",
    description:
      "DVN Cert tarafından düzenlenen ISO belgelerinin geçerliliğini doğrulayın. Sertifika numarası ve firma bilgisiyle belge doğrulama talebi oluşturun.",
  });
}

export default function SertifikaSorgulaSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "Sertifika Sorgula", url: "/sertifika-sorgula" },
          ]),
        )}
      />

      <SayfaBaslik
        etiket="BELGE DOĞRULAMA"
        baslik="Sertifika Sorgula"
        aciklama="DVN Cert tarafından düzenlenen belgelerin geçerliliğini doğrulayın."
        kirintilar={[{ etiket: "Sertifika Sorgula" }]}
      />

      <section style={{ background: "white", padding: "50px 32px 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 15, color: "var(--dvn-gri-700)", lineHeight: 1.8, margin: "0 0 18px" }}>
            DVN Cert tarafından düzenlenen ISO yönetim sistemi belgelerinin geçerliliğini, askıya alınma veya
            iptal durumunu <strong>TÜRKAK Belge Doğrulama Sistemi (TBDS)</strong> üzerinden çevrim içi
            sorgulayabilirsiniz.
          </p>

          <Link
            href="https://tbds.turkak.org.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="dvn-btn-primary"
            style={{ marginBottom: 26, fontSize: 14.5, padding: "14px 28px" }}
          >
            TÜRKAK TBDS&apos;de Sertifika Sorgula →
          </Link>
          <div
            style={{
              background: "var(--dvn-altin-soluk)",
              border: "0.5px solid var(--dvn-gri-300)",
              borderRadius: 12,
              padding: "16px 18px",
              fontSize: 13.5,
              color: "var(--dvn-gri-700)",
              lineHeight: 1.7,
              margin: "0 0 8px",
            }}
          >
            Belge sahibi kuruluşsanız, belgelerinize ve süreçlerinize çevrim içi başvuru ve takip sistemimiz
            (DBYS) üzerinden de ulaşabilirsiniz:{" "}
            <Link href="https://dbys.dvncert.com/login" target="_blank" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
              Müşteri Girişi →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: "white", padding: "20px 32px 60px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--dvn-gri-50)", borderRadius: 16, padding: "32px 28px", border: "0.5px solid var(--dvn-gri-300)" }}>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 600, margin: "0 0 18px" }}>
            Belge Doğrulama Talebi
          </h2>
          <SertifikaSorgulaFormu />
        </div>
      </section>

      <section style={{ background: "var(--dvn-gri-50)", padding: "0 32px 70px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Link href="/akreditasyonlarimiz" style={baglantiStili}>Akreditasyon Durumu →</Link>
          <Link href="/belgelendirme-kurallari" style={baglantiStili}>Belgelendirme Kuralları →</Link>
          <Link href="/iletisim" style={baglantiStili}>Bize Ulaşın →</Link>
        </div>
      </section>
    </main>
  );
}

const baglantiStili: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13.5,
  fontWeight: 500,
  color: "var(--dvn-lacivert)",
  background: "white",
  border: "0.5px solid var(--dvn-gri-300)",
  borderRadius: 999,
  padding: "8px 16px",
  textDecoration: "none",
};
