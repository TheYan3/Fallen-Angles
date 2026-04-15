class powerUp extends MovableObject {
   width = 70;
   height = 70;
   animationSpeed = 8000 / 60;
   lifeAmount = 50;

   constructor(x, y) {
      super();
      this.IMAGES_IDLE = animationLibrary.powerup.flameFeather;
      this.x = x;
      this.y = y;
      this.loadImage(this.IMAGES_IDLE[0]);
      this.loadImages(this.IMAGES_IDLE);
      this.animate();
   }

   animate() {
      setInterval(() => {
         this.playIdleAnimation();
      }, this.animationSpeed);
   }

   playIdleAnimation() {
      if (this.isRemoved) {
         return;
      }

      this.updateAnimationState(this.IMAGES_IDLE);
      this.playAnimation(this.IMAGES_IDLE);
   }

   collect() {
      if (this.isRemoved) {
         return;
      }

      this.isRemoved = true;
   }
}
