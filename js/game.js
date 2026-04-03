let canvas;
let gameWorld;

function init() {
   canvas = document.getElementById("canvas");
   gameSettings.applyToCanvas(canvas);
   gameWorld = new world(canvas);

   console.log("my Characteris", gameWorld.character);
}
