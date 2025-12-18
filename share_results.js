const SHARE_API_BASE_URL = 'http://localhost:3003/api';

//get shareId from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const shareId = urlParams.get('id');

const shareResultsMessage = document.getElementById('shareResultsMessage');
const shareBackButton = document.getElementById('shareBackButton');

//menu sound system
let menuSoundVolume = 5;
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

//add sounds to back button
if (shareBackButton) {
  shareBackButton.addEventListener('mouseenter', playMenuHover);
  shareBackButton.addEventListener('click', playMenuClick);
}

//fetch and display shared results
async function loadShareResults() {
  if (!shareId) {
    shareResultsMessage.textContent = 'Invalid share link, no share ID provided.';
    return;
  }

  try {
    const response = await fetch(`${SHARE_API_BASE_URL}/share/${shareId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        shareResultsMessage.textContent = 'This share link is invalid or has expired.';
      } else {
        shareResultsMessage.textContent = 'Error loading shared results. Please try again later.';
      }
      return;
    }

    const data = await response.json();
    
    //format the message using the username from the data
    const username = data.username || "Your friend";
    const message = `${username} beat level ${data.levelNum} in ${data.time} with ${data.health} health leftover.`;
    shareResultsMessage.textContent = message;
  } catch (error) {
    console.error('Error fetching share results:', error);
    shareResultsMessage.textContent = 'Error loading shared results. Please try again later.';
  }
}

//back button handler
shareBackButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

//load results on page load
loadShareResults();
