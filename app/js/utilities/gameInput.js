let keycode = require("./jsKeyCodes/keyCodes.js")["up arrow"];
let upKey   = require("./jsKeyCodes/keyboard.js")(keycode);
if (upKey.isDown){
    console.log("You're pressing upkey!!!");
};
console.log(keycode, upKey);
