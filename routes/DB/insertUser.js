var express = require('express');
var router = express.Router();

const {insertUser} = require('../../controllers/db/user');

router.get('/insertUser', insertUser);

module.exports = router;
