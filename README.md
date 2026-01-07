# 🚀 GitHub User Explorer

A high-performance, modern web application designed to explore GitHub profiles and repositories in real-time. Built with a focus on speed, aesthetics, and clean code.

![GitHub User Explorer Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-JS%20|%20HTML%20|%20CSS?style=for-the-badge)

## ✨ Features

- **🔍 Real-time Search:** Instantly find any GitHub user by their username.
- **📊 Comprehensive Stats:** View followers, following counts, and total public repositories at a glance.
- **📁 Repository Insights:** Browse the most recently updated repositories including star counts, primary languages, and project descriptions.
- **📱 Fully Responsive:** Optimized for mobile, tablet, and desktop viewing.
- **🎨 Modern UI/UX:** Clean design using Tailwind CSS with subtle animations and a focus on readability.
- **⚠️ Robust Error Handling:** Graceful handling of "User Not Found" states and API connectivity issues.

## 🛠️ Tech Stack

- **Frontend:** HTML, Tailwind CSS
- **Logic:**  JavaScript
- **API:** [GitHub REST API](https://docs.github.com/en/rest)
- **Icons:** Custom SVG icons for a consistent look.

## 🚀 Getting Started

To run this project locally, simply clone the repository and open `index.html` in your browser. No build steps or installations required!

```bash
# Clone the repository
git clone https://github.com/your-username/github-user-explorer.git

# Navigate to the project directory
cd github-user-explorer

# Open index.html in your preferred browser
```

## 📖 How It Works

1. **User Input:** The app captures the username from the search field.
2. **API Fetch:** It performs two simultaneous requests to the GitHub API:
   - User profile data (name, bio, avatar, etc.)
   - User repository data (sorted by most recently updated).
3. **Dynamic Injection:** The JavaScript engine clears the current view and injects the formatted data directly into the DOM using high-performance template literals.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Developed with ❤️ by a passionate developer.*
