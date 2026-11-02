"use client";

import { useSyncExternalStore } from "react";
import { formatRelativeTime } from "@/lib/time";

const MINUTE = 60_000;
const RELATIVE_FOR = 30 * 24 * 60 * MINUTE;

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, MINUTE);
  return () => clearInterval(id);
}

const getMinute = () => Math.floor(Date.now() / MINUTE);

/**
 * The written date until it hydrates, then a relative time ("3 hours ago")
 * that keeps ticking. Posts older than a month keep the written date. Static
 * pages go stale between builds, which is why this runs in the browser.
 */
export default function PostDate({
  date,
  timestamp,
}: {
  date: string;
  timestamp: number;
}) {
  // null on the server, so the first client render matches the static HTML.
  const minute = useSyncExternalStore(subscribe, getMinute, () => null);
  const recent = minute !== null && minute * MINUTE - timestamp < RELATIVE_FOR;

  return (
    <time dateTime={new Date(timestamp).toISOString()} title={date}>
      {recent ? formatRelativeTime(new Date(timestamp).toISOString()) : date}
    </time>
  );
}
