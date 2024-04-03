const express = require('express');
const { authorize } = require('../../application/validations/AuthValidation');
const GetUserToysRequest = require('../../application/requests/GetUserToysRequest');
const PostUserToyRequest = require('../../application/requests/PostUserToyRequest');
const userToy = express.Router();

userToy.get('/list', authorize);
userToy.get('/list', GetUserToysRequest.validate(), async (req, res) => {
  return await GetUserToysRequest.handle(req, res);
});

userToy.get('/ranking', async (req, res) => {
  return res.status(200).send('Ranking');
});

userToy.post('/create', authorize);
userToy.post('/create', PostUserToyRequest.validate(), async (req, res) => {
  return await PostUserToyRequest.handle(req, res);
});

module.exports = userToy;
