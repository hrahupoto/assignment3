var express = require('express');
var router = express.Router();

const {initialiseDcPanel} = require('../controllers/districtCardHandling');

router.get('/districtCardHandling.initialiseDcPanel', initialiseDcPanel);


module.exports = router;