require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});


var action = process.argv[2];
var product = process.argv[3];

function song(product) {
    if (product === undefined) {
        var product = "Ace of Base";
    }
    console.log('searching for ' + product)
    spotify.search({ type: "track", query: product }, function(err, data) {
        if (err) {
            console.log(err);
            return;
        }

        var firstObject = data.tracks.items[0];
        var result = firstObject.artists[0].name + '\n' + firstObject.name + '\n' + firstObject.external_urls.spotify + '\n' + firstObject.album.name;

        /*
        console.log(firstObject.artists[0].name);
        console.log(firstObject.name);
        console.log(firstObject.external_urls.spotify);
        console.log(firstObject.album.name);
        */

        console.log(result);


        fs.appendFile('log.txt', result, function(err) {
            if (err) {
                return console.log('There was an error.');
            }

            // console.log('File appended succesfully!');
        });

    })
}

function movie(product) {
    if (product === undefined) {
        var product = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=6092e02e" + product;
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            console.log("Title: " + info.Title);
            console.log("Release Year: " + info.Year);
            console.log("IMDB Rating: " + info.imdbRating);
            console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value);
            console.log("Country: " + info.Country);
            console.log("Language: " + info.Language);
            console.log("Plot: " + info.Plot);
            console.log("Actors: " + info.Actors);
            fs.appendFile('log.txt', ("Title: " + info.Title + "\r\n" + "Release Year: " + info.Year + "\r\n" + "IMDB Rating: " + info.imdbRating + "\r\n" + "Rotten Tomatoes Rating: " + info.Ratings[1].Value + "\r\n" + "Country: " + info.Country + "\r\n" + "Language: " + info.Language + "\r\n" + "Plot: " + info.Plot + "\r\n" + "Actors: " + info.Actors + "\r\n"));
        }
    });
}

switch (action) {
    case "spotify-this":
        song(product);
        break;
}