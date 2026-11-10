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
    slug: "loopback",
    title: "Loopback",
    description: "A small webring for personal websites.",
    tech: ["Next.js", "TypeScript", "SQLite", "Drizzle"],
    github: "https://github.com/5ee5/loopback",
    url: "https://ring.5ee5.dev",
    highlights: [
      "Previous, next and random links that skip members who are no longer active",
      "Embeds as a tiny no-dependency widget or a one-line iframe with no JavaScript",
      "Applications are reviewed by hand in an admin area with an append-only audit log",
      "Self-hosted with PM2 behind a Cloudflare Tunnel, in a black-and-white terminal theme",
    ],
  },
  {
    slug: "esp32-snake",
    title: "ESP32 Snake",
    description:
      "A self-playing Snake for an ESP32-C3 with a tiny 72x40 OLED. It never crashes and fills the whole board.",
    tech: ["C++", "ESP32-C3", "PlatformIO", "SSD1306"],
    github: "https://github.com/5ee5/esp32-snake",
    highlights: [
      "Follows a Hamiltonian cycle, so the snake can never run into itself",
      "The cycle changes shape each step, with shortcuts that stay safe, to fill the board in about 9 minutes",
      "Best time is saved in flash and survives reboots",
      "A desktop simulator runs the real game logic over hundreds of games to catch collisions and stalls",
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
];
