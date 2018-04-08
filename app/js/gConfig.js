const width = 200;
const height = 200;
const _lineWidth = 2;
const stroke = "black";
const widthPadding = _lineWidth * 2;
const heightPadding = 24;
const scoreX = width / 4;
const scoreY = 12;

const config = {
    domID: "gameContainer",
    gameWidth: width + widthPadding,
    gameHeight: height + heightPadding,
    style: {
        lineWidth: _lineWidth,
        strokeStyle: stroke
    },
    frameCoords: [
        _lineWidth, //x
        20, //y
        width - widthPadding, //frame width
        height - heightPadding //frame height
    ],
    scoreBoard:{
        style : "14px Arial",
        xPos: scoreX,
        yPos: scoreY
    }
}

module.exports = config;
