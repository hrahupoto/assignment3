var express = require('express');
var router = express.Router();

const {userCounter} = require('../controllers/userCounter');

router.get('/userCounter', userCounter);

module.exports = router;