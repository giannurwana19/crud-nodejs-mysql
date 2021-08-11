const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 4000;
const db = require('./config/db');
const User = require('./models/User');

app.use(morgan('short'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.authenticate()
  .then(() => console.log('berhasil terkoneksi'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('berhasil menulis');
});

app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Internal server error!!!',
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

// DOCS

// db.authenticate();
// untuk mengkoneksikan nodejs dan mysql
