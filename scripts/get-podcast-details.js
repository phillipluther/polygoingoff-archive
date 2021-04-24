const { IMAGE_DIST_PATH } = require('./constants');

// i think my original intent here was to extract this from an audio file, since all
// the episodes have ID3 tags ... but static works, too.
module.exports = () => ({
  title: 'Polygoing Off',
  description: 'A short-lived weekly podcast exploring pop culture and the uncanny similarities between real life situations and our favorite video games.',
  feed_url: 'https://polygoingoff.com/feed.xml',
  site_url: 'https://polygoingoff.com',
  image_url: 'https://polygoingoff.com/images/podcastArt.jpg',
  copyright: '2016-2017 by Phillip Luther',
  language: 'en',
  pubDate: 'Thu, 1 Apr 2021 00:00:00 +0000',
  itunesAuthor: 'Phillip Luther (aka, Polygoing)',
  itunesSubtitle: 'A short-lived weekly podcast exploring pop culture and the uncanny similarities between real life situations and our favorite video games.',
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
