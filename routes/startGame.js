var express = require('express');
var router = express.Router();

const {startGame} = require('../controllers/startGame');

router.get('/startGame', startGame);

module.exports = router;