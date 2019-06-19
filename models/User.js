const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: {
    id: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  points: {
    type: Number,
    required: true
  },
  flagsSubmitted: {
    type: Array,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);
