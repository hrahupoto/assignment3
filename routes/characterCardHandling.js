var express = require('express');
var router = express.Router();

const {initialiseCcPanel} = require('../controllers/characterCardHandling');

router.get('/characterCardHandling.initialiseCcPanel', initialiseCcPanel);


module.exports = router;