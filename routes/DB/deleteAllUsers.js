var express = require('express');
var router = express.Router();

const {deleteAllUsers} = require('../../controllers/db/deleteAllUsers');

router.get('/deleteAllUsers', deleteAllUsers);

module.exports = router;
