const path = require('path');

const constants = {
  AUDIO_SRC_DIR: path.join(__dirname, '../mp3'),
  AUDIO_DIST_PATH: 'https://archive.org/details/polygoingoff-podcast/',
  DIST_DIR: path.join(__dirname, '../dist'),
  DIST_PATH: 'https://polygoingoff.com',
};

constants.FEED_FILE = path.join(constants.DIST_DIR, 'feed.xml');
constants.IMAGE_DIST_PATH = new URL('images', constants.DIST_PATH),

module.exports = constants;
