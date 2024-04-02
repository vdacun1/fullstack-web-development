const Config = require('../infrastructure/Config');
const mongoose = require('mongoose');

const getMongoUri = () => {
  const auth = `${Config.mongo.user}:${Config.mongo.password}`;
  const host = `${Config.mongo.host}:${Config.mongo.port}`;
  const database = Config.mongo.db;

  return `mongodb://${auth}@${host}/${database}`;
};

const MongoDB = {
  connect: async () => {
    return await mongoose.connect(getMongoUri());
  },
};

module.exports = MongoDB;
