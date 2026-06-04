import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

/**
 * Resend üzerinden e-posta gönderimi.
 *
 * Gerekli ortam değişkenleri:
 *   RESEND_API_KEY  — Resend API anahtarı (re_...)
 *   RESEND_FROM     — Gönderen adresi; Resend'de doğrulanmış alan adında olmalı
 *                     (ör. "DVN Cert <bildirim@dvncert.com>")
 *   ILETISIM_ALICI  — (ops.) Alıcı; varsayılan siteConfig.email (info@dvncert.com)
 *
 * Anahtar tanımlı değilse gönderim sessizce atlanır (form yine DB'ye yazılır).
 */

let _resend: Resend | null = null;

function resendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

/** E-posta gövdesi için HTML kaçışı. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type IletisimEposta = {
  ad?: string;
  email?: string;
  telefon?: string;
  konu?: string;
  mesaj?: string;
};

/**
 * İletişim formu gönderisini info@dvncert.com'a (veya ILETISIM_ALICI'ya) iletir.
 * Yanıtla (Reply) doğrudan gönderen kişiye gider.
 * Başarılıysa true, anahtar yoksa/başarısızsa false döner — çağıran tarafı bloklamaz.
 */
export async function iletisimEpostaGonder(p: IletisimEposta): Promise<boolean> {
  const resend = resendClient();
  const from = process.env.RESEND_FROM;
  if (!resend || !from) return false;

  const alici = process.env.ILETISIM_ALICI || siteConfig.email;
  const konu = p.konu?.trim() || "Yeni iletişim formu mesajı";

  const satir = (etiket: string, deger?: string) =>
    deger?.trim()
      ? `<tr><td style="padding:6px 12px;font-weight:600;color:#022398;vertical-align:top">${esc(etiket)}</td><td style="padding:6px 12px;color:#333">${esc(deger).replace(/\n/g, "<br>")}</td></tr>`
      : "";

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#022398;font-size:18px;border-bottom:2px solid #f58220;padding-bottom:8px">
        Yeni İletişim Formu Mesajı
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${satir("Ad Soyad", p.ad)}
        ${satir("E-posta", p.email)}
        ${satir("Telefon", p.telefon)}
        ${satir("Konu", p.konu)}
        ${satir("Mesaj", p.mesaj)}
      </table>
      <p style="font-size:12px;color:#888;margin-top:20px">
        Bu mesaj ${esc(siteConfig.url)} iletişim formundan gönderildi.
      </p>
    </div>`;

  const text = [
    `Ad Soyad: ${p.ad ?? ""}`,
    `E-posta: ${p.email ?? ""}`,
    `Telefon: ${p.telefon ?? ""}`,
    `Konu: ${p.konu ?? ""}`,
    "",
    p.mesaj ?? "",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to: alici,
      subject: `[İletişim] ${konu}`,
      html,
      text,
      ...(p.email?.trim() ? { replyTo: p.email.trim() } : {}),
    });
    if (error) {
      console.error("iletisimEpostaGonder Resend hatası:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("iletisimEpostaGonder hatası:", e);
    return false;
  }
}
