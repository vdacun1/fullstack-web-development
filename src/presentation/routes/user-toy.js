const express = require('express');
const { authorize } = require('../../application/validations/AuthValidation');
const GetUserToysRequest = require('../../application/requests/GetUserToysRequest');
const PostUserToyRequest = require('../../application/requests/PostUserToyRequest');
const userToy = express.Router();

// Limiter is a middleware that limits the number of requests per IP.
const { limiter } = require('../../infrastructure/Config');

userToy.get('/list', limiter, authorize);
userToy.get('/list', GetUserToysRequest.validate(), async (req, res) => {
  return await GetUserToysRequest.handle(req, res);
});

userToy.get('/ranking', async (req, res) => {
  return res.status(200).send('Ranking');
});

userToy.post('/create', limiter, authorize);
userToy.post('/create', PostUserToyRequest.validate(), async (req, res) => {
  return await PostUserToyRequest.handle(req, res);
});

module.exports = userToy;
