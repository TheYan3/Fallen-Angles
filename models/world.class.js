class world {
   character = new player();
   enemies = [new golem(), new minotaur(), new reaper()];
   ctx;

   constructor(canvas) {
      this.ctx = canvas.getContext("2d");

      // Draw immediately if the image is already cached, otherwise wait for it.
      if (this.character.img.complete) {
         this.draw();
      } else {
         this.character.img.onload = () => this.draw();
      }
   }

   draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(
         this.character.img,
         this.character.x,
         this.character.y,
         this.character.width,
         this.character.height,
      );
   }
}
