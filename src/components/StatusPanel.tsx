"use client";

import { useEffect, useState } from "react";
import type { Status } from "@/lib/status";

const POLL_MS = 5000;
const HISTORY = 24;
const SPARK = "▁▂▃▄▅▆▇█";

/** Down to the second, so a ticking counter visibly ticks. */
function duration(seconds: number) {
  const s = Math.floor(seconds);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const parts = [`${m}m`, `${s % 60}s`];
  if (d > 0) return `${d}d ${h}h ${parts.join(" ")}`;
  if (h > 0) return `${h}h ${parts.join(" ")}`;
  return parts.join(" ");
}

const gib = (bytes: number) => (bytes / 1024 ** 3).toFixed(1);

function bar(fraction: number, width = 20) {
  const filled = Math.round(Math.min(Math.max(fraction, 0), 1) * width);
  return `[${"#".repeat(filled)}${".".repeat(width - filled)}]`;
}

/** One block per sample, each scaled against all the CPU threads being busy. */
function sparkline(samples: number[], threads: number) {
  return samples
    .map((v) => SPARK[Math.min(SPARK.length - 1, Math.floor((v / threads) * SPARK.length))])
    .join("");
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="contents">
      <dt className="font-semibold text-on-header">{label}</dt>
      <dd className="min-w-0 break-words">{children}</dd>
    </div>
  );
}

/**
 * Shows the server's status, refreshed every few seconds while the tab is in
 * view. The uptime counters tick every second in between, locally, so they
 * cost no requests. If a refresh fails, the page says so and the counters
 * stop, instead of showing stale numbers as if they were live.
 */
export default function StatusPanel({ initial }: { initial: Status }) {
  const [status, setStatus] = useState(initial);
  const [online, setOnline] = useState(true);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [history, setHistory] = useState([initial.load[0]]);
  // Seconds since the last reading; the counters add this to what the server said.
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const next = (await res.json()) as Status;
        if (cancelled) return;
        setStatus(next);
        setHistory((h) => [...h, next.load[0]].slice(-HISTORY));
        setUpdated(new Date());
        setElapsed(0);
        setOnline(true);
      } catch {
        if (!cancelled) setOnline(false);
      }
    }

    const id = setInterval(poll, POLL_MS);
    const onVisible = () => void poll();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    if (!online) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [online]);

  const memFraction = status.memTotal > 0 ? status.memUsed / status.memTotal : 0;

  return (
    <div className="grid gap-5">
      <section className="card min-w-0 p-6">
        <p role="status" className="text-lg">
          <span className={online ? "text-accent-text" : "text-foreground"}>
            {online ? "● online" : "○ can't reach the server, retrying..."}
          </span>
        </p>
        <p className="mt-1 text-[0.85rem] text-muted">
          {updated
            ? `updated ${updated.toLocaleTimeString([], { hour12: false })}, refreshes every ${POLL_MS / 1000}s`
            : `refreshes every ${POLL_MS / 1000}s while this tab is open`}
        </p>
      </section>

      <section className="card min-w-0 p-6">
        <h2 className="prompt">$ uptime</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5">
          <Row label="machine">up {duration(status.hostUptime + elapsed)}</Row>
          <Row label="site">up {duration(status.appUptime + elapsed)}</Row>
          <Row label="load">
            {status.load.map((l) => l.toFixed(2)).join("  ")}{" "}
            <span className="text-muted">(1/5/15 min)</span>
          </Row>
          <Row label="history">
            <span aria-label="Recent load" className="text-accent-text">
              {sparkline(history, status.threads)}
            </span>
          </Row>
        </dl>
      </section>

      <section className="card min-w-0 p-6">
        <h2 className="prompt">$ free -h</h2>
        <p className="overflow-x-auto whitespace-pre">
          {bar(memFraction)} {Math.round(memFraction * 100)}%
        </p>
        <p className="mt-1 text-[0.85rem] text-muted">
          {gib(status.memUsed)} of {gib(status.memTotal)} GiB in use
        </p>
      </section>

      <section className="card min-w-0 p-6">
        <h2 className="prompt">$ lscpu</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5">
          <Row label="cpu">{status.cpu}</Row>
          <Row label="threads">{status.threads}</Row>
          <Row label="node">{status.node}</Row>
        </dl>
      </section>

      <section className="card min-w-0 p-6">
        <h2 className="prompt">$ git log -1</h2>
        {status.commit ? (
          <p>
            <span className="text-accent-text">{status.commit.hash}</span>{" "}
            {status.commit.subject}
          </p>
        ) : (
          <p className="text-muted">unknown</p>
        )}
        <p className="mt-1 text-[0.85rem] text-muted">
          {status.builtAgo !== null
            ? `built ${duration(status.builtAgo + elapsed)} ago`
            : "dev build"}
        </p>
      </section>
    </div>
  );
}
