var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var userController = require('../controllers/users');

/* GET users listing. */
router.route('/')
  .get(userController.getAll)
  .post(userController.createUser);

router.route('/:user_id')
  .get(userController.getUserById);

module.exports = router;
