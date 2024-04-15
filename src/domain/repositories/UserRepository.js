const mongoose = require('mongoose');
const UserSchema = require('../models/UserSchema');

const UserRepository = () => {
  const UserModel = mongoose.model('User', UserSchema);

  UserModel.getEmailVerificationCodeByUserId = async (id) => {
    return await UserModel.findOne({ _id: id })
      .select('+email_verification_code')
      .exec();
  };

  UserModel.getPasswordByEmail = async (email) => {
    return await UserModel.findOne({ email })
      .select('+password +email_verified')
      .exec();
  };

  return UserModel;
};

module.exports = UserRepository;
