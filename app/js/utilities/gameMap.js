const gameMap = function(config) {
    this.map = new Array(config.gameMap.columns);
    this.map = this.map.map((n) =>{
        n = new Array(config.gameMap.rows);
    });
};

gameMap.prototype.generateFood = function(map){};
module.exports = (config) => {
    return new gameMap(config);
}
