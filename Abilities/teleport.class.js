class teleportAbility {
   range = 1000;

   /**
    * Creates a teleport ability.
    * @param {Object} owner - Entity using the ability.
    */
   constructor(owner) {
      this.owner = owner;
   }

   /**
    * Moves the owner ahead of the player.
    */
   use() {
      playEffect("audio/Abilitys/Ability_Teleport.mp3");
      let characterX = this.owner.world?.character?.x ?? this.owner.x;
      this.owner.x = characterX + this.range;
   }
}
