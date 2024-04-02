const mongoose = require('mongoose');
const UserSchema = require('../models/UserSchema');

const UserRepository = () => {
  const UserModel = mongoose.model('User', UserSchema);

  UserModel.getPasswordByEmail = async (email) => {
    return await UserModel.findOne({ email }).select('+password').exec();
  };

  return UserModel;
};

module.exports = UserRepository;
