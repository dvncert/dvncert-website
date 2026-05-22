import type { Metadata } from "next";
import YasalSayfa from "../components/YasalSayfa";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "DVN Cert gizlilik politikası. İnternet sitemiz üzerinden toplanan bilgiler, bu bilgilerin kullanımı, güvenliği ve üçüncü taraflarla paylaşımına ilişkin esaslar.",
  alternates: { canonical: `${siteConfig.url}/gizlilik` },
};

export default function GizlilikSayfasi() {
  return (
    <YasalSayfa
      baslik="Gizlilik Politikası"
      slug="/gizlilik"
      aciklama="Kişisel verilerinizin ve mahremiyetinizin korunmasına verdiğimiz önemin bir parçası olarak gizlilik esaslarımız."
      guncelleme="22 Mayıs 2026"
      bolumler={[
        {
          baslik: "1. Giriş",
          metin: [
            `${siteConfig.adUzun} olarak, internet sitemizi ziyaret eden ve hizmetlerimizden yararlanan kişilerin gizliliğine önem veriyoruz. Bu politika, sitemiz aracılığıyla toplanan bilgilerin nasıl işlendiğini ve korunduğunu açıklar. Kişisel verilerin işlenmesine ilişkin ayrıntılı bilgi için KVKK Aydınlatma Metni’ni inceleyebilirsiniz.`,
          ],
        },
        {
          baslik: "2. Topladığımız Bilgiler",
          metin: [
            "İletişim ve başvuru formları aracılığıyla tarafımıza ilettiğiniz ad-soyad, e-posta, telefon ve mesaj içeriği gibi bilgileri; ayrıca sitenin işleyişi ve iyileştirilmesi için zorunlu/işlevsel çerezler yoluyla elde edilen teknik verileri toplayabiliriz.",
          ],
        },
        {
          baslik: "3. Bilgilerin Kullanımı",
          metin: [
            "Toplanan bilgiler; talep ve başvurularınızın yanıtlanması, belgelendirme/denetim/eğitim süreçlerinin yürütülmesi, hizmet kalitesinin iyileştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla kullanılır. Bilgileriniz, izniniz olmaksızın pazarlama amacıyla üçüncü taraflara satılmaz veya kiralanmaz.",
          ],
        },
        {
          baslik: "4. Bilgi Güvenliği",
          metin: [
            "Kişisel verilerinizin yetkisiz erişime, kayba veya kötüye kullanıma karşı korunması için uygun teknik ve idari tedbirleri uygularız. Buna rağmen internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olduğunun garanti edilemeyeceğini hatırlatırız.",
          ],
        },
        {
          baslik: "5. Üçüncü Taraflar",
          metin: [
            "Hizmetlerimizin sunulması için iş birliği yaptığımız tedarikçiler ve yasal merciler dışında bilgileriniz üçüncü taraflarla paylaşılmaz. Sitemiz, üçüncü taraf bağlantıları (ör. başvuru sistemimiz DBYS) içerebilir; bu sitelerin gizlilik uygulamalarından DVN Cert sorumlu değildir.",
          ],
        },
        {
          baslik: "6. Çerezler",
          metin: [
            "Sitemizde çerezler kullanılmaktadır. Çerez türleri ve yönetimi hakkında ayrıntılı bilgi için Çerez Politikası sayfamızı inceleyebilirsiniz.",
          ],
        },
        {
          baslik: "7. Değişiklikler",
          metin: [
            "Bu gizlilik politikası zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır; önemli değişikliklerde sayfanın üst kısmındaki güncelleme tarihi yenilenir.",
          ],
        },
        {
          baslik: "8. İletişim",
          metin: [
            `Gizlilik uygulamalarımıza ilişkin sorularınız için ${siteConfig.email} adresinden bize ulaşabilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
