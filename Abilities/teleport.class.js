class teleportAbility {
   range = 1000;

   constructor(owner) {
      this.owner = owner;
   }

   use() {
      playEffect("audio/Abilitys/Ability_Teleport.mp3");
      let characterX = this.owner.world?.character?.x ?? this.owner.x;
      this.owner.x = characterX + this.range;
   }
}
