const modeBtn = document.querySelector(".btn-mode");
const modeText = modeBtn.querySelector("#modeText");
const modeIcon = modeBtn.querySelector("#modeIcon");
const searchForm = document.querySelector("[data-searchForm]");
const searchInput = document.querySelector("[data-input]");
const noResult = document.querySelector(".error");

const profilePic = document.querySelector("[data-profilepic]");
const profileName = document.querySelector("[data-name]");
const profileUserName = document.querySelector("[data-username]");
const joiningDate = document.querySelector("[data-joining]");
const profileDesc = document.querySelector("[data-description]");
const repos = document.querySelector("[data-repo]");
const userFollowers = document.querySelector("[data-followers]");
const userFollowing = document.querySelector("[data-following]");
const userLocation = document.querySelector("[data-location]");
const userWebsite = document.querySelector("[data-website]");
const twitter = document.querySelector("[data-twitter]");
const userCompany = document.querySelector("[data-company]");



//Fetching Data 
async function getGitHubUserData(username) {
    try{
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        if(data.status === 404 || data.status ==="404"){
            searchInput.value = "";
            noResult.classList.add("active");
            setTimeout(()=>{
                noResult.classList.remove("active");
            },2500);
        }
        else{
            renderingInfo(data);
        }
        
    }
    catch(error){
        console.log("Fetching Error : ", error)
    }
}

//Rendering data 

function renderingInfo(data) {

    // Profile Picture and Basic Info
    profilePic.src = data.avatar_url;
    profileName.innerText = data.name || "No name";
    profileUserName.href = data.html_url;
    profileUserName.innerText = data.login;

    //Convert ISO date from GitHub API to a readable "Joined DD Month YYYY" Format
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateSegment = data?.created_at.split("T").shift().split("-");
    joiningDate.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;

    profileDesc.innerText = data.bio || "This Profile Has No Bio";

    // Stats
    repos.innerText = data.public_repos ?? 0;
    userFollowers.innerText = data.followers ?? 0;
    userFollowing.innerText = data.following ?? 0;
    
    // stats links and disable if count is 0
    repos.href = `https://github.com/${data.login}?tab=repositories`;
    repos.style.pointerEvents = data.public_repos > 0 ? "auto" : "none";
    repos.style.opacity = data.public_repos > 0 ? 1 : 0.5;

    userFollowers.href = `https://github.com/${data.login}?tab=followers`;
    userFollowers.style.pointerEvents = data.followers > 0 ? "auto" : "none";
    userFollowers.style.opacity = data.followers > 0 ? 1 : 0.5;

    userFollowing.href = `https://github.com/${data.login}?tab=following`;
    userFollowing.style.pointerEvents = data.following > 0 ? "auto" : "none";
    userFollowing.style.opacity = data.following > 0 ? 1 : 0.5;

    // Location
    if (data.location) {
        userLocation.innerText = data.location;
    } else {
        userLocation.innerText = "Not available";
        userLocation.style.pointerEvents = "none";
        userLocation.style.opacity = 0.5;
    }

    // Website
    if (data.blog) {
        userWebsite.innerText = data.blog;
        userWebsite.href = data.blog.startsWith("http") ? data.blog : `https://${data.blog}`;
        userWebsite.style.pointerEvents = "auto";
        userWebsite.style.opacity = 1;
    } else {
        userWebsite.innerText = "Not available";
        userWebsite.removeAttribute("href");
        userWebsite.style.pointerEvents = "none";
        userWebsite.style.opacity = 0.5;
    }

    // Twitter
    if (data.twitter_username) {
        twitter.innerText = data.twitter_username;
        twitter.href = `https://twitter.com/${data.twitter_username}`;
        twitter.style.pointerEvents = "auto";
        twitter.style.opacity = 1;
    } else {
        twitter.innerText = "Not available";
        twitter.removeAttribute("href");
        twitter.style.pointerEvents = "none";
        twitter.style.opacity = 0.5;
    }

    // Company
    if (data.company) {
        userCompany.innerText = data.company;
        userCompany.style.pointerEvents = "auto";
        userCompany.style.opacity = 1;
    } else {
        userCompany.innerText = "Not available";
        userCompany.style.pointerEvents = "none";
        userCompany.style.opacity = 0.5;
    }

    // Clear search input
    searchInput.value = "";
}



//Search Form
 searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let userName= searchInput.value;
    if (userName.trim() === ""){
        return;
    }
    else{
        getGitHubUserData(userName);
    }
})


//Dark and Light Mode
let darkMode = false;
const root = document.documentElement.style;

modeBtn.addEventListener("click", () => {

    if (darkMode === false) {
        enableDarkMode();
    }
    else {
        enableLightMode();
    }
});

function enableDarkMode() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeText.innerText = "LIGHT";
    modeIcon.src = "./assets/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);

}

function enableLightMode() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeText.innerText = "DARK";
    modeIcon.src = "./assets/moon-icon.svg";   
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

// This code checks if the user's device has a preference for dark mode
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if there is a value for "dark-mode" in the user's localStorage
if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
        // If the device preference is for dark mode, apply dark mode properties
        enableDarkMode();
    } else {
        // If the device preference is not for dark mode, apply light mode properties
        enableLightMode();
    }
} else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        enableDarkMode();
    } else {
        // If the value is not "true", apply light mode properties
        enableLightMode();
    }
}

getGitHubUserData("manmath-1");


// ========================
//  Responsive Placeholder (max-width: 400px)
// ========================

const input = document.querySelector(".search-container input");

function updatePlaceholder(e) {
  if (e.matches) {
    input.placeholder = "Enter Username";
  } else {
    input.placeholder = "Enter a Github Username";
  }
}

const mediaQuery = window.matchMedia("(max-width: 400px)");

updatePlaceholder(mediaQuery);        
mediaQuery.addEventListener("change", updatePlaceholder);
