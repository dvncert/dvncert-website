import type { ReactNode } from "react";

/**
 * Hizmet ikonları - slug/anahtara göre çizgi stilinde SVG döndürür.
 * Hem /hizmetler hub'ında hem detay sayfalarında kullanılır.
 */
const ikonlar: Record<string, ReactNode> = {
  sistem: (
    <path d="M9 12l2 2 4-4M22 4l-10 10-3-3M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.84 0 3.55.55 4.98 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  kalite: (
    <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L3.2 7.7l5.4-.8L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  cevre: (
    <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  isg: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  enerji: (
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  denetim: (
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  egitim: (
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export default function HizmetIkon({ ad, size = 26 }: { ad: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {ikonlar[ad] ?? ikonlar.sistem}
    </svg>
  );
}
