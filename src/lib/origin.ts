/**
 * True when a request came from the site's own pages. Browsers send
 * `Sec-Fetch-Site` from secure contexts only (https or localhost) and older
 * ones not at all, so without it fall back to comparing `Origin` with the host.
 */
export function isSameOrigin(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
