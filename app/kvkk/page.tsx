import type { Metadata } from "next";
import YasalSayfa from "../components/YasalSayfa";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "DVN Cert kişisel verilerin korunması (KVKK) aydınlatma metni. İşlenen veriler, işleme amaçları, hukuki sebepler, aktarım, saklama süreleri ve ilgili kişi hakları.",
  alternates: { canonical: `${siteConfig.url}/kvkk` },
};

export default function KvkkSayfasi() {
  return (
    <YasalSayfa
      baslik="KVKK Aydınlatma Metni"
      slug="/kvkk"
      aciklama="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      guncelleme="22 Mayıs 2026"
      bolumler={[
        {
          baslik: "1. Veri Sorumlusu",
          metin: [
            `İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri sorumlusu sıfatıyla ${siteConfig.adUzun} tarafından hazırlanmıştır.`,
            `Adres: ${siteConfig.adresTamMetin} · E-posta: ${siteConfig.email} · Telefon: ${siteConfig.telefonGorunen}`,
          ],
        },
        {
          baslik: "2. İşlenen Kişisel Veriler",
          metin: [
            "Sunduğumuz belgelendirme, denetim ve eğitim hizmetleri ile internet sitemiz üzerinden iletilen talepler kapsamında; kimlik bilgileri (ad, soyad), iletişim bilgileri (e-posta, telefon, adres), kuruluş/firma bilgileri, başvuru ve denetim sürecine ilişkin bilgiler ile site kullanımına dair işlem ve çerez verileri işlenebilmektedir.",
          ],
        },
        {
          baslik: "3. Kişisel Verilerin İşlenme Amaçları",
          metin: [
            "Kişisel verileriniz; belgelendirme ve denetim süreçlerinin yürütülmesi, başvuru ve taleplerinizin değerlendirilmesi ve sonuçlandırılması, iletişim faaliyetlerinin yürütülmesi, sözleşmesel ve yasal yükümlülüklerin yerine getirilmesi, hizmet kalitesinin iyileştirilmesi ve akreditasyon gerekliliklerine uyum amaçlarıyla işlenmektedir.",
          ],
        },
        {
          baslik: "4. İşlemenin Hukuki Sebepleri",
          metin: [
            "Kişisel verileriniz; KVKK’nın 5. ve 6. maddelerinde belirtilen, bir sözleşmenin kurulması veya ifası, hukuki yükümlülüğün yerine getirilmesi, bir hakkın tesisi/kullanılması/korunması ve veri sorumlusunun meşru menfaatleri hukuki sebeplerine dayanılarak; gerekli hâllerde ise açık rızanıza istinaden işlenmektedir.",
          ],
        },
        {
          baslik: "5. Kişisel Verilerin Aktarılması",
          metin: [
            "Kişisel verileriniz; mevzuattan kaynaklanan yükümlülükler çerçevesinde yetkili kamu kurum ve kuruluşları ile akreditasyon kuruluşlarına (ör. TÜRKAK), hukuki uyuşmazlıklarda yetkili mercilere ve hizmetin gerektirdiği ölçüde iş birliği yaptığımız tedarikçi/hizmet sağlayıcılara, KVKK’nın 8. ve 9. maddelerindeki şartlara uygun olarak aktarılabilir.",
          ],
        },
        {
          baslik: "6. Saklama Süresi",
          metin: [
            "Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı/saklama süreleri ile akreditasyon gereklilikleri dikkate alınarak saklanır; bu sürelerin sonunda silinir, yok edilir veya anonim hâle getirilir.",
          ],
        },
        {
          baslik: "7. İlgili Kişinin Hakları",
          metin: [
            "KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini/yok edilmesini isteme, bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz sonucu aleyhinize bir sonuç doğmasına itiraz etme ve kanuna aykırı işleme nedeniyle zararınızın giderilmesini talep etme haklarına sahipsiniz.",
          ],
        },
        {
          baslik: "8. Başvuru Yöntemi",
          metin: [
            `Yukarıdaki haklarınıza ilişkin taleplerinizi, kimliğinizi tevsik eden bilgilerle birlikte ${siteConfig.email} adresine e-posta ile veya ${siteConfig.adresTamMetin} adresine yazılı olarak iletebilirsiniz. Başvurularınız, KVKK’da öngörülen süreler içinde sonuçlandırılır.`,
          ],
        },
      ]}
    />
  );
}
