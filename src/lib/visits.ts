import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "visits.json");

export async function getVisits(): Promise<number> {
  let raw: string;
  try {
    raw = await fs.readFile(FILE, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return 0;
    throw err;
  }
  // A corrupt file throws instead of reading as 0, so the next increment
  // can't overwrite the real count with 1.
  const { count } = JSON.parse(raw) as { count: unknown };
  if (typeof count !== "number" || !Number.isInteger(count) || count < 0) {
    throw new Error("data/visits.json is malformed");
  }
  return count;
}

// One Node process serves the site, so a promise chain is enough to keep two
// simultaneous visits from reading the same number and both writing it back.
let queue: Promise<unknown> = Promise.resolve();

export function addVisit(): Promise<number> {
  const run = queue.then(async () => {
    const count = (await getVisits()) + 1;
    await fs.mkdir(DATA_DIR, { recursive: true });
    // Write beside the file and rename, so a crash mid-write can't leave a
    // half-written visits.json behind.
    const tmp = `${FILE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify({ count }));
    await fs.rename(tmp, FILE);
    return count;
  });
  queue = run.catch(() => {});
  return run;
}
