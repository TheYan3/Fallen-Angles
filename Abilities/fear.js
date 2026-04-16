class fearAbility {
   duration = 2000;
   speedMultiplier = 3;

   constructor(owner) {
      this.owner = owner;
   }

   use() {
      this.owner.world?.character?.startFear(
         this.duration,
         this.speedMultiplier,
      );
   }
}
