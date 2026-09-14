import CommitDropdown, { type CommitInfo } from "./CommitDropdown";
import { githubHeaders } from "@/lib/github";

type CommitResponse = {
  html_url?: string;
  commit?: {
    message?: string;
    author?: { date?: string } | null;
  };
};

/**
 * Fetched on the server and revalidated every 10 minutes, so visitors never
 * hit the GitHub API themselves. Returns null on any failure -- the dropdown
 * degrades to "No commit found" rather than breaking the header.
 */
async function getLatestCommit(): Promise<CommitInfo | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/5ee5/5ee5dev/commits?per_page=1",
      { headers: githubHeaders(), next: { revalidate: 600 } }
    );
    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const latest = data[0] as CommitResponse;
    if (!latest.html_url || !latest.commit?.message) return null;

    return {
      message: latest.commit.message,
      date: latest.commit.author?.date ?? null,
      url: latest.html_url,
    };
  } catch {
    return null;
  }
}

export default async function LatestCommit() {
  return <CommitDropdown commit={await getLatestCommit()} />;
}
