const gameSettings = {
   canvasWidth: 720,
   canvasHeight: 480,

   applyToCanvas(canvas) {
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
   },
};
