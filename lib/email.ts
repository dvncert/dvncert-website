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
  /** Konu satırı öneki ve başlık için form türü (varsayılan: iletişim). */
  tip?: string;
  /** Forma özel ek alanlar (sertifika no, eğitim adı vb.) — tabloya eklenir. */
  ekVeri?: Record<string, unknown> | null;
};

/** Form türü → [konu öneki, e-posta başlığı, sayfa]. */
const FORM_TURLERI: Record<string, [string, string, string]> = {
  iletisim: ["İletişim", "Yeni İletişim Formu Mesajı", "iletişim formundan"],
  "sertifika-dogrulama": ["Sertifika Doğrulama", "Yeni Sertifika Doğrulama Talebi", "sertifika sorgulama sayfasından"],
  "egitim-kayit": ["Eğitim Kaydı", "Yeni Eğitim Kayıt Talebi", "eğitim kayıt formundan"],
  sikayet: ["Şikayet / İtiraz", "Yeni Şikayet / İtiraz Bildirimi", "şikayet ve itiraz formundan"],
  bulten: ["Bülten", "Yeni Bülten Aboneliği", "bülten formundan"],
};

/** ekVeri anahtarlarının okunur karşılıkları. */
const EK_ETIKETLER: Record<string, string> = {
  sertifikaNo: "Sertifika No",
  firma: "Firma",
  egitim: "Eğitim",
  slug: "Eğitim Sayfası",
  tercih: "Tercih",
  talepTuru: "Talep Türü",
  ilgiliBelge: "İlgili Belge",
};

/**
 * Site formu gönderisini info@dvncert.com'a (veya ILETISIM_ALICI'ya) iletir.
 * Yanıtla (Reply) doğrudan gönderen kişiye gider.
 * Başarılıysa true, anahtar yoksa/başarısızsa false döner — çağıran tarafı bloklamaz.
 */
export async function iletisimEpostaGonder(p: IletisimEposta): Promise<boolean> {
  const resend = resendClient();
  const from = process.env.RESEND_FROM;
  if (!resend || !from) return false;

  const alici = process.env.ILETISIM_ALICI || siteConfig.email;
  const [onek, baslik, kaynak] = FORM_TURLERI[p.tip ?? "iletisim"] ?? FORM_TURLERI.iletisim;
  const konu = p.konu?.trim() || baslik;
  const ekler = Object.entries(p.ekVeri ?? {})
    .filter(([k, v]) => v != null && String(v).trim() !== "" && !(k === "firma" && v === p.ad))
    .map(([k, v]) => [EK_ETIKETLER[k] ?? k, String(v)] as const);

  const satir = (etiket: string, deger?: string) =>
    deger?.trim()
      ? `<tr><td style="padding:6px 12px;font-weight:600;color:#022398;vertical-align:top">${esc(etiket)}</td><td style="padding:6px 12px;color:#333">${esc(deger).replace(/\n/g, "<br>")}</td></tr>`
      : "";

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#022398;font-size:18px;border-bottom:2px solid #f58220;padding-bottom:8px">
        ${esc(baslik)}
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${ekler.map(([k, v]) => satir(k, v)).join("")}
        ${satir("Ad Soyad", p.ad)}
        ${satir("E-posta", p.email)}
        ${satir("Telefon", p.telefon)}
        ${satir("Konu", p.konu)}
        ${satir("Mesaj", p.mesaj)}
      </table>
      <p style="font-size:12px;color:#888;margin-top:20px">
        Bu mesaj ${esc(siteConfig.url)} ${esc(kaynak)} gönderildi. Tüm gönderiler panelde: ${esc(siteConfig.url)}/admin/gonderiler
      </p>
    </div>`;

  const text = [
    ...ekler.map(([k, v]) => `${k}: ${v}`),
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
      subject: `[${onek}] ${konu}`,
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

export type KariyerEposta = {
  ad?: string;
  email?: string;
  telefon?: string;
  pozisyon?: string;
  mesaj?: string;
};

/**
 * Kariyer (idari pozisyon) başvurusunu info@dvncert.com'a iletir; yüklenen CV
 * dosyası varsa ek olarak ekler. Reply doğrudan başvurana gider.
 * Anahtar yoksa/başarısızsa false döner — çağıranı bloklamaz.
 */
export async function kariyerEpostaGonder(
  p: KariyerEposta,
  dosya?: { veri: Buffer; ad: string },
): Promise<boolean> {
  const resend = resendClient();
  const from = process.env.RESEND_FROM;
  if (!resend || !from) return false;

  const alici = process.env.ILETISIM_ALICI || siteConfig.email;
  const pozisyon = p.pozisyon?.trim() || "İdari pozisyon başvurusu";

  const satir = (etiket: string, deger?: string) =>
    deger?.trim()
      ? `<tr><td style="padding:6px 12px;font-weight:600;color:#022398;vertical-align:top">${esc(etiket)}</td><td style="padding:6px 12px;color:#333">${esc(deger).replace(/\n/g, "<br>")}</td></tr>`
      : "";

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#022398;font-size:18px;border-bottom:2px solid #f58220;padding-bottom:8px">
        Yeni Kariyer Başvurusu
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${satir("Pozisyon", p.pozisyon)}
        ${satir("Ad Soyad", p.ad)}
        ${satir("E-posta", p.email)}
        ${satir("Telefon", p.telefon)}
        ${satir("Ön Yazı", p.mesaj)}
        ${satir("CV / Dosya", dosya ? dosya.ad : "(yüklenmedi)")}
      </table>
      <p style="font-size:12px;color:#888;margin-top:20px">
        Bu başvuru ${esc(siteConfig.url)}/kariyer sayfasından gönderildi.${dosya ? " CV dosyası ektedir." : ""}
      </p>
    </div>`;

  const text = [
    `Pozisyon: ${p.pozisyon ?? ""}`,
    `Ad Soyad: ${p.ad ?? ""}`,
    `E-posta: ${p.email ?? ""}`,
    `Telefon: ${p.telefon ?? ""}`,
    `CV / Dosya: ${dosya ? dosya.ad : "(yüklenmedi)"}`,
    "",
    p.mesaj ?? "",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to: alici,
      subject: `[Kariyer] ${pozisyon}`,
      html,
      text,
      ...(p.email?.trim() ? { replyTo: p.email.trim() } : {}),
      // Resend SDK isteği JSON.stringify ile serialize ediyor; ham Buffer verilirse
      // {"type":"Buffer","data":[...]} olur ve API dosyayı tanımaz. base64 string ver.
      ...(dosya ? { attachments: [{ filename: dosya.ad, content: dosya.veri.toString("base64") }] } : {}),
    });
    if (error) {
      console.error("kariyerEpostaGonder Resend hatası:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("kariyerEpostaGonder hatası:", e);
    return false;
  }
}
