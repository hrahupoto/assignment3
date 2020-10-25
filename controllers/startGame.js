const userModel = require('../models/db/user');
const {Player} = require('../models/player');
const {districtCards} = require('../modules/districtCards');
const {characterCards} = require('../modules/characterCards');
const Bank = require('../models/bank');
var Initial_Coins = 2;

var random_num = [];
while (random_num.length < 47) {
  var num = Math.floor(Math.random() * (48 - 1) + 1);
  if (random_num.indexOf(num) === -1) random_num.push(num);
}

//console.log(random_num)
var remaining_dc = [];
var playercards = [];
for (var i = 0; i < 16; i++) {
  playercards.push(districtCards[random_num[i]]);
}
//console.log(playercards)

for (var j = 16; j < 47; j++) {
  remaining_dc.push(districtCards[random_num[j]]);
}
//console.log(remaining_dc);

var initial_dsc_cards = [];
var i,
  j,
  temp_array,
  chunk = 4;
for (i = 0, j = playercards.length; i < j; i += chunk) {
  temp_array = playercards.slice(i, i + chunk);
  initial_dsc_cards.push(temp_array);
}

exports.startGame = function (req, res) {
  var players = [];
  var maxPlayer = 4;
  var bal_coins;
  var bank = [];
  var bankcoins = 100;
  userModel.find({}, function (err, users) {
    if (users.length == maxPlayer) {
      //Selection of Crown Player
      // Variable for age of players for crown
      var Age = [],
        dob,
        date,
        now,
        diff,
        maxAge = [],
        turn = [];
      //Selection of Crown Player

      // Variable for age of players for crow

      for (var i = 0; i < users.length; i++) {
        dob = users[i].dateOfBirth;                   //retrieving players dob
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
        Age[i] = Math.abs(age_dt.getFullYear() - 1970);
      }
      
      //Max Age of Player
      maxAge = Math.max(Age[0], Age[1], Age[2], Age[3]);

      //Matching Players Age with MaxAge and if it matches assigning True else False 
      if (Age[0] == maxAge){
        if(Age[0]==Age[1] || Age[0]==Age[2] || Age[0]==Age[3]){
          Age[0] = true;
          Age[1], Age[2], Age[3] = false;
        }
        else
        Age[0] = true;
        Age[1], Age[2], Age[3] = false;
      }
      else if(Age[1] == maxAge){
        if(Age[1]==Age[0]){
          Age[0] = true;
          Age[1], Age[2], Age[3] = false;
        }
        else if(Age[1]==Age[2] || Age[1]==Age[3]){
          Age[1] = true;
          Age[0], Age[2], Age[3] = false;
        }
        else
        Age[1] = true;
        Age[0], Age[2], Age[3] = false;
      }
      else if(Age[2] == maxAge){
        if(Age[2]==Age[0]){
          Age[0] = true;
          Age[1], Age[2], Age[3] = false;
        }
        else if(Age[2]==Age[1]){
          Age[1] = true;
          Age[0], Age[2], Age[3] = false;
        }
        else if(Age[2]==Age[3]){
          Age[2] = true;
          Age[0], Age[1], Age[3] = false;
        }
        else 
        Age[2] = true;
        Age[0], Age[1], Age[3] = false;
      }
      else if(Age[3] == maxAge){
        if(Age[3]==Age[0]){
          Age[0] = true;
          Age[1], Age[2], Age[3] = false;
        }
        else if(Age[3]==Age[1]){
          Age[1] = true;
          Age[0], Age[2], Age[3] = false;
        }
        else if(Age[3]==Age[2]){
          Age[2] = true;
          Age[0], Age[1], Age[3] = false;
        }
        else
        Age[3] = true;
        Age[0], Age[1], Age[2] = false;
      }
      else
      console.log("Incorrect Age")
     
      

      //console.log(districtCards.length)
      //console.log(playercards)

      bank = new Bank(bankcoins);

      //console.log(bank[0].dcsArray);
      //console.log(bank);
      //console.log(bank[0].coins);
      //console.log("Result:", result)
      //console.log(bank.withdrawFromBank(Initial_Coins));
      //console.log(withdraw);

      for (var i = 0; i < users.length; i++) {
        players.push(
          new Player(
            i,
            users[i].userName,
            users[i].dateOfBirth,
            Initial_Coins,
            initial_dsc_cards[i],
            (playerCcsArray = {}),
            (playerTurn = turn[i]),
            Age[i]
          )
        );
        bal_coins = bank.withdrawFromBank(Initial_Coins);
      }
      //console.log(bal_coins);
      bank = new Bank(bal_coins, remaining_dc, characterCards);
      //console.log(bank.dcsArray[0]);
      //console.log(bank_coins);
      return res.json({players, bank});
    } else {
      return res.json('Please wait for more players to show up.');
    }
  });
};
