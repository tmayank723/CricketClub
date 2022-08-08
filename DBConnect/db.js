const { MongoClient } = require("mongodb");

const url = "mongodb+srv://CricketClub:CricketClub@cluster0.x8ntg.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);

// Database Name
const dbName = "CricketClub";
let db;

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('MongoDB Connected successfully to server');
    db = client.db(dbName);

    return 'done.';
}

exports.dbConnect = () => {
    main()
}

exports.get = () => {
    return db
}