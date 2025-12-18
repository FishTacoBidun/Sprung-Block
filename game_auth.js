//game authentication handler - manages guest vs authenticated mode
const USER_API_BASE_URL = 'http://localhost:3004/api';

//get user mode and info from sessionStorage
const userMode = sessionStorage.getItem('userMode'); //'guest' or 'authenticated'
const userId = sessionStorage.getItem('userId');
const username = sessionStorage.getItem('username');

//global variable to track if user is authenticated
window.isAuthenticated = userMode === 'authenticated';
window.currentUserId = userId;
window.currentUsername = username;

//if no mode is set, redirect to index.html
if (!userMode) {
  window.location.href = 'index.html';
}

//guest mode: use sessionStorage (isolated per session, lost on refresh)
//authenticated mode: use User API (MongoDB, persistent)

//sessionStorage keys for guest mode
const GUEST_LEVELS_KEY = 'guestLevels';
const GUEST_BADGES_KEY = 'guestBadges';

//initialize guest progress in sessionStorage if not exists
function initGuestProgress() {
  if (!sessionStorage.getItem(GUEST_LEVELS_KEY)) {
    sessionStorage.setItem(GUEST_LEVELS_KEY, JSON.stringify([1])); //only level 1 unlocked
  }
  if (!sessionStorage.getItem(GUEST_BADGES_KEY)) {
    sessionStorage.setItem(GUEST_BADGES_KEY, JSON.stringify([])); //no badges unlocked
  }
}

//get guest progress from sessionStorage
function getGuestLevels() {
  const stored = sessionStorage.getItem(GUEST_LEVELS_KEY);
  return stored ? JSON.parse(stored) : [1];
}

function getGuestBadges() {
  const stored = sessionStorage.getItem(GUEST_BADGES_KEY);
  return stored ? JSON.parse(stored) : [];
}

//set guest progress in sessionStorage
function setGuestLevels(levels) {
  sessionStorage.setItem(GUEST_LEVELS_KEY, JSON.stringify(levels));
}

function setGuestBadges(badges) {
  sessionStorage.setItem(GUEST_BADGES_KEY, JSON.stringify(badges));
}

//initialize guest progress on load
if (!window.isAuthenticated) {
  initGuestProgress();
}

// ============================================================================
// TESTING MODE: UNLOCK ALL LEVELS IN GUEST MODE
// ============================================================================
// Uncomment the code below to unlock all levels in guest mode for testing.
// This is useful when testing levels without having to complete all previous
// levels first. Remember to comment it back out before deploying!
// ============================================================================
/*
if (!window.isAuthenticated) {
  // Unlock all levels (1 through 13, or update to match your TOTAL_LEVELS)
  const allLevels = [];
  for (let i = 1; i <= 13; i++) {
    allLevels.push(i);
  }
  setGuestLevels(allLevels);
  console.log('TESTING MODE: All levels unlocked in guest mode');
}
*/
// ============================================================================

//enhanced unlock next level function
async function unlockNextLevelEnhanced(levelNum) {
  if (levelNum <= 0 || levelNum >= 3) return;
  
  if (window.isAuthenticated) {
    //authenticated: save to user database
    try {
      console.log(`[CLIENT] Attempting to unlock level ${levelNum + 1} for authenticated user`);
      const response = await fetch(`${USER_API_BASE_URL}/users/me/levels/${levelNum + 1}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      console.log(`[CLIENT] Unlock level response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`[CLIENT] Level ${levelNum + 1} unlocked for user!`, data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error(`[CLIENT] Failed to unlock level for user: ${response.status}`, errorData);
        //try to get response text for more details
        const errorText = await response.text().catch(() => '');
        console.error(`[CLIENT] Error response text:`, errorText);
      }
    } catch (error) {
      console.error('[CLIENT] Error unlocking level for user:', error);
      console.error('[CLIENT] Error details:', error.message, error.stack);
    }
  } else {
    //guest mode: save to sessionStorage
    const currentLevels = getGuestLevels();
    if (!currentLevels.includes(levelNum + 1)) {
      currentLevels.push(levelNum + 1);
      setGuestLevels(currentLevels);
      console.log(`Level ${levelNum + 1} unlocked (guest mode - sessionStorage)!`);
    }
  }
  
  //note: refreshLevelButtonsEnhanced() will be called by character.js after unlockNextLevel returns
}

//enhanced unlock badge function
async function unlockBadgeEnhanced(badgeId) {
  if (window.isAuthenticated) {
    //authenticated: save to user database
    try {
      console.log(`[CLIENT] Attempting to unlock badge ${badgeId} for authenticated user`);
      const response = await fetch(`${USER_API_BASE_URL}/users/me/badges/${badgeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      console.log(`[CLIENT] Unlock badge response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`[CLIENT] Badge ${badgeId} unlocked for user!`, data);
        return true;
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error(`[CLIENT] Failed to unlock badge ${badgeId} for user: ${response.status}`, errorData);
        //try to get response text for more details
        const errorText = await response.text().catch(() => '');
        console.error(`[CLIENT] Error response text:`, errorText);
        return false;
      }
    } catch (error) {
      console.error(`[CLIENT] Error unlocking badge ${badgeId} for user:`, error);
      console.error(`[CLIENT] Error details:`, error.message, error.stack);
      return false;
    }
  } else {
    //guest mode: save to sessionStorage
    const currentBadges = getGuestBadges();
    if (!currentBadges.includes(badgeId)) {
      currentBadges.push(badgeId);
      setGuestBadges(currentBadges);
      console.log(`Badge ${badgeId} unlocked (guest mode - sessionStorage)!`);
    }
    return true;
  }
}

//enhanced refresh level buttons function
async function refreshLevelButtonsEnhanced() {
  const levelButtons = document.querySelectorAll(".level-button");
  
  if (window.isAuthenticated) {
    //authenticated: get levels from user database
    try {
      const response = await fetch(`${USER_API_BASE_URL}/users/me`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        //ensure we have valid arrays
        const unlockedLevels = Array.isArray(userData.unlockedLevels) && userData.unlockedLevels.length > 0
          ? userData.unlockedLevels
          : [1];
        
        //update button states
        levelButtons.forEach(button => {
          const levelNum = parseInt(button.getAttribute("data-level"));
          
          if (unlockedLevels.includes(levelNum)) {
            button.disabled = false;
            button.classList.remove("locked");
            button.classList.add("unlocked");
          } else {
            button.disabled = true;
            button.classList.remove("unlocked");
            button.classList.add("locked");
          }
        });
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user levels:', error);
      //fallback: only level 1 unlocked
      levelButtons.forEach(button => {
        const levelNum = parseInt(button.getAttribute("data-level"));
        if (levelNum === 1) {
          button.disabled = false;
          button.classList.remove("locked");
          button.classList.add("unlocked");
        } else {
          button.disabled = true;
          button.classList.remove("unlocked");
          button.classList.add("locked");
        }
      });
    }
  } else {
    //guest mode: get levels from sessionStorage
    const unlockedLevels = getGuestLevels();
    
    levelButtons.forEach(button => {
      const levelNum = parseInt(button.getAttribute("data-level"));
      
      if (unlockedLevels.includes(levelNum)) {
        button.disabled = false;
        button.classList.remove("locked");
        button.classList.add("unlocked");
      } else {
        button.disabled = true;
        button.classList.remove("unlocked");
        button.classList.add("locked");
      }
    });
  }
}

//this must return badge objects that match the format expected by displayBadges()
async function fetchBadgesEnhanced() {
  //wait for BADGE_CONFIG to be available (defined in character.js)
  //if it's not available yet, we'll create a minimal version
  const badgeConfig = window.BADGE_CONFIG || {
    1: { emoji: "🥇", description: "Complete Level 1" },  //level 1 Complete
    2: { emoji: "⏱️", description: "Complete Level 1 In Under 0:15" },  //level 1 Under 0:15
    3: { emoji: "❤️", description: "Complete Level 1 With 3/3 Health" },  //level 1 With 3/3 Health
    4: { emoji: "🥈", description: "Complete Level 2" },  //level 2 Complete
    5: { emoji: "⌛", description: "Complete Level 2 In Under 1:00" },  //level 2 Under 1:00
    6: { emoji: "💖", description: "Complete Level 2 With 3/3 Health" },  //level 2 With 3/3 Health
    7: { emoji: "🥉", description: "Complete Level 3" },  //level 3 Complete
    8: { emoji: "🕔", description: "Complete Level 3 In Under 2:00" },  //level 3 Under 2:00
    9: { emoji: "❤️‍🔥", description: "Complete Level 3 With 3/3 Health" },  //level 3 With 3/3 Health
    10: { emoji: "🏅", description: "Complete All Levels" }, //complete all levels
    11: { emoji: "🕰️", description: "Complete All Level Time Challenges" }, //complete all level time challenges
    12: { emoji: "💛", description: "Complete All Level Health Challenges" },  //complete all health time challenges
    13: { emoji: "?", description: "Coming Soon" },  //coming soon
    14: { emoji: "?", description: "Coming Soon" },  //coming soon
    15: { emoji: "?", description: "Coming Soon" },  //coming soon
    16: { emoji: "?", description: "Coming Soon" },  //coming soon
    17: { emoji: "?", description: "Coming Soon" },  //coming soon
    18: { emoji: "?", description: "Coming Soon" },  //coming soon
    19: { emoji: "?", description: "Coming Soon" },  //coming soon
    20: { emoji: "?", description: "Coming Soon" },  //coming soon
    21: { emoji: "?", description: "Coming Soon" },  //coming soon
    22: { emoji: "?", description: "Coming Soon" },  //coming soon
    23: { emoji: "?", description: "Coming Soon" },  //coming soon
    24: { emoji: "?", description: "Coming Soon" },  //coming soon
    25: { emoji: "?", description: "Coming Soon" },  //coming soon
    26: { emoji: "?", description: "Coming Soon" },  //coming soon
    27: { emoji: "?", description: "Coming Soon" },  //coming soon
    28: { emoji: "?", description: "Coming Soon" },  //coming soon
    29: { emoji: "?", description: "Coming Soon" },  //coming soon
    30: { emoji: "?", description: "Coming Soon" },  //coming soon
    31: { emoji: "?", description: "Coming Soon" },  //coming soon
    32: { emoji: "?", description: "Coming Soon" },  //coming soon
    33: { emoji: "?", description: "Coming Soon" },  //coming soon
    34: { emoji: "?", description: "Coming Soon" },  //coming soon
    35: { emoji: "?", description: "Coming Soon" },  //coming soon
    36: { emoji: "?", description: "Coming Soon" },  //coming soon
    37: { emoji: "?", description: "Coming Soon" },  //coming soon
  };
  
  if (window.isAuthenticated) {
    //authenticated: get badges from user database
    try {
      const response = await fetch(`${USER_API_BASE_URL}/users/me`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        //ensure we have a valid array
        const unlockedBadgeIds = Array.isArray(userData.unlockedBadges) 
          ? userData.unlockedBadges 
          : [];
        
        //map to badge objects - format matches what displayBadges() expects
        //displayBadges() uses badge.badgeId and BADGE_CONFIG, so we just need badgeId and unlocked
        const badges = [];
        for (let i = 1; i <= 12; i++) {
          badges.push({
            badgeId: i,
            unlocked: unlockedBadgeIds.includes(i)
            //name is not needed - displayBadges() looks it up from BADGE_CONFIG
          });
        }
        return badges.sort((a, b) => a.badgeId - b.badgeId);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user badges:', error);
      //return all badges as locked
      const badges = [];
      for (let i = 1; i <= 12; i++) {
        badges.push({
          badgeId: i,
          unlocked: false
        });
      }
      return badges.sort((a, b) => a.badgeId - b.badgeId);
    }
  } else {
    //guest mode: get badges from sessionStorage
    const unlockedBadgeIds = getGuestBadges();
    
    //map to badge objects - format matches what displayBadges() expects
    const badges = [];
    for (let i = 1; i <= 12; i++) {
      badges.push({
        badgeId: i,
        unlocked: unlockedBadgeIds.includes(i)
        //name is not needed - displayBadges() looks it up from BADGE_CONFIG
      });
    }
    return badges.sort((a, b) => a.badgeId - b.badgeId);
  }
}

//enhanced reset progress function
async function resetProgressEnhanced() {
  if (window.isAuthenticated) {
    //authenticated: reset user progress via API
    try {
      const response = await fetch(`${USER_API_BASE_URL}/users/me/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        console.log('User progress reset successfully');
        //refresh level buttons
        await refreshLevelButtonsEnhanced();
        //refresh badge display - wait a moment to ensure displayBadges is available
        setTimeout(() => {
          if (typeof displayBadges === 'function') {
            displayBadges();
          }
        }, 100);
      } else {
        console.error('Failed to reset user progress');
      }
    } catch (error) {
      console.error('Error resetting user progress:', error);
    }
  } else {
    //guest mode: reset sessionStorage
    setGuestLevels([1]); //only level 1 unlocked
    setGuestBadges([]); //no badges unlocked
    console.log('Guest progress reset successfully (sessionStorage)');
    //refresh level buttons
    await refreshLevelButtonsEnhanced();
    //refresh badge display - wait a moment to ensure displayBadges is available
    setTimeout(() => {
      if (typeof displayBadges === 'function') {
        displayBadges();
      }
    }, 100);
  }
}

//display username in feedback area if authenticated
if (window.isAuthenticated && username) {
  const feedbackPage = document.getElementById('feedbackPage');
  if (feedbackPage) {
    const existingSignedIn = document.getElementById('signedInText');
    if (existingSignedIn) {
      existingSignedIn.remove();
    }
    
    const signedInText = document.createElement('span');
    signedInText.id = 'signedInText';
    signedInText.textContent = `Signed in as: ${username}`;
    feedbackPage.appendChild(signedInText);
  }
}

console.log(`Game running in ${userMode} mode`);
if (window.isAuthenticated) {
  console.log(`Logged in as: ${username}`);
} else {
  console.log('Guest mode - progress stored in sessionStorage (isolated per session)');
}