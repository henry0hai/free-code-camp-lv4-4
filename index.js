const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { 
  getAllUsers, 
  getUser,
  getUserById, 
  createUser, 
  deleteUser, 
  deleteAllUsers 
} = require('./users');

const { createExercise } = require('./exercise');


// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Users
app.get('/api/users', (req, res) => {
  res.json(getAllUsers());
});

app.get('/api/users/:username', (req, res) => {
  const user = getUser(req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/api/users/:_id', (req, res) => {
  const user = getUserById(req.params._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/api/users', (req, res) => {
  try {
    const user = createUser(req.body.username);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete('/api/users/:username', (req, res) => {
  if (deleteUser(req.params.username)) {
    res.status(204).end();
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/api/users', (req, res) => {
  deleteAllUsers();
  res.status(204).end();
});

// Exercises
app.post('/api/users/:_id/exercises', (req, res) => {
  try {
    const exercise = createExercise(
      req.params._id,
      req.body.description,
      req.body.duration,
      req.body.date
    );
    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
