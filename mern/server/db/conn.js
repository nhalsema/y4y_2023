const { MongoClient } = require("mongodb");
const Db = process.env.POSE_LIB_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    // bug: DEPRECATED NEED TO UPDATE
    client.connect(function (err, db) {
      // desc: Verify we got a good "db" object
      if (db)
      {
        _db = db.db("yinPoses");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};