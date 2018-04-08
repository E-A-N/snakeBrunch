## How to add a js module
    * add the js file to the /app/js directory
    * export the file contents with module.exports
    * inside initialize.js make sure to require the file
        ```javascript
            require("./js/newModule.js");
        ```
    * As long as references are correct the file will automatically appear in the build file

##How to add a css file
    * add the css file to the /app/css directory
    * make sure references are correct!
    * *remember references are rooted in location of the index.html file!*

##How to add assets (images, audio, html)
    * add the file in app/assets directory
    * images should be placed in app/assets/img
    * audio should be placed in app/assets/audio
