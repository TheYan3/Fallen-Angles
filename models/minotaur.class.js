class minotaur extends MovableObject {
   DEFAULT_SKIN = "Minotaur_01";
   attackFrameDelay = 3;

   constructor() {
      super();
      let animations = animationLibrary.minotaur[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.attacking;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_DYING = animations.dying;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = [];

      this.otherDirection = true;
      this.damage = 10;
      this.loadImage(this.IMAGES_WAITING[0]);
      this.speed = gameSettings.gameSpeed * 1;
      this.x = 400 + Math.random() * 1400;
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DYING);
      this.loadImages(this.IMAGES_WALKING);
      this.applyGravity();
      this.animation();
      this.moveLeft();
   }

   animation() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-animation`)) {
            return;
         }

         this.playStateAnimation();
      }, this.animationSpeed);
   }

   getCurrentAnimationImages() {
      if (this.isHurt) {
         return this.IMAGES_HURT;
      }

      if (this.isAttacking) {
         return this.IMAGES_ATTACKING;
      }

      if (this.isAggro && this.isWalking) {
         return this.IMAGES_WALKING;
      }

      return this.IMAGES_WAITING;
   }

   playStateAnimation() {
      if (this.isRemoved) return;
      if (this.isDying) return this.playDyingAnimation();
      if (this.isHurt) return this.playHurtAnimation();
      let images = this.getCurrentAnimationImages();
      this.updateAnimationState(images);
      this.playAnimationWithDelay(
         images,
         this.isAttacking ? this.attackFrameDelay : 1,
      );
   }
}
