class fearAbility {
   duration = 2000;
   speedMultiplier = 3;

   /**
    * Creates an instance of the Fear ability.
    * @param {Object} owner - The entity that owns this ability.
    */
   constructor(owner) {
      this.owner = owner;
   }

   /**
    * Triggers the fear effect on the player character.
    * Checks if the owner has a valid reference to the world and character.
    */
   use() {
      this.owner.world?.character?.startFear(
         this.duration,
         this.speedMultiplier,
      );
   }
}
