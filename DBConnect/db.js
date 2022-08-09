const { MongoClient } = require("mongodb");

const url = process.env.DB_URL;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;
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