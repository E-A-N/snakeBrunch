

module.exports = (config, ctx) => {
    var score = 7;
    var level = 1;
    var direction = 0;

    const snakeObj = require("./utilities/snakeObj.js")(config);
    const gameMap = require("./utilities/gameMap.js")(config);
    const renderer = require("./render.js")(ctx, config);

    snakeObj.randomizePosition();
    gameMap.cleanMap()
         .generateFood()
         .processSnake(snakeObj)
    //     .printMatrix()

    renderer.clean()
        .drawBorders()
        .drawScore(score, level)
        .drawMap(gameMap)
};
