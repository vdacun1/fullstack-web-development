const express = require('express');
const RegisterRequest = require('../../application/requests/RegisterRequest');

const user = express.Router();

user.post('/register', RegisterRequest.validate(), RegisterRequest.handle);

user.post('/forgot-password', async (req, res) => {
  return res.send('Forgot password');
});

user.post('/confirm-email', async (req, res) => {
  return res.send('Confirm email');
});

module.exports = user;
