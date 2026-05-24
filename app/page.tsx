import HeroSlider from "./components/HeroSlider";
import Istatistikler from "./components/Istatistikler";
import Hizmetler from "./components/Hizmetler";
import Hakkimizda from "./components/Hakkimizda";
import MusteriYorumlari from "./components/MusteriYorumlari";
import Duyurular from "./components/Duyurular";
import AnaSayfaSSS from "./components/AnaSayfaSSS";

export default function AnaSayfa() {
  return (
    <main>
      <HeroSlider />
      <Istatistikler />
      <Hizmetler />
      <Hakkimizda />
      <MusteriYorumlari />
      <Duyurular />
      <AnaSayfaSSS />
    </main>
  );
}
