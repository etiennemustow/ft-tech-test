var express = require('express');
var app = express();
var path = require('path');


app.get('/', function (req, res) {
  res.render('index', {title: "Home" });
});
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});