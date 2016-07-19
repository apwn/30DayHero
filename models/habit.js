var mongoose = require('mongoose');

var habitSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  habit: String
});

module.exports = mongoose.model('Habit', habitSchema);
