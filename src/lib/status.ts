import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Harmless numbers about the machine serving the site. Nothing here names a
 * host, an address, a path or another process.
 */
export type Status = {
  /** Seconds the machine has been up. */
  hostUptime: number;
  /** Seconds the site's Node process has been up (resets on each deploy). */
  appUptime: number;
  /** 1, 5 and 15 minute load averages. */
  load: [number, number, number];
  threads: number;
  cpu: string;
  memTotal: number;
  memUsed: number;
  node: string;
  commit: { hash: string; subject: string } | null;
  /** Seconds since the last build, or null in dev. */
  builtAgo: number | null;
};

let commit: Status["commit"] | undefined;

/** The deployed commit. Read once: a deploy restarts the process anyway. */
function getCommit(): Status["commit"] {
  if (commit !== undefined) return commit;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%h%x09%s"], {
      encoding: "utf8",
      timeout: 2000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const [hash, ...rest] = out.split("\t");
    commit = hash ? { hash, subject: rest.join("\t") } : null;
  } catch {
    commit = null;
  }
  return commit;
}

/** `free` counts cache as used; MemAvailable is what's really left. */
function getMemory() {
  try {
    const info = fs.readFileSync("/proc/meminfo", "utf8");
    const kb = (key: string) => Number(info.match(new RegExp(`^${key}:\\s+(\\d+)`, "m"))?.[1]);
    const total = kb("MemTotal") * 1024;
    const available = kb("MemAvailable") * 1024;
    if (total > 0 && available >= 0) return { total, used: total - available };
  } catch {}
  return { total: os.totalmem(), used: os.totalmem() - os.freemem() };
}

function getBuiltAgo() {
  try {
    const built = fs.statSync(path.join(process.cwd(), ".next/BUILD_ID")).mtimeMs;
    return Math.max(0, (Date.now() - built) / 1000);
  } catch {
    return null;
  }
}

export function getStatus(): Status {
  const cpus = os.cpus();
  const memory = getMemory();
  const [one, five, fifteen] = os.loadavg();
  return {
    hostUptime: os.uptime(),
    appUptime: process.uptime(),
    load: [one, five, fifteen],
    threads: cpus.length,
    cpu: cpus[0]?.model.replace(/\s+/g, " ").trim() ?? "unknown",
    memTotal: memory.total,
    memUsed: memory.used,
    node: process.version,
    commit: getCommit(),
    builtAgo: getBuiltAgo(),
  };
}
