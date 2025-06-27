const username = "5ee5";
const repoList1 = document.getElementById("repo-list-1");
const repoList2 = document.getElementById("repo-list-2");

// Display repository links
function displayRepos(repos) {
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

// Fetch and display repository list
fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => response.json())
  .then((repos) => displayRepos(repos))
  .catch((error) => {
    console.error("Error fetching repos:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to load repositories.";
    document.getElementById("github-section").appendChild(errorMessage);
  });

// Typing effect
const items = ["Student", "Freelance developer", "Linux enthusiast"];
const typingList = document.getElementById("typing-list");

let itemIndex = 0;
let charIndex = 0;

function typeNextItem() {
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
      setTimeout(typeNextItem, 300);
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

document.addEventListener("DOMContentLoaded", () => {
  typeNextItem();
  loadHeaderCommits(username, "5ee5dev");
});
