const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlagSchema = new Schema({
  flagNumber: {
    type: String,
    required: true
  },
  flagValue: {
    type: String,
    required: true
  }
});

module.exports = Flag = mongoose.model('flag', FlagSchema);
