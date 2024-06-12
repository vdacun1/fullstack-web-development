const mongoose = require('mongoose');
const UserToySchema = require('../models/UserToySchema');
const Config = require('../../infrastructure/Config');

const UserToyRepository = () => {
  const UserToyModel = mongoose.model('UserToy', UserToySchema);

  UserToyModel.getUserLastItemsCreated = async (
    user,
    page = 1,
    limit = Config.page_size,
  ) => {
    return await UserToyModel.find({ user })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ created_at: -1 })
      .exec();
  };

  UserToyModel.getGlobalRanking = async (
    page = 1,
    limit = Config.page_size,
  ) => {
    page = parseInt(page);
    limit = parseInt(limit);

    return await UserToyModel.aggregate()
      .group({
        _id: {
          toy: '$toy',
          color: '$color',
          accessory: '$accessory',
        },
        total: { $sum: '$quantity' },
      })
      .sort({ total: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .exec();
  };

  return UserToyModel;
};

module.exports = UserToyRepository;
