const gameSettings = {
   canvasWidth: 720,
   canvasHeight: 480,
   gameSpeed: 1,

   applyToCanvas(canvas) {
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
   },
};
