const usermodel = require('../models/insertUser');

exports.deleteAllUsers = function (req, res) {
  usermodel.remove({}).exec((err, users) => {
    if (err || users == null) {
      return res.status(400).json({
        error: 'Some thing went wrong',
      });
    }
    res.json(users);
  });
};