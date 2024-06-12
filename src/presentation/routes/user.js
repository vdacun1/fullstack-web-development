const express = require('express');
const { authorize } = require('../../application/validations/AuthValidation');
const RegisterRequest = require('../../application/requests/RegisterRequest');
const GetUserRequest = require('../../application/requests/GetUserRequest');
const ConfirmEmailUseCase = require('../../application/usecases/ConfirmEmailUseCase');

const { limiter } = require('../../infrastructure/Config');

const user = express.Router();

user.get('/', limiter, authorize, GetUserRequest.validate(), GetUserRequest.handle);

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
