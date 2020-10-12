const usermodel = require('../models/insertUser');

exports.getUsers = function (req, res) {
  usermodel.find({}).exec((err, users) => {
    if (err || users == null) {
      return res.status(400).json({
        error: 'Some thing went wrong',
      });
    }

    res.json(users);
  });
};
