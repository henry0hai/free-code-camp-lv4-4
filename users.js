const uuid = require('uuid');

let users = [];

function getAllUsers() {
  return users;
}

function getUser(username) {
  return users.find((u) => u.username === username);
}

function getUserById(id) {
  return users.find((u) => u._id === id);
}

function createUser(username) {
  if (!username || username.trim() === '') {
    throw new Error('Username is required');
  }
  if (users.some((u) => u.username === username)) {
    throw new Error('Username already exists');
  }
  const user = { _id: uuid.v4(), username };
  users.push(user);
  return user;
}

function deleteUser(username) {
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function deleteAllUsers() {
  users = [];
}

// This code can be further integrated with a database like MongoDB.

module.exports = { getAllUsers, getUser, getUserById, createUser, deleteUser, deleteAllUsers };
