const input = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const profileDiv = document.getElementById("profile");
const reposDiv = document.getElementById("repos");
const repoList = document.getElementById("repoList");
const repoCount = document.getElementById("repoCount");
const message = document.getElementById("message");

const BASE_URL = "https://api.github.com/users/";

async function fetchUser() {
  const username = input.value.trim();
  message.textContent = "";
  profileDiv.style.display = "none";
  reposDiv.style.display = "none";

  if (!username) {
    message.textContent = "Please enter a username first.";
    return;
  }

  try {
    const userRes = await fetch(`${BASE_URL}${username}`);
    if (userRes.status === 404) {
      message.textContent = "User not found";
      return;
    }

    const user = await userRes.json();
    renderProfile(user);

    const repoRes = await fetch(`${BASE_URL}${username}/repos`);
    const repos = await repoRes.json();
    renderRepos(repos);

  } catch {
    message.textContent = "Something went wrong. Please try again.";
  }
}

function renderProfile(user) {
  profileDiv.innerHTML = `
    <img src="${user.avatar_url}" />
    <div class="profile-info">
      <h2>${user.name || user.login}</h2>
      <p class="username">@${user.login}</p>
      <p>${user.bio || ""}</p>

      <div class="stat-boxes">
        <div class="stat">
          <label>REPOSITORIES</label>
          <h3>${user.public_repos}</h3>
        </div>
        <div class="stat">
          <label>FOLLOWERS</label>
          <h3>${user.followers}</h3>
        </div>
        <div class="stat">
          <label>FOLLOWING</label>
          <h3>${user.following}</h3>
        </div>
      </div>
    </div>
  `;

  profileDiv.style.display = "flex";
}

function renderRepos(repos) {
  repoList.innerHTML = "";
  repoCount.textContent = repos.length;

  repos.forEach(r => {
    const card = document.createElement("div");
    card.className = "repo-card";

    card.innerHTML = `
      <div class="repo-top">
        <a class="repo-name" href="${r.html_url}" target="_blank">${r.name}</a>
        <span class="star-badge">⭐ ${r.stargazers_count}</span>
      </div>

      <p class="repo-desc">${r.description || "No description available"}</p>

      <div class="repo-footer">
        <span><span class="lang-dot"></span>${r.language || "Unknown"}</span>
        <span>Updated ${new Date(r.updated_at).toLocaleDateString()}</span>
      </div>
    `;

    repoList.appendChild(card);
  });

  reposDiv.style.display = "block";
}

searchBtn.addEventListener("click", fetchUser);
input.addEventListener("keydown", e => e.key === "Enter" && fetchUser());
