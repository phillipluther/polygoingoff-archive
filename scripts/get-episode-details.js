/*
 * this method runs locally only; it reads ID3 tags from mp3 podcast files and writes
 * it to a JSON file. the JSON file is used at build-time by Netlify, since mp3s are
 * not checked in to the repo
 */
const fs = require('fs/promises');
const path = require('path');
const mm = require('music-metadata');
const { AUDIO_SRC_DIR, AUDIO_DIST_PATH, EPISODE_JSON_FILE } = require('./constants');

function getDateFromTitle(filename) {
  // super sloppy regex to parse the date from the file name; could optimize this, but
  // it runs so infrequently ... 
  const dateMatch = filename.match(/_[episode|update][0-9a-z]*_(.*)\.mp3$/);
  const parsedDateString = dateMatch ? Date.parse(dateMatch[1]) : Date.now();

  return parsedDateString;
}

async function buildEpisodeJSON() {
  try {
    const audioFiles = await fs.readdir(AUDIO_SRC_DIR);
    
    const episodeDetails = await Promise.all(audioFiles.reduce((details, filename) => {
      if (/polygoingOff/.test(filename)) {
        details.push((async () => {
          const audioSource = path.join(AUDIO_SRC_DIR, filename);
          const { common: parsedDetails } = await mm.parseFile(audioSource);
          const { size } = await fs.stat(audioSource);
          const date = new Date(Date.parse(parsedDetails.date) || getDateFromTitle(filename));

          return {
            filename,
            size,
            url: new URL(filename, AUDIO_DIST_PATH),
            ...parsedDetails,
            date,
            friendlyDate: date.toUTCString(),
          };
        })());
      }

      return details;
    }, []));    

    await fs.writeFile(
      EPISODE_JSON_FILE,
      JSON.stringify(episodeDetails.sort((a, b) => a.date > b.date ? 1 : -1)),
    );
  } catch (err) {
    console.error('Failed to generate episode JSON file\n', err);
  }
}

async function getEpisodeDetails() {
  try {
    let checkJSON = true;

    if (process.env.BUILD_JSON) {
      console.log('Building episode JSON data');
      await buildEpisodeJSON();
      checkJSON = false;
    }

    if (checkJSON) {

      try {
        await fs.access(EPISODE_JSON_FILE);
      } catch (accessErr) {
        throw new Error(`Could not find ${EPISODE_JSON_FILE}; build this file locally first`);
      }
    }

    return require(EPISODE_JSON_FILE);
  } catch (err) {
    console.error('Failed to get episode details\n', err);
  }
};

const episodeDetails = getEpisodeDetails();
module.exports = () => episodeDetails;
