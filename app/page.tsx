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

export default function AnaSayfa() {
  return (
    <main>
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
