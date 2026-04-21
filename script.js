let movementHoldTimer;
let Music = new Audio(audioLibrary.music.title);
let isMuted = localStorage.getItem("gameMuted") === "true";
const keyboardControlReleaseEvents = [
   "pointerup",
   "pointercancel",
   "mouseup",
   "touchend",
   "touchcancel",
];
let lastGameTouchEnd = 0;
Music.loop = true;
Music.volume = 0.5;
Music.muted = isMuted;

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
 * Checks if the game view is currently active.
 * @returns {boolean}
 */
function isGamePlaying() {
   return document.body.classList.contains("is-playing");
}

/**
 * Blocks browser gestures while the game is active.
 * @param {Event} event - Browser gesture event.
 */
function preventGameBrowserGesture(event) {
   if (isGamePlaying()) {
      event.preventDefault();
   }
}

/**
 * Blocks pinch gestures while the game is active.
 * @param {TouchEvent} event - Touch event.
 */
function preventMultiTouchGameGesture(event) {
   if (isGamePlaying() && event.touches?.length > 1) {
      event.preventDefault();
   }
}

/**
 * Blocks Safari double-tap zoom while the game is active.
 * @param {TouchEvent} event - Touch end event.
 */
function preventDoubleTapGameZoom(event) {
   if (!isGamePlaying()) {
      return;
   }

   let now = Date.now();
   if (now - lastGameTouchEnd < 300) {
      event.preventDefault();
   }
   lastGameTouchEnd = now;
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
 * Shows the keyboard controls image while the help button is held.
 * Pauses gameplay and registers global release handlers.
 * @param {PointerEvent} event - Initial button press event.
 */
function showKeyboardControls(event) {
   event?.preventDefault();
   event?.currentTarget?.setPointerCapture?.(event.pointerId);
   document.activeElement?.blur?.();

   let gameContainer = document.getElementById("gameContainer");
   if (!gameContainer || gameContainer.classList.contains("is-showing-controls")) {
      return;
   }

   resetTouchControlStates();
   gameContainer.classList.add("is-showing-controls");
   gameSettings.pauseGame();
   addKeyboardControlReleaseListeners();
}

/**
 * Hides the keyboard controls image and resumes gameplay immediately.
 */
function hideKeyboardControls() {
   let gameContainer = document.getElementById("gameContainer");

   removeKeyboardControlReleaseListeners();
   resetTouchControlStates();
   gameContainer?.classList.remove("is-showing-controls");
   gameSettings.resumeGame();
}

/**
 * Adds release listeners outside the button so mouse and touch exits are handled.
 */
function addKeyboardControlReleaseListeners() {
   keyboardControlReleaseEvents.forEach((eventName) => {
      window.addEventListener(eventName, hideKeyboardControls);
   });
   window.addEventListener("blur", hideKeyboardControls);
}

/**
 * Removes global release listeners for the keyboard controls overlay.
 */
function removeKeyboardControlReleaseListeners() {
   keyboardControlReleaseEvents.forEach((eventName) => {
      window.removeEventListener(eventName, hideKeyboardControls);
   });
   window.removeEventListener("blur", hideKeyboardControls);
}

/**
 * Clears touch-driven key states so controls cannot stay pressed under the overlay.
 */
function resetTouchControlStates() {
   clearTimeout(movementHoldTimer);
   ["LEFT", "RIGHT", "SPACE", "UP", "RUN"].forEach((key) =>
      setControlKey(key, false),
   );
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
   Music = new Audio(audioLibrary.music.ingame);
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
   Music = new Audio(audioLibrary.music.title);
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
   localStorage.setItem("gameMuted", isMuted);
   updateMuteButtons();
}

/**
 * Updates the visual state (icons and labels) of all mute buttons on the page.
 * The icon is derived directly from the persisted 'isMuted' state.
 */
function updateMuteButtons() {
   const buttonState = {
      icon: isMuted ? "🔇" : "♪",
      label: isMuted ? "Unmute" : "Mute",
   };

   const buttons = ["muteButton", "startMuteButton"];
   buttons.forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
         btn.textContent = buttonState.icon;
         btn.setAttribute("aria-label", buttonState.label);
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
   hideKeyboardControls();
   document.getElementById("gameContainer").classList.add("hidden");
   document.body.classList.remove("is-playing");
   updateResponsiveCanvasSize();
}

/**
 * Reveals the main game container.
 */
function showGameContainer() {
   document.getElementById("gameContainer").classList.remove("hidden");
   document.body.classList.add("is-playing");
   updateResponsiveCanvasSize();
}

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", updateMuteButtons);
} else {
   updateMuteButtons();
}

document.addEventListener("contextmenu", preventGameBrowserGesture);
document.addEventListener("selectstart", preventGameBrowserGesture);
document.addEventListener("dragstart", preventGameBrowserGesture);
document.addEventListener("gesturestart", preventGameBrowserGesture);
document.addEventListener("gesturechange", preventGameBrowserGesture);
document.addEventListener("gestureend", preventGameBrowserGesture);
document.addEventListener("touchstart", preventMultiTouchGameGesture, {
   passive: false,
});
document.addEventListener("touchmove", preventMultiTouchGameGesture, {
   passive: false,
});
document.addEventListener("touchend", preventDoubleTapGameZoom, {
   passive: false,
});
