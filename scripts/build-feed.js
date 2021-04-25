const PodcastFeed = require('podcast');
const path = require('path');
const fs = require('fs/promises');
const getEpisodeDetails = require('./get-episode-details');
const getPodcastDetails = require('./get-podcast-details');
const {
  FEED_FILE,
  AUDIO_SRC_DIR,
  IMAGE_DIST_PATH,
} = require('./constants');

const TIMER_LABEL = 'Successfully built podcast RSS feed';

module.exports = async function() {
  console.time(TIMER_LABEL);
  try {
    const feed = new PodcastFeed(getPodcastDetails());
    const episodeDetails = await getEpisodeDetails();

    episodeDetails.forEach((trackData) => {
      const file = path.join(AUDIO_SRC_DIR, trackData.filename);

      feed.addItem({
        title: trackData.title,
        description: trackData.subtitle,
        categories: ['Podcast'],
        author: trackData.artist,
        date: trackData.date,
        enclosure: {
          url: trackData.url,
          size: trackData.size,
          type: 'audio/mpeg',
        },
        itunesAuthor: trackData.artist,
        itunesImage: new URL('podcastArt.jpg', IMAGE_DIST_PATH),
        itunesExplicit: 'yes',
        itunesSubtitle: trackData.subtitle,
        itunesSummary: trackData.subtitle,
      });
    });

    await fs.writeFile(FEED_FILE, feed.buildXml(true));

    console.timeEnd(TIMER_LABEL);
  } catch (err) {
    console.error('[BUILD FAILURE] Could not build podcast RSS feed\n', err);
  }
}

