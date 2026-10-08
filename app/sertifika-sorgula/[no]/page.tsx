import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SayfaBaslik from "../../components/SayfaBaslik";
import SertifikaNoFormu from "../../components/SertifikaNoFormu";
import { sertifikaNoNormalize, sertifikaSorgula } from "@/lib/sertifika";

type Params = { params: Promise<{ no: string }> };

// İptal edilen sertifika anında yansısın diye her istekte sorgulanır.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sertifika Doğrulama Sonucu",
  robots: { index: false, follow: false },
};

export default async function SertifikaSonucSayfasi({ params }: Params) {
  const { no: hamNo } = await params;
  const no = sertifikaNoNormalize(decodeURIComponent(hamNo));
  if (no && no !== hamNo) redirect(`/sertifika-sorgula/${no}`);

  const sonuc = await sertifikaSorgula(no);
  const durum = !sonuc ? "yok" : sonuc.iptal ? "iptal" : "gecerli";
  const renk = { gecerli: "#15803d", iptal: "#b91c1c", yok: "#b45309" }[durum];
  const zemin = { gecerli: "#f0fdf4", iptal: "#fef2f2", yok: "#fffbeb" }[durum];

  return (
    <main>
      <SayfaBaslik
        etiket="BELGE DOĞRULAMA"
        baslik="Sertifika Doğrulama"
        aciklama="DVN Cert tarafından düzenlenen sertifikaların doğrulama sonucu."
        kirintilar={[{ etiket: "Sertifika Sorgula", href: "/sertifika-sorgula" }, { etiket: no }]}
      />

      <section style={{ background: "white", padding: "50px 20px 30px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ border: `1px solid ${renk}33`, background: zemin, borderRadius: 16, padding: "22px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span
              aria-hidden
              style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", background: renk, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                {durum === "gecerli" ? <path d="M20 6 9 17l-5-5" /> : durum === "iptal" ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M12 8v5M12 16.5h.01" />}
              </svg>
            </span>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ margin: "2px 0 6px", fontSize: 20, fontWeight: 600, color: renk }}>
                {durum === "gecerli" && "Sertifika geçerlidir"}
                {durum === "iptal" && "Sertifika iptal edilmiştir"}
                {durum === "yok" && "Sertifika bulunamadı"}
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: "var(--dvn-gri-700)", lineHeight: 1.7 }}>
                {durum === "gecerli" && "Bu sertifika DVN Cert tarafından düzenlenmiştir ve kayıtlarımızla eşleşmektedir."}
                {durum === "iptal" && "Bu numaralı sertifika DVN Cert tarafından düzenlenmiş, ancak iptal edilmiştir; geçerli değildir."}
                {durum === "yok" && (
                  <>
                    <strong>{no || hamNo}</strong> numaralı bir sertifika kayıtlarımızda bulunamadı. Numarayı kontrol
                    ederek tekrar deneyin.
                  </>
                )}
              </p>
            </div>
          </div>

          {sonuc && (
            <dl className="dvn-sonuc-tablo">
              <dt>Sertifika No</dt>
              <dd style={{ fontFamily: "monospace", fontSize: 16, letterSpacing: 2 }}>{sonuc.sertifikaNo}</dd>
              <dt>Sertifika Türü</dt>
              <dd>Eğitim Sertifikası</dd>
              <dt>Katılımcı</dt>
              <dd style={{ fontWeight: 600 }}>{sonuc.katilimciAdi}</dd>
              <dt>Eğitim</dt>
              <dd>{sonuc.egitimAdi}</dd>
              <dt>Eğitim Tarihi</dt>
              <dd>{sonuc.egitimTarihi}</dd>
              <dt>Eğitmen</dt>
              <dd>{sonuc.egitmen}</dd>
            </dl>
          )}

          {durum === "yok" && (
            <p style={{ fontSize: 13.5, color: "var(--dvn-gri-700)", lineHeight: 1.7, marginTop: 18 }}>
              ISO yönetim sistemi belgeleri için{" "}
              <Link href="/sertifika-sorgula#dogrulama-talebi" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>
                belge doğrulama talebi
              </Link>{" "}
              oluşturabilir veya <Link href="/iletisim" style={{ color: "var(--dvn-turuncu)", fontWeight: 500 }}>bize ulaşabilirsiniz</Link>.
            </p>
          )}
        </div>
      </section>

      <section style={{ background: "white", padding: "0 20px 70px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", background: "var(--dvn-gri-50)", border: "0.5px solid var(--dvn-gri-300)", borderRadius: 16, padding: "22px 24px" }}>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 12px" }}>Başka bir sertifika sorgula</h2>
          <SertifikaNoFormu />
        </div>
      </section>

      <style>{`
        .dvn-sonuc-tablo {
          display: grid; grid-template-columns: 160px 1fr; margin: 22px 0 0;
          border: 0.5px solid var(--dvn-gri-300); border-radius: 14px; overflow: hidden; font-size: 14.5px;
        }
        .dvn-sonuc-tablo dt, .dvn-sonuc-tablo dd { margin: 0; padding: 12px 18px; border-top: 0.5px solid var(--dvn-gri-300); }
        .dvn-sonuc-tablo dt:first-of-type, .dvn-sonuc-tablo dt:first-of-type + dd { border-top: none; }
        .dvn-sonuc-tablo dt { background: var(--dvn-gri-50); color: var(--dvn-gri-500); font-size: 13px; font-weight: 500; }
        .dvn-sonuc-tablo dd { color: var(--dvn-lacivert); overflow-wrap: anywhere; }
        @media (max-width: 520px) {
          .dvn-sonuc-tablo { grid-template-columns: 1fr; }
          .dvn-sonuc-tablo dd { border-top: none; padding-top: 0; }
          .dvn-sonuc-tablo dt { background: none; padding-bottom: 4px; }
        }
      `}</style>
    </main>
  );
}
