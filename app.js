var express = require("express");
var app = express();
var path = require("path");
const request = require("./request");
var router = express.Router();
require("dotenv").config();
var bodyParser = require("body-parser");
var url = "http://api.ft.com/content/search/v1?" + 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});


app.get('/search', function(req, res, next) {
  res.render("searches", { title: "Searches" });
  var queryString;
  queryString = req.body.queryString;
  console.log(queryString);
 });

app.post('/search/', function(req, res, next) {
  var queryString;
  queryString = req.body.queryString;
  res.send(queryString);
  console.log("STRING" + queryString);
  console.log(req.body);

});


app.get("/", function(req, res) {
  console.log("you've arrived");
});

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
request.sendRequestFor("Brexit");

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

module.exports = router;