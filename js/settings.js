const gameSettings = {
   canvasWidth: 720,
   canvasHeight: 480,
   gameSpeed: 3,
   timeScale: 1,
   slowMotionScale: 0.5,
   tickCounters: {},
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

   resetTimeScale() {
      this.timeScale = 1;
      this.tickCounters = {};
   },

   startSlowMotion() {
      this.timeScale = this.slowMotionScale;
      this.tickCounters = {};
   },

   shouldRunTick(key) {
      if (this.timeScale >= 1) {
         return true;
      }

      let tickInterval = Math.round(1 / this.timeScale);
      this.tickCounters[key] = (this.tickCounters[key] || 0) + 1;
      return this.tickCounters[key] % tickInterval === 0;
   },
};
