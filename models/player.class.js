class player extends MovableObject {
   DEFAULT_SKIN = "Fallen_Angels_1";

   world;
   keyboard;
   lastAnimation = null;
   isAttacking = false;
   attackKeyHandled = false;
   currentAttackAnimation = null;
   jumpBlocked = false;
   jumpCooldown = 800;
   runSpeed = gameSettings.gameSpeed * 1.2;

   constructor(keyboard) {
      super();
      let animations = animationLibrary.player[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.slashing;
      this.IMAGES_RUN_ATTACKING = animations.runSlashing;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = animations.running;
      this.IMAGES_JUMPING = animations.jumpStart;
      this.IMAGES_FALLING = animations.fallingDown;
      this.IMAGES_DYING = animations.dying;

      this.keyboard = keyboard;
      this.loadImage(this.IMAGES_WAITING[0]);
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_RUN_ATTACKING);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_RUN);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_FALLING);
      this.loadImages(this.IMAGES_DYING);
      this.applyGravity();
      this.animation();
      this.handleMovement();
   }

   handleMovement() {
      setInterval(() => {
         let currentSpeed = this.getMovementSpeed(
            this.keyboard.RUN,
            this.runSpeed,
         );
         let isNormalAttackLocked =
            this.isAttacking &&
            this.currentAttackAnimation === this.IMAGES_ATTACKING;

         if (
            !isNormalAttackLocked &&
            this.keyboard.RIGHT &&
            this.x < this.world.level.level_end_x
         ) {
            this.moveRight(currentSpeed);
         }

         if (!isNormalAttackLocked && this.keyboard.LEFT && this.x > 0) {
            this.moveLeft(currentSpeed);
         }

         if (this.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
         }
         this.world.camara_x = -this.x + 100;
      }, 1000 / 60);
   }

   animation() {
      setInterval(() => {
         this.handleAttackState();

         let images = this.getCurrentAnimationImages();
         this.updateAnimationState(images);
         this.playCurrentAnimation(images);
      }, this.animationSpeed);
   }

   handleAttackState() {
      if (this.keyboard.UP && !this.attackKeyHandled && !this.isAttacking) {
         this.isAttacking = true;
         this.attackKeyHandled = true;
         this.currentImage = 0;
         this.currentAttackAnimation = this.getAttackAnimationImages();
         this.lastAnimation = this.currentAttackAnimation;
      }

      if (!this.keyboard.UP) {
         this.attackKeyHandled = false;
      }
   }

   getCurrentAnimationImages() {
      if (this.isAttacking) {
         return this.currentAttackAnimation || this.IMAGES_ATTACKING;
      }

      if (this.isAboveGround() && this.speedY < 0) {
         return this.IMAGES_JUMPING;
      }

      if (this.isAboveGround()) {
         return this.IMAGES_FALLING;
      }

      if (this.keyboard.RIGHT && this.keyboard.LEFT) {
         return this.IMAGES_WAITING;
      }

      if ((this.keyboard.RIGHT || this.keyboard.LEFT) && this.keyboard.RUN) {
         return this.IMAGES_RUN;
      }

      if (this.keyboard.LEFT || this.keyboard.RIGHT) {
         return this.IMAGES_WALKING;
      }

      return this.IMAGES_WAITING;
   }

   getAttackAnimationImages() {
      let isMoving = this.keyboard.LEFT || this.keyboard.RIGHT;

      if (isMoving && this.keyboard.RUN) {
         return this.IMAGES_RUN_ATTACKING;
      }

      return this.IMAGES_ATTACKING;
   }

   updateAnimationState(images) {
      if (this.lastAnimation !== images) {
         this.currentImage = 0;
         this.lastAnimation = images;
      }
   }

   playCurrentAnimation(images) {
      if (this.isAttacking) {
         let animationFinished = this.playAnimationOnce(images);

         if (animationFinished) {
            this.isAttacking = false;
            this.currentAttackAnimation = null;
            this.lastAnimation = null;
         }
         return;
      }

      this.playAnimation(images);
   }

   jump() {
      if (!this.isAboveGround() && !this.jumpBlocked) {
         this.jumpBlocked = true;
         this.speedY = -17;
         setTimeout(() => {
            this.jumpBlocked = false;
         }, this.jumpCooldown);
      }
   }
}
