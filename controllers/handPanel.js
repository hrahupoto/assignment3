// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Dcs
exports.initialiseHandPanel = function(req, res) {
   //data = req.query.sId;
   /* data = req.query.playersData;
    console.log('-------');
    console.log(data); */

   /* for(var i=0;i< req.players.players.length;i++){
        if(req.players.players[i].socketId === req.socketId)
            for( var j=0;j<req.players.players[i].dcsArray.length;j++){
                displayDcHtml = '<img id ="dcName" class="hand-panel-dc" src="/images/districtCards/'+req.players.players[i].dcsArray[j]+'_DistrictCard.jpg"></img>';
            }            
    }  */
    
   // return res.json(JSON.parse(data));
};

// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Dcs
exports.updateHandPanelDcs = function(req, res) {
    data = 'visible';
    return res.json({displayDcHtml, data});
};

// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Ccs
exports.updateHandPanelCcs = function(req, res) {
    data = '';
    return res.send(data);
};

// this function calls when the player selects a Dc from the hand panel- this will return the Dc name
exports.returnSelectedDcFromHandPanel = function(req, res) {
    data = '';
    return res.send(data);
};

// this function calls when the player selects a Cc from the hand panel- this will return the Cc name(chose name to clear visibilty instead of the rank)
exports.returnSelectedCcFromHandPanel = function(req, res) {
    data = '';
    return res.send(data);
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