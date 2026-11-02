import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  /** "YYYY-MM-DD", or "YYYY-MM-DD HH:MM" when the post gives a time. */
  date: string;
  /** Epoch ms of `date`, read in the build machine's time zone. */
  timestamp: number;
  summary: string;
  draft: boolean;
};

export type Post = PostMeta & { html: string };

/**
 * Quote the date in frontmatter ("2026-11-02 14:30") and it is shown exactly as
 * written, in your own time zone. Unquoted, YAML turns it into a UTC Date.
 */
function formatDate(raw: unknown): string | null {
  if (typeof raw === "string") {
    const match = raw.match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2}))?/);
    return match ? (match[2] ? `${match[1]} ${match[2]}` : match[1]) : null;
  }
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    const iso = raw.toISOString();
    return iso.endsWith("T00:00:00.000Z")
      ? iso.slice(0, 10)
      : `${iso.slice(0, 10)} ${iso.slice(11, 16)}`;
  }
  return null;
}

function readPost(file: string): Post {
  const { data, content } = matter(
    fs.readFileSync(path.join(POSTS_DIR, file), "utf8")
  );
  const slug = file.replace(/\.md$/, "");

  // Fail the build on bad frontmatter rather than publishing a broken page.
  const date = formatDate(data.date);
  if (typeof data.title !== "string" || !date) {
    throw new Error(`${file}: frontmatter needs a title and a valid date`);
  }

  return {
    slug,
    title: data.title,
    date,
    timestamp: new Date(
      date.length === 10 ? `${date}T00:00` : date.replace(" ", "T")
    ).getTime(),
    summary: typeof data.summary === "string" ? data.summary : "",
    draft: data.draft === true,
    html: marked.parse(content, { async: false }),
  };
}

/** Newest first. Drafts show up in `next dev` and are left out of builds. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post) => !post.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
