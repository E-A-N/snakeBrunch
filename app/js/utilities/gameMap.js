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

gameMap.prototype.showMap = function(){
    console.log("...printing map", this.map);
    return this;
};

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
