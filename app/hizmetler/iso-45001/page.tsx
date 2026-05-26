import { isoSayfaMetadata } from "@/lib/iso-sayfa-meta";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const generateMetadata = () => isoSayfaMetadata("iso-45001");

export default function Iso45001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-45001" />;
}
