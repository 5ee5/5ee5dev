import { getAllPosts } from "@/lib/blog";

const BASE = "https://5ee5.dev";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Readers show the HTML out of context, so relative links need the host. */
const absolutize = (html: string) =>
  html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);

/** The feed is built with the site, like the sitemap, and updates on each deploy. */
export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${BASE}/blog/${post.slug}`;
      // `]]>` would end the CDATA block early.
      const content = absolutize(post.html).replaceAll("]]>", "]]]]><![CDATA[>");
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.timestamp).toUTCString()}</pubDate>${
        post.summary
          ? `
      <description>${escape(post.summary)}</description>`
          : ""
      }
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const lastBuild = new Date(posts[0]?.timestamp ?? Date.now()).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>5ee5.dev blog</title>
    <link>${BASE}/blog</link>
    <description>Notes on self-hosting, Linux and the things I build.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${BASE}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
