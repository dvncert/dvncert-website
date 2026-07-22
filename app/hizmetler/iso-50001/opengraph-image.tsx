import { hizmetOgGorseli, OG_BOYUT, OG_CONTENT_TYPE } from "@/lib/og-sablon";

export const alt = "DVN Cert hizmet";
export const size = OG_BOYUT;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return hizmetOgGorseli("iso-50001");
}
