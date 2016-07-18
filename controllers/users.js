var User = require('../models/user');

function getAll(req,res){
  User.find({}, function(error, user) {
  if(error) res.json({message: 'Could not find user b/c:' + error});

  res.json({user: user, title: "List of Users"});
  });
}

function createUser(req,res){
  var user = new User(req.body);      // create a new instance of the Bear model
      //  bear.name = req.body.name;  // set the bears name (comes from the request)

       // save the bear and check for errors
       user.save(function(err) {
           if (err)
               res.send(err);

           res.json({ message: 'User created!' });
       });
}

function getUserById(req,res){
  console.log(req.params);
  User.findById(req.params.user_id, function(err, user) {
  if(err) res.json({message: 'Could not find user b/c:' + err});
  // show the user with ID
  if (user){
    res.json(user);
  } 
});
}

module.exports = {
  getAll: getAll,
  createUser: createUser,
  getUserById: getUserById
  // updateCandy: updateCandy,
  // removeCandy: removeCandy,
  // newCandy: newCandy,
  // editCandy: editCandy
};
