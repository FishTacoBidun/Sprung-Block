//game display
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("levelSelectMenu");
const levelTimer = document.getElementById("levelTimer");
const pauseButton = document.getElementById("pauseButton");
const pauseOverlay = document.getElementById("pauseOverlay");
const levelCompleteOverlay = document.getElementById("levelCompleteOverlay");
const levelCompleteTime = document.getElementById("levelCompleteTime");
const shareResultsOption = document.getElementById("shareResultsOption");
const badgeOverlay = document.getElementById("badgeOverlay");
const badgeGrid = document.getElementById("badgeGrid");
const badgeButton = document.getElementById("badgeButton");
const badgeExitButton = document.getElementById("badgeExitButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//API configuration
const API_BASE_URL = 'https://sprung-block.onrender.com/api';
const BADGE_API_BASE_URL = 'https://sprung-block.onrender.com/api';
const SHARE_API_BASE_URL = 'https://sprung-block.onrender.com/api';
let currentLevelNum = null; //track current level
let loadedLevelScript = null; //track loaded level script for cleanup
let isGameRunning = false; //track if game loop is running
let isPaused = false; //track if game is paused
let initialEnemies = null; //store initial enemies state for reset
let initialSpikes = null; // Store initial spikes state for reset
let levelStartTime = null; //track when level started
let lastPauseTime = null; //track when game was paused
let isLevelComplete = false; //prevent multiple level complete triggers
let lastCompletionData = null; //store last level completion data for sharing
let isDying = false; //track if death animation is playing
let deathAnimationStart = null; //track when death animation started
let pausedDeathAnimationStart = null; //track how long death animation was playing before pause
let defeatedEnemies = new Map(); //track defeated enemies and their respawn timers {enemyIndex: respawnTime}
let pausedInvulnerableUntil = null; //track remaining invulnerability time when paused
let pausedEnemyRespawnTimes = new Map(); //track paused enemy respawn times

//delta time tracking for frame-rate independent movement
let lastFrameTime = performance.now();
const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS; //milliseconds per frame at target FPS

//health system
let playerHealth = 3; //3
let lastHealthCheckTime = 0; //0
const HEALTH_CHECK_INTERVAL = 100; //check every 100ms to prevent infinite loops
let lastDamageTime = 0; //0
const DAMAGE_COOLDOWN = 1000; //1 second cooldown between damage
let invulnerableUntil = 0; //timestamp until which player is invulnerable

//health system interface
const HealthSystem = {
  healthValue: 0,
  hasPendingDamage: false,
  
  //writes damage
  writeDamage(damage) {
    this.healthValue = damage;
    this.hasPendingDamage = true;
  },
  
  //reads damage
  readDamage() {
    const damage = this.healthValue;
    this.healthValue = 0; //clear damage
    this.hasPendingDamage = false;
    return damage;
  }
};

//starting position
const START_X = 2660; //100
const START_Y = -1850; //400

//player setup and physics
const player = 
{
  x: START_X,
  y: START_Y,
  width: 32, //32
  height: 35, //35
  color: "red",
  velocityX: 0,
  velocityY: 0,
  speed: 7, //7
  jumping: false,
  gravity: 0.8, //0.8
  jumpForce: -15, //-15
};

//track if player was on surface for jump sound
let wasOnSurface = false;

//spike collision detection
function generateSpikeHitboxes(spike) {
  const NUM_RECTANGLES = 10;
  const RECT_HEIGHT = 3; //each rectangle is 3 pixels tall
  const hitboxes = [];
  
  //triangle definition: top point at center-top, base at bottom
  const triTopX = spike.x + spike.width / 2;
  const triTopY = spike.y;
  const triBottomY = spike.y + spike.height;
  
  //generate each rectangle
  for (let i = 0; i < NUM_RECTANGLES; i++) {
    //calculate y position of this rectangle (top edge)
    const rectY = spike.y + (i * RECT_HEIGHT);
    
    //calculate how far down we are (0 at top, 1 at bottom)
    const progress = (rectY + RECT_HEIGHT / 2 - triTopY) / (triBottomY - triTopY);
    
    //calculate width = baseWidth * progress
    const rectWidth = spike.width * progress * (0.75 + (i * 0.02));
    
    //center the rectangle horizontally
    const rectX = triTopX - rectWidth / 2;
    
    //only add rectangle if it has meaningful width (skip very small top rectangles)
    if (rectWidth > 3) {
      hitboxes.push({
        x: rectX,
        y: rectY,
        width: rectWidth,
        height: RECT_HEIGHT
      });
    }
  }
  
  return hitboxes;
}

//Check if player rectangle intersects with any of the spike's hitbox rectangles
//Parameters: player object and array of hitbox rectangles
//Returns: true if collision detected, false otherwise
function playerIntersectsSpikeHitboxes(player, hitboxes) {
  //Quick AABB check first - check if player overlaps spike's bounding box
  //This is a fast rejection test
  const playerRight = player.x + player.width;
  const playerBottom = player.y + player.height;
  
  //Check each hitbox rectangle
  for (const hitbox of hitboxes) {
    //Standard AABB collision check
    if (player.x < hitbox.x + hitbox.width &&
        playerRight > hitbox.x &&
        player.y < hitbox.y + hitbox.height &&
        playerBottom > hitbox.y) {
      return true; //Collision detected
    }
  }
  
  return false; //No collision
}

//controls
const keys = { a: false, d: false, space: false, w: false };
let lastHorizontalKey = null; //track last horizontal key pressed (a or d) for priority

//left, right, and jump
document.addEventListener("keydown", (e) => 
{
  if (e.code === "KeyA") {
    keys.a = true;
    lastHorizontalKey = "a";
  }
  if (e.code === "KeyD") {
    keys.d = true;
    lastHorizontalKey = "d";
  }
  if (e.code === "Space") keys.space = true;
  if (e.code === "KeyW") keys.w = true;

  if (e.code === "KeyR") keys.r = true;
});

document.addEventListener("keyup", (e) => 
{
  if (e.code === "KeyA") {
    keys.a = false;
    if (lastHorizontalKey === "a") lastHorizontalKey = null;
  }
  if (e.code === "KeyD") {
    keys.d = false;
    if (lastHorizontalKey === "d") lastHorizontalKey = null;
  }
  if (e.code === "Space") keys.space = false;
  if (e.code === "KeyW") keys.w = false;

  if (e.code === "KeyR") keys.r = false;
});

//handle window resizing
window.addEventListener("resize", () => 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//camera setup
const camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

//texture loading and caching system
const textures = {};
const patterns = {}; //cached patterns for repeating textures
let texturesLoaded = false;
let texturesLoading = false;

function loadTexture(name, path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load texture: ${path}`));
    img.src = path;
  });
}

function createPatternCanvas(texture, targetWidth, targetHeight, sourceWidth, sourceHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(texture, 0, 0, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
  return canvas;
}

async function loadAllTextures() {
  if (texturesLoaded || texturesLoading) return;
  texturesLoading = true;
  
  try {
    textures.spike = await loadTexture('spike', 'textures/spike_text.png');
    textures.goal = await loadTexture('goal', 'textures/diamond_text.png');
    textures.goalGlow = await loadTexture('goalGlow', 'textures/diamond_glow_text.png');
    textures.enemy = await loadTexture('enemy', 'textures/ghost_text.png');
    textures.player = await loadTexture('player', 'textures/pumpkin_text.png');
    textures.stone = await loadTexture('stone', 'textures/stone_text.png');
    textures.dirt = await loadTexture('dirt', 'textures/dirt_text.png');
    textures.wood = await loadTexture('wood', 'textures/wood_text.png');
    textures.glow = await loadTexture('glow', 'textures/glow_text.png');
    textures.darkGlow = await loadTexture('darkGlow', 'textures/dark_glow_text.png');
    textures.background = await loadTexture('background', 'textures/cave_text.png');
    textures.health3 = await loadTexture('health3', 'textures/3health_text.png');
    textures.health2 = await loadTexture('health2', 'textures/2health_text.png');
    textures.health1 = await loadTexture('health1', 'textures/1health_text.png');
    textures.health0 = await loadTexture('health0', 'textures/0health_text.png');
    textures.signRight = await loadTexture('signRight', 'textures/right_sign_text.png');
    textures.signLeft = await loadTexture('signLeft', 'textures/left_sign_text.png');
    textures.signUp = await loadTexture('signUp', 'textures/up_sign_text.png');
    textures.signDown = await loadTexture('signDown', 'textures/down_sign_text.png');
    
    //create and cache patterns for repeating textures
    //solid and ground: 320px texture -> 64px repeat
    if (textures.stone) {
      const stonePatternCanvas = createPatternCanvas(textures.stone, 64, 64, 320, 320);
      patterns.stone = stonePatternCanvas; //will be used to create pattern in draw()
    }
    if (textures.dirt) {
      const dirtPatternCanvas = createPatternCanvas(textures.dirt, 64, 64, 320, 320);
      patterns.dirt = dirtPatternCanvas; //for ground
      //platform pattern: 300x150 texture -> 30x15 repeat
      const platformPatternCanvas = createPatternCanvas(textures.wood, 60, 30, 300, 150);
      patterns.platform = platformPatternCanvas;
    }
    
    texturesLoaded = true;
    console.log('All textures loaded successfully');
  } catch (error) {
    console.error('Error loading textures:', error);
  } finally {
    texturesLoading = false;
  }
}

//initialize texture loading on page load
loadAllTextures();

//check if player has fallen below the map
function checkVoidCollision(player) {
  //if player falls below the base height, they hit the void - but skip if already dying
  if (player.y > BASE_HEIGHT + 100 && !isDying) {
    //write damage to function
    HealthSystem.writeDamage(3);
    return true;
  }
  return false;
}

//check if player reached the goal
function checkGoalCollision(player) {
  if (typeof goal !== 'undefined') {
    //check if player interacts with goal
    if (player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y) {
      return true;
    }
  }
  return false;
}


//unlock next level via API (uses enhanced function from game_auth.js)
async function unlockNextLevel(levelNum) {
  //use the unlock next level function that handles both guest and authenticated modes
  if (typeof unlockNextLevelEnhanced === 'function') {
    await unlockNextLevelEnhanced(levelNum);
  } else {
    //fallback if game_auth.js isn't loaded
    if (levelNum <= 0 || levelNum >= 3) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/levels/${levelNum + 1}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unlocked: true })
      });
      
      if (response.ok) {
        console.log(`Level ${levelNum + 1} unlocked!`);
        refreshLevelButtons();
      } else {
        console.error('Failed to unlock next level');
      }
    } catch (error) {
      console.error('Error unlocking next level:', error);
    }
  }
}

//pause game
function pauseGame() {
  if (!isPaused) {
    isPaused = true;
    pauseOverlay.style.display = "flex";
    //track when we paused to subtract paused time
    lastPauseTime = Date.now();
    //reset frame time to prevent large delta when unpausing
    lastFrameTime = performance.now();
    
    //pause death animation
    if (isDying && deathAnimationStart !== null) {
      const elapsed = Date.now() - deathAnimationStart;
      pausedDeathAnimationStart = elapsed;
    }
    
    //pause invulnerability timer
    if (Date.now() < invulnerableUntil) {
      pausedInvulnerableUntil = invulnerableUntil - Date.now(); //store remaining time
    } else {
      pausedInvulnerableUntil = null;
    }
    
    //pause enemy respawn timers - we'll adjust them on resume using lastPauseTime
    //no need to store separately, we'll shift all timestamps forward by pause duration
    
    playGameSound('pause');
  }
}

//resume game
function resumeGame() {
  if (isPaused) {
    isPaused = false;
    pauseOverlay.style.display = "none";
    //calculate paused duration before clearing lastPauseTime (needed for all timer adjustments)
    const pausedDuration = lastPauseTime !== null ? Date.now() - lastPauseTime : 0;
    
    //adjust levelStartTime to account for paused time
    if (lastPauseTime !== null && levelStartTime !== null) {
      levelStartTime += pausedDuration; //shift start time forward by paused duration
    }
    
    //resume death animation
    if (isDying && pausedDeathAnimationStart !== null) {
      deathAnimationStart = Date.now() - pausedDeathAnimationStart;
      pausedDeathAnimationStart = null;
    }
    
    //resume invulnerability timer
    if (pausedInvulnerableUntil !== null) {
      invulnerableUntil = Date.now() + pausedInvulnerableUntil;
      pausedInvulnerableUntil = null;
    }
    
    //resume enemy respawn timers - shift all times forward by paused duration
    //this ensures the timer doesn't advance during pause
    if (pausedDuration > 0) {
      for (const [enemyKey, data] of defeatedEnemies.entries()) {
        data.respawnStartTime += pausedDuration;
        data.respawnTime += pausedDuration;
        if (data.killableAfter) {
          data.killableAfter += pausedDuration;
        }
      }
    }
    
    //clear pause time tracking
    lastPauseTime = null;
    pausedEnemyRespawnTimes.clear();
    
    //reset frame time to prevent large delta when resuming
    lastFrameTime = performance.now();
  }
}

//format time helper function
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

//show level complete screen
async function showLevelComplete() {
  //ensure overlay is hidden first to prevent duplicate displays
  levelCompleteOverlay.style.display = "none";
  
  //play both level beat sounds at the same time
  playGameSound('levelBeat1');
  playGameSound('levelBeat2');
  
  //calculate final total elapsed time
  const currentTime = Date.now();
  let finalTime = 0;
  
  if (levelStartTime !== null) {
    //calculate time since level start
    finalTime = currentTime - levelStartTime;
    
    //subtract any currently paused time
    if (isPaused && lastPauseTime !== null) {
      finalTime -= (currentTime - lastPauseTime);
    }
  }
  
  //format and display time
  const formattedTime = formatTime(finalTime);
  levelCompleteTime.textContent = `Time: ${formattedTime}`;
  
  //store completion data for sharing (only for levels 1-3, not tutorial level 0)
  if (currentLevelNum >= 0 && currentLevelNum <= 13) {
    lastCompletionData = {
      levelNum: currentLevelNum,
      time: formattedTime,
      health: playerHealth
    };
    //show share button for levels 1-3
    if (shareResultsOption) {
      shareResultsOption.style.display = "block";
    }
  } else {
    lastCompletionData = null;
    //hide share button for tutorial level
    if (shareResultsOption) {
      shareResultsOption.style.display = "none";
    }
  }
  
  //stop the game loop first to prevent lag
  stopGameLoop();
  
  //check and unlock badges (only for levels 1-3, not tutorial level 0)
  //do this asynchronously after stopping the game loop to reduce lag
  //add a small delay to ensure level unlock has completed
  if (currentLevelNum > 0 && currentLevelNum <= 13) {
    //wait a bit for level unlock to complete, then unlock badges
    setTimeout(() => {
      checkAndUnlockBadges(currentLevelNum, finalTime, playerHealth).then(() => {
        //refresh badge display after unlocking badges
        if (typeof displayBadges === 'function') {
          displayBadges();
        }
      }).catch(err => {
        console.error('Error unlocking badges:', err);
      });
    }, 200); //200ms delay to avoid race conditions
  }
  
  //show overlay after stopping game loop
  levelCompleteOverlay.style.display = "flex";
}

//go to next level
function goToNextLevel() {
  if (currentLevelNum === null) return;
  
  //hide level complete overlay
  levelCompleteOverlay.style.display = "none";
  
  //reset level complete flag
  isLevelComplete = false;
  
  //determine next level
  let nextLevel = currentLevelNum + 1;
  
  //if we're at level 3, go back to menu
  if (nextLevel > 13) {
    returnToMenu();
    return;
  }
  
  //load next level
  loadLevel(nextLevel);
}

//restart level
function restartLevel() {
  resumeGame();
  //reset level complete flag
  isLevelComplete = false;
  //reset player position and state
  player.x = START_X;
  player.y = START_Y;
  player.velocityX = 0;
  player.velocityY = 0;
  player.jumping = false;
  playerHealth = 3;
  lastDamageTime = 0;
  invulnerableUntil = 0;
    //reset timer on restart
    if (levelStartTime !== null) {
      levelStartTime = Date.now();
    }
    //reset frame time to prevent large delta on restart
    lastFrameTime = performance.now();
  
  //reset enemies and spikes
  if (initialEnemies) {
    enemies.length = 0;
    enemies.push(...initialEnemies.map(e => ({...e})));
    //clear defeated enemies tracking
    defeatedEnemies.clear();
  }
  if (initialSpikes) {
    spikes.length = 0;
    spikes.push(...initialSpikes.map(s => ({...s})));
  }
}

//return to main menu
function returnToMenu() {
  //stop the game loop
  stopGameLoop();
  
  //reset pause state
  isPaused = false;
  pauseOverlay.style.display = "none";
  levelCompleteOverlay.style.display = "none";
  
  //reset level complete flag
  isLevelComplete = false;
  
  //reset time tracking
  levelStartTime = null;
  lastPauseTime = null;
  
  //reset player position and state
  player.x = START_X;
  player.y = START_Y;
  player.velocityX = 0;
  player.velocityY = 0;
  player.jumping = false;
  playerHealth = 3;
  lastDamageTime = 0;
  invulnerableUntil = 0;
  
  //reset enemies (reload level to restore enemies)
  if (typeof enemies !== 'undefined' && Array.isArray(enemies)) {
    //enemies will be reset when level is reloaded
  }
  
  //hide canvas, timer, and pause button, show menu
  canvas.style.display = "none";
  if (levelTimer) levelTimer.style.display = "none";
  pauseButton.style.display = "none";
  menu.style.display = "flex";
  
  //refresh button states
  refreshLevelButtons();
}

//game logic
function update(dt = 1.0) 
{
  //quick restart
  if (keys.r) {
    restartLevel()
  }

  //handle death animation - check this first to prevent any movement/damage
  if (isDying) {
    //if paused during death, stop all movement and skip all update logic
    if (isPaused) {
      player.velocityX = 0;
      player.velocityY = 0;
      return;
    }
    
    //not paused, process death animation
    const currentTime = Date.now();
    const elapsed = currentTime - deathAnimationStart;
    
    // Stop all player movement immediately when dying
    player.velocityX = 0;
    player.velocityY = 0;
    
    if (elapsed >= 1000) {
      //death animation complete, respawn
      isDying = false;
      deathAnimationStart = null;
      playerHealth = 3;
      player.x = START_X;
      player.y = START_Y;
      player.velocityX = 0;
      player.velocityY = 0;
      player.jumping = false;
      lastDamageTime = 0;
      invulnerableUntil = 0;
      //reset timer on death
      if (levelStartTime !== null) {
        levelStartTime = Date.now();
      }
      //reset frame time to prevent large delta on respawn
      lastFrameTime = performance.now();
      //reset enemies and spikes (but keep defeated enemies tracking)
      if (initialEnemies) {
        enemies.length = 0;
        enemies.push(...initialEnemies.map(e => ({...e})));
        //clear defeated enemies since we're resetting
        defeatedEnemies.clear();
      }
      if (initialSpikes) {
        spikes.length = 0;
        spikes.push(...initialSpikes.map(s => ({...s})));
      }
      console.log("Player respawned! Health restored to 3.");
    }
    //skip all other update logic during death animation
    return;
  }
  
  //check for void collision (player falling below map) - only if not dying
  if (checkVoidCollision(player)) {}
  
  //check for goal collision
  if (checkGoalCollision(player) && !isLevelComplete) {
    isLevelComplete = true; //prevent multiple triggers
    console.log(`Level ${currentLevelNum} completed!`);
    //only unlock next level if not tutorial (level 0)
    if (currentLevelNum > 0) {
      // Unlock next level and wait for it to complete before showing level complete
      // This ensures level unlock finishes before badge unlocks start
      unlockNextLevel(currentLevelNum).then(() => {
        showLevelComplete();
      }).catch(err => {
        console.error('Error unlocking next level:', err);
        // Still show level complete even if unlock fails
        showLevelComplete();
      });
    } else {
      showLevelComplete();
    }
    return;
  }
  
  //store previous position for collision detection (before movement)
  const prevY = player.y;
  const prevX = player.x;
  
  //check health system
  const currentTime = Date.now();
  if (currentTime - lastHealthCheckTime >= HEALTH_CHECK_INTERVAL) {
    if (HealthSystem.hasPendingDamage) {
      const damage = HealthSystem.readDamage();

      //only process if we actually have damage
      if (damage > 0) {
        const willBeFatal = (playerHealth - damage) <= 0;
        //check if we're invulnerable (only allow damage if fatal or invulnerability expired)
        if (willBeFatal || currentTime >= invulnerableUntil) {
          playerHealth -= damage;
          //clamp health at 0 minimum to prevent negative health
          if (playerHealth < 0) {
            playerHealth = 0;
          }
          console.log(`Player took ${damage} damage! Health: ${playerHealth}`);

          if (playerHealth <= 0 && !isDying) {
            //start death animation
            isDying = true;
            deathAnimationStart = Date.now();
            playerHealth = 0; //set to 0 to show 0 health texture
            //stop player movement immediately
            player.velocityX = 0;
            player.velocityY = 0;
            playGameSound('death');
            console.log("Death animation started");
          } else {
            //grant 1.2s invulnerability after non-fatal hit
            lastDamageTime = currentTime; //legacy, can be removed later
            invulnerableUntil = currentTime + 1200;
            playGameSound('hit'); //play hit sound for non-fatal damage
          }
        }
      }
    }
    lastHealthCheckTime = currentTime;
  }

  //horizontal movement - most recently pressed key takes priority
  if (keys.a && keys.d) {
    //both keys pressed - use most recent
    if (lastHorizontalKey === "a") {
      player.velocityX = -player.speed;
    } else if (lastHorizontalKey === "d") {
      player.velocityX = player.speed;
    } else {
      player.velocityX = 0;
    }
  } else if (keys.a) {
    player.velocityX = -player.speed;
  } else if (keys.d) {
    player.velocityX = player.speed;
  } else {
    player.velocityX = 0;
  }

  //jumping - only play sound if player was on a surface (successful jump)
  //allow both space and w key for jumping
  if ((keys.space || keys.w) && !player.jumping && wasOnSurface) 
  {
    player.velocityY = player.jumpForce;
    player.jumping = true;
    playGameSound('jump');
  }

  //gravity (multiply by dt for frame-rate independence)
  player.velocityY += player.gravity * dt;
  //movement (multiply by dt for frame-rate independence)
  player.x += player.velocityX * dt;
  player.y += player.velocityY * dt;

  //check enemy collisions before surface collisions (so landing on enemies works correctly) - skip if dying
  let enemyKilled = false;
  if (typeof enemies !== 'undefined' && enemies && !isDying) {
    const currentTime = Date.now();
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      
      //skip collision if enemy is still respawning or in invulnerability period after respawn
      let isRespawning = false;
      if (initialEnemies && typeof defeatedEnemies !== 'undefined') {
        for (const [enemyKey, data] of defeatedEnemies.entries()) {
          if (Math.abs(data.enemy.x - enemy.x) < 1 &&
              Math.abs(data.enemy.y - enemy.y) < 1 &&
              data.enemy.width === enemy.width &&
              data.enemy.height === enemy.height) {
            //check if enemy is still respawning (before respawnTime)
            //account for pause time by using adjusted time
            const adjustedTime = isPaused && lastPauseTime !== null 
              ? lastPauseTime 
              : currentTime;
            if (adjustedTime < data.respawnTime) {
              isRespawning = true;
              break;
            }
          }
        }
      }
      
      if (isRespawning) continue; //skip collision for respawning enemies
      
      //check if player intersects with enemy
      if (player.x < enemy.x + enemy.width &&
          player.x + player.width > enemy.x &&
          player.y < enemy.y + enemy.height &&
          player.y + player.height > enemy.y) {
        
        const playerBottom = player.y + player.height;
        const prevBottom = prevY + player.height;
        const wasAbove = prevBottom <= enemy.y;
        const isBelowTop = playerBottom >= enemy.y;
        const fallingDown = player.velocityY >= 0;
  
        if (wasAbove && isBelowTop && fallingDown) {
          //player landed on top = kill enemy and bounce
          player.y = enemy.y - player.height;
          //if holding space or w, give full jump boost, otherwise small bounce
          if (keys.space || keys.w) {
            player.velocityY = player.jumpForce; //full jump boost
          } else {
            player.velocityY = -12; //small bounce
          }
          player.jumping = false;
          playGameSound('enemyDeath'); //play enemy death sound
          
          //store enemy data for respawn using position as unique identifier
          const enemyKey = `${enemy.x}_${enemy.y}_${enemy.width}_${enemy.height}`;
          
          //remove enemy from array first
          enemies.splice(i, 1);
          
          //set up respawn tracking if possible
          if (initialEnemies) {
            //find matching enemy in initial enemies
            const matchingEnemy = initialEnemies.find(e => 
              Math.abs(e.x - enemy.x) < 1 && 
              Math.abs(e.y - enemy.y) < 1 &&
              e.width === enemy.width &&
              e.height === enemy.height
            );
            if (matchingEnemy && !defeatedEnemies.has(enemyKey)) {
              const enemyData = {...matchingEnemy};
              const respawnStartTime = Date.now();
              const respawnTime = respawnStartTime + 6000; //6 seconds from now
              defeatedEnemies.set(enemyKey, {
                enemy: enemyData,
                respawnTime: respawnTime,
                respawnStartTime: respawnStartTime
              });
              console.log("Enemy defeated! Will respawn in 6 seconds.");
              
              //add enemy back to array immediately for fade-in animation (but it won't have hitbox until respawnTime)
              enemies.push({...enemyData});
            }
          }
          
          enemyKilled = true;
          break;
        } else {
          //player hit from side or bottom = take damage
          const currentTime = Date.now();
          if (currentTime >= invulnerableUntil) {
            HealthSystem.writeDamage(1);
          }
        }
      }
    }
  }
  
  //check for enemy respawns (enemies are already in array for fade-in, just remove from tracking when fully respawned)
  //skip respawn checking if paused (timer doesn't advance when paused)
  if (typeof enemies !== 'undefined' && initialEnemies && !isPaused) {
    const currentTime = Date.now();
    for (const [enemyKey, data] of defeatedEnemies.entries()) {
      //check if respawn time has been reached (only when not paused)
      if (currentTime >= data.respawnTime) {
        //enemy is fully respawned (hitbox active), remove from tracking
        defeatedEnemies.delete(enemyKey);
        console.log("Enemy fully respawned!");
      }
    }
  }

  //surface collision
  let onSurface = false;

  for (const s of surfaces) {
    //pass-through platform
    if (s.type === "platform") {
      const playerBottom = player.y + player.height;
      const prevBottom = prevY + player.height;
    
      //only check collision if horizontally overlapping
      const horizontalOverlap =
        player.x + player.width > s.x && player.x < s.x + s.width;
      if (!horizontalOverlap) continue;
    
      //landing condition
      const wasAbove = prevBottom <= s.y;
      const isBelowTop = playerBottom >= s.y;
      const fallingDown = player.velocityY >= 0;
    
      if (wasAbove && isBelowTop && fallingDown) 
      {
        //snap player onto platform surface
        player.y = s.y - player.height;
        player.velocityY = 0;
        player.jumping = false;
        onSurface = true;
      }
    }
    //solid platform for ground and solids
    else if (s.type === "solid" || s.type === "ground") 
    {
      // Axis-aligned bounding box (AABB) collision detection
      const nextX = player.x + player.velocityX;
      const nextY = player.y + player.velocityY;

      //check if player will intersect with surface next frame
      const willIntersect =
        nextX < s.x + s.width &&
        nextX + player.width > s.x &&
        nextY < s.y + s.height &&
        nextY + player.height > s.y;

      if (willIntersect) {
        //compute overlap amounts
        const overlapX1 = (player.x + player.width) - s.x; //overlap from left
        const overlapX2 = (s.x + s.width) - player.x; //overlap from right
        const overlapY1 = (player.y + player.height) - s.y; //overlap from top
        const overlapY2 = (s.y + s.height) - player.y; //overlap from bottom

        //determine smallest overlap
        const minOverlapX = Math.min(overlapX1, overlapX2);
        const minOverlapY = Math.min(overlapY1, overlapY2);

        if (minOverlapX + 0.1 < minOverlapY) {
          //horizontal collision
          if (overlapX1 < overlapX2) {
            //hit wall on the left
            player.x = s.x - player.width;
          } else {
            //hit wall on the right
            player.x = s.x + s.width;
          }
          player.velocityX = 0;
        } else {
          //vertical collision
          if (overlapY1 < overlapY2) {
            //landed on top
            player.y = s.y - player.height;
            player.velocityY = 0;
            player.jumping = false;
            onSurface = true;
          } else {
            //hit from below
            player.y = s.y + s.height;
            player.velocityY = 0;
          }
        }
      }
    }

  //check spike collisions (after surface collisions) - skip if dying
  if (typeof spikes !== 'undefined' && spikes && !isDying) {
    for (const spike of spikes) {
      //Generate the 10 composite hitbox rectangles for this spike
      const spikeHitboxes = generateSpikeHitboxes(spike);
      
      //Check if player intersects with any of the spike's hitbox rectangles
      if (playerIntersectsSpikeHitboxes(
        { x: player.x, y: player.y, width: player.width, height: player.height },
        spikeHitboxes
      )) {
        //Player hit spike - take damage (respect invulnerability period)
        const currentTime = Date.now();
        if (currentTime >= invulnerableUntil) {
          HealthSystem.writeDamage(1);
        }
      }
    }
  }
  }

  //track if player was on surface for jump sound detection
  wasOnSurface = onSurface;
  
  //if player isn't on a surface, keep falling (skip if dying - already handled above)
  if (!onSurface && !enemyKilled && !isDying) 
  {
    player.jumping = true;
  }

  //update camera viewport to match world units and center on player
  if (typeof BASE_WIDTH !== "undefined") camera.width = BASE_WIDTH;
  if (typeof BASE_HEIGHT !== "undefined") camera.height = BASE_HEIGHT;

  //center camera on the player's midpoint (x) and bias vertically so player appears ~3/4 down the screen
  camera.x = player.x + player.width / 2 - camera.width / 2;
  camera.y = player.y + player.height / 2 - camera.height * 0.60;
}

//render game
function draw() {
  //compute scale and centering
  const scaleX = canvas.width / BASE_WIDTH;
  const scaleY = canvas.height / BASE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);
  const offsetX = (canvas.width - BASE_WIDTH * scale) / 2;
  const offsetY = (canvas.height - BASE_HEIGHT * scale) / 2;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //apply scaling for game elements
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  
  //draw background (in world space, before camera transform)
  //background tracks with camera horizontally (with parallax) and always fills viewport vertically
  if (texturesLoaded && textures.background) {
    ctx.save();
    
    //background scrolls slowly with player movement (parallax effect)
    const bgScrollSpeed = 0.1; //slow scrolling factor (background moves at this fraction of player speed)
    const bgParallaxOffset = player.x * bgScrollSpeed;
    
    //background dimensions
    const bgWidth = 800; //each repetition is 800px wide (scaled from 1600px texture)
    const bgHeight = 500; //viewport height (scaled from 1000px texture)
    const textureWidth = 1600; //source texture width
    const textureHeight = 1000; //source texture height
    const OVERLAP = 6;
    
    //background position in world space
    //Position background slower than camera: use parallax offset directly as world position
    //This makes it scroll at bgScrollSpeed instead of camera speed
    const bgWorldX = bgParallaxOffset;
    
    //align to repetition boundaries for seamless tiling
    const startBgX = -150;
    //background Y position: always fills viewport vertically
    const bgY = 0;
    
    //calculate source offset based on remainder
    const remainder = bgWorldX - startBgX;
    //convert to texture coordinates (texture is 2x the destination size)
    const sourceOffset = ((remainder * 2) % textureWidth + textureWidth) % textureWidth;
    
    //draw 3 repetitions to cover viewport width (800 * 3 = 2400px, more than enough)
    for (let i = 0; i < 3; i++) {
      //position each repetition consecutively, no overlap
      const destX = startBgX + (i * bgWidth - OVERLAP);
      
      //each repetition shows the next 1600px of texture (scaled to 800px)
      //continue seamlessly from previous repetition
      let sourceX = (sourceOffset + (i * bgWidth * 2)) % textureWidth;
      sourceX = sourceX < 0 ? sourceX + textureWidth : sourceX;
      
      //draw this repetition (1600px source -> 800px dest)
      const sourceWidth = (bgWidth + OVERLAP) * 2; //800 * 2 = 1600px from source
      
      if (sourceX + sourceWidth <= textureWidth) {
        //simple case: no wrapping needed
        ctx.drawImage(
          textures.background,
          sourceX, 0, sourceWidth, textureHeight,
          destX, bgY, bgWidth, bgHeight
        );
      } else {
        //wraps around texture - draw in two parts
        const part1SrcWidth = textureWidth - sourceX;
        const part2SrcWidth = sourceWidth - part1SrcWidth;
        const part1DestWidth = part1SrcWidth / 2;
        const part2DestWidth = part2SrcWidth / 2;
        
        //first part (end of texture)
        ctx.drawImage(
          textures.background,
          sourceX, 0, part1SrcWidth, textureHeight,
          destX, bgY, part1DestWidth, bgHeight
        );
        //second part (start of texture, wrapped)
        ctx.drawImage(
          textures.background,
          0, 0, part2SrcWidth, textureHeight,
          destX + part1DestWidth, bgY, part2DestWidth, bgHeight
        );
      }
    }
    
    ctx.restore();
  }
  
  //apply camera offset
  ctx.translate(-camera.x, -camera.y);

  //draw surfaces with textures
  if (texturesLoaded) {
    for (const s of surfaces) {
      if (s.type === "solid" && patterns.stone) {
        //solid surfaces: use world coordinates, repeat every 64 pixels
        const pattern = ctx.createPattern(patterns.stone, 'repeat');
        ctx.save();
        ctx.fillStyle = pattern;
        ctx.fillRect(s.x, s.y, s.width, s.height);
        ctx.restore();
      } else if (s.type === "ground" && patterns.dirt) {
        //ground: use world coordinates, repeat every 64 pixels
        const pattern = ctx.createPattern(patterns.dirt, 'repeat');
        ctx.save();
        ctx.fillStyle = pattern;
        ctx.fillRect(s.x, s.y, s.width, s.height);
        ctx.restore();
      } else if (s.type === "platform" && patterns.platform) {
        //platforms: repeat every 30 pixels in length, height 15 matches texture
        const pattern = ctx.createPattern(patterns.platform, 'repeat');
        ctx.save();
        ctx.fillStyle = pattern;
        ctx.fillRect(s.x, s.y, s.width, s.height);
        ctx.restore();
      } else {
        //fallback to color if texture not loaded
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.width, s.height);
      }
    }
  } else {
    //fallback: draw surfaces with colors if textures not loaded
    for (const s of surfaces) {
      ctx.fillStyle = s.color;
      ctx.fillRect(s.x, s.y, s.width, s.height);
    }
  }

    //draw tutorial text
    if (typeof tutorialTexts !== 'undefined' && Array.isArray(tutorialTexts)) {
      for (const textObj of tutorialTexts) {
        ctx.font = textObj.fontSize || "14px Arial";
        ctx.fillStyle = textObj.color || "white";
        ctx.textAlign = textObj.align || "center";
        ctx.strokeStyle = textObj.strokeColor || "black";
        ctx.lineWidth = textObj.strokeWidth !== undefined ? textObj.strokeWidth : 2;
        
        const x = textObj.x || 0;
        const y = textObj.y || 0;
        const text = textObj.text || "";
        
        if (ctx.lineWidth > 0) {
          ctx.strokeText(text, x, y);
        }
        ctx.fillText(text, x, y);
      }
    }

  //draw signs (cosmetic objects)
  if (texturesLoaded && typeof signs !== 'undefined' && signs) {
    for (const sign of signs) {
      let texture = null;
      if (sign.type === "right" && textures.signRight) texture = textures.signRight;
      else if (sign.type === "left" && textures.signLeft) texture = textures.signLeft;
      else if (sign.type === "up" && textures.signUp) texture = textures.signUp;
      else if (sign.type === "down" && textures.signDown) texture = textures.signDown;
      
      if (texture) {
        ctx.drawImage(texture, sign.x, sign.y, sign.width, sign.height);
      } else {
        //fallback to color
        ctx.fillStyle = sign.color || "brown";
        ctx.fillRect(sign.x, sign.y, sign.width, sign.height);
      }
    }
  }

  //draw enemies with texture
  if (typeof enemies !== 'undefined' && enemies) {
    for (const enemy of enemies) {
      //check if this enemy is respawning (in defeatedEnemies map but before respawnTime)
      let enemyAlpha = 1.0;
      let isRespawning = false;
      if (initialEnemies && typeof defeatedEnemies !== 'undefined') {
        const currentTime = Date.now();
        for (const [enemyKey, data] of defeatedEnemies.entries()) {
          //check if this is the same enemy by position
          if (Math.abs(data.enemy.x - enemy.x) < 1 &&
              Math.abs(data.enemy.y - enemy.y) < 1 &&
              data.enemy.width === enemy.width &&
              data.enemy.height === enemy.height &&
              currentTime < data.respawnTime) {
            //this enemy is respawning, calculate fade-in opacity (0% to 100% over 6 seconds)
            //use paused time if paused
            const elapsed = isPaused && lastPauseTime !== null
              ? (lastPauseTime - data.respawnStartTime)
              : (currentTime - data.respawnStartTime);
            const totalTime = data.respawnTime - data.respawnStartTime; // 6000ms
            const progress = Math.min(elapsed / totalTime, 1.0); // 0.0 to 1.0
            enemyAlpha = progress; // 0.0 (0%) to 1.0 (100%)
            isRespawning = true;
            break;
          }
        }
      }
      
      ctx.save();
      ctx.globalAlpha = enemyAlpha;
      if (texturesLoaded && textures.enemy) {
        ctx.drawImage(textures.enemy, enemy.x, enemy.y, enemy.width, enemy.height);
      } else {
        ctx.fillStyle = enemy.color || "orange";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      }
      ctx.restore();
    }
  }

  //draw spikes with texture
  if (typeof spikes !== 'undefined' && spikes) {
    for (const spike of spikes) {
      if (texturesLoaded && textures.spike) {
        ctx.drawImage(textures.spike, spike.x, spike.y, spike.width, spike.height);
      } else {
        ctx.fillStyle = spike.color || "gray";
        ctx.beginPath();
        ctx.moveTo(spike.x + spike.width / 2, spike.y);
        ctx.lineTo(spike.x, spike.y + spike.height);
        ctx.lineTo(spike.x + spike.width, spike.y + spike.height);
        ctx.closePath();
        ctx.fill();
      }
      
      //spike hitbox visualization (for testing)
      /*
      const spikeHitboxes = generateSpikeHitboxes(spike);
      ctx.save();
      ctx.fillStyle = "rgb(255, 0, 0)"; //semi-transparent red fill
      for (const hitbox of spikeHitboxes) {
        ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
        ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
      }
      ctx.restore();
      */
      
    }
  }

  //draw goal with texture
  if (typeof goal !== 'undefined') {
    if (texturesLoaded && textures.goal) {
      ctx.drawImage(textures.goal, goal.x, goal.y, goal.width, goal.height);
      
      //draw glow overlay with pulsing animation (0% to 20% opacity over 1 second)
      if (textures.goalGlow) {
        const currentTime = Date.now();
        const glowCycle = (currentTime % 2500) / 2500;
        const glowAlpha = Math.sin(glowCycle * Math.PI) * 0.5;
        
        ctx.save();
        ctx.globalAlpha = glowAlpha;
        ctx.drawImage(textures.goalGlow, goal.x, goal.y, goal.width, goal.height);
        ctx.restore();
      }
    } else {
      ctx.fillStyle = goal.color;
      ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    }
  }
  
  //draw player glow first (behind player but above other objects)
  //use dark glow on level 13, regular glow otherwise
  const glowTexture = (currentLevelNum === 13 && texturesLoaded && textures.darkGlow) 
    ? textures.darkGlow 
    : textures.glow;
  if (texturesLoaded && glowTexture) {
    const glowSize = 1200;
    const glowX = player.x + player.width / 2 - glowSize / 2;
    const glowY = player.y + player.height / 2 - glowSize / 2;
    ctx.drawImage(glowTexture, glowX, glowY, glowSize, glowSize);
  }

  //draw player with texture
  const currentTime = Date.now();
  let playerAlpha = 1.0;
  
  //death animation: fade from 100% to 0% over 1 second (pause-aware)
  if (isDying && deathAnimationStart !== null) {
    const elapsed = isPaused && pausedDeathAnimationStart !== null 
      ? pausedDeathAnimationStart 
      : currentTime - deathAnimationStart;
    playerAlpha = Math.max(0, 1.0 - (elapsed / 1000));
  } else if (currentTime < invulnerableUntil) {
    //invulnerability flash (pause-aware)
    const timeSinceHit = isPaused && pausedInvulnerableUntil !== null
      ? (1200 - pausedInvulnerableUntil)
      : (currentTime - (invulnerableUntil - 1200));
    const flashCycle = Math.floor(timeSinceHit / 100);
    playerAlpha = (flashCycle % 2 === 0) ? 0.3 : 1.0;
  }
  
  ctx.globalAlpha = playerAlpha;
  if (texturesLoaded && textures.player) {
    //show player hitbox (for testing)
    //ctx.fillStyle = player.color;
    //ctx.fillRect(player.x, player.y, player.width, player.height);

    //draw player texture at fixed 40x40, bottom-aligned and horizontally centered on the player hitbox
    const TEX_SIZE = 40;
    const texX = player.x + (player.width - TEX_SIZE) / 2;
    const texY = (player.y + (player.height - TEX_SIZE)) + 1;
    ctx.drawImage(textures.player, texX, texY, TEX_SIZE, TEX_SIZE);
  } else {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
  ctx.globalAlpha = 1.0; //reset alpha

  ctx.restore();
  
  //draw UI elements on top
  ctx.save();
  
  //draw health texture (top left, 20px gap from top and left)
  if (texturesLoaded) {
    let healthTexture = null;
    if (playerHealth === 3 && textures.health3) healthTexture = textures.health3;
    else if (playerHealth === 2 && textures.health2) healthTexture = textures.health2;
    else if (playerHealth === 1 && textures.health1) healthTexture = textures.health1;
    else if (playerHealth === 0 && textures.health0) healthTexture = textures.health0;
    
    if (healthTexture) {
      //use smaller health texture on smaller viewports
      const healthWidth = (window.innerWidth < 1200 || window.innerHeight < 800) ? 250 : 333;
      const healthHeight = (window.innerWidth < 1200 || window.innerHeight < 800) ? 90 : 120;
      ctx.drawImage(healthTexture, 20, 20, healthWidth, healthHeight);
    } else {
      //fallback to text
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`Health: ${playerHealth}/3`, 10, 30);
    }
  } else {
    //fallback to text if textures not loaded
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Health: ${playerHealth}/3`, 10, 30);
  }
  
  //update timer HTML element (top center)
  if (levelStartTime !== null && levelTimer) {
    const currentTime = Date.now();
    let elapsedTime = currentTime - levelStartTime;
    
    if (isPaused && lastPauseTime !== null) {
      elapsedTime -= (currentTime - lastPauseTime);
    }
    
    const formattedTime = formatTime(elapsedTime);
    levelTimer.textContent = formattedTime;
  }
  
  ctx.restore();
}

//game loop
let animationFrameId = null;
function gameLoop() {
  if (!isGameRunning) return;
  
  //calculate delta time (normalized to 60fps)
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastFrameTime) / FRAME_TIME;
  lastFrameTime = currentTime;
  
  //clamp delta time to prevent large jumps (e.g., when tab regains focus)
  const dt = Math.min(deltaTime, 2.0); //cap at 2x speed to prevent huge jumps
  
  if (!isPaused) {
    update(dt);
  }
  draw();
  animationFrameId = requestAnimationFrame(gameLoop);
}

//stop game loop
function stopGameLoop() {
  isGameRunning = false;
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

//level loading function
function loadLevel(levelNumber) {
  //stop any running game loop
  stopGameLoop();
  
  //store current level number
  currentLevelNum = parseInt(levelNumber);
  
  //remove previously loaded level script if it exists
  if (loadedLevelScript) {
    loadedLevelScript.remove();
    loadedLevelScript = null;
  }
  
  //hide menu and show canvas, timer, and pause button
  menu.style.display = "none";
  canvas.style.display = "block";
  if (levelTimer) levelTimer.style.display = "block";
  pauseButton.style.display = "block";
  
  //reset pause state
  isPaused = false;
  pauseOverlay.style.display = "none";
  levelCompleteOverlay.style.display = "none";
  
  //reset level complete flag
  isLevelComplete = false;
  
  //reset time tracking
  levelStartTime = Date.now();
  lastPauseTime = null;
  
  //dynamically load the level file with cache busting
  const script = document.createElement("script");
  script.src = `level${levelNumber}.js?t=${Date.now()}`;
  script.onload = () => {
    //initialize enemies, spikes, and signs arrays if they don't exist
    if (typeof enemies === 'undefined') {
      window.enemies = [];
    }
    if (typeof spikes === 'undefined') {
      window.spikes = [];
    }
    if (typeof signs === 'undefined') {
      window.signs = [];
    }
    //store initial state of enemies and spikes for reset
    if (enemies && Array.isArray(enemies)) {
      initialEnemies = enemies.map(e => ({...e}));
    } else {
      initialEnemies = [];
    }
    if (spikes && Array.isArray(spikes)) {
      initialSpikes = spikes.map(s => ({...s}));
    } else {
      initialSpikes = [];
    }
    //clear defeated enemies when loading new level
    defeatedEnemies.clear();
    isDying = false;
    deathAnimationStart = null;
    //reset player state
    player.x = START_X;
    player.y = START_Y;
    player.velocityX = 0;
    player.velocityY = 0;
    player.jumping = false;
    playerHealth = 3;
    lastDamageTime = 0;
    //set flag and start game loop after level is loaded
    isGameRunning = true;
    //reset frame time when starting game loop
    lastFrameTime = performance.now();
    gameLoop();
  };
  loadedLevelScript = script; //track this script for cleanup
  document.body.appendChild(script);
}

const LEVELS_PER_PAGE = 6; //6
const TOTAL_LEVELS = 13; //change this to add more levels (must match highest level{number}.js file)
let currentLevelPage = 2; //0
const levelButtonContainer = document.getElementById("levelButtonContainer");
const levelNavLeft = document.getElementById("levelNavLeft");
const levelNavRight = document.getElementById("levelNavRight");

//generate level buttons
function generateLevelButtons() {
  levelButtonContainer.innerHTML = '';
  
  const startLevel = currentLevelPage * LEVELS_PER_PAGE + 1;
  const endLevel = Math.min(startLevel + LEVELS_PER_PAGE - 1, TOTAL_LEVELS);
  
  for (let i = startLevel; i <= endLevel; i++) {
    const button = document.createElement('button');
    button.className = 'level-button';
    button.setAttribute('data-level', i);
    button.textContent = i;
    //add hover sound (click sound will be added only for unlocked buttons in refreshLevelButtons)
    button.addEventListener('mouseenter', () => {
      //only play hover sound if button is not locked
      if (!button.classList.contains('locked')) {
        playMenuSound('hover');
      }
    });
    //note: click sound is added in refreshLevelButtons for unlocked buttons only
    button.addEventListener("click", () => {
      //play click sound only if button is unlocked (check happens after refreshLevelButtons)
      if (!button.classList.contains('locked')) {
        playMenuSound('click');
      }
      const levelNumber = button.getAttribute("data-level");
      loadLevel(levelNumber);
    });
    levelButtonContainer.appendChild(button);
  }
  
  //update navigation arrows
  const totalPages = Math.ceil(TOTAL_LEVELS / LEVELS_PER_PAGE);
  if (levelNavLeft) levelNavLeft.disabled = currentLevelPage === 0;
  if (levelNavRight) levelNavRight.disabled = currentLevelPage >= totalPages - 1;
}

//navigation handlers
if (levelNavLeft) {
  addButtonSounds(levelNavLeft);
  levelNavLeft.addEventListener("click", () => {
    if (currentLevelPage > 0) {
      currentLevelPage--;
      generateLevelButtons();
      refreshLevelButtons();
    }
  });
}

if (levelNavRight) {
  addButtonSounds(levelNavRight);
  levelNavRight.addEventListener("click", () => {
    const totalPages = Math.ceil(TOTAL_LEVELS / LEVELS_PER_PAGE);
    if (currentLevelPage < totalPages - 1) {
      currentLevelPage++;
      generateLevelButtons();
      refreshLevelButtons();
    }
  });
}

//initialize level buttons
generateLevelButtons();

//get level select buttons (now dynamically generated)
function getLevelButtons() {
  return document.querySelectorAll(".level-button");
}

//fetch level statuses and update buttons (uses enhanced function from game_auth.js)
async function refreshLevelButtons() {
  const levelButtons = getLevelButtons();
  
  //use the enhanced function that handles both guest and authenticated modes
  if (typeof refreshLevelButtonsEnhanced === 'function') {
    await refreshLevelButtonsEnhanced();
  } else {
    //fallback if game_auth.js isn't loaded
    try {
      const response = await fetch(`${API_BASE_URL}/levels`);
      if (response.ok) {
        const levels = await response.json();
        
        //update each button based on unlock status
        levelButtons.forEach(button => {
          const levelNum = parseInt(button.getAttribute("data-level"));
          const level = levels.find(l => l.levelId === levelNum);
          
          if (level && level.unlocked) {
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
    } catch (error) {
      console.error('Error fetching level statuses:', error);
      //on error, unlock level 1 by default
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
  }
}

//reset progress function (uses enhanced function from game_auth.js)
async function resetProgress() {
  //use the enhanced function that handles both guest and authenticated modes
  if (typeof resetProgressEnhanced === 'function') {
    await resetProgressEnhanced();
  } else {
    //fallback if game_auth.js isn't loaded
    try {
      //lock levels 2 and 3
      const response2 = await fetch(`${API_BASE_URL}/levels/2`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unlocked: false })
      });
      
      const response3 = await fetch(`${API_BASE_URL}/levels/3`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unlocked: false })
      });
      
      if (response2.ok && response3.ok) {
        console.log('Progress reset successfully');
        refreshLevelButtons();
      } else {
        console.error('Failed to reset progress');
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  }
}

//set up reset button
const resetButton = document.getElementById("resetProgressButton");
if (resetButton) {
  resetButton.addEventListener("click", resetProgress);
}

//initialize button states on page load
refreshLevelButtons();

//settings button event listener
const settingsButton = document.getElementById("settingsButton");
const settingsOverlay = document.getElementById("settingsOverlay");
const settingsClose = document.getElementById("settingsClose");
const exitSettings = document.getElementById("exitSettings");
const tutorialSettings = document.getElementById("tutorialSettings");
const creditSettings = document.getElementById("creditSettings");

if (settingsButton) {
  addButtonSounds(settingsButton);
  settingsButton.addEventListener("click", () => {
    settingsOverlay.classList.add("active");
  });
}

if (settingsClose) {
  addButtonSounds(settingsClose);
  settingsClose.addEventListener("click", () => {
    settingsOverlay.classList.remove("active");
  });
}

if (exitSettings) {
  addButtonSounds(exitSettings);
  exitSettings.addEventListener("click", () => {
    //clear session and redirect to index.html
    window.location.href = 'index.html';
  });
}

if (tutorialSettings) {
  addButtonSounds(tutorialSettings);
  tutorialSettings.addEventListener("click", () => {
    settingsOverlay.classList.remove("active");
    loadLevel(0);
  });
}

if (creditSettings) {
  addButtonSounds(creditSettings);
  creditSettings.addEventListener("click", () => {
    //redirect to credits.html
    window.location.href = 'credits.html';
  });
}

//sound system
//volume controls (0-10, where 10 = 100%, each unit = 10%)
let gameSoundVolume = 5; //50% default
let menuSoundVolume = 5; //50% default

//sound audio objects
const sounds = {
  //game sounds
  enemyDeath: new Audio('sounds/enemy_death_sound.mp3'),
  hit: new Audio('sounds/hit_sound.wav'),
  death: new Audio('sounds/death_sound.mp3'),
  jump: new Audio('sounds/jump_sound.mp3'),
  levelBeat1: new Audio('sounds/level_beat_1_sound.mp3'),
  levelBeat2: new Audio('sounds/level_beat_2_sound.mp3'),
  pause: new Audio('sounds/pause_sound.ogg'),
  //menu sounds
  hover: new Audio('sounds/hover_sound.mp3'),
  click: new Audio('sounds/click_sound.mp3')
};

//preload sounds
Object.values(sounds).forEach(sound => {
  sound.preload = 'auto';
  sound.volume = 0.5; //default volume (will be adjusted by volume controls)
});

//enable audio on first user interaction (fixes browser autoplay policy)
let audioContextEnabled = false;
function enableAudioContext() {
  if (!audioContextEnabled) {
    //play a silent sound to enable audio context
    const silentSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
    silentSound.volume = 0.01;
    silentSound.play().catch(() => {});
    audioContextEnabled = true;
  }
}

//enable audio on any user interaction
document.addEventListener('mousedown', enableAudioContext, { once: true });
document.addEventListener('keydown', enableAudioContext, { once: true });
document.addEventListener('touchstart', enableAudioContext, { once: true });

//play game sound with volume control
function playGameSound(soundName) {
  enableAudioContext(); //ensure audio context is enabled
  const sound = sounds[soundName];
  if (sound) {
    sound.volume = gameSoundVolume / 10; //convert 0-10 to 0.0-1.0
    sound.currentTime = 0; //reset to start
    sound.play().catch(err => console.error(`Error playing ${soundName}:`, err));
  }
}

//play menu sound with volume control
function playMenuSound(soundName) {
  enableAudioContext(); //ensure audio context is enabled
  const sound = sounds[soundName];
  if (sound) {
    sound.volume = menuSoundVolume / 10; //convert 0-10 to 0.0-1.0
    sound.currentTime = 0; //reset to start
    sound.play().catch(err => console.error(`Error playing ${soundName}:`, err));
  }
}

//helper function to add hover and click sounds to buttons
function addButtonSounds(element) {
  if (!element) return;
  element.addEventListener('mouseenter', () => playMenuSound('hover'));
  element.addEventListener('click', () => playMenuSound('click'));
}

//update volume display
function updateVolumeDisplay(volumeType, volume) {
  //update settings menu volume bars
  const settingsMenu = document.getElementById("settingsMenu");
  if (settingsMenu) {
    const settingsBars = settingsMenu.querySelectorAll(`.volume-control`);
    settingsBars.forEach((bar, barIndex) => {
      const isGameSound = barIndex === 0 && volumeType === 'gameSound';
      const isMenuSound = barIndex === 1 && volumeType === 'menuSound';
      
      if (isGameSound || isMenuSound) {
        const squares = bar.querySelectorAll('.volume-square');
        squares.forEach((square, index) => {
          if (index < volume) {
            square.classList.remove('empty');
            square.classList.add('filled');
          } else {
            square.classList.remove('filled');
            square.classList.add('empty');
          }
        });
      }
    });
  }
  
  //update pause menu volume bars
  const pauseMenu = document.getElementById("pauseMenu");
  if (pauseMenu) {
    const pauseBars = pauseMenu.querySelectorAll(`.pause-volume-control`);
    pauseBars.forEach((bar, barIndex) => {
      const isGameSound = barIndex === 0 && volumeType === 'gameSound';
      const isMenuSound = barIndex === 1 && volumeType === 'menuSound';
      
      if (isGameSound || isMenuSound) {
        const squares = bar.querySelectorAll('.pause-volume-square');
        squares.forEach((square, index) => {
          if (index < volume) {
            square.classList.remove('empty');
            square.classList.add('filled');
          } else {
            square.classList.remove('filled');
            square.classList.add('empty');
          }
        });
      }
    });
  }
}

//initialize volume displays
updateVolumeDisplay('gameSound', gameSoundVolume);
updateVolumeDisplay('menuSound', menuSoundVolume);

//settings menu volume controls
const musicPlus = document.getElementById("musicPlus");
const musicMinus = document.getElementById("musicMinus");
const soundPlus = document.getElementById("soundPlus");
const soundMinus = document.getElementById("soundMinus");

if (musicPlus) {
  musicPlus.addEventListener("click", () => {
    playMenuSound('click');
    if (gameSoundVolume < 10) {
      gameSoundVolume++;
      updateVolumeDisplay('gameSound', gameSoundVolume);
    }
  });
}

if (musicMinus) {
  musicMinus.addEventListener("click", () => {
    playMenuSound('click');
    if (gameSoundVolume > 0) {
      gameSoundVolume--;
      updateVolumeDisplay('gameSound', gameSoundVolume);
    }
  });
}

if (soundPlus) {
  soundPlus.addEventListener("click", () => {
    playMenuSound('click');
    if (menuSoundVolume < 10) {
      menuSoundVolume++;
      updateVolumeDisplay('menuSound', menuSoundVolume);
    }
  });
}

if (soundMinus) {
  soundMinus.addEventListener("click", () => {
    playMenuSound('click');
    if (menuSoundVolume > 0) {
      menuSoundVolume--;
      updateVolumeDisplay('menuSound', menuSoundVolume);
    }
  });
}

//pause menu volume controls
const pauseMusicPlus = document.getElementById("pauseMusicPlus");
const pauseMusicMinus = document.getElementById("pauseMusicMinus");
const pauseSoundPlus = document.getElementById("pauseSoundPlus");
const pauseSoundMinus = document.getElementById("pauseSoundMinus");

if (pauseMusicPlus) {
  pauseMusicPlus.addEventListener("click", () => {
    playMenuSound('click');
    if (gameSoundVolume < 10) {
      gameSoundVolume++;
      updateVolumeDisplay('gameSound', gameSoundVolume);
    }
  });
}

if (pauseMusicMinus) {
  pauseMusicMinus.addEventListener("click", () => {
    playMenuSound('click');
    if (gameSoundVolume > 0) {
      gameSoundVolume--;
      updateVolumeDisplay('gameSound', gameSoundVolume);
    }
  });
}

if (pauseSoundPlus) {
  pauseSoundPlus.addEventListener("click", () => {
    playMenuSound('click');
    if (menuSoundVolume < 10) {
      menuSoundVolume++;
      updateVolumeDisplay('menuSound', menuSoundVolume);
    }
  });
}

if (pauseSoundMinus) {
  pauseSoundMinus.addEventListener("click", () => {
    playMenuSound('click');
    if (menuSoundVolume > 0) {
      menuSoundVolume--;
      updateVolumeDisplay('menuSound', menuSoundVolume);
    }
  });
}

//pause button event listener
if (pauseButton) {
  pauseButton.addEventListener("click", () => {
    if (isGameRunning && !isPaused) {
      pauseGame();
    }
  });
}

//pause menu option event listeners
const resumeOption = document.getElementById("resumeOption");
if (resumeOption) {
  addButtonSounds(resumeOption);
  resumeOption.addEventListener("click", () => {
    resumeGame();
  });
}

const restartOption = document.getElementById("restartOption");
if (restartOption) {
  addButtonSounds(restartOption);
  restartOption.addEventListener("click", () => {
    restartLevel();
  });
}

const exitOption = document.getElementById("exitOption");
if (exitOption) {
  addButtonSounds(exitOption);
  exitOption.addEventListener("click", () => {
    returnToMenu();
  });
}

//level complete menu option event listeners
const nextLevelOption = document.getElementById("nextLevelOption");
if (nextLevelOption) {
  addButtonSounds(nextLevelOption);
  nextLevelOption.addEventListener("click", () => {
    goToNextLevel();
  });
}

const mainMenuOption = document.getElementById("mainMenuOption");
if (mainMenuOption) {
  addButtonSounds(mainMenuOption);
  mainMenuOption.addEventListener("click", () => {
    returnToMenu();
  });
}

//share results function
async function shareResults() {
  if (!lastCompletionData) {
    alert("No completion data to share.");
    return;
  }

  //get username from window.currentUsername (set by game_auth.js)
  //if not set (guest mode), use "Your friend"
  const username = window.currentUsername || "Your friend";

  try {
    //create share record in database
    const response = await fetch(`${SHARE_API_BASE_URL}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        levelNum: lastCompletionData.levelNum,
        time: lastCompletionData.time,
        health: lastCompletionData.health,
        username: username
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create share link');
    }

    const data = await response.json();
    const shareId = data.shareId;
    
    //create the share URL - use origin and append /Sprung-Block/share_results.html
    const shareUrl = `${window.location.origin}/Sprung-Block/share_results.html?id=${shareId}`;
    
    //copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (clipboardError) {
      //fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Share link copied to clipboard!');
      } catch (err) {
        //if copy fails show the URL in an alert
        prompt('Copy this link:', shareUrl);
      }
      document.body.removeChild(textArea);
    }
  } catch (error) {
    console.error('Error sharing results:', error);
    alert('Failed to create share link. Please try again.');
  }
}

//share results button event listener
if (shareResultsOption) {
  addButtonSounds(shareResultsOption);
  shareResultsOption.addEventListener("click", () => {
    shareResults();
  });
}

const BADGE_CONFIG = {
  1: { emoji: "🥉", description: "Complete Level 1" },  //easy badges
  2: { emoji: "⏱️", description: "Complete Level 1 In Under 0:06" },
  3: { emoji: "❤️", description: "Complete Level 1 With 3/3 Health" }, 
  4: { emoji: "🥉", description: "Complete Level 2" }, 
  5: { emoji: "⏱️", description: "Complete Level 2 In Under 0:11" },
  6: { emoji: "❤️", description: "Complete Level 2 With 3/3 Health" },
  7: { emoji: "🥉", description: "Complete Level 3" },
  8: { emoji: "⏱️", description: "Complete Level 3 In Under 0:10" }, 
  9: { emoji: "❤️", description: "Complete Level 3 With 3/3 Health" },
  10: { emoji: "🥉", description: "Complete Level 4" },
  11: { emoji: "⏱️", description: "Complete Level 4 In Under 0:20" },
  12: { emoji: "❤️", description: "Complete Level 4 With 3/3 Health" },
  13: { emoji: "🥈", description: "Complete Level 5" },  //medium badges
  14: { emoji: "⌛", description: "Complete Level 5 In Under 0:30" },
  15: { emoji: "💖", description: "Complete Level 5 With 3/3 Health" },
  16: { emoji: "🥈", description: "Complete Level 6" },
  17: { emoji: "⌛", description: "Complete Level 6 In Under 0:30" },
  18: { emoji: "💖", description: "Complete Level 6 With 3/3 Health" },
  19: { emoji: "🥈", description: "Complete Level 7" },
  20: { emoji: "⌛", description: "Complete Level 7 In Under 0:40" },
  21: { emoji: "💖", description: "Complete Level 7 With 3/3 Health" },
  22: { emoji: "🥈", description: "Complete Level 8" },
  23: { emoji: "⌛", description: "Complete Level 8 In Under 0:45" },
  24: { emoji: "💖", description: "Complete Level 8 With 3/3 Health" },
  25: { emoji: "🥇", description: "Complete Level 9" }, //hard badges
  26: { emoji: "🕔", description: "Complete Level 9 In Under 1:15" },
  27: { emoji: "❤️‍🔥", description: "Complete Level 9 With 3/3 Health" },
  28: { emoji: "🥇", description: "Complete Level 10" },
  29: { emoji: "🕔", description: "Complete Level 10 In Under 1:50" },
  30: { emoji: "❤️‍🔥", description: "Complete Level 10 With 3/3 Health" },
  31: { emoji: "🥇", description: "Complete Level 11" }, 
  32: { emoji: "🕔", description: "Complete Level 11 In Under 1:30" },
  33: { emoji: "❤️‍🔥", description: "Complete Level 11 With 3/3 Health" },
  34: { emoji: "🥇", description: "Complete Level 12" },
  35: { emoji: "🕔", description: "Complete Level 12 In Under 2:10" },
  36: { emoji: "❤️‍🔥", description: "Complete Level 12 With 3/3 Health" },
  37: { emoji: "🏅", description: "Complete All Levels" }, //completion badges
  38: { emoji: "🕰️", description: "Complete All Level Time Challenges" },
  39: { emoji: "💛", description: "Complete All Level Health Challenges" },
  40: { emoji: "💀", description: "Beat Level 13" },  //impossible badge
};

//fetch all badges from API (uses enhanced function from game_auth.js)
async function fetchBadges() {
  //use the fecth badges function that handles both guest and authenticated modes
  if (typeof fetchBadgesEnhanced === 'function') {
    return await fetchBadgesEnhanced();
  } else {
    //fallback if game_auth.js isn't loaded
    try {
      const response = await fetch(`${BADGE_API_BASE_URL}/badges`);
      if (response.ok) {
        const badges = await response.json();
        //sort by badgeId
        return badges.sort((a, b) => a.badgeId - b.badgeId);
      } else {
        console.error('Failed to fetch badges');
        return [];
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
      return [];
    }
  }
}

const BADGES_PER_PAGE = 12;
let currentBadgePage = 0;
const badgeNavLeft = document.getElementById("badgeNavLeft");
const badgeNavRight = document.getElementById("badgeNavRight");

//display badges in the grid with pagination
async function displayBadges() {
  const badges = await fetchBadges();
  badgeGrid.innerHTML = '';
  
  //create a map of unlocked badges from API for quick lookup
  const badgeMap = {};
  badges.forEach(b => badgeMap[b.badgeId] = b);
  
  //create array of all badges from BADGE_CONFIG, with unlock status from API
  const allBadges = [];
  //iterate through badge IDs in numerical order
  const badgeIds = Object.keys(BADGE_CONFIG).map(Number).sort((a, b) => a - b);
  badgeIds.forEach(badgeId => {
    const config = BADGE_CONFIG[badgeId];
    allBadges.push({
      badgeId: badgeId,
      unlocked: badgeMap[badgeId]?.unlocked || false,
      emoji: config.emoji || "?",
      description: config.description || ""
    });
  });
  
  const startIndex = currentBadgePage * BADGES_PER_PAGE;
  const endIndex = Math.min(startIndex + BADGES_PER_PAGE, allBadges.length);
  const badgesToShow = allBadges.slice(startIndex, endIndex);
  
  badgesToShow.forEach(badge => {
    const badgeElement = document.createElement('div');
    badgeElement.className = `badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`;
    
    badgeElement.innerHTML = `
      <div class="badge-emoji">${badge.emoji}</div>
      <div class="badge-text">${badge.description}</div>
    `;
    
    badgeGrid.appendChild(badgeElement);
  });
  
  //update navigation arrows
  const totalPages = Math.ceil(allBadges.length / BADGES_PER_PAGE);
  if (badgeNavLeft) badgeNavLeft.disabled = currentBadgePage === 0;
  if (badgeNavRight) badgeNavRight.disabled = currentBadgePage >= totalPages - 1;
}

//badge navigation handlers
if (badgeNavLeft) {
  addButtonSounds(badgeNavLeft);
  badgeNavLeft.addEventListener("click", () => {
    if (currentBadgePage > 0) {
      currentBadgePage--;
      displayBadges();
    }
  });
}

if (badgeNavRight) {
  addButtonSounds(badgeNavRight);
  badgeNavRight.addEventListener("click", async () => {
    //calculate total pages based on actual badges in BADGE_CONFIG
    const badgeCount = Object.keys(BADGE_CONFIG).length;
    const totalPages = Math.ceil(badgeCount / BADGES_PER_PAGE);
    if (currentBadgePage < totalPages - 1) {
      currentBadgePage++;
      await displayBadges();
    }
  });
}

//show badge page
function showBadgePage() {
  badgeOverlay.style.display = "flex";
  displayBadges();
}

//hide badge page
function hideBadgePage() {
  badgeOverlay.style.display = "none";
}

//badge button event listener
if (badgeButton) {
  addButtonSounds(badgeButton);
  badgeButton.addEventListener("click", () => {
    showBadgePage();
  });
}

//badge exit button event listener
if (badgeExitButton) {
  addButtonSounds(badgeExitButton);
  badgeExitButton.addEventListener("click", () => {
    hideBadgePage();
  });
}

//add menu sounds to links in feedback page
document.addEventListener('DOMContentLoaded', () => {
  const feedbackFormLink = document.querySelector('#feedbackPage a[href="feedback_form.html"]');
  const emailLink = document.querySelector('#feedbackPage a[href^="mailto:"]');
  
  if (feedbackFormLink) {
    feedbackFormLink.addEventListener('mouseenter', () => playMenuSound('hover'));
    feedbackFormLink.addEventListener('click', () => playMenuSound('click'));
  }
  
  if (emailLink) {
    emailLink.addEventListener('mouseenter', () => playMenuSound('hover'));
    emailLink.addEventListener('click', () => playMenuSound('click'));
  }
});

//unlock a badge by badgeId (uses enhanced function from game_auth.js)
async function unlockBadge(badgeId) {
  //use the enhanced function that handles both guest and authenticated modes
  if (typeof unlockBadgeEnhanced === 'function') {
    return await unlockBadgeEnhanced(badgeId);
  } else {
    //fallback if game_auth.js isn't loaded
    try {
      const response = await fetch(`${BADGE_API_BASE_URL}/badges/${badgeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unlocked: true })
      });
      
      if (response.ok) {
        console.log(`Badge ${badgeId} unlocked!`);
        return true;
      } else {
        console.error(`Failed to unlock badge ${badgeId}`);
        return false;
      }
    } catch (error) {
      console.error(`Error unlocking badge ${badgeId}:`, error);
      return false;
    }
  }
}

//check and unlock badges based on level completion
async function checkAndUnlockBadges(levelNum, completionTime, completionHealth) {
  const timeInSeconds = completionTime / 1000;
  
  //level-specific badges
  if (levelNum === 1) {
    await unlockBadge(1);
    
    if (timeInSeconds < 6) {
      await unlockBadge(2);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(3);
    }
  } else if (levelNum === 2) {
    await unlockBadge(4);
    
    if (timeInSeconds < 11) {
      await unlockBadge(5);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(6);
    }
  } else if (levelNum === 3) {
    await unlockBadge(7);
    
    if (timeInSeconds < 10) {
      await unlockBadge(8);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(9);
    }
  } else if (levelNum === 4) {
    await unlockBadge(10);
    
    if (timeInSeconds < 20) {
      await unlockBadge(11);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(12);
    }
  } else if (levelNum === 5) {
    await unlockBadge(13);
    
    if (timeInSeconds < 30) {
      await unlockBadge(14);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(15);
    }
  } else if (levelNum === 6) {
    await unlockBadge(16);
    
    if (timeInSeconds < 30) {
      await unlockBadge(17);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(18);
    }
  } else if (levelNum === 7) {
    await unlockBadge(19);
    
    if (timeInSeconds < 40) {
      await unlockBadge(20);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(21);
    }
  } else if (levelNum === 8) {
    await unlockBadge(22);
    
    if (timeInSeconds < 45) {
      await unlockBadge(23);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(24);
    }
  } else if (levelNum === 9) {
    await unlockBadge(25);
    
    if (timeInSeconds < 75) {
      await unlockBadge(26);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(27);
    }
  } else if (levelNum === 10) {
    await unlockBadge(28);
    
    if (timeInSeconds < 110) {
      await unlockBadge(29);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(30);
    }
  } else if (levelNum === 11) {
    await unlockBadge(31);
    
    if (timeInSeconds < 90) {
      await unlockBadge(32);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(33);
    }
  } else if (levelNum === 12) {
    await unlockBadge(34);
    
    if (timeInSeconds < 130) {
      await unlockBadge(35);
    }
    
    if (completionHealth === 3) {
      await unlockBadge(36);
    }
  } else if (levelNum === 13) {
    await unlockBadge(40);
  }
  
  //check composite badges (need to fetch current badge status)
  //small delay to ensure all badge unlocks are saved to database
  await new Promise(resolve => setTimeout(resolve, 100));
  const badges = await fetchBadges();
  const badgeMap = {};
  badges.forEach(b => badgeMap[b.badgeId] = b);
  
  //all levels
  if (badgeMap[1]?.unlocked && badgeMap[4]?.unlocked && badgeMap[7]?.unlocked && badgeMap[10]?.unlocked && badgeMap[13]?.unlocked && badgeMap[16]?.unlocked && badgeMap[19]?.unlocked && badgeMap[22]?.unlocked && badgeMap[25]?.unlocked && badgeMap[28]?.unlocked && badgeMap[31]?.unlocked && badgeMap[34]?.unlocked) {
    await unlockBadge(37);
  }
  
  //all time challenges
  if (badgeMap[2]?.unlocked && badgeMap[5]?.unlocked && badgeMap[8]?.unlocked && badgeMap[11]?.unlocked && badgeMap[14]?.unlocked && badgeMap[17]?.unlocked && badgeMap[20]?.unlocked && badgeMap[23]?.unlocked && badgeMap[26]?.unlocked && badgeMap[29]?.unlocked && badgeMap[32]?.unlocked && badgeMap[35]?.unlocked) {
    await unlockBadge(38);
  }
  
  //all health challenges
  if (badgeMap[3]?.unlocked && badgeMap[6]?.unlocked && badgeMap[9]?.unlocked && badgeMap[12]?.unlocked && badgeMap[15]?.unlocked && badgeMap[18]?.unlocked && badgeMap[21]?.unlocked && badgeMap[24]?.unlocked && badgeMap[27]?.unlocked && badgeMap[30]?.unlocked && badgeMap[33]?.unlocked && badgeMap[36]?.unlocked) {
    await unlockBadge(39);
  }
}