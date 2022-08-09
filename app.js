const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config({ path: ('./.env') });

// Database configuration
const connect = require('./DBConnect/db');

const routes = require('./routes/route');
app.use('/',routes)


app.listen(process.env.PORT, async () => {
    await connect.dbConnect()
    console.log(`Server is Running at ${process.env.PORT}`);
});