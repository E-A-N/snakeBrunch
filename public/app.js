(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // do your setup here
  console.log('Initialized app');

  var config = require("./js/config.js");
  var stage = require("./js/stageUI.js")(config);

  var main = require("./js/mainGame.js")(config, stage);
  main.init();
  main.cycle();
  console.log("Main is:", main);
  window._main = main; //TODO: for testing only

});
});

require.register("js/config.js", function(exports, require, module) {
"use strict";

var width = 200;
var height = 200;
var _lineWidth = 2;
var stroke = "black";
var widthPadding = _lineWidth * 2;
var heightPadding = 24;
var scoreX = width / 4;
var scoreY = 12;

var config = {
    domID: "gameContainer",
    gameWidth: width + widthPadding,
    gameHeight: height + heightPadding,
    style: {
        lineWidth: _lineWidth,
        strokeStyle: stroke
    },
    frameCoords: [_lineWidth, //x
    20, //y
    width - widthPadding, //frame width
    height - heightPadding //frame height
    ],
    scoreBoard: {
        style: "14px Arial",
        xPos: scoreX,
        yPos: scoreY
    },
    snakeObj: {
        defaultSize: 3
    },
    snakeDirections: {
        default: 0,
        right: 0,
        left: 1,
        down: 2,
        up: 3
    },
    renderer: {
        yOffset: 20,
        xOffset: 3,
        yBoundry: 185,
        xBoundry: 187,
        blockSize: 10,
        foodColor: "red",
        snakeColor: "green",
        gameOverStyle: '16px Arial',
        finalScoreStyle: "20px sans-serif"
    }
};

config.gameMap = {
    rows: height / 10,
    columns: width / 10,
    legend: {
        empty: 0,
        food: 1,
        snakeHead: 2,
        snakeBody: 3
    },
    states: {
        gamePlay: 0,
        gameOver: 1
    },
    foodPosition: -1
};

config.custom = {
    hackable: true
};

module.exports = config;
});

require.register("js/mainGame.js", function(exports, require, module) {
"use strict";

module.exports = function (config, ctx) {

    var userHack = require("./utilities/userHack.js")(config);
    var snakeObj = require("./utilities/snakeObj.js")(config);
    var gameMap = require("./utilities/gameMap.js")(config);
    var renderer = require("./render.js")(ctx, config);
    var gameInput = require("./utilities/gameInput.js")();
    var referee = require("./utilities/referee.js");

    referee.init(config).addParticipant(snakeObj).addParticipant(gameMap);

    //Should always be called first
    var gameInit = function gameInit(call) {
        snakeObj.randomizePosition();
        gameMap.cleanMap().generateFood().processSnake(snakeObj);
        //  .printMatrix()

        renderer.clean().drawBorders().drawScore(referee).drawMap(gameMap);

        if (typeof call === "function") {
            call(snakeObj, gameMap);
        }
    };

    var gameUpdate = function gameUpdate() {
        requestAnimationFrame(gameCycle);
        //console.log("Starting Game Cycle!");
        var input = gameInput.getLastValidInput();
        //handle snake player
        snakeObj.setDirection(input).move();

        //Process prepare map coordinates for renderer
        gameMap.cleanMap().processFood().processSnake(snakeObj).foodCollision(snakeObj, referee);

        //render game
        renderer.clean().drawBorders().drawScore(referee).drawMap(gameMap);

        if (typeof call === "function") {
            call(snakeObj, gameMap);
        };
    };
    var gameCycle = function gameCycle() {
        var second = 1000;
        var fps = 5;
        return setTimeout(gameUpdate, second / fps);
    };

    return {
        snake: snakeObj,
        map: gameMap,
        renderer: renderer,
        init: gameInit,
        cycle: gameUpdate
    };
};
});

require.register("js/render.js", function(exports, require, module) {
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var render = {};
render.init = function (ctx, config) {
    render.ctx = ctx;
    render.config = config;
    return render;
};
render.clean = function () {
    render.ctx.clearRect(0, 0, render.config.gameWidth, render.config.gameHeight);
    return render;
};
render.drawBorders = function () {
    var _render$ctx;

    //Draw the game border
    (_render$ctx = render.ctx).strokeRect.apply(_render$ctx, _toConsumableArray(render.config.frameCoords));
    return render;
};
render.drawScore = function (ref) {
    var score = ref.score;
    var level = ref.level;
    var gCaption = "Score: " + score + " ~ Level: " + level;
    render.ctx.fillText(gCaption, render.config.scoreBoard.xPos, render.config.scoreBoard.yPos);
    return render;
};
render.drawMap = function (field) {
    //Render the game object
    field.map.map(function (row, y) {
        row.map(function (col, x) {
            var _render$ctx2;

            var coord = field.map[y][x];
            if (coord === 0) return;

            var block = render.config.renderer.blockSize;
            var yBoundry = Math.min(y * block + render.config.renderer.yOffset, render.config.renderer.yBoundry);
            var xBoundry = Math.min(x * block + render.config.renderer.xOffset, render.config.renderer.xBoundry);
            var blockGraphic = [xBoundry, yBoundry, block, block];
            var style = render.config.renderer.snakeColor;
            if (coord === field.legend.food) {
                style = render.config.renderer.foodColor;
            }
            render.ctx.fillStyle = style;
            (_render$ctx2 = render.ctx).fillRect.apply(_render$ctx2, blockGraphic);
        });
    });

    return render;
};
render.drawGameOver = function (score) {
    var _render$ctx3, _render$ctx4;

    // Clear the canvas
    render.ctx.fillStyle = 'black';
    render.ctx.font = render.config.renderer.gameOverStyle;
    var gameOverText = ["Game Over!", render.config.gameWdith / 2 - render.ctx.measureText("Game Over!").width / 2, 50];
    (_render$ctx3 = render.ctx).fillText.apply(_render$ctx3, gameOverText);

    render.ctx.font = render.config.renderer.finalScoreStyle;
    var finalScoreText = ["Your Score Was " + score, render.config.gameWidth / 2 - render.ctx.measureText("Your Score Was").width / 2, 70];
    (_render$ctx4 = render.ctx).fillText.apply(_render$ctx4, finalScoreText);
    console.log("Score has been drawn!!");

    return render;
};
module.exports = function (config, ctx) {
    return render.init(config, ctx);
};

//
});

;require.register("js/stageUI.js", function(exports, require, module) {
"use strict";

module.exports = function (config) {
    //Construct the UI
    var div = document.createElement("div");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.setAttribute("width", config.gameWidth);
    canvas.setAttribute("height", config.gameHeight);
    canvas.setAttribute("id", config.domID);

    div.appendChild(canvas);
    document.body.appendChild(div);

    return ctx;
};
});

;require.register("js/utilities/gameInput.js", function(exports, require, module) {
"use strict";

var upCode = require("./jsKeyCodes/keyCodes.js")("up arrow");
var downCode = require("./jsKeyCodes/keyCodes.js")("down arrow");
var leftCode = require("./jsKeyCodes/keyCodes.js")("left arrow");
var rightCode = require("./jsKeyCodes/keyCodes.js")("right arrow");

var upKey = require("./jsKeyCodes/keyboard.js")(upCode);
var downKey = require("./jsKeyCodes/keyboard.js")(downCode);
var leftKey = require("./jsKeyCodes/keyboard.js")(leftCode);
var rightKey = require("./jsKeyCodes/keyboard.js")(rightCode);

//
var gameControls = {};
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
gameControls.assignInputCommands = function (call) {
    var ins = Object.keys(gameControls.inputs);
    ins.forEach(function (input) {
        gameControls.inputs[input].button.press = function () {
            gameControls.currentInput = gameControls.inputs[input].numbercode;
        };
    });
};
gameControls.getLastValidInput = function () {
    return gameControls.currentInput;
};
gameControls.init = function (customKeys) {
    if (Array.isArray(customKeys)) {
        //assign custom keys here
    };
    gameControls.assignInputCommands();

    return gameControls;
};

module.exports = gameControls.init;
});

require.register("js/utilities/gameMap.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var gameMap = {};
gameMap.init = function (config) {
    gameMap.map = [].concat(_toConsumableArray(Array(config.gameMap.columns).keys()));
    gameMap.map = gameMap.map.map(function (n) {
        return [].concat(_toConsumableArray(Array(config.gameMap.rows).keys()));
    });
    gameMap.legend = config.gameMap.legend;
    gameMap.foodPosition = config.gameMap.foodPosition;
    gameMap.states = config.gameMap.states;
    gameMap.currentState = gameMap.states.gamePlay;

    gameMap.config = config;

    return gameMap;
};

gameMap.generateFood = function () {
    var cols = gameMap.config.gameMap.columns;
    var rows = gameMap.config.gameMap.rows;
    var randomX = Math.round(Math.random() * cols - 1);
    var randomY = Math.round(Math.random() * rows - 1);
    //Make sure random coordinates are withing range of the array
    randomX = Math.max(0, randomX);
    randomY = Math.max(0, randomY);
    //randomX = randomX < 0 ? 0 : randomX;
    //randomY = randomY < 0 ? 0 : randomY;

    //TODO find out what the fuck constant "2" is!!!???
    while (gameMap.map[randomY][randomX] !== gameMap.legend.empty) {
        randomX = Math.round(Math.random() * cols - 1);
        randomY = Math.round(Math.random() * rows - 1);
        randomX = randomX < 0 ? 0 : randomX;
        randomY = randomY < 0 ? 0 : randomY;
        console.log("Food search on coord:", randomX, randomY);
    }

    //TODO also find out what the fuck constant "1" is!!!???
    gameMap.map[randomY][randomX] = gameMap.legend.food;

    //const foodPosition = `Food Position X: ${randomX} Y: ${randomY}`;
    //console.log(foodPosition);
    gameMap.foodPosition = [randomX, randomY];

    return gameMap; //setup method chaining
};
gameMap.processFood = function () {
    var foodY = gameMap.foodPosition[1];
    var foodX = gameMap.foodPosition[0];
    gameMap.map[foodY][foodX] = gameMap.legend.food;
    return gameMap;
};
gameMap.printMatrix = function () {
    var y = 0;
    var trix = '';
    while (y < gameMap.config.gameMap.rows) {
        for (var x = 0; x < gameMap.map.length; x++) {
            trix = trix + gameMap.map[x][y].toString();
        }
        trix = trix + "\n";
        y++;
    }
    console.clear();
    console.log("~~~~~printing matrix~~~~~");
    console.log(trix);

    return gameMap;
};

gameMap.processSnake = function (snake) {
    snake.body.forEach(function (node, index) {

        var isSnakeHead = index === 0;
        if (isSnakeHead) {
            var states = snake.directionStates;
            switch (node.direction) {
                case states.right:
                    node.dx = 1;
                    node.dy = 0;
                    break;

                case states.left:
                    node.dx = -1;
                    node.dy = 0;
                    break;

                case states.up:
                    node.dx = 0;
                    node.dy = -1;
                    break;

                case states.down:
                    node.dx = 0;
                    node.dy = 1;
                    break;

            }
            //console.log("head is:", node);
            var yOffset = node.y + node.dy;
            var xOffset = node.x + node.dx;
            var notInBounds = node.x < 0 || xOffset > 20 || node.y < 0 || yOffset > 18; //TODO: set explicit stage coordinates in config
            if (notInBounds) {
                console.log("Game over!");
                gameMap.currentState = gameMap.states.gameOver;
            }
        }

        if (gameMap.currentState === gameMap.states.gamePlay) {
            gameMap.map[node.y][node.x] = gameMap.legend.snakeHead;
        }
    });
    //console.log("Snake has been processed!!", snake.body[0].x, snake.body[0].y);
    return gameMap; //check gameOver state afterwards
};
gameMap.foodCollision = function (snakeObj, ref) {
    if (gameMap.currentState === gameMap.states.gamePlay) {
        var snake = snakeObj.body[0];
        var foodY = gameMap.foodPosition[1];
        var foodX = gameMap.foodPosition[0];

        if (gameMap.map[snake.y][snake.x] === gameMap.map[foodY][foodX]) {
            gameMap.map[foodY][foodX] = gameMap.legend.empty;
            gameMap.generateFood();
            snakeObj.appendNode();
            var refereeExists = typeof ref !== "undefined" && ref !== null && (typeof ref === "undefined" ? "undefined" : _typeof(ref)) === "object";
            if (refereeExists) {
                ref.setScore(1);
            }
        }
    }

    return gameMap;
};
gameMap.cleanMap = function () {
    gameMap.map = gameMap.map.map(function (x) {
        return x.map(function (y) {
            return gameMap.legend.empty;
        });
    });

    return gameMap;
};

module.exports = function (config) {
    return gameMap.init(config);
};
});

;require.register("js/utilities/jsKeyCodes/keyCodes.js", function(exports, require, module) {
"use strict";

module.exports = function (key) {
    var codes = {
        "0": "48",
        "1": "49",
        "2": "50",
        "3": "51",
        "4": "52",
        "5": "53",
        "6": "54",
        "7": "55",
        "8": "56",
        "9": "57",
        "That key has no keycode": "0",
        "break": "3",
        "backspace / delete": "8",
        "tab": "9",
        "clear": "12",
        "enter": "13",
        "shift": "16",
        "ctrl": "17",
        "alt": "18",
        "pause/break": "19",
        "caps lock": "20",
        "hangul": "21",
        "hanja": "25",
        "escape": "27",
        "conversion": "28",
        "non-conversion": "235",
        "spacebar": "32",
        "page up": "33",
        "page down": "34",
        "end": "35",
        "home": "36",
        "left arrow": "37",
        "up arrow": "38",
        "right arrow": "39",
        "down arrow": "40",
        "select": "41",
        "print": "42",
        "execute": "43",
        "Print Screen": "44",
        "insert": "45",
        "delete": "46",
        "help": "47",
        ":": "58",
        "semicolon (firefox), equals": "59",
        "<": "60",
        "equals (firefox)": "61",
        "ß": "63",
        "@ (firefox)": "64",
        "a": "65",
        "b": "66",
        "c": "67",
        "d": "68",
        "e": "69",
        "f": "70",
        "g": "71",
        "h": "72",
        "i": "73",
        "j": "74",
        "k": "75",
        "l": "76",
        "m": "77",
        "n": "78",
        "o": "79",
        "p": "80",
        "q": "81",
        "r": "82",
        "s": "83",
        "t": "84",
        "u": "85",
        "v": "86",
        "w": "87",
        "x": "88",
        "y": "89",
        "z": "90",
        "Windows Key / Left ⌘ / Chromebook Search key": "91",
        "right window key": "92",
        "Windows Menu / Right ⌘": "93",
        "sleep": "95",
        "numpad 0": "96",
        "numpad 1": "97",
        "numpad 2": "98",
        "numpad 3": "99",
        "numpad 4": "100",
        "numpad 5": "101",
        "numpad 6": "102",
        "numpad 7": "103",
        "numpad 8": "104",
        "numpad 9": "105",
        "multiply": "106",
        "add": "107",
        "numpad period (firefox)": "108",
        "subtract": "109",
        "decimal point": "110",
        "divide": "111",
        "f1": "112",
        "f2": "113",
        "f3": "114",
        "f4": "115",
        "f5": "116",
        "f6": "117",
        "f7": "118",
        "f8": "119",
        "f9": "120",
        "f10": "121",
        "f11": "122",
        "f12": "123",
        "f13": "124",
        "f14": "125",
        "f15": "126",
        "f16": "127",
        "f17": "128",
        "f18": "129",
        "f19": "130",
        "f20": "131",
        "f21": "132",
        "f22": "133",
        "f23": "134",
        "f24": "135",
        "num lock": "144",
        "scroll lock": "145",
        "^": "160",
        "!": "161",
        "؛ (arabic semicolon)": "162",
        "#": "163",
        "$": "164",
        "ù": "165",
        "page backward": "166",
        "page forward": "167",
        "refresh": "168",
        "closing paren (AZERTY)": "169",
        "*": "170",
        "~ + * key": "171",
        "home key": "172",
        "minus (firefox), mute/unmute": "173",
        "decrease volume level": "174",
        "increase volume level": "175",
        "next": "176",
        "previous": "177",
        "stop": "178",
        "play/pause": "179",
        "e-mail": "180",
        "mute/unmute (firefox)": "181",
        "decrease volume level (firefox)": "182",
        "increase volume level (firefox)": "183",
        "semi-colon / ñ": "186",
        "equal sign": "187",
        "comma": "188",
        "dash": "189",
        "period": "190",
        "forward slash / ç": "191",
        "grave accent / ñ / æ / ö": "192",
        "?, / or °": "193",
        "numpad period (chrome)": "194",
        "open bracket": "219",
        "back slash": "220",
        "close bracket / å": "221",
        "single quote / ø / ä": "222",
        "`": "223",
        "left or right ⌘ key (firefox)": "224",
        "altgr": "225",
        "< /git >, left back slash": "226",
        "GNOME Compose Key": "230",
        "ç": "231",
        "XF86Forward": "233",
        "XF86Back": "234",
        "alphanumeric": "240",
        "hiragana/katakana": "242",
        "half-width/full-width": "243",
        "kanji": "244",
        "unlock trackpad (Chrome/Edge)": "251",
        "toggle touchpad": "255"
    };

    return Number(codes[key]);
};
});

;require.register("js/utilities/jsKeyCodes/keyboard.js", function(exports, require, module) {
"use strict";

/**
    Example usage:
    let keyCode require("./keycodes")("up arrow");
    let upKey = require("./keyboard.js")(keyCode) //38 is keycode number for up!
    if (upKey.isDown){
        doSomething();
    }
*/

/**
*    A utility function for constructoring keyboard pressing events
*    @param {number} keycode - ASCII number value that represents a keyboard key
*    @returns {object} - An object with relative keyboard input events methods
*/
module.exports = function (keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
};
});

require.register("js/utilities/referee.js", function(exports, require, module) {
"use strict";

var referee = {};
referee.rules = {
    gamePlay: 0,
    gameOver: 1
};
referee.participants = [];
referee.init = function (config) {
    referee.score = 0;
    referee.level = 1;
    if (config.custom.hackable === true) {
        referee.level = config.custom.level || 1;
    };

    return referee;
};
referee.setScore = function (value) {
    referee.score += value * referee.level;

    if (referee.score < 0) {
        referee.score = 0;
    };

    return referee;
};
referee.onGameOver = function (call) {
    call();
    window.location.relaod();
};
referee.checkGameOver = function (call) {
    var callGameOver = false;
    participants.forEach(function (member) {
        if (member.currentState === referee.rules.gameOver) {
            callGameOver = true;
        }
    });

    if (callGameOver) {
        console.log("Game is over!");
        referee.onGameOver(call);
    }

    return callGameOver;
};
referee.addParticipant = function (member) {
    referee.participants.push(member);

    return referee;
};
module.exports = referee;
});

require.register("js/utilities/snakeObj.js", function(exports, require, module) {
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var snakeObj = {};

snakeObj.init = function (config) {
    snakeObj.headPosition = [0, 0]; // x,y
    snakeObj.size = config.snakeObj.defaultSize;
    snakeObj.body = [].concat(_toConsumableArray(Array(snakeObj.size).keys())); //parts that follow snake head
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
    snakeObj.body = snakeObj.body.map(function (part, order) {
        var x = typeof part.x === "undefined" ? 0 : part.x;
        var y = typeof part.y === "undefined" ? 0 : part.y;
        var attributes = {
            x: x,
            y: y
        };
        var isHead = order === 0;
        if (isHead) {
            //Add special property for head node
            attributes.direction = 0;
            attributes.dx = 0;
            attributes.dy = 0;
        }

        return attributes;
    });

    return snakeObj;
};
snakeObj.randomizePosition = function () {
    var cols = snakeObj.config.gameMap.columns;
    var rows = snakeObj.config.gameMap.rows;
    var randomX = Math.round(Math.random() * cols - 1);
    var randomY = Math.round(Math.random() * rows - 1);
    //Make sure random coordinates are withing range of the array
    randomX = randomX < 0 ? 0 : randomX;
    randomY = randomY < 0 ? 0 : randomY;

    while (randomX - snakeObj.size < 0) {
        randomX = Math.round(Math.random() * cols - 1);
        randomX = randomX < 0 ? 0 : randomX;
    };

    //TODO mark the map with body parts that aren't the head
    snakeObj.body = snakeObj.body.map(function (part, order) {
        part.x = randomX - order;
        part.y = randomY;
        console.log(part);
        return part;
    });

    snakeObj.headPosition = [randomX, randomY];
    return [randomX, randomY];
};
snakeObj.move = function (call) {

    var head = snakeObj.body[0];

    //store current head position
    var previousNodePosition = {
        x: head.x,
        y: head.y
    };

    //Move initial head direction
    head.x += head.dx;
    head.y += head.dy;

    //every subsequent body part should inherit direciton of previous body part
    snakeObj.body = snakeObj.body.map(function (node, order) {
        var isNotHead = order !== 0;
        if (isNotHead) {
            var nextNodePosition = {
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
snakeObj.setDirection = function (direction, call) {
    var states = snakeObj.directionStates;
    switch (direction) {
        case states.up:
            if (snakeObj.direction !== states.down) {
                snakeObj.body[0].dx = 0;
                snakeObj.body[0].dy = -1;
                snakeObj.direction = direction;
            }
            break;

        case states.down:
            if (snakeObj.direction !== states.up) {
                snakeObj.body[0].dx = 0;
                snakeObj.body[0].dy = 1;
                snakeObj.direction = direction;
            }
            break;

        case states.left:
            if (snakeObj.direction !== states.right) {
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
snakeObj.appendNode = function () {
    var size = snakeObj.body.length;
    snakeObj.body.push({
        x: snakeObj.body[size - 1].x,
        y: snakeObj.body[size - 1].y
    });

    console.log("body exteneded!!");
    return snakeObj;
};

module.exports = function (config) {
    return snakeObj.init(config);
};
});

;require.register("js/utilities/userHack.js", function(exports, require, module) {
"use strict";

module.exports = function (config) {
    var query = new URLSearchParams(window.location.search);
    var level = Number(query.get("level")) || null;
    var snakeColor = query.get("snakeColor") || null;
    var foodColor = query.get("foodColor"); //|| null;

    if (config.custom.hackable === true) {
        config.custom.level = level;
        config.custom.snakeColor = snakeColor;
        config.custom.foodColor = foodColor;

        if (snakeColor !== null) {
            config.renderer.snakeColor = snakeColor;
        }
        if (foodColor !== null) {
            config.renderer.foodColor = foodColor;
        }
    }
};
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map