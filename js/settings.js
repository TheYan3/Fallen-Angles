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

   /**
    * Applies the configured canvas size.
    * @param {HTMLCanvasElement} canvas - Game canvas.
    */
   applyToCanvas(canvas) {
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
   },

   /**
    * Builds the canvas font string.
    * @param {number} size - Font size in pixels.
    * @returns {string}
    */
   getCanvasFont(size) {
      return `${this.fontWeight} ${size}px ${this.fontFamily}`;
   },

   /**
    * Restores normal speed and clock state.
    */
   resetTimeScale() {
      this.timeScale = 1;
      this.tickCounters = {};
      this.resetGameClock();
   },

   /**
    * Enables slow motion ticks.
    */
   startSlowMotion() {
      this.timeScale = this.slowMotionScale;
      this.tickCounters = {};
   },

   /**
    * Starts a fresh game clock.
    */
   resetGameClock() {
      this.isPaused = false;
      this.gameClockStartedAt = Date.now();
      this.pausedAt = 0;
      this.pausedDuration = 0;
   },

   /**
    * Freezes game-time based ticks.
    */
   pauseGame() {
      if (this.isPaused) return;
      this.isPaused = true;
      this.pausedAt = Date.now();
   },

   /**
    * Continues game-time based ticks.
    */
   resumeGame() {
      if (!this.isPaused) return;
      this.pausedDuration += Date.now() - this.pausedAt;
      this.pausedAt = 0;
      this.isPaused = false;
      this.tickCounters = {};
   },

   /**
    * Returns elapsed active game time.
    * @returns {number}
    */
   getGameTime() {
      let now = this.isPaused ? this.pausedAt : Date.now();
      return now - this.gameClockStartedAt - this.pausedDuration;
   },

   /**
    * Checks if a scaled tick should run.
    * @param {string} key - Unique tick counter key.
    * @returns {boolean}
    */
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
