import { isSameOrigin } from "@/lib/origin";
import { allow, clientIp } from "@/lib/rate-limit";
import { addVisit, getVisits } from "@/lib/visits";

const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless/i;

function respond(count: number | null, status = 200) {
  return Response.json(
    { count },
    // Cloudflare sits in front of this, and a cached count would be stale.
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET() {
  try {
    return respond(await getVisits());
  } catch (err) {
    console.error(err);
    return respond(null, 500);
  }
}

/** Counts one visit. The page only calls this once per browser. */
export async function POST(request: Request) {
  try {
    // Only the site's own pages count, which keeps casual abuse out.
    const sameOrigin = isSameOrigin(request);
    const bot = BOTS.test(request.headers.get("user-agent") ?? "");
    // One count per visitor per hour; a repeat just reads the current total.
    const counts =
      sameOrigin && !bot && allow(`visits:${clientIp(request)}`, 1, 60 * 60_000);
    return respond(counts ? await addVisit() : await getVisits());
  } catch (err) {
    console.error(err);
    return respond(null, 500);
  }
}
