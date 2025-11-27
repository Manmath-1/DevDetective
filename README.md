# DevDetective – GitHub Profile Explorer

DevDetective is a clean, responsive web application that allows users to search GitHub profiles and instantly view real-time details such as repositories, followers, social links, and account metadata. The app offers dark/light mode, client-side validation, and seamless API integration.

## 🚀 Features

🔍 Search GitHub usernames and view profile details

🔄 Live fetching from GitHub REST API (v3)

🌗 Light & Dark Mode with localStorage persistence

📊 Displays repositories, followers, following

📝 Shows bio, company, website, Twitter, and location

⚠️ Error indicator for invalid usernames

📱 Fully responsive UI

⚡ Fast, real-time GitHub API fetch

🎨 Modern, minimal Space-Mono typography

🌐 Clean UI inspired by GitHub aesthetic

## 📂 Project Structure
/
│── index.html       # UI Structure
│── style.css        # Styling + Responsive Design
│── script.js        # GitHub API logic + UI updates
│── assets/          # Icons, manifest, favicons

## 🛠️ Tech Stack

HTML5

CSS3 (Flexbox, Grid, Variables)

JavaScript (Vanilla JS)

GitHub REST API v3

## 🎯 How It Works

User enters a GitHub username

script.js fetches data from:
https://api.github.com/users/{username}

UI updates profile picture, stats, links, and metadata

Dark/light mode toggles CSS variables dynamically

## ⚡ Installation & Usage
1. Clone the repository
git clone https://github.com/Manmath-1/DevDetective.git

2. Open the project
cd devdetective

3. Run

Just open index.html in any browser.
No server required.

## 🔧 Environment Requirements

A modern browser (Chrome, Edge, Firefox, Safari)

Internet connection for GitHub API

JavaScript enabled

## 🧪 Error Handling

If username is invalid → red floating error box appears

If values like website, Twitter, or company are missing → “Not Available” with reduced opacity

Disabled links for zero repos/followers/following

## 🎨 Dark & Light Mode

Saved using localStorage

Automatically detects system preference

CSS variables dynamically updated

## 📱 Responsive Design Breakpoints

900px

600px

400px

Everything scales for mobile-first experience.

## 🤝Contributing

PRs welcome. Please run small UI tests and check mobile breakpoints.

## 🚀 Live Demo: Experience the project in action here ↓
 


## 📜 License

MIT License – free to use and modify.

## 👨‍💻 Author

**Manmath Somure**
GitHub: https://github.com/manmath-1