const config = {};
config.myCanvas = document.getElementById('mycanvas'); //NOTE: change the canvas id to camelcase
config.ctx = myCanvas.getContext('2d');
config.w = 350;
config.h = 350;
config.score = 0;
config.snake;
config.snakeSize = 10;
config.food;

module.exports = config;
