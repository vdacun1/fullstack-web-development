const mongoose = require('mongoose');
const UserToySchema = require('../models/UserToySchema');
const Config = require('../../infrastructure/Config');

const UserToyRepository = () => {
  const UserToyModel = mongoose.model('UserToy', UserToySchema);

  UserToyModel.getUserLastItemsCreated = async (
    user,
    limit = Config.page_size,
    page = 1,
  ) => {
    return await UserToyModel.find({ user })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ created_at: -1 })
      .exec();
  };

  return UserToyModel;
};

module.exports = UserToyRepository;
