var mongoose = require('mongoose');

var habitSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  habit: String,
  added: Date,
  checked: [{
    date: Date
  }],
  totalChecked: Number,
  strikesInRow: Number,
  missedDays: Number
});

module.exports = mongoose.model('Habit', habitSchema);
