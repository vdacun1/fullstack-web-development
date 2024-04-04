const express = require('express');
const LoginRequest = require('../../application/requests/LoginRequest');

const auth = express.Router();

auth.post('/login', LoginRequest.validate(), LoginRequest.handle);

auth.post('/logout', (req, res) => {
  return res.status(200).send('Logout');
});

module.exports = auth;
