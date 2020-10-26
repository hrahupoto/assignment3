// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Dcs
exports.initialiseHandPanel = function(req, res) {
    players = [];
    data='';
    players.push(req.query.playersData);
 
    for(var i=0;i< players.length;i++){
       if(players[i].socketId === req.query.socketId){
            dcs = [];
            dcs.push(players[i].dcsArray);   

            for( var j=0;j<dcs.length;j++){
                data = data+'<a><img id ="dcName" class="hand-panel-dc" src='+dcs[j].url+'></img></a>';
            }  
        }           
    }     
   return res.send(data);
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