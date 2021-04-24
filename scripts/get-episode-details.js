const fs = require('fs/promises');
const path = require('path');
const mm = require('music-metadata');
const { AUDIO_SRC_DIR } = require('./constants');

async function getEpisodeDetails() {
  try {
    console.log('Running');
    const audioFiles = await fs.readdir(AUDIO_SRC_DIR);
    
    return Promise.all(audioFiles.reduce((details, filename) => {
      if (/polygoingOff/.test(filename)) {
        details.push((async () => {
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
    }, []));
  } catch (err) {
    console.error('Failed to get episode details\n', err);
  }
}

const episodeDetails = getEpisodeDetails();
module.exports = () => episodeDetails;
// const episodeDetails = getEpisodeDetails();

// module.exports = async function(forceFetch = false) {
//   try {
//     return episodeDetails;
    
//   } catch (err) {
//     console.error(err);
//   }
// };
