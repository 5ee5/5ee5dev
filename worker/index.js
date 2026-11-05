/**
 * Serves a themed offline page when Cloudflare cannot reach the origin at all
 * -- i.e. the machine, the cloudflared tunnel or the app itself is down.
 *
 * Deliberately narrow: only 502 and Cloudflare's origin-unreachable class
 * (520-530, where 530 carries the 1033 "Argo Tunnel error") are intercepted.
 * 502 is what cloudflared answers when the tunnel is up but the app is not,
 * e.g. while PM2 restarts it. A genuine 500 from Next passes straight
 * through, because the app's own error.tsx already renders a themed page for
 * that and masking it would be a downgrade.
 */

const OFFLINE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#071209">
<title>Temporarily offline | 5ee5.dev</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=VT323&display=swap">
<style>
  :root {
    color-scheme: dark;
    --background: #040a06;
    --surface: #06100a;
    --raised: #0a1a10;
    --edge: #1d4a2c;
    --accent: #166534;
    --accent-text: #4ade80;
    --on-accent: #d9ffe4;
    --foreground: #c6f6d3;
    --muted: #6fbf88;
    --header: #071209;
    --on-header: #8ff0ad;
  }
  * { box-sizing: border-box; }
  html { scrollbar-color: var(--accent) var(--background); scrollbar-width: thin; }
  body {
    margin: 0;
    min-height: 100vh;
    background: var(--background);
    color: var(--foreground);
    font-family: "JetBrains Mono", monospace;
  }
  :focus-visible { outline: 2px solid var(--accent-text); outline-offset: 2px; }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    background: var(--header);
    border-bottom: 1px solid var(--edge);
    color: var(--on-header);
    padding: 0.8rem 1.5rem;
  }
  header a { color: inherit; text-decoration: none; }
  header .home { font-weight: 700; }
  header .home span { color: var(--muted); }
  header .nav { color: var(--accent-text); }
  main { max-width: 860px; margin: 0 auto; padding: 2rem; }
  .card {
    background: var(--surface);
    border: 1px solid var(--edge);
    padding: 1.5rem;
  }
  .card p { margin: 0; }
  .muted { color: var(--muted); }
  .card h1 {
    margin: 0 0 1rem;
    font-family: "VT323", monospace;
    font-size: 64px;
    font-weight: 400;
    line-height: 1;
    color: var(--accent-text);
  }
  button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--raised);
    border: 1px solid var(--edge);
    color: var(--accent-text);
    font: inherit;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: 200ms ease;
    transition-property: color, background-color, border-color;
  }
  button:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--on-accent);
  }
  @media (width < 900px) {
    header { padding: 0.8rem 1rem; }
    main { padding: 1rem; }
  }
  @media (width < 640px) {
    header .home span { display: none; }
  }
</style>
</head>
<body>
  <header>
    <a class="home" href="/">5ee5<span>@gentoo:~$</span></a>
    <a class="nav" href="/projects">[projects]</a>
  </header>
  <main>
    <section class="card">
      <p class="muted">$ ./5ee5.dev</p>
      <p style="margin: 0.25rem 0 1rem">ssh: connect to host 5ee5.dev port 443: Connection refused</p>
      <h1>Temporarily offline</h1>
      <p class="muted" style="margin-bottom: 1.5rem">The server is down for a moment. Try again shortly.</p>
      <button onclick="location.reload()">$ retry</button>
    </section>
  </main>
</body>
</html>`;

function offline() {
  return new Response(OFFLINE_HTML, {
    // 503, not 200: this is temporary, and search engines must not index it.
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "120",
    },
  });
}

const worker = {
  async fetch(request) {
    try {
      const response = await fetch(request);
      return response.status === 502 ||
        (response.status >= 520 && response.status <= 530)
        ? offline()
        : response;
    } catch {
      // Origin fetch threw outright -- treat as unreachable.
      return offline();
    }
  },
};

export default worker;
