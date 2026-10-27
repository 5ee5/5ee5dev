export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  /** Live site, shown as a second button next to the GitHub link. */
  url?: string;
  /** 3-5 bullets for the detail page. Omit to hide the Highlights section. */
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "codebuddy",
    title: "CodeBuddy",
    description:
      "AI programming tutor for beginners: explains concepts, helps debug code, and offers practice exercises.",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude API"],
    github: "https://github.com/5ee5/codebuddy",
    url: "https://codebuddy.5ee5.dev",
    highlights: [
      "Learn and Debug modes powered by Claude, adapted to the learner's level",
      "Practice mode checks answers locally, without AI, and is open to everyone",
      "Class-code sign-up, email confirmation and password reset via Resend",
      "Self-hosted with PM2 behind a Cloudflare Tunnel",
    ],
  },
  {
    slug: "5ee5dev",
    title: "5ee5.dev",
    description: "My personal website",
    tech: ["Next.js", "React"],
    github: "https://github.com/5ee5/5ee5dev",
    highlights: [
      "Next.js App Router with TypeScript and Tailwind v4",
      "Statically generated project pages",
      "Self-hosted behind nginx and a Cloudflare Tunnel, deployed with PM2",
    ],
  },
  {
    slug: "5ee5chat",
    title: "5ee5chat",
    description: "A simple chat application.",
    tech: ["JavaScript", "Express", "Socket.IO", "Redis"],
    github: "https://github.com/5ee5/5ee5chat",
    highlights: [
      "Real-time messaging over Socket.IO on an Express server",
      "Redis-backed history, trimmed to the last 100 messages",
      "Per-connection rate limiting and username/message length caps",
    ],
  },
  {
    slug: "dungeon-crawler",
    title: "Dungeon Crawler",
    description:
      "A C++ ncurses dungeon crawler with procedural floors, turn-based combat, and loot.",
    tech: ["C++", "ncurses"],
    github: "https://github.com/5ee5/Dungeon-Crawler",
    highlights: [
      "Procedurally generated floors",
      "Turn-based combat",
      "Loot system",
      "ncurses terminal interface",
    ],
  },
  {
    slug: "spotistats",
    title: "Spotistats",
    description: "Spotify statistics tracker.",
    tech: ["Python", "Spotify API", "pandas"],
    github: "https://github.com/5ee5/Spotistats",
    highlights: [
      "Pulls top artists and tracks over three timeframes from the Spotify Web API",
      "Also captures recently played tracks",
      "Writes clean JSON per timeframe, overwritten on each run",
      "Credentials read from a .env file; runs silently by default",
    ],
  },
];
