export type RepoMeta = {
  createdAt: string;
  pushedAt: string;
  archived: boolean;
  stars: number;
  language: string | null;
};

type RepoResponse = {
  created_at?: string;
  pushed_at?: string;
  archived?: boolean;
  stargazers_count?: number;
  language?: string | null;
};

/**
 * Anonymous requests are capped at 60/hr per IP. GITHUB_TOKEN is optional --
 * at one request per repo per day the anonymous limit is ample -- but PM2 is
 * started with --update-env, so setting it is enough to pick it up.
 */
export function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

function parseRepo(githubUrl: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== "github.com") return null;
    const [owner, repo] = url.pathname.replace(/^\/+/, "").split("/");
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

/**
 * Repo facts for a project detail page. Every failure path returns null so a
 * GitHub outage, a rate limit, or a malformed URL degrades to "no metadata"
 * rather than failing the build.
 */
export async function getRepoMeta(
  githubUrl?: string
): Promise<RepoMeta | null> {
  if (!githubUrl) return null;
  const parsed = parseRepo(githubUrl);
  if (!parsed) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
      { headers: githubHeaders(), next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as RepoResponse;
    if (!data.created_at || !data.pushed_at) return null;

    return {
      createdAt: data.created_at,
      pushedAt: data.pushed_at,
      archived: Boolean(data.archived),
      stars: Number(data.stargazers_count) || 0,
      language: data.language ?? null,
    };
  } catch {
    return null;
  }
}
