const userModel = require('../models/db/user');
const { Player } = require('../models/player');
const { districtCards } = require('../modules/districtCards')

exports.startGame = function(req, res) {
    var players = [];
    var maxPlayer = 4;
    userModel.find({}, function(err, users) {
        if (users.length == maxPlayer) {
            for (var i = 0; i < users.length; i++) {
                players.push(new Player(i, users[i].userName, users[i].dateOfBirth, Initial_Coins, initial_dsc_cards[i]));
            }
            return res.json({ players });
        } else {
            return res.json('Please wait for more players to show up.');
        }
    });
};

Initial_Coins = 2;

var random_num = [];
while (random_num.length < 16) {
    var num = Math.floor(Math.random() * (48 - 1) + 1);
    if (random_num.indexOf(num) === -1) random_num.push(num);
}

var playercards = [];
for (var i = 0; i < 16; i++) {
    playercards.push(districtCards[random_num[i]])
}

var initial_dsc_cards = [];
var i, j, temp_array, chunk = 4;
for (i = 0, j = playercards.length; i < j; i += chunk) {
    temp_array = playercards.slice(i, i + chunk);
    initial_dsc_cards.push(temp_array);
}