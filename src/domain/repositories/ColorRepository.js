const mongoose = require("mongoose");
const ColorSchema = require("../models/ColorSchema");

const ColorRepository = () => {
  return mongoose.model("Color", ColorSchema);
};

module.exports = ColorRepository;
