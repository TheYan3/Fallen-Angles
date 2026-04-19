let movementHoldTimer;
let Music = new Audio("audio/World/TitelMusic.mp3");
let isMuted = false;
Music.loop = true;
Music.volume = 0.5;

/**
 * Attempts to play the title music.
 * Due to browser autoplay policies, it attaches a one-time click listener
 * to the document if the initial play request is blocked.
 */
function startMusic() {
   Music.play().catch(() => {
      document.addEventListener(
         "click",
         () => {
            Music.play();
         },
         { once: true },
      );
   });
}

startMusic();

/**
 * Toggles the application between windowed and fullscreen mode.
 * Blurs the active element to prevent unwanted keyboard behavior.
 */
function toggleFullscreen() {
   document.activeElement?.blur?.();

   if (document.fullscreenElement) {
      return document.exitFullscreen();
   }

   getFullscreenTarget().requestFullscreen();
}

/**
 * Returns the DOM element that should be used for fullscreen mode.
 * @returns {HTMLElement} The game container element.
 */
function getFullscreenTarget() {
   return document.getElementById("gameContainer");
}

/**
 * Synchronizes the fullscreen button UI with the current document state.
 * Updates the icon and the ARIA label accordingly.
 */
function updateFullscreenButton() {
   let fullscreenButton = document.getElementById("fullscreenButton");
   if (!fullscreenButton) {
      return;
   }

   let isFullscreen = document.fullscreenElement === getFullscreenTarget();
   updateFullscreenButtonText(fullscreenButton, isFullscreen);
   updateFullscreenButtonLabel(fullscreenButton, isFullscreen);
}

/**
 * Updates the text content of the fullscreen button based on mode.
 * @param {HTMLElement} fullscreenButton - The button element.
 * @param {boolean} isFullscreen - Whether the app is currently in fullscreen.
 */
function updateFullscreenButtonText(fullscreenButton, isFullscreen) {
   fullscreenButton.textContent = isFullscreen ? "↙" : "⛶";
}

/**
 * Updates the ARIA label of the fullscreen button for accessibility.
 * @param {HTMLElement} fullscreenButton - The button element.
 * @param {boolean} isFullscreen - Whether the app is currently in fullscreen.
 */
function updateFullscreenButtonLabel(fullscreenButton, isFullscreen) {
   let label = isFullscreen ? "Exit fullscreen" : "Fullscreen";
   fullscreenButton.setAttribute("aria-label", label);
}

/**
 * Updates the logical state of a key in the keyboard input tracker.
 * @param {string} key - The key identifier (e.g., 'SPACE', 'LEFT').
 * @param {boolean} isPressed - The new state of the key.
 */
function setControlKey(key, isPressed) {
   if (keyboardInput && key in keyboardInput) {
      keyboardInput[key] = isPressed;
   }
}

/**
 * Handles movement controls specifically for touch/pointer events.
 * Implements a delay to trigger 'RUN' state if a direction is held.
 * @param {string} key - The direction key.
 * @param {boolean} isPressed - Whether the control is currently being touched.
 */
function setMovementControl(key, isPressed) {
   setControlKey(key, isPressed);
   clearTimeout(movementHoldTimer);

   if (!isPressed) {
      return stopTouchRun();
   }

   startTouchRun(key);
}

/**
 * Stops the automatic running state during touch controls.
 */
function stopTouchRun() {
   setControlKey("RUN", false);
}

/**
 * Starts a timer to enable the running state if a movement key is held
 * for more than 1 second (simulating a double-tap or long press).
 * @param {string} key - The key to check against.
 */
function startTouchRun(key) {
   movementHoldTimer = setTimeout(() => {
      if (keyboardInput?.[key]) {
         setControlKey("RUN", true);
      }
   }, 1000);
}

/**
 * Initializes the game session by switching music, preparing the UI,
 * and triggering the game restart logic.
 */
function gameStart() {
   startIngameMusic();
   hideStartMenu();
   showGameContainer();
   restartGame();
}

/**
 * Stops title music and starts the main ingame background track.
 * Respects the current global mute setting.
 */
function startIngameMusic() {
   Music.pause();
   Music = new Audio("audio/World/Ingame_Musik.mp3");
   Music.muted = isMuted;
   Music.volume = 0.5;
   Music.play();
}

/**
 * Tears down the game world, exits fullscreen if necessary,
 * and returns the user to the start menu with the title music.
 * Cleans up gameWorld instance to free memory.
 */
function backToMenu() {
   if (gameWorld) {
      gameWorld.destroy();
      gameWorld = null;
   }
   if (document.fullscreenElement) {
      document.exitFullscreen();
   }
   Music.pause();
   Music = new Audio("audio/World/TitelMusic.mp3");
   Music.muted = isMuted;
   Music.volume = 0.5;
   Music.loop = true;
   Music.play();
   hideGameContainer();
   showStartMenu();
}

/**
 * Toggles the global sound state between muted and unmuted.
 * Updates the current active Music object and UI buttons.
 */
function toggleMute() {
   isMuted = !isMuted;
   Music.muted = isMuted;
   updateMuteButtons();
}

/**
 * Updates the visual state (icons and labels) of all mute buttons on the page.
 */
function updateMuteButtons() {
   const icon = isMuted ? "🔇" : "♪";
   const label = isMuted ? "Unmute" : "Mute";
   const buttons = ["muteButton", "startMuteButton"];

   buttons.forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
         btn.textContent = icon;
         btn.setAttribute("aria-label", label);
      }
   });
}

/**
 * Hides the start menu overlay and the separate start-page mute button.
 */
function hideStartMenu() {
   document.getElementById("startMenu").classList.add("hidden");
   document.getElementById("startMuteButton")?.classList.add("hidden");
}

/**
 * Shows the start menu overlay and synchronizes the mute button UI.
 */
function showStartMenu() {
   document.getElementById("startMenu").classList.remove("hidden");
   document.getElementById("startMuteButton")?.classList.remove("hidden");
   updateMuteButtons();
}

/**
 * Plays a one-off sound effect.
 * Immediately returns if the global mute setting is active.
 * @param {string} path - Path to the audio file.
 */
function playEffect(path) {
   if (isMuted) return;
   let audio = new Audio(path);
   audio.volume = 0.5;
   audio.play();
}

/**
 * Hides the main game container (canvas and game UI).
 */
function hideGameContainer() {
   document.getElementById("gameContainer").classList.add("hidden");
}

/**
 * Reveals the main game container.
 */
function showGameContainer() {
   document.getElementById("gameContainer").classList.remove("hidden");
}

document.addEventListener("fullscreenchange", updateFullscreenButton);
