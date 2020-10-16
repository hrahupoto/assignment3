const usermodel = require('../../models/db/insertUser');

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
