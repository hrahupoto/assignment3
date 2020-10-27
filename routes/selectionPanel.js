var express = require('express');
var router = express.Router();

const {selectionPanel} = require('../controllers/selectionPanel');

router.get('/selectionPanel', selectionPanel);

module.exports = router;
