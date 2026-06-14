import type { Metadata } from "next";
import Link from "next/link";
import SayfaBaslik from "../components/SayfaBaslik";
import { sayfaMetadataUret } from "@/lib/seo-yardimci";
import { breadcrumbSchema, schemaScript } from "@/lib/seo-schemas";

export async function generateMetadata(): Promise<Metadata> {
  return sayfaMetadataUret({
    yol: "/itiraz-ve-sikayet",
    title: "İtiraz ve Şikayet Süreci",
    description:
      "DVN Cert belgelendirme kararlarına itiraz ve hizmetlerimize ilişkin şikâyetlerin tarafsız biçimde değerlendirildiği süreç. İtiraz ve şikâyet nasıl yapılır, nasıl sonuçlandırılır?",
  });
}

const bolumler = [
  {
    baslik: "İtiraz ve şikâyet nedir?",
    metin:
      "İtiraz; bir kuruluşun, kendisiyle ilgili bir belgelendirme kararının yeniden değerlendirilmesi talebidir. Şikâyet ise bir kişi veya kuruluşun, DVN Cert'in faaliyetlerine veya belgelendirdiği bir kuruluşa ilişkin memnuniyetsizliğini bildirmesidir. Her ikisi de tarafsızlık ve gizlilik ilkeleriyle ele alınır.",
  },
  {
    baslik: "Nasıl başvurulur?",
    metin:
      "İtiraz ve şikâyetlerinizi web sitemizdeki Şikayet ve Görüşler formu üzerinden iletebilirsiniz. Başvurunuzda; tarafların bilgileri, varsa ilgili sertifika numarası/kuruluş ve konunun açık bir tanımı yer almalıdır. Başvurular ayrıca e-posta ile de iletilebilir.",
  },
  {
    baslik: "Değerlendirme süreci",
    metin:
      "Başvurunuzun alındığı teyit edilir. İtiraz veya şikâyet, konuya taraf olmayan yetkili kişiler tarafından, gerekli bilgi ve kanıtlar toplanarak değerlendirilir. Karar; başvuru sahibini etkileyecek konularda tarafsızlığı güvence altına alan kişilerce verilir ve gözden geçirilir.",
  },
  {
    baslik: "Sonuçlandırma ve geri bildirim",
    metin:
      "Değerlendirme tamamlandığında alınan karar ve gerekçesi başvuru sahibine resmî olarak bildirilir. Gerektiğinde düzeltici faaliyetler başlatılır. Süreç boyunca gizlilik korunur ve başvuru sahibine hiçbir şekilde ayrımcı muamele yapılmaz.",
  },
];

export default function ItirazSikayetSayfasi() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(
          breadcrumbSchema([
            { ad: "Ana Sayfa", url: "/" },
            { ad: "İtiraz ve Şikayet", url: "/itiraz-ve-sikayet" },
          ]),
        )}
      />

      <SayfaBaslik
        etiket="BELGELENDİRME"
        baslik="İtiraz ve Şikayet Süreci"
        aciklama="Belgelendirme kararlarına itiraz ve hizmetlerimize ilişkin şikâyetlerin tarafsız biçimde değerlendirilmesi."
        kirintilar={[{ etiket: "İtiraz ve Şikayet" }]}
      />

      <section style={{ background: "white", padding: "50px 32px 30px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {bolumler.map((b, i) => (
            <div key={i} style={{ marginBottom: 26 }}>
              <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.35 }}>{b.baslik}</h2>
              <p style={{ fontSize: 14.5, color: "var(--dvn-gri-700)", lineHeight: 1.8, margin: 0 }}>{b.metin}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "white", padding: "0 32px 70px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", background: "var(--dvn-gri-50)", borderRadius: 16, padding: "30px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18, border: "0.5px solid var(--dvn-gri-300)" }}>
          <div>
            <h2 style={{ color: "var(--dvn-lacivert)", fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>İtiraz veya şikâyetinizi iletin</h2>
            <p style={{ color: "var(--dvn-gri-500)", fontSize: 13.5, margin: 0 }}>Başvurunuz tarafsızlık ve gizlilik ilkeleriyle değerlendirilir.</p>
          </div>
          <Link href="/sikayet-ve-gorusler" style={{ background: "var(--dvn-gradient-turuncu)", color: "white", padding: "13px 26px", borderRadius: "var(--dvn-radius-md)", fontWeight: 500, fontSize: 14, boxShadow: "0 8px 20px rgba(245,130,32,0.3)", whiteSpace: "nowrap" }}>
            Şikayet / İtiraz Formu →
          </Link>
        </div>
      </section>
    </main>
  );
}
