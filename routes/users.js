var express = require('express');
var router = express.Router();

const { createUser, validateUser } = require('../controllers/users')

router
  .post('/register', createUser)
  .post('/login', validateUser)

module.exports = router;