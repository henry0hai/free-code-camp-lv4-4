const { getUserById } = require('./users');

let exercises = [];

function createExercise(_id, description, duration, date) {
  const user = getUserById(_id);
  if (!user) {
    throw new Error('User not found');
  }
  if (!description || description.trim() === '') {
    throw new Error('Description is required');
  }
  if (!duration || isNaN(duration) || duration <= 0) {
    throw new Error('Duration must be a positive number');
  }
  if (date && isNaN(Date.parse(date))) {
    throw new Error('Invalid date format');
  }
  const exercise = {
    username: user.username,
    description,
    duration: parseInt(duration),
    date: date ? new Date(date).toDateString() : new Date().toDateString(),
    _id
  };
  exercises.push(exercise);
  return exercise;
}

function getExercises() {
  return exercises;
}

module.exports = { createExercise, getExercises };
