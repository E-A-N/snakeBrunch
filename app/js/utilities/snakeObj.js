const snakeObj = function(config){
    this.headPosition = [0,0]; // x,y
    this.size = config.snakeObj.defaultSize;
    this.body = [...Array(this.size).keys()]; //parts that follow snake head
    this.config = config;
    this.dx = 0;
    this.dy = 0;
    this.direction = 5;
    this.directionStates = {
        up: 8,
        down: 2,
        left: 4,
        right: 6,
        neutral: 5
    };
};

snakeObj.prototype.init = function(){
    this.body = this.body.map( (part, order) => {
        var x = typeof part.x === "undefined" ? 0 : part.x;
        var y = typeof part.y === "undefined" ? 0 : part.y;
        var attributes = {
            x:x,
            y:y
       };
       var isHead = order === 0;
       if (isHead){
            //Add special property for head node
           attributes.direction = 0;
           attributes.dx = 0;
           attributes.dy = 0;
       }

        return attributes;
    })
}
snakeObj.prototype.randomizePosition = function(){
    const cols = this.config.gameMap.columns;
    const rows = this.config.gameMap.rows;
    var randomX = Math.round(Math.random() * cols - 1);
    var randomY = Math.round(Math.random() * rows - 1);
    //Make sure random coordinates are withing range of the array
    randomX = randomX < 0 ? 0 : randomX;
    randomY = randomY < 0 ? 0 : randomY;

    while (randomX - this.size < 0) {
        randomX = Math.round(Math.random() * cols - 1);
        randomX = randomX < 0 ? 0 : randomX;
    };

    //TODO mark the map with body parts that aren't the head
    this.body = this.body.map( (part, order) => {
        part.x = randomX - order;
        part.y = randomY
        console.log(part);
        return part;
    })

    this.headPosition = [randomX, randomY];
    return [randomX, randomY];
};
snakeObj.prototype.move = function(call){

    let head = this.body[0];

    //store current head position
    let previousNodePosition = {
        x: head.x,
        y: head.y
    };

    //Move initial head direction
    head.x += head.dx;
    head.y += head.dy;

    //every subsequent body part should inherit direciton of previous body part
    this.body = this.body.map( (node, order) => {
        let isNotHead = order !== 0;
        if (isNotHead){
            let nextNodePosition = {
                x: node.x,
                y: node.y
            };

            node.x = previousNodePosition.x;
            node.y = previousNodePosition.y;
            previousNodePosition = nextNodePosition;
        };

        return node;
    });

    return this;
};
snakeObj.prototype.setDirection = function (direction, call){
    let states = this.directionStates;
    switch(direction){
        case states.up:
                if (this.direction !== states.down){
                    this.body[0].dx = 0;
                    this.body[0].dy = -1;
                    this.direction = direction;
                }
        break;

        case states.down:
                if (this.direction !== states.up){
                    this.body[0].dx = 0;
                    this.body[0].dy = 1;
                    this.direction = direction;
                }
        break;

        case states.left:
                if (this.direction !== states.right){
                    this.body[0].dx = -1;
                    this.body[0].dy = 0;
                    this.direction = direction;
                }
        break;

        case states.right:
                if (this.direction !== states.left) {
                    this.body[0].dx = 1;
                    this.body[0].dy = 0;
                    this.direction = direction;
                }
        break;

        case -1:
        case states.netural:
            this.setDirection(this.direction);
        break;
    }


    return this;
};


module.exports = (config) => {
    return new snakeObj(config);
}
