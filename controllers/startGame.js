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
  var bankcomp;
  //var remaining_bankcoins = 0;
  //var total_Initial_Coins = 0;
  userModel.find({}, function (err, users) {
    if (users.length == maxPlayer) {
      //Selection of Crown Player
      // Variable for age of players for crown
      var Age = [],
        dob,
        date,
        now,
        diff,
        maxAge = [];
      //Selection of Crown Player

      // Variable for age of players for crow

      for (var i = 0; i < users.length; i++) {
        dob = users[i].dateOfBirth;
        dob = dob.split('-');
        date = new Date(dob[0], dob[1], dob[2]);
        now = new Date();
        diff = Math.abs(now - date);
        Age[i] = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      }
      maxAge = Math.max(Age[0], Age[1], Age[2], Age[3]);

      for (var i = 0; i < users.length; i++) {
        if (Age[i] == maxAge) {
          Age[i] = true;
        } else {
          Age[i] = false;
        }
      }
      //console.log(districtCards.length)
      /*for (var i = 0; i < 47; i++) {
                bank.push(new Bank(bankcoins, districtCards[i]));
                //dcards.push(districtCards[i]);
            }*/
      //console.log(playercards)

      bank = new Bank(bankcoins);

      //console.log(bank[0].dcsArray);
      //console.log(bank);
      //bank.push(new Bank(bankcoins, districtCards, characterCards));
      //console.log(bank[0].coins);
      //bank_coins = bank[0].coins;
      //result = bank[0].withdrawFromBank(Initial_Coins);
      //console.log("Result:", result)
      //console.log(bank.withdrawFromBank(Initial_Coins));
      //withdraw.push(Bank.withdrawFromBank);
      //console.log(withdraw);

      for (var i = 0; i < users.length; i++) {
        players.push(
          new Player(
            i,
            users[i].userName,
            users[i].dateOfBirth,
            Initial_Coins,
            initial_dsc_cards[i],
            playerCcsArray={},
            playerTurn=false,
            Age[i]
          )
        );
        bal_coins = bank.withdrawFromBank(Initial_Coins);
        //bankcoins -= Initial_Coins;
      }
      //console.log(bal_coins);
      bank = new Bank(bal_coins, remaining_dc, characterCards);
      //console.log(bank.dcsArray[0]);
      //bank_coins = bank[bank.length - 1].coins;
      //console.log(bank_coins);
      return res.json({players, bank});
    } else {
      return res.json('Please wait for more players to show up.');
    }
  });
};
