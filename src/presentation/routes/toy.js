const express = require('express');
const GetToysUseCase = require('../../application/usecases/GetToysUseCase');

const toy = express.Router();

toy.get('/list', async (req, res) => {
  return await GetToysUseCase.handle(res);
});

module.exports = toy;
