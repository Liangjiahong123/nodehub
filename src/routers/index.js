const fs = require('fs');

function setupRouters(app) {
  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    if (file.startsWith('index')) continue;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}
module.exports = setupRouters;
