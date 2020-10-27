const {characterCards} = require('../modules/characterCards');
const {Player} = require('../models/player');
var {players} = require('./startGame');
var cCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var ccSelected = [];
var selectCharacter = [];
<<<<<<< HEAD
=======
var updatePlayers = [];
var selectedCCard;
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
exports.selectionPanel = function (req, res) {
  var clickCount = req.query.clickCount;
  //console.log(cCards[6].location);
  //   var faceUpCards = [];
  //     var faceDownCards = [];
  //   var playerCharcCards = [];
  if (clickCount < 3) {
    var randNumber = Math.floor(Math.random() * cCards.length);
    randNumber = cCards[randNumber];
    //console.log("randnumber: " + randNumber);
    while (randNumber == 4) {
      var randNumber = Math.floor(Math.random() * cCards.length);
      randNumber = cCards[randNumber];
      //console.log("randnumber: " + randNumber);
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
<<<<<<< HEAD
    var updatePlayers;
    var selectedCCard;
=======

>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
    for (var i = 0; i < players.length; i++) {
      if (players[i].name == uName) {
        if (cName == 'Assassin') {
          selectedCCard = characterCards[1];
<<<<<<< HEAD
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (1 > -1) {
            var index = cCards.indexOf(1);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Theif') {
          selectedCCard = characterCards[2];
<<<<<<< HEAD
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (2 > -1) {
            var index = cCards.indexOf(2);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Magician') {
          selectedCCard = characterCards[3];
<<<<<<< HEAD
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (3 > -1) {
            var index = cCards.indexOf(3);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'King') {
          selectedCCard = characterCards[4];
<<<<<<< HEAD
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (4 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
        if (cName == 'Bishop') {
          selectedCCard = characterCards[5];
<<<<<<< HEAD
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (5 > -1) {
            var index = cCards.indexOf(4);
            cCards.splice(index, 1);
          }
        }
<<<<<<< HEAD
        if (cName == "Merchant") {
          selectedCCard = characterCards[6];
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (6 > -1) {
            var index = cCards.indexOf(6);
            cCards.splice(index, 1);
          }
        }
<<<<<<< HEAD
        if (cName == "Architect") {
          selectedCCard = characterCards[7];
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (7 > -1) {
            var index = cCards.indexOf(7);
            cCards.splice(index, 1);
          }
        }
<<<<<<< HEAD
        if (cName == "Warload") {
          selectedCCard = characterCards[8];
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
          );
          if (8 > -1) {
            var index = cCards.indexOf(8);
            cCards.splice(index, 1);
          }
        }
<<<<<<< HEAD
        if (cName == "Artist") {
          selectedCCard = characterCards[9];
          console.log(selectCharacter);
          updatePlayers = new Player(
            players[i].num,
            players[i].name,
            players[i].dob,
            players[i].coins,
            players[i].dcsArray,
            selectedCCard,
            players[i].turn,
            players[i].crowned
=======
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
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
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
<<<<<<< HEAD
=======
    console.log('line 244:' + players);
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
    console.log(updatePlayers);
    console.log(cCards);
    return res.send(cCards);
  }
  if (clickCount == 6) {
<<<<<<< HEAD
    /*var updatedCCards = req.query.updatedCCards;
    console.log(updatedCCards)
    console.log("line: 239" + updatePlayers);
    for (var i = 0; i < 4; i++) {
      if (updatePlayers[i].turn == true) {
        updatePlayers[i].turn = false;
        var j = i;
=======
    var j;
    //var updatedCCards = req.query.updatedCCards;
    console.log('line:242' + updatePlayers);
    //return res.send(updatePlayers);
    for (var i = 0; i < updatePlayers.length; i++) {
      if (updatePlayers[i].turn == true) {
        updatePlayers[i].turn = false;
        j = i;
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
        j = j + 1;
        if (j == 4) {
          j = 0;
        }
<<<<<<< HEAD
        updatePlayers.push(
          new Player(
            updatePlayers[i].num,
            updatePlayers[i].name,
            updatePlayers[i].dob,
            updatePlayers[i].coins,
            updatePlayers[i].dcsArray,
            updatePlayers[i].ccsArray,
            (updatePlayers[j].turn = true),
            updatePlayers[i].crowned
          )
        );
        console.log(updatePlayers);
      }
    }
*/
    console.log(cCards.length);
    var newCharacters = [];
    for (var i = 0; i < cCards.length; i++) {
      newCharacters[i] = characterCards[cCards[i]];
    }
    console.log(newCharacters);
    return res.send(newCharacters);
=======
        updatePlayers[j].turn = true;
        console.log(updatePlayers);
        return res.send(updatePlayers);
      }
    }

    //   console.log(cCards.length);
    //   var newCharacters = [];
    //   for (var i = 0; i < cCards.length; i++) {
    //     newCharacters[i] = characterCards[cCards[i]];
    //   }
    //   console.log(newCharacters);
    //   return res.send(newCharacters);
>>>>>>> 7e5574092f335011ecda6106e22155ecd30bfe03
  }
};
