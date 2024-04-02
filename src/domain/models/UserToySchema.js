const { Schema } = require('mongoose');

const UserToySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toy: {
    type: Schema.Types.ObjectId,
    ref: 'Toy',
    required: true,
  },
  color: {
    type: Schema.Types.ObjectId,
    ref: 'Color',
    required: true,
  },
  accessory: {
    type: Schema.Types.ObjectId,
    ref: 'Accessory',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserToySchema;
