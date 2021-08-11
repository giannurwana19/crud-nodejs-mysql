const express = require('express');
const app = express();
const morgan = require('morgan');

const port = 4000;
const db = require('./config/db');

app.use(morgan('tiny'));

db.authenticate()
  .then(() => console.log('berhasil terkoneksi'))
  .catch();

app.get('/', (req, res) => {
  res.send('berhasil menulis');
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

// DOCS

// db.authenticate();
// untuk mengkoneksikan nodejs dan mysql
