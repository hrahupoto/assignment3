<<<<<<< HEAD
const usermodel = require('../../models/db/insertUser')
=======
const userModel = require('../../models/DB/user');
>>>>>>> 2f49e43... - add validations to join room users. - made changes in database files

exports.insertUser = function (req, res) {
  var maxPlayer = 4;
  const user = new userModel(req.query);

  userModel.find({}, function (err, users) {
    if (userExist(user, users)) {
      return res.json(
        'User already exists, Please try entering different username.'
      );
    } else {
      if (users.length < maxPlayer) {
        user.save((err, user) => {
          if (err) {
            return res.status(400).json({error: 'Some thing went wrong'});
          }
          return res.json({user});
        });
      } else return res.json('Game room is full. Please try again later.');
    }
  });
};

userExist = (user, users) => {
  for (var i = 0; i < users.length; i++) {
    if (users[i].userName == user.userName) {
      return true;
    }
  }
  return false;
};
