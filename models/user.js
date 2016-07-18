var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  },
  gh: {
    id: String,
    username: String,
    name: String,
    email: String
  }
});

module.exports = mongoose.model('User', UserSchema);
