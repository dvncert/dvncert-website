import { siteConfig } from "@/lib/site-config";
import { bloglariGetir } from "@/lib/icerik";
import { blogSeoAciklama } from "@/lib/blog-seo";

/**
 * /feed.xml — Blog RSS 2.0 beslemesi.
 * Yanıt motorları, haber toplayıcılar ve okuyucular yeni yazıları buradan
 * keşfeder. Blog listesinden üretildiği için yeni yazılar kendiliğinden eklenir.
 * <head>'deki <link rel="alternate" type="application/rss+xml"> bu adrese işaret eder.
 */
export const revalidate = 3600;

const kac = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const u = siteConfig.url;
  const yazilar = (await bloglariGetir())
    .slice()
    .sort((a, b) => (a.tarih < b.tarih ? 1 : -1))
    .slice(0, 50);

  const sonTarih = yazilar[0] ? new Date(yazilar[0].guncellenme ?? yazilar[0].tarih) : new Date();

  const ogeler = yazilar
    .map((y) => {
      const link = `${u}/blog/${y.slug}`;
      return [
        "    <item>",
        `      <title>${kac(y.baslik)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${new Date(y.tarih).toUTCString()}</pubDate>`,
        `      <category>${kac(y.kategori)}</category>`,
        `      <description>${kac(blogSeoAciklama(y.slug, y.ozet))}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${kac(`${siteConfig.ad} Blog`)}</title>
    <link>${u}/blog</link>
    <atom:link href="${u}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${kac("Tedarikçi, şube ve bayi denetimi (ikinci taraf denetim) ile ISO yönetim sistemleri belgelendirmesi üzerine rehberler.")}</description>
    <language>tr-TR</language>
    <lastBuildDate>${sonTarih.toUTCString()}</lastBuildDate>
${ogeler}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
