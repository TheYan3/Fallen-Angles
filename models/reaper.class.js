class reaper extends MovableObject {
   DEFAULT_SKIN = "Reaper_Man_1";
   animationSpeed = 5000 / 60;
   attackFrameDelay = 2;
   isAggro = false;
   isAttacking = false;
   isWalking = false;

   constructor() {
      super();
      let animations = animationLibrary.reaper[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.slashing;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = animations.running;

      this.otherDirection = true;
      this.loadImage(this.IMAGES_WAITING[0]);
      this.speed = gameSettings.gameSpeed * 0.7;
      this.x = 600 + Math.random() * 500;
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_RUN);
      this.animation();
      this.moveLeft();
   }

   animation() {
      setInterval(() => {
         let images = this.IMAGES_WAITING;

         if (this.isAttacking) {
            images = this.IMAGES_ATTACKING;
         } else if (this.isAggro && this.isWalking) {
            images = this.IMAGES_WALKING;
         }

         this.updateAnimationState(images);
         this.playAnimationWithDelay(
            images,
            this.isAttacking ? this.attackFrameDelay : 1,
         );
      }, this.animationSpeed);
   }
}
