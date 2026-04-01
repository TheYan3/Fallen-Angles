let canvas;
let ctx;
let world = new world();

function init() {
   canvas = document.getElementById("canvas");
   ctx = canvas.getContext("2d");

   console.log("my Characteris", world.character);
}
