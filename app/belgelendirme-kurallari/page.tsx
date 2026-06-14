import type { Metadata } from "next";
import YasalSayfa from "../components/YasalSayfa";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Belgelendirme Kuralları",
  description:
    "DVN Cert belgelendirme kuralları: belge geçerliliği, gözetim, yeniden belgelendirme, kapsam değişikliği, belgenin askıya alınması, iptali ve transfer (belge devri) koşulları.",
  alternates: { canonical: `${siteConfig.url}/belgelendirme-kurallari` },
};

export default function BelgelendirmeKurallariSayfasi() {
  return (
    <YasalSayfa
      etiket="BELGELENDİRME"
      baslik="Belgelendirme Kuralları"
      slug="/belgelendirme-kurallari"
      aciklama="Belgelendirme sürecinin sürdürülmesine, belgenin geçerliliğine, askıya alınmasına, iptaline ve transferine ilişkin genel kurallar."
      guncelleme="14 Haziran 2026"
      bolumler={[
        {
          baslik: "1. Genel İlkeler",
          metin: [
            "DVN Cert belgelendirme faaliyetlerini tarafsızlık, bağımsızlık ve gizlilik ilkeleri ile ilgili akreditasyon ve standart gerekliliklerine (ISO/IEC 17021-1) uygun olarak yürütür. Belge sahibi kuruluşlar, belgenin geçerliliği süresince aşağıdaki kurallara uymakla yükümlüdür.",
            "Bu sayfa genel bilgilendirme amaçlıdır; ayrıntılı şartlar belgelendirme sözleşmesinde ve ilgili prosedürlerde yer alır.",
          ],
        },
        {
          baslik: "2. Belgenin Geçerliliği",
          metin: [
            "Belge, üzerinde belirtilen kapsam ve geçerlilik süresi (genellikle 3 yıl) için düzenlenir. Geçerlilik; planlanan gözetim denetimlerinin zamanında yapılması ve yönetim sisteminin standardın gerekliliklerini karşılamaya devam etmesi koşuluna bağlıdır.",
          ],
        },
        {
          baslik: "3. Gözetim ve Yeniden Belgelendirme",
          metin: [
            "Belge geçerliliği boyunca yıllık gözetim denetimleri yapılır; üçüncü yılın sonunda yeniden belgelendirme denetimi ile belge yenilenir. Gözetim denetimlerinin planlanan zamanda yapılamaması belgenin askıya alınmasına yol açabilir.",
          ],
        },
        {
          baslik: "4. Kapsam Değişikliği",
          metin: [
            "Belge kapsamının genişletilmesi taleplerinde, ek faaliyet/saha için gerekli değerlendirme yapılır. Kuruluş, faaliyetlerinde belge kapsamını etkileyen değişiklikleri (faaliyet alanı, hukuki/ticari/organizasyonel durum, adres, üst yönetim, yönetim sistemi) DVN Cert'e bildirmekle yükümlüdür.",
          ],
        },
        {
          baslik: "5. Belgenin Askıya Alınması",
          metin: [
            "Belge; gözetim denetimlerinin yapılamaması, tespit edilen uygunsuzlukların belirlenen sürede giderilmemesi, belge ve markaların hatalı kullanımı ya da kuruluşun kurallara uymaması gibi durumlarda geçici olarak askıya alınabilir. Askı süresince kuruluş belgeye atıfta bulunamaz ve belge/markaları kullanamaz. Askı nedeninin giderilmesiyle belge yeniden geçerli kılınır.",
          ],
        },
        {
          baslik: "6. Belgenin İptali (Geri Çekilmesi)",
          metin: [
            "Askı süresi içinde nedenin giderilmemesi, ağır veya tekrar eden uygunsuzluklar ya da kuruluşun talebi gibi durumlarda belge iptal edilir. İptal hâlinde kuruluş, belge ve tüm marka/logo kullanımını derhal durdurur ve belgeyi ibraz etmeyi gerektiren her türlü tanıtım malzemesini günceller.",
          ],
        },
        {
          baslik: "7. Belge Transferi (Devir)",
          metin: [
            "Başka bir akredite belgelendirme kuruluşundan alınmış geçerli bir belge, ilgili akreditasyon kuralları (IAF) çerçevesinde DVN Cert'e transfer edilebilir. Transfer; mevcut belgenin geçerliliği, kapsamı, açık uygunsuzlukların durumu ve şikâyet kayıtlarının gözden geçirilmesini içeren bir değerlendirmeyle gerçekleştirilir.",
          ],
        },
        {
          baslik: "8. Belge ve Markaların Kullanımı",
          metin: [
            "Belge sahibi kuruluş, belge ve markaları yalnızca belgelendirilen kapsam dâhilinde ve yanıltıcı olmayacak şekilde kullanır. Marka ve logo kullanımına ilişkin kurallar Marka ve Logo Kullanımı sayfasında ayrıntılı olarak açıklanmıştır.",
          ],
        },
        {
          baslik: "9. İtiraz ve Şikâyetler",
          metin: [
            "Belgelendirme kararlarına itiraz ve her türlü şikâyet, İtiraz ve Şikayet sayfasında açıklanan süreç üzerinden değerlendirilir. Tüm itiraz ve şikâyetler tarafsızlık ilkesiyle ele alınır.",
          ],
        },
        {
          baslik: "10. Yürürlük",
          metin: [
            `Bu kurallar hakkında ayrıntılı bilgi için belgelendirme sözleşmesine başvurabilir veya ${siteConfig.email} adresinden bizimle iletişime geçebilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
