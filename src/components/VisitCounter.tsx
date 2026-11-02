"use client";

import { useEffect, useState } from "react";

const FLAG = "5ee5-visited";

/**
 * `visits: 1,234` for the status bar. A browser counts once: the first load
 * POSTs and sets a flag, later loads only read the total.
 */
export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(FLAG) !== null;
    } catch {
      // Storage blocked: count this load and don't try to remember it.
    }

    fetch("/api/visits", { method: seen ? "GET" : "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number } | null) => {
        if (!data) return;
        setCount(data.count);
        try {
          localStorage.setItem(FLAG, "1");
        } catch {}
      })
      .catch(() => {});
  }, []);

  return (
    <span>
      visits: {count === null ? "…" : count.toLocaleString("en-US")}
    </span>
  );
}
