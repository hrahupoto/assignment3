var usersCount = require('../controllers/db/user')

exports.startGame = function (req, res) {
  res.json(usersCount.players())
};


