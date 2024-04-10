const express = require('express');
const GetAccessoriesUseCase = require('../../application/usecases/GetAccessoriesUseCase');

const accessory = express.Router();

accessory.get('/list', GetAccessoriesUseCase.handle);

module.exports = accessory;
