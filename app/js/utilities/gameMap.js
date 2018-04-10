const gameMap = function(config) {
    this.map = [...Array(config.gameMap.columns).keys()];
    this.map = this.map.map((n) => {
        return [...Array(config.gameMap.rows).keys()];
    });
    this.foodPosition = null;

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
    snake.body.forEach( (b, index) => {
        console.log("Index is:",index);

        let isSnakeHead = index === 0;
        if (isSnakeHead){
            switch(b.direction){
              
            }

            const notInBounds = !(b.x < 0 || b.x >= 20 || b.y < 0 || b.y >= 20);
            if (notInBounds){
                return "gameOver";
            }
        }

        self.map[b.x][b.y] = 2;
    });
    console.log("Snake has been processed!!");
    return this;
}

gameMap.prototype.cleanMap = function(){
    this.map = this.map.map(x => {
        return x.map( y => {
            return 0;
        });
    });
    console.log("Map is cleaned!!");
    return this;
}

module.exports = (config) => {
    return new gameMap(config);
}
