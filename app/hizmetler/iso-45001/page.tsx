import { isoMeta } from "@/lib/iso-icerik";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const metadata = isoMeta("iso-45001");

export default function Iso45001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-45001" />;
}
