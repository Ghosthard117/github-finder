// APP state
const API = 'https://api.github.com/users/'
let dark = true

// Grab DOM elements
const result = document.querySelector('.result'),
form = document.querySelector('.form'),
input = document.querySelector('.form__input'),
waiting = document.querySelector('.form__waiting'),
notFound = document.querySelector('.not-found'),
themeSwitch = document.querySelector('.theme__switch'),
themeCSS = document.querySelector('.theme-css'),
themeName = document.querySelector('.theme-name')

// Listen click
form.addEventListener('submit', e => {
  e.preventDefault()

  // Get the username from the input
  const username = input.value.trim();

  if (!username) return;

  getUserData(username)

  input.value = ''
})

themeSwitch.addEventListener('click', switchTheme)

// Query the GitHub API fot that username
async function getUserData(username) {
  try {
    const response = await fetch(API + username)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    const data = await response.json()
    showUserData(data)
  } catch (error) {
    console.error('Error', error)
    showNotFound()
  }
}

// Show 404 Page
function showNotFound() {
  const img404 = '<img class="not-found" src="src/img/not-found.gif" alt="Not found">';
  result.innerHTML = img404;
}

// show the user data
function showUserData(data) {
  const {
    login,
    avatar_url: avatar,
    name,
    company,
    blog,
    public_repos: repos,
    location,
    email,
    bio,
    followers,
    following,
    created_at: joined,
  } = data;

  const userData = `
    <img src="${avatar}" class="avatar">

    <h2 class="name">${name}</h2>
    <h4 class="joined">${parseDate(joined)}</h4>
    <h5 class="username">${login}</h5>
    <p class="bio">${bio}</p>

    <section class="stats">
      <p class="repos">Repositories</p>
      <p class="followers">Followers</p>
      <p class="following">Following</p>
      <small class="repos">${repos}</small>
      <small class="followers">${followers}</small>
      <small class="following">${following}</small>
    </section>

    <nav class="contact">
      <a href="#" class="link"><i class="fa fa-map-marker-alt"></i> ${location}</a>
      <a href="#" class="link"><i class="fa fa-link"></i>${email}</a>
      <a href="${blog}" target="_blank" class="link"><i class="fa fa-link"></i>${blog}</a>
      <a href="#" class="link"><i class="fa fa-building"></i>${company}</a>
    </nav>
  `;
  result.innerHTML = userData;

  function parseDate(date) {
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(date.toLocaleString('en', options));
  }
}

// Switch theme
function switchTheme() {
  dark = !dark
  if (dark) {
    themeCSS.setAttribute('href', 'src/css/light-mode.css')
    themeName.textContent = 'Dark'
  } else {
    themeCSS.setAttribute('href', 'src/css/dark-mode.css')
    themeName.textContent = 'Light'
  }
}