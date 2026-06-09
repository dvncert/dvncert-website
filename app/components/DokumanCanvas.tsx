"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask } from "pdfjs-dist";

/**
 * PDF'i sayfa sayfa <canvas>'a (resim olarak) çizer. Metin katmanı oluşturulmaz;
 * bu yüzden metin seçilemez/kopyalanamaz ve belirgin bir indirme yolu yoktur.
 * (Not: ekran görüntüsü/DevTools ile erişim web'de tamamen engellenemez.)
 *
 * pdfjs worker'ı /public/pdf.worker.min.mjs olarak sunulur — sürümü
 * package.json'daki pdfjs-dist ile aynı olmalı (paket güncellenirse yeniden kopyala).
 */
export default function DokumanCanvas({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [durum, setDurum] = useState<"yukleniyor" | "hazir" | "hata">("yukleniyor");

  useEffect(() => {
    let iptal = false;
    let loadingTask: PDFDocumentLoadingTask | null = null;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        loadingTask = pdfjs.getDocument({ url: src });
        const pdfDoc = await loadingTask.promise;
        if (iptal) return;

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const kullanilabilir = container.clientWidth || Math.min(window.innerWidth - 32, 900);
        const hedefGenislik = Math.min(kullanilabilir, 900);

        for (let n = 1; n <= pdfDoc.numPages; n++) {
          if (iptal) return;
          const page = await pdfDoc.getPage(n);
          const olcek = hedefGenislik / page.getViewport({ scale: 1 }).width;
          const viewport = page.getViewport({ scale: olcek * dpr });

          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.marginBottom = "12px";
          canvas.style.borderRadius = "6px";
          canvas.style.background = "white";
          canvas.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          container.appendChild(canvas);
          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
        }
        if (!iptal) setDurum("hazir");
      } catch (e) {
        console.error("PDF görüntüleme hatası:", e);
        if (!iptal) setDurum("hata");
      }
    })();

    return () => {
      iptal = true;
      try {
        loadingTask?.destroy();
      } catch {
        /* yoksay */
      }
    };
  }, [src]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        flex: 1,
        overflow: "auto",
        WebkitUserSelect: "none",
        userSelect: "none",
        borderRadius: 10,
        padding: "8px 0",
      }}
    >
      {durum === "yukleniyor" && (
        <p style={{ color: "white", textAlign: "center", fontSize: 14, marginTop: 24 }}>Doküman yükleniyor…</p>
      )}
      {durum === "hata" && (
        <p style={{ color: "white", textAlign: "center", fontSize: 14, marginTop: 24 }}>
          Doküman görüntülenemedi. Lütfen tekrar deneyin.
        </p>
      )}
      <div ref={containerRef} style={{ maxWidth: 900, margin: "0 auto", padding: "0 8px" }} />
    </div>
  );
}
