const gameSettings = {
   canvasWidth: 720,
   canvasHeight: 480,
   gameSpeed: 3,
   timeScale: 1,
   slowMotionScale: 0.5,
   tickCounters: {},
   isPaused: false,
   gameClockStartedAt: Date.now(),
   pausedAt: 0,
   pausedDuration: 0,
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
      this.resetGameClock();
   },

   startSlowMotion() {
      this.timeScale = this.slowMotionScale;
      this.tickCounters = {};
   },

   resetGameClock() {
      this.isPaused = false;
      this.gameClockStartedAt = Date.now();
      this.pausedAt = 0;
      this.pausedDuration = 0;
   },

   pauseGame() {
      if (this.isPaused) return;
      this.isPaused = true;
      this.pausedAt = Date.now();
   },

   resumeGame() {
      if (!this.isPaused) return;
      this.pausedDuration += Date.now() - this.pausedAt;
      this.pausedAt = 0;
      this.isPaused = false;
      this.tickCounters = {};
   },

   getGameTime() {
      let now = this.isPaused ? this.pausedAt : Date.now();
      return now - this.gameClockStartedAt - this.pausedDuration;
   },

   shouldRunTick(key) {
      if (this.isPaused) {
         return false;
      }

      if (this.timeScale >= 1) {
         return true;
      }

      let tickInterval = Math.round(1 / this.timeScale);
      this.tickCounters[key] = (this.tickCounters[key] || 0) + 1;
      return this.tickCounters[key] % tickInterval === 0;
   },
};
