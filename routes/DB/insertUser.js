var express = require('express');
var router = express.Router();

const {insertUser} = require('../../controllers/db/insertUser');

router.get('/insertUser', insertUser);

module.exports = router;
