const {characterCards} = require('../modules/characterCards');
var cCards = [1,2,3,4,5,6,7,8,9]

exports.selectionPanel = function (req, res) {
    function stepOne(){
        var faceUpCards = [];
        var faceDownCards = [];
        var playerCharcCards = [];
    if(faceUpCards.length<4){
        var randNumber = Math.floor(Math.random() * (9 - 1) + 1);
        if (randNumber != 4){
            if(faceUpCards.indexOf(randNumber) === -1) {
                faceUpCards.push(randNumber);
                cCards.splice(randNumber,1)
                //send rand number to env
            }
        else
        randNumber = Math.floor(Math.random() * (9 - 1) + 1);
        }
    }
    if(faceUpCards.length==3 && faceDownCards.length<1){
        var randNumber = Math.floor(Math.random() * (9 - 1) + 1);
        if (randNumber != 4){
            if(faceUpCards.indexOf(randNumber) === -1) {
                faceUpCards.push(randNumber);
                cCards.splice(randNumber,1)
                //send rand number to env
            }
        else
        randNumber = Math.floor(Math.random() * (9 - 1) + 1);
        }
    }
}
}
