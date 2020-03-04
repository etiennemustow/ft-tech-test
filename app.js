var express = require("express");
var app = express();
var path = require("path");
const request = require("./request");
require("dotenv").config();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded());
app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});

app.post("/search", (req, res) => {
  const searchTerm = req.body.queryString;
  //...
  res.end();
  console.log(searchTerm);
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
