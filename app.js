require("dotenv").config();
var express = require("express");
var app = express();
var path = require("path");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/intense-shore-82818.herokuapp.com/');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(process.env.PORT || 5000, function () {
  if(process.env.PORT){
    console.log("Example app listening on port" + process.env.PORT + "!");
  } 
  else {
  console.log("Example app listening on port 5000!");
  }
});


app.get("/", function (req, res) {

  res.render("index", { title: "Home" });
});

app.get('/search', function (req, res, next) {
  var resultsArray = []
  MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost/intense-shore-82818.herokuapp.com/' || url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("articles").find({}).toArray(function (err, result) {
      if (err) {
        throw err;
      } else if (result.length) {
        resultsArray = result
        console.log(resultsArray)
        res.render('searches', {
          'articlesArray': result,
        });
      } else {
        res.send('No documents found');
      }
      db.close();
    });
  });
});


app.post('/search/', function (req, res, next) {
  var queryString;
  queryString = req.body.queryString;
  makeArticleRequestForQuery(queryString);
  res.redirect('/search');
})

function makeArticleRequestForQuery(queryString) {
  var request = require('request');
  request({
    headers: {
      'x-api-key': process.env.FT_API_KEY,
    },
    url: "http://api.ft.com/content/search/v1?",
    json: {
      "queryString": 'title:\"' + queryString + '\"',
      "resultContext": {
        "aspects": ["title", "lifecycle", "location", "summary", "editorial"],
        "sortOrder": "DESC",
        "sortField": "initialPublishDateTime"
      }
    },
    method: 'POST'
  }, function (err, res, body) {
    articles = body["results"]
    articlesArray = articles[0]["results"]
    numberOfArticles = articles[0]["indexCount"]

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("articles").deleteMany({}, function (err, res) {
        if (err) throw err;
        console.log("All documents removed")
      })

      for (let index = 0; index < 40; index++) {
        const element = articles[0]["results"][index];
        dbo.collection("articles").insertOne(element, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      }
    });
    console.log(articles);
    console.log(articles[0]["indexCount"])
    console.log(articles[0]["results"].length)
    console.log(articles[0]["results"][1])
  });
}
