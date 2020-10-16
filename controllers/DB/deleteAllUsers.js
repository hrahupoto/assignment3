<<<<<<< HEAD
const usermodel = require('../../models/db/insertUser');
=======
const userModel = require('../../models/DB/user');
>>>>>>> 2f49e43... - add validations to join room users. - made changes in database files

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