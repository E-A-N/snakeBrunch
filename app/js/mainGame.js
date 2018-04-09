module.exports = (config, ctx, renderer) => {
    var score = 495;
    var level = 0;
    var direction = 0;

    const snakeObj = require("./utilities/snakeObj.js")(config);
    const gameMap = require("./utilities/gameMap.js")(config);

    snakeObj.randomizePosition();
    gameMap.cleanMap()
        .generateFood()
        .printMatrix()
        .processSnake(snakeObj)
        .printMatrix()

    renderer(config, ctx, {score: score, level: level});
};
