//@ts-nocheck
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const _dbName = 'checkins';
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://Warwick:YPYcOuJxvECDI3IP@cluster0-wktls.mongodb.net/${_dbName}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db !== undefined) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
