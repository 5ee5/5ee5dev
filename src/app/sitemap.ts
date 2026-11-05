import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";

const BASE = "https://5ee5.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: `${BASE}/` },
    { url: `${BASE}/projects` },
    // Only dates the site can state truthfully: the blog changes with its posts.
    {
      url: `${BASE}/blog`,
      lastModified: posts[0] && new Date(posts[0].timestamp),
    },
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}` })),
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.timestamp),
    })),
  ];
}
