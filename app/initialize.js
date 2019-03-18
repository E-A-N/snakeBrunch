document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');

  const config = require("./js/config.js");
  const stage = require("./js/stageUI.js")(config);

  const main = require("./js/mainGame.js")(config, stage);
  main.init();
  main.cycle();
  window._main = main; //TODO: for testing only


});
