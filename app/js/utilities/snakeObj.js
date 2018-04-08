const snakeObj = function(config){
    this.headPosition = [0,0]; // x,y
    this.size = config.snakeObj.defaultSize;
    this.body = [...Array(this.size).keys()]; //parts that follow snake head
    this.config = config;
};

snakeObj.prototype.randomizePosition = function(){
    const cols = this.config.gameMap.columns;
    const rows = this.config.gameMap.rows;
    var randomX = Math.round(Math.random() * cols - 1);
    var randomY = Math.round(Math.random() * rows - 1);
    //Make sure random coordinates are withing range of the array
    randomX = randomX < 0 ? 0 : randomX;
    randomY = randomY < 0 ? 0 : randomY;

    while (randomX - this.size < 0){
        randomX = Math.round(Math.random() * cols - 1);
        randomX = randomX < 0 ? 0 : randomX;
    };

    this.body = this.body.map( (part, order) => {
        return {x: randomX - order, y: randomY};
        //TODO mark the map with this body part
    })

    return [randomX, randomY];
}

module.exports = (config) => {
    return new snakeObj(config);
}
