const express = require('express');
const GetColorsUseCase = require('../../application/usecases/GetColorsUseCase');

const color = express.Router();

color.get('/list', GetColorsUseCase.handle);

module.exports = color;
