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
    field.map.map( (row, y) => {
        row.map( (col, x) => {
            let coord = field.map[y][x];
            if (coord === 0) return;

            let block = self.config.renderer.blockSize;
            let yBoundry = Math.min(y * block + self.config.renderer.yOffset, self.config.renderer.yBoundry);
            let xBoundry = Math.min(x * block + self.config.renderer.xOffset, self.config.renderer.xBoundry);
            let blockGraphic = [xBoundry, yBoundry, block, block];
            let style = self.config.renderer.snakeColor;
            if (coord === field.legend.food){
                style = self.config.renderer.foodColor
            }
            self.ctx.fillStyle = style;
            self.ctx.fillRect(...blockGraphic);
        });
    });

    return this;
};
render.prototype.drawGameOver = function(score){

  // Clear the canvas
  this.ctx.fillStyle = 'black';
  this.ctx.font = this.config.renderer.gameOverStyle;
  const gameOverText = [
      "Game Over!",
      ((this.config.gameWdith /2) - (this.ctx.measureText("Game Over!").width/2)),
      50
  ];
  this.ctx.fillText(...gameOverText);

  this.ctx.font = this.config.renderer.finalScoreStyle;
  const finalScoreText = [
      "Your Score Was " + score,
      ((this.config.gameWidth /2) - (this.ctx.measureText("Yoiur Score Was").width/2)),
      70
  ];
  this.ctx.fillText(...finalScoreText);

  console.log("Score has been drawn!!");
};
module.exports = (config, ctx) => {
    return new render(config, ctx);
}




























//
