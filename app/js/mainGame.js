

module.exports = (config, ctx) => {
    var score = 7;
    var level = 1;
    var direction = 0;

    const snakeObj = require("./utilities/snakeObj.js")(config);
    const gameMap = require("./utilities/gameMap.js")(config);
    const renderer = require("./render.js")(ctx, config);
    const gameInput = require("./utilities/gameInput.js")();
    const referee   = require("./utilities/referee.js");

    referee
        .addParticipant(snakeObj)
        .addParticipant(gameMap)


    //Should always be called first
    const gameInit = (call) => {
        snakeObj.init();
        snakeObj.randomizePosition();
        gameMap
            .cleanMap()
            .generateFood()
            .processSnake(snakeObj)
        //  .printMatrix()

        renderer
            .clean()
            .drawBorders()
            .drawScore(score, level)
            .drawMap(gameMap);

        if (typeof call === "function"){
            call(snakeObj, gameMap);
        }
    }

    const gameUpdate = () => {
        requestAnimationFrame(gameCycle);
        //console.log("Starting Game Cycle!");
        let input = gameInput.getLastValidInput();
        //handle snake player
        snakeObj
            .setDirection(input)
            .move();

        //Process prepare map coordinates for renderer
        gameMap
            .cleanMap()
            .processFood()
            .processSnake(snakeObj);

        //render game
        renderer
            .clean()
            .drawBorders()
            .drawScore(score, level)
            .drawMap(gameMap);

        if (typeof call === "function"){
            call(snakeObj, gameMap);
        };

    }
    const gameCycle = () => {
        let second = 1000;
        let fps    = 5;
        return setTimeout(gameUpdate, second/fps);
    };

    return {
        snake: snakeObj,
        map: gameMap,
        renderer: renderer,
        init: gameInit,
        cycle: gameUpdate
    };
};
