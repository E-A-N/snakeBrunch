const render = function(ctx, config) {
    this.ctx = ctx;
    this.config = config;
};
render.prototype.clean = function(){
     this.ctx.clearRect(0, 0, this.config.gameWidth, this.config.gameHeight);
     return this;
}
render.prototype.drawBorders = function(){
    //Draw the game border
    this.ctx.strokeRect(...this.config.frameCoords);
    return this;
};
render.prototype.drawScore = function(score, level){
    const gCaption = `Score: ${score} ~ Level: ${level}`;
    this.ctx.fillText(gCaption, this.config.scoreBoard.xPos, this.config.scoreBoard.yPos);
    return this;
}
render.prototype.drawMap = function(field){
    //Render the game object
    const self = this;
    field.map.map( (col, x) => {
        col.map( (row, y) => {
            let coord = field.map[x][y];
            if (coord === 0) return;

            let block = self.config.renderer.blockSize;
            let yBoundry = Math.min(y * block + self.config.renderer.yOffset, self.config.renderer.yBoundry);
            let xBoundry = Math.min(x * block + self.config.renderer.xOffset, self.config.renderer.xBoundry);
            let blockGraphic = [xBoundry, yBoundry, block, block];

            self.ctx.fillStyle = coord === 1 ? self.config.renderer.foodColor : self.config.renderer.snakeColor;
            self.ctx.fillRect(...blockGraphic);
        });
    });

    return this;
};

module.exports = (config, ctx, score = 0, level = 0) => {
    return new render(config, ctx, score, level);
}




























//
