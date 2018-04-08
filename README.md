## How to add a js module
    * add the js file to the /app/js directory
    * export the file contents with module.exports
    * inside initialize.js make sure to require the file
        ```javascript
            require("./js/newModule.js");
        ```
    * As long as references are correct the file will automatically appear in the build file
