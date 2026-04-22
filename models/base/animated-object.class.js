class AnimatedObject extends DrawableObject {
   currentImage = 0;
   lastAnimation = null;
   animationTick = 0;
   animationSpeed = 4000 / 60;
   attackAnimationSpeed = 4000 / 60;
   hurtAnimationSteps = 2;
   attackAnimationCompleted = false;

   /**
    * Plays a simple repeating animation cycle.
    * @param {string[]} images - Array of image paths for the animation.
    */
   playAnimation(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage = (this.currentImage + 1) % images.length;
   }

   /**
    * Plays an animation with a frame delay to slow down the playback
    * relative to the game's tick rate.
    * @param {string[]} images - Array of image paths.
    * @param {number} frameDelay - Number of ticks to stay on one frame.
    */
   playAnimationWithDelay(images, frameDelay = 1) {
      this.showCurrentAnimationFrame(images);
      this.animationTick++;
      if (this.shouldKeepAnimationFrame(frameDelay)) return;
      this.advanceDelayedAnimation(images);
   }

   /**
    * Shows the current frame without advancing.
    * @param {string[]} images - Animation frames.
    */
   showCurrentAnimationFrame(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
   }

   /**
    * Checks if the current frame should stay visible.
    * @param {number} frameDelay - Delay in ticks.
    * @returns {boolean}
    */
   shouldKeepAnimationFrame(frameDelay) {
      return this.animationTick < frameDelay;
   }

   /**
    * Advances to the next delayed frame.
    * @param {string[]} images - Animation frames.
    */
   advanceDelayedAnimation(images) {
      this.currentImage = (this.currentImage + 1) % images.length;
      this.markFinishedAttackCycle(images);
      this.animationTick = 0;
   }

   /**
    * Plays a sequence of images exactly once.
    * @param {string[]} images - Sequence paths.
    * @returns {boolean} True if the sequence has completed.
    */
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

   /**
    * Detects if an animation set has changed and resets currentImage
    * to ensure animations start at frame 0.
    * @param {string[]} images - The animation set to check.
    */
   updateAnimationState(images) {
      if (this.lastAnimation !== images) {
         this.currentImage = 0;
         this.lastAnimation = images;
         this.animationTick = 0;
         this.resetAttackCycle(images);
      }
   }

   /**
    * Flags when an attack animation has completed a full cycle.
    * Used to allow re-triggering of damage application.
    * @param {string[]} images - The currently playing set.
    */
   markFinishedAttackCycle(images) {
      if (
         this.isAttacking &&
         images === this.IMAGES_ATTACKING &&
         this.currentImage === 0
      ) {
         this.attackAnimationCompleted = true;
      }
   }

   /**
    * Resets the attack completion flag if the current animation
    * is no longer an attack animation.
    * @param {string[]} images - Currently playing set.
    */
   resetAttackCycle(images) {
      if (images !== this.IMAGES_ATTACKING) {
         this.attackAnimationCompleted = false;
      }
   }

   /**
    * Plays the dying animation sequence exactly once.
    * Triggers the final removal of the object from the world
    * once the animation finishes.
    */
   playDyingAnimation() {
      this.updateAnimationState(this.IMAGES_DYING);
      let isFinished = this.playAnimationOnce(this.IMAGES_DYING);
      if (isFinished) {
         this.world?.handleObjectFinishedDying?.(this);
         this.isRemoved = true;
      }
   }

   /**
    * Higher-level logic to play the hurt animation sequence.
    * Automatically resets the hurt state once finished.
    */
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

   /**
    * Plays an animation for a specific number of loop iterations.
    * @param {string[]} images - Sequence paths.
    * @param {number} steps - How many times to repeat the animation.
    */
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
