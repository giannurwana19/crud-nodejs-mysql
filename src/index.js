const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 4000;
const db = require('./config/db');
const User = require('./models/User');

app.use(morgan('common'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.authenticate()
  .then(() => console.log('berhasil terkoneksi'))
  .catch(err => console.log(err));

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error!' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    res.status(200).json({ data: user });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: 'Server Error!' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({ username, email, password });

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

app.put('/users/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  const { username, email, password } = req.body;

  user
    .update({ username, email, password }, { where: { id: user.id } })
    .then(async () => {
      res.status(200).json({
        message: 'User Updated successfully',
        data: user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Internal server error!!!',
      });
    });
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  user
    .destroy({ where: { id: user.id } })
    .then(() => {
      res.status(200).json({
        message: 'User deleted successfully',
        data: user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Internal server error!!!',
      });
    });
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

// DOCS

// db.authenticate();
// untuk mengkoneksikan nodejs dan mysql
