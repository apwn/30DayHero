var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
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
  if (!this.created_at) this.created_at = currentDate;

  var user = this;

  if(!user.isModified('password')) return next();

  var hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  next();
});

// delete entries from JSON
userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

// whitelist entries from JSON
// userSchema.set('toJSON', {
//     transform: function(doc, ret, options) {
//         var retJson = {
//             email: ret.email,
//             registered: ret.registered,
//             modified: ret.modified
//         };
//         return retJson;
//     }
// });

userSchema.methods.authenticate = function(pwd, callback){
  // Compare pwd with bcrypt stored pwd
  bcrypt.compare(pwd, this.password, callback);
};


var User = mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);
module.exports = {
  User: User
};
