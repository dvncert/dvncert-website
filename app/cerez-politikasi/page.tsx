import type { Metadata } from "next";
import YasalSayfa from "../components/YasalSayfa";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "DVN Cert çerez politikası. İnternet sitemizde kullanılan çerez türleri, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğiniz.",
  alternates: { canonical: `${siteConfig.url}/cerez-politikasi` },
};

export default function CerezPolitikasiSayfasi() {
  return (
    <YasalSayfa
      baslik="Çerez Politikası"
      slug="/cerez-politikasi"
      aciklama="İnternet sitemizde kullanılan çerezler ve bu çerezlere ilişkin tercihlerinizi yönetme yöntemleri."
      guncelleme="22 Mayıs 2026"
      bolumler={[
        {
          baslik: "1. Çerez Nedir?",
          metin: [
            "Çerezler (cookies), bir internet sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin düzgün çalışmasını sağlamak ve kullanıcı deneyimini iyileştirmek için yaygın olarak kullanılır.",
          ],
        },
        {
          baslik: "2. Hangi Çerezleri Kullanıyoruz?",
          metin: [
            "Zorunlu Çerezler: Sitenin temel işlevlerinin (sayfa gezinimi, güvenlik vb.) çalışması için gereklidir ve devre dışı bırakılamaz.",
            "İşlevsel Çerezler: Tercihlerinizi (ör. dil seçimi) hatırlayarak deneyiminizi kişiselleştirir.",
            "Performans / Analitik Çerezler: Ziyaretçilerin siteyi nasıl kullandığını anonim olarak ölçmemize ve içeriği iyileştirmemize yardımcı olur. Bu çerezler yalnızca onayınıza bağlı olarak kullanılır.",
          ],
        },
        {
          baslik: "3. Çerezleri Yönetme",
          metin: [
            "Tarayıcınızın ayarları üzerinden çerezleri silebilir, engelleyebilir veya yalnızca belirli çerezlere izin verebilirsiniz. Zorunlu çerezlerin engellenmesi durumunda sitenin bazı bölümleri beklendiği gibi çalışmayabilir.",
            "Çerez yönetimi seçenekleri tarayıcıdan tarayıcıya farklılık gösterir; ayrıntılar için kullandığınız tarayıcının yardım sayfalarına başvurabilirsiniz.",
          ],
        },
        {
          baslik: "4. Değişiklikler ve İletişim",
          metin: [
            "Bu çerez politikası gerektiğinde güncellenebilir; güncel sürüm her zaman bu sayfada yer alır.",
            `Çerez kullanımımıza ilişkin sorularınız için ${siteConfig.email} adresinden bize ulaşabilirsiniz. Kişisel verilerin işlenmesi hakkında ayrıntılı bilgi için KVKK Aydınlatma Metni’ni inceleyebilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
