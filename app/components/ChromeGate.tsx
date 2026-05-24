"use client";

import { usePathname } from "next/navigation";

/**
 * Genel site "kabuğunu" (header/footer/yüzen butonlar) /admin altında gizler.
 * Server bileşenleri (ör. Footer) children olarak geçilip koşullu render edilir.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
