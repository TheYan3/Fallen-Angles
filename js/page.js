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
}

function hideStartMenue() {
   document.getElementById("startMenue").classList.add("hidden");
}

function showGameContainer() {
   document.getElementById("gameContainer").classList.remove("hidden");
}
