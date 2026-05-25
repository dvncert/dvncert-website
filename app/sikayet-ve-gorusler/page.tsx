import type { Metadata } from "next";
import SayfaBaslik from "../components/SayfaBaslik";
import KapakGorsel from "../components/KapakGorsel";
import SikayetFormu from "../components/SikayetFormu";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Şikayet ve Görüşler",
  description:
    "DVN Cert belgelendirme hizmetlerine ilişkin şikayet, itiraz, öneri ve görüşlerinizi iletin. Tüm başvurular tarafsızlık ve gizlilik ilkeleriyle değerlendirilir.",
  alternates: { canonical: `${siteConfig.url}/sikayet-ve-gorusler` },
};

const surec = [
  {
    baslik: "Başvuru",
    aciklama: "Şikayet, itiraz, öneri veya görüşünüzü formu doldurarak ya da bize ulaşarak iletirsiniz.",
  },
  {
    baslik: "Kayıt ve Değerlendirme",
    aciklama: "Her başvuru kayıt altına alınır; tarafsızlık, gizlilik ve adil değerlendirme ilkeleriyle ele alınır.",
  },
  {
    baslik: "Sonuç Bildirimi",
    aciklama: "Değerlendirme tamamlandığında sonuç başvurana yazılı olarak bildirilir; gerekirse itiraz hakkı tanınır.",
  },
];

export default function SikayetVeGoruslerSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "İletişim", url: "/iletisim" },
            { ad: "Şikayet ve Görüşler", url: "/sikayet-ve-gorusler" },
          ])
        )}
      />

      <SayfaBaslik
        etiket="İLETİŞİM"
        baslik="Şikayet ve Görüşler"
        aciklama="Hizmet kalitemizi sürekli iyileştirmek için geri bildirimlerinize değer veriyoruz."
        kirintilar={[{ etiket: "İletişim", href: "/iletisim" }, { etiket: "Şikayet ve Görüşler" }]}
      />

      <KapakGorsel alt="DVN Cert şikayet ve görüş bildirimi" etiket="Görüş, öneri, şikayet ve itirazlarınız" oncelik />

      {/* Giriş */}
      <section style={{ background: "white", padding: "60px 32px 36px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 10px" }}>
            GERİ BİLDİRİM
          </p>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 25, fontWeight: 500, margin: "0 0 16px", lineHeight: 1.3 }}>
            Her görüş, daha iyi bir hizmet için fırsattır
          </h2>
          <p style={{ fontSize: 15, color: "var(--dvn-gri-500)", lineHeight: 1.8, margin: 0 }}>
            Belgelendirme süreçlerimize, denetimlerimize veya hizmet kalitemize ilişkin şikayet, itiraz, öneri ve
            görüşlerinizi bize iletebilirsiniz. Tüm başvurular bağımsızlık, tarafsızlık ve gizlilik ilkelerine uygun
            olarak değerlendirilir ve kayıt altına alınır.
          </p>
        </div>
      </section>

      {/* Süreç */}
      <section style={{ background: "white", padding: "0 32px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="dvn-sikayet-surec" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {surec.map((adim, i) => (
              <div
                key={adim.baslik}
                style={{
                  background: "var(--dvn-gri-50)",
                  borderRadius: 14,
                  padding: "26px 24px",
                  border: "0.5px solid var(--dvn-gri-300)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "var(--dvn-gradient-turuncu)",
                    color: "white",
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 16,
                    boxShadow: "0 6px 16px rgba(245,130,32,0.3)",
                  }}
                >
                  {i + 1}
                </span>
                <h3 style={{ color: "var(--dvn-lacivert)", fontSize: 16, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.3 }}>
                  {adim.baslik}
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--dvn-gri-500)", lineHeight: 1.65, margin: 0 }}>{adim.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: "var(--dvn-gri-50)", padding: "60px 32px 70px" }}>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            background: "white",
            border: "0.5px solid var(--dvn-gri-300)",
            borderRadius: 16,
            padding: "34px 32px",
            boxShadow: "0 8px 32px rgba(2,35,152,0.06)",
          }}
        >
          <p style={{ fontSize: 11, color: "var(--dvn-turuncu)", fontWeight: 500, letterSpacing: "1.5px", margin: "0 0 8px" }}>
            BAŞVURU FORMU
          </p>
          <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 500, margin: "0 0 24px", lineHeight: 1.3 }}>
            Talebinizi iletin
          </h2>
          <SikayetFormu />
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .dvn-sikayet-surec { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
