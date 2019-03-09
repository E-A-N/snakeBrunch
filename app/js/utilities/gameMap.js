const gameMap = function(config) {
    this.map = [...Array(config.gameMap.columns).keys()];
    this.map = this.map.map((n) => {
        return [...Array(config.gameMap.rows).keys()];
    });
    this.foodPosition = null;
    this.states = {
        gamePlay: 0,
        gameOver: 1
    };
    this.currentState = this.states.gamePlay;

    this.config = config;
};

gameMap.prototype.generateFood = function(){
    const cols = this.config.gameMap.columns;
    const rows = this.config.gameMap.rows;
    var randomX = Math.round(Math.random() * cols - 1);
    var randomY = Math.round(Math.random() * rows - 1);
    //Make sure random coordinates are withing range of the array
    randomX = randomX < 0 ? 0 : randomX;
    randomY = randomY < 0 ? 0 : randomY;

    //TODO find out what the fuck constant "2" is!!!???
    while (this.map[randomX][randomY] === 2){
        randomX = Math.round(Math.random() * cols - 1);
        randomY = Math.round(Math.random() * rows - 1);
        randomX = randomX < 0 ? 0 : randomX;
        randomY = randomY < 0 ? 0 : randomY;
    }

    //TODO also find out what the fuck constant "1" is!!!???
    this.map[randomX][randomY] = 1;

    //const foodPosition = `Food Position X: ${randomX} Y: ${randomY}`;
    //console.log(foodPosition);
    this.foodPosition = [randomX, randomY];

    return this; //setup method chaining
};

gameMap.prototype.printMatrix = function(){
    var y = 0;
    var trix = '';
    while (y < this.config.gameMap.rows){
        for (var x = 0; x < this.map.length; x++){
            trix = trix + this.map[x][y].toString();
        }
        trix = trix + "\n";
        y++;
    }
    console.clear();
    console.log("~~~~~printing matrix~~~~~");
    console.log(trix);

    return this;
};

gameMap.prototype.processSnake = function(snake){
    var self = this;
    snake.body.forEach( (node, index) => {

        let isSnakeHead = index === 0;
        if (isSnakeHead) {
            const right = 0;
            const left  = 1;
            const up    = 2;
            const down  = 3;
            switch(node.direction) {
                case right:
                    node.dx = 1;
                    node.dy = 0;
                break;

                case left:
                    node.dx = -1;
                    node.dy = 0;
                break;

                case up:
                    node.dx = 0;
                    node.dy = -1;
                break;

                case down:
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
                self.currentState = self.states.gameOver;
            }
        }

        if (self.currentState === self.states.gamePlay) {
            self.map[node.x][node.y] = 2;
        }
    });
    //console.log("Snake has been processed!!", snake.body[0].x, snake.body[0].y);
    return this; //check gameOver state afterwards
}

gameMap.prototype.cleanMap = function(){
    this.map = this.map.map(x => {
        return x.map( y => {
            return 0;
        });
    });
    //console.log("Map is cleaned!!");
    return this;
}

module.exports = (config) => {
    return new gameMap(config);
}
