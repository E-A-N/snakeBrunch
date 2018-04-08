const gameMap = function(config) {
    this.map = new Array(config.gameMap.columns);
    console.log(this.map);
    this.map = this.map.map((n) =>{
        const newRay = new Array(config.gameMap.rows);
        newRay.fill(0,0);
        return newRay;
    });
    //this.map[4] = "Hi!!";
    console.log(this.map);

    this.config = config;
};

gameMap.prototype.generateFood = function(map){
    var randomX = Math.round(Math.random() * this.config.gameMap.columns - 1);
    var randomY = Math.round(Math.random() * this.config.gameMap.rows - 1);

    //TODO find out what the fuck constant "2" is!!!???
    while (this.map[randomX][randomY] === 2){
        randomX = Math.round(Math.random() * this.config.gameMap.columns - 1);
        var randomY = Math.round(Math.random() * this.config.gameMap.rows - 1);
    }

    //TODO also find out what the fuck constant "1" is!!!???
    this.map[randomX][randomY] = 1;

    return this; //setup method chaining
};

gameMap.prototype.showMap = function(){
    console.log("...printing map", this.map);
    this.map.forEach(n => {
        console.log(n);
        1 + 1;
    })

    return this;
}

module.exports = (config) => {
    return new gameMap(config);
}
