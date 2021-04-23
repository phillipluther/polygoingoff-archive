# polygoingoff-archive

Once upon a time I had a podcast. It podfaded in early 2017. Since then, I've been paying a few bucks a month to keep the thing online. That few bucks a month adds up!

This is a quick/dirty static site/RSS builder to archive that old podcast. The HTML deploys to Netlify and the audio is hosted on archive.org.

Audio source files are not checked in for size considerations and because they're on archive.org.

## Isn't This a Bit Overkill

Build a mini-static site ... build the RSS feed ... read metadata from the files ... isn't this all a bit over-engineered?

No, this isn't _a bit_ over-engineered; this is over-engineered AF. Frankly, though, messing around with `fs` and figuring out how to build the RSS feed is way more fun. I couldn't bare the thought of simply copy/pasting the feed from the podcast's old WordPress instance, nor could I put myself through the monotonous task of duplicating 35 some odd HTML articles and manually updating titles, descriptions, etc.
