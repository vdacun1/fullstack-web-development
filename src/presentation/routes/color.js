const express = require('express');
const GetColorsUseCase = require('../../application/usecases/GetColorsUseCase');

const color = express.Router();

color.get('/list', async (req, res) => {
  return await GetColorsUseCase.handle(res);
});

module.exports = color;
