const fs = require('fs/promises');
const buildFeed = require('./build-feed');
const buildHtml = require('./build-html');
const { DIST_DIR } = require('./constants');

fs.rmdir(DIST_DIR, { recursive: true })
  .then(() => fs.mkdir(DIST_DIR))
  .then(() => {
    buildFeed();
    buildHtml();
  })
  .catch((err) => console.error(err));
