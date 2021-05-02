const db = require('./loaders/database.js');
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route imports 
const recordsRoute = require('./routes/records.js');
const notFoundRoute = require('./routes/notFound.js');
const swaggerRoutes = require('./routes/swagger.js');

app.use('/records', recordsRoute);
app.use(swaggerRoutes);
app.use(notFoundRoute);
app.use((err, req, res, next) => {
  const status = err.getStatusCode ? err.getStatusCode() : 500
  return res.status(status).json({
      code: 3,
      msg: err.message
  });
});

// create server after DB connection provided
app.on('db_connected', () => {
  app.listen(process.env.PORT, () => {
    app.emit('up');
    console.log('listening on specified port');
  });
});

db.connect({expressApp: app});

module.exports = app;