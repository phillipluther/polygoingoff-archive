const PodcastFeed = require('podcast');
const path = require('path');
const fs = require('fs/promises');

const TIMER_LABEL = 'Successfully built podcast RSS feed';
const DEST_DIR = path.join(__dirname, '../dist');
const FEED_FILE = path.join(DEST_DIR, 'feed.xml');
const AUDIO_SRC_DIR = path.join(__dirname, '../../mp3');

module.exports = async function() {
  console.time(TIMER_LABEL);
  try {
    const feed = new PodcastFeed({
      title: 'Polygoing Off',
      description: 'A short-lived weekly podcast exploring pop culture and the uncanny similarities between real life situations and our favorite video games.',
      feed_url: 'https://polygoingoff.com/feed.xml',
      site_url: 'https://polygoingoff.com',
      image_url: 'https://polygoingoff.com/images/podcastArt.jpg',
      author: 'Phillip Luther',
      managingEditor: 'Phillip Luther',
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
      itunesImage: 'https://polygoingoff.com/images/podcastArt.jpg',
    });

    await fs.rmdir(DEST_DIR, { recursive: true });
    await fs.mkdir(DEST_DIR);

    const audioFiles = await fs.readdir(AUDIO_SRC_DIR);

    audioFiles.forEach((audioFile) => {
      // only deal with prefixed files, which were "officially" part of the podcast
      if (/polygoingOff/.test(audioFile)) {
        console.log('FILE:', audioFile);
      }
    });
    
    await fs.writeFile(FEED_FILE, feed.buildXml());

    console.timeEnd(TIMER_LABEL);
  } catch (err) {
    console.log('Failed to build podcast RSS feed');
    console.error(err);
  }
}

