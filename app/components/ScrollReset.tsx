"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sayfa (yol) değişiminde pencereyi anında en üste alır.
 *
 * Neden gerekli: globals.css'te `html { scroll-behavior: smooth }` tanımlı.
 * Bu, Next App Router'ın geçişte uyguladığı "en üste kaydır" davranışını
 * yumuşatıp bozabiliyor; sayfa önceki kaydırma konumunda açılmış gibi
 * görünüyor. `behavior: "instant"` CSS smooth'u ezerek bunu kesin çözer;
 * sayfa içi çapa (#id) linklerinin yumuşaklığı korunur.
 */
export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Çapa (anchor) ile gelinmişse o konuma gidilsin, en üste zıplatma.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
