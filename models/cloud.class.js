class cloud extends MovableObject {
   width = 500;
   height = 300;

   /**
    * Creates a moving cloud.
    * @param {string} imagePath - Cloud image path.
    */
   constructor(imagePath) {
      super();
      this.loadImage(imagePath);
      this.randomizePosition();
      this.moveLeft();
   }

   /**
    * Places the cloud at a random sky position.
    */
   randomizePosition() {
      this.x = Math.random() * gameSettings.canvasWidth * 5;
      this.y =
         Math.random() * (gameSettings.canvasHeight / 2 - this.height / 2);
   }

   /**
    * Moves the cloud left and respawns it offscreen.
    */
   moveLeft() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-movement`)) {
            return;
         }

         this.x -= this.speed;
         if (this.x < -this.width) {
            this.randomizePosition();
            this.x = gameSettings.canvasWidth;
         }
      }, 1000 / 60);
   }
}
