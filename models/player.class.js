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
   runSpeed = gameSettings.gameSpeed * 1.3;
   airSpeedMultiplier = 1.2;

   constructor(keyboard) {
      super();
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

      this.keyboard = keyboard;
      this.energy = 100;
      this.maxEnergy = 100;
      this.damage = 25;
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
      this.applyGravity();
      this.animation();
      this.handleMovement();
   }

   handleMovement() {
      setInterval(() => {
         this.updateMovement();
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
      if (this.isInactive()) {
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
      if (this.isDying) {
         return this.IMAGES_DYING;
      }

      if (this.isHurt) {
         return this.IMAGES_HURT;
      }

      if (this.isAttacking) {
         return this.currentAttackAnimation || this.IMAGES_ATTACKING;
      }

      if (this.isAboveGround()) {
         return this.getAirAnimationImages();
      }

      return this.getGroundAnimationImages();
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
      if (this.isInactive()) {
         return;
      }

      let speed = this.getAirMovementSpeed();
      if (this.canMoveRight() && !this.world.isBlockedByRock(this, speed)) {
         this.moveRight(speed);
      }
      if (this.canMoveLeft() && !this.world.isBlockedByRock(this, -speed)) {
         this.moveLeft(speed);
      }
      if (this.canJump()) this.jump();
      this.updateCamera();
   }

   canMoveRight() {
      return (
         !this.isNormalAttackLocked() &&
         this.keyboard.RIGHT &&
         this.x < this.world.level.player_end_x
      );
   }

   canMoveLeft() {
      return !this.isNormalAttackLocked() && this.keyboard.LEFT && this.x > 0;
   }

   canJump() {
      return this.keyboard.SPACE && !this.isAboveGround();
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
      let cameraX = -this.x + 100;
      this.world.camara_x = Math.max(cameraX, this.getCameraStopX());
   }

   getCameraStopX() {
      return -this.world.level.camera_end_x + 100;
   }
}
