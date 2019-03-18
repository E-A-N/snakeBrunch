

module.exports = (config, ctx) => {

    const userHack  = require("./utilities/userHack.js")(config);
    const snakeObj  = require("./utilities/snakeObj.js")(config);
    const gameMap   = require("./utilities/gameMap.js")(config);
    const renderer  = require("./render.js")(ctx, config);
    const gameInput = require("./utilities/gameInput.js")();
    const referee   = require("./utilities/referee.js");


    referee
        .init(config)
        .addParticipant(snakeObj)
        .addParticipant(gameMap)


    //Should always be called first
    const gameInit = (call) => {
        snakeObj.randomizePosition();
        gameMap
            .cleanMap()
            .generateFood()
            .processSnake(snakeObj)
        //  .printMatrix()

        renderer
            .clean()
            .drawBorders()
            .drawScore(referee)
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
            .processSnake(snakeObj)
            .foodCollision(snakeObj, referee);

        //render game
        renderer
            .clean()
            .drawBorders()
            .drawScore(referee)
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
