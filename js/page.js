function toggleFullscreen() {
   if (document.fullscreenElement) {
      return document.exitFullscreen();
   }

   getFullscreenTarget().requestFullscreen();
}

function getFullscreenTarget() {
   return document.getElementById("canvas");
}

function gameStart() {
   hideStartMenue();
   showGameContainer();
   init();
}

function backToMenue() {
   hideGameContainer();
   showStartMenue();
}

function hideStartMenue() {
   document.getElementById("startMenue").classList.add("hidden");
}

function showStartMenue() {
   document.getElementById("startMenue").classList.remove("hidden");
}

function hideGameContainer() {
   document.getElementById("gameContainer").classList.add("hidden");
}

function showGameContainer() {
   document.getElementById("gameContainer").classList.remove("hidden");
}
