class teleportAbility {
   range = 1000;

   constructor(owner) {
      this.owner = owner;
   }

   use() {
      let characterX = this.owner.world?.character?.x ?? this.owner.x;
      this.owner.x = characterX + Math.random() * this.range;
   }
}
