//authentication client-side logic
const API_BASE_URL = 'https://sprung-block.onrender.com/api';

//simple menu sound system for index.html
let menuSoundVolume = 5; //50% default (0-10 scale)
const menuHoverSound = new Audio('sounds/hover_sound.mp3');
const menuClickSound = new Audio('sounds/click_sound.mp3');
menuHoverSound.volume = menuSoundVolume / 10;
menuClickSound.volume = menuSoundVolume / 10;

function playMenuHover() {
  menuHoverSound.currentTime = 0;
  menuHoverSound.volume = menuSoundVolume / 10;
  menuHoverSound.play().catch(() => {});
}

function playMenuClick() {
  menuClickSound.currentTime = 0;
  menuClickSound.volume = menuSoundVolume / 10;
  menuClickSound.play().catch(() => {});
}

//helper to add button sounds
function addButtonSounds(element) {
  if (!element) return;
  element.addEventListener('mouseenter', playMenuHover);
  element.addEventListener('click', playMenuClick);
}

//get DOM elements
const welcomeScreen = document.getElementById('welcomeScreen');
const guestButton = document.getElementById('guestButton');
const signInButton = document.getElementById('signInButton');
const createAccountButton = document.getElementById('createAccountButton');

const signInForm = document.getElementById('signInForm');
const signInFormElement = document.getElementById('signInFormElement');
const signInClose = document.getElementById('signInClose');
const signInError = document.getElementById('signInError');
const signInSubmitButton = signInFormElement?.querySelector('button[type="submit"]');

const createAccountForm = document.getElementById('createAccountForm');
const createAccountFormElement = document.getElementById('createAccountFormElement');
const createAccountClose = document.getElementById('createAccountClose');
const createAccountError = document.getElementById('createAccountError');
const createAccountSubmitButton = createAccountFormElement?.querySelector('button[type="submit"]');

//get logo element
const gameLogo = document.getElementById('gameLogo');

function playIntroAnimation() {
  const buttons = document.querySelectorAll('.auth-button');

  //reset logo
  gameLogo.classList.remove('animate', 'hidden');

  //reset buttons
  buttons.forEach(btn => btn.classList.remove('fade-in'));

  //force reflow
  void gameLogo.offsetHeight;

  //replay load up animation
  setTimeout(() => {
    gameLogo.classList.add('animate');

    setTimeout(() => {
      buttons[0]?.classList.add('fade-in');
      setTimeout(() => {
        buttons[1]?.classList.add('fade-in');
        setTimeout(() => {
          buttons[2]?.classList.add('fade-in');
        }, 500);
      }, 500);
    }, 1000);
  }, 50);
}

//show/hide forms
function showForm(formElement) {
  welcomeScreen.style.display = 'none';
  signInForm.classList.remove('active');
  createAccountForm.classList.remove('active');
  formElement.classList.add('active');
  //hide logo when form is shown
  if (gameLogo) {
    gameLogo.classList.remove('animate');
    gameLogo.classList.add('hidden');
  }
}

function showWelcome() {
  welcomeScreen.style.display = 'flex';
  signInForm.classList.remove('active');
  createAccountForm.classList.remove('active');

  //clear errors
  signInError.classList.remove('show');
  signInError.textContent = '';
  createAccountError.classList.remove('show');
  createAccountError.textContent = '';

  playIntroAnimation();
}

//add button sounds
addButtonSounds(guestButton);
addButtonSounds(signInButton);
addButtonSounds(createAccountButton);
addButtonSounds(signInClose);
addButtonSounds(createAccountClose);
if (signInSubmitButton) addButtonSounds(signInSubmitButton);
if (createAccountSubmitButton) addButtonSounds(createAccountSubmitButton);

//guest mode, play without saving
guestButton.addEventListener('click', () => {
  //set guest mode in sessionStorage (not persisted, lost on tab close)
  sessionStorage.setItem('userMode', 'guest');
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('username');
  //redirect to game
  window.location.href = 'game.html';
});

//show sign in form
signInButton.addEventListener('click', () => {
  showForm(signInForm);
});

//show create account form
createAccountButton.addEventListener('click', () => {
  showForm(createAccountForm);
});

//close buttons
signInClose.addEventListener('click', showWelcome);
createAccountClose.addEventListener('click', showWelcome);

//sign in form submission
signInFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('signInUsername').value;
  const password = document.getElementById('signInPassword').value;
  
  //show loading overlay
  const authLoadingOverlay = document.getElementById('authLoadingOverlay');
  if (authLoadingOverlay) {
    authLoadingOverlay.style.display = 'flex';
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include' //important for cookies/sessions
    });
    
    const data = await response.json();
    
    if (response.ok) {
      //store user info in sessionStorage
      sessionStorage.setItem('userMode', 'authenticated');
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('username', data.username);
      //redirect to game (loading overlay will disappear on redirect)
      window.location.href = 'game.html';
    } else {
      //hide loading overlay and show error
      if (authLoadingOverlay) {
        authLoadingOverlay.style.display = 'none';
      }
      signInError.textContent = data.message || 'Sign in failed';
      signInError.classList.add('show');
    }
  } catch (error) {
    console.error('Sign in error:', error);
    //hide loading overlay and show error
    if (authLoadingOverlay) {
      authLoadingOverlay.style.display = 'none';
    }
    signInError.textContent = 'Connection error, please try again.';
    signInError.classList.add('show');
  }
});

//create account form submission
createAccountFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('createUsername').value;
  const password = document.getElementById('createPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  //validate password
  if (password !== confirmPassword) {
    createAccountError.textContent = 'Passwords do not match';
    createAccountError.classList.add('show');
    return;
  }
  
  if (password.length < 6) {
    createAccountError.textContent = 'Password must be at least 6 characters';
    createAccountError.classList.add('show');
    return;
  }
  
  if (!/\d/.test(password)) {
    createAccountError.textContent = 'Password must contain at least one number';
    createAccountError.classList.add('show');
    return;
  }
  
  //show loading overlay
  const authLoadingOverlay = document.getElementById('authLoadingOverlay');
  if (authLoadingOverlay) {
    authLoadingOverlay.style.display = 'flex';
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      //store user info in sessionStorage
      sessionStorage.setItem('userMode', 'authenticated');
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('username', data.username);
      //redirect to game (loading overlay will disappear on redirect)
      window.location.href = 'game.html';
    } else {
      //hide loading overlay and show error
      if (authLoadingOverlay) {
        authLoadingOverlay.style.display = 'none';
      }
      createAccountError.textContent = data.message || 'Account creation failed';
      createAccountError.classList.add('show');
    }
  } catch (error) {
    console.error('Create account error:', error);
    //hide loading overlay and show error
    if (authLoadingOverlay) {
      authLoadingOverlay.style.display = 'none';
    }
    createAccountError.textContent = 'Connection error, please try again.';
    createAccountError.classList.add('show');
  }
});

