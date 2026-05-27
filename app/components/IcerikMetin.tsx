import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * Düz metni (admin'den yazılan duyuru/blog/etkinlik içerikleri) paragraflara
 * böler ve link'leri tıklanabilir hale getirir.
 *
 * Paragraf bölme kuralı:
 *  - Metinde çift satır boşluğu (\n\n) varsa: paragraflar onunla bölünür,
 *    paragraf içindeki tek \n'ler <br /> olarak korunur.
 *  - Çift satır yoksa: tek \n her zaman yeni paragraf demek olur (kullanıcının
 *    her satırda Enter'a basıp paragraflandığını varsayar).
 *
 * Link tanıma:
 *  - Markdown stili [metin](url)  — tercih edilen
 *  - Düz URL'ler (http:// veya https:// ile başlayan) otomatik linklenir
 */

const baglantiStili: CSSProperties = {
  color: "var(--dvn-turuncu)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  fontWeight: 500,
  wordBreak: "break-word",
};

const BAGLANTI_REGEX = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<>"')]+)/g;

export function metniBaglantiyaCevir(metin: string): ReactNode[] {
  const parcalar: ReactNode[] = [];
  let sonuncu = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  BAGLANTI_REGEX.lastIndex = 0;
  while ((m = BAGLANTI_REGEX.exec(metin)) !== null) {
    if (m.index > sonuncu) parcalar.push(metin.slice(sonuncu, m.index));
    if (m[1] && m[2]) {
      const url = m[2];
      const haricî = /^https?:\/\//.test(url);
      parcalar.push(
        <a
          key={key++}
          href={url}
          {...(haricî ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          style={baglantiStili}
        >
          {m[1]}
        </a>,
      );
    } else if (m[3]) {
      parcalar.push(
        <a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer" style={baglantiStili}>
          {m[3]}
        </a>,
      );
    }
    sonuncu = m.index + m[0].length;
  }
  if (sonuncu < metin.length) parcalar.push(metin.slice(sonuncu));
  return parcalar.length > 0 ? parcalar : [metin];
}

interface Props {
  metin: string;
  paragrafStil?: CSSProperties;
}

export default function IcerikMetin({ metin, paragrafStil }: Props) {
  if (!metin) return null;

  const cifteVar = /\n\s*\n/.test(metin);
  const paragraflar = cifteVar
    ? metin.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : metin.split("\n").map((p) => p.trim()).filter(Boolean);

  const varsayilan: CSSProperties = {
    fontSize: 15.5,
    color: "var(--dvn-gri-700)",
    lineHeight: 1.85,
    margin: "0 0 20px",
  };
  const stil = { ...varsayilan, ...paragrafStil };

  return (
    <>
      {paragraflar.map((p, i) => {
        const satirlar = cifteVar ? p.split("\n") : [p];
        return (
          <p key={i} style={stil}>
            {satirlar.map((s, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {metniBaglantiyaCevir(s)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
