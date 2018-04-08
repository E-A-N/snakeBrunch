module.exports = (config, stage, renderer) => {
    var score = 495;
    var level = 0;
    var direction = 0;

    const gameMap = require("./utilities/gameMap.js")(config);
    //
    gameMap.generateFood(gameMap.map)
      .showMap();


    stage.clearRect(0, 0, config.gameWidth, config.gameHeight);
    renderer(config, stage, {score: score, level: level});
};
