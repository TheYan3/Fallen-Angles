const level1 = new Level(
   [new golem(), new minotaur(), new reaper(), new endboss()],
   [
      "img/Background/PNG/game_background_1/layers/clouds_2.png",
      "img/Background/PNG/game_background_1/layers/clouds_3.png",
      "img/Background/PNG/game_background_1/layers/clouds_4.png",
   ]
      .sort(() => Math.random() - 0.5)
      .map((path) => new cloud(path)),
   [new sky(-719), new sky(0), new sky(719), new sky(1439)],
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
         1439,
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_2.png",
         1439,
      ),
   ],
);
