class reaper extends MovableObject {
   DEFAULT_SKIN = "Reaper_Man_1";
   animationSpeed = 5000 / 60;
   attackFrameDelay = 2;

   constructor() {
      super();
      this.setAnimations();
      this.setupStats();
      this.loadAnimationImages();
      this.startSystems();
   }

   setAnimations() {
      let animations = animationLibrary.reaper[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.slashing;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_DYING = animations.dying;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = animations.running;
   }

   setupStats() {
      this.otherDirection = true;
      this.damage = 5;
      this.speed = gameSettings.gameSpeed * 0.7;
      this.x = 600 + Math.random() * 800;
   }

   loadAnimationImages() {
      this.loadImage(this.IMAGES_WAITING[0]);
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DYING);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_RUN);
   }

   startSystems() {
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
      return this.getEnemyAnimationImages(this.IMAGES_WAITING);
   }

   playStateAnimation() {
      this.playEnemyStateAnimation(this.IMAGES_WAITING);
   }
}
