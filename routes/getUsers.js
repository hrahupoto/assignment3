var express = require('express');
var router = express.Router();

const {getUsers} = require('../controllers/getUsers');

router.get('/getUsers', getUsers);

module.exports = router;
