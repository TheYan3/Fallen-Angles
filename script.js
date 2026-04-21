let movementHoldTimer;
let Music = new Audio(audioLibrary.music.title);
let isMuted = localStorage.getItem("gameMuted") === "true";
const mobileLandscapeQuery =
   "(hover: none) and (pointer: coarse) and (orientation: landscape)";
const keyboardControlReleaseEvents = [
   "pointerup",
   "pointercancel",
   "mouseup",
   "touchend",
   "touchcancel",
];
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

/**
 * Fits the canvas into mobile landscape viewports without page scrolling.
 */
function updateResponsiveCanvasSize() {
   let canvasElement = document.getElementById("canvas");
   if (!canvasElement) return;

   if (!shouldFitCanvasToMobileLandscape()) {
      resetCanvasDisplaySize(canvasElement);
      return;
   }

   let size = getCanvasDisplaySize();
   canvasElement.style.width = `${size.width}px`;
   canvasElement.style.height = `${size.height}px`;
}

/**
 * Checks if the mobile landscape canvas sizing should be active.
 * @returns {boolean}
 */
function shouldFitCanvasToMobileLandscape() {
   return (
      document.body.classList.contains("is-playing") &&
      window.matchMedia(mobileLandscapeQuery).matches
   );
}

/**
 * Removes inline canvas display sizing outside mobile landscape mode.
 */
function resetCanvasDisplaySize(canvasElement) {
   canvasElement.style.removeProperty("width");
   canvasElement.style.removeProperty("height");
}

/**
 * Calculates the largest canvas size that fits into the current viewport.
 * @returns {{width: number, height: number}}
 */
function getCanvasDisplaySize() {
   let viewportWidth = window.visualViewport?.width || window.innerWidth;
   let viewportHeight = window.visualViewport?.height || window.innerHeight;
   let padding = 16;
   let availableWidth = Math.max(0, viewportWidth - padding);
   let availableHeight = Math.max(0, viewportHeight - padding);
   let aspectRatio = gameSettings.canvasWidth / gameSettings.canvasHeight;
   let width = Math.min(
      availableWidth,
      availableHeight * aspectRatio,
      gameSettings.canvasWidth,
   );

   return {
      width,
      height: width / aspectRatio,
   };
}

/**
 * Recalculates after the browser has applied viewport/orientation changes.
 */
function queueResponsiveCanvasResize() {
   requestAnimationFrame(updateResponsiveCanvasSize);
   setTimeout(updateResponsiveCanvasSize, 200);
}

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", updateMuteButtons);
} else {
   updateMuteButtons();
}

document.addEventListener("fullscreenchange", updateFullscreenButton);
window.addEventListener("resize", queueResponsiveCanvasResize);
window.addEventListener("orientationchange", queueResponsiveCanvasResize);
window.visualViewport?.addEventListener("resize", queueResponsiveCanvasResize);
