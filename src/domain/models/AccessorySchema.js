const { Schema } = require("mongoose");

const AccessorySchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 1024,
  },
  picture: {
    type: String,
    default: "",
    maxLength: 1024 * 100,
  },
  picture_type: {
    type: String,
    default: "svg",
    enum: ["svg"],
  },
});

module.exports = AccessorySchema;
