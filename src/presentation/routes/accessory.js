const express = require('express');
const GetAccessoriesUseCase = require('../../application/usecases/GetAccessoriesUseCase');

const accessory = express.Router();

accessory.get('/list', async (req, res) => {
  return await GetAccessoriesUseCase.handle(res);
});

module.exports = accessory;
