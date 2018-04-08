document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');

  const config = require("./js/gConfig.js");
  const stage = require("./js/stageUI.js")(config);
  const renderer = require("./js/render.js")(config, stage.ctx);
  renderer(config, stage.ctx, {score: 0, level: 0});
});
