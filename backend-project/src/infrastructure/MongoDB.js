const dotenv = require("dotenv");

const MongoDB = {
  getURI: () => {
    dotenv.config();

    const auth = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}`;
    const host = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    const database = process.env.MONGO_DB;

    return `mongodb://${auth}@${host}/${database}`;
  },
};

module.exports = MongoDB;
