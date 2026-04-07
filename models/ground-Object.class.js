class groundObjects extends MovableObject {
   width = gameSettings.canvasWidth;
   height = gameSettings.canvasHeight;

   constructor(imagePath, x = 0) {
      super();
      this.loadImage(imagePath);
      this.y = 480 - this.height; // Position at the bottom of the canvas
      this.x = x;
   }
}
