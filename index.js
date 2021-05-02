const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route imports 
const recordsRoute = require('./routes/records.js');
const notFoundRoute = require('./routes/notFound.js');

app.use('/records', recordsRoute);
app.use((err, req, res, next) => {
    const status = err.getStatusCode ? err.getStatusCode() : 500
    return res.status(status).json({
        code: false,
        msg: err.message
    });
  });
app.use(notFoundRoute);

mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', (client) => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to MongoDB.');
});

app.listen(port, () => console.log(`listening on ${port}`));

module.exports = app;