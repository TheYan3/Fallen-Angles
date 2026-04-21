class healAbility {
   amount = 50;

   /**
    * Creates a Heal ability instance.
    * @param {Object} owner - The entity to be healed.
    */
   constructor(owner) {
      this.owner = owner;
   }

   /**
    * Restores energy to the owner.
    */
   use() {
      this.owner.energy += this.amount;
      playEffect("audio/World/Collect_Feather.mp3");
   }
}
