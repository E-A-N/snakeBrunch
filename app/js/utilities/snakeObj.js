const snakeObj = {};

snakeObj.init = (config) => {
    snakeObj.headPosition = [0,0]; // x,y
    snakeObj.size = config.snakeObj.defaultSize;
    snakeObj.body = [...Array(snakeObj.size).keys()]; //parts that follow snake head
    snakeObj.config = config;
    snakeObj.dx = 0;
    snakeObj.dy = 0;
    snakeObj.direction = 5;
    snakeObj.directionStates = {
        up: 8,
        down: 2,
        left: 4,
        right: 6,
        neutral: 5
    };
    snakeObj.body = snakeObj.body.map( (part, order) => {
        let x = typeof part.x === "undefined" ? 0 : part.x;
        let y = typeof part.y === "undefined" ? 0 : part.y;
        let attributes = {
            x:x,
            y:y
       };
       let isHead = order === 0;
       if (isHead){
            //Add special property for head node
           attributes.direction = 0;
           attributes.dx = 0;
           attributes.dy = 0;
       }

        return attributes;
    });

    return snakeObj;
}
snakeObj.randomizePosition = () => {
    const cols = snakeObj.config.gameMap.columns;
    const rows = snakeObj.config.gameMap.rows;
    let randomX = Math.round(Math.random() * cols - 1);
    let randomY = Math.round(Math.random() * rows - 1);
    //Make sure random coordinates are withing range of the array
    randomX = randomX < 0 ? 0 : randomX;
    randomY = randomY < 0 ? 0 : randomY;

    while (randomX - snakeObj.size < 0) {
        randomX = Math.round(Math.random() * cols - 1);
        randomX = randomX < 0 ? 0 : randomX;
    };

    //TODO mark the map with body parts that aren't the head
    snakeObj.body = snakeObj.body.map( (part, order) => {
        part.x = randomX - order;
        part.y = randomY
        console.log(part);
        return part;
    })

    snakeObj.headPosition = [randomX, randomY];
    return [randomX, randomY];
};
snakeObj.move = (call) => {

    let head = snakeObj.body[0];

    //store current head position
    let previousNodePosition = {
        x: head.x,
        y: head.y
    };

    //Move initial head direction
    head.x += head.dx;
    head.y += head.dy;

    //every subsequent body part should inherit direciton of previous body part
    snakeObj.body = snakeObj.body.map( (node, order) => {
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

    return snakeObj;
};
snakeObj.setDirection = (direction, call) => {
    let states = snakeObj.directionStates;
    switch(direction){
        case states.up:
                if (snakeObj.direction !== states.down){
                    snakeObj.body[0].dx = 0;
                    snakeObj.body[0].dy = -1;
                    snakeObj.direction = direction;
                }
        break;

        case states.down:
                if (snakeObj.direction !== states.up){
                    snakeObj.body[0].dx = 0;
                    snakeObj.body[0].dy = 1;
                    snakeObj.direction = direction;
                }
        break;

        case states.left:
                if (snakeObj.direction !== states.right){
                    snakeObj.body[0].dx = -1;
                    snakeObj.body[0].dy = 0;
                    snakeObj.direction = direction;
                }
        break;

        case states.right:
                if (snakeObj.direction !== states.left) {
                    snakeObj.body[0].dx = 1;
                    snakeObj.body[0].dy = 0;
                    snakeObj.direction = direction;
                }
        break;

        case -1:
        case states.netural:
            snakeObj.setDirection(snakeObj.direction);
        break;
    }


    return snakeObj;
};
snakeObj.appendNode = () => {
    const size = snakeObj.body.length;
    snakeObj.body.push({
        x: snakeObj.body[size - 1].x,
        y: snakeObj.body[size - 1].y
    });

    console.log("body exteneded!!");
    return snakeObj;
}

module.exports = (config) => {
    return snakeObj.init(config);
}
