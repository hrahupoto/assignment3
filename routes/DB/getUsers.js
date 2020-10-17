var express = require('express');
var router = express.Router();

const {getUsers} = require('../../controllers/db/user');

router.get('/getUsers', getUsers);

module.exports = router;
