const PodcastFeed = require('podcast');
const path = require('path');
const fs = require('fs/promises');
const mm = require('music-metadata');
const getEpisodeDetails = require('./get-episode-details');
const {
  DIST_DIR,
  FEED_FILE,
  AUDIO_DIST_PATH,
  AUDIO_SRC_DIR,
  IMAGE_DIST_PATH,
} = require('./constants');

const TIMER_LABEL = 'Successfully built podcast RSS feed';

module.exports = async function() {
  console.time(TIMER_LABEL);
  try {
    const feed = new PodcastFeed({
      title: 'Polygoing Off',
      description: 'A short-lived weekly podcast exploring pop culture and the uncanny similarities between real life situations and our favorite video games.',
      feed_url: 'https://polygoingoff.com/feed.xml',
      site_url: 'https://polygoingoff.com',
      image_url: 'https://polygoingoff.com/images/podcastArt.jpg',
      copyright: '2016-2017 by Phillip Luther',
      language: 'en',
      pubDate: 'Thu, 1 Apr 2021 00:00:00 +0000',
      itunesAuthor: 'Phillip Luther (aka, Polygoing)',
      itunesSubtitle: 'I am a sub title',
      itunesSummary: 'A short-lived weekly podcast exploring pop culture and the uncanny similarities between real life situations and our favorite video games.',
      itunesOwner: {
        name: 'Phillip Luther (aka, Polygoing)',
        email: 'phil@polygoingoff.com',
      },
      itunesExplicit: 'yes',
      itunesCategory: [
        {
          "text": "Leisure",
          "subcats": [
            { "text": "Video Games" },
          ],
        },
        {
          "text": "Society & Culture",
          "subcats": [
            { "text": "Personal Journals" },
          ],
        },
      ],
      itunesImage: new URL('podcastArt.jpg', IMAGE_DIST_PATH),
    });

    await fs.rmdir(DIST_DIR, { recursive: true });
    await fs.mkdir(DIST_DIR);

    const episodeDetails = await getEpisodeDetails();

    episodeDetails.forEach((trackData) => {
      const url = new URL(trackData.filename, AUDIO_DIST_PATH);
      const file = path.join(AUDIO_SRC_DIR, trackData.filename);

      feed.addItem({
        title: trackData.title,
        description: trackData.subtitle,
        categories: ['Podcast'],
        author: trackData.artist,
        date: trackData.date,
        enclosure: {
          url,
          file,
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
    console.log('Failed to build podcast RSS feed');
    console.error(err);
  }
}

