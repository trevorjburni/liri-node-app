// Require dotenv package
require("dotenv").config();

// Require spotify api package
var Spotify = require('node-spotify-api');

// Set the the variable keys to the keys.js file
var keys = require("./keys.js");

// Assign spotify to the Spotify object, with the key.
var spotify = new Spotify(keys.spotify);

// Require axios package
var axios = require("axios");

// Require moment package
var moment = require("moment");