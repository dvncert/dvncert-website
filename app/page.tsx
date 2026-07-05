import HeroSlider from "./components/HeroSlider";
import Istatistikler from "./components/Istatistikler";
import Hizmetler from "./components/Hizmetler";
import SertifikaSorgula from "./components/SertifikaSorgula";
import Hakkimizda from "./components/Hakkimizda";
import Referanslar from "./components/Referanslar";
import MusteriYorumlari from "./components/MusteriYorumlari";
import Duyurular from "./components/Duyurular";
import EgitimEtkinlikleri from "./components/EgitimEtkinlikleri";
import AnaSayfaSSS from "./components/AnaSayfaSSS";
import { localBusinessSchema, faqSchema, schemaScript } from "@/lib/seo-schemas";
import { sssSorular } from "@/lib/sss";

export default function AnaSayfa() {
  // FAQPage yalnızca ana sayfada görünen ilk 4 soruyu içermeli
  // (Google kuralı: şema, sayfada görünür içerikle eşleşmeli — AnaSayfaSSS de slice(0,4) gösteriyor).
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(localBusinessSchema())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(faqSchema(sssSorular.slice(0, 4)))}
      />
      <HeroSlider />
      <div className="dvn-reveal"><Istatistikler /></div>
      <div className="dvn-reveal"><Hizmetler /></div>
      <div className="dvn-reveal"><SertifikaSorgula /></div>
      <div className="dvn-reveal"><Hakkimizda /></div>
      <div className="dvn-reveal"><Referanslar /></div>
      <div className="dvn-reveal"><MusteriYorumlari /></div>
      <div className="dvn-reveal"><Duyurular /></div>
      <div className="dvn-reveal"><EgitimEtkinlikleri /></div>
      <div className="dvn-reveal"><AnaSayfaSSS /></div>
    </main>
  );
}
