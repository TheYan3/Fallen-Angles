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
 * Updates the fullscreen button icon.
 * @param {HTMLElement} fullscreenButton - Button to update.
 * @param {boolean} isFullscreen - Whether fullscreen is active.
 */
function updateFullscreenButtonText(fullscreenButton, isFullscreen) {
   fullscreenButton.textContent = isFullscreen ? "↙" : "⛶";
}

/**
 * Updates the fullscreen button ARIA label.
 * @param {HTMLElement} fullscreenButton - Button to update.
 * @param {boolean} isFullscreen - Whether fullscreen is active.
 */
function updateFullscreenButtonLabel(fullscreenButton, isFullscreen) {
   let label = isFullscreen ? "Exit fullscreen" : "Fullscreen";
   fullscreenButton.setAttribute("aria-label", label);
}

document.addEventListener("fullscreenchange", updateFullscreenButton);
