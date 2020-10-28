//const { players } = require("./startGame");

// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Dcs
exports.initialiseHandPanel = function(req, res) {
    players = JSON.parse(req.query.playersData);
    index =[];
    data='';  
    for(var i=0;i< players.length;i++){
        if(players[i].name === req.query.userName){
            
           for( var j=0;j<players[i].dcsArray.length;j++){
               data = data+'<a href='+players[i].dcsArray[j].name+'><img id ="dcName" class="hand-panel-dc" src='+players[i].dcsArray[j].url+'></img></a>';
            }  
        }         
    } 
     data  = JSON.stringify(data) 
    return res.send(data);
};

// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Dcs
exports.updateHandPanelDcs = function(req, res) {
    players = JSON.parse(req.query.playersData);
    index =[];
    data='';  
    for(var i=0;i< players.length;i++){
        if(players[i].name === req.query.userName){
            
           for( var j=0;j<players[i].dcsArray.length;j++){
               data = data+'<a href='+players[i].dcsArray[j].name+'><img id ="dcName" class="hand-panel-dc" src='+players[i].dcsArray[j].url+'></img></a>';
            }  
        }         
    } 
     data  = JSON.stringify(data) 
    return res.send(data);
};

// This function calls at after every turn in the game flow when player updates their hand - this will update the hand panel Ccs
exports.updateHandPanelCcs = function(req, res) {
    players = JSON.parse(req.query.playersData);
    console.log(players)
    index =[];
    data=''; 
    
    /*testing
    players[i].ccsArray[j].url = '/images/characterCards/3Magician.jpg';
    ****************** */
    for(var i=0;i< players.length;i++){
        if(players[i].name === req.query.userName){
            
           for( var j=0;j<players[i].ccsArray.length;j++){
               data = data+'<a href='+players[i].ccsArray[j].name+'><img id ="ccName" class="hand-panel-cc" src='+players[i].ccsArray[j].url+'></img></a>';
            }  
        }         
    } 
    
    data  = JSON.stringify(data) 
    return res.send(data);
};

// this function calls when the player selects a Cc from the hand panel- this will return the Cc name(chose name to clear visibilty instead of the rank)
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
    data = 'visible';
    return res.json({displayDcHtml, data});
};

// this function is to return the game info card name as gic to use in the zoom feature
exports.returnSelectedGicFromHandPanel = (req, res) => {
    CcName = "assasin";
    return cName;
};