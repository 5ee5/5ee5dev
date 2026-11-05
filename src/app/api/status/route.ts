import { getStatus } from "@/lib/status";

export function GET() {
  return Response.json(getStatus(), {
    // Cloudflare sits in front of this, and a cached reading would be stale.
    headers: { "Cache-Control": "no-store" },
  });
}
