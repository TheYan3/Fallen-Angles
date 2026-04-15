const level1 = new Level(
   [new golem(), new minotaur(), new reaper(), new endboss()],
   [
      "img/Background/PNG/game_background_1/layers/clouds_2.png",
      "img/Background/PNG/game_background_1/layers/clouds_3.png",
      "img/Background/PNG/game_background_1/layers/clouds_4.png",
   ]
      .sort(() => Math.random() - 0.5)
      .map((path) => new cloud(path)),
   [
      new sky(-719),
      new sky(0),
      new sky(719),
      new sky(719 * 2),
      new sky(719 * 3),
   ],
   [
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_1.png",
         -719,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_2.png",
         -719,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_1.png",
         0,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_2.png",
         0,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_1.png",
         719,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_2.png",
         719,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_1.png",
         719 * 2,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_2.png",
         719 * 2,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_1.png",
         719 * 3,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_2.png",
         719 * 3,
      ),
   ],
   [
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
   ],
);
