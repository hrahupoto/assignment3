var express = require('express');
var router = express.Router();

const {initialiseHandPanel,updateHandPanelDcs,updateHandPanelCcs,returnSelectedDcFromHandPanel,returnSelectedCcFromHandPanel,returnSelectedGtcFromHandPanel,returnSelectedGicFromHandPanel} = require('../controllers/handPanel');

router.get('/handPanel.initialiseHandPanel', initialiseHandPanel);
router.get('/handPanel.updateHandPanelDcs', updateHandPanelDcs);
router.get('/handPanel.updateHandPanelCcs', updateHandPanelCcs);
router.get('/handPanel.returnSelectedDcFromHandPanel', returnSelectedDcFromHandPanel);
router.get('/handPanel.returnSelectedCcFromHandPanel', returnSelectedCcFromHandPanel);
router.get('/handPanel.returnSelectedGtcFromHandPanel', returnSelectedGtcFromHandPanel);
router.get('/handPanel.returnSelectedGicFromHandPanel', returnSelectedGicFromHandPanel);

module.exports = router;