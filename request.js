var express = require("express");
var app = express();
var myAPIKey = process.env.MYAPIKEY;
var url = "http://api.ft.com/content/search/v1?query?x-api-key=" + myAPIKey;

function sendRequestFor(searchTerm) {
  app.post(url, function(req, res) {
    req.body = {
      queryString: searchTerm,
      queryContext: {
        curations: ["ARTICLES"]
      },
      resultContext: {
        maxResults: 10
      }
    };
    console.log("SOMETHING HAPPENED");
    console.log(res);
  });
}

exports.sendRequestFor = sendRequestFor;
sendRequestFor("brexit");
