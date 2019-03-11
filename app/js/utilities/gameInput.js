let upCode = require("./jsKeyCodes/keyCodes.js")("up arrow");
let downCode = require("./jsKeyCodes/keyCodes.js")("down arrow");
let leftCode = require("./jsKeyCodes/keyCodes.js")("left arrow");
let rightCode = require("./jsKeyCodes/keyCodes.js")("right arrow");

let upKey  = require("./jsKeyCodes/keyboard.js")(upCode);
let downKey = require("./jsKeyCodes/keyboard.js")(downCode);
let leftKey = require("./jsKeyCodes/keyboard.js")(leftCode);
let rightKey = require("./jsKeyCodes/keyboard.js")(rightCode);

//
let gameControls = {};
gameControls.currentInput = -1;
gameControls.inputs = {
    up: {
        button: upKey,
        numbercode: 8
    },
    down: {
        button: downKey,
        numbercode: 2
    },
    left: {
        button: leftKey,
        numbercode: 4
    },
    right: {
        button: rightKey,
        numbercode: 6
    }
};
gameControls.assignInputCommands = (call) => {
    let ins = Object.keys(gameControls.inputs);
    ins.forEach((input) => {
        gameControls.inputs[input].button.press = () => {
            gameControls.currentInput = gameControls.inputs[input].numbercode;
        }
    });
}
gameControls.getLastValidInput = () => {
    return gameControls.currentInput;
}
gameControls.init = (customKeys) => {
    if (Array.isArray(customKeys)){
        //assign custom keys here
    };
    gameControls.assignInputCommands();

    return gameControls;
};

module.exports = gameControls.init;
