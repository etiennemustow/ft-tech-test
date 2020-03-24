var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost/intense-shore-82818.herokuapp.com/' || url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});