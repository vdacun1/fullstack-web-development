const express = require('express');
const GetToysUseCase = require('../../application/usecases/GetToysUseCase');

const toy = express.Router();

toy.get('/list', GetToysUseCase.handle);

module.exports = toy;
