var User = require('./models/user');

function getAll(req,res){
  User.find({}, function(error, candy) {
  if(error) response.json({message: 'Could not find candy b/c:' + error});

  response.render('candies/index', {candy: candy, title: "Candyland"});
  });
}

module.exports = {
  getAll: getAll,
  // createCandy: createCandy,
  // getCandy: getCandy,
  // updateCandy: updateCandy,
  // removeCandy: removeCandy,
  // newCandy: newCandy,
  // editCandy: editCandy
};
