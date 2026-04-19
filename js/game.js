let canvas;
let gameWorld;
let keyboardInput = new keyboard();

function init() {
   if (gameWorld) return;
   canvas = document.getElementById("canvas");
   gameSettings.applyToCanvas(canvas);
   gameWorld = new world(canvas, keyboardInput);
}

function restartGame() {
   if (gameWorld) {
      gameWorld.destroy();
   }

   gameWorld = null;
   init();
}
