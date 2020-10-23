// This function calls at the game start and it will make the hand panel visible
exports.displayHandPanel = function(req, res) {
    data = 'visible';
    return res.send(data);
};

// This function calls at the end of the game to hide the game panel to let show the winner panel
exports.hideHandPanel = function(req, res) {
    DcName = "assasin";
    return DcName;
};

// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Dcs
exports.updateHandPanelDcs = function(req, res) {
    DcName = "assasin";
    return DcName;
};

// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Ccs
exports.updateHandPanelCcs = function(req, res) {
    DcName = "assasin";
    return DcName;
};

// this function calls when the player selects a Dc from the hand panel- this will return the Dc name
exports.returnSelectedDcFromHandPanel = function(req, res) {
    DcName = "assasin";
    return DcName;
};

// this function calls when the player selects a Cc from the hand panel- this will return the Cc name(chose name to clear visibilty instead of the rank)
exports.returnSelectedCcFromHandPanel = function(req, res) {
    CcName = "assasin";
    return CcName;
};

// this function is to return the game term card name as gtc to use in the zoom feature
exports.returnSelectedGtcFromHandPanel = function(req, res) {
    CcName = "assasin";
    return cName;
};

// this function is to return the game info card name as gic to use in the zoom feature
exports.returnSelectedGicFromHandPanel = (req, res) => {
    CcName = "assasin";
    return cName;
};