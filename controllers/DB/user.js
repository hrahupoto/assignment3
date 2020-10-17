const userModel = require('../../models/db/user');

//declared to count number of users in database.
var currentUsers = 0;


//inserts user into the database
exports.insertUser = function (req, res) {
  var maxPlayer = 4;
  const user = new userModel(req.query);

  userModel.find({}, function (err, users) {
    if (userExist(user, users)) { //if user already exists in the database.
      return res.json(
        'User already exists, Please try entering different username.'
      );
    } else {
      if (users.length < maxPlayer) { //max 4 players are allowed into the database.
        user.save((err, user) => { 
          if (err) {
            return res.status(400).json({error: 'Some thing went wrong'});
          }
          currentUsers = users.length;
          return res.json({user});
        });
      } else {
        return res.json('Game room is full. Please try again later.');
      }
    }
  });
};

//delete all users in the database.
exports.deleteAllUsers = function (req, res) {
  userModel.deleteMany({}).exec((err, users) => {
    if (err || users == null) {
      return res.status(400).json({
        error: 'Some thing went wrong',
      });
    }
    res.json({users});
  });
};

//get all users from the database.
exports.getUsers = function (req, res) {
  userModel.find({}).exec((err, users) => {
    if (err || users == null) {
      return res.status(400).json({
        error: 'Some thing went wrong',
      });
    }

    res.json({users});
  });
};

//function to check users with same name.
userExist = (user, users) => {
  for (var i = 0; i < users.length; i++) {
    if (users[i].userName == user.userName) {
      return true;
    }
  }
  return false;
};

//function to return count of users
players = () => {
  users = currentUsers;
  return users;
};

//exported function for startGame.js
exports.players = players;
