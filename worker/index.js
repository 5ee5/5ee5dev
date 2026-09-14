/**
 * Serves a themed offline page when Cloudflare cannot reach the origin at all
 * -- i.e. the machine or the cloudflared tunnel is down.
 *
 * Deliberately narrow: only Cloudflare's origin-unreachable class (520-530,
 * where 530 carries the 1033 "Argo Tunnel error") is intercepted. A genuine
 * 500 from Next passes straight through, because the app's own error.tsx
 * already renders a themed page for that and masking it would be a downgrade.
 */

const OFFLINE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Temporarily offline | 5ee5.dev</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    background: #0a0a0a;
    color: #f2f2f2;
    font-family: Arial, sans-serif;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #8b0000;
    color: #0a0a0a;
    padding: 0.8rem 1.5rem;
  }
  header h1 { margin: 0; font-size: 2rem; }
  main { max-width: 800px; margin: 0 auto; padding: 2rem; }
  .card {
    background: #141414;
    border: 1px solid #262626;
    border-radius: 10px;
    padding: 1.25rem;
    text-align: center;
  }
  .card h2 { color: #d64545; font-size: 2em; margin: 0 0 0.67em; }
  .card p { margin: 1rem 0; line-height: 1.6; }
  .muted { color: #a3a3a3; font-size: 0.8rem; }
</style>
</head>
<body>
  <header><h1>5ee5</h1></header>
  <main>
    <section class="card">
      <h2>Temporarily offline</h2>
      <p>The server is down for a moment. Try again shortly.</p>
      <p class="muted">This page is served from Cloudflare's edge.</p>
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
      return response.status >= 520 && response.status <= 530
        ? offline()
        : response;
    } catch {
      // Origin fetch threw outright -- treat as unreachable.
      return offline();
    }
  },
};

export default worker;
