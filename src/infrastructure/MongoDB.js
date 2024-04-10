const Config = require('../infrastructure/Config');
const mongoose = require('mongoose');

const getMongoUri = () => {
  const auth = `${Config.mongo.user}:${Config.mongo.password}`;
  const host = `${Config.mongo.host}:${Config.mongo.port}`;
  const database = Config.mongo.db;

  return `mongodb://${auth}@${host}/${database}`;
};

const MongoDB = {
  connect: async (mongoUri) => {
    if (!mongoUri) {
      mongoUri = getMongoUri();
    }
    return await mongoose.connect(mongoUri);
  },

  disconnect: async () => {
    return await mongoose.connection.close();
  },

  initialize: async () => {
    const ToySchema = require('../domain/models/ToySchema');
    const ColorSchema = require('../domain/models/ColorSchema');
    const AccessorySchema = require('../domain/models/AccessorySchema');

    const ToyModel = mongoose.model('Toy', ToySchema);
    const ColorModel = mongoose.model('Color', ColorSchema);
    const AccessoryModel = mongoose.model('Accessory', AccessorySchema);

    await ToyModel.create([
      { name: 'perro' },
      { name: 'conejo' },
      { name: 'oso' },
      { name: 'mapache' },
      { name: 'gato' },
    ]);

    await ColorModel.create([
      { name: 'rosa' },
      { name: 'verde' },
      { name: 'amarillo' },
    ]);

    await AccessoryModel.create([
      { name: 'camiseta y pelota de fútbol' },
      { name: 'guitarra eléctrica' },
      { name: 'notebook' },
    ]);
  },
};

module.exports = MongoDB;
