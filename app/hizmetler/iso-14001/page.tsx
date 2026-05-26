import { isoSayfaMetadata } from "@/lib/iso-sayfa-meta";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const generateMetadata = () => isoSayfaMetadata("iso-14001");

export default function Iso14001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-14001" />;
}
