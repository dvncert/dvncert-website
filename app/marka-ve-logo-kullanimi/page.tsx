import type { Metadata } from "next";
import YasalSayfa from "../components/YasalSayfa";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Marka ve Logo Kullanımı",
  description:
    "DVN Cert belge sahibi kuruluşlar için marka ve logo (belgelendirme markası) kullanım kuralları: doğru kullanım, yanıltıcı kullanım yasağı, ürün üzerinde kullanım ve askı/iptal hâlinde kullanım.",
  alternates: { canonical: `${siteConfig.url}/marka-ve-logo-kullanimi` },
};

export default function MarkaLogoKullanimiSayfasi() {
  return (
    <YasalSayfa
      etiket="BELGELENDİRME"
      baslik="Marka ve Logo Kullanımı"
      slug="/marka-ve-logo-kullanimi"
      aciklama="Belge sahibi kuruluşların DVN Cert belgelendirme markasını ve logosunu doğru kullanımına ilişkin kurallar."
      guncelleme="14 Haziran 2026"
      bolumler={[
        {
          baslik: "1. Amaç",
          metin: [
            "Bu kurallar, belge sahibi kuruluşların DVN Cert belgelendirme markasını (logo) ve belgeye yapılan atıfları doğru, tutarlı ve yanıltıcı olmayacak biçimde kullanmalarını sağlamak amacıyla hazırlanmıştır. Logo dosyalarına Logolarımız sayfasından erişebilirsiniz.",
          ],
        },
        {
          baslik: "2. Kullanım Hakkı",
          metin: [
            "Belgelendirme markasını kullanma hakkı, yalnızca geçerli bir belgeye sahip kuruluşlara ve belgenin kapsamı ile sınırlı olarak tanınır. Belgenin askıya alınması veya iptali hâlinde marka kullanım hakkı sona erer.",
          ],
        },
        {
          baslik: "3. Doğru Kullanım",
          metin: [
            "Logo; orantıları korunarak, okunabilir boyutta ve belgelendirilen yönetim sistemi standardı ile birlikte kullanılmalıdır. Marka, kuruluşun yalnızca belgelendirilen faaliyet ve sahaları ile ilişkilendirilecek şekilde kullanılır.",
          ],
        },
        {
          baslik: "4. Yanıltıcı Kullanım Yasağı",
          metin: [
            "Belge ve markalar, belgelendirme kapsamı dışındaki faaliyetleri kapsıyormuş izlenimi verecek şekilde kullanılamaz. Kuruluş, belgelendirmesini akreditasyon kuruluşunu veya DVN Cert'i itibar kaybına uğratacak biçimde kullanamaz ve yanıltıcı beyanlarda bulunamaz.",
          ],
        },
        {
          baslik: "5. Ürün Üzerinde Kullanım",
          metin: [
            "Yönetim sistemi belgelendirmesi bir ürün belgelendirmesi değildir. Bu nedenle belgelendirme markası; ürünün, ürün ambalajının veya ürünün uygunluğunu çağrıştıracak hiçbir yerin üzerinde, ürün uygunluk işareti izlenimi verecek şekilde kullanılamaz.",
          ],
        },
        {
          baslik: "6. Askı, İptal ve Sona Erme",
          metin: [
            "Belgenin askıya alınması durumunda kuruluş, askı süresince marka kullanımını ve belgeye atıfları durdurur. Belgenin iptali veya geçerliliğinin sona ermesi hâlinde tüm marka/logo kullanımı durdurulur ve ilgili tanıtım malzemeleri (web sitesi, basılı materyal vb.) güncellenir.",
          ],
        },
        {
          baslik: "7. Aykırı Kullanım",
          metin: [
            `Marka ve logonun bu kurallara aykırı kullanımı; düzeltici faaliyet talebine, belgenin askıya alınmasına veya iptaline ve gerekli hâllerde yasal işleme konu olabilir. Tereddüt hâlinde kullanım öncesinde ${siteConfig.email} adresinden görüş alınması önerilir.`,
          ],
        },
      ]}
    />
  );
}
