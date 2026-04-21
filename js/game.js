let canvas;
let gameWorld;
let keyboardInput = new keyboard();

/**
 * Initializes the canvas and world once.
 */
function init() {
   if (gameWorld) return;
   canvas = document.getElementById("canvas");
   gameSettings.applyToCanvas(canvas);
   gameWorld = new world(canvas, keyboardInput);
}

/**
 * Destroys the old world and starts a new one.
 */
function restartGame() {
   if (gameWorld) {
      gameWorld.destroy();
   }

   gameWorld = null;
   init();
}
