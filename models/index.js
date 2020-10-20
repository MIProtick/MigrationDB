const MongoClient = require('mongodb').MongoClient;


// `Congigure Here Only`
const url = 'mongodb://localhost:27017'; // MangoDB Server Link
const dbName = 'migrated'; // Expected Database Name

const client = new MongoClient(url, { useUnifiedTopology: true });


// Create Connection
client.connect(function(error) {
    if (!error) {
        console.log("MongoDB: Successfully Connected.");
    } else {
        console.log("MongoDB: Connection Failed.");
    }
});
var mongo_db = client.db(dbName)

module.exports = mongo_db;