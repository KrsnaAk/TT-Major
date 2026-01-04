
// Select DOM elements - updated to match index.html exactly
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const statusContainer = document.getElementById('status-container');
const resultContainer = document.getElementById('result-container');
const profileMount = document.getElementById('profile-mount');
const reposMount = document.getElementById('repos-mount');
const repoCountBadge = document.getElementById('repo-count');

/**
 * Show a loading spinner during API requests
 */
function showLoading() {
  statusContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 space-y-5">
      <div class="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-slate-500 font-bold tracking-wide animate-pulse">Searching GitHub...</p>
    </div>
  `;
  resultContainer.classList.add('hidden');
}

/**
 * Handle and display error messages
 * @param {string} title 
 * @param {string} message 
 */
function showError(title, message) {
  statusContainer.innerHTML = `
    <div class="bg-white border border-red-100 rounded-[2rem] p-10 text-center max-w-xl mx-auto shadow-xl transform transition-all animate-in zoom-in-95 duration-300">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-red-50 text-red-500 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      </div>
      <h2 class="text-3xl font-black text-slate-800 mb-3">${title}</h2>
      <p class="text-slate-500 text-lg leading-relaxed">${message}</p>
    </div>
  `;
  resultContainer.classList.add('hidden');
}

/**
 * Renders the User Profile section
 * @param {Object} user 
 */
function renderProfile(user) {
  profileMount.innerHTML = `
    <article class="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 p-8 md:p-12 mb-10 overflow-hidden relative">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
      
      <div class="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative z-10">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <img src="${user.avatar_url}" alt="${user.login}" class="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-white bg-slate-100 object-cover shadow-lg" />
        </div>
        
        <div class="flex-1 space-y-6">
          <div class="space-y-2">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 class="text-4xl font-black text-slate-900 tracking-tight">${user.name || user.login}</h2>
                <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold text-xl transition-all">
                  @${user.login}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
              <div class="flex items-center justify-center md:justify-start gap-4 text-slate-400 text-sm font-medium">
                 ${user.location ? `
                  <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    ${user.location}
                  </span>
                 ` : ''}
                 <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Joined ${new Date(user.created_at).getFullYear()}
                 </span>
              </div>
            </div>
          </div>
          
          ${user.bio ? `<p class="text-slate-600 text-xl leading-relaxed font-medium">${user.bio}</p>` : ''}
          
          <div class="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
            <div class="flex flex-col bg-slate-50 px-6 py-4 rounded-2xl min-w-[120px]">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Repositories</span>
              <span class="text-3xl font-black text-slate-800">${user.public_repos}</span>
            </div>
            <div class="flex flex-col bg-slate-50 px-6 py-4 rounded-2xl min-w-[120px]">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Followers</span>
              <span class="text-3xl font-black text-slate-800">${user.followers}</span>
            </div>
            <div class="flex flex-col bg-slate-50 px-6 py-4 rounded-2xl min-w-[120px]">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Following</span>
              <span class="text-3xl font-black text-slate-800">${user.following}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renders the Repository List section
 * @param {Array} repos 
 * @param {number} totalCount
 */
function renderRepos(repos, totalCount) {
  // Update the count badge in index.html
  if (repoCountBadge) {
    repoCountBadge.textContent = totalCount || 0;
  }

  if (!repos || repos.length === 0) {
    reposMount.innerHTML = `
      <div class="col-span-full bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
        <p class="text-slate-400 text-lg italic">This developer hasn't published any public repositories yet.</p>
      </div>
    `;
    return;
  }

  const repoHtml = repos.map(repo => `
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="group bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between h-full">
      <div class="space-y-4">
        <div class="flex items-start justify-between gap-2">
          <h4 class="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors break-all leading-tight">
            ${repo.name}
          </h4>
          <div class="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-bold shrink-0">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ${repo.stargazers_count}
          </div>
        </div>
        <p class="text-slate-500 line-clamp-3 text-base leading-relaxed h-[4.5rem]">
          ${repo.description || 'No description available for this project.'}
        </p>
      </div>
      
      <div class="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-sm font-semibold">
        <div class="flex items-center gap-4">
          ${repo.language ? `
            <div class="flex items-center gap-2 text-slate-700">
              <span class="w-3 h-3 rounded-full bg-blue-500"></span>
              ${repo.language}
            </div>
          ` : ''}
        </div>
        <div class="text-slate-400 font-medium text-xs">
          Updated ${new Date(repo.updated_at).toLocaleDateString()}
        </div>
      </div>
    </a>
  `).join('');

  reposMount.innerHTML = repoHtml;
}

/**
 * Fetch and process the GitHub user search
 * @param {string} username 
 */
async function handleSearch(username) {
  showLoading();
  searchButton.disabled = true;

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    
    if (userResponse.status === 404) {
      showError("User Not Found", `We couldn't find a GitHub profile for "${username}". Make sure the username is spelled correctly.`);
      return;
    }

    if (!userResponse.ok) {
      throw new Error("GitHub API Error");
    }

    const userData = await userResponse.json();
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
    const reposData = reposResponse.ok ? await reposResponse.json() : [];

    // Successfully got data, update the UI
    statusContainer.innerHTML = '';
    resultContainer.classList.remove('hidden');
    
    renderProfile(userData);
    renderRepos(reposData, userData.public_repos);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (error) {
    showError("Something Went Wrong", "We ran into an issue connecting to the GitHub API. Please check your internet connection and try again.");
    console.error("Search Error:", error);
  } finally {
    searchButton.disabled = false;
  }
}

// Attach Event Listeners
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  
  if (!query) {
    alert('Please enter a GitHub username to search.');
    return;
  }
  
  handleSearch(query);
});

// Allow search on enter key automatically via form submit
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // Form submission is handled by the submit listener
  }
});
