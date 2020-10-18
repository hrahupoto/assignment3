const userModel = require('../models/db/user');
const {Player} = require('../models/player');

exports.startGame = function (req, res) {
  var players = [];
  var maxPlayer = 4;
  userModel.find({}, function (err, users) {
    if (users.length == maxPlayer) 
    {
      for (var i = 0; i < users.length; i++) 
      {
        players.push(new Player(i, users[i].userName, users[i].dateOfBirth));
      }
      return res.json({players});
    } 
    else 
    {
      return res.json('Please wait for more players to show up.');
    }
  });
};
