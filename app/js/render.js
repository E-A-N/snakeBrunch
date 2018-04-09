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
            let coordinate = field.map[x][y];
            switch (coordinate){
                case 1:
                    ctx.fillStyle = config.renderer.foodColor;
                    let block = config.renderer.blockSize;
                    let yBoundry = Math.max(y * block + config.renderer.yOffset, 180);        
                    console.log("Y coord is:",yBoundry)
                    let  foodGraphic = [x * block, yBoundry, block, block];
                    ctx.fillRect(...foodGraphic);
                break;

                case 2:
                    ctx.fillStyle = config.renderer.snakeColor;
                    let block = config.renderer.blockSize;
                    let yBoundry = Math.max(y * block + config.renderer.yOffset, 180);
                    console.log("Y coord is:",yBoundry);
                    let snakeGraphic = [x * block, yBoundry, block, block];
                    ctx.fillRect(...snakeGraphic);
                break;
            }
        });
    });


}

module.exports = (config, ctx, score = 0, level = 0) => {
    return (config, ctx, score, level) => {
        render(config, ctx, score, level);
    }
}




























//
