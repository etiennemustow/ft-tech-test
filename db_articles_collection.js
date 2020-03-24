var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost/intense-shore-82818.herokuapp.com/' || url, function(err, db) {
  if (err) throw err;
  if(process.env.MONGODB_URI) {
    var dbo = db.db("heroku_84vj5m9j");  
  } else {
    var dbo = db.db("mydb");
  }
  dbo.createCollection("articles", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});