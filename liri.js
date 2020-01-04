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

// Assign Bands In Town API key
var bandsInTownKey = keys.bandsInTown.id;

// Assign omdb API key
var omdbKey = keys.omdb.id;

// Require axios package
var axios = require("axios");

// Require moment package
var moment = require("moment");

// Require fs package
var fs = require("fs");

// Set user provided arguments to variables
var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

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
switch (String(command)) {

    case "concert-this":
        concertThis(search);
        break;

    case "spotify-this-song":
        spotifyThis(search);
        break;

    case "movie-this":
        movieThis(search);
        break;

    case "do-what-it-says":
        doWhatItSays(search);
        break;

    default:
        console.log("Check your command, it should either be:\n    concert-this <artist/band name here>\n    spotify-this-song <song name here>\n    movie-this <movie name here>\n    do-what-it-says")
}


// Create functions that handle each piece of functionality

// 'concert-this' uses the Bands In Town API
/*
Input: <artist/band name>
Output: Name of the venue, venue location and date of the event("MM/DD/YYYY")
*/
function concertThis(search) {
    console.log(search);
}

// 'spotify-this-song' uses the Spotify API
/*
Input: <song name>
Output: Artist, song name, preview link to song from Spotify and album the song is from
*/
function spotifyThis(search) {
    console.log(search);
}

// 'movie-this' uses the OMDB API
/*
Input: <movie name>
Output: Movie Title, Year of release, IMDB rating, Rotten Tomatoes rating, Country produced, language, plot and actors.
*/
function movieThis(search) {
    // Declare and assign movieName variable replacing spaces with "+"'s
    var movieName = search.replace(/ /g, "+");

    // Create queryUrl
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdbKey;

    // axios call
    axios.get(queryUrl).then(
        function (response) {

            // Divider for easier readying
            var divider = "\n---------------------------------------------------\n";
            
            // build resultString
            var resultString = "";
            resultString += "Movie Title: " + response.data.Title + "\n";
            resultString += "Year Released: " + response.data.Year + "\n";
            resultString += "IMDB Rating: " + response.data.Ratings[0].Value + "\n";
            resultString += "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n";
            resultString += "Produced in: " + response.data.Country + "\n";
            resultString += "Language: " + response.data.Language + "\n";
            resultString += "Plot: " + response.data.Plot + "\n";
            resultString += "Actors: " + response.data.Actors + "\n";
            resultString += divider;
            // write to log.txt
            fs.appendFile("log.txt", resultString, function (error) {
                if (error) {
                    console.log(error);
                }
                // log out the resultString
                console.log(resultString);
            });


        }
    )
}

// 'do-what-it-says' uses the random.txt file to run one of the above
function doWhatItSays(search) {
    console.log(search);
}