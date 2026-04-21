class Abilities {
   /**
    * Orchestrates special boss abilities.
    * @param {Object} owner - The boss instance.
    * @param {Object} options - Configuration for health triggers.
    */
   constructor(owner, options = {}) {
      this.owner = owner;
      this.healthThreshold = options.healthThreshold ?? 50;
      this.teleport = new teleportAbility(owner);
      this.heal = new healAbility(owner);
      this.fear = new fearAbility(owner);
   }

   /**
    * Main check to be run in the game loop. Triggers ability casting
    * if health drops below the threshold.
    */
   check() {
      if (this.canUse()) {
         this.startCasting();
      }
   }

   /**
    * Logic check: abilities can only be used once per life and
    * only when health is low.
    * @returns {boolean}
    */
   canUse() {
      return (
         !this.owner.abilityUsed && this.owner.energy <= this.healthThreshold
      );
   }

   /**
    * Transition into the casting phase.
    * Disables normal attacks and triggers the teleport logic immediately.
    */
   startCasting() {
      this.owner.abilityUsed = true;
      this.owner.isCasting = true;
      this.owner.isAttacking = false;
      this.teleport.use();
   }

   /**
    * Completes the casting phase.
    * Triggers secondary effects, then lets the boss resume normal behavior.
    */
   finishCasting() {
      this.heal.use();
      this.fear.use();
      this.owner.spawnEnemiesAfterFear?.();
      this.owner.isCasting = false;
   }
}
