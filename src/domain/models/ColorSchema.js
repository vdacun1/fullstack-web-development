const { Schema } = require('mongoose');

const ColorSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  hex: {
    type: String,
    maxLength: 7,
    minLength: 7,
  },
});

module.exports = ColorSchema;
