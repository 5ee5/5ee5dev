import { useEffect, useState } from "react";

export default function LatestCommit() {
  const [commit, setCommit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCommit() {
      try {
        const res = await fetch("https://api.github.com/repos/5ee5/5ee5dev/commits?per_page=1");
        const data = await res.json();
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        setCommit(data[0]);
      } catch (err) {
        console.error("❌ Commit fetch error:", err);
        setError(err.message);
      }
    }
    loadCommit();
  }, []);

  return (
    <div className="commit-dropdown">
      <button className="dropbtn">Latest Commit ▾</button>

      <div className="dropdown-content">
        {error && <small style={{ color: "red" }}>Error: {error}</small>}
        {!error && !commit && <small>Loading…</small>}
        {commit && (
          <a href={commit.html_url} target="_blank" rel="noreferrer">
            {commit.commit.message}
            <br />
            <small>{new Date(commit.commit.author.date).toLocaleString()}</small>
          </a>
        )}
      </div>
    </div>
  );
}
