var usersCount = require('../controllers/DB/user')

exports.startGame = function (req, res) {
  res.json(usersCount.players())
};


