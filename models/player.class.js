class player extends MovableObject {
   DEFAULT_SKIN = "Fallen_Angels_1";

   y = -100;
   world;
   keyboard;
   lastAnimation = null;
   isAttacking = false;
   attackKeyHandled = false;
   currentAttackAnimation = null;
   jumpBlocked = false;
   jumpCooldown = 800;
   runSpeed = gameSettings.gameSpeed * 1.3;
   airSpeedMultiplier = 1.2;
   isFeared = false;
   fearSpeedMultiplier = 1;
   fearTimer = null;

   constructor(keyboard) {
      super();
      this.keyboard = keyboard;
      this.setAnimations();
      this.setupStats();
      this.loadAnimationImages();
      this.startSystems();
   }

   setAnimations() {
      let animations = animationLibrary.player[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.slashing;
      this.IMAGES_RUN_ATTACKING = animations.runSlashing;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = animations.running;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_JUMPING = animations.jumpStart;
      this.IMAGES_FALLING = animations.fallingDown;
      this.IMAGES_DYING = animations.dying;
   }

   setupStats() {
      this.energy = 100;
      this.maxEnergy = 100;
      this.damage = 25;
   }

   loadAnimationImages() {
      this.loadImage(this.IMAGES_WAITING[0]);
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_RUN_ATTACKING);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_RUN);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_FALLING);
      this.loadImages(this.IMAGES_DYING);
   }

   startSystems() {
      this.applyGravity();
      this.animation();
      this.handleMovement();
   }

   handleMovement() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-movement`)) {
            return;
         }

         this.updateMovement();
      }, 1000 / 60);
   }

   animation() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-animation`)) {
            return;
         }

         this.handleAttackState();

         let images = this.getCurrentAnimationImages();
         this.updateAnimationState(images);
         this.playCurrentAnimation(images);
      }, this.animationSpeed);
   }

   handleAttackState() {
      if (this.isControlBlocked()) {
         return;
      }

      if (this.keyboard.UP && !this.attackKeyHandled && !this.isAttacking) {
         this.startAttack();
      }

      if (!this.keyboard.UP) {
         this.attackKeyHandled = false;
      }
   }

   getCurrentAnimationImages() {
      let priorityImages = this.getPriorityAnimationImages();
      if (priorityImages) return priorityImages;

      if (this.isAboveGround()) {
         return this.getAirAnimationImages();
      }

      return this.getGroundAnimationImages();
   }

   getPriorityAnimationImages() {
      if (this.isDying) return this.IMAGES_DYING;
      if (this.isHurt) return this.IMAGES_HURT;
      if (this.isFeared) return this.IMAGES_RUN;
      if (this.isAttacking) return this.getActiveAttackImages();
      return null;
   }

   getActiveAttackImages() {
      return this.currentAttackAnimation || this.IMAGES_ATTACKING;
   }

   getAttackAnimationImages() {
      let isMoving = this.keyboard.LEFT || this.keyboard.RIGHT;

      if (isMoving && this.keyboard.RUN) {
         return this.IMAGES_RUN_ATTACKING;
      }

      return this.IMAGES_ATTACKING;
   }

   updateAnimationState(images) {
      super.updateAnimationState(images);
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

   isInactive() {
      return this.isHurt || this.isDying || this.isRemoved;
   }

   isControlBlocked() {
      return this.isInactive() || this.isFeared;
   }

   startAttack() {
      this.isAttacking = true;
      this.attackKeyHandled = true;
      this.hasAppliedAttackHit = false;
      this.currentImage = 0;
      this.currentAttackAnimation = this.getAttackAnimationImages();
      this.lastAnimation = this.currentAttackAnimation;
   }

   finishAttack() {
      this.isAttacking = false;
      this.hasAppliedAttackHit = false;
      this.currentAttackAnimation = null;
      this.lastAnimation = null;
   }

   playAttackAnimation(images) {
      let animationFinished = this.playAnimationOnce(images);
      if (animationFinished) {
         this.finishAttack();
      }
   }

   playCurrentAnimation(images) {
      if (this.isRemoved) return;
      if (this.isDying) return this.playDyingAnimation();
      if (this.isHurt) return this.playHurtAnimation();
      if (this.isAttacking) return this.playAttackAnimation(images);
      this.playAnimation(images);
   }

   updateMovement() {
      if (this.isFeared) {
         return this.moveFeared();
      }

      if (this.isInactive()) {
         return;
      }

      this.handleControlledMovement();
      this.updateCamera();
   }

   handleControlledMovement() {
      let speed = this.getAirMovementSpeed();
      if (this.canMoveRight() && !this.world.isBlockedByRock(this, speed)) {
         this.moveRight(speed);
      }
      if (this.canMoveLeft() && !this.world.isBlockedByRock(this, -speed)) {
         this.moveLeft(speed);
      }
      if (this.canJump()) this.jump();
   }

   startFear(duration, speedMultiplier) {
      if (this.isInactive()) return;
      this.isFeared = true;
      this.fearSpeedMultiplier = speedMultiplier;
      this.finishAttack();
      clearTimeout(this.fearTimer);
      this.fearTimer = setTimeout(() => this.stopFear(), duration);
   }

   stopFear() {
      this.isFeared = false;
      this.fearSpeedMultiplier = 1;
   }

   moveFeared() {
      this.x = Math.max(0, this.x - this.runSpeed * this.fearSpeedMultiplier);
      this.otherDirection = true;
      this.updateCamera();
   }

   canMoveRight() {
      return (
         !this.isNormalAttackLocked() &&
         this.keyboard.RIGHT &&
         this.x < this.world.level.playerEndX
      );
   }

   canMoveLeft() {
      return !this.isNormalAttackLocked() && this.keyboard.LEFT && this.x > 0;
   }

   canJump() {
      return this.keyboard.SPACE && !this.isAboveGround();
   }

   isFearCollisionDisabled() {
      return this.isFeared;
   }

   isNormalAttackLocked() {
      return (
         this.isAttacking &&
         this.currentAttackAnimation === this.IMAGES_ATTACKING
      );
   }

   getAirAnimationImages() {
      if (this.speedY < 0) {
         return this.IMAGES_JUMPING;
      }

      return this.IMAGES_FALLING;
   }

   getGroundAnimationImages() {
      if (this.keyboard.RIGHT && this.keyboard.LEFT) return this.IMAGES_WAITING;
      if ((this.keyboard.RIGHT || this.keyboard.LEFT) && this.keyboard.RUN)
         return this.IMAGES_RUN;
      if (this.keyboard.LEFT || this.keyboard.RIGHT) return this.IMAGES_WALKING;
      return this.IMAGES_WAITING;
   }

   getAirMovementSpeed() {
      let speed = this.getMovementSpeed(this.keyboard.RUN, this.runSpeed);
      if (this.isAboveGround()) return speed * this.airSpeedMultiplier;
      return speed;
   }

   updateCamera() {
      let cameraX = this.getCenteredCameraX();
      this.world.cameraX = Math.min(0, Math.max(cameraX, this.getCameraStopX()));
   }

   getCenteredCameraX() {
      let playerCenterX = this.x + this.width / 2;
      return this.world.canvas.width / 2 - playerCenterX;
   }

   getCameraStopX() {
      return this.world.canvas.width - this.world.level.cameraEndX;
   }
}
