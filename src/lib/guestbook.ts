import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { LIMITS } from "./guestbook-limits";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "guestbook.json");


export type Entry = {
  id: string;
  name: string;
  message: string;
  website: string | null;
  /** ISO 8601. */
  date: string;
};

/** Oldest first, as stored. A missing file is an empty book. */
export async function getEntries(): Promise<Entry[]> {
  let raw: string;
  try {
    raw = await fs.readFile(FILE, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  // A corrupt file throws instead of reading as empty, so the next signing
  // can't overwrite every earlier entry.
  const entries: unknown = JSON.parse(raw);
  if (!Array.isArray(entries)) throw new Error("data/guestbook.json is malformed");
  return entries as Entry[];
}

// One Node process serves the site, so a promise chain keeps two simultaneous
// writes from each reading the same file and one losing its entry.
let queue: Promise<unknown> = Promise.resolve();

function mutate<T>(change: (entries: Entry[]) => { entries: Entry[]; result: T }) {
  const run = queue.then(async () => {
    const { entries, result } = change(await getEntries());
    await fs.mkdir(DATA_DIR, { recursive: true });
    // Write beside the file and rename, so a crash mid-write can't leave a
    // half-written guestbook.json behind.
    const tmp = `${FILE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(entries, null, 2));
    await fs.rename(tmp, FILE);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

type Submission = { name: string; message: string; website: string | null };

/** Trims and bounds the fields. Returns an error message when they're unusable. */
export function parseSubmission(
  body: unknown
): { ok: true; value: Submission } | { ok: false; error: string } {
  const field = (key: string) => {
    const v = (body as Record<string, unknown> | null)?.[key];
    return typeof v === "string" ? v : "";
  };
  // Control characters (bar newlines in the message) have no place in either.
  const name = field("name").replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  const message = field("message")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const websiteRaw = field("website").trim();

  if (!name) return { ok: false, error: "Please enter a name." };
  if (name.length > LIMITS.name) return { ok: false, error: "That name is too long." };
  if (!message) return { ok: false, error: "Please write a message." };
  if (message.length > LIMITS.message) return { ok: false, error: "That message is too long." };

  let website: string | null = null;
  if (websiteRaw) {
    try {
      const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(websiteRaw) ? websiteRaw : `https://${websiteRaw}`);
      if (
        (url.protocol !== "https:" && url.protocol !== "http:") ||
        websiteRaw.length > LIMITS.website
      ) {
        throw new Error("bad url");
      }
      website = url.href;
    } catch {
      return { ok: false, error: "That website doesn't look like a valid link." };
    }
  }

  return { ok: true, value: { name, message, website } };
}

/** Appends an entry. Resolves to false when it repeats the latest message. */
export function addEntry(input: Submission): Promise<boolean> {
  return mutate((entries) => {
    const last = entries.at(-1);
    if (last && last.name === input.name && last.message === input.message) {
      return { entries, result: false };
    }
    const entry: Entry = {
      id: crypto.randomUUID().slice(0, 8),
      ...input,
      date: new Date().toISOString(),
    };
    return { entries: [...entries, entry], result: true };
  });
}

/** Removes an entry by id. Resolves to false when there's no such entry. */
export function deleteEntry(id: string): Promise<boolean> {
  return mutate((entries) => {
    const kept = entries.filter((e) => e.id !== id);
    return { entries: kept, result: kept.length !== entries.length };
  });
}
