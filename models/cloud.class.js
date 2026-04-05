class cloud extends MovableObject {
   width = 500;
   height = 300;

   constructor(imagePath, shouldMove = true) {
      super();
      this.loadImage(imagePath);
      this.shouldMove = shouldMove;
      this.randomizePosition();
      this.moveLeft();
   }

   randomizePosition() {
      this.x = Math.random() * gameSettings.canvasWidth;
      this.y =
         Math.random() * (gameSettings.canvasHeight / 2 - this.height / 2);
   }

   moveLeft() {
      setInterval(() => {
         if (this.shouldMove) {
            this.x -= this.speed;
         }
         if (this.x < -this.width) {
            this.randomizePosition();
            this.x = gameSettings.canvasWidth;
         }
      }, 1000 / 60);
   }
}
