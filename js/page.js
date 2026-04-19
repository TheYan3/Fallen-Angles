function toggleFullscreen() {
   document.activeElement?.blur?.();

   if (document.fullscreenElement) {
      return document.exitFullscreen();
   }

   getFullscreenTarget().requestFullscreen();
}

function getFullscreenTarget() {
   return document.getElementById("gameContainer");
}

function updateFullscreenButton() {
   let fullscreenButton = document.getElementById("fullscreenButton");
   if (!fullscreenButton) {
      return;
   }

   let isFullscreen = document.fullscreenElement === getFullscreenTarget();
   updateFullscreenButtonText(fullscreenButton, isFullscreen);
   updateFullscreenButtonLabel(fullscreenButton, isFullscreen);
}

function updateFullscreenButtonText(fullscreenButton, isFullscreen) {
   fullscreenButton.textContent = isFullscreen ? "↙" : "⛶";
}

function updateFullscreenButtonLabel(fullscreenButton, isFullscreen) {
   let label = isFullscreen ? "Exit fullscreen" : "Fullscreen";
   fullscreenButton.setAttribute("aria-label", label);
}

document.addEventListener("fullscreenchange", updateFullscreenButton);

let movementHoldTimer;

function setControlKey(key, isPressed) {
   if (keyboardInput && key in keyboardInput) {
      keyboardInput[key] = isPressed;
   }
}

function setMovementControl(key, isPressed) {
   setControlKey(key, isPressed);
   clearTimeout(movementHoldTimer);

   if (!isPressed) {
      return stopTouchRun();
   }

   startTouchRun(key);
}

function stopTouchRun() {
   setControlKey("RUN", false);
}

function startTouchRun(key) {
   movementHoldTimer = setTimeout(() => {
      if (keyboardInput?.[key]) {
         setControlKey("RUN", true);
      }
   }, 1000);
}

function gameStart() {
   hideStartMenu();
   showGameContainer();
   restartGame();
}

function backToMenu() {
   hideGameContainer();
   showStartMenu();
}

function hideStartMenu() {
   document.getElementById("startMenu").classList.add("hidden");
}

function showStartMenu() {
   document.getElementById("startMenu").classList.remove("hidden");
}

function hideGameContainer() {
   document.getElementById("gameContainer").classList.add("hidden");
}

function showGameContainer() {
   document.getElementById("gameContainer").classList.remove("hidden");
}
