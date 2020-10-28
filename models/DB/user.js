const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  num: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('users', user);
