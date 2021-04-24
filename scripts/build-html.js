const fs = require('fs/promises');
const path = require('path');
const Handlebars = require('handlebars');
const getEpisodeDetails = require('./get-episode-details');
const getPodcastDetails = require('./get-podcast-details');
const { HTML_FILE } = require('./constants');

const TIMER_LABEL = 'Successfully built podcast HTML';


module.exports = async function() {
  console.time(TIMER_LABEL);
  try {
    const episodeDetails = await getEpisodeDetails();
    const templateStr = await fs.readFile(path.join(__dirname, '../template.hbs'), 'utf-8');
    const template = Handlebars.compile(templateStr);
    const rendered = template({
      episodeDetails,
      ...getPodcastDetails(),
    });

    await fs.writeFile(HTML_FILE, rendered);

    console.timeEnd(TIMER_LABEL);
  } catch (err) {
    console.log('Failed to build podcast HTML');
    console.error(err);
  }
}
