const gameMap = {};
gameMap.init = (config) => {
    gameMap.map = [...Array(config.gameMap.columns).keys()];
    gameMap.map = gameMap.map.map((n) => {
        return [...Array(config.gameMap.rows).keys()];
    });
    gameMap.legend = {
        empty: 0,
        food: 1,
        snakeHead: 2,
        snakeBody: 3
    }
    gameMap.foodPosition = null;
    gameMap.states = {
        gamePlay: 0,
        gameOver: 1
    };
    gameMap.currentState = gameMap.states.gamePlay;

    gameMap.config = config;

    return gameMap;
}

gameMap.generateFood = () => {
    const cols = gameMap.config.gameMap.columns;
    const rows = gameMap.config.gameMap.rows;
    let randomX = Math.round(Math.random() * cols - 1);
    let randomY = Math.round(Math.random() * rows - 1);
    //Make sure random coordinates are withing range of the array
    randomX = Math.max(0, randomX);
    randomY = Math.max(0, randomY);
    //randomX = randomX < 0 ? 0 : randomX;
    //randomY = randomY < 0 ? 0 : randomY;

    //TODO find out what the fuck constant "2" is!!!???
    while (gameMap.map[randomY][randomX] !== gameMap.legend.empty){
        randomX = Math.round(Math.random() * cols - 1);
        randomY = Math.round(Math.random() * rows - 1);
        randomX = randomX < 0 ? 0 : randomX;
        randomY = randomY < 0 ? 0 : randomY;
        console.log("Food search on coord:", randomX, randomY);
    }

    //TODO also find out what the fuck constant "1" is!!!???
    gameMap.map[randomY][randomX] = gameMap.legend.food;

    //const foodPosition = `Food Position X: ${randomX} Y: ${randomY}`;
    //console.log(foodPosition);
    gameMap.foodPosition = [randomX, randomY];

    return gameMap; //setup method chaining
};
gameMap.processFood = () => {
    let foodY = gameMap.foodPosition[1];
    let foodX = gameMap.foodPosition[0];
    gameMap.map[foodY][foodX] = gameMap.legend.food;
    return gameMap;
}
gameMap.printMatrix = () => {
    let y = 0;
    let trix = '';
    while (y < gameMap.config.gameMap.rows){
        for (let x = 0; x < gameMap.map.length; x++){
            trix = trix + gameMap.map[x][y].toString();
        }
        trix = trix + "\n";
        y++;
    }
    console.clear();
    console.log("~~~~~printing matrix~~~~~");
    console.log(trix);

    return gameMap;
};

gameMap.processSnake = (snake) => {
    snake.body.forEach( (node, index) => {

        let isSnakeHead = index === 0;
        if (isSnakeHead) {
            let states = snake.directionStates;
            switch(node.direction) {
                case states.right:
                    node.dx = 1;
                    node.dy = 0;
                break;

                case states.left:
                    node.dx = -1;
                    node.dy = 0;
                break;

                case states.up:
                    node.dx = 0;
                    node.dy = -1;
                break;

                case states.down:
                    node.dx = 0;
                    node.dy = 1;
                break;


            }
            //console.log("head is:", node);
            let yOffset = node.y + node.dy;
            let xOffset = node.x + node.dx;
            const notInBounds = (node.x < 0 || xOffset > 20 || node.y < 0 || yOffset > 17); //TODO: set explicit stage coordinates in config
            if (notInBounds){
                console.log("Game over!");
                gameMap.currentState = gameMap.states.gameOver;
            }
        }

        if (gameMap.currentState === gameMap.states.gamePlay) {
            gameMap.map[node.y][node.x] = 2;
        }
    });
    //console.log("Snake has been processed!!", snake.body[0].x, snake.body[0].y);
    return gameMap; //check gameOver state afterwards
}

gameMap.cleanMap = () => {
    gameMap.map = gameMap.map.map(x => {
        return x.map( y => {
            return gameMap.legend.empty;
        });
    });

    return gameMap;
}

module.exports = (config) => {
    return gameMap.init(config);
}
