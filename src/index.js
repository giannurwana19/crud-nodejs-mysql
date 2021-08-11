const express = require('express');
const app = express();
const morgan = require('morgan');

const port = 4000;
const db = require('./config/db');

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('berhasil menulis');
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
