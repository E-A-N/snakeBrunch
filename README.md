## Query String API
   * `level` number that reflects current player level (evetually effecting score and game speed)
   * `snakeColor` keystring that updates color of the snake
   * `foodColor` keystring that updates color of the food
   * Example: ```https://e-a-n.github.io/snakeBrunch/?level=999&foodColor=blue```

## How to run Game:
   * clone repository
   * run `npm install` in command line environment, make sure you're in the cloned repository
   * `npm start` *or* `brunch watch` if nodejs is installed
   * Open a browser and go to http//:127.0.0.1:3333 *or* localhost:3333

## How to add a js module
   * add the js file to the /app/js directory
   * export the file contents with module.exports
   * inside initialize.js make sure to require the file
     ```javascript
         require("./js/newModule.js");
     ```
   * As long as references are correct the file will automatically appear in the build file

## How to add a css file
   * add the css file to the /app/css directory
   * make sure references are correct!
   * *remember references are rooted in location of the index.html file!*

## How to add assets (images, audio, html)
   * add the html files in app/static/ directory
   * images should be placed in app/static/assets/img
   * audio should be placed in app/static/assets/audio
