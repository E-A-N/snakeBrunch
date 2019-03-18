module.exports = (config) => {
    let query  = new URLSearchParams(window.location.search);
    let level      = Number(query.get("level"))      || null;
    let snakeColor = query.get("snakeColor") || null;
    let foodColor  = query.get("foodColor")  //|| null;

    if (config.custom.hackable === true){
        config.custom.level = level;
        config.custom.snakeColor = snakeColor;
        config.custom.foodColor  = foodColor;

        if (snakeColor !== null) {
            config.renderer.snakeColor = snakeColor;
        }
        if (foodColor !== null){
            config.renderer.foodColor  = foodColor;
        }
    }
}
