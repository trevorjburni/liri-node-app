# liri-node-app
_Language_ Interpretation and Recognition Interface

Author and Developer: Trevor Burningham

Link to Deployed page: goes here

## Description

The liri-node-app, LiriBot, or just Liri for short, is an app that allows users obtain various sorts of information about movies, upcoming concerts and songs. It is very easy to use and efficient.

Liri uses several API's and node packages that allow for it to work properly and render the information users seek. 

## How does Liri Work?

Liri is a command line interface app (CLI) that takes in a command and a search term as arguments, following the node liri.js call. See video for a quick guide of how it works. [quick guide video](https://youtu.be/Ne08TfE8CuU)

Liri takes in the following commands followed by a search term:

   * `concert-this <artist/band goes here>`

   * `spotify-this-song <song title goes here>`

   * `movie-this <movie title goes here>`

   * `do-what-it-says` - no arguement needed

Important note: The commands and their search term follow: `node liri.js`. Liri does not work for multiple search terms or commands. Example:

    node liri.js concert-this Taylor Swift


1. `concert-this` Uses the Bands in Town Artist Events API, which when tied with a artist, pulls in information about upcoming events/concerts.

2. `spotify-this-song` uses the spotify api and node package, which when tied with a song, pulls in information about that particular song. If no search term/song is provided, a default is available and is ran.

3. `movie-this` uses the OMDB API, which when tied with a movie, pulls in information about that particular movie. If no movie is provided, a default is available and is ran.

4. `do-what-it-says` unlike the other commands, doesn't use any search term. This command reads a command that is listed in the 'random.txt' file and then calls one of the above commands.

Liri also keeps a log of past searches. The log is contained in the `log.txt` file.

## Technologies used

* node.js
* javascript
* Bands In Town API [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* Node-Spotify-API [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* Axios node package [Axios](https://www.npmjs.com/package/axios)
* fs
* Moment node package [Moment](https://www.npmjs.com/package/moment)
* DotEnv node package [DotEnv](https://www.npmjs.com/package/dotenv)