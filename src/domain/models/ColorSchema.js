const { Schema } = require('mongoose');

const ColorSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true,
  },
  hex: {
    type: String,
    maxLength: 7,
    minLength: 7,
    select: true,
  },
});

module.exports = ColorSchema;
