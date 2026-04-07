let canvas;
let gameWorld;
let keyboardInput = new keyboard();

function init() {
   canvas = document.getElementById("canvas");
   gameSettings.applyToCanvas(canvas);
   gameWorld = new world(canvas, keyboardInput);

   console.log("my Characteris", gameWorld.character);
}
