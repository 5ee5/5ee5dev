/**
 * A fixed-window rate limiter held in memory. One Node process serves the
 * site, so a Map is enough; a restart simply forgives everyone.
 */
const windows = new Map<string, { count: number; resetAt: number }>();

/** Keeps the Map from growing without bound under a flood of distinct IPs. */
const MAX_TRACKED = 10_000;

/**
 * Records one hit for `key` and returns false once it has exceeded `limit`
 * hits within `windowMs`. Keys should include the route, e.g. `guestbook:<ip>`.
 */
export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (windows.size >= MAX_TRACKED) {
    for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
    // Still full of live windows: drop the oldest rather than refuse to count.
    if (windows.size >= MAX_TRACKED) {
      const oldest = windows.keys().next().value;
      if (oldest !== undefined) windows.delete(oldest);
    }
  }

  const w = windows.get(key);
  if (!w || w.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  w.count += 1;
  return w.count <= limit;
}

/**
 * The visitor's address. Cloudflare sets `CF-Connecting-IP`, and the tunnel is
 * the only way in, so it can be trusted; without it (local dev) everyone
 * shares one bucket, which is fine for a single developer.
 */
export function clientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip") ?? "local";
}
