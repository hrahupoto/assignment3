var express = require('express');
var router = express.Router();

const {deleteAllUsers} = require('../../controllers/db/user');

router.get('/deleteAllUsers', deleteAllUsers);

module.exports = router;
