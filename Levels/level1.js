function createLevel1() {
   return new Level(
      createEnemies(),
      createClouds(),
      createSkies(),
      createGroundObjects(),
      createRocks(),
      createPowerUps(2700),
   );
}

function createEnemies() {
   return [new golem(), new minotaur(), new reaper(), new endboss()];
}

function createClouds() {
   return getCloudPaths()
      .sort(() => Math.random() - 0.5)
      .map((path) => new cloud(path));
}

function getCloudPaths() {
   return [
      "img/Background/PNG/game_background_1/layers/clouds_2.png",
      "img/Background/PNG/game_background_1/layers/clouds_3.png",
      "img/Background/PNG/game_background_1/layers/clouds_4.png",
   ];
}

function createSkies() {
   return [-719, 0, 719, 719 * 2, 719 * 3].map((x) => new sky(x));
}

function createGroundObjects() {
   return getGroundPositions().flatMap((x) => createGroundPair(x));
}

function getGroundPositions() {
   return [-719, 0, 719, 719 * 2, 719 * 3];
}

function createGroundPair(x) {
   return getGroundPaths().map((path) => new groundObjects(path, x));
}

function getGroundPaths() {
   return [
      "img/Background/PNG/game_background_1/layers/rocks_1.png",
      "img/Background/PNG/game_background_1/layers/rocks_2.png",
   ];
}

function createRocks() {
   return [
      new rock(
         "img/Barrier/PNG/middle_lane_rocks2/middle_lane_rock2_1.png",
         300 + Math.random() * 500,
         null,
         false,
      ),
      new rock(
         "img/Barrier/PNG/middle_lane_rocks2/middle_lane_rock2_2.png",
         1000 + Math.random() * 2000,
         null,
         true,
      ),
   ];
}

function createPowerUps(levelEndX) {
   return [0, 1, 2].map((index) => {
      return new powerUp(
         getRandomPowerUpX(index, levelEndX),
         getRandomPowerUpY(),
      );
   });
}

function getRandomPowerUpX(index, levelEndX) {
   let minX = 220;
   let maxX = levelEndX - 220;
   let laneWidth = (maxX - minX) / 3;
   let laneStart = minX + index * laneWidth;
   let laneEnd = laneStart + laneWidth - 120;
   return laneStart + Math.random() * (laneEnd - laneStart);
}

function getRandomPowerUpY() {
   let groundY = gameSettings.canvasHeight - 110;
   let jumpHeight = getPlayerJumpHeight();
   let maxY = groundY - jumpHeight * 0.45;
   let minY = groundY - jumpHeight * 0.85;
   return minY + Math.random() * (maxY - minY);
}

function getPlayerJumpHeight() {
   let jumpSpeed = 17;
   let gravity = 0.6;
   return (jumpSpeed * jumpSpeed) / (2 * gravity);
}
