class GroundObject extends MovableObject {
   width = gameSettings.canvasWidth;
   height = gameSettings.canvasHeight;

   /**
    * Creates a background ground layer.
    * @param {string} imagePath - Ground image path.
    * @param {number} x - Horizontal draw position.
    */
   constructor(imagePath, x = 0) {
      super();
      this.loadImage(imagePath);
      this.y = 480 - this.height; // Position at the bottom of the canvas
      this.x = x;
   }
}
