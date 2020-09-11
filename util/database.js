const mongodb = require("mongodb");
require("dotenv").config();

let db;

exports.mongoConnect = callback => {
  mongodb.MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nyqrp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      //to remove deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
    .then(client => {
      console.log("Connected to Database!");
      db = client.db(process.env.DB_NAME);
      callback();
    })
    .catch(err => {
      console.log("Error in mongoConnect: ", err);
      throw err;
    });
};

exports.getDb = () => {
  if (db) {
    return db;
  }
  throw "No database found!";
};
