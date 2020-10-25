var express = require('express');
var router = express.Router();

const {userPointer} = require('../controllers/userPointer');

router.get('/userPointer', userPointer);

module.exports = router;