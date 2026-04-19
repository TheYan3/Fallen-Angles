class minotaur extends MovableObject {
   DEFAULT_SKIN = "Minotaur_01";
   attackFrameDelay = 3;

   constructor() {
      super();
      this.setAnimations();
      this.setupStats();
      this.loadAnimationImages();
      this.startSystems();
   }

   setAnimations() {
      let animations = animationLibrary.minotaur[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.attacking;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_DYING = animations.dying;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = [];
   }

   setupStats() {
      this.otherDirection = true;
      this.damage = 10;
      this.speed = gameSettings.gameSpeed * 1;
      this.x = 400 + Math.random() * 1400;
   }

   loadAnimationImages() {
      this.loadImage(this.IMAGES_WAITING[0]);
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DYING);
      this.loadImages(this.IMAGES_WALKING);
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
