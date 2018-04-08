document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');

  const config = require("./js/gConfig.js");
  require("./js/stageUI.js")(config);
});
