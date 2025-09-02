const username = "5ee5";
const repo = "5ee5dev";

// Display repository links
function displayRepos(repos) {
  const repoList1 = document.getElementById("repo-list-1");
  const repoList2 = document.getElementById("repo-list-2");

  if (!repos || repos.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No public repositories found.";
    document.getElementById("github-section").appendChild(msg);
    return;
  }

  const half = Math.ceil(repos.length / 2);
  const firstHalf = repos.slice(0, half);
  const secondHalf = repos.slice(half);

  firstHalf.forEach((repo) => createRepoLink(repo, repoList1));
  secondHalf.forEach((repo) => createRepoLink(repo, repoList2));
}

function createRepoLink(repo, repoList) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.textContent = repo.name;
  listItem.appendChild(link);
  repoList.appendChild(listItem);
}

// Typing effect
const items = ["Student", "Self-proclaimed dev", "Linux enthusiast"];
let itemIndex = 0;
let charIndex = 0;

function typeNextItem(typingList) {
  if (itemIndex >= items.length) return;

  const li = document.createElement("li");
  li.innerHTML = "<span></span>";
  typingList.appendChild(li);
  const span = li.querySelector("span");

  function typeChar() {
    if (charIndex < items[itemIndex].length) {
      span.textContent += items[itemIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 50);
    } else {
      itemIndex++;
      charIndex = 0;
      setTimeout(() => typeNextItem(typingList), 300);
    }
  }

  typeChar();
}

// Show only the latest commit
function loadHeaderCommits(username, repo) {
  fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    .then((res) => res.json())
    .then((commits) => {
      const container = document.getElementById("commit-dropdown-list");
      const commit = commits[0];
      if (commit) {
        const date = new Date(commit.commit.committer.date).toLocaleString();
        const a = document.createElement("a");
        a.href = commit.html_url;
        a.target = "_blank";
        a.innerHTML = `<strong>${commit.commit.message}</strong><br><small>${date}</small>`;
        container.appendChild(a);
      }
    })
    .catch((err) => {
      console.error("Dropdown commit fetch failed:", err);
    });
}

// Copy blinkie
function setupBlinkieCopy() {
  document.getElementById("copy-blankie").addEventListener("click", function (e) {
    e.preventDefault();
    const code = `<a href="https://5ee5.github.io/5ee5dev/" target="_blank"><img src="https://5ee5.github.io/5ee5dev/5ee5.png" width="88" height="31" alt="5ee5's Blinkie" /></a>`;
    navigator.clipboard.writeText(code).then(() => {
      this.textContent = "Copied!";
      setTimeout(() => {
        this.innerHTML = `<img src="5ee5.png" width="88" height="31" alt="5ee5's Blinkie" />`;
      }, 2000);
    });
  });
}

// Copy helper
function setupCopy(link, text) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      const original = link.textContent;
      link.textContent = "Copied!";
      setTimeout(() => {
        link.textContent = original;
      }, 2000);
    });
  });
}

// Run everything after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const typingList = document.getElementById("typing-list");
  typeNextItem(typingList);

  loadHeaderCommits(username, repo);

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((repos) => displayRepos(repos))
    .catch((error) => {
      console.error("Error fetching repos:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Failed to load repositories.";
      document.getElementById("github-section").appendChild(errorMessage);
    });

  setupBlinkieCopy();
  setupCopy(document.getElementById("discord-link"), "https://discord.com/users/903314598596321331");
  setupCopy(document.getElementById("email-link"), "5ee5dev@proton.me");
});
