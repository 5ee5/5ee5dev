"use client";

import { useState, useEffect, useRef } from "react";
import { formatRelativeTime } from "@/lib/time";

export type CommitInfo = {
  message: string;
  date: string | null;
  url: string;
};

export default function CommitDropdown({
  commit,
}: {
  commit: CommitInfo | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const commitMessage = commit ? commit.message.split("\n")[0] : "";

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
          {!commit && (
            <small className="text-[11px] text-muted">No commit found</small>
          )}

          {commit && (
            <a
              href={commit.url}
              target="_blank"
              rel="noreferrer"
              title={commit.message}
              className="block rounded px-2.5 py-2 text-[13px] text-foreground transition-colors duration-150 hover:bg-surface"
            >
              <span className="mb-1 inline-block leading-[1.4] font-semibold">
                {commitMessage}
              </span>
              <br />
              <small className="text-[11px] text-muted">
                {formatRelativeTime(commit.date)} (
                {commit.date
                  ? new Date(commit.date).toLocaleTimeString([], {
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
