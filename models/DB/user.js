const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('users', user);
