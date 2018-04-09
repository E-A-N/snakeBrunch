const render = (config, ctx, args = {}) => {

    const score = args.score;
    const level = args.level;
    const hasScore = typeof args.score !== "undefined";
    const hasLevel = typeof args.level !== "undefined";

    //clear the canvas
    ctx.clearRect(0, 0, config.gameWidth, config.gameHeight);

    //Style the context UI
    ctx.strokeRect(...config.frameCoords);

    //Set Game Caption
    if (hasScore && hasLevel) {
      const gCaption = `Score: ${score} ~ Level: ${level}`;
      ctx.fillText(gCaption, config.scoreBoard.xPos, config.scoreBoard.yPos);
    }
}

module.exports = (config, ctx, score = 0, level = 0) => {
    return (config, ctx, score, level) => {
        render(config, ctx, score, level);
    }
}
