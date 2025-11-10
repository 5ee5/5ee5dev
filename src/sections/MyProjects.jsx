import { useEffect, useState } from "react";

export default function MyProjects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function loadRepos() {
      try {
        const res = await fetch("https://api.github.com/users/5ee5/repos?sort=updated&per_page=6");
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error("Error loading repos:", err);
      }
    }
    loadRepos();
  }, []);

  return (
    <section id="github-section">
      <h2>My Projects</h2>
      <div className="repo-lists">
        <ul id="repo-list-1">
          {repos.slice(0, Math.ceil(repos.length / 2)).map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank">{repo.name}</a>
            </li>
          ))}
        </ul>
        <ul id="repo-list-2">
          {repos.slice(Math.ceil(repos.length / 2)).map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank">{repo.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
