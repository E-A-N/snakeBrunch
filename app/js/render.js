const render = (config, stage, args = {}) => {
    const score = args.score;
    const level = args.level;
    const hasScore = typeof args.score !== "undefined";
    const hasLevel = typeof args.level !== "undefined";

    //Style the stage UI
    stage.strokeRect(...config.frameCoords);

    //Set Game Caption
    if (hasScore && hasLevel) {
      const gCaption = `Score: ${score} ~ Level: ${level}`;
      stage.fillText(gCaption, config.scoreBoard.xPos, config.scoreBoard.yPos);
    }
}

module.exports = (config, stage, score = 0, level = 0) => {
    return (config, stage, score, level) => {
        render(config, stage, score, level);
    }
}
