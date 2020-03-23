var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

require("dotenv").config();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function (req, res) {

  res.render("index", { title: "Home" });
});


app.get('/search', function (req, res, next) {
  var resultsArray = []
  MongoClient.connect(url, function (err, db) {
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
  res.send(queryString);
  console.log("STRING" + queryString);
  makeArticleRequestForQuery(queryString);
})


app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

module.exports = router;


// var request = require('request');

// //set url
// var url = "http://api.ft.com/content/search/v1?";

// //set header
// var headers = {
//   'Content-Type': 'application/javascript',
//   'x-api-key': process.env.FT_API_KEY,
// };

// //set form data
// var form = {queryString: queryString};

// //set request parameter
// request.post({headers: headers, url: url, form: form, method: 'POST'}, function (e, r, body) {

//     var bodyValues = JSON.parse(body);
//     res.send(bodyValues);
// });

function makeArticleRequestForQuery(queryString) {
  var request = require('request');
  request({
    headers: {
      'x-api-key': "59cbaf20e3e06d3565778e7b39ea4ee200cd4785bdcf1c69154f84d7",
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

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("articles").remove({}, function (err, res) {
        if (err) throw err;
        console.log("All documents removed")
      })

      for (let index = 0; index < 20; index++) {
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
    console.log(articles[0]["results"][0])
    console.log(articles[0]["results"][1])
  });
}
