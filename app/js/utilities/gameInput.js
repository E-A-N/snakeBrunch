let upCode = require("./jsKeyCodes/keyCodes.js")("up arrow");
let downCode = require("./jsKeyCodes/keyCodes.js")("down arrow");
let leftCode = require("./jsKeyCodes/keyCodes.js")("left arrow");
let rightCode = require("./jsKeyCodes/keyCodes.js")("right arrow");

let upKey  = require("./jsKeyCodes/keyboard.js")(upCode);
let downKey = require("./jsKeyCodes/keyboard.js")(downCode);
let leftKey = require("./jsKeyCodes/keyboard.js")(leftCode);
let rightKey = require("./jsKeyCodes/keyboard.js")(rightCode);


module.exports = (customKeys) => {
    let direction = -1; //numpad notation based direction

    if (Array.isArray(customKeys)){

    };

    if (upKey.isDown){
        direction = 8;
    };

    if (downKey.isDown){
        direction = 2;
    };

    if (leftKey.isDown){
        direction = 4;
    };

    if (rightKey.isDown){
        direction = 6;
    };

    return direction;
}
