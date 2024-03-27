const mongoose = require("mongoose");
const UserSchema = require("../models/UserSchema");

const UserRepository = () => {
  return mongoose.model("User", UserSchema);
};

module.exports = UserRepository;
