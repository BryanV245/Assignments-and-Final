const express = require('express');

const path = require('path');

const dotenv = require('dotenv');

const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;

const DB_NAME = process.env.MONGO_DB_NAME;

MongoClient.connect(uri).then(client => {
    const db = client.db(DB_NAME);
    app.locals.db = db;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
    }).catch(err => {
        console.error(err);
    });

    