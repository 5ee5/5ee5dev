"use client";

import { useState, useEffect, useRef } from "react";

function formatRelativeTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

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
  const [commit, setCommit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchLatestCommit() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/5ee5/5ee5dev/commits?per_page=1"
        );
        if (!res.ok) {
          throw new Error(`GitHub API ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCommit(data[0]);
        }
      } catch (err) {
        console.error("❌ Commit fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestCommit();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
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
    <div className="commit-dropdown" ref={dropdownRef}>
      <button
        className="dropbtn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Latest Commit ▾
      </button>

      {isOpen && (
        <div className="dropdown-content show">
          {loading && (
            <small style={{ color: "var(--text-muted)" }}>
              Loading latest commit...
            </small>
          )}

          {error && <small style={{ color: "var(--accent-text)" }}>Error: {error}</small>}

          {!loading && !error && !commit && <small>No commit found</small>}

          {!loading && commit && (
            <a
              href={commit.html_url}
              target="_blank"
              rel="noreferrer"
              title={commit.commit.message}
            >
              <span className="commit-msg-text">{commitMessage}</span>
              <br />
              <small>
                {formatRelativeTime(commitDate)} (
                {new Date(commitDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </small>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

