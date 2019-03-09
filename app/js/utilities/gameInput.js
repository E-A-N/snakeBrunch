let keycode = require("./jsKeyCodes/keyCodes.js")("up arrow");
window.upKey  = require("./jsKeyCodes/keyboard.js")(keycode);

console.log(keycode, upKey, window);
module.exports = (customKeys) => {
    let inputs = {
        x: 0,
        y: 0
    };

    if (Array.isArray(customKeys)){

    };

    if (upKey.isDown){
        console.log("You're pressing upkey!!!");
        inputs.y = -1;
    };

    return inputs;
}
