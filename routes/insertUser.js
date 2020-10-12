var express = require('express');
var router = express.Router();

const {insertUser} = require('../controllers/insertUser');

router.get('/insertUser', insertUser);

module.exports = router;
