class player extends MovableObject {
   constructor() {
      super();
      this.loadImage(
         "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_000.png",
      );
   }

   jump() {
      console.log("Jumping");
   }
}
