class healAbility {
   amount = 50;

   constructor(owner) {
      this.owner = owner;
   }

   use() {
      this.owner.energy += this.amount;
   }
}
