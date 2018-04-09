const render = (config, ctx, field, args = {}) => {

    const score = args.score;
    const level = args.level;
    const hasScore = typeof args.score !== "undefined";
    const hasLevel = typeof args.level !== "undefined";

    //clear the canvas
    ctx.clearRect(0, 0, config.gameWidth, config.gameHeight);

    //Draw the game border
    ctx.strokeRect(...config.frameCoords);

    //Draw the game caption
    if (hasScore && hasLevel) {
        const gCaption = `Score: ${score} ~ Level: ${level}`;
        ctx.fillText(gCaption, config.scoreBoard.xPos, config.scoreBoard.yPos);
    }

    //Render the game object
    field.map.map( (col, x) => {
        col.map( (row , y) => {
            let coord = field.map[x][y];
            if (coord === 0) return;

            let block = config.renderer.blockSize;
            let yBoundry = Math.min(y * block + config.renderer.yOffset, config.renderer.yBoundry);
            let xBoundry = Math.min(x * block + config.renderer.xOffset, config.renderer.xBoundry);
            let blockGraphic = [xBoundry, yBoundry, block, block];

            ctx.fillStyle = coord === 1 ? config.renderer.foodColor : config.renderer.snakeColor;
            ctx.fillRect(...blockGraphic);
        });
    });


}

module.exports = (config, ctx, score = 0, level = 0) => {
    return (config, ctx, score, level) => {
        render(config, ctx, score, level);
    }
}




























//
