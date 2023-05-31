const { getUserById } = require('./users');
const { getExercises } = require('./exercise');

function getLogs(_id, from, to, limit) {
  const user = getUserById(_id);
  if (!user) {
    throw new Error('User not found');
  }
  console.log("user: ", user);
  console.log("exercises: ", getExercises());
  
  let userExercises = getExercises().filter(e => e._id === _id);
  if (from) {
    const fromDate = new Date(from);
    userExercises = userExercises.filter(e => new Date(e.date) >= fromDate);
  }
  if (to) {
    const toDate = new Date(to);
    userExercises = userExercises.filter(e => new Date(e.date) <= toDate);
  }
  if (limit) {
    userExercises = userExercises.slice(0, limit);
  }

  console.log("userExercises: ", userExercises);
  return {
    _id,
    username: user.username,
    count: userExercises.length,
    log: userExercises
  };
}

module.exports = { getLogs };