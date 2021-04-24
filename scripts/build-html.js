const fs = require('fs/promises');
const getEpisodeDetails = require('./get-episode-details');

const TIMER_LABEL = 'Successfully built podcast HTML';


module.exports = async function() {
  console.time(TIMER_LABEL);
  try {
    const episodeDetails = await getEpisodeDetails();

    console.timeEnd(TIMER_LABEL);
  } catch (err) {
    console.log('Failed to build podcast HTML');
    console.error(err);
  }
}
