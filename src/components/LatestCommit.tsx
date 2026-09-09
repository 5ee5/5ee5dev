"use client";

import { useState, useEffect, useRef } from "react";

type Commit = {
  html_url: string;
  commit: {
    message: string;
    author: { date: string } | null;
  };
};

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  const days = Math.floor(diffInSeconds / 86400);
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LatestCommit() {
  const [commit, setCommit] = useState<Commit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchLatestCommit() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/5ee5/5ee5dev/commits?per_page=1"
        );
        if (!res.ok) {
          throw new Error(`GitHub API ${res.status}`);
        }
        const data: unknown = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCommit(data[0] as Commit);
        }
      } catch (err) {
        console.error("❌ Commit fetch error:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchLatestCommit();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const commitMessage = commit?.commit?.message
    ? commit.commit.message.split("\n")[0]
    : "";
  const commitDate = commit?.commit?.author?.date;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="cursor-pointer rounded-md border-2 border-accent-text bg-background px-3.5 py-2 text-sm font-semibold text-accent-text transition-colors hover:bg-raised hover:text-foreground focus-visible:bg-raised focus-visible:text-foreground"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Latest Commit ▾
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-[1000] max-w-[320px] min-w-[260px] rounded-lg border border-edge bg-raised p-2.5 text-left break-words shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          {loading && (
            <small className="text-[11px] text-muted">
              Loading latest commit...
            </small>
          )}

          {error && (
            <small className="text-[11px] text-accent-text">Error: {error}</small>
          )}

          {!loading && !error && !commit && (
            <small className="text-[11px] text-muted">No commit found</small>
          )}

          {!loading && commit && (
            <a
              href={commit.html_url}
              target="_blank"
              rel="noreferrer"
              title={commit.commit.message}
              className="block rounded px-2.5 py-2 text-[13px] text-foreground transition-colors duration-150 hover:bg-surface"
            >
              <span className="mb-1 inline-block leading-[1.4] font-semibold">
                {commitMessage}
              </span>
              <br />
              <small className="text-[11px] text-muted">
                {formatRelativeTime(commitDate)} (
                {commitDate
                  ? new Date(commitDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
                )
              </small>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
