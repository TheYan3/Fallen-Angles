class MovableObject extends drawableObjects {
   speed = gameSettings.gameSpeed * 0.3;
   currentImage = 0;
   lastAnimation = null;
   animationTick = 0;
   animationSpeed = 4000 / 60;
   attackAnimationSpeed = 4000 / 60;
   hurtAnimationSteps = 2;
   speedY = 0;
   acceleration = 0.6;
   groundY = gameSettings.canvasHeight - 110;
   isAggro = false;
   isAttacking = false;
   isWalking = false;
   energy = 50;
   maxEnergy = 50;
   damage = 0;
   attackAnimationCompleted = false;
   hasAppliedAttackHit = false;
   isHurt = false;
   isDying = false;
   isRemoved = false;

   applyGravity() {
      setInterval(() => {
         let floorY = this.getCurrentGroundY();
         if (this.isAboveGround() || this.speedY < 0)
            return this.fallToFloor(floorY);
         this.landOnFloor(floorY);
      }, 1000 / 60);
   }

   isAboveGround() {
      return this.y < this.getCurrentGroundY();
   }

   getCurrentGroundY() {
      return this.getRockGroundY() ?? this.groundY;
   }

   getRockGroundY() {
      return this.world?.getRockGroundY(this) ?? null;
   }

   fallToFloor(floorY) {
      this.y += this.speedY;
      this.speedY += this.acceleration;
      if (this.y > floorY) this.landOnFloor(floorY);
   }

   landOnFloor(floorY) {
      this.y = floorY;
      this.speedY = 0;
   }

   moveRight(speed = this.speed) {
      this.x += speed;
      this.otherDirection = false;
   }

   moveLeft(speed = this.speed) {
      this.x -= speed;
      this.otherDirection = true;
   }

   getMovementSpeed(isRunning = false, runSpeed = this.speed) {
      return isRunning ? runSpeed : this.speed;
   }

   playAnimation(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage = (this.currentImage + 1) % images.length;
   }

   playAnimationWithDelay(images, frameDelay = 1) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];

      this.animationTick++;

      if (this.animationTick < frameDelay) {
         return;
      }

      this.currentImage = (this.currentImage + 1) % images.length;
      this.markFinishedAttackCycle(images);
      this.animationTick = 0;
   }

   playAnimationOnce(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;

      if (this.currentImage >= images.length) {
         this.currentImage = 0;
         return true;
      }

      return false;
   }

   updateAnimationState(images) {
      if (this.lastAnimation !== images) {
         this.currentImage = 0;
         this.lastAnimation = images;
         this.animationTick = 0;
         this.resetAttackCycle(images);
      }
   }

   markFinishedAttackCycle(images) {
      if (
         this.isAttacking &&
         images === this.IMAGES_ATTACKING &&
         this.currentImage === 0
      ) {
         this.attackAnimationCompleted = true;
      }
   }

   resetAttackCycle(images) {
      if (images !== this.IMAGES_ATTACKING) {
         this.attackAnimationCompleted = false;
      }
   }

   isColliding(otherObject, overlap = 0) {
      if (!otherObject) {
         return false;
      }

      let isColliding = this.isTouchingHitbox(otherObject, overlap);
      this.applyCombatDamage(otherObject, isColliding);
      return isColliding;
   }

   applyCombatDamage(otherObject, isColliding) {
      if (this.hasDisabledFearCollision(otherObject)) {
         return;
      }

      this.applyEnemyAttackDamage(otherObject, isColliding);
      this.applyPlayerAttackDamage(otherObject, isColliding);
   }

   hasDisabledFearCollision(otherObject) {
      return (
         this.isFearCollisionDisabled?.() ||
         otherObject.isFearCollisionDisabled?.()
      );
   }

   isTouchingHitbox(otherObject, overlap) {
      return (
         this.x + overlap < otherObject.x + otherObject.width &&
         this.x + this.width - overlap > otherObject.x &&
         this.y < otherObject.y + otherObject.height &&
         this.y + this.height > otherObject.y
      );
   }

   applyEnemyAttackDamage(otherObject, isColliding) {
      if (!isColliding || !otherObject.canHitEnemy()) {
         return;
      }

      this.receiveDamage(otherObject.damage);
      otherObject.hasAppliedAttackHit = true;
   }

   applyPlayerAttackDamage(otherObject, isColliding) {
      if (!isColliding || !this.canHitEnemy()) {
         return;
      }

      otherObject.receiveDamage(this.damage);
      this.hasAppliedAttackHit = true;
   }

   canHitEnemy() {
      return this.isAttacking && !this.hasAppliedAttackHit && !this.isDying;
   }

   checkDeath() {
      if (this.energy > 0 || this.isDying || this.isRemoved) {
         return;
      }

      this.startDying();
   }

   startDying() {
      this.isDying = true;
      this.isHurt = false;
      this.isAttacking = false;
      this.isWalking = false;
      this.attackAnimationCompleted = false;
      this.hasAppliedAttackHit = false;
      this.currentImage = 0;
      this.lastAnimation = null;
      this.animationTick = 0;
   }

   playDyingAnimation() {
      this.updateAnimationState(this.IMAGES_DYING);
      let isFinished = this.playAnimationOnce(this.IMAGES_DYING);
      if (isFinished) {
         this.isRemoved = true;
      }
   }

   receiveDamage(amount) {
      if (this.isDying || this.isRemoved) {
         return;
      }

      this.energy = Math.max(0, this.energy - amount);
      if (this.energy > 0) {
         this.startHurt();
      }
   }

   startHurt() {
      if (!this.IMAGES_HURT?.length) {
         return;
      }

      this.isHurt = true;
      this.isAttacking = false;
      this.isWalking = false;
      this.currentImage = 0;
      this.lastAnimation = null;
      this.animationTick = 0;
   }

   playHurtAnimation() {
      this.updateAnimationState(this.IMAGES_HURT);
      let isFinished = this.playAnimationSteps(
         this.IMAGES_HURT,
         this.hurtAnimationSteps,
      );
      if (isFinished) {
         this.isHurt = false;
      }
   }

   playAnimationSteps(images, steps) {
      let isFinished = false;

      for (let i = 0; i < steps; i++) {
         isFinished = this.playAnimationOnce(images);
         if (isFinished) {
            return true;
         }
      }

      return isFinished;
   }
}
