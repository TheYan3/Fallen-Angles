let canvas;
let gameWorld;

function init() {
   canvas = document.getElementById("canvas");
   gameWorld = new world(canvas);

   console.log("my Characteris", gameWorld.character);
}
