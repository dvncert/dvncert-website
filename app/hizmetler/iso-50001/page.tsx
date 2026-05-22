import { isoMeta } from "@/lib/iso-icerik";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const metadata = isoMeta("iso-50001");

export default function Iso50001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-50001" />;
}
