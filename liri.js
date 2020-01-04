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
switchStatement = function (command, search) {
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
}

// Divider for easier readying
var divider = "\n---------------------------------------------------\n";

// Create functions that handle each piece of functionality

// 'concert-this' uses the Bands In Town API
/*
Input: <artist/band name>
Output: Name of each venue, venue location and date of the event("MM/DD/YYYY")
*/
function concertThis(search) {
    // Declare and assign artist variable replacing spaces with "+"'s
    var artist = search.replace(/ /g, "+");

    // Create queryUrl
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsInTownKey;

    // create axios call
    axios.get(queryUrl).then(
        function (response) {
            // Loop through each event and get the data we need to display
            for (var i = 0; i < response.data.length; i++) {
                var venue = response.data[i].venue.name;
                var location = response.data[i].venue.city + " " + response.data[i].venue.region;
                var datetime = response.data[i].datetime;
                var resultString = "";
                resultString += (i + 1) + "." + search + "\n";
                resultString += "Venue: " + venue + "\n";
                resultString += "Location: " + location + "\n";
                resultString += "Date: " + moment(datetime).format('L') + "\n";
                resultString += divider;
                // log out the resultString
                console.log(resultString);
                // add to log
                fs.appendFile("log.txt", resultString, function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        }
    )
};


// 'spotify-this-song' uses the Spotify API
/*
Input: <song name>
Output: Artist, song name, preview link to song from Spotify and album the song is from
*/
function spotifyThis(search) {

    // set default if no search term is givin
    if (!search) {
        search = "The Sign Ace of Base";
    }
    spotify.search({
        type: 'track',
        query: search
    }, function (err, data) {
        if (err) {
            return console.log('Error occured: ' + err);
        }
        var resultString = "";

        resultString += ("Artist(s): " + data.tracks.items[0].artists[0].name) + "\n";
        resultString += ("Song: " + data.tracks.items[0].name) + "\n";
        resultString += ("Preview URL: " + data.tracks.items[0].preview_url) + "\n";
        resultString += ("Album: " + data.tracks.items[0].album.name) + "\n";
        resultString += divider;

        fs.appendFile("log.txt", resultString, function (error) {
            if (error) {
                console.log(error);
            }
            // log out the resultString
            console.log(resultString);
        });
    })

}

// 'movie-this' uses the OMDB API
/*
Input: <movie name>
Output: Movie Title, Year of release, IMDB rating, Rotten Tomatoes rating, Country produced, language, plot and actors.
*/
function movieThis(search) {
    // set default if no search term is givin
    if (!search) {
        search = "Mr. Nobody";
        getMovieData();
        console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/")
        console.log("It's on Netflix!");
    } else {
        getMovieData();
    }
    // Declare and assign movieName variable replacing spaces with "+"'s
    var movieName = search.replace(/ /g, "+");

    // axios call
    function getMovieData() {

        // Create queryUrl
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdbKey;
        axios.get(queryUrl).then(
            function (response) {

                // build resultString
                var resultString = "";
                resultString += "Movie Title: " + response.data.Title + "\n";
                resultString += "Year Released: " + response.data.Year + "\n";
                resultString += "IMDB Rating: " + response.data.Ratings[0].Value + "\n";
                // resultString += "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n";
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
}
// 'do-what-it-says' uses the random.txt file to run one of the above
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");

        command = dataArr[0];
        search = dataArr[1];
        switchStatement(command, search);
    });
}

switchStatement(command, search);