const Config = require("../infrastructure/Config");

const MongoDB = {
  getURI: () => {
    const auth = `${Config.mongo.user}:${Config.mongo.password}`;
    const host = `${Config.mongo.host}:${Config.mongo.port}`;
    const database = Config.mongo.db;

    return `mongodb://${auth}@${host}/${database}`;
  },
};

module.exports = MongoDB;
