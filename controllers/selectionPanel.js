const {characterCards} = require('../modules/characterCards');
const {Player} = require('../models/player');
var {players} = require('./startGame');
var cCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var ccSelected = [];
var selectCharacter = [];
var updatePlayers = [];
var updatePlayers1 = [];
var updatePlayers2 = [];
var updatePlayers3 = [];
var selectedCCard;
exports.selectionPanel = function (req, res) {
  var clickCount = req.query.clickCount;
  if (clickCount < 3) {
    var randNumber = Math.floor(Math.random() * cCards.length);
    randNumber = cCards[randNumber];
    while (randNumber == 4) {
      var randNumber = Math.floor(Math.random() * cCards.length);
      randNumber = cCards[randNumber];
    }
    if (randNumber != 4) {
      if (ccSelected.indexOf(randNumber) === -1) {
        ccSelected.push(randNumber);
        if (randNumber > -1) {
          var index = cCards.indexOf(randNumber);
          cCards.splice(index, 1);
          //console.log("cCards: " + cCards);
        }
        //     send rand number to env
        var cardLoc = characterCards[randNumber].location;
        // console.log(characterCards[randNumber].location);
        return res.send({cardLoc, cCards});
      }
    }
  }
  if (clickCount == 3) {
    var randNumber = Math.floor(Math.random() * cCards.length);
    randNumber = cCards[randNumber];
    //console.log("randnumber: " + randNumber);
    if (ccSelected.indexOf(randNumber) === -1) {
      ccSelected.push(randNumber);
      if (randNumber > -1) {
        var index = cCards.indexOf(randNumber);
        cCards.splice(index, 1);
        //console.log("cCards: " + cCards);
      }
      //     send rand number to env
      var cardLoc = characterCards[randNumber].location;
      //console.log(characterCards[randNumber].location);
      return res.send({cardLoc, cCards});
    }
  }
  if (clickCount == 4) {
    for (var i = 0; i < cCards.length; i++) {
      selectCharacter[i] = characterCards[cCards[i]];
    }
    console.log(selectCharacter);
    return res.send(selectCharacter);
  }

  if (clickCount == 5) {
    var cName = req.query.className;
    var uName = req.query.userName;
    for (var i = 0; i < players.length; i++) {
      if (players[i].name == uName) {
        if (cName == 'Assassin') {
          selectedCCard = characterCards[1];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (1 > -1) {
            var index = cCards.indexOf(1);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Theif') {
          selectedCCard = characterCards[2];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (2 > -1) {
            var index = cCards.indexOf(2);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Magician') {
          selectedCCard = characterCards[3];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (3 > -1) {
            var index = cCards.indexOf(3);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'King') {
          selectedCCard = characterCards[4];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (4 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Bishop') {
          selectedCCard = characterCards[5];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (5 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Merchant') {
          selectedCCard = characterCards[6];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (6 > -1) {
            var index = cCards.indexOf(6);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Architect') {
          selectedCCard = characterCards[7];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (7 > -1) {
            var index = cCards.indexOf(7);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Warload') {
          selectedCCard = characterCards[8];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (8 > -1) {
            var index = cCards.indexOf(8);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Artist') {
          selectedCCard = characterCards[9];
          updatePlayers.push(
            new Player(
              players[i].num,
              players[i].name,
              players[i].dob,
              players[i].coins,
              players[i].dcsArray,
              selectedCCard,
              players[i].turn,
              players[i].crowned
            )
          );
          if (9 > -1) {
            var index = cCards.indexOf(9);
            cCards.splice(index, 1);
          }
        }
      } else {
        updatePlayers.push(
          new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            players[i].ccsArray,
            players[i].turn,
            players[i].crowned
          )
        );
      }
    }
    console.log('line 244:' + players);
    console.log(updatePlayers);
    console.log(cCards);
    return res.send(cCards);
  }
  if (clickCount == 6) {
    var cCards1 = req.query.updatedCCards;
    console.log(cCards1);
    var j;
    for (var i = 0; i < updatePlayers.length; i++) {
      if (updatePlayers[i].turn == true) {
        updatePlayers[i].turn = false;
        j = i;
        j = j + 1;
        if (j == 4) {
          j = 0;
        }
        updatePlayers[j].turn = true;
        break;
      }
    }
    console.log(cCards1.length);
    var newCharacters = [];
    for (var i = 0; i < cCards1.length; i++) {
      newCharacters[i] = characterCards[cCards1[i]];
    }
    console.log('276:' + updatePlayers);
    return res.send({updatePlayers, newCharacters});
  }
  if (clickCount == 7) {
    var cName = req.query.className;
    //var uName = req.query.userName;
    for (var i = 0; i < players.length; i++) {
      if (updatePlayers[i].turn == true) {
        if (cName == 'Assassin') {
          selectedCCard = characterCards[1];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (1 > -1) {
            var index = cCards.indexOf(1);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Theif') {
          selectedCCard = characterCards[2];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (2 > -1) {
            var index = cCards.indexOf(2);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Magician') {
          selectedCCard = characterCards[3];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (3 > -1) {
            var index = cCards.indexOf(3);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'King') {
          selectedCCard = characterCards[4];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (4 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Bishop') {
          selectedCCard = characterCards[5];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (5 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Merchant') {
          selectedCCard = characterCards[6];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (6 > -1) {
            var index = cCards.indexOf(6);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Architect') {
          selectedCCard = characterCards[7];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (7 > -1) {
            var index = cCards.indexOf(7);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Warload') {
          selectedCCard = characterCards[8];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (8 > -1) {
            var index = cCards.indexOf(8);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Artist') {
          selectedCCard = characterCards[9];
          updatePlayers1.push(
            new Player(
              updatePlayers[i].num,
              updatePlayers[i].name,
              updatePlayers[i].dob,
              updatePlayers[i].coins,
              updatePlayers[i].dcsArray,
              selectedCCard,
              updatePlayers[i].turn,
              updatePlayers[i].crowned
            )
          );
          if (9 > -1) {
            var index = cCards.indexOf(9);
            cCards.splice(index, 1);
          }
        }
       } 
       else {
        updatePlayers1.push(
          new Player(
            updatePlayers[i].num,
            updatePlayers[i].name,
            updatePlayers[i].dob,
            updatePlayers[i].coins,
            updatePlayers[i].dcsArray,
            updatePlayers[i].ccsArray,
            updatePlayers[i].turn,
            updatePlayers[i].crowned
          )
        );
      }
    }

    console.log(updatePlayers1);
    console.log(cCards);
    return res.send(cCards);
  }

  if (clickCount == 8) {
    var cCards1 = req.query.updatedCCards;
    console.log(cCards1);
    var j;
    for (var i = 0; i < updatePlayers1.length; i++) {
      if (updatePlayers1[i].turn == true) {
        updatePlayers1[i].turn = false;
        j = i;
        j = j + 1;
        if (j == 4) {
          j = 0;
        }
        updatePlayers1[j].turn = true;
        break;
      }
    }
    console.log(cCards1.length);
    var newCharacters = [];
    for (var i = 0; i < cCards1.length; i++) {
      newCharacters[i] = characterCards[cCards1[i]];
    }
    console.log('276:' + updatePlayers1);
    return res.send({updatePlayers1, newCharacters});
  }
  if (clickCount == 9) {
    var cName = req.query.className;
    var uName = req.query.userName;
    for (var i = 0; i < players.length; i++) {
      if (players[i].name == uName) {
        if (cName == 'Assassin') {
          selectedCCard = characterCards[1];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (1 > -1) {
            var index = cCards.indexOf(1);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Theif') {
          selectedCCard = characterCards[2];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (2 > -1) {
            var index = cCards.indexOf(2);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Magician') {
          selectedCCard = characterCards[3];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (3 > -1) {
            var index = cCards.indexOf(3);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'King') {
          selectedCCard = characterCards[4];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (4 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Bishop') {
          selectedCCard = characterCards[5];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (5 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Merchant') {
          selectedCCard = characterCards[6];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (6 > -1) {
            var index = cCards.indexOf(6);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Architect') {
          selectedCCard = characterCards[7];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (7 > -1) {
            var index = cCards.indexOf(7);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Warload') {
          selectedCCard = characterCards[8];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (8 > -1) {
            var index = cCards.indexOf(8);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Artist') {
          selectedCCard = characterCards[9];
          updatePlayers2.push(
            new Player(
              updatePlayers1[i].num,
              updatePlayers1[i].name,
              updatePlayers1[i].dob,
              updatePlayers1[i].coins,
              updatePlayers1[i].dcsArray,
              selectedCCard,
              updatePlayers1[i].turn,
              updatePlayers1[i].crowned
            )
          );
          if (9 > -1) {
            var index = cCards.indexOf(9);
            cCards.splice(index, 1);
          }
        }
      } else {
        updatePlayers2.push(
          new Player(
            updatePlayers1[i].num,
            updatePlayers1[i].name,
            updatePlayers1[i].dob,
            updatePlayers1[i].coins,
            updatePlayers1[i].dcsArray,
            updatePlayers1[i].ccsArray,
            updatePlayers1[i].turn,
            updatePlayers1[i].crowned
          )
        );
      }
    }

    console.log(updatePlayers2);
    console.log(cCards);
    return res.send(cCards);
  }

  if (clickCount == 10) {
    var cCards1 = req.query.updatedCCards;
    console.log(cCards1);
    var j;
    for (var i = 0; i < updatePlayers2.length; i++) {
      if (updatePlayers2[i].turn == true) {
        updatePlayers2[i].turn = false;
        j = i;
        j = j + 1;
        if (j == 4) {
          j = 0;
        }
        updatePlayers2[j].turn = true;
        break;
      }
    }
    console.log(cCards1.length);
    var newCharacters = [];
    for (var i = 0; i < cCards1.length; i++) {
      newCharacters[i] = characterCards[cCards1[i]];
    }
    console.log('276:' + updatePlayers);
    return res.send({updatePlayers2, newCharacters});
  }
  if (clickCount == 11) {
    var cName = req.query.className;
    var uName = req.query.userName;
    for (var i = 0; i < players.length; i++) {
      if (players[i].name == uName) {
        if (cName == 'Assassin') {
          selectedCCard = characterCards[1];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (1 > -1) {
            var index = cCards.indexOf(1);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Theif') {
          selectedCCard = characterCards[2];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (2 > -1) {
            var index = cCards.indexOf(2);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Magician') {
          selectedCCard = characterCards[3];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (3 > -1) {
            var index = cCards.indexOf(3);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'King') {
          selectedCCard = characterCards[4];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (4 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Bishop') {
          selectedCCard = characterCards[5];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (5 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Merchant') {
          selectedCCard = characterCards[6];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (6 > -1) {
            var index = cCards.indexOf(6);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Architect') {
          selectedCCard = characterCards[7];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (7 > -1) {
            var index = cCards.indexOf(7);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Warload') {
          selectedCCard = characterCards[8];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (8 > -1) {
            var index = cCards.indexOf(8);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Artist') {
          selectedCCard = characterCards[9];
          updatePlayers3.push(
            new Player(
              updatePlayers2[i].num,
              updatePlayers2[i].name,
              updatePlayers2[i].dob,
              updatePlayers2[i].coins,
              updatePlayers2[i].dcsArray,
              selectedCCard,
              updatePlayers2[i].turn,
              updatePlayers2[i].crowned
            )
          );
          if (9 > -1) {
            var index = cCards.indexOf(9);
            cCards.splice(index, 1);
          }
        }
      } else {
        updatePlayers3.push(
          new Player(
            updatePlayers2[i].num,
            updatePlayers2[i].name,
            updatePlayers2[i].dob,
            updatePlayers2[i].coins,
            updatePlayers2[i].dcsArray,
            updatePlayers2[i].ccsArray,
            updatePlayers2[i].turn,
            updatePlayers2[i].crowned
          )
        );
      }
    }

    console.log(updatePlayers3);
    console.log(cCards);
    return res.send(cCards);
  }

  if (clickCount == 12) {
    var cCards1 = req.query.updatedCCards;
    console.log(cCards1);
    var j;
    for (var i = 0; i < updatePlayers3.length; i++) {
      if (updatePlayers3[i].turn == true) {
        updatePlayers3[i].turn = false;
        j = i;
        j = j + 1;
        if (j == 4) {
          j = 0;
        }
        updatePlayers3[j].turn = true;
        break;
      }
    }
    console.log(cCards1.length);
    var newCharacters = [];
    for (var i = 0; i < cCards1.length; i++) {
      newCharacters[i] = characterCards[cCards1[i]];
    }
    console.log('276:' + updatePlayers3);
    return res.send({updatePlayers3, newCharacters});
  }
};