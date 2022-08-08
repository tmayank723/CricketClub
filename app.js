const express = require('express');
const app = express();
app.use(express.json());

// Database configuration
const connect = require('./DBConnect/db');

const routes = require('./routes/route');
app.use('/',routes)


app.listen(3000, async () => {
    await connect.dbConnect()
    console.log("Server is Running on port : 3000");
});