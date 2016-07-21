var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index');
var userController = require('../controllers/users');

/* GET home page. */
router.route('/')
  .get(indexController.indexPage);

  // Get DB Stats
  router.route('/api/info')
    .get(userController.userInfo);

module.exports = router;
