const {characterCards}  = require("../modules/characterCards");
var cCards = [1,2,3,4,5,6,7,8,9]
var ccSelected = [];
exports.selectionPanel = function (req, res) {
  var clickCount = req.query.clickCount;
  //console.log(cCards[6].location);
  //   var faceUpCards = [];
  //     var faceDownCards = [];
  //   var playerCharcCards = [];
  if (clickCount < 3) {
    var randNumber = Math.floor(Math.random() * cCards.length);
    randNumber = cCards[randNumber];
    console.log("randnumber: " + randNumber);
    while (randNumber == 4) {
        var randNumber = Math.floor(Math.random() * cCards.length);
        randNumber = cCards[randNumber];
      console.log("randnumber: " + randNumber);
    }
    if (randNumber != 4) {
      if (ccSelected.indexOf(randNumber) === -1) {
        ccSelected.push(randNumber);
        if(randNumber>-1){
            var index = cCards.indexOf(randNumber)
        cCards.splice(index, 1);
        console.log("cCards: " + cCards);
        }
        //     send rand number to env
        var cardLoc = characterCards[randNumber].location;
       // console.log(characterCards[randNumber].location);
        return res.send({cardLoc,cCards});
      }
    }
  }
  if (clickCount == 3) {
    var randNumber = Math.floor(Math.random() * cCards.length);
    randNumber = cCards[randNumber];
    console.log("randnumber: " + randNumber);
    if (ccSelected.indexOf(randNumber) === -1) {
        ccSelected.push(randNumber);
        if(randNumber>-1){
            var index = cCards.indexOf(randNumber)
        cCards.splice(index, 1);
        console.log("cCards: " + cCards);
        }
        //     send rand number to env
        var cardLoc = characterCards[randNumber].location;
        console.log(characterCards[randNumber].location);
        return res.send({cardLoc,cCards});
      }
  }
};
