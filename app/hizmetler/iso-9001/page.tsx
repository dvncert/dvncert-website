import { isoMeta } from "@/lib/iso-icerik";
import IsoStandartSayfasi from "../../components/IsoStandartSayfasi";

export const metadata = isoMeta("iso-9001");

export default function Iso9001Sayfasi() {
  return <IsoStandartSayfasi slug="iso-9001" />;
}
