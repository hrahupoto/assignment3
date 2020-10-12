var express = require('express');
var router = express.Router();

const {deleteAllUsers} = require('../controllers/deleteAllUsers');

router.get('/deleteAllUsers', deleteAllUsers);

module.exports = router;
