const PodcastFeed = require('podcast');
const path = require('path');
const fs = require('fs/promises');

module.exports = async function() {
  console.log('Building podcast RSS feed');
  try {
    const feed = new PodcastFeed({
      title: 'Polygoing Off',
      description: 'A short-lived weekly podcast exploring pop culture and the uncanny similarities between real life situations and our favorite video games.',
      feed_url: 'https://polygoingoff.com/feed/podcast/',
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

    const DEST_DIR = path.join(__dirname, '../dist');
    const FEED_FILE = path.join(DEST_DIR, 'feed.xml');

    await fs.rmdir(DEST_DIR, { recursive: true });
    await fs.mkdir(DEST_DIR);

    await fs.writeFile(FEED_FILE, feed.buildXml());


    console.log('DONE!');
  } catch (err) {
    console.error(err);
  }
}

