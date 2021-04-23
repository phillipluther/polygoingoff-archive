const fs = require('fs/promises');
const path = require('path');
const mm = require('music-metadata');
const { AUDIO_SRC_DIR } = require('./constants');

// cached results; will only parse files from source 1x
const episodeDetails = [];

module.exports = async function() {
  try {
    if (episodeDetails.length > 0) {
      return episodeDetails;
    }

    const audioFiles = await fs.readdir(AUDIO_SRC_DIR);
    
    return Promise.all(audioFiles.reduce((details, filename) => {
      if (/polygoingOff/.test(filename)) {
        episodeDetails.push((async () => {
          const audioSource = path.join(AUDIO_SRC_DIR, filename);
          const { common: parsedDetails } = await mm.parseFile(audioSource);
          const { size } = await fs.stat(audioSource);

          return {
            filename,
            size,
            ...parsedDetails,
          };
        })());
      }

      return details;
    }, episodeDetails));
  } catch (err) {
    console.error('Failed to get episode details\n', err);
  }
};
