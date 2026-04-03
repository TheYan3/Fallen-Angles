class minotaur extends MovableObject {
   constructor() {
      super();
      this.loadImage(
         "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_000.png",
      );

      this.x = 300 + Math.random() * 500;
   }
}
