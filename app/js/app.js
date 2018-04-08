const render = require("./render.js");
module.exports = function () {

	const btn = document.getElementById('btn');
	btn.addEventListener("click", function(){
		console.log("Game Start Baybeh!!");
		render._run();
	});

	document.onkeydown = function(event) {
		const left = 37;
		const right = 39;
		const up = 38;
		const down = 40;

        keyCode = event.keyCode;

        switch(keyCode) {
	        case left:
				if (render.direction != 'right') {
					render.direction = 'left';
				}
				console.log('left');
			break;

	        case right:
				if (render.direction != 'left') {
					render.direction = 'right';
					console.log('right');
				}
			break;

	        case up:
				if (render.direction != 'down') {
					render.direction = 'up';
					console.log('up');
				}
			break;

	        case down:
				if (render.direction != 'up') {
					render.direction = 'down';
					console.log('down');
				}
			break;
		}
	}
};
