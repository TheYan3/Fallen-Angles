class PowerUp extends MovableObject {
   width = 70;
   height = 70;
   animationSpeed = 8000 / 60;
   lifeAmount = 50;

   /**
    * Creates a collectible power-up.
    * @param {number} x - Horizontal position.
    * @param {number} y - Vertical position.
    */
   constructor(x, y) {
      super();
      this.IMAGES_IDLE = animationLibrary.powerup.flameFeather;
      this.x = x;
      this.y = y;
      this.loadImage(this.IMAGES_IDLE[0]);
      this.loadImages(this.IMAGES_IDLE);
      this.animate();
   }

   /**
    * Starts the idle animation loop.
    */
   animate() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-animation`)) {
            return;
         }

         this.playIdleAnimation();
      }, this.animationSpeed);
   }

   /**
    * Plays the idle animation while collectable.
    */
   playIdleAnimation() {
      if (this.isRemoved) {
         return;
      }

      this.updateAnimationState(this.IMAGES_IDLE);
      this.playAnimation(this.IMAGES_IDLE);
   }

   /**
    * Marks the power-up as collected.
    */
   collect() {
      if (this.isRemoved) {
         return;
      }

      this.isRemoved = true;
   }
}
