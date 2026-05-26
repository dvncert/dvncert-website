import { isoSayfaMetadata } from "@/lib/iso-sayfa-meta";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const generateMetadata = () => isoSayfaMetadata("iso-9001");

export default function Iso9001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-9001" />;
}
