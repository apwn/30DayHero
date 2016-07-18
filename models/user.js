var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false  },
  created_at: Date,
  updated_at: Date,
  // softDeleted: { type: Boolean, default: false },
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('User', userSchema);
