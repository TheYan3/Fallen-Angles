class Minotaur extends MovableObject {
   DEFAULT_SKIN = "Minotaur_01";
   hitSound = audioLibrary.effects.enemies.minotaur.hurt;
   deathSound = audioLibrary.effects.enemies.minotaur.death;
   attackFrameDelay = 3;

   /**
    * Creates a minotaur enemy and starts its systems.
    */
   constructor() {
      super();
      this.setAnimations();
      this.setupStats();
      this.loadAnimationImages();
      this.startSystems();
   }

   /**
    * Assigns minotaur animation sets.
    */
   setAnimations() {
      let animations = animationLibrary.minotaur[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.attacking;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_DYING = animations.dying;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = [];
   }

   /**
    * Sets minotaur stats and spawn position.
    */
   setupStats() {
      this.otherDirection = true;
      this.damage = 10;
      this.speed = gameSettings.gameSpeed * 1;
      this.x = 400 + Math.random() * 1400;
   }

   /**
    * Preloads all minotaur animation images.
    */
   loadAnimationImages() {
      this.loadImage(this.IMAGES_WAITING[0]);
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DYING);
      this.loadImages(this.IMAGES_WALKING);
   }

   /**
    * Starts minotaur gravity, animation and movement.
    */
   startSystems() {
      this.applyGravity();
      this.animation();
      this.moveLeft();
   }

   /**
    * Runs the minotaur animation loop.
    */
   animation() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-animation`)) {
            return;
         }

         this.playStateAnimation();
      }, this.animationSpeed);
   }

   /**
    * Returns the current minotaur animation.
    * @returns {string[]}
    */
   getCurrentAnimationImages() {
      return this.getEnemyAnimationImages(this.IMAGES_WAITING);
   }

   /**
    * Plays the current minotaur state animation.
    */
   playStateAnimation() {
      this.playEnemyStateAnimation(this.IMAGES_WAITING);
   }
}
