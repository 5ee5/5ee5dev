import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";

const BASE = "https://5ee5.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/` },
    { url: `${BASE}/projects` },
    { url: `${BASE}/blog` },
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}` })),
    ...getAllPosts().map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.timestamp),
    })),
  ];
}
