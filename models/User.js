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
  flagsSubmitted: [
    {
      flag: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = User = mongoose.model('user', UserSchema);
