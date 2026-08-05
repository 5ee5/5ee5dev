export default async function LatestCommit() {
  let commit = null;
  let error = null;

  try {
    const res = await fetch(
      "https://api.github.com/repos/5ee5/5ee5dev/commits?per_page=1",
      {
        next: { revalidate: 60 },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}`);
    }

    commit = data[0];
  } catch (err) {
    console.error("❌ Commit fetch error:", err);
    error = err.message;
  }

  return (
    <div className="commit-dropdown">
      <button className="dropbtn">Latest Commit ▾</button>

      <div className="dropdown-content">
        {error && <small style={{ color: "red" }}>Error: {error}</small>}

        {!error && !commit && <small>No commit found</small>}

        {commit && (
          <a href={commit.html_url} target="_blank" rel="noreferrer">
            {commit.commit.message}
            <br />
            <small>
              {new Date(commit.commit.author.date).toLocaleString()}
            </small>
          </a>
        )}
      </div>
    </div>
  );
}
