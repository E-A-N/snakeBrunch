document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');

  const config = require("./js/gConfig.js");
  const stage = require("./js/stageUI.js")(config);
  //const renderer = require("./js/render.js")(config, stage);
  //example call -> renderer(config, stage.ctx, {score: 0, level: 0});

  const main = require("./js/mainGame.js")(config, stage);
  console.log("Main is:", main);
  window._main = main;
  
});
