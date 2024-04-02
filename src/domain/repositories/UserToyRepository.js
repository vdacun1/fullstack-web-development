const mongoose = require('mongoose');
const UserToySchema = require('../models/UserToySchema');
const Config = require('../../infrastructure/Config');

const UserToyRepository = () => {
  const UserToyModel = mongoose.model('UserToy', UserToySchema);

  UserToyModel.getLastItemsCreated = async (
    limit = Config.page_size,
    page = 1,
  ) => {
    await UserToyModel.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ created_at: -1 })
      .exec();
  };

  UserToyModel.getMyLastItemsCreated = async (
    user,
    limit = Config.page_size,
    page = 1,
  ) => {
    await UserToyModel.find({ user })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ created_at: -1 })
      .exec();
  };

  UserToyModel.getRanking = async (limit = Config.page_size, page = 1) => {
    await UserToyModel.aggregate()
      .group({
        _id: '$user',
        total: { $sum: 1 },
      })
      .sort({ total: -1 })
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();
  };

  UserToyModel.getMyRanking = async (
    user,
    limit = Config.page_size,
    page = 1,
  ) => {
    await UserToyModel.aggregate()
      .match({ user })
      .group({
        _id: '$user',
        total: { $sum: 1 },
      })
      .sort({ total: -1 })
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();
  };

  return mongoose.model('UserToy', UserToySchema);
};

module.exports = UserToyRepository;
