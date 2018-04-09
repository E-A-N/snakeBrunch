module.exports = (config, stage, renderer) => {
    var score = 495;
    var level = 0;
    var direction = 0;

    const gameMap = require("./utilities/gameMap.js")(config);
    gameMap.cleanMap()
        .printMatrix()
        .printMatrix()
        .generateFood()
        .printMatrix()
        

    stage.clearRect(0, 0, config.gameWidth, config.gameHeight);
    renderer(config, stage, {score: score, level: level});
};
