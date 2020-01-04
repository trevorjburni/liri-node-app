/*
LIRIBOT allows users to grab information they desire from Spotify, OMDB and Bands In Town
Author: Trevor Burningham
Version: alpha
Date Modified: 01/03/19
*/

// Require dotenv package
require("dotenv").config();

// Require spotify api package
var Spotify = require('node-spotify-api');

// Set the the variable keys to the keys.js file
var keys = require("./keys.js");

// Assign spotify to the Spotify object, with the key
var spotify = new Spotify(keys.spotify);

// Require axios package
var axios = require("axios");

// Require moment package
var moment = require("moment");

// Require fs package
var fs = require("fs");

// Set user provided arguments to variables


// Switch cases for each piece of functionality
// Each switch case calls a function that will return information to the screen for the user

/*
Possible switch cases
1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says
else. return with invalid input message, or no input provide message
*/



// Create functions that handle each piece of functionality

// 'concert-this' uses the Bands In Town API
/*
Input: <artist/band name>
Output: Name of the venue, venue location and date of the event("MM/DD/YYYY")
*/

// 'spotify-this-song' uses the Spotify API
/*
Input: <song name>
Output: Artist, song name, preview link to song from Spotify and album the song is from
*/

// 'movie-this' uses the OMDB API
/*
Input: <movie name>
Output: Movie Title, Year of release, IMDB rating, Rotten Tomatoes rating, Country produced, language, plot and actors.
*/

// 'do-what-it-says' uses the random.txt file to run one of the above