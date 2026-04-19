class Abilities {
   constructor(owner, options = {}) {
      this.owner = owner;
      this.healthThreshold = options.healthThreshold ?? 50;
      this.teleport = new teleportAbility(owner);
      this.heal = new healAbility(owner);
      this.fear = new fearAbility(owner);
   }

   check() {
      if (this.canUse()) {
         this.startCasting();
      }
   }

   canUse() {
      return !this.owner.abilityUsed && this.owner.energy <= this.healthThreshold;
   }

   startCasting() {
      this.owner.abilityUsed = true;
      this.owner.isCasting = true;
      this.owner.isAttacking = false;
      this.teleport.use();
   }

   finishCasting() {
      this.heal.use();
      this.fear.use();
      this.owner.spawnEnemiesAfterFear?.();
      this.owner.isCasting = false;
   }
}
