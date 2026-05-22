import { isoMeta } from "@/lib/iso-icerik";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const metadata = isoMeta("iso-14001");

export default function Iso14001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-14001" />;
}
