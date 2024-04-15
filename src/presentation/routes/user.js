const express = require('express');
const RegisterRequest = require('../../application/requests/RegisterRequest');
const ConfirmEmailUseCase = require('../../application/usecases/ConfirmEmailUseCase');

const { limiter } = require('../../infrastructure/Config');

const user = express.Router();

user.post('/register', RegisterRequest.validate(), RegisterRequest.handle);

user.post('/forgot-password', async (req, res) => {
  return res.send('Forgot password');
});

user.get(
  '/confirm-email/:email_verification_code',
  limiter,
  ConfirmEmailUseCase.handle,
);

module.exports = user;
