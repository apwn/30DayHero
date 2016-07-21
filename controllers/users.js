var userModel = require('../models/user');
var User = userModel.User;
var jwt = require('jsonwebtoken');
var config     = require('../config/config');

var secret = config.secret;

function userInfo(req,res) {
  User.count({}, function(error, count) {
      if (error) res.status(401).json({
          message: 'Could not find user b/c:' + error
      });

      res.json({
          userCount: count,
          title: "User Stats"
      });
  });
}

function getAll(req, res) {
    User.find({}, function(error, user) {
        if (error) res.status(401).json({
            message: 'Could not find user b/c:' + error
        });

        res.json({
            user: user,
            title: "List of Users"
        });
    });
}

function createUser(req, res) {
    var user = new User(req.body); // create a new instance of the User model

    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);
            var token = jwt.sign(user, secret, {expiresIn: '24h'});
        res.json({
            success: true,
            message: 'User created!',
            token: token,
            user: user
        });
    });
}

function getUserById(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.status(401).json({
            message: 'Could not find user b/c:' + err
        });
        // show the user with ID
        if (user) {
            res.json(user);
        }
    });
}

function getUserByEmail(req, res) {
    var user = req.body;
    console.log(req.body);
    User.find({
        email: user.email
    }, function(err, user) {
        if (err) res.status(401).json({
            message: 'Could not find user b/c:' + err
        });
        // object of the user
        if (user) {
            res.json(user);
        }
    });
}

function authUser(req,res){
  var userParams = req.body;

    User.findOne({
        email: userParams.email
    }, function(err, user) {
        if (!user) {
            res.status(403).json({
                message: "Your email doesn't exist"
            });
        } else {
            user.authenticate(userParams.password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {
                  // if user is found and password is right
                  // create a token
                  var token = jwt.sign(user, secret, {expiresIn: '24h'});
                    res.status(200).json({success: true, message: 'logged in', token: token, user: user});
                } else {
                    res.status(403).json({
                        message: "Your login details were incorrect"
                    });
                }
            });
        }
    });
}

function updateUserById(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.status(401).json({
            message: 'Could not find user b/c:' + err
        });
        console.log(req.body);
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.email) user.email = req.body.email;

        // save the bear
        user.save(function(err) {
            if (err) {
                res.json({
                    message: err
                });
            }
            res.json({
                message: 'User updated!'
            });
        });
    });
}

function removeUserById(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, bear) {
        if (err) {
            res.status(401).json({
                message: err
            });
        }
        res.json({
            message: 'Successfully deleted'
        });
    });
}

module.exports = {
    getAll: getAll,
    userInfo: userInfo,
    createUser: createUser,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    updateUserById: updateUserById,
    removeUserById: removeUserById,
    authUser: authUser
};
