var User = require('../models/user');

function getAll(req, res) {
    User.find({}, function(error, user) {
        if (error) res.json({
            message: 'Could not find user b/c:' + error
        });

        res.json({
            user: user,
            title: "List of Users"
        });
    });
}

function createUser(req, res) {
    var user = new User(req.body); // create a new instance of the Bear model
    //  bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'User created!'
        });
    });
}

function getUserById(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.json({
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
        if (err) res.json({
            message: 'Could not find user b/c:' + err
        });
        // object of the user
        if (user) {
            res.json(user);
        }
    });
}

function updateUserById(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.json({
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
            res.json({
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
    createUser: createUser,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    updateUserById: updateUserById,
    removeUserById: removeUserById
};
