const express = require('express');
const RegisterRequest = require('../../application/requests/RegisterRequest');

const user = express.Router();

user.post('/register', RegisterRequest.validate(), async function (req, res) {
  return await RegisterRequest.handle(req, res);
});

user.post('/forgot-password', async function (req, res) {
  return res.send('Forgot password');
});

user.post('/confirm-email', async function (req, res) {
  return res.send('Confirm email');
});

module.exports = user;
