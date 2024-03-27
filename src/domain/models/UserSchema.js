const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  picture: {
    type: String,
    default: "",
    maxLength: 1024 * 100,
    select: false,
  },
  picture_type: {
    type: String,
    default: "svg",
    enum: ["svg", "png", "jpg", "jpeg"],
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = UserSchema;
