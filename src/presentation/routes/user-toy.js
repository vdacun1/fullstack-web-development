const express = require('express');
const { authorize } = require('../../application/validations/AuthValidation');
const GetUserToysRequest = require('../../application/requests/GetUserToysRequest');
const PostUserToyRequest = require('../../application/requests/PostUserToyRequest');

const userToy = express.Router();

// Limiter is a middleware that limits the number of requests per IP.
const { limiter } = require('../../infrastructure/Config');

userToy.get(
  '/list',
  limiter,
  authorize,
  GetUserToysRequest.validate(),
  GetUserToysRequest.handle,
);

userToy.get('/ranking', async (req, res) => {
  return res.status(200).send('Ranking');
});

userToy.post(
  '/create',
  limiter,
  authorize,
  PostUserToyRequest.validate(),
  PostUserToyRequest.handle,
);

module.exports = userToy;
