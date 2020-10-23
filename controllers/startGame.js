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
      bank = new Bank(bankcoins);

      for (var i = 0; i < users.length; i++) {
        players.push(
          new Player(
            i,
            users[i].userName,
            users[i].dateOfBirth,
            Initial_Coins,
            initial_dsc_cards[i]
          )
        );
        bal_coins = bank.withdrawFromBank(Initial_Coins);
      }
      bank = new Bank(bal_coins, remaining_dc, characterCards);
      return res.json({players, bank});
    } else {
      return res.json('Please wait for more players to show up.');
    }
  });
};
