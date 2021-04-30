const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on ${port}`));

app.get('/', (req, res) => {
    res.send('hi bitchez');
})