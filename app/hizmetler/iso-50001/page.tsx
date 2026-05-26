import { isoSayfaMetadata } from "@/lib/iso-sayfa-meta";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const generateMetadata = () => isoSayfaMetadata("iso-50001");

export default function Iso50001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-50001" />;
}
