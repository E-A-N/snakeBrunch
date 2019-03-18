const render = {};
render.init = (ctx, config) => {
    render.ctx = ctx;
    render.config = config;
    return render;
};
render.clean = () => {
     render.ctx.clearRect(0, 0, render.config.gameWidth, render.config.gameHeight);
     return render;
}
render.drawBorders = () => {
    //Draw the game border
    render.ctx.strokeRect(...render.config.frameCoords);
    return render;
};
render.drawScore = (score, level) => {
    const gCaption = `Score: ${score} ~ Level: ${level}`;
    render.ctx.fillText(gCaption, render.config.scoreBoard.xPos, render.config.scoreBoard.yPos);
    return render;
}
render.drawMap = (field) => {
    //Render the game object
    field.map.map( (row, y) => {
        row.map( (col, x) => {
            let coord = field.map[y][x];
            if (coord === 0) return;

            let block = render.config.renderer.blockSize;
            let yBoundry = Math.min(y * block + render.config.renderer.yOffset, render.config.renderer.yBoundry);
            let xBoundry = Math.min(x * block + render.config.renderer.xOffset, render.config.renderer.xBoundry);
            let blockGraphic = [xBoundry, yBoundry, block, block];
            let style = render.config.renderer.snakeColor;
            if (coord === field.legend.food){
                style = render.config.renderer.foodColor
            }
            render.ctx.fillStyle = style;
            render.ctx.fillRect(...blockGraphic);
        });
    });

    return render;
};
render.drawGameOver = (score) => {

  // Clear the canvas
  render.ctx.fillStyle = 'black';
  render.ctx.font = render.config.renderer.gameOverStyle;
  const gameOverText = [
      "Game Over!",
      ((render.config.gameWdith /2) - (render.ctx.measureText("Game Over!").width/2)),
      50
  ];
  render.ctx.fillText(...gameOverText);

  render.ctx.font = render.config.renderer.finalScoreStyle;
  const finalScoreText = [
      "Your Score Was " + score,
      ((render.config.gameWidth /2) - (render.ctx.measureText("Yoiur Score Was").width/2)),
      70
  ];
  render.ctx.fillText(...finalScoreText);

  console.log("Score has been drawn!!");
};
module.exports = (config, ctx) => {
    return render.init(config, ctx);
}




























//
