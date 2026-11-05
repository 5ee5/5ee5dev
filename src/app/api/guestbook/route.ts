import crypto from "node:crypto";
import { addEntry, deleteEntry, parseSubmission } from "@/lib/guestbook";

function respond(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Only the site's own form should post here. Browsers send `Sec-Fetch-Site`
 * from secure contexts only (https or localhost) and older ones not at all,
 * so without it fall back to comparing `Origin` with the host.
 */
function isSameOrigin(request: Request) {
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

/** Signs the guestbook. Entries show immediately; there is no moderation queue. */
export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return respond({ error: "Forbidden." }, 403);
    }
    if (Number(request.headers.get("content-length") ?? 0) > 4096) {
      return respond({ error: "That's too much text." }, 413);
    }

    const body: unknown = await request.json().catch(() => null);

    // Humans never see this field, so anything in it is a bot. Say it worked
    // so the bot has no signal to adapt to.
    const trap = (body as Record<string, unknown> | null)?.company;
    if (typeof trap === "string" && trap !== "") return respond({ ok: true });

    const parsed = parseSubmission(body);
    if (!parsed.ok) return respond({ error: parsed.error }, 400);

    await addEntry(parsed.value);
    return respond({ ok: true }, 201);
  } catch (err) {
    console.error(err);
    return respond({ error: "Something went wrong. Try again later." }, 500);
  }
}

/**
 * Deletes one entry: `DELETE /api/guestbook?id=<id>` with
 * `Authorization: Bearer $GUESTBOOK_ADMIN_TOKEN`. Disabled until that
 * variable is set.
 */
export async function DELETE(request: Request) {
  const token = process.env.GUESTBOOK_ADMIN_TOKEN;
  const given = (request.headers.get("authorization") ?? "").replace(/^Bearer /, "");
  const a = Buffer.from(given);
  const b = Buffer.from(token ?? "");
  if (!token || a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return respond({ error: "Not found." }, 404);
  }

  try {
    const id = new URL(request.url).searchParams.get("id") ?? "";
    return (await deleteEntry(id))
      ? respond({ ok: true })
      : respond({ error: "No such entry." }, 404);
  } catch (err) {
    console.error(err);
    return respond({ error: "Something went wrong." }, 500);
  }
}
