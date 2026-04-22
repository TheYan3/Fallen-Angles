class PlayerStatusEffects {
   isFeared = false;
   fearSpeedMultiplier = 1;
   fearEndsAt = 0;

   /**
    * Creates the status effect controller for a player.
    * @param {Player} owner - Player affected by status effects.
    */
   constructor(owner) {
      this.owner = owner;
   }

   /**
    * Starts the Fear effect.
    * @param {number} duration - Effect length in ms.
    * @param {number} speedMultiplier - Fear movement speed multiplier.
    */
   startFear(duration, speedMultiplier) {
      if (this.owner.isInactive()) return;
      playEffect(audioLibrary.effects.abilities.fear);
      this.isFeared = true;
      this.fearSpeedMultiplier = speedMultiplier;
      this.fearEndsAt = gameSettings.getGameTime() + duration;
      this.owner.attack.finish();
   }

   /**
    * Ends Fear when its duration is over.
    */
   updateFearState() {
      if (this.isFeared && gameSettings.getGameTime() >= this.fearEndsAt) {
         this.stopFear();
      }
   }

   /**
    * Clears Fear state.
    */
   stopFear() {
      this.isFeared = false;
      this.fearSpeedMultiplier = 1;
      this.fearEndsAt = 0;
   }

   /**
    * Moves the player during Fear.
    */
   moveFeared() {
      this.owner.x = Math.max(
         0,
         this.owner.x - this.owner.runSpeed * this.fearSpeedMultiplier,
      );
      this.owner.otherDirection = true;
      this.owner.world.updateCameraFor(this.owner);
   }

   /**
    * Checks if Fear disables collision.
    * @returns {boolean}
    */
   isFearCollisionDisabled() {
      return this.isFeared;
   }
}
