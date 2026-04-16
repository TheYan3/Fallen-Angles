const gameSettings = {
   canvasWidth: 720,
   canvasHeight: 480,
   gameSpeed: 3,
   hitboxShown: false,
   fontFamily: '"Josefin Sans", sans-serif',
   fontWeight: "700",

   applyToCanvas(canvas) {
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
   },

   getCanvasFont(size) {
      return `${this.fontWeight} ${size}px ${this.fontFamily}`;
   },
};
