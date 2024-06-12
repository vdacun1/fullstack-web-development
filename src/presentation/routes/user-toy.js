const express = require('express');
const { authorize } = require('../../application/validations/AuthValidation');
const GetUserToysRequest = require('../../application/requests/GetUserToysRequest');
const PostUserToyRequest = require('../../application/requests/PostUserToyRequest');
const GetUserToyRankingRequest = require('../../application/requests/GetUserToyRankingRequest');
const DeleteUserToyRequest = require('../../application/requests/DeleteUserToyRequest');

const userToy = express.Router();

// Limiter is a middleware that limits the number of requests per IP.
const { limiter } = require('../../infrastructure/Config');

userToy.get(
  '/list/:page/:limit',
  limiter,
  authorize,
  GetUserToysRequest.validate(),
  GetUserToysRequest.handle,
);

userToy.get('/ranking/:page/:limit',
  GetUserToyRankingRequest.validate(),
  GetUserToyRankingRequest.handle);

userToy.post(
  '/create',
  limiter,
  authorize,
  PostUserToyRequest.validate(),
  PostUserToyRequest.handle,
);

userToy.delete(
  '/delete/:id',
  limiter,
  authorize,
  DeleteUserToyRequest.validate(),
  DeleteUserToyRequest.handle,
);

module.exports = userToy;
