var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var userController = require('../controllers/users');

// Get ALL user and create user
router.route('/')
  .get(userController.getAll)
  .post(userController.createUser);

// // Get DB Stats
// router.route('/info')
//   .get(userController.userInfo);

// Get User by ID
router.route('/:user_id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.removeUserById);

// Get User by EMAIL
router.route('/u')
  .post(userController.getUserByEmail);

//Login user
router.route('/auth')
  .post(userController.authUser);

module.exports = router;
